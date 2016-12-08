"use strict";

$((function() {
    var imgFormat = function(val, row, index) {
        return "<img src='" + val + "' style='width:50px; height:50px;' />";
    }

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
                    $("#factoryListAddOrEditDialog").dialog("open");
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
                    {field: "image", title: "照片路径", width: 150, align: "center", formatter: imgFormat},
                    {field: "desc", title: "工厂描述", width: 150, align: "center"},
                    {field: "descEn", title: "工厂描述(英)", width: 150, align: "center"},
                    {field: "_operate", title: "操作", align: "center", width: 150, formatter: function(val, row, index) {
                        var html = "";
                        html += "<a href='javascript:;' class='factoryListEditBtn' style='margin: 10px;'>修改</a>";
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

            $("#factoryListAddOrEditDialog").dialog({
                title: "工厂", 
                modal: true,
                closed: true,
                width: 500,
                height: "80%",
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#factoryListAddOrEditForm").form("clear");
                },
                buttons: [{
                    text: "确认",
                    algin: "center",
                    iconCls: "icon-ok",
                    handler: function () {
                        if (!$("#factoryId").val()) {
                            self.addFactory();
                        } else {
                            self.updateFactory();
                        }
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
            $("#factoryListGrid").parent().on('click', '.factoryListEditBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();

                var factoryTitle = rowDom.find('[field=title]').text();
                var factoryTitleEn = rowDom.find('[field=titleEn]').text();
                var factoryAddress = rowDom.find('[field=address]').text();
                var factoryAddressEn = rowDom.find('[field=addressEn]').text();
                var factoryOwner = rowDom.find('[field=owner]').text();
                var factoryOwnerEn = rowDom.find('[field=ownerEn]').text();
                var factoryStartTime = rowDom.find('[field=start_time]').text();
                var factoryEndTime = rowDom.find('[field=end_time]').text();
                var factoryDesc = rowDom.find('[field=desc]').text();
                var factoryDescEn = rowDom.find('[field=descEn]').text();

                $("#factoryListAddOrEditDialog").dialog("open");

                $("#factoryListName").textbox("setText", factoryTitle);
                $("#factoryListNameEn").textbox("setText", factoryTitleEn); 
                $("#factoryListPlace").textbox("setText", factoryAddress);
                $("#factoryListPlaceEn").textbox("setText", factoryAddressEn);
                $("#factoryListBelong").textbox("setText", factoryOwner);
                $("#factoryListBelongEn").textbox("setText", factoryOwnerEn);
                $("#factoryListStartDate").textbox("setText", factoryStartTime);
                $("#factoryListEndDate").textbox("setText", factoryEndTime);
                $("#factoryListDesc").textbox("setText", factoryDesc);
                $("#factoryListDescEn").textbox("setText", factoryDescEn);

                $("#factoryId").val(id);
                $("#factoryListName").textbox("setValue", factoryTitle);
                $("#factoryListNameEn").textbox("setValue", factoryTitleEn); 
                $("#factoryListPlace").textbox("setValue", factoryAddress);
                $("#factoryListPlaceEn").textbox("setValue", factoryAddressEn);
                $("#factoryListBelong").textbox("setValue", factoryOwner);
                $("#factoryListBelongEn").textbox("setValue", factoryOwnerEn);
                $("#factoryListStartDate").textbox("setValue", factoryStartTime);
                $("#factoryListEndDate").textbox("setValue", factoryEndTime);
                $("#factoryListDesc").textbox("setValue", factoryDesc);
                $("#factoryListDescEn").textbox("setValue", factoryDescEn);

                $("#factoryListImgFile").filebox({
                    required: false
                });  
            });

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

        addFactory: function() {
            RA.NET.formSubmit({
                formId: "factoryListAddOrEditForm",
                type: "post",
                url: RA.API.ADD_FACTORY,
                successFn: function(resp) {
                    $("#factoryListGrid").datagrid("reload");
                    $("#factoryListAddOrEditDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("添加工厂成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("添加工厂失败: " + (err.msg? err.msg : ""));
                }
            });
        },

        updateFactory: function() {
            RA.NET.formSubmit({
                formId: "factoryListAddOrEditForm",
                type: "post",
                url: RA.API.UPDATE_FACTORY,
                successFn: function(resp) {
                    $("#factoryListGrid").datagrid("reload");
                    $("#factoryListAddOrEditDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("修改工厂成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("修改工厂失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());