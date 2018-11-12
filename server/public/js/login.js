'use strict';
	function performLogin(){
		let username = document.getElementById('username').value;
		let password = document.getElementById('password').value;
		let usertypes = document.getElementsByName('usertype');
		let i;
		let usertype = null;
		for(i = 0; i < usertypes.length; i++){
			if(usertypes[i].checked){
				usertype = usertypes[i].value;
				break;
			}
		}
		if(i == usertypes.length) return alert('Please check a box');
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'  
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password,
				usertype: usertype
			})
		}).then(function (response){
			return response.json();
		}).then(function (res){
			if(!res.success){
				swal("Failed!", "Are you sure the credentials are correct? Try again", "error");
			}
			else{
				swal("Successful!", "Redirecting to dashboard...", "success");
				setTimeout(() => {
					window.location.href = '/';
				}, 2000);
			}
		}).catch(function (error){
			console.log(error);
		});
	}
	let loginButton = document.getElementById('login-button');
	loginButton.addEventListener('click', performLogin, false);