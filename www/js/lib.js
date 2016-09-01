var urlhost = "127.0.0.1", 
	urlkey = "123", 

function RestAPI () {
	// Работа с Rest API для opencart
	
	
	
	
	
	
	
	jQuery.support.cors = true;
	var url = urlhost + '/' + urlapi + urlcategories + '&key=' + urlkey
	items = new Array()
	$.getJSON(url, function (data){
		//document.getElementById('listview').style.display = "none"
		data= data.categories
		$.each(data, function (j, categories){
			items.push('<li><a id="' + data[j].id + '" href="#">' + data[j].name + '</a></li>')
		})
		items = items.join("")
		var Listview = document.getElementById('listview')
		console.log(items)
		Listview.innerHTML = items
	})
}


///
