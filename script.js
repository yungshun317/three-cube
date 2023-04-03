import * as THREE from '/three.module.min.js';
import { OrbitControls } from "./OrbitControls.js";
import { OBJLoader } from "./OBJLoader.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { DRACOLoader } from "./DRACOLoader.js";

// [1] Scene
const scene = new THREE.Scene();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

// Responsive
window.addEventListener("resize", () => {
    // New size
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    // New aspect ratio
    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    // New render size
    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// [2] Object
// OBJLoader
/*
const objLoader = new OBJLoader();
objLoader.load("models/suzan.obj", (object) => {
    console.log(object);
    object.position.y = 0;
    object.children[0].position.z = -3;
    object.children[0].material = new THREE.MeshNormalMaterial();
    console.log(object);
    scene.add(object);
})
*/

// GLTFLoader
const gltfLoader = new GLTFLoader();
/*
gltfLoader.load("models/monkeyglb.glb", (glb) => {
    scene.add(glb.scene);
    console.log(glb.scene);
});
*/

// Load GLTF Model using DRACOLoader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/models/draco/");
gltfLoader.setDRACOLoader(dracoLoader);
console.log(dracoLoader);
gltfLoader.load("models/2.gltf", (gltf) => {
   scene.add(gltf.scene);
   console.log(gltf.scene);
});

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
scene.add(camera);

// [4] Renderer
// Select the `Canvas` element
const canvas = document.querySelector(".draw");
// Add the `WebGLRenderer`
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Renderer size
renderer.setSize(aspect.width, aspect.height);

// `OrbitControls`
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// `Clock` class
const clock = new THREE.Clock();

// Animate
const animate = () => {
    // `getElapsedTime`
    const elapsedTime = clock.getElapsedTime();

    // Update `OrbitControls`
    orbitControls.update();

    // Renderer
    // Draw what the camera inside the scene captured
    renderer.render(scene, camera);

    // `requestAnimationFrame`
    window.requestAnimationFrame(animate);
};
animate();