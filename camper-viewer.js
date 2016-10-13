(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
AlphaPipeline.prototype = Object.create(sim.Pipeline.prototype);
AlphaPipeline.prototype.constructor = AlphaPipeline;

function AlphaPipeline(vertexShader, fragmentShader)
{
	sim.Pipeline.call(this, vertexShader, fragmentShader);

	this.alpha = 1;
}

AlphaPipeline.prototype.applyPass = function(pass)
{
	sim.Pipeline.prototype.applyPass.call(this, pass);

	gl.uniform1f(gl.getUniformLocation(this.programs[pass], "alpha"), this.alpha);
};

module.exports = AlphaPipeline;

},{}],2:[function(require,module,exports){
(function (global){
var AlphaPipeline = require('./alpha-pipeline');
var CameraSpringer = require('./camera-springer');
var Flipper = require('./flipper');
var Spinner = require('./spinner');
var View = require('./view');
var ViewEngine = require('./view-engine');

var viewEngine = undefined;
var views = {};

global.showGertrudeViewer = function()
{
	var canvas = document.getElementById("gertrude");
	canvas.addEventListener("wheel", onMouseWheel, false);

	var renderingEngine = new sim.RenderingEngine(canvas);

	createViews();

	var resizeCanvas = function()
	{
		var canvasWidth = Math.min(720, window.innerWidth * 0.4);
		if (window.innerWidth < 900)
		{
			canvasWidth = window.innerWidth * 0.9;
		}

		canvas.width = canvasWidth;
		canvas.height = canvas.width / 1.5;
		renderingEngine.onResize();
	};
	resizeCanvas();
	$(window).resize(resizeCanvas);

	renderingEngine.camera = new sim.Camera();
	renderingEngine.camera.projection.perspective(30, 720 / 480, 1, 10000);
	renderingEngine.camera.projection.lookat(0, 0, 0, 0, 0, -1, 0, 1, 0);

	renderingEngine.pipeline = new AlphaPipeline("simpleVertexShader", "simpleFragmentShader");
	renderingEngine.pipeline.addPass("mirrorVertexShader", "mirrorFragmentShader");

	var scriptingEngine = new sim.ScriptingEngine(canvas);
	var cameraSpringer = new CameraSpringer("gertrude", renderingEngine.camera);
	cameraSpringer.pivot[1] = 0.55;
	cameraSpringer.offset[2] = 4;

	viewEngine = new ViewEngine(renderingEngine.pipeline, cameraSpringer);
	viewEngine.switchTo(views.exterior);

	sim.engines.push(renderingEngine);
	sim.engines.push(scriptingEngine);
	sim.engines.push(viewEngine);

	var cameraController = new sim.Entity();
	cameraController.components.push(cameraSpringer);

	sim.entities.push(cameraController);

	sim.play();
}

function onMouseWheel(event)
{
	event.preventDefault();

	if (event.wheelDelta > 0 && viewEngine.newView.name === "exterior")
	{
		viewEngine.switchTo(views.interior);
	}
	else if (event.wheelDelta < 0 && viewEngine.newView.name === "interior")
	{
		viewEngine.switchTo(views.exterior);
	}
}

function createViews()
{
	var exterior = new View();
	exterior.cameraOffset = new sim.Vector3(0, 0, 4);
	exterior.entity = createGertrudeExterior();
	exterior.name = "exterior";
	views.exterior = exterior;

	var interior = new View();
	interior.entity = createGertrudeInterior();
	interior.name = "interior";
	views.interior = interior;
}

function createGertrudeExterior()
{
	var gertrude = new sim.Entity();
	gertrude.transform.translate(0, 0.05, 0);

	addPhoto(gertrude, "images/gertrude-exterior-back.png", 0.5, 0.5, [0, 0, -1.1], 180);
	addPhoto(gertrude, "images/gertrude-exterior-front.png", 0.5, 0.5, [0, 0, 1.1], 0);
	addPhoto(gertrude, "images/gertrude-exterior-left.png", 1, 0.5, [0.6, 0, 0], 90);
	addPhoto(gertrude, "images/gertrude-exterior-right.png", 1, 0.5, [-0.6, 0, 0], 270);

	gertrude.components.push(new Spinner("gertrude", gertrude));

	return gertrude;
}

function createGertrudeInterior()
{
	var gertrude = new sim.Entity();
	gertrude.transform.translate(0, 0.05, 0);

	addPhoto(gertrude, "images/gertrude-exterior-back.png", 0.5, 0.5, [0, 0, -2.2], 0, true);
	addPhoto(gertrude, "images/gertrude-exterior-front.png", 0.5, 0.5, [0, 0, 2.2], 180, true);
	addPhoto(gertrude, "images/gertrude-exterior-left.png", 1, 0.5, [1.2, 0, 0], 270, true);
	addPhoto(gertrude, "images/gertrude-exterior-right.png", 1, 0.5, [-1.2, 0, 0], 90, true);

	gertrude.components.push(new Spinner("gertrude", gertrude));

	return gertrude;
}

function addPhoto(entity, image, halfWidth, halfHeight, position, rotation, faceInward)
{
	var frameWidth = 0.02;
	var halfFrameWidth = halfWidth + frameWidth;
	var halfFrameHeight = halfHeight + frameWidth;

	var photoOffsetDistance = 0.001;
	if (faceInward)
	{
		photoOffsetDistance *= -1;
	}

	var photoOffset = [0, 0, 0];
	if (position[0] !== 0)
	{
		photoOffset[0] = position[0] / Math.abs(position[0]) * photoOffsetDistance;
	}
	if (position[1] !== 0)
	{
		photoOffset[1] = position[1] / Math.abs(position[1]) * photoOffsetDistance;
	}
	if (position[2] !== 0)
	{
		photoOffset[2] = position[2] / Math.abs(position[2]) * photoOffsetDistance;
	}

	var photo = createPhotoRectangle(halfWidth, halfHeight, halfFrameHeight);
	photo.texture = sim.RenderingFactory.createTexture(image);
	photo.transform.translate(position[0] + photoOffset[0], position[1] + photoOffset[1], position[2] + photoOffset[2]);
	photo.transform.rotate(rotation, 0, 1, 0);
	photo.transform.rotate(90, 1, 0, 0);
	entity.components.push(photo);

	var frame = createPhotoRectangle(halfFrameWidth, halfFrameHeight, halfFrameHeight, [1, 1, 1, 1]);
	frame.transform.translate(position[0], position[1], position[2]);
	frame.transform.rotate(rotation, 0, 1, 0);
	frame.transform.rotate(90, 1, 0, 0);
	entity.components.push(frame);

	var back = createPhotoRectangle(halfFrameWidth, halfFrameHeight, halfFrameHeight, [0.375, 0.375, 0.375, 1]);
	back.transform.translate(position[0], position[1], position[2]);
	back.transform.rotate(rotation + 180, 0, 1, 0);
	back.transform.rotate(90, 1, 0, 0);
	entity.components.push(back);
}

function createPhotoRectangle(halfWidth, halfHeight, yOffset, color)
{
	var rectangle = new sim.Model();

	if (!color)
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

	rectangle.colorBuffer = new sim.Buffer();
	rectangle.colorBuffer.setData(colors);

	var indices = new Uint8Array([	0, 1, 2,
					0, 2, 3]);

	rectangle.indexBuffer = new sim.Buffer(true);
	rectangle.indexBuffer.setData(indices);
	rectangle.indexCount = indices.length;

	var normals = new Float32Array([0, 0, 1,
					0, 0, 1,
					0, 0, 1,
					0, 0, 1]);

	rectangle.normalBuffer = new sim.Buffer();
	rectangle.normalBuffer.setData(normals);

	var texCoords = new Float32Array([	1, 0,
						0, 0,
						0, 1,
						1, 1]);

	rectangle.texCoordBuffer = new sim.Buffer();
	rectangle.texCoordBuffer.setData(texCoords);

	var vertices = new Float32Array([	halfWidth, halfHeight + yOffset, 0,
						-halfWidth, halfHeight + yOffset, 0,
						-halfWidth,-halfHeight + yOffset, 0,
						halfWidth,-halfHeight + yOffset, 0]);

	rectangle.vertexBuffer = new sim.Buffer();
	rectangle.vertexBuffer.setData(vertices);

	return rectangle;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./alpha-pipeline":1,"./camera-springer":3,"./flipper":4,"./spinner":5,"./view":7,"./view-engine":6}],3:[function(require,module,exports){
function CameraSpringer(canvasId, camera)
{
	this.camera = camera;
	this.mode = "free";
	this.offset = new sim.Vector3();
	this.pivot = new sim.Vector3();
	this.rotation = 0;
	this.speed = 0;
	this.yNew = 0;
	this.yOld = 0;

	$("#" + canvasId).mousedown(this.onMouseDown.bind(this));
	$("#" + canvasId).mousemove(this.onMouseMove.bind(this));
	$("#" + canvasId).mouseout(this.onMouseUp.bind(this));
	$("#" + canvasId).mouseup(this.onMouseUp.bind(this));
}

CameraSpringer.prototype.execute = function()
{
	if (this.mode === "free")
	{
		var acceleration = -this.rotation * sim.deltaTime * 0.005;

		// Dampening
		if (this.rotation > 0 && this.speed > 0 ||
			this.rotation < 0 && this.speed < 0)
		{
			acceleration *= 2.5;
		}

		this.speed += acceleration;
		this.rotation += this.speed;
	}
	else if (this.mode === "user")
	{
		this.rotation -= (this.yNew - this.yOld) / Math.max(Math.abs(this.rotation), 1);
		this.yOld = this.yNew;
	}

	this.camera.view = new sim.Matrix44();
	this.camera.view.translate(this.pivot[0], this.pivot[1], this.pivot[2]);
	this.camera.view.rotate(this.rotation, 1, 0, 0);
	this.camera.view.translate(this.offset[0], this.offset[1], this.offset[2]);
};

CameraSpringer.prototype.onMouseDown = function(event)
{
	event.preventDefault();

	this.mode = "user";
	this.yOld = event.pageY;
};

CameraSpringer.prototype.onMouseMove = function(event)
{
	this.yNew = event.pageY;
};

CameraSpringer.prototype.onMouseUp = function()
{
	this.mode = "free";
	this.speed = 0;
};

module.exports = CameraSpringer;

},{}],4:[function(require,module,exports){
function Flipper(entity, pipeline, direction, onComplete)
{
	this.entity = entity;
	this.direction = direction;
	this.loading = false;
	this.onComplete = onComplete;
	this.pipeline = pipeline;
	this.position = 0.001;
	this.ready = true;
	this.rotation = 0;

	if (this.direction === "down")
	{
		this.endRotation = 90;
		this.pipeline.alpha = 1;
		this.startRotation = 0;
	}
	else if (this.direction === "up")
	{
		this.endRotation = 0;
		this.pipeline.alpha = 0;
		this.startRotation = 90;
	}

	this.fullRotation = this.endRotation - this.startRotation;
}

Flipper.prototype.flip = function()
{
	var delta = Math.min(this.position, 1 - this.position) * sim.deltaTime * 0.01;

	this.position += delta;
	if (this.position + 0.001 > 1)
	{
		this.position = 1;
	}

	var deltaRotation = 0;
	if (this.position === 1)
	{
		deltaRotation = this.fullRotation - this.rotation;
	}
	else
	{
		deltaRotation = delta * this.fullRotation;
	}
	this.rotation += deltaRotation;

	for (var index = 0; index < this.entity.components.length; index++)
	{
		var component = this.entity.components[index];

		if (component instanceof sim.Model)
		{
			component.transform.rotate(deltaRotation, 1, 0, 0);
		}
	}

	if (this.direction === "down")
	{
		this.pipeline.alpha = 1 - this.position;
	}
	else if (this.direction === "up")
	{
		this.pipeline.alpha = this.position;
	}

	if (this.position === 1)
	{
		this.entity.components.splice(this.entity.components.indexOf(this), 1);

		if (this.onComplete)
		{
			this.onComplete();
		}
	}
};

Flipper.prototype.execute = function()
{
	if (sim.RenderingFactory.isLoadingTextures().length > 0 && this.direction === "up")
	{
		this.loading = true;
		this.ready = false;

		$('#loading').show();
	}
	else if (this.loading)
	{
		this.loading = false;
		setTimeout(this.start.bind(this), 1000);
	}

	if (this.ready)
	{
		this.flip();
	}
};

Flipper.prototype.start = function()
{
	this.ready = true;

	$('#loading').hide();
};

module.exports = Flipper;

},{}],5:[function(require,module,exports){
function Spinner(canvasId, entity)
{
	this.entity = entity;
	this.mode = "free";
	this.speed = 0.2;
	this.targetSpeed = 0.2;
	this.xNew = 0;
	this.xOld = 0;

	$("#" + canvasId).mousedown(this.onMouseDown.bind(this));
	$("#" + canvasId).mousemove(this.onMouseMove.bind(this));
	$("#" + canvasId).mouseout(this.onMouseUp.bind(this));
	$("#" + canvasId).mouseup(this.onMouseUp.bind(this));
}

Spinner.prototype.execute = function()
{
	if (this.mode === "free")
	{
		this.speed += (this.targetSpeed - this.speed) * sim.deltaTime * 0.01;
	}
	else if (this.mode === "user")
	{
		this.speed = (this.xNew - this.xOld) * sim.deltaTime * 0.02;
		this.xOld = this.xNew;
	}

	this.entity.transform.rotate(this.speed, 0, 1, 0);
};

Spinner.prototype.onMouseDown = function(event)
{
	event.preventDefault();

	this.mode = "user";
	this.xOld = event.pageX;
};

Spinner.prototype.onMouseMove = function(event)
{
	this.xNew = event.pageX;
};

Spinner.prototype.onMouseUp = function()
{
	this.mode = "free";

	if (this.speed < 0 && this.targetSpeed > 0 ||
		this.speed > 0 && this.targetSpeed < 0)
	{
		this.targetSpeed *= -1;
	}
};

module.exports = Spinner;

},{}],6:[function(require,module,exports){
var Flipper = require('./flipper');

function ViewEngine(pipeline, cameraSpringer)
{
	this.cameraSpringer = cameraSpringer;
	this.newView = undefined;
	this.oldView = undefined;
	this.pipeline = pipeline;
	this.switching = false;
}

ViewEngine.prototype.advance = function()
{
	if (!this.newView.cameraOffset.equals(this.cameraSpringer.offset))
	{
		var fullMovement = new sim.Vector3();
		fullMovement.copyValues(this.newView.cameraOffset);
		fullMovement.subtract(this.oldView.cameraOffset);

		var toNewOffset = new sim.Vector3();
		toNewOffset.copyValues(this.newView.cameraOffset);
		toNewOffset.subtract(this.cameraSpringer.offset);

		var fractionComplete = new sim.Vector3();
		fractionComplete.copyValues(toNewOffset);
		fractionComplete.divide(fullMovement);
		var percentComplete = fractionComplete.vectorLength();
		if (isNaN(percentComplete))
		{
			percentComplete = 0.0001;
		}

		var distanceToNewOffset = toNewOffset.vectorLength();
		var distanceDelta = Math.min(percentComplete, 1 - percentComplete) * distanceToNewOffset * sim.deltaTime * 5;

		if (distanceToNewOffset < distanceDelta)
		{
			this.cameraSpringer.offset.copyValues(this.newView.cameraOffset);
		}
		else
		{
			var delta = new sim.Vector3(toNewOffset);
			delta.copyValues(toNewOffset);
			delta.divide(distanceToNewOffset);
			delta.multiply(distanceDelta);
			this.cameraSpringer.offset.add(delta);
		}
	}

	if (!this.switching && this.newView != this.oldView)
	{
		this.switching = true;

		this.newView.entity.components.push(new Flipper(this.newView.entity, this.pipeline, "up",
			this.finish.bind(this)));

		if (this.oldView)
		{
			this.oldView.entity.components.push(new Flipper(this.oldView.entity, this.pipeline, "down",
				this.switchEntities.bind(this)));
		}
		else
		{
			this.switchEntities();
		}
	}
};

ViewEngine.prototype.finish = function()
{
	this.oldView = this.newView;
	this.switching = false;
};

ViewEngine.prototype.switchEntities = function()
{
	if (this.oldView)
	{
		sim.entities.splice(sim.entities.indexOf(this.oldView.entity), 1);
	}

	sim.entities.push(this.newView.entity);
};

ViewEngine.prototype.switchTo = function(view)
{
	if (!this.switching)
	{
		this.newView = view;
	}
};

module.exports = ViewEngine;

},{"./flipper":4}],7:[function(require,module,exports){
function View()
{
	this.cameraOffset = new sim.Vector3();
	this.entity = undefined;
	this.name = undefined;
}

View.prototype.equals = function(other)
{
	return this.name == other.name;
};

module.exports = View;

},{}]},{},[2]);
