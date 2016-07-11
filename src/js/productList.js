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
             $("#productListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
                    $("#productListAddDialog").dialog("open");
                }
            });
        },

        _initGrid: function() {
            $("#productListGrid").datagrid({
                border: false,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                rownumbers: true,
                // url: RA.API.GET_PRODUCT_LIST,
                data: [{
                    id: "id1",
                    param1: 1
                }, {
                    id: "id2",
                    param1: 1
                }],
                loadFilter: function(resp) {
                    return resp;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#productListToolbar",
                columns: [[
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "param1", title: "产品名称", width: 200, align:"center"},
                    {field: "param1", title: "产品名称(英)", width: 200, align: "center"},
                    {field: "param1", title: "产品类别", width: 200, align:"center"},
                    {field: "param1", title: "产品类别(英)", width: 200, align:"center"},
                    {field: "param1", title: "产品描述", width: 200, align:"center"},
                    {field: "param1", title: "产品描述(英)", width: 200, align:"center"},
                    {field: "param1", title: "轮播图片1路径", width: 200, align:"center"},
                    {field: "param1", title: "轮播图片2路径", width: 200, align:"center"},
                    {field: "param1", title: "轮播图片3路径", width: 200, align:"center"},
                    {field: "param1", title: "轮播图片4路径", width: 200, align:"center"},
                    {field: "param1", title: "详情图片1路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片1路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片2路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片2路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片3路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片3路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片4路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片4路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片5路劲", width: 200, align:"center"},
                    {field: "param1", title: "详情图片5路劲", width: 200, align:"center"},
                    {field: "_operate", title: "操作", align: "center", width: 200, formatter: function(val, row, index) {
                        var html = "";
                        html += "<a href='javascript:;' class='productListDelBtn' style='margin: 10px;'>删除</a>";
                        return html;  
                    }}
                ]],
                onLoadSuccess: function() {
                    $("#productListGrid").datagrid("resize");
                }
            });
        },

        _initDialog: function() {
            var self = this;

            $("#productListAddDialog").dialog({
                title: "新增产品", 
                modal: true,
                closed: true,
                width: 500,
                height: "80%",
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#productListAddForm").form("clear");
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

            $("#productListName").textbox({
                width: 300,
                required: true
            });

            $("#productListNameEn").textbox({
                width: 300,
                required: true
            });

            $("#productListType").textbox({
                width: 300,
                required: true
            });

            $("#productListTypeEn").textbox({
                width: 300,
                required: true
            });

            for (var i = 1; i < 5; ++i) {
                $('#productListSlideImgFile' + i).filebox({    
                    width: 300,
                    required: true,
                    buttonText: '选择图片', 
                    buttonAlign: 'right' 
                });
            }

            for (var i = 1; i < 6; ++i) {
                $('#productListDetailImgFile' + i).filebox({    
                    width: 300,
                    required: true,
                    buttonText: '选择图片', 
                    buttonAlign: 'right' 
                });

                $('#productListDetailImgFileEn' + i).filebox({    
                    width: 300,
                    required: true,
                    buttonText: '选择图片', 
                    buttonAlign: 'right' 
                });
            }

            $("#productListDesc").textbox({   
                multiline: true
            });

            $("#productListDescEn").textbox({   
                multiline: true
            });
        },

        _bindEvent: function() {
            $("#productListGrid").parent().on('click', '.productListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '确定要删除选中视频吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_PRODUCT,
                            params: {
                                
                            },
                            successFn: function(resp) {
                                $("#productListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除产品成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showSuccess("删除产品失败");
                            }
                        });
                    }
                })  
            });
        },

        submitForm: function() {
            RA.NET.formSubmit({
                formId: "productListAddForm",
                type: "post",
                url: RA.API.ADD_PRODUCT,
                successFn: function(resp) {
                    $("#productListGrid").datagrid("reload");
                    $("#productListAddDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("添加产品成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("添加产品失败");
                }
            });
        }
    }
})().init());