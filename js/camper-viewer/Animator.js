
Animator.prototype = Object.create(Script.prototype);
Animator.prototype.constructor = Animator;

function Animator(entity, pipeline, direction)
{
	Script.call(this);

	this.entity = entity;
	this.direction = direction;
	this.pipeline = pipeline;
	this.position = 0.01;
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

	for (var index = 0; index < this.entity.components.length; index++)
	{
		var component = this.entity.components[index];

		if (component instanceof Model)
		{
			component.transform.rotate(this.startRotation, 1, 0, 0);
		}
	}
}

Animator.prototype.execute = function ()
{
	if (g_loadingImages.length === 0)
	{
		$('#loading').hide();

		var speed = Math.min(this.position, 1 - this.position) / 10;
		var delta = speed * Simplicity.deltaTime;

		this.position += delta;
		if (this.position + 0.01 > 1)
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

			if (component instanceof Model)
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
	}

	if (this.position === 1)
	{
		this.entity.components.splice(this.entity.components.indexOf(this), 1);
	}
};
