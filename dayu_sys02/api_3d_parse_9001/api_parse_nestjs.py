from fastapi import APIRouter
from pydantic import BaseModel
from typing import Literal
from fastapi import FastAPI, Query, Path

# 自定义包
from config_logger import print as print_log
from tool import tool
from util.util_3d_file_screenshot_img import util_3d_file_screenshot_img
from util_parse_stl import util_parse_stl
from util_parse_igs import util_parse_igs
from util_parse_obj import util_parse_obj
from util_parse_stp import util_parse_stp

cupy = None
import numpy

try:
    import cupy

    print("成功      cupy      :", cupy)
except Exception as error:
    cupy = numpy

route = APIRouter()


@route.post("/api_parse_nestjs")
def api(
        gpu_or_cpu: str = Query(description="gpu_或者_cpu", default="cpu", min_length=3, max_length=3),
        uid: str = Query(description="用户uid", default="123", min_length=1, max_length=250),
        path_file: str = Query(description="关联文件相对路径", default="filestore/111.stl", min_length=2, max_length=1000),
        path_url: str = Query(description="网络路径", default="http://127.0.0.1:10001/static_store/", min_length=2, max_length=1000),

):
    # 判断使用gpu还是cpu
    if gpu_or_cpu == "gpu":
        print("使用gpu解析")
        curr_np = cupy
    else:
        print("使用gpu解析")
        curr_np = numpy

    # 判断文件是否存在
    if not tool.file_exist(path_file):
        result = {'code': 404, 'msg': "失败:文件路径不存在", 'data': {}, 'err': ''}
        print("result---:", result)
        return result

    try:
        suffix = tool.file_suffix(path_file)
        print('suffix---:', suffix)
        # 文件解析
        state = {}  # 解析厚的数据
        if suffix == ".stl":
            state = util_parse_stl().run(path_file=path_file, curr_np=curr_np)
        elif suffix == ".igs":
            state = util_parse_igs().run(path_file=path_file, curr_np=curr_np)
        elif suffix == ".obj":
            state = util_parse_obj().run(path_file=path_file, curr_np=curr_np)
        elif suffix == ".stp":
            state = util_parse_stp().run(path_file=path_file, curr_np=curr_np)
        else:
            result = {'code': 415, 'msg': f"失败:暂不支持{suffix}文件格式", 'data': {}, 'err': ''}
            print("result---:", result)
            return result
        # 截图功能
        # screenshot_img = util_3d_file_screenshot_img(path_file, path_file + ".png.png")
        print("111---:", tool.file_attrs(path_file)['path_name'] + ".png")
        print("222---:", tool.file_attrs(path_file))

        img_path = util_3d_file_screenshot_img(path_file, tool.file_attrs(path_file)['path_name'] + ".png")
        img_url = path_url + tool.file_attrs(path_file)['name'] +  ".png"
        print("img_path---:", img_path)
        state['img_path'] = img_path  # http://127.0.0.1:9001/project/filestore/111.stl.png.png
        state['img_url'] = img_url  # http://127.0.0.1:9001/project/filestore/111.stl.png.png

        # 响应结构
        result = {'code': 200, 'msg': f"成功:解析", 'data': state, 'err': ''}
        # print_log("result---:", result)
        return result


    # 程序异常捕获
    except Exception as error:
        print("失败------:", error)
        result = {'code': 500, 'msg': "程序异常", 'data': {}, 'err': str(error)}
        # print_log("result---:", result)
        return result


if __name__ == '__main__':
    pass
    # path_file = tool.file_join("static/111.stl")
    # run(path_file)
