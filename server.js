const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var mysql = require("mysql2");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var connection = mysql.createConnection({
    host: "localhost",
    user: "kalyani",
    password: "kalyani@179",
    database: "pbldb"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql1 = "CREATE TABLE IF NOT EXISTS Brand(BrandID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,Name VARCHAR(255) NOT NULL,Description TEXT NULL DEFAULT NULL);"
    connection.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Table  brand created");
    });  
    var sql2 = "CREATE TABLE IF NOT EXISTS Category(CategoryID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,Name VARCHAR(255) NOT NULL,Description TEXT NULL DEFAULT NULL)"
    connection.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Table category created");
    });  
});


app.get("/",function(req,res){
    res.render("insert_view");
})

app.get("/insertTables",function(req,res){
    res.render("tables_list",{product:"insertProduct",category:"insertCategory",brand:"insertBrand",customer:"insertCustomer",order:"insertOrder",orderitem:"insertOrderitem",review:"insertReview",payment:"insertPayment"});
})

app.get("/viewTables",function(req,res){
    res.render("tables_list",{product:"viewProduct",category:"viewCategory",brand:"viewBrand",customer:"viewCustomer",order:"viewOrder",orderitem:"viewOrderitem",review:"viewReview",payment:"viewPayment"});
})

app.get("/insertProduct", function(req, res) {
    res.render("tables",{tableName:"PRODUCT",visibility:"hidden",error:"",post:"product",visibility1:"",visibility2:"",visibility3:"",visibility4:"",visibility5:"hidden",p1:"Product ID",p2:"Name",p3:"Description",p4:"Price",p5:"Stock Quantity",p6:"Category ID",p7:"Brand ID",p8:"",p9:"",n1:"ProductID",n2:"Name",n3:"Description",n4:"Price",n5:"StockQuantity",n6:"CategoryID",n7:"BrandID",n8:"",n9:""});
})

app.post("/product",function(req,res){
    const {ProductID,Name,Description,Price,StockQuantity,CategoryID,BrandID} = req.body;
    console.log(ProductID,Name,Description,Price,StockQuantity,CategoryID,BrandID);

    var sql = `INSERT INTO product VALUES('${ProductID}','${Name}','${Description}','${Price}','${StockQuantity}','${CategoryID}','${BrandID}')`;
    connection.query(sql, function (err, result) {
        if (err)  res.render("tables",{tableName:"PRODUCT",visibility:"",error:err.sqlMessage,post:"product",visibility1:"",visibility2:"",visibility3:"",visibility4:"",visibility5:"hidden",p1:"Product ID",p2:"Name",p3:"Description",p4:"Price",p5:"Stock Quantity",p6:"Category ID",p7:"Brand ID",p8:"",p9:"",n1:"ProductID",n2:"Name",n3:"Description",n4:"Price",n5:"StockQuantity",n6:"CategoryID",n7:"BrandID",n8:"",n9:""});
        else res.redirect("/insertTables");
    });
});

//TO VIEW PRODUCT TABLE

app.get("/viewProduct",function(req,res){
    connection.query("SELECT * FROM product", function (err, result, fields) {
        if (err) throw err;
        res.render("view_tables/product",{data:result});
    });
});

app.get("/insertCategory", function(req, res) {
    res.render("tables",{tableName:"CATEGORY",visibility:"hidden",error:"",post:"category",visibility1:"",visibility2:"hidden",visibility3:"hidden",visibility4:"hidden",visibility5:"hidden",p1:"Category ID",p2:"Name",p3:"Description",p4:"",p5:"",p6:"",p7:"",p8:"",p9:"",n1:"CategoryID",n2:"Name",n3:"Description",n4:"",n5:"",n6:"",n7:"",n8:"",n9:""});
});

