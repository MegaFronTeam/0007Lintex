import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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

let particles = Math.floor(sizes.heightContainer * 1000 / sizes.height);

// console.log(particles, sizes.heightContainer)
const objectsDistance = Math.floor(sizes.heightContainer / sizes.height);
camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
const radius = sizes.width ;
camera.position.z = 600;
scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);




uniforms = {

    uTime: { value: 0 },
    // uSize: { value: 3000 },
    // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
    // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
    // pointTexture: { value: new THREE.TextureLoader().load( 'pack/circle_05.png' ) }
    pointTexture: { 
        value: new THREE.TextureLoader().load('pack/circle_05.png'),
        // value: new THREE.TextureLoader().load('pack/magic_04.png'),
        value: new THREE.TextureLoader().load('pack/smoke_02.png'),
        value: new THREE.TextureLoader().load('pack/dirt_01.png'),
        value: new THREE.TextureLoader().load('pack/scorch_02.png'),
        value: new THREE.TextureLoader().load('pack/el1.png'),
        value: new THREE.TextureLoader().load('pack/el2.png'),
        value: new THREE.TextureLoader().load('pack/el4-lg.png'),
        // value: new THREE.TextureLoader().load('pack/el3.png'),
        // value: new THREE.TextureLoader().load('pack/el1-lg.png'),
        // value: new THREE.TextureLoader().load('pack/slash_03.png'),
        // value: new THREE.TextureLoader().load('pack/trace_02.png'),
        // value: new THREE.TextureLoader().load('pack/Rotated/trace_07_rotated.png'),
        // value: new THREE.TextureLoader().load('pack/Rotated/muzzle_02_rotated.png'),
        // value: new THREE.TextureLoader().load('pack/scorch_03.png'),
     }

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
const scales = new Float32Array(particles * 1)
const randomness = new Float32Array(particles * 3)
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
    // positions.push((Math.random() * 2 - 1) * sizes.height + (Math.random() + 1) * objectsDistance );
    positions.push((Math.random() * 2 - 1) * sizes.height * 500 +(  Math.random() * 2 - 1) * objectsDistance * i);
    positions.push((Math.random() * 2 - 1) * radius *  .6);
    // positions.push(  - sizes.height / (Math.random() + 1) * (  i) );
    // positions.push((Math.random() * 2 - 1) * radius *  .6);

    const randomIndex = Math.floor(Math.random() * colorsArr.length);


    // Randomness
    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

    randomness[i3] =randomX
    randomness[i3 + 1] = randomY
    randomness[i3 + 2] = randomZ

    const mixedColor = colorsArr[randomIndex]
    // mixedColor.lerp(outsideColor, Math.random() )

    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b

     // Scale
     scales[i] = (Math.random() + 1) * 1000
    // color.setHSL( i / particles , 1.0, 0.5 );

    // colors.push( color.r, color.g, color.b );

    // const mixedColor = insideColor.clone()


}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizesDots, 1).setUsage(THREE.DynamicDrawUsage));
geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

particleSystem = new THREE.Points(geometry, shaderMaterial);

// particleSystem.scale.set(1, 1.5, 1)
scene.add(particleSystem);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, sizes.height);
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

    // // Update camera
    // camera.aspect = sizes.width / sizes.height
    // camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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


// console.log(geometry)
function render() {
    const elapsedTime = clock.getElapsedTime();
    const sizes2 = geometry.attributes.size.array;
    const aScale = geometry.attributes.aScale.array;
    const position = geometry.attributes.position.array;

    shaderMaterial.uniforms.uTime.value = elapsedTime
    geometry.attributes.position.array;

    // particleSystem.rotation.x +=  .0006;
    particleSystem.position.y = scrollY * objectsDistance * 0.2;
    // camera.position.x +=  Math.sin(elapsedTime) *objectsDistance * 0.02;
    // camera.position.y += scrollY * objectsDistance * 0.2;
    // camera.position.y -=  scrollY * objectsDistance * 0.002;
    for (let i = 0; i < particles; i++) {
    const i3 = i * 3
    //   sizes2[i]   +=    Math.sin(elapsedTime  ) * 1000;
    //   aScale[i]   *=    Math.sin(elapsedTim  ) + 1  ;
      position[i3 + 0]   +=  Math.cos(elapsedTime ) * Math.abs(Math.random() * 2 - 1) + (Math.random() * 2 - 1) * 0.05;
      position[i3 + 1]   +=  Math.cos(elapsedTime ) * 0.8 * (Math.random() * 2 - 1) * 0.001;
      position[i3 + 2]   += 10 *  Math.cos(elapsedTime ) * 0.04 + (Math.random() * 2 - 1) * 0.1;
    //   position[i3 + 1]   +=  Math.tan(sizes2[i]  * elapsedTime )  *  0.1   ;
    //   position[i3 + 1]   =  position[i3 + 1] + Math.cos(elapsedTime * 0.001);
    }
    geometry.attributes.size.needsUpdate = true;
    geometry.attributes.aScale.needsUpdate = true;
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