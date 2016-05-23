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
  "barcode": "ITEM000003",
  "name": "苹果",
  "unit": "斤",
  "category": "食品",
  "subCategory": "水果",
  "price": 5.50
},{
  "barcode": "ITEM000004",
  "name": "雪碧",
  "unit": "瓶",
  "category": "食品",
  "subCategory": "碳酸饮料",
  "price": 3.00
},{
  "barcode": "ITEM000005",
  "name": "可口可乐",
  "unit": "瓶",
  "category": "食品",
  "subCategory": "碳酸饮料",
  "price": 3.00
}];

var discount_list = 
[
{
  type: 'FULL_ONE_HUNDRED_MINUS_TEN',
  barcodes: [
  'ITEM000001',
  'ITEM000002',
  'ITEM000005'
  ]
}
]

var purchase_list =
[
'ITEM000001',
'ITEM000001',
'ITEM000001',
'ITEM000001',
'ITEM000001',
'ITEM000002',
'ITEM000003-2',
'ITEM000005',
'ITEM000005',
'ITEM000005'
]