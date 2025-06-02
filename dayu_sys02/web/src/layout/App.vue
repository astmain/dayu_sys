<template>
    <el-container v-if="!show_login" style="min-height: 100vh;">
        <!-- 头部 -->
        <el-header class="header"
            style="background-color: #24292E; color: #fff;  display: flex;align-items: center;justify-content: space-between;">
            <el-button v-if="BUS.user.username === 'admin'" @click="admin_super_dialog()">{{ BUS.user.username ?
                BUS.user.username + '2' : '未登录' }}</el-button>
            <div v-else>{{ BUS.user.username ? BUS.user.username + '1' : '未登录' }}</div>
            <div @click="Logout">Logout</div>
            <div @click="get_pages">get_pages</div>
        </el-header>
        <el-container>
            <!-- 菜单    -->
            <el-aside width="180px">
                <el-menu :default-active="$route.path" background-color="#24292E" active-text-color="#ffd04b"
                    text-color="#fff" class="menu_height" router>
                    <template v-for="ele in BUS.user.menus_tree">
                        <el-menu-item class="没有子菜单" v-if="!ele.children || ele?.children?.length === 0" :index="ele.path_full   ||  ele.path">
                            <span>{{ ele.menu? ele.menu : ele.name }}</span>
                        </el-menu-item>
                        <el-sub-menu class="拥有子菜单" v-else :index="ele.path_full   ||  ele.path">
                            <template #title>
                                <span>{{ ele.menu? ele.menu : ele.name }}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="item in ele.children" :index="item.path_full   ||  item.path ">
                                    <span>{{ item.menu? item.menu : item.name }}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </template>
                </el-menu>
            </el-aside>
            <!-- 内容 -->
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>

    <!-- 2222 -->
    <el-container v-else style="min-height: 100vh;">
        <router-view />
    </el-container>

</template>

<script>


let menu_list = require('@src/router/index.js').menu_list

export default {
    computed: {
        show_login() {
            if (this.$route.path === '/login') return true
            if (!localStorage.getItem('token')) return true
        }

    },
    data() {
        return {
            name: "数据1",
            // menu_tree: menu_list,
            menu_tree: BUS.user.menus_tree,
        }


    },

    methods: {
        async Logout() {
            localStorage.removeItem('token')
            this.$router.push('/login')
        },//

        // 添加子菜单
        async admin_super_dialog() {
            console.log('admin_super_dialog')
            require('./admin_super_dialog.jsx')({ data: { aaa: 111 }, that: this })
        },

        async get_pages(){

  
        }




    },////

    async mounted() {
        //   测试路由守卫
        //   localStorage.getItem('token')
        //   localStorage.removeItem('token')
    },////

}
</script>

<style>
.menu_height {
    height: calc(100vh - 60px);
    border-right: none;
}

.el-aside {
    /* background: #ffffff; */
    /* border-right: solid 1px #e6e6e6; */
}

.el-main {
    padding: 20px;
}

html {
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
}

body {
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
}


h1,
h2,
h3,
h4,
h5 {
    padding: 0;
    margin: 0;
}
</style>