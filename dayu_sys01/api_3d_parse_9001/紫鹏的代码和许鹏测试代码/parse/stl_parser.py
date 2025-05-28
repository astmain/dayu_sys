import concurrent.futures
import cupy as cp
import numpy as np
from numba import jit
from stl import mesh
import time
import struct
import trimesh
from scipy.spatial import cKDTree


# from app.parse.thickness2 import compute_thickness2


# @jit通常用于普通函数，不适合直接用于类方法，因为self会影响函数的类型推断
# 使用Numba加速体积计算的函数
@jit(nopython=True)
def compute_volume(triangles):
    volume = 0.0
    for triangle in triangles:
        # 计算三角形的三个顶点坐标
        v0 = np.ascontiguousarray(triangle[0])  # 确保v0是连续的
        v1 = np.ascontiguousarray(triangle[1])  # 确保v1是连续的
        v2 = np.ascontiguousarray(triangle[2])  # 确保v2是连续的
        # 计算三角形的体积贡献
        cross_prod = np.ascontiguousarray(np.cross(v1 - v0, v2 - v0))  # 确保cross_prod是连续的
        volume += np.dot(v0, cross_prod) / 6.0
    return volume


# 使用Numba加速边缘提取和计算
@jit(nopython=True)
def extract_edges(vectors):
    num_faces = vectors.shape[0]
    edges = np.empty((num_faces * 3, 6), dtype=np.float32)  # Preallocate memory for edges
    index = 0
    for face in vectors:
        for i in range(3):
            v1 = face[i]
            v2 = face[(i + 1) % 3]
            if v1[0] < v2[0] or (v1[0] == v2[0] and v1[1] < v2[1]) or (v1[0] == v2[0] and v1[1] == v2[1] and v1[2] < v2[2]):
                edges[index] = (v1[0], v1[1], v1[2], v2[0], v2[1], v2[2])
            else:
                edges[index] = (v2[0], v2[1], v2[2], v1[0], v1[1], v1[2])
            index += 1
    return edges


# 使用Numba加速厚度比例计算
@jit(nopython=True)
def calculate_thickness_proportion(edges, threshold=0.5):
    v1 = edges[:, :3]
    v2 = edges[:, 3:]
    lengths = np.sqrt(np.sum((v1 - v2) ** 2, axis=1))
    thin_edges = np.sum(lengths < threshold)
    total_edges = len(edges)
    return thin_edges / total_edges if total_edges > 0 else 0


