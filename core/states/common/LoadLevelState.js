/**
 * @class Estado inicial ejecutado antes de cargar los parametros 
 *
*/
function LoadLevelState() {
	
    var levelType = null;       // Tipo de nivel a cargar    
    
    var loaderInterval;
    var totalAssets = 0;        // Cuenta el n�mero de assets que se han mandado cargar
    var totalCameras = 0;       // Cuenta el n�mero de c�maras que se han mandado cargar

	/**
	 * Salida del estado
	 */
	function _exit() {
		game.DebugManager.say(_toString() + ": exit");
	};
	
			
	function _enter() {
		game.DebugManager.say(_toString() + " enter");
		loadLevel();
	};
	
	function loadLevel() {
		var levelFile = game.RouteManager.getLevels() + "level" + game.getCurrentLevel() + "/output.xml";
		game.DebugManager.say("Loading level ... " + levelFile);
		loadContent(levelFile);

		
	}

	function loadContentComplete() {
	    game.DebugManager.say("Load level complete");

	    switch (levelType) {
	        case "FPS":
	            game.StatesManager.changeState("fps/CreateLevelState");
	            break;
	        case "TABLE":
	            game.StatesManager.changeState("table/CreateLevelState");
	            break;
	        default:
	            game.DebugManager.say("Type level incorrect");
	    }
		
	}
	
	function loadContent(file) {
		$.ajax({
			url: file,
			async: false,
			dataType: (BrowserDetect.browser == "EXPLORER") ? 'text' : 'xml', // Reconocemos el browser.
			success: function(pData){ 
			  
				var data = game.Utils.parseXML(pData);
				parse(data);

			}
		});

		loaderInterval = setInterval(function () {
		    var result = false;

		    if (
                game.assets.length == totalAssets &&
                game.cameras.length == totalCameras
            ) { result = true; }


		    if (result == true) {
		        clearInterval(loaderInterval);
		        loadContentComplete();
		    } else {
		        game.DebugManager.say("Loading assets...");
		    }
		}, 100);
	}
	
    // -----------------------------------------------------------------------
	function parse(data) {
		
		
        // Assets		
		$(data).find("element").each(function(index) {
			var type = $(this).attr("type");
			

			switch (type)
			{
			    case "PLANE":             
			        createLevelAsset($(this));
			        totalAssets++;
					break;
			    case "PLAYER":
			    case "CARCASA":
			        createAsset($(this));
			        totalAssets++;
					break;
				case "CCAMERA":					
				    createCamera($(this));
				    totalCameras++;
					break;
			}
		});
		
        // Type
		$(data).find("levelType").each(function (index) {
		    levelType = $(this).text().toUpperCase();
		 });
		
		
	}

    // -----------------------------------------------------------------------
	function createCamera(element) {

	    var asset = new AssetClass();
	    asset.type = $(this).attr("type");
	    asset.index = parseInt($(this).attr("index"), 10);
        	    
	    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	    asset.three = camera;
	    asset.track = new TrackClass();
	            
	    element.find("frame").each(function (index) {

	        var f = new FrameClass();

            

	        f.position = new THREE.Vector3(parseFloat($(this).children("x").text()),
	                                         parseFloat($(this).children("z").text()),
	                                         -parseFloat($(this).children("y").text()));

	        f.rotationQ = new THREE.Quaternion(parseFloat($(this).children("rx").text()),
	                                             parseFloat($(this).children("rz").text()),
	                                             -parseFloat($(this).children("ry").text()),
	                                             parseFloat($(this).children("rw").text()));

	        f.index = parseInt($(this).attr("index"), 10);
	        asset.track.frames.push(f);

	    });

	   

	    game.cameras.push(asset);
	};

    // -----------------------------------------------------------------------
	function createLevelAsset(element) {

	    var levelPath = game.RouteManager.getLevels() + "level" + game.getCurrentLevel();
	    var modelsPath = game.RouteManager.getModels();
	    var mesh = element.children("mesh").text();
	    var asset = new AssetClass();
	    var loader = new THREE.ColladaLoader();

	    asset.position = new THREE.Vector3(parseFloat(element.children("x").text()),
                                         parseFloat(element.children("z").text()),
                                         -parseFloat(element.children("y").text()));

	    asset.rotationQ = new THREE.Quaternion(parseFloat(element.children("rx").text()),
                                             parseFloat(element.children("rz").text()),
                                             -parseFloat(element.children("ry").text()),
                                             parseFloat(element.children("rw").text()));

	    asset.type = element.attr("type");
	    asset.index = parseInt(element.attr("index"), 10);

	    loader.options.convertUpAxis = true;
	 
	    loader.load(levelPath + "/" + mesh.toLowerCase() + ".dae", function (result) {
	        result.castShadow = true;
	        result.receiveShadow = true;
	        asset.three = result;
	        asset.mesh = mesh;
	        game.assets.push(asset);

	    });
	};

    // -----------------------------------------------------------------------
	function createAsset(element) {

	    var levelPath = game.RouteManager.getLevels() + "level" + game.getCurrentLevel();
	    var modelsPath = game.RouteManager.getModels();
	    var mesh = element.children("mesh").text();
	    var asset = new AssetClass();
	    var loader = new THREE.ColladaLoader();

	    asset.position = new THREE.Vector3(parseFloat(element.children("x").text()),
                                         parseFloat(element.children("z").text()),
                                         -parseFloat(element.children("y").text()));

	    asset.rotationQ = new THREE.Quaternion(parseFloat(element.children("rx").text()),
                                             parseFloat(element.children("rz").text()),
                                             -parseFloat(element.children("ry").text()),
                                             parseFloat(element.children("rw").text()));

	    asset.type = element.attr("type");
	    asset.index = parseInt(element.attr("index"), 10);

	    loader.options.convertUpAxis = true;

	    loader.load(modelsPath + asset.type + "/" + mesh.toLowerCase() + ".dae", function (result) {
	        result.castShadow = true;
	        result.receiveShadow = true
	        asset.three = result;
	        asset.mesh = mesh;
	        game.assets.push(asset);
	    });

	 
	};

	
    // -----------------------------------------------------------------------
	function _toString() {
		return "LoadLevelState";
	};
	
	
    // -----------------------------------------------------------------------
	return {
		enter: _enter,
		toString: _toString,
		exit: _exit
	};
		
	
		
};

