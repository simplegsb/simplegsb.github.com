
function View()
{
	this.cameraOffset = new J3DIVector3();
	this.entity = null;
	this.name = null;
}

View.prototype.equals = function(other)
{
	return this.name == other.name;
};
