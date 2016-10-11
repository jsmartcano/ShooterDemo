/**
 * @class StatesManager Gestión de estados
 * @returns {StatesManager}
 */
function StatesManager() {  
	
			
		var states = new Array();	// Contiene todos los estados del player
		var stack = new StackClass();	// Pila con los estados en uso
		var debug = game.DebugManager.say;
		var name = "StatesManager";
		
		/**
		 * Se ejecuta al principio de la ejecución. Pone en marcha la máquina de estados
		 */
		function _start(state) {	
			debug(name + " start " + state);
			// transicion al estado incial
			_changeState( state );
		};
		
		function _currentState() {
			return stack.top();
		};
			
		/**
		 * Cambiar a otro estado
		 */
		function _changeState(state)	{	 
			
				// Limpieza del estado actual.
				if (!stack.empty())
				{
					// exit() sobre el iltimo estado.
					stack.top().exit();
					// Elimina el ultimo estado.
					stack.pop();
				}
				getState(state,changeStateCallBack);
		};
		
		/**
		 * Retrollamada de chageState 
		 */
		function changeStateCallBack(state) {
			
				if (stack.numberOfItems()>0) {
					stack.pop();
				}
				
				// Transicion al nuevo estado. 
				stack.push(state);
				stack.toDebugItems();
				// enter() sobre el nuevo estado.
				stack.top().enter();				
		};
			
		/**
		 * Poner en la pila el estado actual
		 */
		function _pushState(state) {	
				// Pausa del estado actual.
				if (!stack.empty())
					stack.top().pause();

				getState(state,pushStateCallBack);
		};
		
		/**
		 * Retrollamada de pushState
		 */
		function pushStateCallBack(state) {
				// Transicion al nuevo estado.
				stack.push(state);
				stack.toDebugItems();
				// enter sobre el nuevo estado.
				stack.top().enter();			
		};
		
		/**
		 * Quitar de la pila el estado actual y poner en la cima el anterior guardado
		 * @param state
		 */
		function _popState(state){ 
				if (!stack.empty())
				{
					stack.top().exit();
					stack.pop();
					stack.toDebugItems();
				}
							
				if (!stack.empty()) {
					stack.top().resume();
				}
		};
		
		/**
		 * Obtiene un estado que llega como parámetro
		 * Si no está cargado, lo carga e inserta en el array
		 * de states, para saber que el estado ya existe
		 */
		function getState(state,callback) {	
			
			var fileState = game.Utils.getFile(state);
			
			for (var i=0;i<states.length;i++) {
				if (states[i]==fileState) {
					callback(states[i]);
					return;
				}
			}
			
			game.Utils.loadStateScript(state);
			var timer = setInterval(function() {
					
					//debug("loading state... " + state );
				
					if (typeof eval("window."+fileState) == "function") {
						debug(state + " loaded");
						clearInterval(timer);
						var tmpState = eval("new "+fileState+"()");
						states.push(tmpState);
						callback(tmpState);
					}

			},50);

		};
		
		
		return {
			start: _start,
			changeState: _changeState,
			currentState: _currentState,
			popState: _popState,
			pushState: _pushState
		};
		
		
		
	
			
 };

		
		