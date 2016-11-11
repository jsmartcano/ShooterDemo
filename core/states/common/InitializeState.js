/**
 * @class Estado inicial ejecutado antes de cargar los parametros 
 *
*/
function InitializeState() {
	
	
	/**
	 * Salida del estado
	 */
	function _exit() {
		game.DebugManager.say(_toString() + ": exit");
	};
	
			
	function _enter() {
		game.DebugManager.say(_toString() + " enter");
		game.StatesManager.changeState("common/LoadLevelState");
	};
		
	function _toString() {
		return "InitializeState";
	};
	
	
	return {
		enter: _enter,
		toString: _toString,
		exit: _exit
	};
		
};

