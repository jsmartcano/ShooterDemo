/**
 * @class Clase que contiene métodos para depurar. Crea un popup en un navegador e imprime los sucesos en tiempo de ejecución
 */
function DebugManager() {

	var debugLevel = null;
//	
//	var timer = setInterval(function() {
//		try {
//			var settings = Player.SettingsManager,
//				utils = Player.Utils;
//			
//			var value = settings.getSetting("DEBUG").getValue();
//			if (utils.isNumeric(value)) {
//				clearInterval(timer);
//				debugLevel = value;				
//				this.say("DEBUG LEVEL "+debugLevel);
//			}
//		}catch (ee){}		 
//		
//	},100);

	this.getMsgTime = function() {
		  var f=new Date();
		  cad=f.getUTCDay() + "/" + f.getUTCMonth()+ "/" + f.getUTCFullYear()+" - "+ f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
		  return cad;
	};
 
  /**
   * Imprime el mensaje de depuración que le llegue por parámetro.
   * @param msg El mensaje a imprimr
   * #param level Nivel de depuración
   */
  this.say = function(msg,level) {

		  try {
			  
			  if (level==undefined) {
				  console.log(this.getMsgTime() + " - " + msg);
			  } else {
				  if (level<=this.debugLevel) {
					  console.log(this.getMsgTime() + " - " + msg);	  
				  }
			  }
			
		  }catch(ee) {
			  if (console) 
				  console.error(ee.name + ":" + ee.message);
		  }
	};
	
	
	this.error = function(msg) {
		 try {
			 console.error(ee.name + ":" + ee.message);
		 }catch (ee) {
			 
		}
	}
};


