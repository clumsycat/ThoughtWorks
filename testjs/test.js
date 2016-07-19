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

	//add an sprit 
	it("add an basketball to cart",function(){
		addToCart("ITEM000004");
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":2,"ITEM000003":2,"ITEM000005":3,"ITEM000004":1}');
	});

	//add an basketball 
	it("delete apples from cart",function(){
		deleteFromCart("ITEM000003");
		deleteFromCart("ITEM000003");
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":2,"ITEM000005":3,"ITEM000004":1}');
	});
});