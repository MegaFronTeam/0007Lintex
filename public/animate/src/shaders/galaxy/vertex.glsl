attribute float size;
uniform  float uTime;

attribute vec3 aRandomness;

attribute float aScale;
varying vec3 vColor;
attribute vec3 ;
void main() {

	vColor = color;

	/**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0); 


	// Spin
    float angle = atan(modelPosition.x, modelPosition.z);
    // float disatanceToCenter = length(modelPosition.xz);
    // float angleOffset = (1.0 / disatanceToCenter) * uTime * 0.005;
    // angle += angleOffset;
    // modelPosition.y = sin(angle) * 20.0;
    // modelPosition.z = sin(angle) * disatanceToCenter;
		// modelPosition.x = cos(angle) ;
		// modelPosition.y = angle;
    // Randomness
    // modelPosition.xyz += aRandomness;


	// vec4 mvPosition = modelViewMatrix * vec4( position, 0.8 );
    // gl_Position = projectedPosition;
	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;
	gl_Position = projectedPosition;

	gl_PointSize = size * aScale;
	// gl_PointSize *= (1.0 / viewPosition.z);
}