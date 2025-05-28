def parse_3d_screenshot_to_img_png(file_path="", pic_path=""):
    import vtkmodules.all as vtk
    # 渲染器
    renderer = vtk.vtkRenderer()
    render_window = vtk.vtkRenderWindow()
    render_window.SetOffScreenRendering(True)
    render_window.AddRenderer(renderer)

    # 渲染器交互控制器
    render_interactor = vtk.vtkRenderWindowInteractor()
    render_interactor.SetRenderWindow(render_window)

    reader = vtk.vtkSTLReader()
    reader.SetFileName(file_path)
    reader.Update()

    # Mapper 将几何数据与渲染器连接
    mapper = vtk.vtkPolyDataMapper()
    mapper.SetInputConnection(reader.GetOutputPort())

    # Actor 用于在渲染器中展示模型
    actor = vtk.vtkActor()
    actor.SetMapper(mapper)

    # 添加模型到渲染器
    renderer.AddActor(actor)
    renderer.SetBackground(0.733, 0.871, 0.984)  # 设置蓝色背景

    # 设置窗口大小
    render_window.SetSize(350, 350)

    # 设置相机的45°视角
    camera = renderer.GetActiveCamera()
    camera.Azimuth(45)  # 水平旋转45°
    camera.Elevation(30)  # 上下旋转30°，使视角更具立体感
    camera.SetViewUp(0, 0, 1)  # 设置视角的上方向
    renderer.ResetCamera()

    # 渲染图像
    render_window.Render()

    # 使用vtkWindowToImageFilter抓取窗口内容
    window_to_image_filter = vtk.vtkWindowToImageFilter()
    window_to_image_filter.SetInput(render_window)
    window_to_image_filter.Update()

    # 使用vtkPNGWriter保存图像
    writer = vtk.vtkPNGWriter()
    writer.SetFileName(pic_path)
    writer.SetInputConnection(window_to_image_filter.GetOutputPort())
    writer.Write()


if __name__ == '__main__':
    print("111---:" ,  111   )
    pic_path = r'./111.png'
    file_path = r'./111.stl'
    # file_path = r'D:\AAA_desktop\test1_demo\111.stl'
    try:
        parse_3d_screenshot_to_img_png(file_path=file_path, pic_path=pic_path)
        print("成功111---parse_3d_screenshot_to_img_png---111:", )
    except Exception as error:
        print("失败222---parse_3d_screenshot_to_img_png---222:", str(error))
