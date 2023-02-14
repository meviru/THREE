// Canvas
const canvas = document.getElementById("webgl");

// Scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xf00000 });
const mesh = new THREE.Mesh(geometry, material);

// Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
// mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// Rotation
// mesh.rotation.y = Math.PI * 0.25;

scene.add(mesh);

// Group
// const group = new THREE.Group();
// group.position.y = 1;
// group.scale.x = 1.2;
// scene.add(group);

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 0xf00000})
// )
// group.add(cube1);

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 0x00ff00})
// )
// cube2.position.x = -1;
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 0x0000ff})
// )
// cube3.position.x = 1;
// group.add(cube3);

// Axes Helper
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

window.addEventListener("dblclick", ()=> {
    if(!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.lookAt(mesh.position);
scene.add(camera);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const cursor = {
    x: 0,
    y: 0
}

const moveCube = (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
};

window.addEventListener("mousemove", moveCube);

// Animations
const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    // mesh.position.y = Math.sin(elapsedTime);
    // mesh.position.x = Math.cos(elapsedTime);
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    camera.position.y = cursor.y * 5;
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();