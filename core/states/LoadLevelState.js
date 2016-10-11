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
	};
	
//	function loadContentXml(callback) {
//		var path = "media/levels/level1/output.xml";
//		$.ajax({
//			url: path,
//			async: false,
//			dataType: (BrowserDetect.browser == "EXPLORER") ? 'text' : 'xml', // Reconocemos el browser.
//				    success: function(pData){ 
//						var data = parseXML(pData);
//						$(data).find("vertex").each(function(index) {
//							var index = parseInt($(this).attr("number"),10);
//							var type = $(this).attr("type");
//							var x = parseFloat($(this).children("x").text(),10);
//							var y = parseFloat($(this).children("y").text(),10);
//							var z = parseFloat($(this).children("z").text(),10);
//							
//							var box = new BoxClass(index,type,x,y,z);
//							game._board._boxes[index] = box;
//						});
//						callback();
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
//		loadContentXmlOk = function() {
//			game.StatesManager.changeState("LoadMeshState");
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
		

	
	function _toString() {
		return "LoadLevelState";
	};
	
	
	
	return {
		enter: _enter,
		toString: _toString,
		exit: _exit
	};
		
	
		
};

