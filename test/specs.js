'use strict';

describe('when initialized',function(){
	var observer;

	beforeEach(function(){
		observer=new Observer();
	});

	it('Observer should have publish,unsubscribe and subscribe methods',function(){
		expect(observer.publish).toBeDefined();
		expect(observer.unsubscribe).toBeDefined();
		expect(observer.subscribe).toBeDefined();
	})
})