'use strict';

function Observer(){
	var events={};

	this.publish=function(eventName){
		var cbArray=events[eventName];
		for(var i=0;i<cbArray.length;i++){
			cbArray[i]();
		}
	}
	this.unsubscribe=function(){

	}
	this.subscribe=function(eventName,callback){
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