class StlParse:
    def __init__(self, file_path):
        self.file_path = file_path
        stl_mesh = mesh.Mesh.from_file(file_path)
        # 获取顶点数据并转换为 GPU 数组
        # self.mesh = stl_mesh
        self.vectors = stl_mesh.vectors
        self.vectors_gpu = cp.asarray(self.vectors, dtype=cp.float32)
        self.parse_result = {"triangles": len(self.vectors)}

    def compute_volume_raw(self):
        start_time = time.time()
        volume = compute_volume(self.vectors)
        # volume = trimesh.load_mesh(self.file_path).volume  # 效率慢7倍
        # volume = self.mesh.get_mass_properties()["volume"]
        # info = self.mesh.get_mass_properties()
        # print(f"xzz2021:=======info============== : {info}")
        # vertices = self.vectors.reshape(-1, 3)
        # volume = ConvexHull(vertices).volume   # 结果偏差过大
        end_time = time.time()
        self.parse_result["volume"] = float(volume)
        print(f"xzz2021:=======体积============== : {end_time - start_time}")
        # return volume

    def simple_parse(self):
        # 计算长宽高（使用 GPU 加速） 速度快10倍
        start_time = time.time()
        min_vertex = cp.min(self.vectors_gpu, axis=(0, 1))
        max_vertex = cp.max(self.vectors_gpu, axis=(0, 1))
        length = max_vertex[0] - min_vertex[0]
        width = max_vertex[1] - min_vertex[1]
        height = max_vertex[2] - min_vertex[2]
        self.parse_result["length"] = float(length)
        self.parse_result["width"] = float(width)
        self.parse_result["height"] = float(height)
        end_time = time.time()
        print(f"xzz2021:=======长宽高============== : {end_time - start_time}")

    # 计算三角形的面积（GPU版）
    def triangle_area_gpu000(self):
        # vertices = self.vectors
        start_time = time.time()
        vertices = self.vectors_gpu
        # 计算边向量
        edge1 = vertices[:, 1] - vertices[:, 0]
        edge2 = vertices[:, 2] - vertices[:, 0]
        # 使用向量化叉积计算面积
        cross_products = cp.cross(edge1, edge2)
        areas = cp.linalg.norm(cross_products, axis=1) / 2.0
        self.parse_result["surface"] = float(cp.sum(areas))
        end_time = time.time()
        print(f"xzz2021:=======表面积============== : {end_time - start_time}")
        # return areas

    def triangle_area_gpu(self):
        #   此版本可以处理超出内存的大文件
        start_time = time.time()
        vertices = self.vectors_gpu
        batch_size = 100000  # 每次处理100,000个三角形
        total_area = 0
        num_triangles = vertices.shape[0] // 3  # 计算三角形的总数量

        for i in range(0, num_triangles, batch_size):
            batch_vertices = vertices[i : i + batch_size * 3].reshape(-1, 3, 3)
            edge1 = batch_vertices[:, 1] - batch_vertices[:, 0]
            edge2 = batch_vertices[:, 2] - batch_vertices[:, 0]
            cross_products = cp.cross(edge1, edge2)
            areas = cp.linalg.norm(cross_products, axis=1) / 2.0
            total_area += cp.sum(areas)

        self.parse_result["surface"] = float(total_area)
        end_time = time.time()
        print(f"xzz2021:=======表面积============== : {end_time - start_time}")

    def count_unique_vertices_bin(self):
        start_time = time.time()
        with open(self.file_path, "rb") as f:
            # 读取头部信息（84字节：80头部 + 4字节三角形数量）
            header = f.read(84)
            if len(header) < 84:
                raise ValueError("Invalid STL file: header too short")
            # 解析三角形数量（小端无符号整数）
            num_triangles = struct.unpack("<I", header[80:84])[0]
            # 读取所有三角形数据
            data = f.read()
            # 验证数据长度是否正确
            expected_length = num_triangles * 50
            if len(data) != expected_length:
                raise ValueError(f"Invalid STL file: expected {expected_length} bytes, got {len(data)}")
            # 转换为NumPy数组处理
            data_np = np.frombuffer(data, dtype=np.uint8).reshape(num_triangles, 50)
            # 提取所有顶点数据（每个三角形的12-48字节，共36字节）
            vertices = data_np[:, 12:48].reshape(-1, 12)  # 形状：(num_triangles*3, 12)
            # 将每个顶点视为12字节的字符串进行去重
            vertices_str = vertices.view(dtype="S12")
            unique_vertices = np.unique(vertices_str)
            self.parse_result["points"] = unique_vertices.size
        end_time = time.time()
        print(f"xzz2021:=======顶点数============== : {end_time - start_time}")

    def calculate_min_thickness(self):
        # 计算最小厚度
        start_time = time.time()
        # 使用 NumPy 向量化计算
        vertices = self.vectors.reshape(-1, 3)
        distances = np.linalg.norm(vertices[:, None] - vertices[None, :], axis=-1)
        min_thickness = np.min(distances[distances > 0])  # 排除自身距离
        self.parse_result["min_thickness"] = float(min_thickness)
        end_time = time.time()
        print(f"xzz2021:=======最小厚度============== : {end_time - start_time}")

    def calculate_thickness(self):
        """根据 vectors 分析模型的最小壁厚值和结构强度"""
        start_time = time.time()
        edges = set()

        # 提取边并计算
        for face in self.vectors:
            edges.update(tuple(sorted((tuple(face[i]), tuple(face[(i + 1) % 3])))) for i in range(3))

        # 分析边的特征
        min_thickness = float("inf")
        total_edges = len(edges)
        thin_edges = 0

        for edge in edges:
            thickness = np.linalg.norm(np.array(edge[0]) - np.array(edge[1]))
            if thickness < min_thickness:
                min_thickness = thickness
            if thickness < 0.01:  # 设定薄边的阈值
                thin_edges += 1

        thickness_proportion = thin_edges / total_edges if total_edges > 0 else 0

        # 更新解析结果
        self.parse_result["min_thickness"] = float(min_thickness)
        self.parse_result["structural_strength"] = float(thickness_proportion)

        end_time = time.time()
        print(f"xzz2021:=======最小厚度============== : {end_time - start_time}")

    def calculate_min_thickness111(self):
        # 计算最小厚度
        # 确保网格是有效的
        start_time = time.time()
        mesh = trimesh.load_mesh(self.file_path)
        # 获取网格的表面点
        vertices = mesh.vertices
        faces = mesh.faces
        # 构建KD树用于快速计算距离
        tree = cKDTree(vertices)
        # 计算最小壁厚
        min_thickness = float("inf")
        for face in faces:
            # 获取面上的三个顶点坐标
            v0, v1, v2 = vertices[face]
            # 计算面心点
            face_center = (v0 + v1 + v2) / 3
            # 查找面心点到网格表面的最短距离
            dist, _ = tree.query(face_center)
            # 更新最小壁厚
            min_thickness = min(min_thickness, dist)
        end_time = time.time()
        print(f"xzz2021:=======最小厚度============== : {end_time - start_time}")
        self.parse_result["min_thickness"] = float(min_thickness)

    def calculate_geometry(self):
        start_time = time.time()
        # 重用已加载的网格数据，避免重复加载
        vectors = self.vectors
        # 使用优化的边缘提取函数
        edges = extract_edges(vectors)
        # 计算厚度比例
        thickness_proportion = calculate_thickness_proportion(edges)
        end_time = time.time()
        print(f"xzz2021:=======计算厚度比例时间============== : {end_time - start_time:.3f} seconds")
        self.parse_result["thickness_proportion"] = float(thickness_proportion)

    def simple_run(self):
        self.simple_parse()
        self.triangle_area_gpu()
        self.compute_volume_raw()
        self.count_unique_vertices_bin()
        # self.calculate_thickness()
        points, triangles = (
            self.parse_result["points"],
            self.parse_result["triangles"],
        )
        self.parse_result["geometric_complexity"] = float(abs(points - triangles))
        self.parse_result["structural_strength"] = float(abs(points / triangles))
        self.calculate_geometry()

    def run_parallel_cursor(self):
        # 并行执行多个任务
        with concurrent.futures.ThreadPoolExecutor() as executor:
            # 提交不依赖其他结果的任务
            simple_parse_future = executor.submit(self.simple_parse)
            triangle_area_future = executor.submit(self.triangle_area_gpu)
            volume_future = executor.submit(self.compute_volume_raw)
            vertices_future = executor.submit(self.count_unique_vertices_bin)

            print(f"xzz2021:=======并行执行多个任务============== : {self.parse_result}")

            # 等待所有任务完成
            simple_parse_future.result()
            triangle_area_future.result()
            volume_future.result()
            vertices_future.result()
        # 计算几何复杂度和结构强度
        points, triangles = (
            self.parse_result["points"],
            self.parse_result["triangles"],
        )
        self.parse_result["geometric_complexity"] = float(abs(points - triangles))
        self.parse_result["structural_strength"] = float(abs(points / triangles))

        # 计算厚度相关指标
        # self.calculate_geometry()

    def run(self):
        self.simple_run()
        # self.run_parallel_cursor()
        # compute_thickness(self.file_path)
        # self.calculate_geometry()

        # self.run_parallel()
        # 循环 将结果转换成 float
        # for key, value in self.parse_result.items():
        #     self.parse_result[key] = float(value)
        return self.parse_result

    #  ==========================老陈代码================stl=======stp======igs=====都是此解析方法====================
    # 计算长宽高表面积和体积
    # def calculate_geometry(self):
    #     shape = read_stl_file(self.file_path)
    #     calculate_geometry_start_time = time.time()
    #     props = GProp_GProps()
    #     brepgprop.VolumeProperties(shape, props)
    #     volume = props.Mass()
    #     brepgprop.SurfaceProperties(shape, props)
    #     surface_area = props.Mass()
    #     bbox = Bnd_Box()
    #     brepbndlib.Add(shape, bbox)
    #     bbox.SetGap(0.001)
    #     x_min, y_min, z_min, x_max, y_max, z_max = bbox.Get()
    #     x_length = x_max - x_min
    #     y_length = y_max - y_min
    #     z_length = z_max - z_min
    #     calculate_geometry_end_time = time.time()
    #     calculate_geometry_execution_time = calculate_geometry_end_time - calculate_geometry_start_time
    #     print(f"计算长宽高表面积和体积时长: {calculate_geometry_execution_time:.3f} seconds")
    #     return {"length": x_length, "width": y_length, "height": z_length, "surface_area": surface_area, "volume": volume}


