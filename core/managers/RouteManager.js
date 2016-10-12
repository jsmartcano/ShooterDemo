/**
 * @class RouteManager Clase que se encarga de componer url y paths
 * @returns {RouteManager}
 */
function RouteManager() { 
	
	var root = "./";
	
	// core y subcarpetas
	var core = root + "core/";
	var states = core + "states/";
	
	// media y subcarpetas
	var media = root + "media/";
	var levels = media + "levels/";
	
		
	// ---------------------------------------------------------------------
	function _getRoot() {	return root; };
	
	// ---------------------------------------------------------------------
	function _getCore() { return core; 	};
	function _getStates() { return states; 	};
	
	// ---------------------------------------------------------------------
	function _getMedia() { return media; };
	function _getLevels() { return levels; }
	
	return {
		getRoot: _getRoot,
		
		getCore: _getCore,
		getStates: _getStates,
		
		getMedia: _getMedia,
		getLevels: _getLevels
	};
			
}