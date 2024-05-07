const express = require('express');
const mysql = require('mysql2');
// const cors = require('cors');
const jwt = require('jsonwebtoken');
// const { createConnection } = require('net');
// const config = require('config');
const jwtSecret = 'aditi@12';

//eyJhbGciOiJIUzI1NiJ9.Y0hGeQ.nj2LaAS4YJQO6QJZ-POGoT0aLrol847BASwxZJGtuRE


// token for riya    eyJhbGciOiJIUzI1NiJ9.Y21sNVlURXlNdz09.yQ_Z8mwJGtnAM1XqiLxdwIPGSjc3P1zR0NhIyvFHOZs
const app = express();
app.use(express.json());


const connectionString ={
    host : "localhost",
    port : 3306,
    database : "airbnb_db",
    user : "root",
    password : "manager"
};

// app.use(cors());

app.get("/airbnb",(request,response)=>{
    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `select * from user`;
    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");

        if(err==null)
            {
                console.log("successful")
                response.write(JSON.stringify(result));
                connection.end();
                response.end();
            }
        else{
            {
                console.log("fail")
            
                response.write(JSON.stringify(err));
                connection.end();
                response.end();
            }
        }
    })
})

app.post("/airbnb/registration",(request,response)=>{
    
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var email = request.body.email;
    var password = request.body.password;
    var phoneNumber = request.body.phoneNumber;
    // var isDeleted = request.body.isDeleted;

    const changedPassword = btoa(password);
    console.log(changedPassword);
    
    var connection = mysql.createConnection(connectionString);
    connection.connect();

    // let queryText  =  `insert into user values('${firstName}','${lastName}','${email}','${password}','${phoneNumber}')`;

    let queryText = `insert into user (firstName,lastName,email,password,phoneNumber,createdTimestamp) values ('${firstName}','${lastName}','${email}','${changedPassword}','${phoneNumber}',CURRENT_TIMESTAMP)`;
    // let queryValues = [firstName,lastName,email,password,phoneNumber];
        connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");
        console.log(queryText);
    if(err==null){


        response.write(JSON.stringify(result));
        connection.end();
        response.end();
    }
    else{

        response.write(JSON.stringify(err));
        connection.end();
        response.end();
    }
});

});

app.post("/airbnb/login",(request,response)=>{

    var email = request.body.email;
    var password = request.body.password;

    const changedPassword = btoa(password);

    var connection = mysql.createConnection(connectionString);
    connection.connect();
    console.log(changedPassword);


    let queryText = `select * from user where email = '${email}' and password = '${changedPassword}}'`;
    connection.query(queryText,(err,result)=>{
       response.setHeader("Content-Type","application/json");
       if(err == null){

        //const id = result[0].id; 
        const token = jwt.sign(changedPassword,jwtSecret);
        //response.write(JSON.stringify(token));
        response.send((token));
        response.write(JSON.stringify(result));
       
        connection.end();
        response.end();
       }else{
        response.write(JSON.stringify(err));
        connection.end();
        response.end();
       }
    }) ;
})

app.use((request,response,next)=>{
    
    const token = request.headers.authorization;

    if(token!=undefined){
        let dataInsideToken = jwt.verify(token,jwtSecret);
        console.log(dataInsideToken);
        next();
    }else{
        response.send("token not present");
    }
})

// app.use((req,res,next)=>{
//     var token=req.headers.authorization;
//     if(token!=undefined)
//         {
//             var datainsidetoken =jwt.verify(token,jwtSecret);
//             next();
//         }
//         else{
//             res.send("Token is invalid");

//         }
// })


app.get("/airbnb/profile",(request,response)=>{
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var phoneNumber = request.body.phoneNumber;
    var email = request.body.email;

    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `select firstName,lastName,phoneNumber,email from user `;
    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");
        if(err==null){
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else{
            response.write(JSON.stringify(err));
            connection.end();
            response.end();
        }
    });
})

