function Observer(){
	'use strict';
	
	var events={};

	Observer.prototype.publish=function(eventName,data){
		if(eventName in events){
			var cbArray=events[eventName];
			for(var i=0;i<cbArray.length;i++){
				cbArray[i](data);
			}
		}else{
			throw new Error('no '+eventName+' event');
		}
	};
	Observer.prototype.unsubscribe=function(eventName,callback){
		if(typeof eventName !== 'string'){
			throw new TypeError('eventName should be a string');
		}
		if(typeof callback !== 'function'){
			throw new TypeError('should have second parameter: callback function');
		}
		if(eventName in events){
			var eventArray=events[eventName];
			for(var i=0;i<eventArray.length;i++){
				if(eventArray[i]===callback){
					eventArray.splice(i,1);
					if(eventArray.length===0){
						delete events[eventName];
					}
				}
			}
		}else{
			throw new Error('no '+eventName+' event');
		}
	};
	Observer.prototype.subscribe=function(eventName,callback){
		if(typeof eventName !== 'string'){
			throw new TypeError('eventName should be a string');
		}
		if(typeof callback !== 'function'){
			throw new TypeError('callback should be a function');
		}
		if(!events[eventName]){
			events[eventName]=[];
		}
		events[eventName].push(callback);
	};
	Observer.prototype.showEvents=function(){
		var ets=[];
		for(var e in events){
			ets.push(e);
		}
		return ets;
	};
}