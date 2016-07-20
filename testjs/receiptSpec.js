describe("test discount strategy of goods", function(){
	//clearcart before each 
	beforeEach(function(){
		clearCart();
	});

	//测试3个 买二赠一的物品
	it("test freeGood Discount, the price should be 70, discount should be 35",function(){
		//price 35
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		expect(print()).toEqual(['70.00','35.00']);
	});
	//测试2个 买二赠一的物品
	it("test freeGood Discount, the price should be 70, discount should be 0",function(){
		//price 35
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		expect(print()).toEqual(['70.00','0.00']);
	});

	//测试两种 买二赠一的物品
	it("test freeGood Discount, the price should be 152, discount should be 38",function(){
		//price 35
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		//price 3
		addToCart("ITEM000004");
		addToCart("ITEM000004");
		addToCart("ITEM000004");
		addToCart("ITEM000004");
		addToCart("ITEM000004");
		expect(print()).toEqual(['152.00','38.00']);
	});

	//测试1个 95折的物品
	it("test 5 percent Discount, the price should be 93.1, discount should be 4.9",function(){
		//price 98
		addToCart("ITEM000002");
		expect(print()).toEqual(['93.10','4.90']);
	});

	//测试两种 特惠情况
	it("test 5 percent & free goods Discount, the price should be 163.1, discount should be  39.9",function(){
		//price 98
		addToCart("ITEM000002");
		//price 35
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		expect(print()).toEqual(['163.10','39.90']);
	});
});


describe("receipt content test",function(){
	beforeEach(function(){

	});

	it("should be equal to the sample",function(){
		clearCart();
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		
		var receipt = getReceipt();
		var content = receipt[0];
		var sample = "***<没钱赚商店>购物清单***</br>名称：哈根达斯，数量：3盒，单价：35.00（元），小计：70.00（元）</br>"
			+ "----------------------</br>名称：哈根达斯，数量：1盒</br>----------------------</br>总计：70.00（元）</br>"
			+ "节省：35.00（元）</br>**********************</br>";
		expect(content).toEqual(sample);
	});

});