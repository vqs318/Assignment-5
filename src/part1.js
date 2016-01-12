import THREE from "three";
import orbit from 'three-orbit-controls'
import 
const OrbitControls = orbit(THREE);


//Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.getElementById("part-1-3d").appendChild(renderer.domElement);

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;
const controls = new OrbitControls(camera, renderer.domElement);

//Scene setup
const scene = new THREE.Scene();


var loader = new THREE.PDBLoader();
var url = "/data/pdb2rh1.ent"

loader.load(url,function(geometry,json){
    var sphereGeometry = new THREE.SphereGeometry(100)

    for ( var i = 0; i < geometry.vertices.length; i ++ ) {

        var position = geometry.vertices[ i ];
        var color;
        var element = geometry.elements[ i ];

        switch (element) {
            case "C":
                color="gray";
                break;
            case "N":
                color="blue";
                break;
            case "O":
                color="red";
                break;
            case "S":
                color="yellow";
                break;
            case "H":
                color="white";
                break;
            default:
                color="green";
                break;
        }
        var material = new THREE.MeshPhongMaterial( { color: color } );

        var object = new THREE.Mesh( sphereGeometry, material );
        object.position.copy( position );
        object.position.multiplyScalar( 75 );
        object.scale.multiplyScalar( 25 );
        root.add( object );

        //var atom = json.atoms[ i ];

        //var text = document.createElement( 'div' );
        //text.className = 'label';
        //text.style.color = 'rgb(' + atom[ 3 ][ 0 ] + ',' + atom[ 3 ][ 1 ] + ',' + atom[ 3 ][ 2 ] + ')';
        //text.textContent = atom[ 4 ];

        //var label = new THREE.CSS2DObject( text );
        //label.position.copy( object.position );
        //root.add( label );
    }

}




//Meshes


//Render loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
