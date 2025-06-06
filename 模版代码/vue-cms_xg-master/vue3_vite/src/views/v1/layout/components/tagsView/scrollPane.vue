<template>
    <el-scrollbar ref="scrollPaneRef" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
        <slot />
    </el-scrollbar>
</template>

<script setup lang="ts">

import {ElScrollbar} from "element-plus";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";

const tagAndTagSpacing =ref(4);
let scrollPaneRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollWrapper = computed(() => {
  return scrollPaneRef.value?.$refs.wrapRef
});

onMounted(() => {
  scrollWrapper.value.addEventListener("scroll", emitScroll, true);
});

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener("scroll", emitScroll);
});

const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  const $scrollWrapper = scrollWrapper.value;
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
};
interface PropsEmit{
  (e:"scroll",params?:string):void
}
const emit = defineEmits<PropsEmit>()
const emitScroll = () => {
  emit("scroll");
};

const tagsViewStore = useStore("useTagsView")
const visitedViews = computed(() => {
  return tagsViewStore.visitedViews
});

const moveToTarget = (currentTag: any) => {
  const $container = scrollPaneRef.value.$el;
  const $containerWidth = $container.offsetWidth;
  const $scrollWrapper = scrollWrapper.value;
  let firstTag = null;
  let lastTag = null;
  // find first tag and last tag
  if (visitedViews.value.length > 0) {
    firstTag = visitedViews.value[0];
    lastTag = visitedViews.value[visitedViews.value.length - 1];
  }
  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft =
        $scrollWrapper.scrollWidth - $containerWidth;
  } else {
    const tagListDom = document.getElementsByClassName("tags-view-item");
    const currentIndex = visitedViews.value.findIndex(
        (item: any) => item === currentTag
    );
    let prevTag = null;
    let nextTag = null;
    for (const k in tagListDom) {
      if (k !== "length" && Object.hasOwnProperty.call(tagListDom, k)) {
        // prettier-ignore
        if (tagListDom[k].dataset.path === visitedViews.value[currentIndex - 1].path) {
          prevTag = tagListDom[k];
        }
        // prettier-ignore
        if (tagListDom[k].dataset.path ===visitedViews.value[currentIndex + 1].path) {
          nextTag = tagListDom[k];
        }
      }
    }
    if (nextTag && prevTag) {
      // the tag's offsetLeft after of nextTag
      // prettier-ignore
      const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value;
      // the tag's offsetLeft before of prevTag
      // prettier-ignore
      const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value;
      // prettier-ignore
      if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
        $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
      } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
        $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
      }
    }
  }
};

defineExpose({
  moveToTarget,
});
</script>

<style lang="less" scoped>
    .scroll-container {
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        width: 100%;
        :deep(.el-scrollbar__bar)  {
            bottom: 0px;
        }
        :deep(.el-scrollbar__wrap)  {
            height: 34px;
        }
        //  /deep/ {
        //    .el-scrollbar__bar {
        //      bottom: 0px;
        //    }
        //    .el-scrollbar__wrap {
        //      height: 49px;
        //    }
        //  }
    }
</style>
