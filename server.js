"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(__dirname)); // 静态资源目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set("port", process.env.PORT || 3333); // 端口

if (require.main === module) {
    app.listen(app.get("port"), function() {
        console.log("[%s] pagium server listening on port %d",
            app.get("env").toUpperCase(), app.get("port"));
    });
}