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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//自定义
import colorHex from './colorHex';
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
            scene.background = new THREE.Color(colorHex.blue7)

            //创建相机
            let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.set(2, 200, 20)          //看的角度  1倾斜 2 旋转 3远近
            camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动
            camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动





            // 创建渲染器
            let renderer = window.renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('canvas1'),
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







            // 创建轨道控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;   // //当.enableDamping设置为true的时候，阻尼惯性有多大。 Default is 0.05.
            controls.dampingFactor = 0.2        //惯性阻尼值
            controls.addEventListener('change', () => {
                // console.log("控制器改变时查看相机位置", camera.position)
                renderer.render(scene, camera);
            })


            // 渲染器把场景和相机结合在一起渲染到dom容器中
            renderer.render(scene, camera);
            // 动画
            function animate() {
                //// 通常
                // requestAnimationFrame(animate);
                // renderer.render(scene, camera);

                //// 更新控制器-惯性阻尼-enableDamping
                // requestAnimationFrame(animate);
                // controls.update()


                // 222
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
                controls.update()
            }
            animate()

        },//

    },////

    async mounted() {


        this.met1()
    },////

}
</script>

<style scoped>
aaa {
    color: #ffe3e3;
}
</style>