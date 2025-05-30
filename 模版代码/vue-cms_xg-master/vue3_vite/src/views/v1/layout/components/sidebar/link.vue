<template>
    <component :is="computedType" v-bind="handleLinkProps(props.to)">
        <slot />
    </component>
</template>

<script setup lang="ts">
    import { isExternal } from '@/utils/validate'
    import {computed} from "vue";

    interface propsInterface{
        to:string
    }

    let props = withDefaults(defineProps<propsInterface>(),{

    })
    const computedIsExternal = computed(()=>{
        return isExternal(props.to)
    })

    const computedType = computed(()=>{

        if(computedIsExternal.value){
            return "a"
        }
        return "router-link"
    })

    const handleLinkProps = (to:string)=>{
        if(computedIsExternal.value){
            return {
                href: to,
                target: '_blank',
                rel: 'noopener'
            }
        }
        return {to}
    }

</script>
