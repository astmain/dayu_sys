const { Blob } = require('buffer');

async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new require('buffer').FileReader();
        reader.onload = () => {
            resolve(reader.result); // Base64 Data URL
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsDataURL(blob);
    });
}

// 使用示例：
(async () => {
    const response = await fetch('https://img2.baidu.com/it/u=1067594889,3904550527&fm=253&fmt=auto&app=138&f=JPEG');
    const blob = await response.blob();

    const base64 = await blobToBase64(blob);
    console.log(base64); // 输出: data:image/png;base64,xxxxx
})();