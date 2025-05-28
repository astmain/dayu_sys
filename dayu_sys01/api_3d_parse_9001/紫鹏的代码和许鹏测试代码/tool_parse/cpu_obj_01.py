from tool.wrapper_time_func import wrapper_func_time


@wrapper_func_time
def cpu_obj_01(path_file):
    state = {}
    print('执行---cpu_obj_01---=====================================================')
    print(f"=======读取文件=====================================================")
    import trimesh
    print("path_file---:", path_file)
    obj_mesh = trimesh.load_mesh(path_file)

    print(f"=======长宽高=====================================================")
    mesh = obj_mesh
    bounding_box_extents = mesh.bounding_box.extents
    length, width, height = bounding_box_extents
    state["length"] = float(length)
    state["width"] = float(width)
    state["height"] = float(height)
    print('state["length"]---:', state["length"])
    print('state["width"]---:', state["width"])
    print('state["height"]---:', state["height"])

    print(f"=======体积和表面积===============================================")
    state["part_volume"] = mesh.volume
    state["part_surface_area"] = mesh.area

    print(f"=======顶点数和面片数===============================================")
    vertex_count = len(obj_mesh.vertices)
    face_count = len(obj_mesh.faces)
    points = vertex_count
    triangles = face_count
    print("points---:", points)
    print("triangles---:", triangles)

    print(f"=======厚度===============================================")
    state["min_thickness"] = 3.1415  # todo 临时数据
    state["thickness_proportion"] = 3.1415  # todo 临时数据

    print(f"=======绝对值===============================================")
    state["part_complexity"] = float(abs(points - triangles))
    state["structural_strength"] = float(abs(points / triangles))
    print('state["part_complexity"]---:', state["part_complexity"])
    print('state["structural_strength"]---:', state["structural_strength"])
    return state


if __name__ == '__main__':
    path_file = r"D:\AAA_desktop\test1_demo\111.obj"
    state = cpu_obj_01(path_file)
    print('state---:', state)

    from tool.check_form import check_form
    from tool.check_form import check_form
    from tool.check_rule import check_rule

    check_result = check_form(rule=check_rule, data=state, allow_other_field=True)
    print('check_result---:', check_result)
