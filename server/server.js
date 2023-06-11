const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());
app.use(cors());
const jwt = require("jsonwebtoken");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "registration",
});
connection.connect();

//get all data
app.get("/getalldata", (req, res) => {
  connection.query(
    "SELECT id,username,useremail,userpassword,isverified,isactive FROM usertable",
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.json(results);
    }
  );
});
//get userdetails by id
app.get("/getalldata/:useremail", (req, res) => {
  connection.query(
    "SELECT id,useremail,userpassword,isverified,isActive FROM signup where useremail=?",
    [req.params.useremail],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.json(results);
    }
  );
});
//insert new user
app.post("/newuser", (req, res) => {
  let { username, useremail, userpassword } = req.body;
  let sql =
    "SELECT id,username,useremail,userpassword,isverified,isactive FROM usertable where useremail=?";
  connection.query(sql, [useremail], (err, results) => {
    if (err) {
      console.log(err);
    }
    
    else if (results.length > 0) {
      
      if (results?.[0].isverified == 0) {
        function generateToken(payload, secretKey, expiresIn) {
          return jwt.sign(payload, secretKey, { expiresIn });
        }
        const payload = { useremail: useremail, userpassword: userpassword };
        const secretKey = "your_secret_key";
        const expiresIn = "1h"; // Token expiration time (e.g., 1h for 1 hour)

        const token = generateToken(payload, secretKey, expiresIn);
        console.log("Generated token:", token);
        sendVerificationMail(token);
      } else {
        console.log("something went wrong");
      }
    } else {
      let sql =
        "insert into usertable (username,useremail,userpassword) values (?,?,?)";
      connection.query(
        sql,
        [username, useremail, userpassword],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          res.json(results);
        }
      );
    }
  });
});
//verification mail send function
function sendVerificationMail(token) {
  console.log(token);
  console.log("mail send");
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1d9c629a892e83",
      pass: "2344c5d90f8e19",
    },
  });
  const link = "http://localhost:4200/verify/";
  var mailOptions = {
    from: "roshinraj432@gmail.com",
    to: "roshinraj432@gmail.com",
    subject: "sending email to you",
    html: `
    <html>
    <body>
        <a href="${link + token}">verify</a>
    </body>
</html>
    `,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent:", info.response);
  });
}

//function to update isverified to 1
app.put("/updateIsverified", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(422).json({ message: "Invalid token" });
    }
    const email = decoded.useremail;
    console.log(email);
    let sql = "UPDATE usertable  SET isverified=?  WHERE useremail=?";
    connection.query(sql, [1, email], (err, results) => {
      if (err) {
        console.log(err);
      }
      // res.json(results);
      console.log("isverified updated");
    });
  });
});
app.listen(3000);
