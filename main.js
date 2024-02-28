import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();
loader.load('./arduino/scene.gltf', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

camera.position.z = 1.5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adiciona amortecimento para uma rotação suave
controls.dampingFactor = 0.1; // Fator de amortecimento (0 = sem amortecimento, 1 = amortecimento total)
controls.enableZoom = true; // Habilita o zoom

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();