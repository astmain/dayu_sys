<template>
  <label for="input_img_label" style="position:relative;display:block;height:120px;width:120px;border: 1px solid #000;border-radius:8px;overflow:hidden;box-sizing:border-box">
    <span v-if="!img_src" style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#000;font-size:40px">+</span>
    <img style="width: 100%; height: 100%;" class="input_img" :src="img_src">
    <input id="input_img_label" @change="input_img_change" type="file" hidden="hidden"/>
  </label>
</template>

<script>


function fs_read_file_to_base64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result); // 返回 Base64 字符串
    };

    reader.onerror = function (error) {
      reject(error); // 处理错误
    };

    reader.readAsDataURL(file); // 读取文件
  });
}

async function fs_base64_compress(base64Image, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 计算新的宽高
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      // 压缩并转换为 Base64
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };

    img.onerror = function (error) {
      reject(error);
    };
  });
}


export default {
  props: {
    img_src: {default: 'https://img2.baidu.com/it/u=1067594889,3904550527&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', required: true},

  },
  data() {
    return {};
  },
  methods: {
    async input_img_change(event) {
      // console.log(`event.target.files[0]      : `, event.target.files[0])
      let file = event.target.files[0]
      let base64 = await fs_read_file_to_base64(file)//文件转base64
      let base64_2 = await fs_base64_compress(base64, 50, 50, 0.1)//base64压缩
      console.log(`111---222:`, base64_2)
      this.$emit('update:img_src', base64); // 数据双向绑定
    },//


  },////

  async mounted() {
  },////


};
</script>


<style scoped>


</style>
