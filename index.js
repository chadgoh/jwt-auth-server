const express = require('express'); 
const dotenv = require('dotenv'); 
const jwt = require('jsonwebtoken'); 
const cors = require('cors');

const app = express(); 

app.use(cors())

// Set up Global configuration access 
dotenv.config(); 

let PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
console.log(`Server is up and running on ${PORT} ...`); 
}); 

// Generating JWT 
app.post("/user/generateToken", (req, res) => { 
	// Validate User Here so can check for username/password or smth
	// Then generate JWT Token 

	let jwtSecretKey = process.env.JWT_SECRET_KEY; 

    //can use this data or even the username/pw
	let data = { 
		time: Date(), 
		userId: 1, 
	} 

	const token = jwt.sign(data, jwtSecretKey); 

	res.send(token); 
}); 

// Verification of JWT 
app.get("/user/validateToken", (req, res) => { 

    //Authorize by sending requests with Header key: Authorization, Value: Bearer: {token}
	
	let jwtSecretKey = process.env.JWT_SECRET_KEY; 

	try { 
		const token = req.header('Authorization').split(' ')[1]; 
        console.log(token)
		const verified = jwt.verify(token, jwtSecretKey); 
		if(verified){ 
			return res.send("Successfully Verified"); 
		}else{ 
			// Access Denied 
			return res.status(401).send(error); 
		} 
	} catch (error) { 
		// Access Denied 
		return res.status(401).send(error); 
	} 
});
