<template>

    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>

    <div style="display: flex; flex-direction: row;gap: 10px">

        <canvas id="canvas1" style=" width: 400px; height: 400px; border: 1px solid red;"></canvas>


        <div>
            <div style="width:20px;height: 20px ;background: #ff0000">0xff0000</div>
            <div style="width:20px;height: 20px ;background: #ffffff">0xffffff</div>
            <div style="width:20px;height: 20px ;background: #0000ff">0x0000ff</div>
            <div style="width:20px;height: 20px ;background: #00ff00">0x00ff00</div>
        </div>

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
            let canvas = document.getElementById('canvas1')
            console.log("canvas.clientWidth", canvas.clientWidth)
            console.log("canvas.clientHeight", canvas.clientHeight)

            // 场景
            let scene = new THREE.Scene();
            // scene.background = new THREE.Color(colorHex.青色1)


            // 相机
            let camera = window.camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            camera.position.set(16, 18, 30)          //看的角度  1倾斜 2 旋转 3远近
            camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动

            // 渲染器
            let renderer = window.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, });//antialias是否执行抗锯齿。默认为false
            console.log("renderer", renderer)
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            // 控制器



            // ============================================================
            let plane = new THREE.Mesh(
                new THREE.PlaneGeometry(20, 20),
                new THREE.MeshStandardMaterial()
            )
            plane.rotation.x = -Math.PI / 2

            let cube = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshStandardMaterial()
            )
            cube.position.set(0, 2, 0)


            let sphere = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshStandardMaterial()
            )
            sphere.position.set(3, 2, 0)


            let torus = new THREE.Mesh(
                new THREE.TorusGeometry(1, 0.5),
                new THREE.MeshStandardMaterial()
            )
            torus.position.set(-3, 2, 0)




            scene.add(plane, cube, sphere, torus);

            
            // 光源
            //环境光
            let light_ambient = new THREE.AmbientLight(0xff0000)
            //平行光 
            let light_directional = new THREE.DirectionalLight(0xffffff)
            light_directional.position.set(5, 5, 0)
            //平行光辅助对象. 其中包含了表示光位置的平面和表示光方向的线段.
            let light_directional_help = new THREE.DirectionalLightHelper(light_directional)

            //半球光
            let light_hemi = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1)
            //点光源
            let light_point = new THREE.PointLight(0xff0000, 100, 1000, 2)//颜色,光照强度,光照的最大距离,沿着光照距离的衰退量默认值为 2
            light_point.position.set(0, 5, 0)
            let light_point_help = new THREE.PointLightHelper(light_point, 1);//球形辅助对象的尺寸. 默认为 1.
            // scene.add(light_ambient)
            // scene.add(light_directional)
            // scene.add(light_directional_help)
            // scene.add(light_hemi)
            scene.add(light_point)
            scene.add(light_point_help);






            // ============================================================
            //   控制器
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true  //enableDamping设置为true的时候，阻尼惯性有多大。 Default is 0.05.
            controls.dampingFactor = 0.2   //惯性阻尼值

            // 动画
            function animate() {
                requestAnimationFrame(animate)
                renderer.render(scene, camera)
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
    color: #404040;
    color: #ff0000;
}
</style>