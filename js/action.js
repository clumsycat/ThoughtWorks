//copy the init data from jsonfile, and init the onsale list
function doInit(){
	var str ="";
	for(var i=0;i<onsale_data.length;i++){
		if($.inArray(onsale_data[i].barcode,discount_list[0].barcodes) != -1)
			str += saleListStr(onsale_data[i],"参与95折优惠","list-group-item-danger");
		else if($.inArray(onsale_data[i].barcode,discount_list[1].barcodes) != -1)
			str += saleListStr(onsale_data[i],"参与满二赠一优惠","list-group-item-info");
		else
			str += saleListStr(onsale_data[i],"不参与活动");
	}
	$("#L-onsale").html(str);

	//根据预先定义好的初始化列表初始化购物车中物品数量
	var cart_list = {};
	for(var i=0;i<purchase_list.length;i++){
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
	DrawCart();
}
//简化代码阅读，将列表生成的部分拆开单独作为函数
function saleListStr(onsale_data,info,color){
	return '<a onclick="addToCart(\''+onsale_data.barcode 
		+'\')" title ="'+ info +'" class="list-group-item '+ color +'" id="'
		+onsale_data.barcode +'"><span class="badge">'+onsale_data.price.toFixed(2)+' 元 / '
		+onsale_data.unit+'</span>'+ onsale_data.name+'</a>';
}


//向购物车添加物品
function addToCart(id){
	var cart_list = JSON.parse(localStorage.getItem("cartlist"));
	if(cart_list.hasOwnProperty(id))
		cart_list[id] ++;
	else
		cart_list[id] = 1;
	localStorage.setItem("cartlist",JSON.stringify(cart_list));
	DrawCart();
}
//删除购物车中物品
function deleteFromCart(id){
	var cart_list = JSON.parse(localStorage.getItem("cartlist"));
	if(cart_list[id]>1)
		cart_list[id] --;
	else
		delete cart_list[id];
	localStorage.setItem("cartlist",JSON.stringify(cart_list));
	DrawCart();
}
//重绘购物车用
function DrawCart(){

	var cart_list = JSON.parse(localStorage.getItem("cartlist"));
	var total_sum = 0.0;
	var cartstr = "";
	for(item in cart_list)
	{
		for(index = 0;index<onsale_data.length;index++)
		{
			if(item == onsale_data[index].barcode)
				break;
		}
		total_sum += cart_list[item] * parseFloat(onsale_data[index].price);
		cartstr += '<a onclick="deleteFromCart(\''+onsale_data[index].barcode 
		+'\')" class="list-group-item" id="'+onsale_data[index].barcode 
		+'"><span class="badge">'+cart_list[item]
		+onsale_data[index].unit+'</span>'+ onsale_data[index].name+'</a>'
	}
	$("#L-cart").html(cartstr);
	$("#final-price").html("￥"+total_sum.toFixed(2)+"（元）");
}

function Print(type){
	var cart_list = JSON.parse(localStorage.getItem("cartlist"));
	var receiptJson = [];
	var i=0;
	for(item in cart_list)
		receiptJson[i++] = item+'-'+cart_list[item];
	PrintReceipt(receiptJson);
}
function PrintReceipt(json){
	var discount_sale={};
	var common_sale = {};
	var total_sale ={};
	for(var i=0;i<json.length;i++)
	{
		var count = 1;
		//获取带-格式的商品和数量
		if(json[i].indexOf("-")!=-1)
		{
			var splt = json[i].split(/-/);
			item = splt[0];
			count = parseInt(splt[1]);
		}
		else
			item = json[i];

		var index = $.inArray(item,discount_list[0].barcodes);
		var oldcount = 0.00;
		if(index == -1)
		{
			if(item in common_sale)
				oldcount = common_sale[item];
			common_sale[item] = oldcount+count; 
		}
		else
		{
			if(item in discount_sale)
				oldcount = discount_sale[item];
			discount_sale[item] = oldcount+count; 
		}
		if(item in total_sale)
			oldcount = total_sale[item];
		total_sale[item] = oldcount+count; 

	}
	var receiptCotent = "***<没钱赚商店>购物清单***</br>";
	var undiscountCotent = "";
	var total_sum = 0.00;
	var common_sum = 0.00;
	var discount_sum = 0.00;
	var discount;
	//输出购物清单
	for(var item in total_sale)
	{
		var index;
		for(index = 0;index<onsale_data.length;index++)
		{
			if(item == onsale_data[index].barcode)
				break;
		}
		var sum = total_sale[item] * onsale_data[index].price;
		total_sum += sum;
		receiptCotent += "名称："+ onsale_data[index].name+"，数量："+
		total_sale[item]+ onsale_data[index].unit+"，单价："+
		onsale_data[index].price.toFixed(2)+"(元)，小计："+
		sum.toFixed(2)+"(元)</br>";
	}
	receiptCotent += "----------------------</br>";
	discount_sum = total_sum;
	for(var item in common_sale)
	{
		var index;
		for(index = 0;index<onsale_data.length;index++)
		{
			if(item == onsale_data[index].barcode)
				break;
		}
		var sum = total_sale[item] * onsale_data[index].price;
		discount_sum -= sum;
		undiscountCotent += "名称："+ onsale_data[index].name+"，价格："+ 
		sum.toFixed(2)+"（元）</br>";
	}
	if(undiscountCotent != "")
		undiscountCotent ="不参与优惠商品：</br>" + undiscountCotent;
	discount = Math.floor(discount_sum/100)*10;
	discount_sum -= discount;
	total_sum -=discount;
	if(discount == 0 )//没有满足条件的商品
		receiptCotent += "总计："+total_sum.toFixed(2)+"（元）</br>";
	else{
		receiptCotent += undiscountCotent;
		receiptCotent +="参与优惠总价："+discount_sum.toFixed(2)+"（元），优惠："+
		discount.toFixed(2)+"（元）</br>";
		receiptCotent +="----------------------</br>";
		receiptCotent +="总计："+total_sum.toFixed(2)+"（元）</br>";
		receiptCotent +="节省："+discount.toFixed(2)+"（元）</br>";
	}
	receiptCotent +="**********************</br>";
	$("#receipt-content").html(receiptCotent);
}

function ClearCart(){
	localStorage.setItem("cartlist",JSON.stringify({}));
	$("#L-cart").html('<a href="#" class="list-group-item disabled">购物车为空</a>');
	$("#final-price").html("￥0.00（元）");
	$("#receipt-content").html("快来结账啊~")
}