import * as THREE from '/three.module.min.js';

// [1] Scene
const scene = new THREE.Scene();

// [2] Group
const group = new THREE.Group();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1;
// mesh.position.y = 1;
// mesh.scale.x = 2;
// mesh.scale.y = 3;
// mesh.rotation.x = Math.PI * 0.25;
mesh.position.z = 1;

// scene.add(mesh);

const geometryT = new THREE.BoxGeometry(1, 1, 1);
const materialT = new THREE.MeshBasicMaterial({ color: "green" });
const meshT = new THREE.Mesh(geometryT, materialT);
meshT.position.y = 2;

group.add(mesh, meshT);
group.position.x = 3;
scene.add(group);

// AxesHelper
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(
    75,
    aspect.width / aspect.height,
    1,
    2000
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;
scene.add(camera);

// [4] Renderer
// Select the `Canvas` element
const canvas = document.querySelector(".draw");
// Add the `WebGLRenderer`
const renderer = new THREE.WebGLRenderer({ canvas });
// Renderer size
renderer.setSize(aspect.width, aspect.height);
// Display what the camera in the scene captured
renderer.render(scene, camera);