import open3d as o3d
import numpy as np


def compute_thickness(file_path):
    wall_thickness = 0.004
    # 加载3D模型
    mesh = o3d.io.read_triangle_mesh(file_path)

    # 确保模型是流形的（修复法线和拓扑）
    mesh.compute_vertex_normals()
    mesh.remove_degenerate_triangles()
    mesh.remove_duplicated_triangles()
    mesh.remove_duplicated_vertices()
    mesh.remove_non_manifold_edges()

    # 提取顶点和三角形
    vertices = np.asarray(mesh.vertices)
    # triangles = np.asarray(mesh.triangles)

    # 创建点云用于距离计算
    point_cloud = o3d.geometry.PointCloud()
    point_cloud.points = o3d.utility.Vector3dVector(vertices)

    # 构建KDTree加速距离计算
    mesh_tree = o3d.geometry.KDTreeFlann(mesh)

    # 计算每个顶点到表面的距离
    distances = []
    for i, vertex in enumerate(vertices):
        # 找到最近的非邻接点
        [k, idx, _] = mesh_tree.search_knn_vector_3d(vertex, 2)  # 找最近的2个点
        if k > 1:
            # 取第二个点（第一个点是自身）
            nearest_point = vertices[idx[1]]
            distance = np.linalg.norm(vertex - nearest_point)
            distances.append(distance)

    # 将距离转换为NumPy数组
    distances = np.array(distances)

    # 找到最小壁厚
    min_thickness = float(np.min(distances))
    print(f"最小壁厚: {min_thickness} mm")

    # 检查是否满足2mm的最小壁厚要求
    if min_thickness < wall_thickness:
        print(f"警告：模型存在壁厚小于{wall_thickness}mm的区域！")
    else:
        print("模型满足最小壁厚要求。")

    # 可视化反馈：整体灰色  热力图标记壁厚小于2mm的区域
    # colors = plt.cm.viridis(distances / np.max(distances))  # 使用颜色映射
    gray_color = np.tile([0.5, 0.5, 0.5], (len(mesh.vertices), 1))
    gray_color[distances < wall_thickness] = [1, 0, 0]  # 将小于2mm的区域标记为红色
    mesh.vertex_colors = o3d.utility.Vector3dVector(gray_color)  # 热力图标记壁厚小于2mm的区域
    # colors[:, :3]  改为灰色
    # 显示模型
    o3d.visualization.draw_geometries([mesh], window_name=f"壁厚分析（红色区域为小于{wall_thickness})")
    return
