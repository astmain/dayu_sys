<script lang="ts">
import SvgIcon from "@/components/SvgIcon/Index";
import {h} from "vue";
// dynameic 组件

// Vue3 中函数式组件只能用函数式声明
const DynamicHeading = (props: { icon: string;title:string,style?:object,sidebarStatus?:boolean,isChild?:boolean,lev:number }, context: { slots: string | number | boolean | VNode<RendererNode, RendererElement, { [key: string]: any; }> | VNodeArrayChildren | (() => any) | { [name: string]: unknown; $stable?: boolean | undefined; } | undefined; attrs: (VNodeProps & { __v_isVNode?: undefined;[Symbol.iterator]?: undefined; } & Record<string, any>) | null | undefined; }) => {
  context.slots = `${props.title}`
  const { icon, title,style,sidebarStatus,isChild,lev } = props
  const vnodes = []
  let iconStyles={}
  let titleStyles={}
  if(!sidebarStatus){
    iconStyles = !style?{'display':'flex','align-items':'center'}:style
    titleStyles = {'margin-left':'10px'}
  }else{
    iconStyles = !style?{}:style
    titleStyles = {'margin-left':'10px'}
  }
  if (icon) {
    if(isChild && sidebarStatus){
      if(lev>1){
        vnodes.push(h("div",{class:"u-f u-f-ac u-f-ajc",style:{'margin-left':"10px"}},[h(SvgIcon,{iconClass:icon,iconStyle:iconStyles})]))
      }else{
        vnodes.push(h("div",{class:"u-f u-f-ac u-f-ajc",style:{'width':"100%"}},[h(SvgIcon,{iconClass:icon,iconStyle:iconStyles})]))
      }
    }else{
      vnodes.push(h("div",{class:"u-f u-f-ac u-f-ajc"},[h(SvgIcon,{iconClass:icon,iconStyle:iconStyles})]))
    }
  }
  if (title) {
    vnodes.push(h("div",{class:"title",style:titleStyles},`${title}`))
  }
  return [...vnodes];
}

DynamicHeading.props = ["icon","title","style","sidebarStatus","isChild","lev"];

export default DynamicHeading;

</script>
