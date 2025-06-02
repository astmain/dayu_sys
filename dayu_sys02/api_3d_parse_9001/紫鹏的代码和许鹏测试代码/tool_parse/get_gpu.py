import pynvml

# 初始化 NVML

def get_gpu():
    # 获取 GPU 设备数量
    pynvml.nvmlInit()
    device_count = pynvml.nvmlDeviceGetCount()

    for i in range(device_count):
        # 获取指定索引的 GPU 设备句柄
        handle = pynvml.nvmlDeviceGetHandleByIndex(i)
        # 获取 GPU 显存信息
        info = pynvml.nvmlDeviceGetMemoryInfo(handle)
        print(f"GPU {i}---显存:", f"总的: {info.total / 1024 ** 2:.2f} MiB", f"已用: {info.used / 1024 ** 2:.2f} MiB", f"空闲: {info.free / 1024 ** 2:.2f} MiB")
        # print(f"总的: {info.total / 1024 ** 2:.2f} MiB")
        # print(f"已用: {info.used / 1024 ** 2:.2f} MiB")
        # print(f"空闲: {info.free / 1024 ** 2:.2f} MiB")

    # 关闭 NVML
    pynvml.nvmlShutdown()


if __name__ == '__main__':
    import time

    print('python get_gpu.py', get_gpu())
    for ele in range(999 * 999):
        time.sleep(1)
        get_gpu()
