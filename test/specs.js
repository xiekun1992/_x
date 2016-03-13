'use strict';

var observer;

describe('when initialized,',function(){

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
	describe('there is no event subscribed',function(){
		it('publish an event should throw an error',function(){
			expect(function(){observer.publish('INITIAL','initialized')}).toThrowError(Error,'no INITIAL event');
		});
		it('unsubscribe an event should throw an error',function(){
			expect(function(){observer.unsubscribe('INITIAL',function(){})}).toThrowError(Error,'no INITIAL event');
		});
	});

});
// single event
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

// multi events
describe('after subscribe two events LOGIN, LOGOUT,',function(){
	var cb1,cb2;
	beforeAll(function(){
		observer=new Observer();
		cb1=jasmine.createSpy("cb1");
		cb2=jasmine.createSpy("cb2");
		observer.subscribe('LOGIN',cb1);
		observer.subscribe('LOGOUT',cb2);
	});
	afterAll(function(){
		observer=null;
	});
	it('call showEvents method should return an array contains this two events',function(){
		expect(observer.showEvents()).toEqual(['LOGIN','LOGOUT']);
	});
	it('publish an event LOGOUT, cb2 should be called with the specific object, cb1 should not be called',function(){
		var user={id:1,username:'xiekun1992'};
		observer.publish('LOGOUT',user);
		expect(cb2).toHaveBeenCalledWith(user);
		expect(cb1).not.toHaveBeenCalled();
	});
	describe('unsubscribe event LOGIN,',function(){
		beforeAll(function(){
			observer.unsubscribe('LOGIN',cb1);
		});
		it('call showEvents method should return an array contains LOGOUT',function(){
			expect(observer.showEvents()).toEqual(['LOGOUT']);
		});
		it('publish event LOGOUT, cb2 should be called with the specific object',function(){
			var user={id:1,username:'xiekun1992'};
			observer.publish('LOGOUT',user);
			expect(cb2).toHaveBeenCalledWith(user);
		});
		it('publish event LOGIN, an error will show up',function(){
			expect(function(){observer.publish('LOGIN',{})}).toThrowError(Error,'no LOGIN event');
		});
	});
});

// duplicate events
describe('when subscribe duplicate events LOGIN with two different callback functions, ',function(){
	var cb1,cb2;
	var user;
	beforeAll(function(){
		observer=new Observer();
		cb1=jasmine.createSpy('cb1');
		cb2=jasmine.createSpy('cb2');
		observer.subscribe('LOGIN',cb1);
		observer.subscribe('LOGIN',cb2);
		user={id:1,name:'xiekun1992'};
	});
	afterAll(function(){
		observer=null;
		cb1=null;
		cb2=null;
		user=null;
	})
	it('call showEvents method should return an array with LOGIN string only',function(){
		expect(observer.showEvents()).toEqual(['LOGIN']);
	});
	it('publish event LOGIN, cb1 and cb2 should be called at the same time',function(){
		observer.publish('LOGIN',user);
		expect(cb1).toHaveBeenCalledWith(user);
		expect(cb2).toHaveBeenCalledWith(user);
	});
	describe('unsubscribe event LOGIN with cb1,',function(){
		beforeAll(function(){
			observer.unsubscribe('LOGIN',cb1);
		});
		it('publish LOGIN event, cb2 should be called',function(){
			observer.publish('LOGIN',user);
			expect(cb2).toHaveBeenCalledWith(user);
		});
		it('call showEvents should return an array with LOGIN string',function(){
			expect(observer.showEvents()).toEqual(['LOGIN']);
		});
		describe('unsubscribe LOGIN event with cb2,',function(){
			beforeAll(function(){
				observer.unsubscribe('LOGIN',cb2);
			});
			it('call showEvents should return an empty array',function(){
				expect(observer.showEvents()).toEqual([]);
			});
			it('publish LOGIN event should throw an error',function(){
				expect(function(){observer.publish('LOGIN',user)}).toThrowError(Error,'no LOGIN event');
			});
		});
	})
})