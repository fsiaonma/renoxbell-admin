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
                url: RA.API_SERVER + RA.API.GET_PRODUCT_LIST,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#productListToolbar",
                columns: [[
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "name", title: "产品名称", width: 200, align:"center"},
                    {field: "nameEn", title: "产品名称(英)", width: 200, align: "center"},
                    {field: "category", title: "产品类别", width: 200, align:"center"},
                    {field: "categoryEn", title: "产品类别(英)", width: 200, align:"center"},
                    {field: "spaces", title: "SPACES", width: 200, align:"center"},
                    {field: "model", title: "MODEL", width: 200, align:"center"},
                    {field: "nw", title: "N.W", width: 200, align:"center"},
                    {field: "desc", title: "产品描述", width: 200, align:"center"},
                    {field: "descEn", title: "产品描述(英)", width: 200, align:"center"},
                    {field: "image1", title: "轮播图片1路径", width: 200, align:"center"},
                    {field: "image2", title: "轮播图片2路径", width: 200, align:"center"},
                    {field: "image3", title: "轮播图片3路径", width: 200, align:"center"},
                    {field: "image4", title: "轮播图片4路径", width: 200, align:"center"},
                    {field: "detailImage1", title: "详情图片1路劲", width: 200, align:"center"},
                    {field: "detailImageEn1", title: "详情图片1路劲(英)", width: 200, align:"center"},
                    {field: "detailImage2", title: "详情图片2路劲", width: 200, align:"center"},
                    {field: "detailImageEn2", title: "详情图片2路劲(英)", width: 200, align:"center"},
                    {field: "detailImage3", title: "详情图片3路劲", width: 200, align:"center"},
                    {field: "detailImageEn3", title: "详情图片3路劲(英)", width: 200, align:"center"},
                    {field: "detailImage4", title: "详情图片4路劲", width: 200, align:"center"},
                    {field: "detailImageEn4", title: "详情图片4路劲(英)", width: 200, align:"center"},
                    {field: "detailImage5", title: "详情图片5路劲", width: 200, align:"center"},
                    {field: "detailImageEn5", title: "详情图片5路劲(英)", width: 200, align:"center"},
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

            $("#productListSpaces").textbox({
                width: 300,
                required: true,
                prompt: "多个数值用英文逗号分隔"
            });

            $("#productListModel").textbox({
                width: 300,
                required: true,
                prompt: "多个数值用英文逗号分隔"
            });

            $("#productListNW").textbox({
                width: 300,
                required: true,
                prompt: "多个数值用英文逗号分隔"
            });

            for (var i = 1; i < 5; ++i) {
                $('#productListSlideImgFile' + i).filebox({    
                    width: 300,
                    required: true,
                    buttonText: '选择图片',
                    buttonAlign: 'right',
                    prompt: "建议分辨率 530*350, 大小 100 K"
                });
            }

            for (var i = 1; i < 6; ++i) {
                $('#productListDetailImgFile' + i).filebox({    
                    width: 300,
                    required: true,
                    buttonText: '选择图片', 
                    buttonAlign: 'right',
                    prompt: "建议分辨率 1100*510, 大小 100 K"
                });

                $('#productListDetailImgFileEn' + i).filebox({    
                    width: 300,
                    required: true,
                    buttonText: '选择图片', 
                    buttonAlign: 'right',
                    prompt: "建议分辨率 1100*510, 大小 100 K"
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
                $.messager.confirm('删除确认', '确定要删除选中产品吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_PRODUCT,
                            params: {
                                id: id
                            },
                            successFn: function(resp) {
                                $("#productListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除产品成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showError("删除产品失败: " + (err.msg? err.msg : ""));
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
                    RA.MSG_TIP.showError("添加产品失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());