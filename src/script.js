import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//Scene
const scene = new THREE.Scene();

//Debugging
// const gui = new dat.GUI();

//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const geometry = new THREE.BufferGeometry();

const verticesAmount = 1000;
const positionArry = new Float32Array(verticesAmount * 3);

for (let index = 0; index < verticesAmount * 3; index++) {
  positionArry[index] = (Math.random() - 0.5) * 4;
}

//turxreiure

const textureLoader = new THREE.TextureLoader();
const snowTexture = textureLoader.load("/textures/alphaSnow.jpg");

geometry.setAttribute("position", new THREE.BufferAttribute(positionArry, 3));

const material = new THREE.PointsMaterial();
material.size = 0.02;
material.transparent = true;
material.alphaMap = snowTexture;
const points = new THREE.Points(geometry, material);
scene.add(points);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  aspect.width / aspect.height,
  0.01,
  100
);
camera.position.z = 2;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableZoom = false;
orbitControls.enableRotate = false;
orbitControls.enableDamping = true;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //animate particals
  // points.rotation.y = elapsedTime * 0.05;
  // points.rotation.x = elapsedTime * 0.05;
  camera.rotation.y = elapsedTime * 0.05;
  camera.rotation.x = elapsedTime * 0.05;

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
