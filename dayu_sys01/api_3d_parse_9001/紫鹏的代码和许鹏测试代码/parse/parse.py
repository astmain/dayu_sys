#!/usr/bin/env python
# -*- coding:utf-8 -*-
import os
import time
from typing import Dict, Any
from app.parse.stl_parser import StlParse
from app.parse.stp_parser import StepParse
from app.parse.igs_parser import IgsParse
from app.parse.obj_parser import ObjParse


class ModelParser:
    def parse_model(self, file_path: str) -> Dict[str, Any]:
        start_time = time.time()
        print(f"xzz2021:=======开始解析============== : {file_path}")
        file_extension = os.path.splitext(file_path)[1]
        result = {
            "length": 0,
            "width": 0,
            "height": 0,
            "volume": 0,
            "surface": 0,
            "triangles": 0,
            "points": 0,
            "min_thickness": 0,
            "thickness_proportion": 0,
            "geometric_complexity": 0,
            "structural_strength": 0,
        }
        res = {}
        if file_extension == ".stl":
            stl_parser = StlParse(file_path)
            res = stl_parser.run()
        elif file_extension in [".step", ".stp"]:
            step_parser = StepParse(file_path)
            res = step_parser.run()
        elif file_extension in [".iges", ".igs"]:
            iges_parser = IgsParse(file_path)
            res = iges_parser.run()
        elif file_extension == ".obj":
            obj_parser = ObjParse(file_path)
            res = obj_parser.run()
        result.update(res)
        end_time = time.time()
        print(f"xzz2021:=======解析总耗时============== : {end_time - start_time}")
        return result
