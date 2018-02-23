var userData = require('./userData.json')

module.exports = {

  // Get All Users, or All users with Key/Query Term
  getUsers: (req, res) => {
    let key = Object.keys(req.query)[0]
		switch(key){
			case undefined:
        // console.log(userData);
				return res.status(200).send(userData);
			case 'age':
				let age = userData.filter(user => user.age < req.query.age);
				return res.status(200).send(age);
			case 'lastname':
				let lastname = userData.filter(user => user.last_name === req.query.lastname);
				return res.status(200).send(lastname);
			case 'email':
				let email = userData.filter(user => user.email === req.query.email);
				return res.status(200).send(email);
      case 'favorites':
        let favorites = userData.filter(user => user.favorites.indexOf(req.query.favorites) != -1);
        return res.status(200).send(favorites);
			default:
        // console.log(userData);
        return res.status(200).send(userData);
		}
  },




  // Get User By ID
  getUserId: (req, res, next) => {
    for (var i=0; i < userData.length; i++){
      if (userData[i].id === Number(req.params.id)){
        // console.log(userData[i]);
        return res.status(200).send(userData[i]);
      }
    }
    return res.status(404).json(null);
  },



  // Get all Admin
	getAdmins: (req, res, next) => {
		var admin = [];
		for (var i=0; i < userData.length; i++){
			if ( userData[i].type === 'admin' ){
				admin.push(userData[i]);
			}
		}
		return res.status(200).send(admin);
	},


  // Get All Non Admin
	getNonadmins: (req, res, next) => {
		var nonadmins = [];
		for (var i=0; i < userData.length; i++){
			if ( userData[i].type != 'admin'){
				nonadmins.push(userData[i]);
			}
		}
		return res.status(200).send(nonadmins);
	},


  // Get User by type param
	getUserType: (req, res, next) => {
		var userType = req.params.type;
		var users = userData.filter(user => user.type === userType);

		return res.status(200).send(users);
	},


  // Update User of Specific ID
	updateUserByID: (req, res, next) => {
		for (var i=0; i < userData.length; i++){
			if ( userData[i].id == Number(req.params.id )){
				userData[i] = req.body;
			}
		}
		return res.status(200).send(userData);
	},


  // Add New User
	addUser: (req, res, next) => {
		var user = req.body;
		user.id = userData.length + 1;
		userData.push(user);

		return res.status(200).send(userData);
	},


  // Remove User
	removeUser: (req, res, next) => {
		for (var i=0; i < userData.length; i++){
			if ( userData[i].id === Number(req.params.id) ){
				userData.splice(i, 1);
			}
		}
		return res.status(200).send(userData);
	}
}
