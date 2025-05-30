<!--
*- coding = utf-8 -*-
#@Time : 2022/9/25 17:12
#@Author : 沉默小管
#@File : data.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <Loading :isLoading="loading">
        <div class="top-style">
            <div class="form-style" v-if="showSearch">
              <FormList v-model="formSearchModel" ref="formRef" :formConfig="formConfig" @submit="handleSearch" @reset="handleReset">
                <template #dictId="row">
                  <el-select v-model="formSearchModel.dictId" placeholder="请选择角色" clearable>
                    <el-option v-for="item in row.row.options" :label="item.dictName" :value="item.id+''">{{item.dictName}}</el-option>
                  </el-select>
                </template>
              </FormList>
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
                                @click="handleAdd(dictDataAddDialogRef)"
                        >{{$t("btn.add")}}</el-button>
              </div>
              <div class="margin-right-5">
                        <el-button
                                :size="settingStore.sysSize"
                                type="danger"
                                :disabled="multiple"
                                @click="handleDelete"
                        >{{$t("btn.mulDel")}}</el-button>
              </div>
            </div>
                  <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
          </div>
        </div>
        <div class="table-style">
                <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig"
                           @selection-change="handleTableSelectionChange"
                           @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
                    <template #status="row">
                      <DictTag style="margin-left:0px" :options="dicts.sysSwitches" :value="row.row.status" />
                    </template>
                    <template #addTime="row">
                      <span>{{handleParseTime(row.row.addTime)}}</span>
                    </template>
                    <template #operation="row">
                        <div class="u-f">
                            <el-button :size="settingStore.sysSize" type="primary" @click="handleEdit(row.row,dictDataEditDialogRef)">{{$t("btn.edit")}}</el-button>
                            <el-button :size="settingStore.sysSize" type="danger" @click="handleDelete(row.row)">{{$t("btn.delete")}}</el-button>
                        </div>
                    </template>
                </TableList>
        </div>


        <!--        编辑-->
            <G_DictDataEditDialog ref="dictDataEditDialogRef" @handleCloseDialog="handleCloseDialog"  />
        <!--        添加-->
            <G_DictDataAddDialog ref="dictDataAddDialogRef" @handleCloseDialog="handleCloseDialog" />
    </Loading>
</template>

<script setup lang="ts">
    import {ArrowLeft} from '@element-plus/icons-vue'
    import {handleParseTime} from "@/utils/utils";
    import Loading from "@/components/loading/index.vue"
    import FormList from '@/components/formList'
    import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
    import {useFunc} from "@/views/system/dictList/hooks/useDataFunc";
    import {defineAsyncComponent, ref} from "vue";
    const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
    const G_DictDataEditDialog = defineAsyncComponent(() => import("./cpns/dictDataEditDialog/index.vue"))
    const G_DictDataAddDialog = defineAsyncComponent(() => import("./cpns/dictDataAddDialog/index.vue"))
    const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
    const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))

    let {appStore,formRef,ids,tableListRef,dictDataEditDialogRef,dictDataAddDialogRef,handleTableSelectionChange,handleGoBack,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,
        route,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,curDictId,dictList,loading} = useFunc()
    let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>
