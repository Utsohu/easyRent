
function Login() {
	var UserHandle=GetSendObj();
	var user = document.getElementById("user_input");
	var pass = document.getElementById("pass_input");
	UserHandle.onreadystatechange = function() {
		if(UserHandle.readyState==4) {
			if(UserHandle.status==401) {
				var info = document.getElementById("login_info");
				info.innerHTML = UserHandle.responseText;
			}
			else if(UserHandle.status == 200) {
				var json = JSON.parse(UserHandle.responseText);
				if(json.status == 'success') {
					g_currentUser.name = json.name
					g_currentUser.id = json.id
					window.location.replace("index.html");
					document.cookie = "username=" + json.name + ";max-age-120";
					document.cookie = "userid=" + json.id + ";max-age-120";
				}
				else {
					var info = document.getElementById("login_info");
					alert("User name or password incorrect");
					info.innerHTML = json.reason;
				}
			}
		}
	}

	UserHandle.open("post","/checkUser");
	UserHandle.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var data = {
		username: user.value,
		password: pass.value
	};
	UserHandle.send(JSON.stringify(data));
}

function ShowRegister(){
	window.location.replace("register.html");
}

function Register() {
	//window.location.replace("register.html");
	var UserHandle=GetSendObj();
	var user = document.getElementById("user_input");
	var pass = document.getElementById("pass_input");
	var confirm_pass = document.getElementById("confirm_pass_input");
	var phone_number = document.getElementById("phone_number_input");
	var age = document.getElementById("age_input");
	var gender = document.getElementById("gender_input");
	var email = document.getElementById("user_email_input");
	var title = document.getElementById("user_title_input");
	var content = document.getElementById("user_content_input");
	if(user.value == ""){
		alert("Username field cannot be empty");
		return;
	}
	else if(pass.value == ""){
		alert("Password field cannot be empty");
		return;
	}
	else if(confirm_pass.value == ""){
		alert("Confirm password field cannot be empty");
		return;
	}
	else if(!(pass.value == confirm_pass.value)){
		alert("Password must be the same as confirm password");
		return;
	}
	else if(phone_number.value == ""){
		alert("Phone number field cannot be empty");
		return;
	}
	else if(age.value == ""){
		alert("Age field cannot be empty");
		return;
	}
	if(pass.value.length <= 5){
		alert("Password must be longer than 5 character spaces");
		return;
	}
	else if(pass.value.length > 20){
		alert("Password must be shorter than or equal to 20 character spaces");
		return;
	}
	//add other ifs here....
	UserHandle.onreadystatechange = function() {
		if(UserHandle.readyState==4) {
			if(UserHandle.status==401) {
				var info = document.getElementById("login_info");
				info.innerHTML = UserHandle.responseText;
			}
			else if(UserHandle.status == 200) {
				var json = JSON.parse(UserHandle.responseText);
				if(json.status == 'success') {
					g_currentUser = user;
					window.location.replace("index.html");
				}
				else {
					var info = document.getElementById("login_info");
					info.innerHTML = json.reason;
				}
			}
		}
	}

	UserHandle.open("post","/registerUser");
	UserHandle.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var data = {
		username: user.value,
		password: pass.value,
		phone_number : phone_number.value,
		age : Number(age.value),
		gender : gender.selectedIndex,
		email : email.value,
		headicon : getImageData("user_picture_preview"),
		title: title.value,
		content: content.value
		//add other variables... and check name
	};
	UserHandle.send(JSON.stringify(data));
}



