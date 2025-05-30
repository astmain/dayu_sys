<template>
    <div class="drawer-container">
        <el-scrollbar height="calc(100vh - 35px)" style="padding-right:24px;">
          <el-divider><h3 class="drawer-title">{{$t("content.themeStyleSettings")}}</h3></el-divider>
            <div class="setting-drawer-content">
                <div class="setting-drawer-block-checbox">
                    <div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-dark')">
                        <img src="@/assets/img/dark.svg" alt="dark">
                        <div v-if="sideTheme === 'theme-dark'" class="setting-drawer-block-checbox-selectIcon" style="display: block;">
                            <i aria-label="图标: check" class="anticon anticon-check">
                                <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="theme" aria-hidden="true"
                                     focusable="false" class="">
                                    <path
                                            d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/>
                                </svg>
                            </i>
                        </div>
                    </div>
                    <div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-light')">
                        <img src="@/assets/img/light.svg" alt="light">
                        <div v-if="sideTheme === 'theme-light'" class="setting-drawer-block-checbox-selectIcon" style="display: block;">
                            <i aria-label="图标: check" class="anticon anticon-check">
                                <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="theme" aria-hidden="true"
                                     focusable="false" class="">
                                    <path
                                            d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/>
                                </svg>
                            </i>
                        </div>
                    </div>
                </div>
            </div>

          <el-divider><h3 class="drawer-title">颜色</h3></el-divider>
          <ThemePicker />

          <el-divider><h3 class="drawer-title">{{$t("content.sysLanguage")}}</h3></el-divider>

            <div class="drawer-item">
              <el-radio-group :size="'small'" v-model="language">
                <el-radio :label="'zh'"><SvgIcon style="margin-right:5px" :size="'20px'" :iconClass="'zh'" />{{$t("content.china")}}</el-radio>
                <el-radio :label="'en'"><SvgIcon style="margin-right:5px" :size="'17px'" :iconClass="'en'" />{{$t("content.english")}}</el-radio>
              </el-radio-group>
            </div>

          <el-divider><h3 class="drawer-title">{{$t("content.sysSize")}}</h3></el-divider>

            <div class="drawer-item">
              <el-radio-group :size="'small'" v-model="sysSize">
                <el-radio style="margin-right:10px;" :label="'large'"><div class="u-f"><div><SvgIcon :size="'20px'" :iconClass="'size'" /></div><div style="line-height:27px">{{$t("content.large")}}</div></div></el-radio>
                <el-radio style="margin-right:10px;" :label="'default'"><div class="u-f"><div><SvgIcon :size="'16px'" :iconClass="'size'" /></div><div style="line-height:20px">{{$t("content.default")}}</div></div></el-radio>
                <el-radio :label="'small'"><div class="u-f"><div><SvgIcon :size="'12px'" :iconClass="'size'" /></div><div style="line-height:14px">{{$t("content.small")}}</div></div></el-radio>
              </el-radio-group>
            </div>

          <el-divider><h3 class="drawer-title">{{$t("content.sysLayoutConfig")}}</h3></el-divider>

            <div class="drawer-item">
                <span>{{$t("content.openTitle")}}</span>
                <el-switch v-model="topTitle" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>{{$t("content.openLabelView")}}</span>
                <el-switch v-model="tagsView" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>{{$t("content.fixedHeader")}}</span>
                <el-switch v-model="fixedHeader" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>{{$t("content.displayLogo")}}</span>
                <el-switch v-model="sidebarLogo" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>{{$t("content.dynamicTitle")}}</span>
                <el-switch v-model="dynamicTitle" class="drawer-switch" />
            </div>

            <el-divider/>
            <div class="u-f u-f-ajs">
              <el-button :size="settingStore.sysSize" type="primary" plain :icon="Plus" @click="saveSetting">{{$t("btn.saveConfig")}}</el-button>
              <el-button :size="settingStore.sysSize" plain :icon="Refresh" @click="resetSetting">{{$t("btn.resetConfig")}}</el-button>
            </div>

        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
    import {
        Plus,
        Refresh,
    } from '@element-plus/icons-vue'

    import {setLayoutSetting} from "@/utils/storage";
    import {handleGetCurInstance} from "@/utils/utils";
    import {computed, ref} from "vue";
    import {useStore} from "@/store/piniaAutoImport";
    import ThemePicker from "@/components/themePicker/index"

    const settingStore:any = useStore("useSetting")
    const appStore:any = useStore("useApp")
    const permissionStore:any = useStore("usePermission")

    let theme = ref(settingStore.themeColor.primary)
    let sideTheme = ref(settingStore.sideTheme)
    let predefineColorArr = ref(['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d'])
    let {axios,model,i18n} = handleGetCurInstance()

    const sysSize = computed<string>({
      get(){
        return settingStore.sysSize
      },
      set(val){
        settingStore.changeSetting({
          key:"sysSize",
          value:val
        })
      }
    })
    const language = computed<string>({
      get(){
        return settingStore.language
      },
      set(val){
        settingStore.changeSetting({
          key:"language",
          value:val
        })
      }
    })
    const fixedHeader = computed({
        get() {
            return settingStore.fixedHeader
        },
        set(val) {
            settingStore.changeSetting({
                key: 'fixedHeader',
                value: val
            })
        }
    })
    const topTitle = computed({
        get() {
            return settingStore.topTitle
        },
        set(val) {
            settingStore.changeSetting({
                key: 'topTitle',
                value: val
            })
            if (!val) {
                appStore.toggleSideBarHide(false)
                permissionStore.setSidebarRouters(permissionStore.defaultRoutes)
            }
        }
    })
    const tagsView = computed({
        get() {
            return settingStore.tagsView
        },
        set(val) {
            settingStore.changeSetting({
                key: 'tagsView',
                value: val
            })
        }
    })
    const sidebarLogo = computed({
        get() {
            return settingStore.sidebarLogo
        },
        set(val) {
            settingStore.changeSetting({
                key: 'sidebarLogo',
                value: val
            })
        }
    })
    const dynamicTitle = computed({
        get() {
            return settingStore.dynamicTitle
        },
        set(val) {
            settingStore.changeSetting({
                key: 'dynamicTitle',
                value: val
            })
        }
    })

    const handleTheme = (val:any) => {
        settingStore.changeSetting({
            key: 'sideTheme',
            value: val
        })
        sideTheme.value = val;
    }
    const saveSetting = () => {
      const loadingInstance = model.handleLoading({
            text: i18n.t("content.savingToLocal_pleaseWait"),
            background: "rgba(0, 0, 0, 0.7)"
        })
        setLayoutSetting({
            "language":language.value,
            "sysSize":sysSize.value,
            "topTitle":topTitle.value,
            "tagsView":tagsView.value,
            "fixedHeader":fixedHeader.value,
            "sidebarLogo":sidebarLogo.value,
            "dynamicTitle":dynamicTitle.value,
            "sideTheme":sideTheme.value,
            "themeColor":{
                ...settingStore.themeColor
            },
        })

        setTimeout(()=>{
            loadingInstance.close()
            settingStore.changeSetting({
                key: 'showSettings',
                value: false
            })
            window.location.reload()
        }, 1000)
    }
    const resetSetting = () => {
        model.handleLoading({
            text:i18n.t("content.clearingSettingsCacheAndRefreshing_pleaseWait"),
            background: "rgba(0, 0, 0, 0.7)"
        })
        setTimeout(()=>{
            window.location.reload()
        }, 1000)
    }
</script>

<style lang="scss" scoped>
    .setting-drawer-content {
        .setting-drawer-title {
            margin-bottom: 12px;
            color: rgba(0, 0, 0, .85);
            font-size: 14px;
            line-height: 22px;
            font-weight: bold;
        }

        .setting-drawer-block-checbox {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
            margin-bottom: 20px;

            .setting-drawer-block-checbox-item {
                position: relative;
                margin-right: 16px;
                border-radius: 2px;
                cursor: pointer;

                img {
                    width: 48px;
                    height: 48px;
                }

                .setting-drawer-block-checbox-selectIcon {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    padding-top: 15px;
                    padding-left: 24px;
                    color: #1890ff;
                    font-weight: 700;
                    font-size: 14px;
                }
            }
        }
    }

    .drawer-container {
        padding: 14px 0px 24px 24px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;

        .drawer-title {
            color: rgba(0, 0, 0, .85);
            font-size: 14px;
            line-height: 22px;
        }

        .drawer-item {
            color: rgba(0, 0, 0, .65);
            font-size: 14px;
            padding: 12px 0;
        }

        .drawer-switch {
            float: right
        }
    }
</style>
