/**
 * @class RouteManager Clase que se encarga de componer url y paths
 * @returns {RouteManager}
 */
function RouteManager() { 
	
	var coreFolder = "core/";
	var statesFolder = "states/";

	
		
	// ---------------------------------------------------------------------
	this.getRootPath = function() {
		return "./";
	};
	
	this.getCorePath = function() {
		return this.getRootPath() + coreFolder;
	};
			
	this.getStatesPath = function() {
		return this.getCorePath() + statesFolder;
	};
			
}