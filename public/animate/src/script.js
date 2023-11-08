import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import Stats from 'three/addons/libs/stats.module.js';

let renderer, scene, camera, stats;

let particleSystem, uniforms, geometry;


import galaxyVertexShader from './shaders/galaxy/vertex.glsl'
import galaxyFragmentShader from './shaders/galaxy/fragment.glsl'

const container = document.querySelector("#container");
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    heightContainer: container.offsetHeight,
}

let particles = Math.floor(sizes.heightContainer * 15 / sizes.height);

console.log(particles, sizes.heightContainer)
const objectsDistance = Math.floor(sizes.heightContainer / sizes.height);
camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const radius = 30;
camera.position.z = radius;
scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(radius);
scene.add(axesHelper);




uniforms = {

    // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
    // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
    // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
    pointTexture: { value: new THREE.TextureLoader().load('pack/circle_05.png') }

};

const shaderMaterial = new THREE.ShaderMaterial({

    uniforms: uniforms,
    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader,

    blending: THREE.AdditiveBlending,
    // depthTest: false,
    transparent: true,
    vertexColors: true,

    depthWrite: false,

});


const parameters = {}
parameters.insideColor = '#636CE2'
parameters.outsideColor = '#00D700'



geometry = new THREE.BufferGeometry();

const positions = [];
const colors = [];
const sizesDots = [];

const color = new THREE.Color();

const insideColor = new THREE.Color(parameters.insideColor)
const outsideColor = new THREE.Color(parameters.outsideColor)
const colorsArr = [insideColor, outsideColor]




for (let i = 0; i < particles; i++) {
    const i3 = i * 3
    const size = 1580 + 800 * Math.abs(Math.random() * 2 - 1)
    sizesDots.push(size);

    positions.push((Math.random() * 2 - 1 < 0) ? (radius) : -1 * (radius));
    // positions.push( ( Math.random()* 2 - 1    ) * radius );
    // console.log((Math.random() * 1 - 1 ) * window.innerHeight )
    positions.push((Math.random() * 2 - 1) * window.innerHeight + Math.random() * objectsDistance * i);
    positions.push((Math.random() * 2 - 1) * radius);

    const randomIndex = Math.floor(Math.random() * colorsArr.length);

    const mixedColor = colorsArr[randomIndex]
    // mixedColor.lerp(outsideColor, Math.random() )

    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
    // color.setHSL( i / particles , 1.0, 0.5 );

    // colors.push( color.r, color.g, color.b );

    // const mixedColor = insideColor.clone()


}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizesDots, 1).setUsage(THREE.DynamicDrawUsage));

particleSystem = new THREE.Points(geometry, shaderMaterial);

// particleSystem.scale.set(1, 1.5, 1)
scene.add(particleSystem);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setClearColor(0x000000, 0);

container.appendChild(renderer.domElement);

// stats = new Stats();
// container.appendChild( stats.dom );

// Controls
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

//

window.addEventListener('resize', onWindowResize);


function onWindowResize() {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.heightContainer = container.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
const clock = new THREE.Clock()
let previousTime = 0


/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0


window.addEventListener('mousemove', (event) => {
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
    const elapsedTime = clock.getElapsedTime();
    const sizes2 = geometry.attributes.size.array;
    const position = geometry.attributes.position.array;

    geometry.attributes.position.array;

    particleSystem.position.y = scrollY * objectsDistance * 0.02;
    // camera.position.y -=  Math.atan(elapsedTime)  * 0.05  ;
    for (let i = 0; i < particles; i++) {
      sizes2[i]   =  2000 +  Math.sin(elapsedTime) * 100 + (Math.random() * 2 - 1)  * 4;
      position[i + 0]   -=  Math.cos(elapsedTime ) * 0.01    ;
      // position[i + 1]   -=  Math.tan(elapsedTime * .05) * 0.1 ;
    }
    geometry.attributes.size.needsUpdate = true;
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }


function animate() {

    requestAnimationFrame(animate);

    render();
    // stats.update();

}

animate();

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
})