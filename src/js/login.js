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

                if (!username) {
                    alert("请输入用户名");
                    return ;
                }

                if (!password) {
                    alert("请输入密码");
                    return ;
                }

                $.ajax({
                    type: "post",
                    url: "http://10.100.137.74:8000/api/login",
                    data: {
                        username: username,
                        password: password
                    },
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
                            localStorage.setItem("currentUser", username);
                            window.location.href = window.location.origin + "/index.html";
                        } else {
                            console.log(resp);
                            alert("登录失败");
                        }
                    },
                    error: function(err) {
                        console.log(err);
                        alert("登录失败");
                    }
                });
            });
        }
    }
})().init());