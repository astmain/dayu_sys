import time

# import stepcode
from OCC.Core.IGESControl import IGESControl_Reader
from OCC.Core.IFSelect import IFSelect_RetDone
from OCC.Core.BRepBndLib import brepbndlib
from OCC.Core.Bnd import Bnd_Box
from OCC.Core.TopExp import TopExp_Explorer
from OCC.Core.TopAbs import TopAbs_VERTEX, TopAbs_FACE
from OCC.Core.GProp import GProp_GProps
from OCC.Core.BRepGProp import brepgprop


class IgsParse:
    def __init__(self, file_path):
        self.file_path = file_path
        self.read_igs_file()
        self.parse_result = {}

    def read_igs_file(self):
        """读取并解析 STEP 文件"""
        obj_reader = IGESControl_Reader()
        status = obj_reader.ReadFile(self.file_path)

        if status != IFSelect_RetDone:
            raise Exception("无法读取 STEP 文件")

        obj_reader.TransferRoots()
        shape = obj_reader.Shape()
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

    def simple_run(self):
        self.simple_parse()
        self.compute_volume_and_area()
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
