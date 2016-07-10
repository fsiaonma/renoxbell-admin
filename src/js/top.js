"use strict";

$((function() {
    return {
        init: function() {
            RA.CLOCK.start("clockPanel");

            $("#usernamePanel").html("欢迎您！" + "admin");

            $("#logoutBtn").linkbutton({   
                iconCls: "icon-ra-logout", 
                onClick: function(event) {
                    console.log("logout");
                }
            });  

            this._bindEvent();
        },

        _bindEvent: function() {

        }
    }
})().init());