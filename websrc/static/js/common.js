	var g_currentUser = {
		"name":"",
		"id":0,
	};
	var LIST_PROVINCE = [
		"Alberta",
		"British Columbia",
		"Manitoba",
		"New Brunswick",
		"Newfoundland & Labrador",
		"Nova Scotia",
		"Ontario",
		"Prince Edward Island",
		"Quebec",
		"Saskatchewan",
	];
	var LIST_PRICE = [
		"less than $1000",
		"$1000 to $2500",
		"$2500 to $5000",
		"$5000 to $10000",
		"more than $10000",
	];
	var LIST_PRICE_INTEGER = [
		0,
		1000,
		2500,
		5000,
		10000,
		12500,
	]
	var LIST_DECORATION = [
		"normal",
		"low",
		"high",
		"extremely high",
	];
	var LIST_ROOM = [
		"1 bedroom",
		"2 bedrooms",
		"3-4 bedrooms",
		"more than 4 bedrooms",
	];
	var LIST_TYPE_RENT = [
		"Seek Rent",
		"For Rent",
		"Sublet",
	];
	var LIST_HOUSE_TYPE = [
		"Detached",
		"Semi-Detached",
		"Townhouse",
		"Property",
		"Condominium",
	];
	var opts = {
		lines: 13, // The number of lines to draw
		length: 38, // The length of each line
		width: 17, // The line thickness
		radius: 45, // The radius of the inner circle
		scale: 1, // Scales overall size of the spinner
		corners: 1, // Corner roundness (0..1)
		speed: 1, // Rounds per second
		rotate: 0, // The rotation offset
		animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#96d036', // CSS color or array of colors
		fadeColor: 'transparent', // CSS color or array of colors
		top: '50%', // Top position relative to parent
		left: '50%', // Left position relative to parent
		shadow: '0 0 1px transparent', // Box-shadow for the lines
		zIndex: 2000000000, // The z-index (defaults to 2e9)
		className: 'spinner', // The CSS class to assign to the spinner
		position: 'absolute', // Element positioning
	};
	var spinner = new Spin.Spinner(opts);

	function GetSendObj(){
		var xmlHttp;
		try {
			xmlHttp=new XMLHttpRequest();
		}
		catch(e){
			try{
				xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e){
				try{
					xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e){
					alert("Your browser does not support Ajax!");
					return false;
				}
			}
		}
		return xmlHttp;
	}

	function GetUserFromCookie() {
		let cookiesArr = document.cookie.split("; ");
		for (let i = 0; i< cookiesArr.length; i++) {
			let cookiePair = cookiesArr[i].split("=");
			let cookieName = cookiePair[0];
			let cookieValue = cookiePair[1];
			if (cookieName === "username") {
				g_currentUser.name = cookieValue;
			}
			else if (cookieName === "userid") {
				g_currentUser.id = cookieValue;
			}
		}
	}
	function showUser(){
		//g_currentUser.name = "Hello"
		var current_user_name = g_currentUser.name;
		var user_name = document.getElementById("current_user_name");
		var login_button = document.getElementById("login_or_exit");
		user_name.innerHTML = current_user_name;
		if(current_user_name == ""){
			login_button.innerHTML = "Login<i class='lnr lnr-arrow-right'></i>";
		}
		else{
			login_button.innerHTML = "Exit Login<i class='lnr lnr-arrow-right'></i>";
		}
	}

	function onLoginClick(){
		if(g_currentUser.name == ""){
			window.location.replace("login.html");
		}
		else{
			g_currentUser.name = "";
			g_currentUser.id = 0;
			document.cookie = "username=" + g_currentUser.name + ";max-age-120";
			document.cookie = "userid=" + g_currentUser.id + ";max-age-120";
			window.location.replace("index.html");
		}
	}

	function DoSearch(condition,starts,rows,fun,houseCondition = "",searchContent = ""){
		var UserHandle=GetSendObj();
		var data={
			condition : condition,
			houseCondition : houseCondition,
			searchContent : searchContent,
			starts : starts,
			rows : rows
		};
		UserHandle.onreadystatechange = function() {
			if(UserHandle.readyState==4) {
				if(UserHandle.status==401) {
					spinner.spin();
					return;
				}
				else if(UserHandle.status == 200) {
					spinner.spin();
					var json = JSON.parse(UserHandle.responseText);
					if(json.status == 'success') {
						fun(json.data);
					}
					else {
						return;
					}
				}
			}
		}
		UserHandle.open("post","/searchHouse");
		UserHandle.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		var con = document.getElementById("mainshow")
		spinner.spin(con);
		UserHandle.send(JSON.stringify(data));
	}

	function changeURLArg(url,arg,arg_val){
		var pattern=arg+'=([^&]*)';
		var replaceText=arg+'='+arg_val;
		if(url.match(pattern)){
			var tmp='/('+ arg+'=)([^&]*)/gi';
			tmp=url.replace(eval(tmp),replaceText);
			return tmp;
		}else{
			if(url.match('[\?]')){
				return url+'&'+replaceText;
			}else{
				return url+'?'+replaceText;
			}
		}
	}

	function addPicture(fileinput, container) {
		const fileInput = document.getElementById(fileinput);
		const previewContainer = document.getElementById(container);
		
		// 当文件选择改变时触发事件
		fileInput.addEventListener('change', function(e) {
		// 获取选择的文件
			const file = e.target.files[0];
		
		// 创建 FileReader 对象
			const reader = new FileReader();
		
		// 当 FileReader 加载完成时触发事件
			reader.onload = function() {
			// 创建一个图片元素
				var img = previewContainer.querySelector('img');
				if(img==null) {
					img = document.createElement('img');
					// 将图片元素添加到预览容器中
					previewContainer.appendChild(img);
				}
			// 设置图片的 src 属性为 FileReader 读取的结果
				img.src = reader.result;
			};
		
		// 读取文件
			reader.readAsDataURL(file);
		});
	}
	
	function getImageData(container) {
		const previewContainer = document.getElementById(container);
		if(previewContainer==null) return '';
		// 获取预览容器中的图片元素
		const img = previewContainer.querySelector('img');
		if(img==null) return '';
		// 获取图片的 base64 编码字符串
		const base64Data = img.src.split(',')[1];
		return base64Data;
		// 这里可以将 base64 编码字符串发送到服务器进行处理
		// ...
	}

	function PostInformation() {
		if(g_currentUser.name == "") {
			alert("Please Login First!");
			return;
		}
		window.location.replace("create_info.html");
	}

	function ShowDetail(id){
		var url = "property_show.html";
		url = changeURLArg(url, 'id', id.id);
		window.location.replace(url);
	}

	window.onscroll=function(){
		document.getElementById("mainshow").style.top=(document.documentElement.scrollTop+
			(document.documentElement.clientHeight-document.getElementById("mainshow").offsetHeight)/2)+"px";
		document.getElementById("mainshow").style.left=(document.documentElement.scrollLeft+
			(document.documentElement.clientWidth-document.getElementById("mainshow").offsetWidth)/2)+"px";
    }

