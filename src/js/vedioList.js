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
                    $("#vedioListAddDialog").dialog("open");
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
                url: RA.API.GET_VEDIO_LIST,
                loadFilter: function(resp) {
                    return resp;
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

            $("#vedioListAddDialog").dialog({
                title: "视频上传", 
                modal: true,
                closed: true,
                width: 500,
                height: "80%",
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#vedioListAddForm").form("clear");
                },
                buttons: [{
                    text: "确认",
                    algin: "center",
                    iconCls: "icon-ok",
                    handler: function () {
                        self.submitForm();
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
                                RA.MSG_TIP.showSuccess("删除视频失败");
                            }
                        });
                    }
                })  
            });
        },

        submitForm: function() {
            RA.NET.formSubmit({
                formId: "vedioListAddForm",
                type: "post",
                url: RA.API.ADD_VEDIO,
                successFn: function(resp) {
                    $("#vedioListGrid").datagrid("reload");
                    $("#vedioListAddDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("添加视频成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showSuccess("添加视频失败");
                }
            });
        }
    }
})().init());