/**
 * 
 */



function GameClass()
{
    var level = 1;
	
	var _cameras = new Array();
	var _assets = new Array();
	
	var _scene = null;
	var _camera = null;
	var _renderer = null;
	
	function _getCurrentLevel() {
		return level;
	}
	
	
	return {
		getCurrentLevel: _getCurrentLevel,
		scene: _scene,
		camera: _camera,
		renderer: _renderer,
		assets: _assets,
		cameras: _cameras
	};
	
}