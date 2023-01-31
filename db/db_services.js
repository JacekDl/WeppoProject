async function login_user(username,password){
	if(username == password){
		if(username == 'admin' || username == 'sauron'||username == 'saruman')
		{
			return { username: username,userid: 1,role: 'admin'};
		}
		return { username: username,userid: 2,role: 'user'};
	} else {
		return null;
	}
}

module.exports = {
	login_user
}