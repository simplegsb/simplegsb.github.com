
var Simplicity = new function()
{
	this.deltaTime = 0;
	this.engines = [];
	this.entities = [];
	this.frameStartTime = undefined;

	this.play = function()
	{
		this.playContinuously();
	};

	this.playContinuously = function(now)
	{
		if (Simplicity.frameStartTime !== undefined)
		{
			Simplicity.deltaTime = now - Simplicity.frameStartTime;
		}

		Simplicity.frameStartTime = now;

		for (var index = 0; index < Simplicity.engines.length; index++)
		{
			Simplicity.engines[index].advance();
		}

		Simplicity.requestId = window.requestAnimationFrame(Simplicity.playContinuously);
	};
};
