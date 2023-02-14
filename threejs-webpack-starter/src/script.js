import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Textures
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("textures/Metal_Tiles_003_basecolor.jpg");
const normalTexture = textureLoader.load("textures/Metal_Tiles_003_normal.jpg");
const ambientTexture = textureLoader.load("textures/Metal_Tiles_003_ambientOcclusion.jpg");
const heightTexture = textureLoader.load("textures/Metal_Tiles_003_height.png");
const metalTexture = textureLoader.load("textures/Metal_Tiles_003_metallic.jpg");
const roughTexture = textureLoader.load("textures/Metal_Tiles_003_roughness.jpg"); 

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Materials
const material = new THREE.MeshBasicMaterial({ map: colorTexture })

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// gui.add(sphere.position, 'x', -3, 3, 0.01);
// gui.add(sphere.position, 'y', -3, 3, 0.01);
// gui.add(sphere.scale, 'x', -3, 3, 0.01);
// gui.add(sphere.scale, 'y', -3, 3, 0.01);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()