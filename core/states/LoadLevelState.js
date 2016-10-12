/**
 * @class Estado inicial ejecutado antes de cargar los parametros 
 *
*/
function LoadLevelState() {
	
	/**
	 * Salida del estado
	 */
	function _exit() {
		game.DebugManager.say(toString() + ": exit");
	};
	
			
	function _enter() {
		game.DebugManager.say(_toString() + " enter");
		loadLevel();
	};
	
	function loadLevel() {
		var levelFile = game.RouteManager.getLevels() + "level" + game.getCurrentLevel() + "/output.xml";
		game.DebugManager.say("Loading level ... " + levelFile);
		loadContent(levelFile, loadContentComplete);
	}
	
	function loadContentComplete() {
		game.DebugManager.say("Load level complete");
		game.StatesManager.changeState("CreateLevelState");
	}
	
	function loadContent(file,callback) {
		$.ajax({
			url: file,
			async: false,
			dataType: (BrowserDetect.browser == "EXPLORER") ? 'text' : 'xml', // Reconocemos el browser.
				    success: function(pData){ 
				    	var data = game.Utils.parseXML(pData);
				    	parse(data);
				    	callback();
				    }
		});
	}
	
	function parse(data) {
		var levelPath = game.RouteManager.getLevels() + "level" + game.getCurrentLevel();
		$(data).find("element").each(function(index) {
			var type = $(this).attr("type");
			var index = parseInt($(this).attr("index"),10);
			var mesh = $(this).children("mesh").text();
			var x = parseFloat($(this).children("x").text());
			var y = parseFloat($(this).children("y").text());
			var z = parseFloat($(this).children("z").text());
			var rx = parseFloat($(this).children("rx").text());
			var ry = parseFloat($(this).children("ry").text());
			var rz = parseFloat($(this).children("rz").text());
			var rw = parseFloat($(this).children("rw").text());
			switch (type)
			{
				case "PLANE":
					var loader = new THREE.ColladaLoader();
					loader.load(levelPath + "/" + mesh + ".dae", function(result) {
						//game.scene.add(result.scene);
						var asset = new AssetClass();
						asset.three = result;
						asset.x = x; asset.y = y; asset.z = z;
						asset.rx = rx; asset.ry = ry; asset.rz = rz; asset.rw = rw;
						asset.type = type;
						asset.index = index;
						asset.mesh = mesh;
						game.assets.push(asset);
					});
					break;
				case "CAMERA":
					
					var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
					var asset = new AssetClass();
					asset.three = camera;
					asset.x = x; asset.y = y; asset.z = z;
					asset.rx = rx; asset.ry = ry; asset.rz = rz; asset.rw = rw;
					asset.type = type;
					asset.index = index;
					game.cameras.push(asset);
					break;
			}
			
			
			
			
		});
	}		

	
	function _toString() {
		return "LoadLevelState";
	};
	
	
	
	return {
		enter: _enter,
		toString: _toString,
		exit: _exit
	};
		
	
		
};

