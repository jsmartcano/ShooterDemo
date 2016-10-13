/**
 * @class 
 *
*/
function CreateLevelState() {
	
	/**
	 * Salida del estado
	 */
	function _exit() {
		game.DebugManager.say(_toString() + ": exit");
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
		
		 var axes = new THREE.AxisHelper(100);
		 game.scene.add(axes);		
		 
		 var ambientLight = new THREE.AmbientLight(0x111111);
		 ambientLight.position.y = 100;
		 game.scene.add(ambientLight);
			
		 game.renderer = new THREE.WebGLRenderer();
		 game.renderer.setClearColor(0x033000);
		 game.renderer.setSize(window.innerWidth, window.innerHeight);
		 		 
		 $("#webGl-salida").append(game.renderer.domElement);
	}

	
	function setupWORLD() {
		
		// Camera
		var camera = game.cameras[0];
		game.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		game.camera.position.x = camera.x;
		game.camera.position.y = camera.y;
		game.camera.position.z = camera.z;
		var q = new THREE.Quaternion(camera.x,camera.y,camera.z,camera.w);
		game.camera.lookAt(0,0,0);
		//game.camera.setRotationFromQuaternion(q);
		
		
		// Assets
		for (var i=0;i<game.assets.length;i++){
			var asset = game.assets[i];
			var threeAsset = asset.three;
			
			threeAsset.scene.x = asset.x;
			threeAsset.scene.y = asset.y;
			threeAsset.scene.z = asset.z;
			
			var q = new THREE.Quaternion(asset.x,asset.y,asset.z,asset.w);
			//threeAsset.scene.setRotationFromQuaternion(q);
			game.scene.add(threeAsset.scene);
		}
		
		
		
		
		// Go!
		game.StatesManager.changeState("PlayState");
		
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

