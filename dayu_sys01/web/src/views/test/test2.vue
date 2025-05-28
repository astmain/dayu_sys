<template>

    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>
    <div style="display: flex; gap: 10px;">
        <canvas id="canvas1" style=" width: 800px; height: 800px; border: 1px solid red;"></canvas>

    </div>
</template>
<script>
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import colorHex from './colorHex';
import { tr } from 'element-plus/es/locales.mjs';
import { log } from 'three/webgpu';
export default {
    data() {
        return {
            name: "数据1",
        }
    },
    methods: {
        async met1() {
            let width = 800
            let height = 800
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
            camera.position.set(2, 200, 20)          //看的角度  1倾斜 2 旋转 3远近
            camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动
            camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动


            let dom = document.getElementById('canvas1')


            // 创建渲染器
            let renderer = window.renderer = new THREE.WebGLRenderer({
                canvas: dom,
                antialias: true,//是否执行抗锯齿。默认为false
            });
            console.log("renderer", renderer)
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);


            // 创建物件
            let cube = new THREE.Mesh(
                new THREE.BoxGeometry(10, 10, 10),
                new THREE.MeshBasicMaterial({ color: colorHex.gray1 }),
            );
            cube.position.set(0, 0, 0);



            //场景添加物件
            scene.add(cube);


            // 创建一个网格辅助器
            let grid_helper = new THREE.GridHelper(100, 10, colorHex.gray1, colorHex.red);
            scene.add(grid_helper);



            //渲染器把场景和相机结合在一起渲染到dom容器中
            renderer.render(scene, camera);

            // 动画相机
            let angle = 0


            // 鼠标事件
            let isDown = false
            let startx = 0
            let currentX = 0


            renderer.domElement.addEventListener('mousedown', (e) => {
                console.log('mousedown')
                isDown = true
                startx = e.clientX
            })

            renderer.domElement.addEventListener('mousemove', (e) => {
                console.log('mousemove')
                if (isDown) {
                    const disttanceX = e.clientX - startx
                    // console.log("disttanceX", disttanceX)
                    currentX += disttanceX * 0.01
                    startx = e.clientX
                    camera.position.x = 40 * Math.cos(currentX)
                    camera.position.z = 40 * Math.sin(currentX)
                    camera.lookAt(0, 0, 0)
                    renderer.render(scene, camera)
                }
            })
            renderer.domElement.addEventListener('mouseup', (e) => {
                console.log('mouseup')
                isDown = false
            })



            function animate() {
                          requestAnimationFrame(animate);
                renderer.render(scene, camera);
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