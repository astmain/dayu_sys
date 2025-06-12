import axios from "axios";



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






function main(api_json) {
  let res = api_json.paths
  // console.log(`111---:`, JSON.stringify(res, null, 2))


  let findListALl = api_json.paths["/orm1/findListALl"]
  console.log(`222---findListALl:`, JSON.stringify(findListALl, null, 2))


  let schemas = api_json.components["schemas"]
  console.log(`333---schemas:`, JSON.stringify(schemas, null, 2))



  let operationId = api_json.paths["/orm1/findListALl"].post.operationId
  console.log(`444---operationId:`, operationId)


  let schemas_id = api_json.paths["/orm1/findListALl"].post.requestBody.content['application/json'].schema["$ref"]
  schemas_id = schemas_id.replace("#/components/schemas/", "")

  console.log(`555---schemas_id:`, schemas_id)




  let match = schemas[schemas_id]

  console.log(`666---match:`, JSON.stringify(match, null, 2))




}

main(api_json)  
