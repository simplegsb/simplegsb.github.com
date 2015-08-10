
Spinner.prototype = new Script();
Spinner.prototype.constructor = Spinner;

function Spinner(entity)
{
	this.entity = entity;
}

Spinner.prototype.execute = function()
{
	this.entity.transform.rotate(0.5, 0,1,0);
}

