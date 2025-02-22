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
