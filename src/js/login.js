"use strict";

$((function() {
    return {
        init: function() {
            this._bindEvent();
        },

        _bindEvent: function() {
            $("#resetBtn").on("click", function() {
                $("#username").val("");
                $("#password").val("");
            });

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

                // RA.loading.show();
                // $('#loginForm').form('submit', {
                //     url: "http://10.100.137.74:8000/api/login",
                //     method: 'post',
                //     type: "json",
                //     async: true,
                //     success: function (resp) {
                //         RA.loading.hide();
                //         if (resp.status == "success") {
                //             localStorage.setItem("currentUser", username);
                //             window.location.href = window.location.origin + "/index.html";
                //         } else {
                //             console.log(resp);
                //             alert("登录失败");
                //         }
                //     },
                //     error: function(err) {
                //         RA.loading.hide();
                //         console.log(err);
                //         alert("登录失败");
                //     }
                // });

                RA.loading.show();
                setTimeout(function() {
                    RA.loading.hide();
                    localStorage.setItem("currentUser", username);
                    window.location.href = window.location.origin + "/index.html";
                }, 1000);

                return ;

                RA.loading.show();
                $.ajax({
                    type: "post",//提交类型
                    dataType: "json",//返回结果格式
                    url: "http://api.renoxbell.com/api/login", //请求地址
                    data: {
                        username: username,
                        password: password
                    },
                    async: true,
                    success: function (resp) {//请求成功后的函数
                        RA.loading.hide();
                        if (resp.status == "success") {
                            localStorage.setItem("currentUser", username);
                            window.location.href = window.location.origin + "/index.html";
                        } else {
                            console.log(resp);
                            alert(resp.msg);
                        }
                    },
                    error: function (err) {
                        RA.loading.hide();
                        console.log(err);
                        alert("登录失败");
                    }
                });
            });
        }
    }
})().init());