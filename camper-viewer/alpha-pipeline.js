AlphaPipeline.prototype = Object.create(sim.Pipeline.prototype);
AlphaPipeline.prototype.constructor = AlphaPipeline;

function AlphaPipeline(vertexShader, fragmentShader)
{
	sim.Pipeline.call(this, vertexShader, fragmentShader);

	this.alpha = 1;
}

AlphaPipeline.prototype.applyPass = function(pass)
{
	sim.Pipeline.prototype.applyPass.call(this, pass);

	gl.uniform1f(gl.getUniformLocation(this.programs[pass], "alpha"), this.alpha);
};

module.exports = AlphaPipeline;
