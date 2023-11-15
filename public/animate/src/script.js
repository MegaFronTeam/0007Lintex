import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import Stats from 'three/addons/libs/stats.module.js';

import galaxyVertexShader from './shaders/galaxy/vertex.glsl'
import galaxyFragmentShader from './shaders/galaxy/fragment.glsl'

let renderer, scene, camera, stats;
			let particleSystem, uniforms, geometry;

			const particles = 50;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 300;

				scene = new THREE.Scene();

				uniforms = {

					pointTexture: { value: new THREE.TextureLoader().load( 'pack/el4-lg.png' ) }

				};

				const shaderMaterial = new THREE.ShaderMaterial( {

					uniforms: uniforms,
					vertexShader: galaxyVertexShader,
					fragmentShader: galaxyFragmentShader,

					blending: THREE.AdditiveBlending,
					depthTest: false,
					transparent: true,
					vertexColors: true

				} );


				const radius = window.innerWidth * .18;

				geometry = new THREE.BufferGeometry();

				const positions = [];
				const colors = [];
				const sizesParts = [];

				const color = new THREE.Color();

				for ( let i = 0; i < particles; i ++ ) {

					positions.push( ( Math.random() * 2 - 1 ) > 0 ? radius : -radius );
					positions.push( ( Math.random() * 2 - 1 ) * radius * 2 );
					positions.push( ( Math.random() * 2 - 1 ) * radius );

					color.setHSL( i / particles, 1.0, 0.5 );

					colors.push( color.r, color.g, color.b );

					sizesParts.push( 1500 );

				}

				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
				geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
				geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizesParts, 1 ).setUsage( THREE.DynamicDrawUsage ) );

				particleSystem = new THREE.Points( geometry, shaderMaterial );

				scene.add( particleSystem );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
				renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.setClearColor(0x000000, 0);

				const container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );

				// stats = new Stats();
				// container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				// camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				render(); 

			}

			function render() {

				const time = Date.now() * 0.005;

				// particleSystem.rotation.z = 0.01 * time;

				const sizesParts = geometry.attributes.size.array;
				const position = geometry.attributes.position.array;

				for ( let i = 0; i < particles; i ++ ) {
                    const i3 = 3* i;
					sizesParts[ i ] +=  4 * Math.sin(  time * .5 * 0.05 * i ) + ( Math.random() * 2 - 1 );
					position[ i3 ] +=   .01 * Math.sin(   time * 100 * 0.05 * i   ) * ( Math.random() * 2 - 1 );
					position[ i3 + 1] +=  .01 *  Math.sin(   time * 100 * 0.05 * i   ) * ( Math.random() * 2 - 1 );
					position[ i3 + 2] += .01 *  Math.sin(   time * 100 * 0.05 * i   ) * ( Math.random() * 2 - 1 );

				}

				geometry.attributes.size.needsUpdate = true;
				geometry.attributes.position.needsUpdate = true;

				renderer.render( scene, camera );

			}