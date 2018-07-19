	 function onSignIn(googleUser){
		 var profile=googleUser.getBasicProfile();
		 var name=profile.getName();
		 var email=profile.getEmail();
		 var profilepic=profile.getImageUrl();
				var obj={};
			 obj={
			 name:name,
			 email:email,
			 profilepic:profilepic
		 }
		 var request = new XMLHttpRequest();
			request.open('POST','/user');
			request.setRequestHeader('Content-type', 'application/json')
			request.send(JSON.stringify(obj));
			request.addEventListener('load',function (){
					 if(request.status===200)
					 {
							window.location="/speechtotext";
					 }
			 });
			}
			function signOut() {
			  gapi.load('auth2',function(){
					gapi.auth2.init().then(()=>{
						var auth2=gapi.auth2.getAuthInstance();
						auth2.signOut().then(function(){
							window.location="/";
						});
					});
				});
			}
