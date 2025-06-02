import numpy as np
from numba import jit
import numpy
import cupy

from tool import tool

np_fun111 = numpy
np_fun222 = cupy


@jit(nopython=True)
def compute_volume(triangles):
    volume = 0.0
    for triangle in triangles:
        # 计算三角形的三个顶点坐标
        v0 = numpy.ascontiguousarray(triangle[0])  # 确保v0是连续的
        v1 = numpy.ascontiguousarray(triangle[1])  # 确保v1是连续的
        v2 = numpy.ascontiguousarray(triangle[2])  # 确保v2是连续的
        # 计算三角形的体积贡献
        cross_prod = numpy.ascontiguousarray(numpy.cross(v1 - v0, v2 - v0))  # 确保cross_prod是连续的
        volume += numpy.dot(v0, cross_prod) / 6.0
    return volume


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





@tool.wrapper_time_func
def cpu_stl_02(path_file, np_fun):
    state = {}
    print('执行---cpu_stl_02---=====================================================')
    print(f"=======读取文件=====================================================")
    from stl import mesh

    # 动态选择计算库使用numpy或者cupy
    # import numpy as np

    stl_mesh = mesh.Mesh.from_file(path_file)
    # 获取顶点数据并转换为 GPU 数组
    # self.mesh = stl_mesh
    vectors = stl_mesh.vectors
    vectors_gpu = np_fun.asarray(vectors, dtype=np_fun.float32)
    # vectors_gpu = vectors
    state = {"triangles": len(vectors)}
    print("state---:", state)

    print(f"=======长宽高=====================================================")
    min_vertex = np_fun.min(vectors_gpu, axis=(0, 1))
    max_vertex = np_fun.max(vectors_gpu, axis=(0, 1))
    state['length'] = max_vertex[0] - min_vertex[0]
    state['width'] = max_vertex[1] - min_vertex[1]
    state['height'] = max_vertex[2] - min_vertex[2]
    print('state---:', state)

    print(f"=======体积和表面积===============================================")
    vertices = vectors_gpu
    batch_size = 100000  # 每次处理100,000个三角形
    total_area = 0
    num_triangles = vertices.shape[0] // 3  # 计算三角形的总数量
    for i in range(0, num_triangles, batch_size):
        batch_vertices = vertices[i: i + batch_size * 3].reshape(-1, 3, 3)
        edge1 = batch_vertices[:, 1] - batch_vertices[:, 0]
        edge2 = batch_vertices[:, 2] - batch_vertices[:, 0]
        cross_products = np_fun.cross(edge1, edge2)
        areas = np_fun.linalg.norm(cross_products, axis=1) / 2.0
        total_area += np_fun.sum(areas)
    state["part_surface_area"] = float(total_area)
    print('state---:', state)

    print(f"=======顶点数和面片数===============================================")
    volume = compute_volume(vectors)
    state["part_volume"] = float(volume)
    print('state---:', state)

    print(f"=======绝对值===============================================")
    # print("4-count_unique_vertices_bin*读取头部信息*************************************")
    import struct
    with open(path_file, "rb") as f:
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
        state["points"] = unique_vertices.size
    print('state["points"]---:', state["points"])

    triangles = state["triangles"]
    points = state["points"]
    state['part_complexity'] = float(abs(points - triangles))
    state['structural_strength'] = float(abs(points / triangles))
    print('state---:', state)

    print("5-calculate_geometry*避免重复加载*************************************")
    edges = extract_edges(vectors)

    print(f"=======厚度===============================================")
    state["min_thickness"] = 3.1415  # todo
    state["thickness_proportion"] = calculate_thickness_proportion(edges)
    print('state["min_thickness"]---:', state["min_thickness"])
    print('state["thickness_proportion"]---:', state["thickness_proportion"])

    return state


def __print(*args):
    pass


if __name__ == '__main__':
    print = __print

    path_file = r"D:\AAA_desktop\test1_demo\111.stl"
    import numpy
    import cupy

    # # 111================================================
    # state = cpu_stl_02(path_file, np_fun=numpy)
    # print('state---:', state)
    #
    # from tool.check_form import check_form
    # from tool.check_rule import check_rule
    #
    # check_result = check_form(rule=check_rule, data=state, allow_other_field=True)
    # print('check_result---:', check_result)

    # 222================================================
    # for ele in range(4):
    #     state = cpu_stl_02(path_file, np_fun=cupy)
    #     print('state---:', state)
    #
    #     from tool.check_form import check_form
    #     from tool.check_rule import check_rule
    #
    #     check_result = check_form(rule=check_rule, data=state, allow_other_field=True)
    #     print('check_result---:', check_result)

    # 333================================================
    state = cpu_stl_02(path_file, np_fun=cupy)
    print('state---:', state)

    from tool.check_form import check_form
    from tool.check_rule import check_rule

    check_result = check_form(rule=check_rule, data=state, allow_other_field=True)
    print('check_result---:', check_result)