# ==========================================================================================================================================


# def count_unique_vertices_bin11(self):
#     #  效率略差  6秒 ---->  9秒
#     start_time = time.time()
#     # 载入3D文件（支持多种格式，如 .obj, .stl, .ply 等）
#     mesh = trimesh.load_mesh(self.file_path)
#     # 获取所有的顶点
#     vertices = mesh.vertices
#     # 去重顶点（可以使用 numpy 来去重）
#     unique_vertices = set(map(tuple, vertices))
#     end_time = time.time()
#     print(f"xzz2021:=======顶点数============== : {end_time - start_time}")
#     self.parse_result["points"] = len(unique_vertices)
#     # return len(unique_vertices)

# def count_unique_vertices_bin22(self):
#     #  效率略差  6秒 ---->  13秒
#     start_time = time.time()
#     mesh = o3d.io.read_triangle_mesh(self.file_path)
#     # 获取顶点
#     vertices = np.asarray(mesh.vertices)
#     # 去重顶点
#     unique_vertices = set(map(tuple, vertices))
#     end_time = time.time()
#     print(f"xzz2021:=======顶点数============== : {end_time - start_time}")
#     self.parse_result["points"] = len(unique_vertices)
#     # return len(unique_vertices)

# def count_unique_vertices_bin33(self):
#     #  效率略差  6秒 ---->  9秒
#     start_time = time.time()
#     unique_vertices = np.unique(self.vectors.reshape(-1, 3), axis=0)
#     end_time = time.time()
#     print(f"xzz2021:=======顶点数============== : {end_time - start_time}")
#     self.parse_result["points"] = len(unique_vertices)
#     # return len(unique_vertices)

