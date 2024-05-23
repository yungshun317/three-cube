import * as THREE from '/three.module.min.js';
import { OrbitControls } from "../OrbitControls.js";

// [1] Scene
const scene = new THREE.Scene();

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
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 1;
scene.add(mesh);

const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial();
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x = -1;
scene.add(mesh2);

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
const renderer = new THREE.WebGLRenderer({ canvas });
// Renderer size
renderer.setSize(aspect.width, aspect.height);

// Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const meshes = [mesh, mesh2];
const oneIntersectMesh = [];
window.addEventListener("mousemove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerWidth) * 2 + 1;

    // Casting ray
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(meshes);
    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
    }
    if (intersects.length > 0) {
        if (oneIntersectMesh.length < 1) {
            oneIntersectMesh.push(intersects[0]);
        }
        oneIntersectMesh[0].object.material.color.set("red");
        gsap.to(oneIntersectMesh[0].object.scale, {
            duration: 0.5,
            x: 1.25,
            y: 1.25,
            z: 1.25,
        });

        console.log(oneIntersectMesh);
    } else if (oneIntersectMesh[0] !== undefined) {
        //intersects.length === 0
        oneIntersectMesh[0].object.material.color.set("white");
        gsap.to(oneIntersectMesh[0].object.scale, {
            duration: 0.5,
            x: 1,
            y: 1,
            z: 1,
        });
        oneIntersectMesh.shift();
    }
    console.log(intersects);
});

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