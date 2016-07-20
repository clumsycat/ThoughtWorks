describe("test cart functions", function(){
		
	//init the cartlist
	it("init the cartlist, cartlist should be I1:5,I2:1,I3:2,I5:3 ",function(){
		doInit();
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":1,"ITEM000003":2,"ITEM000005":3}');
	});

	//doInit before every spec
	beforeEach(function(){
		doInit();
	});

	//add an basketball 
	it("add an basketball to cart, cartlist should be I1:5,I2:2,I3:2,I5:3",function(){
		addToCart("ITEM000002");
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":2,"ITEM000003":2,"ITEM000005":3}');
	});

	//add an sprit 
	it("add an basketball to cart, cartlist should be I1:5,I2:1,I3:2,I5:3,I4:1",function(){
		addToCart("ITEM000004");
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":1,"ITEM000003":2,"ITEM000005":3,"ITEM000004":1}');
	});

	//delete apples
	it("delete apples from cart, cartlist should be I1:5,I2:1,I5:3",function(){
		deleteFromCart("ITEM000003");
		deleteFromCart("ITEM000003");
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":1,"ITEM000005":3}');
	});

	//clear the cart
	it("clear the cart, cartlist should be {} ",function(){
		clearCart();
		expect(localStorage.getItem("cartlist")).toEqual('{}');
	});
});