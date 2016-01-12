import THREE from "three";
import orbit from 'three-orbit-controls'
import PDBLoader from "./pdbRenderer"

const OrbitControls = orbit(THREE);

//Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.getElementById("part-1-3d").appendChild(renderer.domElement);

//Scene setup
const scene = new THREE.Scene();

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 100;
const controls = new OrbitControls(camera, renderer.domElement);

var loader = new PDBLoader();
var url = "/data/pdb2rh1.ent";

loader.load(url, function (geometryAtom, geometryBond, json) {
    var sphereGeometry = new THREE.IcosahedronGeometry(1, 1);

    for (var i = 0; i < geometryAtom.vertices.length; i++) {

        var position = geometryAtom.vertices[i];
        var element = geometryAtom.elements[i];
        var color;

        switch (element) {
            case "C":
                color = "gray";
                break;
            case "N":
                color = "blue";
                break;
            case "O":
                color = "red";
                break;
            case "S":
                color = "yellow";
                break;
            case "H":
                color = "white";
                break;
            default:
                color = "green";
                break;
        }
        var material = new THREE.MeshPhongMaterial({color: color});

        var object = new THREE.Mesh(sphereGeometry, material);
        object.position.copy(position);
        scene.add(object);

        //var atom = json.atoms[ i ];

        //var text = document.createElement( 'div' );
        //text.className = 'label';
        //text.style.color = 'rgb(' + atom[ 3 ][ 0 ] + ',' + atom[ 3 ][ 1 ] + ',' + atom[ 3 ][ 2 ] + ')';
        //text.textContent = atom[ 4 ];

        //var label = new THREE.CSS2DObject( text );
        //label.position.copy( object.position );
        //root.add( label );
    }

});

//Lighting
var light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(1, 1, 1);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(-1, -1, 1);
scene.add(light);


window.scene = scene;


//Render loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
