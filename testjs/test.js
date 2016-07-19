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

	//清空
	it("clear the cart",function(){
		clearCart();
		expect(localStorage.getItem("cartlist")).toEqual('{}');
	});

	//测试3个 买二赠一的物品
	it("test freeGood Discount",function(){
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		expect(print()).toEqual([70.00,35.00]);
	});
	//测试5个 买二赠一的物品
	it("test freeGood Discount",function(){
		clearCart();
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		expect(print()).toEqual([140.00,35.00]);
	});

	//测试两种 买二赠一的物品
	it("test freeGood Discount",function(){
		clearCart();
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000004");
		addToCart("ITEM000004");
		addToCart("ITEM000004");
		addToCart("ITEM000004");
		addToCart("ITEM000004");
		expect(print()).toEqual([152.00,38.00]);
	});

});