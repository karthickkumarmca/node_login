var express = require('express');
var router = express.Router();
const v = require('node-input-validator');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/check', function(req,res){
	try{
		var data = req.body;
		let validator = new v( req.body, {
	        username:'required|email',
	        password: 'required'
	    }); 
	    validator.check().then(function (matched) {
	        if (!matched) {
	        	var output = {status:199,error:validator.errors}
	            res.send(output);
	        }
	        else{
	        	var sqlquery = 'SELECT * from users where user_status=1 AND user_email="'+data.username+'" AND password="'+data.password+'"';
	        	console.log(sqlquery);
	        	req.app.locals.connection.query(sqlquery, function (error, results, fields) {
				  if (error) throw error;
				  console.log('The solution is: ', results[0]);
				  var output = {status:199,error:'Invalid user name password',data:{}}
				  if(results!= undefined && results.length>0){
				  	 var output = {status:200,message:'Successfully Login',data:results[0]}
				  }
				  res.send(output);
				});
	        }
	    });		
	}
	catch(e){
		console.log(e);
	}
	
});
router.get('/getData',function(req,res){
	var data =  (req.query.id)?parseInt(req.query.id):0;
	var sqlquery = 'SELECT * from users where user_id='+data;
	console.log(sqlquery);
	req.app.locals.connection.query(sqlquery, function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0]);
	  var output = {status:199,error:'Invalid user name password',data:{}}
	  if(results!= undefined && results.length>0){
	  	 var output = {status:200,message:'Successfully Login',data:results[0]}
	  }
	  res.send(output);
	});

});
router.post('/addData',function(req,res){
	var data = req.body;
	let validator = new v( req.body, {
	        user_email:'required|email',
	        password: 'required',
	        first_name: 'required',
	        last_name: 'required'
	    }); 
	    validator.check().then(function (matched) {
	        if (!matched) {
	        	var output = {status:199,error:validator.errors}
	            res.send(output);
	        }
	        else{
	        	var checkQuery = 'SELECT * from users where user_email="'+data.user_email+'"';
				console.log(checkQuery);
				req.app.locals.connection.query(checkQuery, function (error, results, fields) {
				  if (error) throw error;				  			  
				  if(results!= undefined && results.length>0){
				  	 var output = {status:199,message:'Already exist email try another'}
				  }
				  else{
				  		
						var sqlquery = 'INSERT INTO  users (first_name,last_name,user_email,password) Values ("'+data.first_name+'","'+data.last_name+'","'+data.user_email+'","'+data.password+'")';
						console.log(sqlquery);
						req.app.locals.connection.query(sqlquery,async function (error, results, fields) {
						  if (error) throw error;
						  	var LastId =  (results.insertId)?results.insertId:0;
						  	var output = {status:199,message:'Please try again..!'}
						  	if(LastId>0){
						  		var output = {status:200,message:'Successfully Added'}
						  		var mailOptions = {
								  from: 'xxxxxxxx@gmail.com',
								  to: data.user_email,
								  subject: 'Email  confimation',
								  text: '<a href="http://localhost/learn/signup2/#!/confirmation?id='+LastId+'">click here to continue ur login</a>'
								};
							  	try{						  		
							  		 req.app.locals.email.sendMail(mailOptions, function(error, info){
									 if (error){
										 console.log(error);
										 res.json({yo: 'error'});
										 res.send(output);
									 }else{
										 console.log('Message sent: ' + info.response);
										 res.send(output);
									 };});	
							  	}
							  	catch(e){
							  		console.log(e);
							  	}		
						  	}

						  	  
						});
				  }
				  res.send(output);
				});
	        	
	        }
	    });
	
})

module.exports = router;

