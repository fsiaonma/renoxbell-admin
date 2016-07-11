"use strict";

$((function() {
    return {
        init: function() {
            RA.CLOCK.start("clockPanel");

            $("#usernamePanel").html("欢迎您！" + localStorage.getItem("currentUser"));

            $("#logoutBtn").linkbutton({   
                iconCls: "icon-ra-logout", 
                onClick: function(event) {
                    RA.NET.request({
                        type: "post",
                        url: RA.API.LOGOUT,
                        successFn: function(resp) {
                            localStorage.setItem("currentUser", "");
                            window.location.href = window.location.origin + "/login.html";
                        },
                        errorFn: function(err) {
                            RA.MSG_TIP.showSuccess("注销失败");
                        }
                    });
                }
            });  

            this._bindEvent();
        },

        _bindEvent: function() {

        }
    }
})().init());