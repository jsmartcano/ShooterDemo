/**
 * @class 
 *
*/
function CreateLevelState() {
	
	/**
	 * Salida del estado
	 */
	function _exit() {
		game.DebugManager.say(toString() + ": exit");
	};
	
			
	function _enter() {
		game.DebugManager.say(_toString() + " enter");
		createLevel();
	};
	
	function createLevel() {
		game.DebugManager.say("Creating Level...");
		setupTHREE();
		setupWORLD();
	};
	
	function setupTHREE() {
		 game.scene = new THREE.Scene();
		
		 var axes = new THREE.AxisHelper(1);
		 game.scene.add(axes);		
		 
		 var ambientLight = new THREE.AmbientLight(0x111111);
		 ambientLight.position.y = 100;
		 game.scene.add(ambientLight);
			
		 game.renderer = new THREE.WebGLRenderer();
		 game.renderer.setClearColor(0x033000);
		 game.renderer.setSize(window.innerWidth, window.innerHeight);
		 		 
		 $("#webGl-salida").append(game.renderer.domElement);
		
		 //requestAnimationFrame(animate);
		
	}
	
//	function animate() {
//		requestAnimationFrame(animate);
//		game.renderer.render(game.scene,game.camera);
//		
//	
//	}
	
	
	function setupWORLD() {
		
	}
	
	
	function _toString() {
		return "CreateLevelState";
	};
	
	
	
	return {
		enter: _enter,
		toString: _toString,
		exit: _exit
	};
		
	
		
};

