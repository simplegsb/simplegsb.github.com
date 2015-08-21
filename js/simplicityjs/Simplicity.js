
var Simplicity = new function()
{
	this.deltaTime = 0;
	this.engines = [];
	this.entities = [];
	this.playTime = 0;
	this.totalTime = 0;

	this.play = function()
	{
		this.playTime = performance.now();

		this.playContinuously();
	};

	this.playContinuously = function()
	{
		var frameStartTime = performance.now();

		for (var index = 0; index < Simplicity.engines.length; index++)
		{
			Simplicity.engines[index].advance();
		}

		this.deltaTime = performance.now() - frameStartTime;
		this.totalTime = performance.now() - this.playTime;

		Simplicity.requestId = window.requestAnimFrame(Simplicity.playContinuously);
	};
};
