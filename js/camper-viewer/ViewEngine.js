
function ViewEngine(pipeline, cameraSpringer)
{
	this.cameraSpringer = cameraSpringer;
	this.newView = null;
	this.oldView = null;
	this.pipeline = pipeline;
	this.switching = false;
}

ViewEngine.prototype.advance = function()
{
	if (!this.newView.cameraOffset.equals(this.cameraSpringer.offset))
	{
		var fullMovement = new J3DIVector3();
		fullMovement.copyValues(this.newView.cameraOffset);
		fullMovement.subtract(this.oldView.cameraOffset);

		var toNewOffset = new J3DIVector3();
		toNewOffset.copyValues(this.newView.cameraOffset);
		toNewOffset.subtract(this.cameraSpringer.offset);

		var fractionComplete = new J3DIVector3();
		fractionComplete.copyValues(toNewOffset);
		fractionComplete.divide(fullMovement);
		var percentComplete = fractionComplete.vectorLength();
		if (isNaN(percentComplete))
		{
			percentComplete = 0.0001;
		}

		var distanceToNewOffset = toNewOffset.vectorLength();
		var distanceDelta = Math.min(percentComplete, 1 - percentComplete) * distanceToNewOffset * Simplicity.deltaTime * 5;

		if (distanceToNewOffset < distanceDelta)
		{
			this.cameraSpringer.offset.copyValues(this.newView.cameraOffset);
		}
		else
		{
			var delta = new J3DIVector3(toNewOffset);
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

		if (this.oldView !== null)
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
	if (this.oldView !== null)
	{
		Simplicity.entities.splice(Simplicity.entities.indexOf(this.oldView.entity), 1);
	}

	Simplicity.entities.push(this.newView.entity);
};

ViewEngine.prototype.switchTo = function(view)
{
	if (!this.switching)
	{
		this.newView = view;
	}
};
