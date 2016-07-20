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
		var receipt = getReceipt();
		expect(receipt[1]).toEqual(70);
		expect(receipt[2]).toEqual(35);
	});
	//测试2个 买二赠一的物品
	it("test freeGood Discount, the price should be 70, discount should be 0",function(){
		//price 35
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		var receipt = getReceipt();
		expect(receipt[1]).toEqual(70);
		expect(receipt[2]).toEqual(0);
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
		var receipt = getReceipt();
		expect(receipt[1]).toEqual(152);
		expect(receipt[2]).toEqual(38);
	});

	//测试1个 95折的物品
	it("test 5 percent Discount, the price should be 93.1, discount should be 4.9",function(){
		//price 98
		addToCart("ITEM000002");
		var receipt = getReceipt();
		expect(receipt[1]).toEqual(93.10);
		expect(receipt[2]).toEqual(4.90);
	});

	//测试两种 特惠情况
	it("test 5 percent & free goods Discount, the price should be 163.1, discount should be  39.9",function(){
		//price 98
		addToCart("ITEM000002");
		//price 35
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		var receipt = getReceipt();
		expect(receipt[1]).toEqual(163.10);
		expect(receipt[2]).toEqual(39.90);
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

describe("userDefined init Data test",function(){
	beforeEach(function(){

	});

	it("should be equal to userDefinedData",function(){
		var onsaleData= [{
			  "barcode": "ITEM000001",
			  "name": "羽毛球",
			  "unit": "个",
			  "category": "体育用品",
			  "subCategory": "羽毛球",
			  "price": 1.00
			},{
			  "barcode": "ITEM000002",
			  "name": "篮球",
			  "unit": "个",
			  "category": "体育用品",
			  "subCategory": "篮球",
			  "price": 98.00
			},{
			  "barcode": "ITEM000003",
			  "name": "苹果",
			  "unit": "斤",
			  "category": "食品",
			  "subCategory": "水果",
			  "price": 5.50
			}];
		var discountData = [{
			 type: "FREE_GOODS_OFFER", 
			 barcodes: [ 
			  "ITEM000001"
			  ] 
			},{ 
			  type: "FIVE_PERCENT_DISCOUNT", 
			  barcodes: [
			   "ITEM000002",
			   "ITEM000003"
			   ], 
			}];
		var cartData = [
			"ITEM000001",
			"ITEM000001",
			"ITEM000001",
			"ITEM000001",
			"ITEM000001",
			"ITEM000002",
			"ITEM000003-2"];
		//onsale_data,discount_list,purchase_list
		doInit(onsaleData, discountData, cartData);

		expect(onsale_data).toEqual(onsaleData);
		expect(discount_list).toEqual(discountData);
		expect(purchase_list).toEqual(cartData);
		expect(localStorage.getItem("cartlist")).toEqual('{"ITEM000001":5,"ITEM000002":1,"ITEM000003":2}');
	})
})