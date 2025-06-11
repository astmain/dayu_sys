import path from "path";
import fs from "fs";
import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";



let api_json = {
  "openapi": "3.0.0",
  "paths": {
    "/orm1/create": {
      "post": {
        "operationId": "orm1_create",
        "summary": "新增-数据库1",
        "parameters": [
          {
            "name": "token",
            "in": "header",
            "description": "token",
            "required": true,
            "schema": {
              "type": "string",
              "default": "token11111111"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/orm1_create"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": ""
          }
        },
        "tags": [
          "数据库1-管理"
        ]
      }
    },
    "/orm1/findListALl": {
      "post": {
        "operationId": "orm1_findListALl",
        "summary": "查询-数据库1-列表",
        "parameters": [
          {
            "name": "token",
            "in": "header",
            "description": "token",
            "required": true,
            "schema": {
              "type": "string",
              "default": "token11111111"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/orm1_find"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": ""
          }
        },
        "tags": [
          "数据库1-管理"
        ]
      }
    }
  },
  "info": {
    "title": "文档标题",
    "description": "文档描述:测试使用",
    "version": "0.0.1",
    "contact": {}
  },
  "tags": [],
  "servers": [
    {
      "url": "1111",
      "description": "Local environment"
    }
  ],
  "components": {
    "schemas": {
      "orm1_create": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "id",
            "example": 18
          },
          "name": {
            "type": "string",
            "description": "姓名[必须是字符,不能未空]",
            "example": "小许"
          }
        },
        "required": [
          "id",
          "name"
        ]
      },
      "orm1_find": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "姓名[必须是字符,不能未空]",
            "example": "小许"
          }
        },
        "required": [
          "name"
        ]
      }
    }
  }
}

//   根据api_json的数据,帮我封装一个函数解析数据生产类似这样的代码,用fs写入 [new当前时间戳].js文件中






async function main(api_json) {
  // 得到控制controlller数据
  let controlller = []
  for (const key in api_json.paths) {
    let url = key
    let summary = api_json.paths[key].post.summary
    let dto = api_json.paths[key].post.requestBody.content['application/json'].schema["$ref"].replace("#/components/schemas/", "")
    let ele = { url, summary, dto }
    controlller.push(ele)
  }
  console.log(`111---controlller:`, JSON.stringify(controlller, null, 2))

  // 得到schemas数据
  let schemas = api_json.components["schemas"]

  // 控制器controlller匹配schemas数据
  let controlller_match = controlller.map(o => {
    let properties = schemas[o.dto].properties
    const params = _.map(_.toPairs(properties), ([key, item]) => ({
      label: key,
      value: item.example,
      description: item.description
    }));
    return { ...o, params }
  })
  console.log(`444---:`, JSON.stringify(controlller_match, null, 2))

  // 生成API函数文本
  let apiText = ` export const api = {
    ${controlller_match.map(o => {
    let key = o.url
    const params = o.params.map(item => item.label).join(',');
    return `  "${key}": function({${params}}) {
    return axios.post("${o.url}", {${params}});
  }`
  }).join(',\n\n')}
}

`

  // 创建文件夹
  const name = 'api'
  const path_dir = `new_${name}__` + dayjs().format('YYYY-MM-DD-HH-mm-ss');
  console.log(`666---创建文件夹---dir_path:`, JSON.stringify(path_dir, null, 2))
  fs.mkdirSync(path_dir, { recursive: true });

  //写入文件
  const path_file = path.join(process.cwd(), path_dir, name + ".js");
  fs.writeFileSync(path_file, apiText, 'utf8');
}

main(api_json)  
