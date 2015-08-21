
var gl = null;

function RenderingEngine(canvas)
{
	this.camera = null;
	this.canvas = canvas;
	this.pipeline = null;
	this.program = null;
	this.requestId = null;

	//canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
	// tell the simulator when to lose context.
	//canvas.loseContextInNCalls(1);

	this.canvas.addEventListener('webglcontextlost', this.handleContextLost, false);
	this.canvas.addEventListener('webglcontextrestored', this.handleContextRestored, false);

	this.init();
}

RenderingEngine.prototype.advance = function()
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	for (var entityIndex = 0; entityIndex < Simplicity.entities.length; entityIndex++)
	{
		var entity = Simplicity.entities[entityIndex];
		var components = entity.components;

		for (var componentIndex = 0; componentIndex < components.length; componentIndex++)
		{
			if (components[componentIndex] instanceof Model)
			{
				this.render(entity, components[componentIndex]);
			}
		}
	}
}

RenderingEngine.prototype.handleContextLost = function(e)
{
	e.preventDefault();
	clearLoadingImages();

	if (this.requestId !== null)
	{
		window.cancelAnimFrame(requestId);
		this.requestId = null;
	}
}

RenderingEngine.prototype.handleContextRestored = function()
{
	this.init();
}

RenderingEngine.prototype.init = function()
{
	gl = initWebGL(this.canvas.id);
	if (gl === null)
	{
		return;
	}

	gl.enable(gl.CULL_FACE);

	gl.enable(gl.DEPTH_TEST);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

	gl.enableVertexAttribArray(0);
	gl.enableVertexAttribArray(1);
	gl.enableVertexAttribArray(2);
	gl.enableVertexAttribArray(3);

	this.onResize();
}

RenderingEngine.prototype.onResize = function()
{
	gl.viewport(0, 0, this.canvas.width, this.canvas.height);
}

RenderingEngine.prototype.render = function(entity, model)
{
	var worldTransform = new J3DIMatrix4();
	worldTransform.load(entity.transform);
	worldTransform.multiply(model.transform);

	gl.bindTexture(gl.TEXTURE_2D, model.texture);

	gl.bindBuffer(gl.ARRAY_BUFFER, model.colorBuffer);
	gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
	gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer);
	gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, model.texCoordBuffer);
	gl.vertexAttribPointer(3, 2, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);

	for (var index = 0; index < this.pipeline.programs.length; index++)
	{
		this.pipeline.applyPass(index);

		var program = this.pipeline.programs[index];

		this.camera.getTransform().setUniform(gl, gl.getUniformLocation(program, "cameraTransform"), false);
		worldTransform.setUniform(gl, gl.getUniformLocation(program, "worldTransform"), false);

		if (model.texture === null)
		{
			gl.uniform1i(gl.getUniformLocation(program, "samplerEnabled"), 0);
		}
		else
		{
			gl.uniform1i(gl.getUniformLocation(program, "samplerEnabled"), 1);
		}

		gl.drawElements(gl.TRIANGLES, model.indexCount, gl.UNSIGNED_BYTE, 0);
	}
}

