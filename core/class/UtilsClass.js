/**
 * @class Clase con funciones utilidades
 * @returns {Utils}
 */
function UtilsClass() {
	
	/**
	 * Extender el objeto String de javascript para poner el mayúscula la 
	 * primera letra.
	 * Para usar: "string".capitalizeFirstLetter 
	 */
	String.prototype.capitalizeFirstLetter = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};
	
	this.isNumeric = function( obj ) {
	    return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	};

	this.parsearXML = function(data) {
		var result=null;
		game.DebugManager.say("In parsearXML(data) --> "+typeof data);
		var tipo = typeof data;
		if(tipo == "string"){
			if (typeof window.DOMParser != "undefined") 
			{
			    var parser = new DOMParser();
			    result = parser.parseFromString(data, "text/xml");
			} 
			else if (typeof window.ActiveXObject != "undefined") 
			{ 
				result = new ActiveXObject('Microsoft.XMLDOM');      
				result.async = false;      
				result.loadXML(data);
			}			
		} else if (tipo == "object"){       
			result = data;    
		}
		return result;
	};
	
		
	/**
	 * Carga de script de estado
	 */
	this.loadStateScript = function(id) {
	   var src= game.RouteManager.getStatesPath() + id + ".js";	  
	   this.loadScript(src,"text/javascript","script");
	};
	
	/**
	 * Carga de script de contenido, (clases contenedoras)
	 */
	this.loadContentScript = function(scriptName) {
	   var src= game.RouteManager.getClassPath() + scriptName + ".js";
	   this.loadScript(src,"text/javascript","script");
	};
	
	
	/**
	 * Carga script
	 * 
	 */
	this.loadScript = function(src,type,element, rel, media, href) {
		 var script = document.createElement(element);
		
		 
		   // Atributos del script		   
		   script.setAttribute("type", type);
				     
		   if (src!=undefined) { script.setAttribute("src", src);  }
		   if (href!=undefined) { script.setAttribute("href", href);  }
		   if (rel!=undefined) { script.setAttribute("rel", rel);  }
		   if (media!=undefined) { script.setAttribute("media", media);  }
		   	
		   // Insertar script en la cabecera
		   document.getElementsByTagName("head")[0].appendChild(script);
		   
		   		   		   
	};
	
	
	this.existsFile = function(file) {
		var result=false;
		
		$.ajax({
		    url:file,
		    async: false, 
		    type:'HEAD',		    
		    success: function()
		    {
		    	result=true;
		    }
		});
		return result;
	};
	
	this.replaceAll = function(text, searchStr, replaceStr) { 
	    while (text.toString().indexOf(searchStr) != -1)
	        text = text.toString().replace(searchStr, replaceStr); 
	    return text; 
	}; 
	
	
	/**
	 * Obtiene la ruta de la cadena dada.
	 * Da todo el path menos el último item
	 * @param str
	 */
	this.getFolder = function(str) {
		var result = "";
		if (str.indexOf("/")>-1)
		{ // hay ruta
			var arr = str.split("/");
			arr.pop();
			result = arr.join("/") + "/";				
		}
		return result;
	};
	
	/**
	 * Obtiene el archivo despreciando la cadena
	 */
	this.getFile = function(str) {
		var result = str;
		if (str.indexOf("/")>-1)
		{ // hay ruta
			var arr = str.split("/");			
			result = arr.pop();				
		}
		return result;
	};
	
};