/**
 * @class Clase que contiene métodos para depurar. Crea un popup en un navegador e imprime los sucesos en tiempo de ejecución
 */
function DebugManager() {

	function getMsgTime() {
		  var f=new Date();
		  cad=f.getUTCDay() + "/" + f.getUTCMonth()+ "/" + f.getUTCFullYear()+" - "+ f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
		  return cad;
	};
 
  /**
   * Imprime el mensaje de depuración que le llegue por parámetro.
   * @param msg El mensaje a imprimr
   */
  function _say(msg) {
		  try {
			  console.log(getMsgTime() + " - " + msg);	  				
		  		
		  }catch(ee) {  }			
   };
	
	
  function _error(msg) {
		 try {
			 console.error(ee.name + ":" + ee.message);
		 }catch (ee) {	}
	};
	
  return {
		say: _say,
		error: _error
	};
};


