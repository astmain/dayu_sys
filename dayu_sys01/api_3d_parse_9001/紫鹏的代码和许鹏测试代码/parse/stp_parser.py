import cupy as cp
import numpy as np
import time
import struct
from numba import jit

# import stepcode
from OCC.Core.STEPControl import STEPControl_Reader
from OCC.Core.IFSelect import IFSelect_RetDone
from OCC.Core.BRepBndLib import brepbndlib
from OCC.Core.Bnd import Bnd_Box
from OCC.Core.GProp import GProp_GProps
from OCC.Core.TopExp import TopExp_Explorer
from OCC.Core.TopAbs import TopAbs_VERTEX, TopAbs_FACE
from OCC.Core.BRepGProp import brepgprop


# @jit通常用于普通函数，不适合直接用于类方法，因为self会影响函数的类型推断
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


class StepParse:
    def __init__(self, file_path):
        self.file_path = file_path
        self.read_step_file()
        self.parse_result = {}
        # 获取顶点数据并转换为 GPU 数组
        # self.vectors_gpu = cp.asarray(self.vectors, dtype=cp.float32)
        # self.parse_result = {"triangles": len(self.vectors)}

    def read_step_file(self):
        """读取并解析 STEP 文件"""
        step_reader = STEPControl_Reader()
        status = step_reader.ReadFile(self.file_path)

        if status != IFSelect_RetDone:
            raise Exception("无法读取 STEP 文件")

        step_reader.TransferRoot()
        shape = step_reader.Shape()
        self.shape = shape

    def simple_parse(self):
        """计算模型的包围盒，返回长、宽、高"""
        start_time = time.time()
        bbox = Bnd_Box()
        brepbndlib.Add(self.shape, bbox)
        x_min, y_min, z_min, x_max, y_max, z_max = bbox.Get()
        length = x_max - x_min
        width = y_max - y_min
        height = z_max - z_min
        self.parse_result["length"] = float(length)
        self.parse_result["width"] = float(width)
        self.parse_result["height"] = float(height)
        end_time = time.time()
        print(f"xzz2021:=======长宽高============== : {end_time - start_time}")

    def compute_volume_and_area(self):
        """计算模型的体积和表面积"""
        start_time = time.time()
        props = GProp_GProps()
        # 计算体积
        brepgprop.VolumeProperties(self.shape, props)
        volume = props.Mass()
        # 计算表面积
        brepgprop.SurfaceProperties(self.shape, props)
        area = props.Mass()
        self.parse_result["volume"] = float(volume)
        self.parse_result["surface"] = float(area)
        end_time = time.time()
        print(f"xzz2021:=======体积和表面积============== : {end_time - start_time}")

    def count_vertices_faces(self):
        """统计 Shape 对象中的顶点数和面片数"""
        start_time = time.time()
        vertex_count = 0
        face_count = 0

        # 统计顶点数
        explorer = TopExp_Explorer(self.shape, TopAbs_VERTEX)
        while explorer.More():
            vertex_count += 1
            explorer.Next()

        # 统计面片数
        explorer = TopExp_Explorer(self.shape, TopAbs_FACE)
        while explorer.More():
            face_count += 1
            explorer.Next()

        self.parse_result["points"] = vertex_count
        self.parse_result["triangles"] = face_count
        end_time = time.time()
        print(f"xzz2021:=======顶点数和面片数============== : {end_time - start_time}")

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
                raise ValueError("Invalid STEP file: header too short")
            # 解析三角形数量（小端无符号整数）
            num_triangles = struct.unpack("<I", header[80:84])[0]
            # 读取所有三角形数据
            data = f.read()
            # 验证数据长度是否正确
            expected_length = num_triangles * 50
            if len(data) != expected_length:
                raise ValueError(f"Invalid STEP file: expected {expected_length} bytes, got {len(data)}")
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

    def simple_run(self):
        self.simple_parse()
        self.compute_volume_and_area()
        self.count_vertices_faces()
        points, triangles = (
            self.parse_result["points"],
            self.parse_result["triangles"],
        )
        self.parse_result["geometric_complexity"] = float(abs(points - triangles))
        self.parse_result["structural_strength"] = float(abs(points / triangles))

    def run(self):
        self.simple_run()
        return self.parse_result
