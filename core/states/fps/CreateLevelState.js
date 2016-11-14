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
		 
		 var directionalLight = new THREE.DirectionalLight(0x404040, 1);
		 directionalLight.castShadow = true;
		 directionalLight.shadowDarkness = 1;
		 directionalLight.position.x = 4;
		 directionalLight.position.y = 4;
		 directionalLight.position.z = 0;		 
		 game.scene.add(directionalLight);

         // Luz ambiental
		 var ambientLight = new THREE.AmbientLight(0x404040, 1.2);		 
		 ambientLight.position.x = 0;
		 ambientLight.position.y = 2;
		 ambientLight.position.z = 0;
		 game.scene.add(ambientLight);
			
		// game.renderer = new THREE.CanvasRenderer();
		 game.renderer = new THREE.WebGLRenderer();
		 game.renderer.setPixelRatio( window.devicePixelRatio );
		 game.renderer.setClearColor(0x033000);
		 game.renderer.setSize(window.innerWidth, window.innerHeight);
		 game.renderer.shadowMapEnabled = true;
		 game.renderer.shadowMapType = THREE.PCFSoftShadowMap;

		 
		 window.removeEventListener("resize",resizeFunction);
		 window.addEventListener("resize", resizeFunction);
		 		 
		 $("#webGl-salida").append(game.renderer.domElement);
	}

	function resizeFunction() {
		var WIDTH = window.innerWidth;
		var HEIGHT = window.innerHeight;
		game.renderer.setSize(WIDTH, HEIGHT);
		game.camera.three.aspect = WIDTH / HEIGHT;
		game.camera.three.updateProjectionMatrix();		
	}
	
	function setupWORLD() {
		
		var helper = new THREE.GridHelper( 40, 40 );
		game.scene.add(helper);
		
		// Camera
		game.camera = game.cameras[0];
		var cf = game.cameras[0].track.getCurrentFrame();

		game.camera.three.position.x = cf.position.x;
		game.camera.three.position.y = cf.position.y;
		game.camera.three.position.z = cf.position.z;
				
		var q = new THREE.Quaternion(cf.rotationQ._x,
									 cf.rotationQ._y,
									 cf.rotationQ._z,
									 cf.rotationQ._w);
		game.camera.three.setRotationFromQuaternion(q);
		
		
		// Assets
		for (var i=0;i<game.assets.length;i++){
			var asset = game.assets[i];
			var threeAsset = asset.three;

			game.scene.add(threeAsset.scene);
			threeAsset.scene.position.x = asset.position.x;
			threeAsset.scene.position.y = asset.position.y;
			threeAsset.scene.position.z = asset.position.z;
         			
			var q = new THREE.Quaternion(asset.rotationQ._x,
                                        asset.rotationQ._y,
                                        asset.rotationQ._z,
                                        asset.rotationQ._w);
			threeAsset.scene.setRotationFromQuaternion(q);        
		}
		
		// Go!
		game.StatesManager.changeState("fps/PlayState");
		
	}
	
	
	//function rotateObject(object,degreeX, degreeY, degreeZ)
	//{


	//	   degreeX = (degreeX * Math.PI)/180;
	//	   degreeY = (degreeY * Math.PI)/180;
	//	   degreeZ = (degreeZ * Math.PI)/180;

	//	   object.rotateX(degreeX);
	//	   object.rotateY(degreeY);
	//	   object.rotateZ(degreeZ);

	//	};


	
		
	
	function _toString() {
		return "CreateLevelState";
	};
	

	
	return {
		enter: _enter,
		toString: _toString,
		exit: _exit
	};
		
	
		
};
