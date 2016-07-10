"use strict";

$((function() {
    return {
        init: function() {
            
            this._initHTML();
            this._initMenu();
            this._initBtns();

            this._bindEvent();
        },

        _initHTML: function() {
            var menuHTML = "";
            for (var i = 0, len = RA.menuConf.length; i < len; ++i) {
                var mConf = RA.menuConf[i];

                if (i == 0) {
                    menuHTML += '<div title="' + mConf.title + '" data-options="selected:true" style="text-align: center;">';
                } else {
                    menuHTML += '<div title="' + mConf.title + '" style="text-align: center;">';
                }

                for (var j = 0, jLen = mConf.children.length; j < jLen; ++j) {
                    var mConfChild = mConf.children[j];
                    menuHTML += '<a id="' + mConfChild.id +'Btn" href="javascript:void(0);" style="width: 180px; margin-top: 5px;">' + mConfChild.title + '</a>';
                }

                menuHTML += '</div>';    
            }
            $("#menuPanel").html(menuHTML);
        },

        _initMenu: function() {
            $('#menuPanel').accordion({    
                animate: false   
            });
        },

        _initBtns: function() {
            for (var i = 0, len = RA.menuConf.length; i < len; ++i) {
                var mConf = RA.menuConf[i];
                for (var j = 0, jLen = mConf.children.length; j < jLen; ++j) {
                    var mConfChild = mConf.children[j];
                    (function(mcc) {
                        $("#" + mcc.id + "Btn").linkbutton({   
                            iconCls: mcc.icon? mcc.icon : "", 
                            onClick: function(event) {
                                if (!$("#mainPanel").tabs("exists", mcc.title)) {
                                    $('#mainPanel').tabs('add', {    
                                        id: mcc.id + "Tab",
                                        title: mcc.title,
                                        closable: true,   
                                        iconCls: mcc.icon? mcc.icon : "", 
                                        href: mcc.href
                                    });  
                                } else {
                                    $("#mainPanel").tabs("select", mcc.title);
                                }
                            }
                        });  
                    })(mConfChild);
                }
            }
        },

        _bindEvent: function() {

        }
    }
})().init());