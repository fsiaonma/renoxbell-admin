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
             $("#factoryListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
                    $("#factoryListAddDialog").dialog("open");
                }
            });
        },

        _initGrid: function() {
            $("#factoryListGrid").datagrid({
                border: false,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                rownumbers: true,
                url: RA.API_SERVER + RA.API.GET_FACTORY_LIST,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#factoryListToolbar",
                columns: [[   
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "title", title: "工厂名称", width: 150, align:"center"},
                    {field: "titleEn", title: "工厂名称(英)", width: 150, align: "center"},
                    {field: "address", title: "工厂地点", width: 150, align: "center"},
                    {field: "addressEn", title: "工厂地点(英)", width: 150, align: "center"},
                    {field: "owner", title: "工厂所有者", width: 150, align: "center"},
                    {field: "ownerEn", title: "工厂所有者(英)", width: 150, align: "center"},
                    {field: "start_time", title: "开始日期", width: 150, align: "center"},
                    {field: "end_time", title: "结束日期", width: 150, align: "center"},
                    {field: "image", title: "照片路径", width: 150, align: "center"},
                    {field: "desc", title: "工厂描述", width: 150, align: "center"},
                    {field: "descEn", title: "工厂描述(英)", width: 150, align: "center"},
                    {field: "_operate", title: "操作", align: "center", width: 150, formatter: function(val, row, index) {
                        var html = "";
                        html += "<a href='javascript:;' class='factoryListDelBtn' style='margin: 10px;'>删除</a>";
                        return html;  
                    }}
                ]],
                onLoadSuccess: function() {
                    $("#factoryListGrid").datagrid("resize");
                }
            });
        },

        _initDialog: function() {
            var self = this;

            $("#factoryListAddDialog").dialog({
                title: "新增工厂", 
                modal: true,
                closed: true,
                width: 500,
                height: "80%",
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#factoryListAddForm").form("clear");
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

            $("#factoryListName").textbox({
                width: 300,
                required: true
            });

            $("#factoryListNameEn").textbox({
                width: 300,
                required: true
            });

            $("#factoryListPlace").textbox({
                width: 300,
                required: true
            });

            $("#factoryListPlaceEn").textbox({
                width: 300,
                required: true
            });

            $("#factoryListBelong").textbox({
                width: 300,
                required: true
            });

            $("#factoryListBelongEn").textbox({
                width: 300,
                required: true
            });

            $('#factoryListStartDate').datetimebox({
                width: 300,
                required: true
            });

            $('#factoryListEndDate').datetimebox({
                width: 300,
                required: true
            });

            $('#factoryListImgFile').filebox({    
                width: 300,
                required: true,
                buttonText: '选择图片', 
                buttonAlign: 'right' 
            });

            $("#factoryListDesc").textbox({   
                multiline: true
            });

            $("#factoryListDescEn").textbox({   
                multiline: true
            });
        },

        _bindEvent: function() {
            $("#factoryListGrid").parent().on('click', '.factoryListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '确定要删除选中工厂吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_FACTORY,
                            params: {
                                id: id
                            },
                            successFn: function(resp) {
                                $("#factoryListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除工厂成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showError("删除工厂失败: " + (err.msg? err.msg : ""));
                            }
                        });
                    }
                })  
            });
        },

        submitForm: function() {
            RA.NET.formSubmit({
                formId: "factoryListAddForm",
                type: "post",
                url: RA.API.ADD_FACTORY,
                successFn: function(resp) {
                    $("#factoryListGrid").datagrid("reload");
                    $("#factoryListAddDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("添加工厂成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("添加工厂失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());