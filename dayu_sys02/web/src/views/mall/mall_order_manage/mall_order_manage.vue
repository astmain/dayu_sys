<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>


    <div class="dom_container"></div>

  </div>
</template>

<script>
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import png from '@src/assets/png.png'
import png2 from '@src/public/png.png'
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16).padStart(2, '0');
    return hex;
  }).join('');
}

export default {
  data() {
    return {
      name: "数据1",
    }


  },

  methods: {
    async met1() {
      console.log("图片png路径", png)
      //   let width=window.innerWidth
      //  let height= window.innerHeight
      let width = 500
      let height = 300
      let colorHex = {
        white: 0xffffff,
        gray: 0x808080,
        red: 0xff0000,
        green: 0x00ff00,
        blue: 0x0000ff,
        纯蓝色: 0x0000ff,
        深蓝色: 0x00008b,
        天蓝色: 0x87ceeb,
        湖蓝色: 0x1e90ff,
        紫色蓝: 0x40e0d0,
        蓝墨色: 0x1f1f1f4c,
        黄文件: 0xffdc7a,
        绿透明: 0xc89e06b,
        灰色aa: 0x323232,
        红色透: 0x00000000,
        红色透2: 0xff0000,
      }

      // 创建场景
      let scene = new THREE.Scene();
      // scene.background = new THREE.Color(colorHex.绿透明)
      scene.background = new THREE.Color('rgba(255, 224, 135,0.1)')
      console.log('scene', scene)


      //创建相机
      let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

      //  设置相机位置
      // camera.position.set(0, 0, 100);
      camera.position.z = 3;
      camera.position.x = 2;
      camera.lookAt(0, 0, 0);



      console.log('camera', camera)
      //创建渲染器
      let renderer = new THREE.WebGLRenderer();
      console.log('renderer', renderer)
      renderer.setSize(width, height);//渲染器尺寸大小


      //得到dom
      let dom_container = document.querySelector('.dom_container')
      dom_container.appendChild(renderer.domElement);

      //创建物件-立方体
      let cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial(),
      );

      //cube设置外表颜色
      cube.material.color.setHex(colorHex.red);


      let cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: colorHex.green }),
      );

      cube2.position.x = 1.5



      //物件添加到场景中
      scene.add(cube, cube2);


      // 渲染器把场景和相机结合在一起渲染到dom容器中
      renderer.render(scene, camera);


      // 动画
      function animate() {
        window.requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate()





    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>