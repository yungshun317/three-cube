import * as THREE from '/three.module.min.js';

// [1] Scene
const scene = new THREE.Scene();

// [2] Group
// const group = new THREE.Group();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1;
// mesh.position.y = 1;
// mesh.position.z = 1;
// mesh.scale.x = 2;
// mesh.scale.y = 3;
// mesh.rotation.x = Math.PI * 0.25;
scene.add(mesh);

gsap.to(mesh.position, { duration: 1, delay: 1, x: 1 })
gsap.to(mesh.position, { duration: 2, delay: 2, x: -1 });

/*
const geometryT = new THREE.BoxGeometry(1, 1, 1);
const materialT = new THREE.MeshBasicMaterial({ color: "green" });
const meshT = new THREE.Mesh(geometryT, materialT);
meshT.position.y = 2;

group.add(mesh, meshT);
group.position.x = 3;
scene.add(group);
*/

// AxesHelper
/*
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);
*/

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height,);
camera.position.z = 3;
scene.add(camera);

// [4] Renderer
// Select the `Canvas` element
const canvas = document.querySelector(".draw");
// Add the `WebGLRenderer`
const renderer = new THREE.WebGLRenderer({ canvas });
// Renderer size
renderer.setSize(aspect.width, aspect.height);

// `Clock` class
const clock = new THREE.Clock();

// Animate
const animate = () => {
    // `getElapsedTime`
    const elapsedTime = clock.getElapsedTime();

    // mesh.position.x = elapsedTime * 0.25;
    // mesh.position.y = elapsedTime * 0.25;

    // mesh.position.x = -elapsedTime * 0.25;
    // mesh.position.y = elapsedTime * 0.25;

    // mesh.position.x = 1 + elapsedTime * 0.25;
    // mesh.position.y = elapsedTime * 0.25;

    // mesh.position.x = 1 - elapsedTime * 0.25;
    // mesh.position.y = elapsedTime * 0.25;

    // mesh.position.x = Math.sin(elapsedTime);

    // mesh.position.x = Math.cos(elapsedTime);

    // mesh.position.x = Math.sin(elapsedTime);
    // mesh.position.y = Math.cos(elapsedTime);

    // mesh.position.x = Math.tan(elapsedTime);
    // mesh.position.y = Math.tan(elapsedTime);

    // Update rotation on X axis & Y axis
    mesh.rotation.x = elapsedTime;
    // Rotate the cube a turn per second
    mesh.rotation.y = elapsedTime * Math.PI * 2;

    // Renderer
    // Draw what the camera inside the scene captured
    renderer.render(scene, camera);

    // `requestAnimationFrame`
    window.requestAnimationFrame(animate);
};
animate();