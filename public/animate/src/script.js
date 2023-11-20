import * as THREE from 'three';
// import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import galaxyVertexShader from './shaders/galaxy/vertex.glsl'
import galaxyFragmentShader from './shaders/galaxy/fragment.glsl'

let renderer, scene, camera, stats;
let topY = window.scrollY
let particleSystem, uniforms, geometry;
const container = document.querySelector("#container");
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}
const clock = new THREE.Clock()



function init(particles) {
	// const radius = sizes.width * .18 / 4;
	const radius = 3;
	// const radiusY = sizes.height  ;
	const radiusY = 1  ;









	camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height, 1, 100);
	// camera.position.z = 2;
	camera.position.z = 2;

	scene = new THREE.Scene();

	const axesHelper = new THREE.AxesHelper(radius, radius, radius);
	scene.add(axesHelper);
	uniforms = {

		pointTexture: { value: new THREE.TextureLoader().load('pack/el4-lg.png') }

	};

	const shaderMaterial = new THREE.ShaderMaterial({

		uniforms: uniforms,
		vertexShader: galaxyVertexShader,
		fragmentShader: galaxyFragmentShader,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		vertexColors: true

	});




	geometry = new THREE.BufferGeometry();

	const positions = [];
	const colors = [];
	const sizesParts = [];

	const colorsArr = [
		new THREE.Color('#636CE2'),
		new THREE.Color('#00D700'),
		new THREE.Color('#86EFEA'),
		new THREE.Color('#303E57')
	]

	for (let i = 0; i < particles; i++) {
		const i3 = i * 3
		let sizeEl = Math.abs(radius * 2 * (Math.random() * 2 + 1))  ;
		// let sizeEl = 1 ;
		sizesParts.push(sizeEl);
		// if (i ==1 ) {
		// 	positions.push(radius);
		// 	positions.push(radiusY);
		// 	// positions.push(-1 * (Math.random() * 2 + 1) * radius / 1000 );
			
		// }
		// else if ( i == particles.length - 1  ) {
		// 	positions.push(-radius);
		// 	positions.push(-radiusY );
		// 	// positions.push(-1 * (Math.random() * 2 + 1) * radius / 1000 );

		// }
		// else{

			const posY = (radius * .95 + (Math.random() * 2 - 1) * .1 )
			positions.push((Math.random() * 2 - 1) > 0 ? posY    : -1 * posY   );
			// positions.push((Math.random() * 2 - 1) * radius * (i > 100 ? i * 0.01 : i) );
			positions.push((Math.random() * 2 - 1) * radius * (i > 100 ? i * 0.01 : i)  * 1 );
			positions.push(0);
			
			// positions.push(radius  );
			// positions.push(radius);
			// positions.push(0);
			
		// }
		const randomIndex = Math.floor(Math.random() * colorsArr.length);

		const mixedColor = colorsArr[randomIndex]
		// mixedColor.lerp(outsideColor, Math.random() )

		colors[i3] = mixedColor.r
		colors[i3 + 1] = mixedColor.g
		colors[i3 + 2] = mixedColor.b



	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
	geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizesParts, 1).setUsage(THREE.DynamicDrawUsage));

	particleSystem = new THREE.Points(geometry, shaderMaterial);

	scene.add(particleSystem);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(1)
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.setClearColor(0x000000, 0);
	container.appendChild(renderer.domElement);

// 	// Controls
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
	// stats = new Stats();
	// container.appendChild( stats.dom );

	//
}

window.addEventListener('resize', onWindowResize);


function onWindowResize() {

	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// camera.aspect =sizes.width / sizes.height;
	// camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
	// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}






function render(particles) {

	const time = Date.now() * 0.05;
	let elapsedTime = clock.getElapsedTime();


	const sizes2 = geometry.attributes.size.array;
	const position = geometry.attributes.position.array;
	
	for (let i = 0; i < particles; i++) {
		const i3 = 3 * i; 
		// sizes2[i] =    Math.cos(   time * .04  ) ;
		// position[ i3 + 0] +=  .004 * ( Math.cos( 0.01 * i + elapsedTime  * 1.5 ) );
		position[ i3 + 1] -=  .0001 * (    Math.cos( 0.01 * i + elapsedTime  * 2) );
		position[ i3 + 2] +=  .001 * (    Math.cos( 0.01 * i + elapsedTime  * 2) );
		// position[ i3 + 2] +=  .05 * ( Math.cos( 0.001 * i + elapsedTime  ) ); 
	}
	particleSystem.position.y = topY * 0.01;

	// geometry.attributes.size.needsUpdate = true;
	geometry.attributes.position.needsUpdate = true;

	renderer.render(scene, camera);

}
function animate(particles) {

	requestAnimationFrame(animate);

	render(particles);

}

sizes.heightContainer = container.offsetHeight;
const particles = Math.floor(sizes.heightContainer * 20 / sizes.height);
// const particles = 1;

init(particles);
animate(particles); 

console.log(geometry.attributes);
window.addEventListener('scroll', () => {
	topY = window.scrollY
})

