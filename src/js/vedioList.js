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
             $("#vedioListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
                    $("#vedioListAddOrEditDialog").dialog("open");
                }
            });
        },

        _initGrid: function() {
            $("#vedioListGrid").datagrid({
                border: false,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                rownumbers: true,
                url: RA.API_SERVER + RA.API.GET_VEDIO_LIST,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#vedioListToolbar",
                columns: [[
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "title", title: "视频标题", width: 150, align:"center"},
                    {field: "titleEn", title: "视频标题(英)", width: 150, align: "center"},
                    {field: "create_time", title: "创建时间", width: 150, align: "center"},
                    {field: "file", title: "视频路径", width: 250, align: "center"},
                    {field: "content", title: "视频描述", width: 200, align: "center"},
                    {field: "contentEn", title: "视频描述(英)", width: 200, align: "center"},
                    {field: "_operate", title: "操作", align: "center", width: 150, formatter: function(val, row, index) {
                        var html = "";
                        html += "<a href='javascript:;' class='vedioListEditBtn' style='margin: 10px;'>修改</a>";
                        html += "<a href='javascript:;' class='vedioListDelBtn' style='margin: 10px;'>删除</a>";
                        return html;  
                    }}
                ]],
                onLoadSuccess: function() {
                    $("#vedioListGrid").datagrid("resize");
                }
            });
        },

        _initDialog: function() {
            var self = this;

            $("#vedioListAddOrEditDialog").dialog({
                title: "视频", 
                modal: true,
                closed: true,
                width: 500,
                height: "80%",
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#vedioListAddOrEditForm").form("clear");
                },
                buttons: [{
                    text: "确认",
                    algin: "center",
                    iconCls: "icon-ok",
                    handler: function () {
                        if (!$("#vedioId").val()) {
                            self.addVedio();
                        } else {
                            self.updateVedio();
                        }
                    }
                }]
            });

            $("#vedioListTitle").textbox({
                width: 300,
                required: true
            });

            $("#vedioListTitleEn").textbox({
                width: 300,
                required: true
            });

            $("#vedioListDesc").textbox({
                width: 300,
                multiline: true
            });

            $("#vedioListDescEn").textbox({
                width: 300,
                multiline: true
            });

            $('#vedioListVedioFile').filebox({    
                width: 300,
                required: true,
                buttonText: '选择文件', 
                buttonAlign: 'right' 
            });
        },

        _bindEvent: function() {
            $("#vedioListGrid").parent().on('click', '.vedioListEditBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                var vedioTitle = rowDom.find('[field=title]').text();
                var vedioTitleEn = rowDom.find('[field=titleEn]').text();
                var vedioContent = rowDom.find('[field=content]').text();
                var vedioContentEn = rowDom.find('[field=contentEn]').text();

                $("#vedioListAddOrEditDialog").dialog("open");

                $("#vedioListTitle").textbox("setText", vedioTitle);
                $("#vedioListTitleEn").textbox("setText", vedioTitleEn); 
                $("#vedioListDesc").textbox("setText", vedioContent);
                $("#vedioListDescEn").textbox("setText", vedioContentEn);

                $("#vedioId").val(id);
                $("#vedioListTitle").textbox("setValue", vedioTitle);
                $("#vedioListTitleEn").textbox("setValue", vedioTitleEn); 
                $("#vedioListDesc").textbox("setValue", vedioContent);
                $("#vedioListDescEn").textbox("setValue", vedioContentEn);

                $("#vedioListVedioFile").filebox({
                    required: false
                });
            });

            $("#vedioListGrid").parent().on('click', '.vedioListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '确定要删除选中视频吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_VEDIO,
                            params: {
                                id: id
                            },
                            successFn: function(resp) {
                                $("#vedioListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除视频成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showError("删除视频失败: " + (err.msg? err.msg : ""));
                            }
                        });
                    }
                })  
            });
        },

        addVedio: function() {
            RA.NET.formSubmit({
                formId: "vedioListAddOrEditForm",
                type: "post",
                url: RA.API.ADD_VEDIO,
                successFn: function(resp) {
                    $("#vedioListGrid").datagrid("reload");
                    $("#vedioListAddOrEditDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("添加视频成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("添加视频失败: " + (err.msg? err.msg : ""));
                }
            });
        },

        updateVedio: function() {
            RA.NET.formSubmit({
                formId: "vedioListAddOrEditForm",
                type: "post",
                url: RA.API.UPDATE_VEDIO,
                successFn: function(resp) {
                    $("#vedioListGrid").datagrid("reload");
                    $("#vedioListAddOrEditDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("修改视频成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("修改视频失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());