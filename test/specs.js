'use strict';

describe('when initialized',function(){
	var observer;

	beforeEach(function(){
		observer=new Observer();
	});

	it('Observer should have showEvents,publish,unsubscribe and subscribe methods',function(){
		expect(observer.publish).toBeDefined();
		expect(observer.unsubscribe).toBeDefined();
		expect(observer.subscribe).toBeDefined();
		expect(observer.showEvents).toBeDefined();
	});
});

describe('when subscribe event LOGIN,',function(){
	var cb;
	var observer;

	beforeAll(function(){
		cb=jasmine.createSpy("cb");
		observer=new Observer();
	});
	afterAll(function(){
		observer=null;
	});
	it('subscribe method should be called with string LOGIN and a callback function',function(){
		spyOn(observer,'subscribe').and.callThrough();
		observer.subscribe('LOGIN',cb);
		expect(observer.subscribe).toHaveBeenCalledWith('LOGIN',cb);
	});
	it('call showEvents method will return all the events subscribed',function(){
		expect(observer.showEvents()).toEqual(['LOGIN']);
	});
	describe('when publish an event LOGIN,',function(){
		it('the callback function related to LOGIN should be executed',function(){
			observer.publish('LOGIN');
			expect(cb).toHaveBeenCalled();
		});
	})
});