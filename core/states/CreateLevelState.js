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
		 ambientLight.position.x = 0;
		 ambientLight.position.y = 0;
		 ambientLight.position.z = 10;
		 game.scene.add(ambientLight);
			
		 game.renderer = new THREE.WebGLRenderer();
		 game.renderer.setClearColor(0x033000);
		 game.renderer.setSize(window.innerWidth, window.innerHeight);
		 
		 window.removeEventListener("resize",resizeFunction);
		 window.addEventListener("resize", resizeFunction);
		 		 
		 $("#webGl-salida").append(game.renderer.domElement);
	}

	function resizeFunction() {
		var WIDTH = window.innerWidth;
		var HEIGHT = window.innerHeight;
		game.renderer.setSize(WIDTH, HEIGHT);
		game.camera.aspect = WIDTH / HEIGHT;
		game.camera.updateProjectionMatrix();		
	}
	
	function setupWORLD() {
		
		var size = 10;
		var step = 1;

		var gridHelper = new THREE.GridHelper( size, step );
		game.scene.add( gridHelper );
		
		// Camera
		var camera = game.cameras[0];
		game.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		game.camera.position.x = camera.x;
		game.camera.position.y = camera.y;
		game.camera.position.z = camera.z;
				
		//game.camera.lookAt(new THREE.Vector3(0,0,0));
		
		var q = new THREE.Quaternion(camera.x,camera.y,camera.z,camera.w);		
		//game.camera.setRotationFromQuaternion(q);
		
		
		// Assets
		for (var i=0;i<game.assets.length;i++){
			var asset = game.assets[i];
			var threeAsset = asset.three;
					
			game.scene.add(threeAsset.scene);
			
			threeAsset.scene.position.x = asset.x;
			threeAsset.scene.position.y = asset.y;
			threeAsset.scene.position.z = asset.z;
			
			threeAsset.scene.rotateX(Math.PI/360);
		
			threeAsset.scene.scale.set(1,1,1);
			
			var q = new THREE.Quaternion(asset.x,asset.y,asset.z,asset.w);
			//threeAsset.scene.setRotationFromQuaternion(q);
			
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

