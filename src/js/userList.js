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
                    $("#userListAccount").textbox({readonly: false});
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
                // url: RA.API.GET_USER_LIST,
                data: [{
                    id: "id1",
                    param1: 1,
                    param2: 2
                }, {
                    id: "id2",
                    param1: 1,
                    param2: 2
                }],
                loadFilter: function(resp) {
                    return resp;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#userListToolbar",
                columns: [[
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "param1", title: "用户登录名", width: 200, align:"center"},
                    {field: "param2", title: "用户姓名", width: 200, align: "center"},
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
                    text: "确认上传",
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

            $("#userListAccount").textbox({
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
                var userAccount = rowDom.find('[field=param1]').text();
                var userNickName = rowDom.find('[field=param2]').text();

                $("#userListAddOrEditDialog").dialog("open");

                $("#userId").val(id);

                $("#userListAccount").textbox({readonly: true});
                $("#userListAccount").textbox("setText", userAccount);
                
                $("#userListNickName").textbox({readonly: true});
                $("#userListNickName").textbox("setText", userNickName); 
            });

            $("#userListGrid").parent().on('click', '.userListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '确定要删除选中视频吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_USER,
                            params: {
                                
                            },
                            successFn: function(resp) {
                                $("#userListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除用户成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showSuccess("删除用户失败");
                            }
                        });  
                    }
                })  
            });
        },

        addUser: function() {
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
                    RA.MSG_TIP.showError("添加用户失败");
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
                    RA.MSG_TIP.showError("更新用户失败");
                }
            });
        }
    }
})().init());