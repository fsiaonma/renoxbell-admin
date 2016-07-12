"use strict";

RA.NET = {
    logoutFilter: function(resp) {
        if (resp.status == "logout") {
            localStorage.setItem("currentUser", "");
            window.location.href = window.location.origin + "/login.html";
        }
    },

    request: function(requestObj) {
        var type = requestObj.type;
        var url = requestObj.url;
        var params = requestObj.params;
        var successFn = requestObj.successFn;
        var errorFn = requestObj.errorFn;

        $.ajax({
            type: type,
            url: RA.API_SERVER + url,
            data: params,
            dataType: "json",
            cache: false,
            beforeSend: function () {
                RA.loading.show();
            },
            complete: function() {
                RA.loading.hide();
            },
            success: function(resp) {
                if (resp.status == "success") {
                    if (typeof successFn === "function") {
                        successFn(resp);
                    } else {
                        console.log("successFn undefine");
                    }
                } else if (resp.status == "logout") {
                    localStorage.setItem("currentUser", "");
                    window.location.href = window.location.origin + "/login.html";
                } else {
                    if (typeof errorFn === "function") {
                        errorFn(resp);
                    } else {
                        console.log("errorFn undefine");
                    } 
                }
            },
            error: function(err) {
                if (typeof errorFn === "function") {
                    errorFn(err);
                } else {
                    console.log("errorFn undefine");
                }
            }
        });
    },

    formSubmit: function(requestObj) {
        var formId = requestObj.formId;
        var type = requestObj.type;
        var url = requestObj.url;
        var params = requestObj.params;
        var successFn = requestObj.successFn;
        var errorFn = requestObj.errorFn;

        if (!$("#" + formId).form("validate")) return ;

        RA.loading.show();
        $("#" + formId).ajaxSubmit({
            type: type,//提交类型
            dataType: "json",//返回结果格式
            url: RA.API_SERVER + url,//请求地址
            data: params,
            async: true,
            success: function (resp) {//请求成功后的函数
                RA.loading.hide();
                if (resp.status == "success") {
                    if (typeof successFn === "function") {
                        successFn(resp);
                    }
                } else if (resp.status == "logout") {
                    localStorage.setItem("currentUser", "");
                    window.location.href = window.location.origin + "/login.html";
                }  else {
                    if (typeof errorFn === "function") {
                        errorFn(err);
                    }
                }
            },
            error: function (err) {
                RA.loading.hide();
                if (typeof errorFn === "function") {
                    errorFn(err);
                }
            }
        });
    }
}