app.post("/category",function(req,res){
    const {CategoryID,Name,Description} = req.body;
    var sql = `INSERT INTO category VALUES('${CategoryID}','${Name}','${Description}')`;
    connection.query(sql, function (err, result) {
        if (err)  res.render("tables",{tableName:"CATEGORY",visibility:"",error:err.sqlMessage,post:"category",visibility1:"",visibility2:"hidden",visibility3:"hidden",visibility4:"hidden",visibility5:"hidden",p1:"Category ID",p2:"Name",p3:"Description",p4:"",p5:"",p6:"",p7:"",p8:"",p9:"",n1:"CategoryID",n2:"Name",n3:"Description",n4:"",n5:"",n6:"",n7:"",n8:"",n9:""});
        else res.redirect("/insertTables");
    });
});

//TO VIEW CATEGORY TABLE

app.get("/viewCategory",function(req,res){
    connection.query("SELECT * FROM category", function (err, result, fields) {
        if (err) throw err;
        res.render("view_tables/category",{data:result});
    });
});


app.get("/insertBrand", function(req, res) {
    res.render("tables",{tableName:"BRAND",visibility:"hidden",error:"",post:"brand",visibility1:"",visibility2:"hidden",visibility3:"hidden",visibility4:"hidden",visibility5:"hidden",p1:"Brand ID",p2:"Name",p3:"Description",p4:"",p5:"",p6:"",p7:"",p8:"",p9:"",n1:"BrandID",n2:"Name",n3:"Description",n4:"",n5:"",n6:"",n7:"",n8:"",n9:""});
});

app.post("/brand",function(req,res){
    const {BrandID,Name,Description} = req.body;

    var sql = `INSERT INTO brand VALUES('${BrandID}','${Name}','${Description}')`;
    connection.query(sql, function (err, result) {
        if (err)    res.render("tables",{tableName:"BRAND",visibility:"",error:err.sqlMessage,post:"brand",visibility1:"",visibility2:"hidden",visibility3:"hidden",visibility4:"hidden",visibility5:"hidden",p1:"Brand ID",p2:"Name",p3:"Description",p4:"",p5:"",p6:"",p7:"",p8:"",p9:"",n1:"BrandID",n2:"Name",n3:"Description",n4:"",n5:"",n6:"",n7:"",n8:"",n9:""});
        else res.redirect("/insertTables");
    });
})

// TO VIEW BRAND TABLE

app.get("/viewBrand",function(req,res){
    connection.query("SELECT * FROM brand", function (err, result, fields) {
        if (err) throw err;
        res.render("view_tables/brand",{data:result});
    });
})

app.get("/insertCustomer", function(req, res) {
    res.render("tables",{tableName:"CUSTOMER",visibility:"hidden",error:"",post:"customer",visibility1:"",visibility2:"",visibility3:"",visibility4:"hidden",visibility5:"hidden",p1:"Customer ID",p2:"First Name",p3:"Last Name",p4:"Email",p5:"Phone Number",p6:"Address",p7:"",p8:"",p9:"",n1:"CustomerID",n2:"FirstName",n3:"LastName",n4:"Email",n5:"PhoneNumber",n6:"Address",n7:"",n8:"",n9:""});
})

app.post("/customer",function(req,res){
    const {CustomerID,FirstName,LastName,Email,PhoneNumber,Address} = req.body;

    var sql = `INSERT INTO customer VALUES('${CustomerID}','${FirstName}','${LastName}','${Email}','${PhoneNumber}','${Address}')`;
    connection.query(sql, function (err, result) {
        if (err)   res.render("tables",{tableName:"CUSTOMER",visibility:"",error:err.sqlMessage,post:"customer",visibility1:"",visibility2:"",visibility3:"",visibility4:"hidden",visibility5:"hidden",p1:"Customer ID",p2:"First Name",p3:"Last Name",p4:"Email",p5:"Phone Number",p6:"Address",p7:"",p8:"",p9:"",n1:"CustomerID",n2:"FirstName",n3:"LastName",n4:"Email",n5:"PhoneNumber",n6:"Address",n7:"",n8:"",n9:""});
        else res.redirect("/insertTables");
    });
})

//TO VIEW CUSTOMER TABLE

