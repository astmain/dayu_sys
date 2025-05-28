import time
import trimesh


class ObjParse:
    def __init__(self, file_path):
        self.file_path = file_path
        self.obj_mesh = trimesh.load_mesh(file_path)
        self.parse_result = {}

    def simple_parse(self):
        # 计算长宽高（使用 GPU 加速） 速度快10倍
        start_time = time.time()
        mesh = self.obj_mesh
        bounding_box_extents = mesh.bounding_box.extents
        length, width, height = bounding_box_extents
        self.parse_result["length"] = float(length)
        self.parse_result["width"] = float(width)
        self.parse_result["height"] = float(height)
        volume = mesh.volume
        area = mesh.area
        self.parse_result["volume"] = float(volume)
        self.parse_result["surface"] = float(area)
        end_time = time.time()
        print(f"xzz2021:=======长宽高====表面积====体积====== : {end_time - start_time}")

    def count_vertices_faces(self):
        """统计 Shape 对象中的顶点数和面片数"""
        start_time = time.time()
        vertex_count = len(self.obj_mesh.vertices)
        face_count = len(self.obj_mesh.faces)
        self.parse_result["points"] = vertex_count
        self.parse_result["triangles"] = face_count
        end_time = time.time()
        print(f"xzz2021:=======顶点数和面片数============== : {end_time - start_time}")

    def simple_run(self):
        self.simple_parse()
        self.count_vertices_faces()
        # self.calculate_thickness()
        points, triangles = (
            self.parse_result["points"],
            self.parse_result["triangles"],
        )
        self.parse_result["geometric_complexity"] = float(abs(points - triangles))
        self.parse_result["structural_strength"] = float(abs(points / triangles))

    def run(self):
        self.simple_run()
        return self.parse_result
