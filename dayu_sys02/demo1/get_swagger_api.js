//帮我写一个函数，请求后端swagger的api，并返回api的json

const axios = require('axios');

async function getSwaggerApi(swaggerUrl) {
    try {
        // 发送GET请求获取Swagger文档
      let  config = {
            method: 'get',
            url: 'http://127.0.0.1:3000/api/swagger-json',
            // headers: { 
            //    'Pragma': 'no-cache', 
            //    'language': 'zh-CN', 
            //    'Cookie': '_ga=GA1.1.742045458.1718473415; _ga_M74ZHEQ1M1=GS1.1.1732721947.44.0.1732721947.0.0.0', 
            //    'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
            // }
         };


        const response = await axios(config);
        
        // 返回API文档数据
        return response.data;
    } catch (error) {
        console.error('获取Swagger API文档失败:', error.message);
        throw error;
    }
}

// 使用示例 改成异步    
const swaggerUrl = 'http://127.0.0.1:3000/swagger-json'; // 替换为实际的Swagger文档URL

main()
async function main(swaggerUrl) {

    let res =await getSwaggerApi(swaggerUrl  )
    console.log(`111---:`,      JSON.stringify(res,null,2)         )
    
}








