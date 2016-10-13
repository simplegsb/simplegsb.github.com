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
