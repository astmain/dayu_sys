# -*- coding: utf-8 -*-
import os
import uvicorn
from config_app import app

# 路由引入=====================================
from api_test import route as api_test
from api_parse import route as api_parse
from api_parse_nestjs import route as api_parse_nestjs
from api_sys_gpu_state import route as api_sys_gpu_state

# 路由注册=====================================
app.include_router(api_test, tags=["测试", ])
app.include_router(api_parse, tags=["解析3d模型", ])
app.include_router(api_parse_nestjs, tags=["解析3d模型nestjs", ])
app.include_router(api_sys_gpu_state, tags=["查看电脑运行状态", ])

if __name__ == '__main__':
    print("""
    文档======================================
    本地    http://127.0.0.1:9001/docs
    服务器  http://192.168.0.111:9001/docs

    资源======================================
    http://127.0.0.1:9001/static/png.png
    http://127.0.0.1:9001/filestore/text.txt
    #
    http://192.168.0.111:9001/static/png.png
    http://192.168.0.111:9001/filestore/text.txt
    
    # 测试
    http://127.0.0.1:9001/static/png.png
    http://127.0.0.1:9001/filestore/png.png
    http://127.0.0.1:9001/static_store/png.png
    http://127.0.0.1:9001/static_store/png.png
    
    接口======================================
    http://127.0.0.1:9001/index
    http://127.0.0.1:9001/readme.md

    """)

    # os.environ.set('api', True)
    os.environ['api'] = "api"
    # uvicorn.run('main:app', host='0.0.0.0', port=9001, reload=True, workers=1)
    uvicorn.run('main:app', host='0.0.0.0', port=9001, reload=True, workers=1, log_level="warning", access_log=False)

    """
    这一行uvicorn main:app --log-level warning --access-log false  
    怎么用写成 uvicorn.run('main:app', host='0.0.0.0', port=9001, reload=True, workers=1)
    
    
    """
