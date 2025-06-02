from fastapi import APIRouter
import os

route = APIRouter()


@route.get("/test")
async def test(name: str = "xupeng"):
    return {"test": 111}


if __name__ == '__main__':
    pic_path = r'./111.png'
    file_path = r'static/111.stl'
