<!--
*- coding = utf-8 -*-
#@Time : 2022-10-05 23:04
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <Loading :isLoading="loading">
        <div class="top-style">
            <div class="form-style" v-if="showSearch">
              <FormList v-model="formSearchModel" ref="formRef" :formConfig="formConfig" @submit="handleSearch" @reset="handleReset"/>
            </div>
          <div class="other-option u-f u-f-ajs u-f-spa">
            <div class="u-f margin-bottom-10">
              <div class="margin-right-5">
                <el-button
                    v-if="(appStore.device=='mobile'?true:false) && (route.params.id?true:false)"
                    :size="settingStore.sysSize"
                    @click="handleGoBack"
                ><el-icon><ArrowLeft :style="'color:'+settingStore.themeColor.primary" /></el-icon></el-button>
              </div>
              <div class="margin-right-5">
                        <el-button
                                :size="settingStore.sysSize"
                                type="primary"
                                @click="handleAdd(false,menuAddRef)"
                                v-hasPower="['system:menuList:add']"
                        >{{$t("btn.add")}}</el-button>
              </div>
              <div class="margin-right-5">
                        <el-button
                                v-if="appStore.device=='mobile'?false:true"
                                :size="settingStore.sysSize"
                                type="info"
                                plain
                                @click="handleToggleExpandAll"
                                v-hasPower="['system:menuList:toggleExpandAll']"
                        >{{$t("btn.unfold")}}/{{$t("btn.fold")}}</el-button>
              </div>
            </div>
                  <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
            </div>
        </div>
        <div class="table-style">
                <TableList v-if="refreshTable" ref="tableListRef" :tableConfig="tableConfig" :default-expand-all="isExpandAll">
                    <template #menuName="row">
                      <template v-if="row.row.children.length>0 && appStore.device=='mobile'">
                        <div @click="handleToChild(row.row)" class="u-f" :style="'color:'+settingStore.themeColor.primary+';justify-content:end'">
                          <div class="margin-right-5">{{row.row.menuName}}</div>
                          <div class="u-f u-f-ac u-f-ajc">
                            <el-icon><ArrowRight /></el-icon>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                          {{row.row.menuName}}
                      </template>
                    </template>
                    <template #icon="row">
                        <div class="u-f u-f-ac" :style="appStore.device=='mobile'?'width:100%;height:100%;justify-content:end;':'width:100%;height:100%;justify-content: start;'">
                            <svgIcon :iconClass="row?.row?.icon" />
                        </div>
                    </template>
                    <template #perms="row">
                        {{row.row.perms}}
                    </template>
                    <template #status="row">
                      <DictTag style="margin-left:0px" :options="dicts.sysSwitches" :value="row.row.status" />
                    </template>
                    <template #visible="row">
                      <DictTag style="margin-left:0px" :options="dicts.sysShowStatus" :value="row.row.visible" />
                    </template>
                    <template #addTime="row">
                        <span>{{handleParseTime(row.row.addTime)}}</span>
                    </template>
                    <template #operation="row">
                        <div class="u-f">
                            <el-button :size="settingStore.sysSize" type="primary" v-hasPower="['system:menuList:edit']" @click="handleEdit(row.row,menuEditRef)">{{$t("btn.edit")}}</el-button>
                            <el-button :size="settingStore.sysSize" type="primary" v-hasPower="['system:menuList:addChild']" @click="handleAdd(row.row,menuAddRef)">{{$t("btn.add")}}</el-button>
                            <el-button :size="settingStore.sysSize" type="danger" v-hasPower="['system:menuList:del']" @click="handleDelete(row.row)">{{$t("btn.delete")}}</el-button>
                        </div>
                    </template>
                </TableList>
        </div>

        <!--        编辑-->
            <MenuEditDialog ref="menuEditRef" @handleCloseDialog="handleCloseDialog" />
        <!--        添加-->
            <MenuAddDialog ref="menuAddRef" @handleCloseDialog="handleCloseDialog" />
    </Loading>
</template>

<script setup lang="ts">
    import {ArrowRight,ArrowLeft} from '@element-plus/icons-vue'
    import Loading from "@/components/loading/index.vue"
    import FormList from '@/components/formList'
    import {handleParseTime} from "@/utils/utils";
    import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
    import {useFunc} from "./hooks/useFunc";
    import {defineAsyncComponent} from "vue";
    const MenuEditDialog = defineAsyncComponent(() => import("./cpns/menuEditDialog/index.vue"))
    const MenuAddDialog = defineAsyncComponent(() => import("./cpns/menuAddDialog/index.vue"))
    const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
    const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))
    const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))

    let {handleGoBack,handleToChild,handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleEdit,handleCloseDialog,handleAdd,handleToggleExpandAll,
      route,tableListRef,formRef,menuEditRef,menuAddRef,appStore,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,isExpandAll,refreshTable,loading} = useFunc()
    let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)

</script>

<style scoped lang="less">
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
