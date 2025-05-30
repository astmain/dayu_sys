const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function getImageAsBase64(url) {
    try {
        // 发送HTTP请求获取图片，设置responseType为arraybuffer
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        // 检查响应状态码
        if (response.status !== 200) {
            throw new Error(`请求失败，状态码: ${response.status}`);
        }

        // 获取图片的Content-Type
        const contentType = response.headers['content-type'];

        // 将二进制数据转换为Base64编码
        const base64 = Buffer.from(response.data, 'binary').toString('base64');

        // 构建完整的Data URI格式
        const dataUri = `data:${contentType};base64,${base64}`;

        return dataUri;
    } catch (error) {
        console.error('获取图片时出错:', error.message);
        throw error;
    }
}

// 使用示例
async function main() {
    const imageUrl = 'https://example.com/image.jpg'; // 替换为实际的图片URL

    try {
        const base64Image = await getImageAsBase64(imageUrl);
        console.log('Base64转换成功');

        // 可选：将Base64保存到文件以便查看
        const outputPath = path.join(__dirname, 'image_base64.txt');
        fs.writeFileSync(outputPath, base64Image);
        console.log(`Base64数据已保存到: ${outputPath}`);
    } catch (error) {
        console.error('处理图片时出错:', error.message);
    }
}

// 执行主函数
main();    