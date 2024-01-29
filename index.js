
const express = require("express");
const cors = require("cors");
const app = express();
const mySql = require("mysql");
const port = process.env.PORT || 9000;

app.use(cors({
    origin :'https://mirastodo.netlify.app/',
    credentials: true
}
   

));
app.use(express.json());

var con = mySql.createConnection({
    host: "localhost",
    user: "root",
    database: "toList"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/api/getTask", function (req, res) { 
    // var sql = "SELECT * FROM tasks";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.json(result);
    // });
    res.json({message:"hello"})
});

app.post("/api/addTask", function (req, res) {
    var task = req.body.taskName;
    var status = req.body.taskStatus;

    var sql = "INSERT INTO tasks (taskName,taskStatus) VALUES (?,?)";
    con.query(sql, [task,status], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
})

app.post("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
    console.log(req.body.message);
});

app.post("/api/deleteTask", (req, res) => {

    var id = req.body.taskId;
    var sql = "DELETE FROM tasks WHERE id ="+id;
     con.query(sql, function(err,result){
        if (err) throw err;
        console.log(result);
        res.json(result);
     })
})


app.listen(port, () => {
    console.log(`Server is running on port 9000.`);
});