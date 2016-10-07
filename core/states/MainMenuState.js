/**
 * @class Menú principal de juego
 *
*/
function MainMenuState() {
			
	var self = this;
	
	/**
	 * Salida del estado
	 */
	this.exit = function() {
		game.DebugManager.say(this.constructor.name + " exit");
	};
	
			
	this.enter = function() {
		game.DebugManager.say(this.constructor.name + " enter");	
				
		
		game._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		game._renderer = new THREE.CanvasRenderer;
		game._scene = new THREE.Scene();
	
			
						
			game._renderer.setClearColor(0x033000);
			game._renderer.setSize( window.innerWidth, window.innerHeight );
			$("#webGl-salida").append(game._renderer.domElement);
		
			var axes = new THREE.AxisHelper(1);
			game._scene.add(axes);		
				
			game._camera.position.x = 1;
			game._camera.position.y = 2;
			game._camera.position.z = 3;
			game._camera.lookAt(new THREE.Vector3(0,0,0));
						
			var ambientLight = new THREE.AmbientLight(0x111111);
		    game._scene.add(ambientLight);
		
			this.render();
	};
	
	this.render = function() {
		requestAnimationFrame( self.render );
		game._renderer.render( game._scene, game._camera );
	};
	
	this.toString = function() {
		return this.constructor.name;
	};
	
		
};
