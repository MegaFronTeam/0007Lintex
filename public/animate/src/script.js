import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import Stats from 'three/addons/libs/stats.module.js';

let renderer, scene, camera, stats;

let particleSystem, uniforms, geometry;


import galaxyVertexShader from './shaders/galaxy/vertex.glsl'
import galaxyFragmentShader from './shaders/galaxy/fragment.glsl'

let particles = document.body.offsetHeight  * 12 / window.innerHeight ; 

document.addEventListener('DOMContentLoaded', ()=>{
    
     particles = document.body.offsetHeight  * 12 / window.innerHeight ; 
});

const objectsDistance = Math.floor( document.querySelector('#container').offsetHeight   / window.innerHeight )
 
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 300;
    // camera.position.z = 1;

    scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(300);
    scene.add( axesHelper );




    uniforms = {

        // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
        // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
        // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
        pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }

    };

    const shaderMaterial = new THREE.ShaderMaterial( {

        uniforms: uniforms,
        vertexShader: galaxyVertexShader,
        fragmentShader: galaxyFragmentShader,

        blending: THREE.AdditiveBlending,
        // depthTest: false,
        transparent: true,
        vertexColors: true,

        depthWrite: false, 

    } );


    const parameters = {}
    parameters.insideColor = '#636CE2'
    parameters.outsideColor = '#00D700'
    
    
    const radius = 300;
    
    geometry = new THREE.BufferGeometry();
    
    const positions = [];
    const colors = [];
    const sizes = [];
    
    const color = new THREE.Color();
    
    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)
    const colorsArr = [insideColor, outsideColor]


    

    for ( let i = 0; i < particles; i ++ ) {
        const i3 = i * 3
        const size = 1580 + 800 * Math.abs(Math.random() * 2 - 1)
        sizes.push(size );  

        positions.push( ( Math.random() * 2 - 1 < 0 ) ? (radius      ) : -1 * (radius    ) );
        // positions.push( ( Math.random()* 2 - 1    ) * radius );
        // console.log((Math.random() * 1 - 1 ) * window.innerHeight )
        positions.push( ( Math.random() * 2 - 1 ) *  window.innerHeight + Math.random() * objectsDistance * i );
        positions.push( ( Math.random() * 2 - 1 ) * radius );

        const randomIndex = Math.floor(Math.random() * colorsArr.length); 

        const mixedColor = colorsArr[randomIndex]
        // mixedColor.lerp(outsideColor, Math.random() )

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
        // color.setHSL( i / particles , 1.0, 0.5 );

        // colors.push( color.r, color.g, color.b );

        // const mixedColor = insideColor.clone()
        

    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setUsage( THREE.DynamicDrawUsage ) );

    particleSystem = new THREE.Points( geometry, shaderMaterial );
 
    particleSystem.scale.set(1,1.5,1)
    scene.add( particleSystem );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setClearColor(0x000000, 0);

    const container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

    // stats = new Stats();
    // container.appendChild( stats.dom );

    // Controls
    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true

    //

    window.addEventListener( 'resize', onWindowResize );
 

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
const clock = new THREE.Clock()
let previousTime = 0


/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0


window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX
    cursor.y = event.clientY 
})

// console.log( geometry.attributes)

// console.log(geometry)
 
/**
 * Scroll
 */
let scrollY = window.scrollY


// console.log(geometry.attributes.position.array)
function render() {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const angle = Math.PI / 2

    const time = Date.now() * 0.05; 
    // console.log(elapsedTime)
     // Animate camera
     
     //  const parallaxX = cursor.x
     //  const parallaxY = cursor.y
     //  camera.position.x += (parallaxX - camera.position.x) * 0.0001
     //  camera.position.y += (parallaxY - camera.position.y) * 0.01
     const sizes = geometry.attributes.size.array;
     const position = geometry.attributes.position.array; 
     particleSystem.position.y =   scrollY  * objectsDistance * 0.02  
      particleSystem.position.y +=     scrollY  * objectsDistance  * Math.atan(elapsedTime* 0.0005 ) 
     for ( let i = 0; i < particles; i ++ ) { 
         const i3 = i * 3
         
        //  sizes[ i ] +=   Math.cos(elapsedTime) * 5 + (Math.random() * 2 - 1) * 4;
        //  position[i3 + 1 ] +=  Math.sin(elapsedTime) * 50 + (Math.random() * 2 - 1);
        }
        // particleSystem.position.y =  Math.cos(angle) * deltaTime;
        
        // particleSystem.position.y +=      0.02 * elapsedTime 
    geometry.attributes.size.needsUpdate = true;

    renderer.render( scene, camera );

}


function animate() {

    requestAnimationFrame( animate );

    render();
    // stats.update();

}

animate();

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY 
})