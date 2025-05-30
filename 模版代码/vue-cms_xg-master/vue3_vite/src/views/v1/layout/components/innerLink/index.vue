<!--
*- coding = utf-8 -*-
#@Time : 2022/9/11 14:18
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<script lang="ts">

import { h } from "vue";
import {useRoute} from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const link = route.meta.link;
    if (link === "") {
      return "404";
    }
    let url = link;
    const height = document.documentElement.clientHeight - 94.5 + "px";
    const style = { height: height };
    // 返回渲染函数
    return () =>
        h(
            "div",
            {
              style: style,
            },
            h("iframe", {
              src: url,
              frameborder: "no",
              width: "100%",
              height: "100%",
              scrolling: "auto",
            })
        );
  },
};
</script>
