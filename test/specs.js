'use strict';

var observer;

describe('when initialized',function(){

	beforeAll(function(){
		observer=new Observer();
	});
	afterAll(function(){
		observer=null;
	})
	
	it('Observer should have showEvents,publish,unsubscribe and subscribe methods',function(){
		expect(observer.publish).toBeDefined();
		expect(observer.unsubscribe).toBeDefined();
		expect(observer.subscribe).toBeDefined();
		expect(observer.showEvents).toBeDefined();
	});

});
// a single event
describe('when subscribe event LOGIN,',function(){
	var cb;

	beforeAll(function(){
		cb=jasmine.createSpy("cb").and.returnValue(1);
		observer=new Observer();
		spyOn(observer,'subscribe').and.callThrough();
	});
	afterAll(function(){
		observer=null;
	});
	it('without eventName, subscribe should throw a TypeError',function(){
		expect(function(){observer.subscribe()}).toThrowError(TypeError,'eventName should be a string');
	});
	it('without callback function, subscribe should throw a TypeError',function(){
		expect(function(){observer.subscribe('LOGIN')}).toThrowError(TypeError,'callback should be a function')
	})
	it('subscribe method should be called with string LOGIN and a callback function',function(){
		observer.subscribe('LOGIN',cb);
		expect(observer.subscribe).toHaveBeenCalledWith('LOGIN',cb);
	});
	it('call showEvents method will return all the events subscribed',function(){
		expect(observer.showEvents()).toEqual(['LOGIN']);
	});
	describe('when publish an event LOGIN,',function(){
		it('with no data, the callback function related to LOGIN should be executed',function(){
			observer.publish('LOGIN');
			expect(cb).toHaveBeenCalled();
			expect(cb()).toEqual(1);
		});
		it('with an object, the callback function should be called with the object',function(){
			var obj={};
			observer.publish('LOGIN',obj);
			expect(cb).toHaveBeenCalledWith(obj);
		});
	})
	describe('before unsubscribe event LOGIN,',function(){
		it('call showEvents method will return an string array containing LOGIN',function(){
			expect(observer.showEvents()).toEqual(['LOGIN']);
		})
	})
	describe('when unsubscribe event LOGIN,',function(){
		it('without eventName, unsubscribe method will throw a TypeError',function(){
			expect(function(){observer.unsubscribe()}).toThrowError(TypeError,'eventName should be a string');
		});
		it('without callback function, unsubscribe method will throw a TypeError',function(){
			// spyOn(observer,'unsubscribe').and.callThrough();
			expect(function(){observer.unsubscribe('LOGIN')}).toThrowError(TypeError,/callback function/);
		})

		it('with callback function, call showEvents method will return an empty array',function(){
			observer.unsubscribe('LOGIN',cb);
			expect(observer.showEvents()).toEqual([]);
		})
	})
});