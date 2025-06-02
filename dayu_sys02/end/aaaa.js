const fetch = require('node-fetch');
const {Buffer} = require('buffer');

async function getImageAsBase64(url) {
    try {
        const response = await fetch(url);

        // 检查请求是否成功
        if (!response.ok) {
            throw new Error(`Unable------------ to fetch image: ${response.statusText}`);
        }

        console.log(`111---222:`, response)


        // 确定图片的 MIME 类型，以便正确构建 Data URL
        const contentType = response.headers.get('content-type');

        console.log(`111---222:`, contentType)


    } catch (error) {
        console.error('Error222222222 fetching the image:', error.message);
    }
}

// 使用示例
const imageUrl = 'https://img2.baidu.com/it/u=1067594889,3904550527&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500';
getImageAsBase64(imageUrl);