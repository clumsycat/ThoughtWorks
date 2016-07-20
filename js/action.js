//copy the init data from jsonfile, and init the onsale list
function doInit(onsaleData = onsale_data ,discountData = discount_list,cartData = purchase_list){
	if( typeof(onsaleData) != "undefined"){
		onsale_data = onsaleData;
	}
	if( typeof(discountData) != "undefined"){
		discount_list = discountData;
	}
	if( typeof(cartData) != "undefined"){
		purchase_list = cartData;
	}

	var str = "";
	var indexOfFreeGoods,indexOfFivePercentDiscount;
	for(var i=0;i<discount_list.length;i++){
		if(discount_list[i].type == "FREE_GOODS_OFFER")
			indexOfFreeGoods = i;
		if(discount_list[i].type == "FIVE_PERCENT_DISCOUNT")
			indexOfFivePercentDiscount = i;
	}
	for(var i = 0; i < onsale_data.length; i++){
		if($.inArray(onsale_data[i].barcode,discount_list[indexOfFivePercentDiscount].barcodes) != -1)
			str += saleListStr(onsale_data[i], "参与95折优惠", "list-group-item-danger");
		else if($.inArray(onsale_data[i].barcode,discount_list[indexOfFreeGoods].barcodes) != -1)
			str += saleListStr(onsale_data[i], "参与满二赠一优惠", "list-group-item-info");
		else
			str += saleListStr(onsale_data[i], "不参与活动");
	}
	$("#L-onsale").html(str);

	//根据预先定义好的初始化列表初始化购物车中物品数量
	var cart_list = {};
	for(var i = 0; i < purchase_list.length; i++){
		var count = 1;
		//获取带-格式的商品和数量
		if(purchase_list[i].indexOf("-")!=-1)
		{
			var splt = purchase_list[i].split(/-/);
			item = splt[0];
			count = parseInt(splt[1]);
		}
		else
			item = purchase_list[i];

		if(item in cart_list)
			cart_list[item] += count; 
		else
			cart_list[item] = count; 
	}
	localStorage.setItem("cartlist",JSON.stringify(cart_list));
	drawCart();
}
//简化代码阅读，将列表生成的部分拆开单独作为函数
function saleListStr(onsale_data,info,color){
	return '<a onclick="addToCart(\'' + onsale_data.barcode 
	+ '\')" title ="' + info +'" class="list-group-item ' + color + '" id="'
	+ onsale_data.barcode + '"><span class="badge">' + onsale_data.price.toFixed(2) + ' 元 / '
	+ onsale_data.unit + '</span>' + onsale_data.name + '</a>';
}


//向购物车添加物品
function addToCart(id){
	var cart_list = JSON.parse(localStorage.getItem("cartlist"));
	if(cart_list.hasOwnProperty(id))
		cart_list[id] ++;
	else
		cart_list[id] = 1;
	localStorage.setItem("cartlist", JSON.stringify(cart_list));
	drawCart();
}
//删除购物车中物品
function deleteFromCart(id){
	var cart_list = JSON.parse(localStorage.getItem("cartlist"));
	if(cart_list[id] > 1)
		cart_list[id] --;
	else
		delete cart_list[id];
	localStorage.setItem("cartlist", JSON.stringify(cart_list));
	drawCart();
}
//重绘购物车用
function drawCart(){

	var cart_list = JSON.parse(localStorage.getItem("cartlist"));
	var total_sum = 0.0;
	var cartstr = "";
	for(item in cart_list)
	{
		for(index = 0; index < onsale_data.length;index++)
		{
			if(item == onsale_data[index].barcode)
				break;
		}
		total_sum += cart_list[item] * parseFloat(onsale_data[index].price);
		cartstr += '<a onclick="deleteFromCart(\'' + onsale_data[index].barcode 
		+'\')" class="list-group-item" id="'+ onsale_data[index].barcode 
		+'"><span class="badge">' + cart_list[item] + onsale_data[index].unit
		+ '</span>' + onsale_data[index].name + '</a>';
	}
	$("#L-cart").html(cartstr);
	$("#final-price").html("￥"+total_sum.toFixed(2)+"（元）");
}

