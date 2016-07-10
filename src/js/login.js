"use strict";

$((function() {
    return {
        init: function() {
            this._bindEvent();
        },

        _bindEvent: function() {
            $("#loginSubmitBtn").on("click", function() {
                var username = $("#username").val();
                var password = $("#password").val();
            });
        }
    }
})().init());