app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function OnLoadMobile() {
//проверяем загрузилось ли Нативное приложение 
   document.addEventListener("deviceready", onDeviceReady, false);
// раскоменьтить если пробуем в обычном браузере т.е. не нужно нативное приложение 
//   onDeviceReady(); 
} 
// настройки JQueryMobile
function OnMobileInit(){
   $.mobile.ajaxEnabled = false;
   $.mobile.hashListeningEnabled = false; 
   $.mobile.defaultPageTransition = defaultTransition;
   $.mobile.defaultTransition = defaultTransition;
   $.mobile.page.prototype.options.addBackBtn = false;
} 


$(document).ready(function(){
	var CategoriesList = [];
	var ProductList = [];
	MainPage = {
		// Запускаем MainPage
		run: function(){
			var GetMainPage = this;
			GetMainPage.applystatobjects();
			GetMainPage.applymainmenu();
			GetMainPage.applyproductmenu();
			GetMainPage.applyproduct();
			GetMainPage.homemenu();
			GetMainPage.backbutton();
		},
		// Рисуем все основные div и ul
		applystatobjects: function () {
			var GetMainPage = this;
			document.body.innerHTML = '<div data-role="page" id="page" data-theme="a" data-fullscreen="true"></div>';
			//Создаем header
			$("#page").append('<div id="header" data-role="header" c></div>');
			$("#header").append('<br><h1>Acessorias</h1>');
			//$("#header").append('<a href="#" data-rel="back" class="ui-btn-left ui-btn ui-icon-back ui-btn-icon-notext ui-shadow ui-corner-all"  data-role="button" role="button">Back</a>');
			// Создаем content
			$("#page").append('<div id="content" data-role="content" class="ui-content"></div>');
			$("#content").append('<ul id="menucategories" data-role="listview"></ul>');
			$("#content").append('<ul id="menuproducts" data-role="listview"></ul>');
			$("#menuproducts").hide();
			$("#content").append('<div id="product" data-role="content" class="ui-content"></div>');
			$("#product").hide();
			// Создаем footer
			$("#page").append('<div id="footer" data-role="footer" data-position="fixed"></div>');
			$("#footer").append('<div id="navbar" data-role="navbar"></div>');
			$("#navbar").append('<ul id="navbarul"></ul>');
			$("#navbarul").append('<li><a id="navbarhome" onclick="MainPage[\'homemenu\']()" data-icon="home">home</a></li>');
			$("#navbarul").append('<li><a id="navbarcart" href="#" data-icon="shop">cart</a></li>');
			$("#navbarul").append('<li><a id="navbarcart" href="#" data-icon="shop">my orders</a></li>');
			$("#navbarul").append('<li><a id="navbarcart" href="#" data-icon="info">about</a></li>');
			$("#navbarul").append('<li><a id="navbarcart" href="#" data-icon="gear">profile</a></li>');
		},
		// Генерируем елементы главного меню
		applymainmenu: function () {
			var GetMainPage = this;
			RestAPI['getcategories'](function(obj,catid){
				if(obj['success'] != 'false'){
					//$("#header").append('<a href="#" data-rel="back" class="ui-btn-left ui-btn ui-icon-back ui-btn-icon-notext ui-shadow ui-corner-all"  data-role="button" role="button">Back</a>');
					CategoriesList = obj['categories']
					for (var i = 0; i< obj['categories'].length; ++i){
						//var myli = "";
						$("#menucategories").append('<li><a id="'+ CategoriesList[i].id + '" onclick="MainPage[\'applyproductmenu\'](this.id)" data-role="listview">' + CategoriesList[i].name + '</a></li>');
					}
					$("#menucategories").listview("refresh");
						
				}
				else {
					alert ("JSON: Ошибка получения категорий")
				}
			}) 
			
		},
		// Генерируем елементы меню продуктов исходя с выбора категории продуктов
		applyproductmenu: function (id){
			if (id != null) {
				var GetMainPage = this;
				RestAPI['getproducts'](id, function(obj){
					if(obj['success'] != 'false'){
						ProductList = obj['products']
						for (var i = 0; i< obj['products'].length; ++i){
							$("#menuproducts").append('<li><a id="'+ ProductList[i].id + '" onclick="MainPage[\'applyproduct\'](this.id)" data-role="listview">' + ProductList[i].name + '</a></li>')
						}
						$("#menuproducts").listview("refresh");
						$("#header").append('<a click="MainPage.backbutton();" id="back" data-rel="back" class="ui-btn-left ui-btn ui-icon-back ui-btn-icon-notext ui-shadow ui-corner-all" data-role="button">Back</a>');
						$("#menucategories").hide();
						$("#menuproducts").show();
							
					}
					else {
						alert ("JSON: Ошибка получения продуктов")
					}
				})
			} 
		},
		// Генерируем страницу описание продукта
		applyproduct: function (id) {
			var product = new Object;
			if (id != null){
				var i = 0;
				while (id != ProductList[i].id) { i++; }
				product = ProductList[i]
				//console.log(product)
				// Рисуем информацию о продукте
				$("#product").append('<h3>' + product.name + '</h3><br>' + 'Price: ' + product.pirce + '<br>' + product.description);
				//ul.listview("refresh");
				$("#menuproducts").hide();
				$("#product").show();
			}
		},
		// Чистим все и переходим в главное меню
		homemenu: function () {
			while(CategoriesList.length > 0) { CategoriesList.pop(); };
			while(ProductList.length > 0) { ProductList.pop(); };
			$("#menuproducts").empty();
			$("#product").empty();
			$("#menucategories").show();


		},
		// Кнопка "назад"
		backbutton: function() {
			$(document).ready(function(){
				$("#back").click(function(){
					parent.history.back();
				});
			});
			
		}
	};
	MainPage['run'](); //Запустим процесс
})


// Настройки для связи с OpenCart RestAPI
apiKey = "123";
//apiPath = "127.0.0.1";
apiPath = "10.11.86.128";

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
	
	
	