function clearCart(){
	localStorage.setItem("cartlist",JSON.stringify({}));
	$("#L-cart").html('<a href="#" class="list-group-item disabled">购物车为空</a>');
	$("#final-price").html("￥0.00（元）");
	$("#receipt-content").html("快来结账啊~")
}

//打印小票入口，重构
function print(){
	var receipt = getReceipt()//.replace(/(?:\r\n|\n)/g, '<br>');
	$("#receipt-content").html(receipt);

}

function getReceipt(){
	var cart_list = JSON.parse(localStorage.getItem("cartlist"));

	var receiptCotent = "***<没钱赚商店>购物清单***\r\n";
	var freeGoodsCotent = "";

	var total_sum = 0.00;
	var discount_sum = 0.00;
	var indexOfFreeGoods,indexOfFivePercentDiscount;
	for(var i=0;i<discount_list.length;i++){
		if(discount_list[i].type == "FREE_GOODS_OFFER")
			indexOfFreeGoods = i;
		if(discount_list[i].type == "FIVE_PERCENT_DISCOUNT")
			indexOfFivePercentDiscount = i;
	}
	//输出购物清单
	for(var item in cart_list)
	{
		var index;
		for(index = 0;index < onsale_data.length;index++)
		{
			if(item == onsale_data[index].barcode)
				break;
		}
		var price = 0;
		//95折
		if($.inArray(onsale_data[index].barcode,discount_list[indexOfFivePercentDiscount].barcodes) != -1){
			var price = cart_list[item] * onsale_data[index].price;
			discount_sum += price * 0.05;
			receiptCotent += "名称：" + onsale_data[index].name + "，数量：" + cart_list[item] + onsale_data[index].unit
			+ "，单价：" + onsale_data[index].price.toFixed(2) + "（元），小计：" + (price * 0.95).toFixed(2) + "，节省"
			+ (price * 0.05).toFixed(2) + "（元）\r\n"; 
			price = price * 0.95;
		}
		//买二赠一
		else if($.inArray(onsale_data[index].barcode,discount_list[indexOfFreeGoods].barcodes) != -1 && cart_list[item] / 3 >= 1){
			var freecount = Math.floor(cart_list[item] / 3);
			var price = (cart_list[item] - freecount) * onsale_data[index].price;
			discount_sum += freecount * onsale_data[index].price;
			freeGoodsCotent += "名称：" + onsale_data[index].name + "，数量：" + freecount + onsale_data[index].unit
			+ "\r\n";
			receiptCotent += "名称：" + onsale_data[index].name + "，数量：" + cart_list[item] + onsale_data[index].unit
			+ "，单价：" + onsale_data[index].price.toFixed(2) + "（元），小计：" + (price).toFixed(2) + "（元）\r\n"; 
		}
		else{
			var price = cart_list[item] * onsale_data[index].price;
			receiptCotent += "名称：" + onsale_data[index].name + "，数量：" + cart_list[item] + onsale_data[index].unit
			+ "，单价：" + onsale_data[index].price.toFixed(2) + "（元），小计：" 
			+ price.toFixed(2) + "（元）\r\n"; 
		}
		total_sum += price;
	}
	receiptCotent += "----------------------\r\n";
	if(freeGoodsCotent != "")
	{
		freeGoodsCotent = "买二赠一商品：\r\n" + freeGoodsCotent;
		freeGoodsCotent += "----------------------\r\n";
	}
	receiptCotent += freeGoodsCotent;
	receiptCotent += "总计：" + total_sum.toFixed(2) + "（元）\r\n";
	if(discount_sum != 0 )
		receiptCotent += "节省：" + discount_sum.toFixed(2) + "（元）\r\n";
	receiptCotent +="**********************\r\n";

	return receiptCotent;
}