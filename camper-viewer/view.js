function View()
{
	this.cameraOffset = new sim.Vector3();
	this.entity = undefined;
	this.name = undefined;
}

View.prototype.equals = function(other)
{
	return this.name == other.name;
};

module.exports = View;
