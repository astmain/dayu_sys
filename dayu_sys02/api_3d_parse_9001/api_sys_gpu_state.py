from fastapi import APIRouter
from fastapi import FastAPI, Query, Path
import os

# 自定义包
from tool import tool
from config_logger import print


route = APIRouter()


# def api_parse(gpu_or_cpu: str = Query(description="gpu_或者_cpu", default="cpu", min_length=3, max_length=3),
#               uid: str = Query(description="用户uid", default="123", min_length=1, max_length=250),
#               #   path_file: str = Query(description="关联文件相对路径", default=tool.file_join("static/111.stl"), min_length=2, max_length=1000),
#               path_file: str = Query(description="关联文件相对路径", default="filestore/111.stl", min_length=2, max_length=1000),
#               ):


@route.get("/api_sys_gpu_state")
async def api_sys_gpu_state(gpu_index: int = Query(description="gpu第几核心数,默认0", default=0, ge=0, le=250), ):
    gpu_state = tool.sys_gpu_state(gpu_index)
    result = {'code': 200, 'msg': "成功:获取gpu状态", 'data': {'gpu_state': gpu_state}, 'err': ''}
    # print("📄响应数据:", result)
    return result