app.put("/airbnb/profile/:id",(request,response)=>{
      var id = request.params.id;
      var firstName = request.body.firstName;
      var lastName = request.body.lastName;
      var phoneNumber = request.body.phoneNumber;

      var connection = mysql.createConnection(connectionString);
      connection.connect();

      let queryText = `update user set firstName='${firstName}',lastName='${lastName}',phoneNumber ='${phoneNumber}' where id = ${id}`;
      console.log(queryText);

      connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","applicaton/json");
        if(err==null){

            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else{

            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
      });


});

app.delete("/airbnb/profile/:id",(request,response)=>{
    var id = request.params.id;

    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `delete from user  where id = ${id}`;
    console.log(queryText);

    connection.query(queryText,(err,result)=>{
      response.setHeader("Content-Type","applicaton/json");
      if(err==null){

          response.write(JSON.stringify(result));
          connection.end();
          response.end();
      }
      else{

          response.write(JSON.stringify(result));
          connection.end();
          response.end();
      }
    });


});



/////////////////////PROPERTY fUNCTIONALITY/////////////////////

app.post("/property",(request,response)=>{
    var categoryId = request.body.categoryId;
    var title = request.body.title;
    var details= request.body.details;
    var address = request.body.address;
    var contactNo = request.body.contactNo;
    var ownerName = request.body.ownerName;
    var isLakeView = request.body.isLakeView;
    var isTV = request.body.isTV;
    var isAC = request.body.isAC;
    var isWifi = request.body.isWifi;
    var isMiniBar = request.body.isMiniBar;
    var isBreakfast = request.body.isBreakfast;
    var isParking = request.body.isParking;
    var guests  = request.body.guests;
    var bedrooms = request.body.bedrooms;
    var beds = request.body.beds;
    var bathrooms = request.body.bathrooms;
    var rent = request.body.rent;
    var profileImage = request.body.profileImage;

    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `insert into property (
        categoryId,
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
        profileImage,
        createdTimestamp
    ) values (
        '${categoryId}',
        '${title}',
        '${details}',
        '${address}',
        '${contactNo}',
        '${ownerName}',
        ${isLakeView},
        ${isTV},
        ${isAC},
        ${isWifi},
        ${isMiniBar},
        ${isBreakfast},
        ${isParking},
        ${guests},
        ${bedrooms},
        ${beds},
        ${bathrooms},
        ${rent},
        '${profileImage}',
        CURRENT_TIMESTAMP
        
    )`;

    // console.log(queryText);

    connection.query(queryText,(err,result)=>{

        response.setHeader("Content-Type","application/json");
        if(err == null){
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }else{
            response.write(JSON.stringify(err));
            connection.end();
            response.end();
        }
    });

})

app.get("/property",(request,response)=>{
    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `select * from property`;
    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");
        if( err == null){
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }else{
            response.write(JSON.stringify(err));
            connection.end();
            response.end();
        }
    })
})


//////////////////////Category Functionality///////////////////


app.post("/category",(request,response)=>{

    var title = request.body.title;
    var details = request.body.details;
    var image = request.body.image;

    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `insert into category(title,details,image) values('${title}','${details}','${image}')`;

    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");

        if(err == null){
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        
        }
        else{
            response.write(JSON.stringify(err));
            connection.end();
            response.end();
        }
    })
})


//////////////////BOOKING FUNCTIONALITY///////////////////

app.post("/booking",(request,response)=>{
    var propertyId = request.body.propertyId;
    var total = request.body.total;
    var fromDate = request.body.fromDate;
    var toDate = request.body.toDate;

    // const token = request.headers.authorization;
    // const dataOfToken =jwt.verify(token,jwtSecret);
    // const id = dataOfToken.id;

    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `insert into bookings(propertyId,total,fromDate,toDate) values (${propertyId},'${total}','${fromDate}','${toDate}') `;

    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");
        if(err == null){
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }else{
            response.write(JSON.stringify(err))
            connection.end();
            response.end();
        }
    })

})

app.get("/booking",(request,response)=>{
    var connection = mysql.createConnection(connectionString);
    connection.connect();


    let queryText = `select * from bookings`;

    connection.query(queryText,(err,result)=>{
        response.setHeader("Content-Type","application/json");

        if(err == null){
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }else{
            response.write(JSON.stringify(err));
            connection.end();
            response.end();
        }

    })
})

app.listen(9002, ()=>{console.log("server started....")});


