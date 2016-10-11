/**
 * 
 */
function GameClass()
{
	var level = 1;
	
	function _getCurrentLevel() {
		return level;
	}
	
	return {
		getCurrentLevel: _getCurrentLevel()
	};
}