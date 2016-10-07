

/**
 * Inicio del programa
 */

// Sistema principal. Espacio de nombres principal de la app
var game = {};


$(document).ready(function() {  
		
	game._scene = null;
	game._renderer = null;
	game._camera = null;
	game._board = new BoardClass();  // Tablero del juego
	
	// Inicializa subsistemas 
	game.DebugManager =  new DebugManager();
	game.StatesManager = new StatesManager();

			
	// Start!!
	game.StatesManager.start("InitializeState");
	
	
});


//CANVAS=1;
//WEBGL=2;
//
//var game=null;	// Namespace completo
//
///**
// * Representa el espacio de nombres del juego
// * @returns {objectClass}
// */
//function gameClass() {
//	
//	var self = this;		// Persistencia this
//	
//	this._scene = null;			// Escena 3d
//	this._renderer = null;		// renderizador
//	this._camera = null;		// c�mara
//	
//	this._vertex = new Array();	// Array de v�rtices
//	
//	this._vertexes = new Array();	// Array de v�rtices de la escena
//	this._objects = new Array();	// Array objetos de juego
//	this._baseNode = null;			// base de la escena
//	
//	/**
//	 * Creador de renderizador
//	 */
//	this.createRender = function(type) {
//		if (type==CANVAS) {
//			this._renderer = new THREE.CanvasRenderer;
//		} else if (type==WEBGL) {
//			this._renderer = new THREE.WebGLRenderer;
//		}
//	};
//	
//	/**
//	 * Creaci�n de escena
//	 */
//	this.createScene = function() {
//		this._scene = new THREE.Scene();
//		this._baseNode = new THREE.Object3D();
//		this._scene.add(this._baseNode);
//	};
//	
//	/**
//	 * renderizar
//	 */
//	this.render = function() {
//		this._renderer.render(this._scene,this._camera);
//	};
//	
//	/**
//	 * Parser de los v�rtices de la escena
//	 */
//	this.loadXmlScene = function() {
//		var self=this;
//		var path = "game/output.xml";
//		$.ajax({
//			url: path,
//			async: false,
//			dataType: (BrowserDetect.browser == "EXPLORER") ? 'text' : 'xml', // Reconocemos el browser.
//				    success: function(pData){ 
//						var data = self.parseXML(pData);
//						$(data).find("vertex").each(function(index) {
//							var index = parseInt($(this).attr("number"),10);
//							var type = $(this).attr("type");
//							var x = parseFloat($(this).children("x").text(),10);
//							var y = parseFloat($(this).children("x").text(),10);
//							var z = parseFloat($(this).children("x").text(),10);
//							
//							var vertex = new vertexClass(index,type,x,y,z);
//							self._vertexes[index] = vertex;
//						});
//						self.loadMesh();
//											
//				    },
//				  	error: function() {
//				  								
//				    }
//				    
//				    
//				  });
//		};
//		
//		/**
//		 * Serializar ajax
//		 */
//		this.parseXML = function(data) {
//			var result=null;
//			//Player.DebugManager.say("In parsearXML(data) --> "+typeof data);
//			var tipo = typeof data;
//			if(tipo == "string"){
//				if (typeof window.DOMParser != "undefined") 
//				{
//				    var parser = new DOMParser();
//				    result = parser.parseFromString(data, "text/xml");
//				} 
//				else if (typeof window.ActiveXObject != "undefined") 
//				{ 
//					result = new ActiveXObject('Microsoft.XMLDOM');      
//					result.async = false;      
//					result.loadXML(data);
//				}			
//			} else if (tipo == "object"){       
//				result = data;    
//			}
//			return result;
//		};
//		
//		
//		/**
//		 * Carga de los modelos
//		 */
//		this.loadMesh = function() {
//			this.loadMesh("cellCenter","models/cellCenter/");
//		};
//		
//		this.loadMesh = function(model,path) {
//			var loader = new THREE.JSONLoader();
//			loader.load(path + model, this.modelLoadedCallback, function(geometry,materials){
//		
//				var material;
//				var textureLoader = new THREE.TextureLoader();
//				var texture = textureLoader.load(path + model +".png", function(texture) {
//					material = new THREE.MeshBasicMaterial({map:texture, overdraw: true});
//					var object = new THREE.Mesh( geometry, material );
//					this._baseNode.add( object );
//					self._scene.add(this._baseNode);
//
//				});
//				
//			});
//		};
//		   
//					
//
//		
//	
// 
//}
//
//	
//	
///**
// * Representa un v�rtice en el espacio 3d
// * @param index
// * @param type
// * @param x
// * @param y
// * @param z
// * @returns {vertexClass}
// */

//
//
//
///**
// * Game object
// * @returns {gameObject}
// */
//function gameObject() {
//	this._object=null;
//	this._loaded=false;
//}
//
//$(document).ready(function() {
//	
game._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
game._renderer = new THREE.CanvasRenderer;
game._scene = new THREE.Scene();
game._renderer.render(game._scene,game._camera);
//	game = new gameClass(); 
//	game.createScene();
//	game._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//	game.createRender(CANVAS);
//				
//	game._renderer.setClearColor(0x033000);
//	game._renderer.setSize( window.innerWidth, window.innerHeight );
//	$("#webGl-salida").append(game._renderer.domElement);
//
//	var axes = new THREE.AxisHelper(1);
//	game._scene.add(axes);		
//		
//	game._camera.position.x = 1;
//	game._camera.position.y = 2;
//	game._camera.position.z = 3;
//	game._camera.lookAt(new THREE.Vector3(0,0,0));
//				
//	var ambientLight = new THREE.AmbientLight(0x111111);
//    game._scene.add(ambientLight);
//    
//    game.loadXmlScene();    
//    
//   
//    
//		
////		pointLight = new THREE.PointLight( 0, 5, 3 );
////		pointLight.position.set( 5, 0, 0 );
////		scene.add( pointLight );
////		
////		//Manager from ThreeJs to track a loader and its status
////	   // var manager = new THREE.LoadingManager();
////	    //Loader for Obj from Three.js
////		var loader = new THREE.JSONLoader();
////		 loader.load('models/cellCenter/cellCenter.json', modelLoadedCallback);
////		//loader.load('models/mono.json', modelLoadedCallback);
////
////		
////
////		function modelLoadedCallback(geometry,materials ) {
////			var material;
////			var textureLoader = new THREE.TextureLoader();
////			var texture = textureLoader.load("models/cellCenter/cellCenter.png", function(texture) {
////				material = new THREE.MeshBasicMaterial({map:texture, overdraw: true});
////				var object = new THREE.Mesh( geometry, material );
////				
////				
////				object.position.set(0,0,0);
////				scene.add( object );
////				init();
////			});
////				
////			
//////			var object = new THREE.Mesh( geometry, materials );
//////			
//////			
//////			object.position.set(0,3,2);
//////			scene.add( object );
//////			init();
////		
////			 
////		 }
////			
////		//			var texloader = new THREE.TextureLoader();
//////			image = texloader.load("models/trivial.png");
//////			material = new THREE.MeshBasicMaterial({map:image});
//////			model = new THREE.Mesh(geometry,material)
//////			var material = new THREE.MultiMaterial( materials );
//////			var object = new THREE.Mesh( geometry, material );
//////			
//////			obj.scale.set(10,10,10);
//////			obj.position.set(0,0,-7.0);
////			
//			
//		
//
//
//	});