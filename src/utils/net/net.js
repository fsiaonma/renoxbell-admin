"use strict";

RA.NET = {
    request: function(requestObj) {
        var type = requestObj.type;
        var url = requestObj.url;
        var params = requestObj.params;
        var successFn = requestObj.successFn;
        var errorFn = requestObj.errorFn;

        $.ajax({
            type: type,
            url: url,
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
                if (typeof successFn === "function") {
                    successFn(resp);
                } else {
                    console.log("successFn undefine");
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
        $("#" + formId).form("submit", {
            method: type,
            url: url,
            queryParams: params,
            success: function(resp) {
                RA.loading.hide();
                if (typeof successFn === "function") {
                    successFn(resp);
                }
            },
            error: function(err) {
                RA.loading.hide();
                if (typeof errorFn === "function") {
                    errorFn(err);
                }
            }
        });
    }
}