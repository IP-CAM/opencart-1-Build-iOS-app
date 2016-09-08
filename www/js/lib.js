// Настройки для связи с OpenCart RestAPI
apiKey = "123";
//apiPath = "127.0.0.1";
apiPath = "ocm.lvovych.com";

// Взаимодействие с OpenCart RestAPI
var RestAPI = {
	getcategories: function (dataobj) {
		$.ajax({
			url: 'http://' + apiPath + ':80/index.php?route=extension/feed/rest_api/category&key=' + apiKey,
			datatype: 'json',
			method: 'GET',
			success: function (data) {
				var resp = JSON['parse'](data);
				if (resp['success'] != false){dataobj(resp);}
			}
		})
	},
	getproducts: function (catid,catname,objdata) {
		$.ajax({
			url: 'http://' + apiPath + ':80/index.php?route=extension/feed/rest_api/products&key=' + apiKey,
			datatype: "json",
			method: "GET",
			data: {'category' : catid},
			success: function (data) {
				var resp = JSON['parse'](data);
				if (resp['success'] != false){
					resp['category'] = new Object;
					resp['category'].id = catid;
					resp['category'].name = catname;
					//console.log(resp);
					objdata(resp);
				}
				
			}
		})
		
	},
	
}


// Базовый код от PhoneGap

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
   onDeviceReady(); 
} 

// настройки JQueryMobile
function OnMobileInit(){
   $.mobile.ajaxEnabled = false;
   //$.mobile.hashListeningEnabled = false;
   $.mobile.hashListeningEnabled = true; 
   $.mobile.defaultPageTransition = defaultTransition;
   $.mobile.defaultTransition = defaultTransition;
   //$.mobile.page.prototype.options.addBackBtn = false;
   $.mobile.page.prototype.options.addBackBtn = true;
}

/*
$( document ).on( "click", "#homecategories", function(){
			var list = "<ul><li>Item 1 i have a submenu" +
			"<ul><li>submenuitem</li><li>submenuitem2</li></ul>" +
			"<li>Item 2 i have no sub menu</li></ul>";
			$( "#homecontent" ).append( $( list ).listview({
				childPages: true,
				inset: true
			}));
		}); 
*/
