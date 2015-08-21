
Spinner.prototype = Object.create(Script.prototype);
Spinner.prototype.constructor = Spinner;

function Spinner(entity)
{
	Script.call(this);

	this.entity = entity;
}

Spinner.prototype.execute = function()
{
	this.entity.transform.rotate(0.5, 0,1,0);
};