# def count_unique_vertices_bin00(self):
#     #  效率  6秒
#     start_time = time.time()
#     unique_vertices = set()
#     with open(self.file_path, "rb") as f:
#         # 跳过80字节的头部
#         f.seek(80)
#         # 读取三角形数目（4字节无符号整数）
#         num_triangles = struct.unpack("I", f.read(4))[0]
#         # 逐三角形读取顶点
#         for _ in range(num_triangles):
#             # 每个三角形占50字节（4字节法线 + 3个3D顶点，每个顶点3*4字节）
#             f.read(12)  # 跳过法线部分
#             for _ in range(3):  # 每个三角形有3个顶点
#                 # 读取每个顶点的3个float数值 (3*4字节 = 12字节)
#                 vertex = struct.unpack("3f", f.read(12))
#                 # 将顶点加入集合，确保去重
#                 unique_vertices.add(vertex)
#             # 跳过2字节的属性计数
#             f.read(2)
#         # 返回去重后的顶点数量
#     end_time = time.time()
#     print(f"xzz2021:=======顶点数============== : {end_time - start_time}")
#     self.parse_result["points"] = len(unique_vertices)
#     # return len(unique_vertices)

# def count_unique_vertices_bin111(self):
#     # 记录起始时间
#     start_time = time.time()
#     # 使用 set 来去重
#     unique_vertices = set()
#     # 打开文件并读取数据
#     with open(self.file_path, "rb") as f:
#         # 跳过80字节的头部
#         f.seek(80)
#         # 读取三角形的数量
#         num_triangles = struct.unpack("I", f.read(4))[0]
#         # 逐三角形读取顶点
#         for _ in range(num_triangles):
#             # 跳过法线部分 (12字节)
#             f.read(12)
#             # 读取三角形的3个顶点
#             for _ in range(3):
#                 # 读取每个顶点的3个float数值 (3*4字节 = 12字节)
#                 vertex = struct.unpack("3f", f.read(12))
#                 # 将顶点加入集合，确保去重
#                 unique_vertices.add(vertex)
#             # 跳过2字节的属性计数
#             f.read(2)
#     # 返回去重后的顶点数量
#     self.parse_result["points"] = len(unique_vertices)
#     # 记录结束时间并输出结果
#     end_time = time.time()
#     print(f"xzz2021:=======顶点数============== : {end_time - start_time}")

