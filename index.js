'use strict';

function Observer(){
	var events={};

	this.publish=function(eventName,data){
		var cbArray=events[eventName];
		for(var i=0;i<cbArray.length;i++){
			cbArray[i](data);
		}
	}
	this.unsubscribe=function(eventName,callback){
		if(typeof callback !== 'function'){
			throw new TypeError('should have second parameter: callback function');
		}
		var eventArray=events[eventName];
		for(var i=0;i<eventArray.length;i++){
			if(eventArray[i]===callback){
				eventArray.splice(i,1);
				if(eventArray.length===0){
					delete events[eventName];
				}
			}
		}
	}
	this.subscribe=function(eventName,callback){
		if(typeof eventName !== 'string'){
			throw new TypeError('eventName should be a string');
		}
		if(!events[eventName]){
			events[eventName]=[];
		}
		events[eventName].push(callback);
	}
	this.showEvents=function(){
		var ets=[];
		for(var e in events){
			ets.push(e);
		}
		return ets;
	}

	return {
		publish:this.publish,
		unsubscribe:this.unsubscribe,
		subscribe:this.subscribe,
		showEvents:this.showEvents
	}
}