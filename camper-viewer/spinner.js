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
