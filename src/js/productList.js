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
             $("#productListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
                    $("#productListSlideImgFiles").filebox({
                        required: true
                    });

                    $("#productListDetailImgFiles").filebox({
                        required: true
                    });

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
                    {field: "image1", title: "轮播图片1路径", width: 200, align:"center", formatter: imgFormat},
                    {field: "image2", title: "轮播图片2路径", width: 200, align:"center", formatter: imgFormat},
                    {field: "image3", title: "轮播图片3路径", width: 200, align:"center", formatter: imgFormat},
                    {field: "image4", title: "轮播图片4路径", width: 200, align:"center", formatter: imgFormat},
                    {field: "detailImage1", title: "详情图片1", width: 200, align:"center", formatter: imgFormat},
                    {field: "detailImage2", title: "详情图片2", width: 200, align:"center", formatter: imgFormat},
                    {field: "detailImage3", title: "详情图片3", width: 200, align:"center", formatter: imgFormat},
                    {field: "detailImage4", title: "详情图片4", width: 200, align:"center", formatter: imgFormat},
                    {field: "detailImage5", title: "详情图片5", width: 200, align:"center", formatter: imgFormat},
                    {field: "_operate", title: "操作", align: "center", width: 200, formatter: function(val, row, index) {
                        var html = "";
                        html += "<a href='javascript:;' class='productListEditBtn' style='margin: 10px;'>修改</a>";
                        html += "<a href='javascript:;' class='productListGroundingBtn' style='margin: 10px;'>上架</a>";
                        html += "<a href='javascript:;' class='productListUndercarriageBtn' style='margin: 10px;'>下架</a>";
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
                        if (!$("#productId").val()) {
                            self._addProduct();
                        } else {
                            self._updateProduct();
                        }
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

            $('#productListSlideImgFiles').filebox({    
                width: 300,
                required: true,
                buttonText: '选择图片',
                buttonAlign: 'right',
                multiple: true,
                prompt: "建议分辨率 255*192, 大小 100 K，4张图"
            });

            $('#productListDetailImgFiles').filebox({
                width: 300,
                required: true,
                buttonText: '选择图片', 
                buttonAlign: 'right',
                multiple: true,
                prompt: "建议分辨率 1100*510, 大小 100 K，5张图"
            });

            $("#productListDesc").textbox({   
                multiline: true
            });

            $("#productListDescEn").textbox({   
                multiline: true
            });
        },

        _bindEvent: function() {
            $("#productListGrid").parent().on('click', '.productListEditBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();

                var name = rowDom.find('[field=name]').text();
                var nameEn = rowDom.find('[field=nameEn]').text();
                var category = rowDom.find('[field=category]').text();
                var categoryEn = rowDom.find('[field=categoryEn]').text();
                var spaces = rowDom.find('[field=spaces]').text();
                var model = rowDom.find('[field=model]').text();
                var nw = rowDom.find('[field=nw]').text();
                var desc = rowDom.find('[field=desc]').text();
                var descEn = rowDom.find('[field=descEn]').text();

                $("#productId").val(id);
                $("#productListName").textbox("setText", name);
                $("#productListNameEn").textbox("setText", nameEn);
                $("#productListType").textbox("setText", category);
                $("#productListTypeEn").textbox("setText", categoryEn);
                $("#productListSpaces").textbox("setText", spaces);
                $("#productListModel").textbox("setText", model);
                $("#productListNW").textbox("setText", nw);

                $("#productListSlideImgFiles").filebox({
                    required: false
                });

                $("#productListDetailImgFiles").filebox({
                    required: false
                });

                $("#productListDesc").textbox("setText", desc);
                $("#productListDescEn").textbox("setText", descEn);

                $("#productListAddDialog").dialog("open");
            });

            $("#productListGrid").parent().on('click', '.productListGroundingBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                RA.NET.request({
                    type: "post",
                    url: RA.API.GROUDING_PRODUCT,
                    params: {
                        id: id
                    },
                    successFn: function(resp) {
                        $("#productListGrid").datagrid("reload");
                        RA.MSG_TIP.showSuccess("产品上架成功");
                    },
                    errorFn: function(err) {
                        RA.MSG_TIP.showError("产品上架失败: " + (err.msg? err.msg : ""));
                    }
                });
            });

            $("#productListGrid").parent().on('click', '.productListUndercarriageBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                RA.NET.request({
                    type: "post",
                    url: RA.API.UNDERCARRIAGE_PRODUCT,
                    params: {
                        id: id
                    },
                    successFn: function(resp) {
                        $("#productListGrid").datagrid("reload");
                        RA.MSG_TIP.showSuccess("产品下架成功");
                    },
                    errorFn: function(err) {
                        RA.MSG_TIP.showError("产品下架失败: " + (err.msg? err.msg : ""));
                    }
                });
            });

            $("#productListGrid").parent().on('click', '.productListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
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
            });
        },

        _addProduct: function() {
            if ($('#productListSlideImgFiles').next().find('.textbox-value')[0].files.length > 4) {
                RA.MSG_TIP.showError("轮播图片不能大于4张");
                return ;
            }

            if ($('#productListDetailImgFiles').next().find('.textbox-value')[0].files.length > 5) {
                RA.MSG_TIP.showError("详情图片不能大于5张");
                return ;
            }

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
        },

        _updateProduct: function() {
            if ($('#productListSlideImgFiles').next().find('.textbox-value')[0].files.length > 4) {
                RA.MSG_TIP.showError("轮播图片不能大于4张");
                return ;
            }

            if ($('#productListDetailImgFiles').next().find('.textbox-value')[0].files.length > 5) {
                RA.MSG_TIP.showError("详情图片不能大于5张");
                return ;
            }

            RA.NET.formSubmit({
                formId: "productListAddForm",
                type: "post",
                url: RA.API.UPDATE_PRODUCT,
                successFn: function(resp) {
                    $("#productListGrid").datagrid("reload");
                    $("#productListAddDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("更新产品成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("更新产品失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());