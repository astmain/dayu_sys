<template>

  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="met1()">met1</el-button>
  <div style="display: flex; gap: 10px;">
    <canvas id="canvas1" style=" width: 400px; height: 400px;            border: 1px solid red;"></canvas>
    <canvas id="canvas2" style=" width: 400px; height: 400px; border: 1px solid green;"></canvas>
  </div>
</template>
<script>
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
let colorHex = {
  white: 0xffffff,
  gray1: 0xa1a1a1,
  gray2: 0xa2a2a2,
  gray3: 0xa3a3a3,
  gray4: 0xa4a4a4,
  gray5: 0xa5a5a5,
  gray6: 0xa6a6a6,
  gray7: 0xa7a7a7,
  gray8: 0xa8a8a8,
  gray9: 0xa9a9a9,

  red1: 0xffe1e1,
  red2: 0xffe2e2,
  red3: 0xffe3e3,
  red4: 0xffe4e4,
  red5: 0xffe5e5,
  red6: 0xffe6e6,
  red7: 0xffe7e7,
  red8: 0xffe8e8,
  red9: 0xffe9e9,

  blue0: 0x8f8aff,
  blue1: 0xe1e1ff,
  blue2: 0xe2e2ff,
  blue3: 0xe3e3ff,
  blue4: 0xe4e4ff,
  blue5: 0xe5e5ff,
  blue6: 0xe6e6ff,
  blue7: 0xe7e7ff,
  blue8: 0xe8e8ff,
  blue9: 0xe9e9ff,


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
export default {
  data() {
    return {
      name: "数据1",
    }
  },
  methods: {
    async met1() {
      let width = 400
      let height = 400
      // 创建场景
      let scene = new THREE.Scene();
      // scene.background = new THREE.Color(colorHex.绿透明)
      scene.background = new THREE.Color(colorHex.blue7)



      //创建相机
      let camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        1000
      );
      // camera.position.x = 2;
      // camera.position.z = 3;
      camera.position.set(2, 0, 3)          //看的角度  1倾斜 2 旋转 3远近
      camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动
      camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动


      // 创建渲染器
      let renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas1'),
        // antialias: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);


      // 创建一个立方体
      let cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({ color: colorHex.red }),
      );
      cube.position.set(-1.5, 0, 0);
      let cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({ color: colorHex.green }),
      );
      cube2.position.set(0.5, 0, -1);




      scene.add(cube, cube2);



      //渲染器把场景和相机结合在一起渲染到dom容器中
      renderer.render(scene, camera);

      // 动画相机
      let angle = 0
      function animate() {
        // requestAnimationFrame(animate);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // const radius = 3
        // angle += 0.01
        // camera.position.x = Math.cos(angle) * radius
        // camera.position.z = Math.sin(angle) * radius
        // camera.lookAt(0, 0, 0)
        // renderer.render(scene, camera);
      }
      animate()

    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped>
aaa {
  color: #ffe3e3;
}
</style>