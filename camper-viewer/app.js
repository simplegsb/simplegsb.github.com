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
