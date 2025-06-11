
export const api = {
  orm1: {
    /**
     * 新增-数据库1
     * @param {number} params.id 数据库表的唯一id
     * @param {string} params.name 姓名[必须是字符,不能未空] 
    */
    create: function ({ id, name }) {
      return axios.post("/orm1/create", { id, name });
    },

    /**
     * 删除-数据库1
     * @param {number} params.id 数据库表的唯一id 
    */
    del: function ({ id }) {
      return axios.post("/orm1/del", { id });
    },

    /** 更新-数据库1
    @param {number} params.id 数据库表的唯一id
    @param {string} params.name 姓名[必须是字符,不能未空]
    @param {number} params.age 年龄
    @param {string} params.password 密码
    @param {string} params.tel 手机
    @param {string} params.email 邮箱
    @param {string} params.kind 分类 */
    update: ({ id, name, age, password, tel, email, kind }) => {
      return axios.post("/orm1/update", { id, name, age, password, tel, email, kind });
    },

    /**
     * 查询-数据库1-列表
     * @param {string} params.name 姓名[必须是字符,不能未空] */
    findListALl: function ({ name }) {
      return axios.post("/orm1/findListALl", { name });
    }
  },

  orm2: {
    /**
     * 新增-数据库2
     * @param {string} params.name 姓名[必须是字符,不能未空]
     * @param {number} params.age 年龄
     * @param {string} params.password 密码
     * @param {string} params.tel 手机
     * @param {string} params.email 邮箱
     * @param {string} params.kind 分类 
    */
    create: function ({ name, age, password, tel, email, kind }) {
      return axios.post("/orm2/create", { name, age, password, tel, email, kind });
    },

    /**
     * 删除-数据库2
     * @param {number} params.id id 
    */
    del: function ({ id }) {
      return axios.post("/orm2/del", { id });
    },

    /**
     * 更新-数据库2
     * @param {number} params.id id
     * @param {string} params.name 姓名[必须是字符,不能未空]
     * @param {number} params.age 年龄
     * @param {string} params.password 密码
     * @param {string} params.tel 手机
     * @param {string} params.email 邮箱
     * @param {string} params.kind 分类 
    */
    update: function ({ id, name, age, password, tel, email, kind }) {
      return axios.post("/orm2/update", { id, name, age, password, tel, email, kind });
    },

    /**
     * 查询-数据库2-列表
     * @param {string} params.name 姓名[必须是字符,不能未空] 
    */
    findListAll: function ({ name }) {
      return axios.post("/orm2/findListAll", { name });
    }
  }
}