app.get("/viewCustomer",function(req,res){
    connection.query("SELECT * FROM customer", function (err, result, fields) {
        if (err) throw err;
        res.render("view_tables/customer",{data:result});
    });
})

app.get("/insertOrder", function(req, res) {
    res.render("tables",{tableName:"ORDER",visibility:"hidden",error:"",post:"order",visibility1:"",visibility2:"",visibility3:"",visibility4:"",visibility5:"",p1:"Order ID",p2:"Customer ID",p3:"OrderDate",p4:"Status",p5:"Shipping Address",p6:"Total Amount",p7:"Payment Method",p8:"Transaction ID",p9:"Tracking Number",n1:"OrderID",n2:"CustomerID",n3:"OrderDate",n4:"Status",n5:"ShippingAddress",n6:"TotalAmount",n7:"PaymentMethod",n8:"TransactionID",n9:"TrackingNumber"});
})

app.post("/order",function(req,res){
    const {OrderID,CustomerID,OrderDate,Status,ShippingAddress,TotalAmount,PaymentMethod,TransactionID,TrackingNumber} = req.body;

    var sql = `INSERT INTO orders VALUES('${OrderID}','${CustomerID}','${OrderDate}','${Status}','${ShippingAddress}','${TotalAmount}','${PaymentMethod}','${TransactionID}','${TrackingNumber}')`;
    connection.query(sql, function (err, result) {
        if (err)  res.render("tables",{tableName:"ORDER",visibility:"",error:err.sqlMessage,post:"order",visibility1:"",visibility2:"",visibility3:"",visibility4:"",visibility5:"",p1:"Order ID",p2:"Customer ID",p3:"OrderDate",p4:"Status",p5:"Shipping Address",p6:"Total Amount",p7:"Payment Method",p8:"Transaction ID",p9:"Tracking Number",n1:"OrderID",n2:"CustomerID",n3:"OrderDate",n4:"Status",n5:"ShippingAddress",n6:"TotalAmount",n7:"PaymentMethod",n8:"TransactionID",n9:"TrackingNumber"});
        else res.redirect("/insertTables");
    });
    
})

//TO VIEW ORDER TABLE

app.get("/viewOrder",function(req,res){
    connection.query("SELECT * FROM orders", function (err, result, fields) {
        if (err) throw err;
        res.render("view_tables/order",{data:result});
    });
})

app.get("/insertOrderitem", function(req, res) {
    res.render("tables",{tableName:"ORDER ITEM",visibility:"hidden",error:"",post:"orderitem",visibility1:"",visibility2:"",visibility3:"hidden",visibility4:"hidden",visibility5:"hidden",p1:"OrderItem ID",p2:"Order ID",p3:"Product ID",p4:"Quantity",p5:"SubTotal",p6:"",p7:"",p8:"",p9:"",n1:"OrderItemID",n2:"OrderID",n3:"ProductID",n4:"Price",n5:"Quantity",n6:"Subtotal",n7:"",n8:"",n9:""});
})

app.post("/orderitem",function(req,res){
    const {OrderItemID,OrderID,ProductID,Price,Quantity,Subtotal} = req.body;

    var sql = `INSERT INTO orderitem VALUES('${OrderItemID}','${OrderID}','${ProductID}','${Price}','${Quantity}','${Subtotal}')`;
    connection.query(sql, function (err, result) {
        if (err)  res.render("tables",{tableName:"ORDER ITEM",visibility:"",error:err.sqlMessage,post:"orderitem",visibility1:"",visibility2:"",visibility3:"hidden",visibility4:"hidden",visibility5:"hidden",p1:"OrderItem ID",p2:"Order ID",p3:"Product ID",p4:"Quantity",p5:"SubTotal",p6:"",p7:"",p8:"",p9:"",n1:"OrderItemID",n2:"OrderID",n3:"ProductID",n4:"Price",n5:"Quantity",n6:"Subtotal",n7:"",n8:"",n9:""});
        else res.redirect("/insertTables");
    });
})

//TO VIEW ORDERITEM TABLE

