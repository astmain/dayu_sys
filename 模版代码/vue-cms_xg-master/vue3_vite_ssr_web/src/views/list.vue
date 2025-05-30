<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
let data = ref()
const handleGetData = async ()=>{
  data.value = await axios.get("https://v.api.aa1.cn/api/api-fj/index.php?aa1=json").then(function(res){
    return res.data
  })

  console.log(data.value,"aaaaaaaaaaaa");
}

handleGetData()
</script>
  <template>
    <div>
      {{data}}
      This is a list page!
    </div>
  </template>

  <style scoped>
  </style>
