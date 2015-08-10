
function createGertrude()
{
	var gertrude = new Entity();
	gertrude.transform.translate(0, 0.55, -4);

	var frontFace = ModelFactory.createSquare(0.5);
	frontFace.texture = loadImageTexture(gl, "images/gertrude-exterior-front.png");
	frontFace.transform.translate(0, 0, 1.1);
	gertrude.components.push(frontFace);

	var leftFace = ModelFactory.createRectangle(1, 0.5);
	leftFace.texture = loadImageTexture(gl, "images/gertrude-exterior-left.png");
	leftFace.transform.translate(0.6, 0, 0);
	leftFace.transform.rotate(90, 0, 1, 0);
	gertrude.components.push(leftFace);

	var backFace = ModelFactory.createSquare(0.5);
	backFace.texture = loadImageTexture(gl, "images/gertrude-exterior-back.png");
	backFace.transform.translate(0, 0, -1.1);
	backFace.transform.rotate(180, 0, 1, 0);
	gertrude.components.push(backFace);

	var rightFace = ModelFactory.createRectangle(1, 0.5);
	rightFace.texture = loadImageTexture(gl, "images/gertrude-exterior-right.png");
	rightFace.transform.translate(-0.6, 0, 0);
	rightFace.transform.rotate(270, 0, 1, 0);
	gertrude.components.push(rightFace);

	var spinner = new Spinner(gertrude);
	gertrude.components.push(spinner);

	var animator = new Animator(gertrude);
	gertrude.components.push(animator);

	return gertrude;
}

function showCampers()
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