app.get("/viewOrderitem",function(req,res){
    connection.query("SELECT * FROM orderitem", function (err, result, fields) {
        if (err) throw err;
        res.render("view_tables/orderitem",{data:result});
    });
})

app.get("/insertReview", function(req, res) {
    res.render("tables",{tableName:"REVIEW",visibility:"hidden",error:"",post:"review",visibility:"hidden",error:"",visibility1:"",visibility2:"",visibility3:"",visibility4:"hidden",visibility5:"hidden",p1:"Review ID",p2:"Product ID",p3:"Customer ID",p4:"Rating",p5:"Comment",p6:"Date",p7:"",p8:"",p9:"",n1:"ReviewID",n2:"ProductID",n3:"CustomerID",n4:"Rating",n5:"Comment",n6:"Date",n7:"",n8:"",n9:""});
})

app.post("/review",function(req,res){
    const {ReviewID,ProductID,CustomerID,Rating,Comment,Date} = req.body;

    var sql = `INSERT INTO customer VALUES('${ReviewID}','${ProductID}','${CustomerID}','${Rating}','${Comment}','${Date}')`;
    connection.query(sql, function (err, result) {
        if (err)  res.render("tables",{tableName:"REVIEW",visibility:"",error:err.sqlMessage,post:"review",visibility:"hidden",error:"",visibility1:"",visibility2:"",visibility3:"",visibility4:"hidden",visibility5:"hidden",p1:"Review ID",p2:"Product ID",p3:"Customer ID",p4:"Rating",p5:"Comment",p6:"Date",p7:"",p8:"",p9:"",n1:"ReviewID",n2:"ProductID",n3:"CustomerID",n4:"Rating",n5:"Comment",n6:"Date",n7:"",n8:"",n9:""});
        else res.redirect("/insertTables");
    });
})

//TO VIEW REVIEW TABLE

app.get("/viewReview",function(req,res){
    connection.query("SELECT * FROM review", function (err, result, fields) {
        if (err) throw err;
        res.render("view_tables/review",{data:result});
    });
})
app.get("/insertPayment", function(req, res) {
    res.render("tables",{tableName:"PAYMENT",visibility:"hidden",error:"",post:"Payment",visibility1:"",visibility2:"",visibility3:"",visibility4:"hidden",visibility5:"hidden",p1:"Payment ID",p2:"Customer ID",p3:"Payment Date",p4:"Payment Method",p5:"Amount",p6:"Order ID",p7:"",p8:"",p9:"",n1:"PaymentID",n2:"CustomerID",n3:"PaymentDate",n4:"PaymentMethod",n5:"Amount",n6:"OrderID",n7:"",n8:"",n9:""});
})

app.post("/payment",function(req,res){
    const {PaymentID,CustomerID,PaymentDate,PaymentMethod,Amount,OrderID} = req.body;

    var sql = `INSERT INTO payment VALUES('${PaymentID}','${CustomerID}','${PaymentDate}','${PaymentMethod}','${Amount}','${OrderID}')`;
    connection.query(sql, function (err, result) {
        if (err)   res.render("tables",{tableName:"PAYMENT",visibility:"",error:err.sqlMessage,post:"Payment",visibility1:"",visibility2:"",visibility3:"",visibility4:"hidden",visibility5:"hidden",p1:"Payment ID",p2:"Customer ID",p3:"Payment Date",p4:"Payment Method",p5:"Amount",p6:"Order ID",p7:"",p8:"",p9:"",n1:"PaymentID",n2:"CustomerID",n3:"PaymentDate",n4:"PaymentMethod",n5:"Amount",n6:"OrderID",n7:"",n8:"",n9:""});
        else res.redirect("/insertTables");
        console.log("1 record inserted");
    });
})

//TO VIEW PAYMENT TABLE

app.get("/viewPayment",function(req,res){
    connection.query("SELECT * FROM payment", function (err, result, fields) {
        if (err) throw err;
        res.render("view_tables/payment",{data:result});
    });
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});

// npx tailwindcss -i ./src/input.css -o ./public/styles.css --watch