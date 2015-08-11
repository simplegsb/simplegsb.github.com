
function createGertrude()
{
	var gertrude = new Entity();
	gertrude.transform.translate(0, 0.55, -4);

	addPhoto(gertrude, "images/gertrude-exterior-back.png", 0.5, 0.5, 0, 0, -1.1, 180);
	addPhoto(gertrude, "images/gertrude-exterior-front.png", 0.5, 0.5, 0, 0, 1.1, 0);
	addPhoto(gertrude, "images/gertrude-exterior-left.png", 1, 0.5, 0.6, 0, 0, 90);
	addPhoto(gertrude, "images/gertrude-exterior-right.png", 1, 0.5, -0.6, 0, 0, 270);

	var spinner = new Spinner(gertrude);
	gertrude.components.push(spinner);

	var animator = new Animator(gertrude);
	gertrude.components.push(animator);

	return gertrude;
}

function addPhoto(entity, image, halfWidth, halfHeight, x, y, z, rotation)
{
	var photoOffset = [0, 0, 0];
	if (x !== 0)
	{
		photoOffset[0] = x / Math.abs(x) * 0.001;
	}
	if (y !== 0)
	{
		photoOffset[1] = y / Math.abs(y) * 0.001;
	}
	if (z !== 0)
	{
		photoOffset[2] = z / Math.abs(z) * 0.001;
	}

	var photo = ModelFactory.createRectangle(halfWidth, halfHeight);
	photo.texture = loadImageTexture(gl, image);
	photo.transform.translate(x + photoOffset[0], y + photoOffset[1], z + photoOffset[2]);
	photo.transform.rotate(rotation, 0, 1, 0);
	entity.components.push(photo);

	var frame = ModelFactory.createRectangle(halfWidth + 0.02, halfHeight + 0.02, [1, 1, 1, 1]);
	frame.transform.translate(x, y, z);
	frame.transform.rotate(rotation, 0, 1, 0);
	entity.components.push(frame);

	var back = ModelFactory.createRectangle(halfWidth + 0.02, halfHeight + 0.02, [0.375, 0.375, 0.375, 1]);
	back.transform.translate(x, y, z);
	back.transform.rotate(rotation + 180, 0, 1, 0);
	entity.components.push(back);
}

function initGertrudeViewer()
{
	var canvas = document.getElementById("gertrudeCanvas");
	var renderingEngine = new RenderingEngine(canvas);

	renderingEngine.camera = new Camera();
	renderingEngine.camera.projection.perspective(30, canvas.width / canvas.height, 1, 10000);
	renderingEngine.camera.projection.lookat(0, 0.5, 0, 0, 0.5, -1, 0, 1, 0);

	renderingEngine.pipeline = new Pipeline("simpleVertexShader", "simpleFragmentShader");
	renderingEngine.pipeline.addPass("mirrorVertexShader", "mirrorFragmentShader");

	var scriptingEngine = new ScriptingEngine(canvas);

	Simplicity.engines.push(renderingEngine);
	Simplicity.engines.push(scriptingEngine);

	Simplicity.entities.push(createGertrude());

	Simplicity.play();
}

