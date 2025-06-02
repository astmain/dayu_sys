axios = require('axios')


fun1()
async function fun1() {
    console.log(`111---222:`, await fs_img_url_to_base64("https://img2.baidu.com/it/u=1067594889,3904550527&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"))

}


async function fs_img_url_to_base64(url) {
    try {
        // @ts-ignore
        const config = {
            responseType: 'blob',
        }
        // @ts-ignore
        const response = await axios.get(url, config);


        // ✅ 正确使用 Buffer.from(arrayBuffer)
        // @ts-ignore
        // const buffer = Buffer.from(response.data);
        // @ts-ignore
        const buffer = Buffer.from(response.data);
        const base64 = buffer.toString('base64');

        const mimeType = response.headers['content-type'] || 'image/jpeg';
        return `data:${mimeType};base64,${base64}`;
    } catch (error) {
        console.log(`fs_img_url_to_base64---error:`, error)
        throw new Error('图片转换失败');
    }
}