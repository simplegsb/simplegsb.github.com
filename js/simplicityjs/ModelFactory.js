
var ModelFactory = new function()
{
	this.createRectangle = function(halfWidth, halfHeight, color)
	{
		var rectangle = new Model();

		if (color === undefined)
		{
			color = [0, 0, 0, 1];
		}

		var colors = new Float32Array(16);
		colors[0] = color[0];
		colors[1] = color[1];
		colors[2] = color[2];
		colors[3] = color[3];
		colors[4] = color[0];
		colors[5] = color[1];
		colors[6] = color[2];
		colors[7] = color[3];
		colors[8] = color[0];
		colors[9] = color[1];
		colors[10] = color[2];
		colors[11] = color[3];
		colors[12] = color[0];
		colors[13] = color[1];
		colors[14] = color[2];
		colors[15] = color[3];

		rectangle.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, rectangle.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

		var indices = new Uint8Array([	0, 1, 2,
						0, 2, 3]);

		rectangle.indexBuffer = gl.createBuffer();
		rectangle.indexCount = indices.length;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rectangle.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

		var normals = new Float32Array([0, 0, 1,
						0, 0, 1,
						0, 0, 1,
						0, 0, 1]);

		rectangle.normalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, rectangle.normalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

		var texCoords = new Float32Array([	1, 0,
							0, 0,
							0, 1,
							1, 1]);

		rectangle.texCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, rectangle.texCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

		var vertices = new Float32Array([	halfWidth, halfHeight, 0,
							-halfWidth, halfHeight, 0,
							-halfWidth,-halfHeight, 0,
							halfWidth,-halfHeight, 0]);

		rectangle.vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, rectangle.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		// Unbind buffers.
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

		return rectangle;
	};

	this.createSquare = function(halfExtent)
	{
		return ModelFactory.createRectangle(halfExtent, halfExtent);
	};
};
