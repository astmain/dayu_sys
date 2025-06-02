import numpy as np
from numba import jit
from stl import mesh
import time
import struct

cp111 = np


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
        self.vectors_gpu = cp111.asarray(self.vectors, dtype=cp111.float32)
        self.parse_result = {"triangles": len(self.vectors)}

    def simple_parse(self):
        print("1-simple_parse*计算长宽高*************************************")
        # 计算长宽高（使用 GPU 加速） 速度快10倍
        start_time = time.time()
        min_vertex = cp111.min(self.vectors_gpu, axis=(0, 1))
        max_vertex = cp111.max(self.vectors_gpu, axis=(0, 1))
        length = max_vertex[0] - min_vertex[0]
        width = max_vertex[1] - min_vertex[1]
        height = max_vertex[2] - min_vertex[2]
        self.parse_result["length"] = float(length)
        self.parse_result["width"] = float(width)
        self.parse_result["height"] = float(height)
        end_time = time.time()
        print(f"xzz2021:=======长宽高============== : {end_time - start_time}")

    def triangle_area_gpu(self):
        #   此版本可以处理超出内存的大文件
        print("2-triangle_area_gpu*此版本可以处理超出内存的大文件*************************************")
        start_time = time.time()
        vertices = self.vectors_gpu
        batch_size = 100000  # 每次处理100,000个三角形
        total_area = 0
        num_triangles = vertices.shape[0] // 3  # 计算三角形的总数量

        for i in range(0, num_triangles, batch_size):
            batch_vertices = vertices[i: i + batch_size * 3].reshape(-1, 3, 3)
            edge1 = batch_vertices[:, 1] - batch_vertices[:, 0]
            edge2 = batch_vertices[:, 2] - batch_vertices[:, 0]
            cross_products = cp111.cross(edge1, edge2)
            areas = cp111.linalg.norm(cross_products, axis=1) / 2.0
            total_area += cp111.sum(areas)

        self.parse_result["surface"] = float(total_area)
        end_time = time.time()
        print(f"xzz2021:=======表面积============== : {end_time - start_time}")

    def compute_volume_raw(self):
        print("3-compute_volume_raw*计算长宽高*************************************")
        start_time = time.time()
        volume = compute_volume(self.vectors)
        end_time = time.time()
        self.parse_result["volume"] = float(volume)
        print(f"xzz2021:=======体积============== : {end_time - start_time}")
        # return volume

    def count_unique_vertices_bin(self):
        print("4-count_unique_vertices_bin*读取头部信息*************************************")
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

    def calculate_geometry(self):
        print("5-calculate_geometry*避免重复加载*************************************")
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
        points, triangles = (
            self.parse_result["points"],
            self.parse_result["triangles"],
        )
        self.parse_result["geometric_complexity"] = float(abs(points - triangles))
        self.parse_result["structural_strength"] = float(abs(points / triangles))
        self.calculate_geometry()

    def run(self):
        self.simple_run()
        return self.parse_result


if __name__ == '__main__':
    ""
    path_file = r"D:\AAA_desktop\test1_demo\111.stl"
    aaa = StlParse(path_file)
    aaa.run()
