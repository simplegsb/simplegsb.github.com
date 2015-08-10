
function ScriptingEngine()
{
}

ScriptingEngine.prototype.advance = function()
{
	for (var entityIndex = 0; entityIndex < Simplicity.entities.length; entityIndex++)
	{
		var entity = Simplicity.entities[entityIndex];
		var components = entity.components;

		for (var componentIndex = 0; componentIndex < components.length; componentIndex++)
		{
			if (components[componentIndex] instanceof Script)
			{
				components[componentIndex].execute();
			}
		}
	}
}

