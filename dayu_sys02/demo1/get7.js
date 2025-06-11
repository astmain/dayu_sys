import path from "path";
import fs from "fs";
import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";


// 解析API路径，返回模块名和操作名
function parseApiPath(path) {
  const parts = path.split('/').filter(Boolean);
  return {
    moduleName: parts[0],
    operationName: parts[1]
  };
}

// 解析API参数
function parseApiParameters(properties) {
  return _.map(_.toPairs(properties), ([key, item]) => ({
    name: key,
    value: item.example,
    description: item.description
  }));
}

// 生成API函数文本
function generateApiFunctions(controllers) {
  // 按模块名分组
  const moduleGroups = _.groupBy(controllers, 'moduleName');

  const modulesText = Object.entries(moduleGroups)
    .map(([moduleName, operations]) => {
      const operationsText = operations
        .map(operation => {
          const params = operation.params.map(p => p.name).join(', ');
          return `    ${operation.operationName}: function({ ${params} }) {
      return axios.post("${operation.url}", { ${params} });
    }`;
        })
        .join(',\n\n');

      return `  ${moduleName}: {
${operationsText}
  }`;
    })
    .join(',\n\n');

  return `export const api = {
${modulesText}
}`;
}

// 创建输出目录
function createOutputDirectory(baseName) {
  const dirPath = `new_${baseName}__${dayjs().format('YYYY-MM-DD-HH-mm-ss')}`;
  fs.mkdirSync(dirPath, { recursive: true });
  return dirPath;
}

// 主函数
async function generateApiCode() {


  // 请求后端swagger的api，并返回api的json
  let config = { method: 'get', url: 'http://127.0.0.1:3000/api/swagger-json', };
  const response = await axios(config);
  let apiJson = response.data
  // console.log(`111---apiJson:`, JSON.stringify(apiJson, null, 2))




  try {
    // 解析控制器数据
    const controllers = Object.entries(apiJson.paths).map(([url, pathData]) => {
      const { moduleName, operationName } = parseApiPath(url);
      const { summary } = pathData.post;
      const dto = pathData.post.requestBody.content['application/json'].schema["$ref"]
        .replace("#/components/schemas/", "");

      return {
        url,
        moduleName,
        operationName,
        summary,
        dto
      };
    });

    // 解析schemas并匹配参数
    const schemas = apiJson.components.schemas;
    const controllersWithParams = controllers.map(controller => ({
      ...controller,
      params: parseApiParameters(schemas[controller.dto].properties)
    }));

    // 生成API代码
    const apiText = generateApiFunctions(controllersWithParams);

    // 创建输出目录和文件
    const outputDir = createOutputDirectory('api');
    const outputFile = path.join(process.cwd(), outputDir, 'api.js');

    // 写入文件
    fs.writeFileSync(outputFile, apiText, 'utf8');

    console.log(`API文件已成功生成: ${outputFile}`);

  } catch (error) {
    console.error('生成API代码时发生错误:', error);
    throw error;
  }
}

// 执行生成
generateApiCode();

/*
我希望生产的内容,如下

export const api = {
  orm1: {

   * 新增-数据库1
   * @param {string} params.name 姓名[必须是字符,不能未空]
   * @param {number} params.age 年龄
   * @param {string} params.password 密码
   * @param {string} params.tel 手机
   * @param {string} params.email 邮箱
   * @param {string} params.kind 分类
   * @returns
    create: function({ id, name }) {
      return axios.post("/orm1/create", { id, name });
    },

  },


}


帮我优化代码


*/
