import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
camera.position.set(-30, 0, 30);

renderer.setClearColor(0x8b4513);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.IcosahedronGeometry(10, 0);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  transparent: true,
  opacity: 0.8,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 2);
const pointLight2 = new THREE.PointLight(0xffffff, 2);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(8, 8, 8);
pointLight2.position.set(-8, -8, -8);
scene.add(pointLight, pointLight2, ambientLight);

const debug = true;

if (debug) {
  const lightHelper = new THREE.PointLightHelper(pointLight2);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper, gridHelper);
}

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(2000).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load(
  "./GalaxySpace/GalaxySpace.jpg"
);
spaceTexture.wrapS = THREE.ClampToEdgeWrapping;
spaceTexture.wrapT = THREE.ClampToEdgeWrapping;
spaceTexture.minFilter = THREE.LinearFilter;
scene.background = spaceTexture;

// // function moveCamera() {}
// // document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  camera.position.applyAxisAngle(new THREE.Vector3(1, 1, 1), 0.0003);

  // controls.update();

  renderer.render(scene, camera);
}
animate();
