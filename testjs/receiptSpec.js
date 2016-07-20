describe("receipt content test",function(){
	beforeEach(function(){
		clearCart();
		//使用测试集，每次初始化都加上5个羽毛球作为初始数据
		var onsale_data= [{
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
			"barcode": "ITEM000004",
			"name": "雪碧",
			"unit": "瓶",
			"category": "食品",
			"subCategory": "碳酸饮料",
			"price": 3.00
		},{
			"barcode": "ITEM000007",
			"name": "哈根达斯",
			"unit": "盒",
			"category": "食品",
			"subCategory": "冰淇淋",
			"price": 35.00
		}];

		var discount_list = 
		[{
			type: "FREE_GOODS_OFFER", 
			barcodes: [ 
			"ITEM000004", 
			"ITEM000007" 
			] 
		},{ 
			type: "FIVE_PERCENT_DISCOUNT", 
			barcodes: [
			"ITEM000002"
			], 
		}]

		var purchase_list =
		[
		"ITEM000001",
		"ITEM000001",
		"ITEM000001",
		"ITEM000001",
		"ITEM000001"
		]
		doInit(onsale_data, discount_list, purchase_list);
	});

	it("should be equal to the sample, the price should be 70, discount should be 35",function(){
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		
		var receipt = getReceipt();
		var sample = 
		"***<没钱赚商店>购物清单***\r\n" 
		+ "名称：羽毛球，数量：5个，单价：1.00（元），小计：5.00（元）\r\n" 
		+ "名称：哈根达斯，数量：3盒，单价：35.00（元），小计：70.00（元）\r\n" 
		+ "----------------------\r\n" 
		+ "买二赠一商品：\r\n" 
		+ "名称：哈根达斯，数量：1盒\r\n" 
		+ "----------------------\r\n" 
		+ "总计：75.00（元）\r\n" 
		+ "节省：35.00（元）\r\n" 
		+ "**********************\r\n";
		expect(receipt).toEqual(sample);
	});

	//测试2个 买二赠一的物品
	it("should be equal to the sample, test freeGood Discount, the price should be 70, discount should be 0",function(){
		//price 35
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		var receipt = getReceipt();
		var sample = "***<没钱赚商店>购物清单***\r\n" 
		+ "名称：羽毛球，数量：5个，单价：1.00（元），小计：5.00（元）\r\n" 
		+ "名称：哈根达斯，数量：2盒，单价：35.00（元），小计：70.00（元）\r\n" 
		+ "----------------------\r\n" 
		+ "总计：75.00（元）\r\n" 
		+ "**********************\r\n";
		expect(receipt).toEqual(sample);
	});

	//测试两种 买二赠一的物品
	it("should be equal to the sample, test freeGood Discount, the price should be 152, discount should be 38",function(){
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

		var sample = "***<没钱赚商店>购物清单***\r\n" 
		+ "名称：羽毛球，数量：5个，单价：1.00（元），小计：5.00（元）\r\n" 
		+ "名称：哈根达斯，数量：5盒，单价：35.00（元），小计：140.00（元）\r\n" 
		+ "名称：雪碧，数量：5瓶，单价：3.00（元），小计：12.00（元）\r\n" 
		+ "----------------------\r\n" 
		+ "买二赠一商品：\r\n" 
		+ "名称：哈根达斯，数量：1盒\r\n" 
		+ "名称：雪碧，数量：1瓶\r\n" 
		+ "----------------------\r\n" 
		+ "总计：157.00（元）\r\n" 
		+ "节省：38.00（元）\r\n" 
		+ "**********************\r\n";
		expect(receipt).toEqual(sample);
	});

	//测试1个 95折的物品
	it("should be equal to the sample, test 5 percent Discount, the price should be 93.1, discount should be 4.9",function(){
		//price 98
		addToCart("ITEM000002");
		var receipt = getReceipt();
		var sample = "***<没钱赚商店>购物清单***\r\n" 
		+ "名称：羽毛球，数量：5个，单价：1.00（元），小计：5.00（元）\r\n" 
		+ "名称：篮球，数量：1个，单价：98.00（元），小计：93.10，节省4.90（元）\r\n" 
		+ "----------------------\r\n" 
		+ "总计：98.10（元）\r\n" 
		+ "节省：4.90（元）\r\n" 
		+ "**********************\r\n";
		expect(receipt).toEqual(sample);
	});

	//测试两种 特惠情况
	it("should be equal to the sample, test 5 percent & free goods Discount, the price should be 163.1, discount should be  39.9",function(){
		//price 98
		addToCart("ITEM000002");
		//price 35
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		addToCart("ITEM000007");
		var receipt = getReceipt();
		var sample = 
		"***<没钱赚商店>购物清单***\r\n" 
		+ "名称：羽毛球，数量：5个，单价：1.00（元），小计：5.00（元）\r\n" 
		+ "名称：篮球，数量：1个，单价：98.00（元），小计：93.10，节省4.90（元）\r\n" 
		+ "名称：哈根达斯，数量：3盒，单价：35.00（元），小计：70.00（元）\r\n" 
		+ "----------------------\r\n" 
		+ "买二赠一商品：\r\n" 
		+ "名称：哈根达斯，数量：1盒\r\n" 
		+ "----------------------\r\n" 
		+ "总计：168.10（元）\r\n" 
		+ "节省：39.90（元）\r\n" 
		+ "**********************\r\n";
		expect(receipt).toEqual(sample);
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

		var receipt = getReceipt();
		var sample = 
		"***<没钱赚商店>购物清单***\r\n" 
		+ "名称：羽毛球，数量：5个，单价：1.00（元），小计：4.00（元）\r\n" 
		+ "名称：篮球，数量：1个，单价：98.00（元），小计：93.10，节省4.90（元）\r\n" 
		+ "名称：苹果，数量：2斤，单价：5.50（元），小计：10.45，节省0.55（元）\r\n" 
		+ "----------------------\r\n" 
		+ "买二赠一商品：\r\n" 
		+ "名称：羽毛球，数量：1个\r\n" 
		+ "----------------------\r\n" 
		+ "总计：107.55（元）\r\n" 
		+ "节省：6.45（元）\r\n" 
		+ "**********************\r\n";
		expect(receipt).toEqual(sample);
	})
})