describe("first test", function(){
	beforeEach(function(){
		  var store = {};
	});
		
	it("init the cartlist",function(){
		doInit();
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":1,"ITEM000003":2,"ITEM000005":3}');
	});

});