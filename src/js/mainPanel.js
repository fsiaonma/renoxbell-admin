"use strict";

$((function() {
    return {
        init: function() {
            $("#mainPanel").tabs({    
                border: false,    
                fit: true
            });  

            $('#mainPanel').tabs('add', {    
                id: "default",
                title: "系统首页",    
                closable: false,
                icon: "icon-ra-home",    
                href: "src/templates/default.html"  
            }); 

            this._bindEvent();
        },

        _bindEvent: function() {

        }
    }
})().init());