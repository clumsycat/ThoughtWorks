describe("first test", function(){
	beforeEach(function(){
		  var store = {};
	});
		
	//init the cartlist
	it("init the cartlist",function(){
		doInit();
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":1,"ITEM000003":2,"ITEM000005":3}');
	});

	//add an basketball 
	it("add an basketball to cart",function(){
		addToCart("ITEM000002");
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":2,"ITEM000003":2,"ITEM000005":3}');
	});
});