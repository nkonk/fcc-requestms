var express = require("express");
var app = express();

app.use("/",function(req,resp){
    var remIp = req.headers["x-forwarded-for"];//coz c9 is behind proxy
    var lang = req.headers["accept-language"].split(",")[0];//grab the first bit of accep lang header which is the lan we want
    var exp = /\(.*\)/;
    var softStr = req.headers["user-agent"].match(exp)[0] || "";
    var soft = softStr.slice(1,softStr.length-1) || "";
    var software = soft || req.headers["user-agent"];
    
    resp.send({"ipaddress": remIp,"language":lang,"software":software});
});

app.listen(8080);