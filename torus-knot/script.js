import * as THREE from '/three.module.min.js';
import { OrbitControls } from "../OrbitControls.js";
import * as dat from "/node_modules/dat.gui/build/dat.gui.module.js";

// [1] Scene
const scene = new THREE.Scene();

// const gui = new dat.GUI();

const materialColor = {
    color: 0xffffff,
};

// Lights

// AmbientLight
const ambientLight = new THREE.AmbientLight("#ffffff", 0.35);
scene.add(ambientLight);
// gui.add(ambientLight, "intensity", 0, 1, 0.01);

// DirectionalLight
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.7);
directionalLight.castShadow = true;
directionalLight.position.set(0, 2, 0);
scene.add(directionalLight);
// gui.add(directionalLight, "intensity", 0, 1, 0.01);
// gui.add(directionalLight.position, "x", -3, 3, 0.01);
// gui.add(directionalLight.position, "y", -3, 3, 0.01);

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

// HemisphereLight
// const hemisphereLight = new THREE.HemisphereLight("blue", "yellow", 1);
// scene.add(hemisphereLight);

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
// scene.add(hemisphereLightHelper);

// PointLight
// const pointLight = new THREE.PointLight("red", 0.8, 3);
// pointLight.position.set(0, 0, 1);
// gui.add(pointLight.position, "x", -3, 3, 0.01);
// gui.add(pointLight.position, "y", -3, 3, 0.01);
// gui.add(pointLight.position, "z", -3, 3, 0.01);
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

// RectAreaLight
// const rectAreaLight = new THREE.RectAreaLight("#5D3FD3", 3, 2, 2);
// rectAreaLight.position.z = 0.5;
// gui.add(rectAreaLight, "width", 0, 7, 0.01);
// gui.add(rectAreaLight, "height", 0, 7, 0.01);
// scene.add(rectAreaLight);

// SpotLight
// const spotLight = new THREE.SpotLight("#ffffff", 1, 8, Math.PI * 0.25, 0.1, 1);
// gui.add(spotLight.position, "z", -3, 3, 0.01);
// gui.add(spotLight, "angle", -3, 3, 0.01);
// gui.add(spotLight, "penumbra", -3, 3, 0.01);
// spotLight.position.z = 2;
// scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

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
// const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// console.log(boxGeometry);
// const boxMaterial = new THREE.MeshStandardMaterial();
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// boxMesh.castShadow = true;
// boxMesh.position.y = 0.7;
// scene.add(boxMesh);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.2, 0.05);
const torusKnotMaterial = new THREE.MeshStandardMaterial();
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.castShadow = true;
torusKnotMesh.position.y = 0.7;
scene.add(torusKnotMesh);

const planeGeometry = new THREE.PlaneGeometry(2.75, 2.75);
console.log(planeGeometry);
const planeMaterial = new THREE.MeshStandardMaterial();
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.rotation.x = -Math.PI * 0.5;
scene.add(planeMesh);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
camera.position.y = 2;
scene.add(camera);

// [4] Renderer
// Select the `Canvas` element
const canvas = document.querySelector(".draw");
// Add the `WebGLRenderer`
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
// Renderer size
renderer.setSize(aspect.width, aspect.height);
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.PCFShadowMap;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.type = THREE.VSMShadowMap;

// `OrbitControls`
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// `Clock` class
const clock = new THREE.Clock();

// Animate
const animate = () => {
    // `getElapsedTime`
    const elapsedTime = clock.getElapsedTime();

    // boxMesh.position.x = Math.sin(elapsedTime)
    torusKnotMesh.rotation.x = Math.sin(elapsedTime);

    // Update `OrbitControls`
    orbitControls.update();

    // Renderer
    // Draw what the camera inside the scene captured
    renderer.render(scene, camera);

    // `requestAnimationFrame`
    window.requestAnimationFrame(animate);
};
animate();