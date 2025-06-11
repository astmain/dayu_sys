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
    "/orm1/del": {
      "post": {
        "operationId": "orm1_del",
        "summary": "删除-数据库1",
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
                "$ref": "#/components/schemas/orm1_del"
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
    "/orm1/update": {
      "post": {
        "operationId": "orm1_update",
        "summary": "更新-数据库1",
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
                "$ref": "#/components/schemas/orm1_update"
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
          "name": {
            "type": "string",
            "description": "姓名[必须是字符,不能未空]",
            "example": "小许"
          },
          "age": {
            "type": "number",
            "description": "年龄",
            "example": 18
          },
          "password": {
            "type": "string",
            "description": "密码",
            "example": "123456"
          },
          "tel": {
            "type": "string",
            "description": "手机",
            "example": "15160315110"
          },
          "email": {
            "type": "string",
            "description": "邮箱",
            "example": "1311192345.com"
          },
          "kind": {
            "type": "string",
            "description": "分类",
            "example": "个人"
          }
        },
        "required": [
          "name",
          "age",
          "password",
          "tel",
          "email",
          "kind"
        ]
      },
      "orm1_del": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "id",
            "example": 18
          }
        },
        "required": [
          "id"
        ]
      },
      "orm1_update": {
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
          },
          "age": {
            "type": "number",
            "description": "年龄",
            "example": 18
          },
          "password": {
            "type": "string",
            "description": "密码",
            "example": "123456"
          },
          "tel": {
            "type": "string",
            "description": "手机",
            "example": "15160315110"
          },
          "email": {
            "type": "string",
            "description": "邮箱",
            "example": "1311192345.com"
          },
          "kind": {
            "type": "string",
            "description": "分类",
            "example": "个人"
          }
        },
        "required": [
          "id",
          "name",
          "age",
          "password",
          "tel",
          "email",
          "kind"
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


//   根据api_json的数据,帮我把每一个数据生产类似这样的代码

/** 
* 查询-数据库1-列表
* @param {string} params.name 姓名[必须是字符,不能未空]
* @returns
*/
export function orm1__findListALl({ name }) {
  return axios.post(`/orm1/findListALl`, { name });
}

/** 
 * 新增-数据库1
 * @param {string} params.name 姓名[必须是字符,不能未空]
 * @param {number} params.age 年龄
 * @param {string} params.password 密码
 * @param {string} params.tel 手机
 * @param {string} params.email 邮箱
 * @param {string} params.kind 分类
 * @returns
 */
export function orm1__create({ name, age, password, tel, email, kind }) {
  return axios.post(`/orm1/create`, { name, age, password, tel, email, kind });
}

/** 
 * 删除-数据库1
 * @param {number} params.id id
 * @returns
 */
export function orm1__del({ id }) {
  return axios.post(`/orm1/del`, { id });
}

/** 
 * 更新-数据库1
 * @param {number} params.id id
 * @param {string} params.name 姓名[必须是字符,不能未空]
 * @param {number} params.age 年龄
 * @param {string} params.password 密码
 * @param {string} params.tel 手机
 * @param {string} params.email 邮箱
 * @param {string} params.kind 分类
 * @returns
 */
export function orm1__update({ id, name, age, password, tel, email, kind }) {
  return axios.post(`/orm1/update`, { id, name, age, password, tel, email, kind });
}
