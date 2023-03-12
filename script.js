import * as THREE from '/three.module.min.js';
import { OrbitControls } from "./OrbitControls.js";

// [1] Scene
const scene = new THREE.Scene();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 2, 2);
scene.add(ambientLight, pointLight);

// `TextureLoader`
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("/texture/color.jpg");
const matcapTexture = textureLoader.load("/texture/mat2.png");
const bumpTexture= textureLoader.load("/texture/bump.jpg");
const displacementTexture = textureLoader.load("/texture/displacementMap.jpg");

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

// Mesh
const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);
console.log(geometry);

// `MeshBasicMaterial`
// const material = new THREE.MeshBasicMaterial();
const material = new THREE.MeshStandardMaterial();
material.map = colorTexture;
// material.wireframe = true;
// material.color = new THREE.Color("skyblue");
// material.transparent = true;
// material.opacity = 0.4;
// material.side = THREE.DoubleSide;
// material.visible = false;

// Bump Texture
material.bumpMap = bumpTexture;

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 1;
scene.add(camera);

// [4] Renderer
// Select the `Canvas` element
const canvas = document.querySelector(".draw");
// Add the `WebGLRenderer`
const renderer = new THREE.WebGLRenderer({ canvas });
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