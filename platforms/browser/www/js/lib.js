// Настройки для связи с OpenCart RestAPI
apiKey = "123";
apiPath = "127.0.0.1";
//apiPath = "10.11.86.128";

// Взаимодействие с OpenCart RestAPI
var RestAPI = {
	getcategories: function (dataobj) {
		$.ajax({
			url: 'http://' + apiPath + ':80/index.php?route=feed/rest_api/category&key=' + apiKey,
			datatype: 'json',
			method: 'GET',
			success: function (data) {
				var resp = JSON['parse'](data);
				if (resp['success'] != false){dataobj(resp);}
			}
		})
	},
	getproducts: function (catid,objdata) {
		//var catid = 20;
		//console.log(catid);
		$.ajax({
			url: 'http://' + apiPath + ':80/index.php?route=feed/rest_api/products&key=' + apiKey,
			datatype: "json",
			method: "GET",
			data: {'category' : catid},
			success: function (data) {
				var resp = JSON['parse'](data);
				if (resp['success'] != false){
					objdata(resp);
				}
				
			}
		})
		
	},
	
}