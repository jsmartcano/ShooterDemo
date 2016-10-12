/**
 * @class 
 *
*/
function PlayState() {
	
	/**
	 * Salida del estado
	 */
	function _exit() {
		game.DebugManager.say(toString() + ": exit");
	};
	
			
	function _enter() {
		game.DebugManager.say(_toString() + " enter");
	};
	
		
//requestAnimationFrame(animate);
//	function animate() {
//		requestAnimationFrame(animate);
//		game.renderer.render(game.scene,game.camera);
//		
//	
//	}	
	
	function _toString() {
		return "PlayState";
	};
	
	
	
	return {
		enter: _enter,
		toString: _toString,
		exit: _exit
	};
		
	
		
};
