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
		 
		 var ambientLight = new THREE.AmbientLight(0x404040);
		 ambientLight.position.x = 0;
		 ambientLight.position.y = 50;
		 ambientLight.position.z = 0;
		 game.scene.add(ambientLight);
			
		 //game.renderer = new THREE.WebGLRenderer();
		 game.renderer = new THREE.WebGLRenderer();
		 game.renderer.setPixelRatio( window.devicePixelRatio );
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
		
		var helper = new THREE.GridHelper( 40, 40 );
		game.scene.add(helper);
		
		// Camera
		game.camera = game.cameras[0].three;
		game.camera.position.x = game.cameras[0].x;
		game.camera.position.y = game.cameras[0].y;
		game.camera.position.z = game.cameras[0].z;
		
		game.camera.rotateX(game.cameras[0].rx);
		game.camera.rotateY(game.cameras[0].ry);
		game.camera.rotateZ(game.cameras[0].rz);
		
		var q = new THREE.Quaternion(game.cameras[0].rx,
									 game.cameras[0].ry,
									 game.cameras[0].rz,
									 game.cameras[0].rw);	
		game.camera.setRotationFromQuaternion(q);
		
		// Assets
		for (var i=0;i<game.assets.length;i++){
			var asset = game.assets[i];
			var threeAsset = asset.three;

			game.scene.add(threeAsset.scene);
			threeAsset.scene.position.x = asset.x;
			threeAsset.scene.position.y = asset.y;
			threeAsset.scene.position.z = asset.z;

			
			var q = new THREE.Quaternion(asset.rx,asset.ry,asset.rz,asset.rw);
			threeAsset.scene.setRotationFromQuaternion(q);
		}

		// Go!
		game.StatesManager.changeState("PlayState");
		
	}
	
	
	function rotateObject(object,degreeX=0, degreeY=0, degreeZ=0)
	{

		   degreeX = (degreeX * Math.PI)/180;
		   degreeY = (degreeY * Math.PI)/180;
		   degreeZ = (degreeZ * Math.PI)/180;

		   object.rotateX(degreeX);
		   object.rotateY(degreeY);
		   object.rotateZ(degreeZ);

		};


	
		
	
	function _toString() {
		return "CreateLevelState";
	};
	
	
	
	return {
		enter: _enter,
		toString: _toString,
		exit: _exit
	};
		
	
		
};

