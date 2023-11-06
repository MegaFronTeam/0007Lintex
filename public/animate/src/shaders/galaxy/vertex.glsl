attribute float size;

			varying vec3 vColor;

			void main() {

				vColor = color;

				vec4 mvPosition = modelViewMatrix * vec4( position, 0.8 );

				gl_PointSize = size * ( 600.0  );

				gl_Position = projectionMatrix * mvPosition;

			}