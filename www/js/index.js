
$(document).ready(function(){
	var CategoriesList = [];
	var ProductList = [];
	var categorieshtml = '';
	MainPage = {
		// Инициализируем приложение
		run: function(){
			var GetMainPage = this;
			GetMainPage.applyhtmlstatobjects();
			GetMainPage.homepage();
			GetMainPage.cartpage();
			GetMainPage.orderspage();
			GetMainPage.aboutpage();
			GetMainPage.profile();
			//GetMainPage.applyproductmenu();
			//GetMainPage.applyproduct();
			//GetMainPage.homemenu();
			//GetMainPage.backbutton();
		},
		// Генерируем homepage
		homepage: function () {
			$("#homeheader").append('<h1>Acessorias</h1>');
			var categorieshtml = '';
			var ij = 0;			
			RestAPI['getcategories'](function(objc){
				if(objc['success'] != 'false'){
					CategoriesList = objc['categories'];
					for (var i = 0; i < CategoriesList.length; i++){
						RestAPI['getproducts'](CategoriesList[i].id, CategoriesList[i].name, function(objp,categorid){
							if(objp['success'] != 'false') {
								ProductList = objp['products'];
								if (objp['products'].length > 0){
									var productshtml = '';
									for (var j=0; j < objp['products'].length; j++) {
										productshtml += '<li><a id="'+ ProductList[j].id + '" onclick="MainPage[\'applyproduct\'](this.id)">' + ProductList[j].name + ' | ' + ProductList[j].price + '</a></li>';
									}
									categorieshtml += '<li>' + objp['category'].name + '<ul data-role="listview">' + productshtml + '</ul></li>';
								}
								else {
									categorieshtml += '<li class="ui-btn ui-btn-icon-right ui-icon-carat-r">' + objp['category'].name + '</li>';
									
								}
							}
							else {
								alert ("JSON: Ошибка получения категорий")
							}
							ij++;
							if (ij == CategoriesList.length) {
								//categorieshtml += '<ol id="homecategories" data-role="listview" data-child-pages="true">' + categorieshtml + '</ol>';
								$(categorieshtml).appendTo("#homecontent");
								$("#homecontent").listview({childPages: true, inset: true });

							};
						})
						
						
					}
					
				}
				else {
					alert ("JSON: Ошибка получения категорий")
				}
				
			})						
		},
		
		cartpage: function () {
			$("#cartheader").append('<h1>Shopping Cart</h1>');
		},
		orderspage: function () {
			$("#ordersheader").append('<h1>My orders</h1>');
		},
		aboutpage: function () {
			$("#aboutheader").append('<h1>About as</h1>');
		},
		profile: function () {
			$("#profileheader").append('<h1>User Setings</h1>');
		},
		
		// Прорисовуем на созданых страницах основные елементы Div, Navbar
		applyhtmlstatobjects: function () {
			var GetMainPage = this;
			
			document.body.innerHTML = '	<div data-role="page" id="home" data-theme="a" data-fullscreen="true"></div>\
										<div data-role="page" id="cart" data-theme="a" data-fullscreen="true"></div>\
										<div data-role="page" id="orders" data-theme="a" data-fullscreen="true"></div>\
										<div data-role="page" id="about" data-theme="a" data-fullscreen="true"></div>\
										<div data-role="page" id="profile" data-theme="a" data-fullscreen="true"></div>';
			
			// Прорисовуем основные div страницы home
			$("#home").append('	<div id="homeheader" data-role="header"></div>\
								<div id="homecontent" data-role="content"></div>\
								<div id="homefooter" data-role="navbar" data-position="fixed">\
									<ul id="navbarul">\
										<li><a id="navbarhome" href="#home" data-icon="home">home</a></li>\
										<li><a id="navbarcart" href="#cart" data-icon="shop">cart</a></li>\
										<li><a id="navbarcart" href="#orders" data-icon="shop">my orders</a></li>\
										<li><a id="navbarcart" href="#about" data-icon="info">about</a></li>\
										<li><a id="navbarcart" href="#profile" data-icon="gear">profile</a></li>\
									</ul>\
								</div>');
							
			// Прорисовуем основные div страницы cart
			$("#cart").append('	<div id="cartheader" data-role="header"></div>\
								<div id="cartcontent" data-role="content" class="ui-content"></div>\
								<div id="cartfooter" data-role="navbar" data-position="fixed">\
									<ul id="navbarul">\
										<li><a id="navbarhome" href="#home" data-icon="home">home</a></li>\
										<li><a id="navbarcart" href="#cart" data-icon="shop">cart</a></li>\
										<li><a id="navbarcart" href="#orders" data-icon="shop">my orders</a></li>\
										<li><a id="navbarcart" href="#about" data-icon="info">about</a></li>\
										<li><a id="navbarcart" href="#profile" data-icon="gear">profile</a></li>\
									</ul>\
								</div>');
								
			// Прорисовуем основные div страницы orders
			$("#orders").append('	<div id="ordersheader" data-role="header"></div>\
									<div id="orderscontent" data-role="content" class="ui-content"></div>\
									<div id="ordersfooter" data-role="navbar" data-position="fixed">\
										<ul id="navbarul">\
										<li><a id="navbarhome" href="#home" data-icon="home">home</a></li>\
										<li><a id="navbarcart" href="#cart" data-icon="shop">cart</a></li>\
										<li><a id="navbarcart" href="#orders" data-icon="shop">my orders</a></li>\
										<li><a id="navbarcart" href="#about" data-icon="info">about</a></li>\
										<li><a id="navbarcart" href="#profile" data-icon="gear">profile</a></li>\
										</ul>\
									</div>');
												
			// Прорисовуем основные div страницы about
			$("#about").append('	<div id="aboutheader" data-role="header"></div>\
									<div id="aboutcontent" data-role="content" class="ui-content"></div>\
									<div id="aboutfooter" data-role="navbar" data-position="fixed">\
										<ul id="navbarul">\
										<li><a id="navbarhome" href="#home" data-icon="home">home</a></li>\
										<li><a id="navbarcart" href="#cart" data-icon="shop">cart</a></li>\
										<li><a id="navbarcart" href="#orders" data-icon="shop">my orders</a></li>\
										<li><a id="navbarcart" href="#about" data-icon="info">about</a></li>\
										<li><a id="navbarcart" href="#profile" data-icon="gear">profile</a></li>\
										</ul>\
									</div>');
									
			// Прорисовуем основные div страницы profile
			$("#profile").append('	<div id="profileheader" data-role="header"></div>\
									<div id="profilecontent" data-role="content" class="ui-content"></div>\
									<div id="profilefooter" data-role="navbar" data-position="fixed">\
										<ul id="navbarul">\
										<li><a id="navbarhome" href="#home" data-icon="home">home</a></li>\
										<li><a id="navbarcart" href="#cart" data-icon="shop">cart</a></li>\
										<li><a id="navbarcart" href="#orders" data-icon="shop">my orders</a></li>\
										<li><a id="navbarcart" href="#about" data-icon="info">about</a></li>\
										<li><a id="navbarcart" href="#profile" data-icon="gear">profile</a></li>\
										</ul>\
									</div>');
				

		},
		
		/*
		profile: function () {
			var GetMainPage = this;
			$("#mainpage").hide();
			$("#profilepage").show();
			//$("#product").hide();
			
			
			$("#content").append('<div id="profile" data-role="content" class="ui-content"></div>');
			//$("#content").append('<h3>Sign Up</h3>');
			$("#content").append('<fieldset id="account"><h3>Основные данные</h3>\
          <div class="form-group required" style="display: none;">\
	          <label class="col-sm-2 control-label">Направление бизнеса</label>\
	          <div class="col-sm-10">\
		          <div class="radio">\
			          <label><input type="radio" name="customer_group_id" value="1" checked="checked">Default</label>\
			      </div>\
              </div>\
          </div>\
          <div class="form-group required">\
			<label class="col-sm-2 control-label" for="input-firstname">Имя</label>\
			<div class="col-sm-10">\
				<input type="text" name="firstname" value="" placeholder="Имя" id="input-firstname" class="form-control">\
			</div>\
          </div>\
          <div class="form-group required">\
            <label class="col-sm-2 control-label" for="input-lastname">Фамилия</label>\
            <div class="col-sm-10">\
              <input type="text" name="lastname" value="" placeholder="Фамилия" id="input-lastname" class="form-control">\
                          </div>\
          </div>\
          <div class="form-group required">\
            <label class="col-sm-2 control-label" for="input-email">E-Mail</label>\
            <div class="col-sm-10">\
              <input type="email" name="email" value="" placeholder="E-Mail" id="input-email" class="form-control">\
                          </div>\
          </div>\
                  </fieldset>');
            $("#content").append('<fieldset><h3>Ваш пароль</h3>\
          <div class="form-group required">\
            <label class="col-sm-2 control-label" for="input-password">Пароль</label>\
            <div class="col-sm-10">\
              <input type="password" name="password" value="" placeholder="Пароль" id="input-password" class="form-control">\
                          </div>\
          </div>\
          <div class="form-group required">\
            <label class="col-sm-2 control-label" for="input-confirm">Подтверждение пароля</label>\
            <div class="col-sm-10">\
              <input type="password" name="confirm" value="" placeholder="Подтверждение пароля" id="input-confirm" class="form-control">\
                          </div>\
          </div>\
</fieldset>');
			$("#content").append('<div class="buttons"><div class="pull-right">Я прочитал <a href="http://ocm.lvovych.com/index.php?route=information/information/agree&amp;information_id=3" class="agree"><b>Privacy Policy</b></a> и согласен с условиями<input type="checkbox" name="agree" value="1">&nbsp;<input type="submit" value="Продолжить" class="btn btn-primary"></div></div>');	
			
			$('#content').append('	<div id="profile" data-role="content">\
										<form action="process.cfm" method="post">\
											<fieldset data-role="fieldcontain">\
												<label for="username">Username:</label><input type="text" name="username" id="username">\
											</fieldset>\
											<fieldset data-role="fieldcontain">\
												<label for="password">Password:</label><input type="password" name="password" id="password">\
											</fieldset>\
											<fieldset data-role="fieldcontain">\
												<label for="password2">Confirm Password:</label><input type="password" name="password2" id="password2">\
											</fieldset>\
											<fieldset data-role="fieldcontain">\
												<label for="email">Email:</label><input type="email" name="email" id="email">\
											</fieldset>\
											<fieldset data-role="fieldcontain">\
												<label for="hometown">Home Town:</label><input type="text" name="hometown" id="hometown">\
											</fieldset>\
											<input type="submit" value="Register">\
										</form>\
									</div>');
					
			
			
		},
		*/

	};
	MainPage['run'](); //Запустим процесс
	
}),300000

	
	
	
