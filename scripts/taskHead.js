// var ref;
var authUserFacebook = function() {
var ref = new Firebase("https://taskhead.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if(error) {
			console.log("Error has occured", error);
		}
		else {
			var userRef = ref.child('users');
			userRef.push().set({
				uid: authData.uid,
				name: authData.facebook.displayName,
				access_token: authData.facebook.accessToken,
				username: authData.facebook.cachedUserProfile.last_name,
				picture: authData.facebook.profileImageURL,
				token: authData.token,
				created_at: Firebase.ServerValue.TIMESTAMP
			});
		}
	});
};

var testing = function() {
var ref = new Firebase("https://taskhead.firebaseio.com");

	console.log('checking for ref', ref);
	ref.child('users').once('value', function(snapshot) {
		console.log('just checking', ref.child('users').key());
	});
};