//Imports
import THREE from "three";
import orbit from 'three-orbit-controls'
import pad from 'pad';
const OrbitControls = orbit(THREE);

//Constants
const dimemsions = {
    x: 800,
    y: 800
};
const images = {
    axial: {
        prefix: "/images/axial_stack/slice_",
        count: 182,
        currentImage: 91
    },
    coronal: {
        prefix: "/images/coronal_stack/slice_",
        count: 182,
        currentImage: 91
    },
    sagittal: {
        prefix: "/images/saggital_stack/slice_",
        count: 218,
        currentImage: 109
    }
};

function getSliceString(section, number){
    return `/images/${section}_stack/slice_${pad(3, number, '0')}.png`;
}

//Listen for input changes
document.getElementById("range-x").addEventListener('input', function () {
    setSlice('axial', this.value);
});
document.getElementById("range-y").addEventListener('input', function () {
    setSlice('coronal', this.value);
});
document.getElementById("range-z").addEventListener('input', function () {
    setSlice('sagittal', this.value);
});

function setSlice(section, slice) {
    images[section].currentImage = slice;
    images[section].plane.material.map = THREE.ImageUtils.loadTexture(getSliceString(section, slice));
    images[section].plane.material.needsUpdate = true;
}

//Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(dimemsions.x, dimemsions.y);
document.getElementById("part-2-3d").appendChild(renderer.domElement);

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;
const controls = new OrbitControls(camera, renderer.domElement);

//Scene setup
const scene = new THREE.Scene();

//Meshes
const xPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshPhongMaterial()
);
xPlane.material.side = THREE.DoubleSide;
images.axial.plane = xPlane;

const yPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshPhongMaterial()
);
yPlane.rotateX(Math.PI / 2);
yPlane.material.side = THREE.DoubleSide;
images.coronal.plane = yPlane;

const zPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshPhongMaterial()
);
zPlane.rotateY(Math.PI / 2);
zPlane.material.side = THREE.DoubleSide;
images.sagittal.plane = zPlane;

scene.add(xPlane, yPlane, zPlane);

//Set initial textures
for (let section in images)
    setSlice(section, images[section].currentImage);

//Preload textures
for (let section in images)
    for (let i = 1; i < images[section].count; i++)
        THREE.ImageUtils.loadTexture(getSliceString(section, i));

//Lighting
let light = new THREE.DirectionalLight(0xffffff, 0.9);
light.position.set(1, 1, 1);
scene.add(light);

light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(-1, -1, 1);
scene.add(light);

//Render loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();