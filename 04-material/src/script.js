import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Textures
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("textures/Metal_Tiles_003_basecolor.jpg");
const normalTexture = textureLoader.load("textures/Metal_Tiles_003_normal.jpg");
const ambientTexture = textureLoader.load("textures/Metal_Tiles_003_ambientOcclusion.jpg");
const heightTexture = textureLoader.load("textures/Metal_Tiles_003_height.png");
const metalTexture = textureLoader.load("textures/Metal_Tiles_003_metallic.jpg");
const roughTexture = textureLoader.load("textures/Metal_Tiles_003_roughness.jpg");

// Scene
const scene = new THREE.Scene();

// Materials
// const material = new THREE.MeshBasicMaterial();
// material.map = colorTexture;
// material.opacity = 0.5;
// material.transparent = true;

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x000000);

// const material = new THREE.MeshToonMaterial();

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45;
// material.roughness = 0.65;
// material.map = colorTexture;
// material.aoMap = ambientTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightTexture;
// material.displacementScale = 0;
// material.metalnessMap = metalTexture;
// material.roughnessMap = roughTexture;
// material.normalMap = normalTexture;
// material.side = THREE.DoubleSide; // Create Performance Issues

// Axes Helper

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Fonts
const fontLoader = new THREE.FontLoader();
fontLoader.load(
    "fonts/Roboto_Regular.json",
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            'Hello three.js!', {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 1,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - textGeometry.boundingBox.max.x / 2,
        //     - textGeometry.boundingBox.max.y / 2,
        //     - textGeometry.boundingBox.max.z / 2,
        // )
        textGeometry.center();
        const textMaterial = new THREE.MeshNormalMaterial();
        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
        const donutMaterial = new THREE.MeshNormalMaterial();

        for (let i = 0; i < 300; i++) {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial);
            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);

            scene.add(donut);
        }
    }
);

// Mesh
// const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 16, 32), material);
// torus.position.x = - 1.5;
// const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), material);
// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), material);
// sphere.position.x = 1.5;
// scene.add(box, torus, sphere);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // box.rotation.y = .5 * elapsedTime
    // sphere.rotation.y = .5 * elapsedTime
    // torus.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()