# def count_unique_vertices_bin22(self):
#     # 记录起始时间
#     start_time = time.time()

#     # 使用 set 来去重
#     unique_vertices = set()

#     # 使用 mmap 映射文件
#     with open(self.file_path, "rb") as f:
#         # 获取文件的大小
#         file_size = f.seek(0, 2)
#         f.seek(0)

#         # 创建 mmap 对象，映射整个文件
#         mmapped_file = mmap.mmap(f.fileno(), file_size, access=mmap.ACCESS_READ)

#         # 跳过80字节的头部
#         offset = 80
#         mmapped_file.seek(offset)

#         # 读取三角形的数量
#         num_triangles = struct.unpack("I", mmapped_file[offset : offset + 4])[0]
#         offset += 4

#         # 逐三角形读取顶点
#         for _ in range(num_triangles):
#             # 跳过法线部分 (12字节)
#             offset += 12

#             # 读取三角形的3个顶点
#             for _ in range(3):
#                 # 读取每个顶点的3个float数值 (3*4字节 = 12字节)
#                 vertex = struct.unpack("3f", mmapped_file[offset : offset + 12])
#                 unique_vertices.add(vertex)
#                 offset += 12

#             # 跳过2字节的属性计数
#             offset += 2

#         # 关闭 mmap 对象
#         mmapped_file.close()

#     # 记录结束时间并输出结果
#     end_time = time.time()
#     print(f"xzz2021:=======顶点数============== : {end_time - start_time}")

#     # 返回去重后的顶点数量
#     self.parse_result["points"] = len(unique_vertices)

# def count_unique_vertices_bin00(self):
#     # 效率 高
#     start_time = time.time()
#     unique_vertices = set()
#     with open(self.file_path, "rb") as f:
#         # 跳过80字节的头部
#         f.seek(80)
#         # 读取小端格式的三角形数量
#         num_triangles = struct.unpack("<I", f.read(4))[0]
#         # 计算所有三角形数据的总长度并一次性读取
#         data = f.read(num_triangles * 50)
#         # 遍历每个三角形，提取顶点数据
#         for i in range(num_triangles):
#             start = i * 50
#             # 提取三个顶点的字节数据
#             v1 = data[start + 12 : start + 24]
#             v2 = data[start + 24 : start + 36]
#             v3 = data[start + 36 : start + 48]
#             unique_vertices.update((v1, v2, v3))
#     self.parse_result["points"] = len(unique_vertices)
#     end_time = time.time()
#     print(f"xzz2021:=======顶点数============== : {end_time - start_time}")
