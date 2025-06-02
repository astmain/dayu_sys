import os

path_file = r"D:\AAA_desktop\test1_demo\111.stl"
# path_file = os.path.join(os.getcwd(), r"111.stl")
print("path_file---:", path_file)

from stl_parser import StlParse

stl_parser = StlParse(path_file)
res = stl_parser.run()
print("res---:", res)
