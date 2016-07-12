"use strict";

$((function() {
    return {
        init: function() {
            this._initToolBar();
            this._initGrid();
            this._initDialog();
            this._bindEvent();
        },

        _initToolBar: function() {
             $("#userListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
                    $("#userListAddOrEditDialog").dialog("open");
                    $("#userListUserName").textbox({readonly: false});
                    $("#userListNickName").textbox({readonly: false});
                }
            });
        },

        _initGrid: function() {
            $("#userListGrid").datagrid({
                border: false,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                rownumbers: true,
                url: RA.API_SERVER + RA.API.GET_USER_LIST,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#userListToolbar",
                columns: [[
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "username", title: "用户登录名", width: 200, align:"center"},
                    {field: "nickname", title: "用户姓名", width: 200, align: "center"},
                    {field: "_operate", title: "操作", align: "center", width: 200, formatter: function(val, row, index) {
                        var html = "";
                        html += "<a href='javascript:;' class='userListEditBtn' style='margin: 10px;'>修改</a>";
                        html += "<a href='javascript:;' class='userListDelBtn' style='margin: 10px;'>删除</a>";
                        return html;  
                    }}
                ]],
                onLoadSuccess: function() {
                    $("#userListGrid").datagrid("resize");
                }
            });
        },

        _initDialog: function() {
            var self = this;

            $("#userListAddOrEditDialog").dialog({
                title: "新增用户", 
                modal: true,
                closed: true,
                width: 500,
                height: 300,
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#userListAddOrEditForm").form("clear");
                },
                buttons: [{
                    text: "确认",
                    algin: "center",
                    iconCls: "icon-ok",
                    handler: function () {
                        if (!$("#userId").val()) {
                            self.addUser();
                        } else {
                            self.updateUser();
                        }
                    }
                }]
            });

            $("#userListUserName").textbox({
                width: 300,
                required: true
            });

            $("#userListNickName").textbox({
                width: 300,
                required: true
            });

            $("#userListPassword").textbox({
                width: 300,
                required: true
            });

            $("#userListPasswordConfirm").textbox({
                width: 300,
                required: true
            });
        },

        _bindEvent: function() {
            $("#userListGrid").parent().on('click', '.userListEditBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                var userName = rowDom.find('[field=username]').text();
                var userNickName = rowDom.find('[field=nickname]').text();

                $("#userListAddOrEditDialog").dialog("open");

                $("#userId").val(id);

                $("#userListUserName").textbox({readonly: true});
                $("#userListUserName").textbox("setText", userName);
                
                $("#userListNickName").textbox({readonly: true});
                $("#userListNickName").textbox("setText", userNickName); 
            });

            $("#userListGrid").parent().on('click', '.userListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '确定要删除选中用户吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_USER,
                            params: {
                                id: id
                            },
                            successFn: function(resp) {
                                $("#userListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除用户成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showError("删除用户失败: " + (err.msg? err.msg : ""));
                            }
                        });  
                    }
                })  
            });
        },

        addUser: function() {
            if ($("#userListPassword").val() != $("#userListPasswordConfirm").val()) {
                RA.MSG_TIP.showError("新增用户失败: 2次密码不一致!");
                return ;
            }
            RA.NET.formSubmit({
                formId: "userListAddOrEditForm",
                type: "post",
                url: RA.API.ADD_USER,
                successFn: function(resp) {
                    $("#projectListGrid").datagrid("reload");
                    $("#userListAddOrEditDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("添加用户成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("添加用户失败: " + (err.msg? err.msg : ""));
                }
            });
        },

        updateUser: function() {
            RA.NET.formSubmit({
                formId: "userListAddOrEditForm",
                type: "post",
                url: RA.API.UPDATE_USER,
                successFn: function(resp) {
                    $("#projectListGrid").datagrid("reload");
                    $("#userListAddOrEditDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("更新用户成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("更新用户失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());