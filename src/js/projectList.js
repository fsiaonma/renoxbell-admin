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
             $("#projectListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
                    $("#projectListAddDialog").dialog("open");
                }
            });
        },

        _initGrid: function() {
            $("#projectListGrid").datagrid({
                border: false,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                rownumbers: true,
                url: RA.API_SERVER + RA.API.GET_PROJECT_LIST,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#projectListToolbar",
                columns: [[   
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "title", title: "项目名称", width: 150, align:"center"},
                    {field: "titleEn", title: "项目名称(英)", width: 150, align: "center"},
                    {field: "address", title: "项目地点", width: 150, align: "center"},
                    {field: "addressEn", title: "项目地点(英)", width: 150, align: "center"},
                    {field: "owner", title: "项目所有者", width: 150, align: "center"},
                    {field: "ownerEn", title: "项目所有者(英)", width: 150, align: "center"},
                    {field: "start_time", title: "开始日期", width: 150, align: "center"},
                    {field: "end_time", title: "结束日期", width: 150, align: "center"},
                    {field: "image", title: "照片路径", width: 150, align: "center"},
                    {field: "desc", title: "项目描述", width: 150, align: "center"},
                    {field: "descEn", title: "项目描述(英)", width: 150, align: "center"},
                    {field: "_operate", title: "操作", align: "center", width: 150, formatter: function(val, row, index) {
                        var html = "";
                        html += "<a href='javascript:;' class='projectListDelBtn' style='margin: 10px;'>删除</a>";
                        return html;  
                    }}
                ]],
                onLoadSuccess: function() {
                    $("#projectListGrid").datagrid("resize");
                }
            });
        },

        _initDialog: function() {
            var self = this;

            $("#projectListAddDialog").dialog({
                title: "新增项目", 
                modal: true,
                closed: true,
                width: 500,
                height: "80%",
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#projectListAddForm").form("clear");
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

            $("#projectListName").textbox({
                width: 300,
                required: true
            });

            $("#projectListNameEn").textbox({
                width: 300,
                required: true
            });

            $("#projectListPlace").textbox({
                width: 300,
                required: true
            });

            $("#projectListPlaceEn").textbox({
                width: 300,
                required: true
            });

            $("#projectListBelong").textbox({
                width: 300,
                required: true
            });

            $("#projectListBelongEn").textbox({
                width: 300,
                required: true
            });

            $('#projectListStartDate').datetimebox({
                width: 300,
                required: true
            });

            $('#projectListEndDate').datetimebox({
                width: 300,
                required: true
            });

            $('#projectListImgFile').filebox({    
                width: 300,
                required: true,
                buttonText: '选择图片', 
                buttonAlign: 'right' 
            });

            $("#projectListDesc").textbox({   
                multiline: true
            });

            $("#projectListDescEn").textbox({   
                multiline: true
            });
        },

        _bindEvent: function() {
            $("#projectListGrid").parent().on('click', '.projectListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '确定要删除选中项目吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_PROJECT,
                            params: {
                                id: id
                            },
                            successFn: function(resp) {
                                $("#projectListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除项目成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showError("删除项目失败: " + (err.msg? err.msg : ""));
                            }
                        });
                    }
                })  
            });
        },

        submitForm: function() {
            RA.NET.formSubmit({
                formId: "projectListAddForm",
                type: "post",
                url: RA.API.ADD_PROJECT,
                successFn: function(resp) {
                    $("#projectListGrid").datagrid("reload");
                    $("#projectListAddDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("添加项目成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("添加项目失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());