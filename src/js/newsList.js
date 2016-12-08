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
             $("#newsListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
                    $("#newsListImg").filebox({
                        required: true
                    });

                    $("#newsListDetailImg").filebox({
                        required: true
                    });

                    $("#newsListAddOrEditDialog").dialog("open");
                }
            });
        },

        _initGrid: function() {
            $("#newsListGrid").datagrid({
                border: false,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                rownumbers: true,
                url: RA.API_SERVER + RA.API.GET_NEWS_LIST,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#newsListToolbar",
                columns: [[
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "title", title: "新闻标题", width: 150, align:"center"},
                    {field: "titleEn", title: "新闻标题(英)", width: 150, align: "center"},
                    {field: "bannerImage", title: "封面图片", width: 200, align:"center", formatter: imgFormat},
                    {field: "detailImage", title: "详情图片", width: 200, align:"center", formatter: imgFormat},
                    {field: "desc", title: "新闻描述", width: 150, align:"center"},
                    {field: "descEn", title: "新闻描述(英)", width: 150, align: "center"},
                    {field: "creator", title: "创建人", width: 150, align: "center"},
                    {field: "create_time", title: "创建时间", width: 250, align: "center"},
                    {field: "last_modify", title: "最后修改时间", width: 200, align: "center"},
                    {field: "content", title: "内容", width: 200, align: "center"},
                    {field: "contentEn", title: "内容(英)", width: 200, align: "center"},
                    {field: "_operate", title: "操作", align: "center", width: 200, formatter: function(val, row, index) {
                        var html = "";
                        if (row.status == "offline") {
                            html += "<a href='javascript:;' class='newsListLineBtn' style='margin: 10px;'>上线</a>";
                            html += "<span style='margin: 10px; color: #888;'>下线</span>";
                        } else {
                            html += "<span style='margin: 10px; color: #888;'>上线</span>";
                            html += "<a href='javascript:;' class='newsListOffLineBtn' style='margin: 10px;'>下线</a>";
                        }
                        html += "<a href='javascript:;' class='newsListEditBtn' style='margin: 10px;'>修改</a>";
                        html += "<a href='javascript:;' class='newsListDelBtn' style='margin: 10px;'>删除</a>";
                        return html;  
                    }}
                ]],
                onLoadSuccess: function() {
                    $("#newsListGrid").datagrid("resize");
                }
            });
        },

        _initDialog: function() {
            var self = this;

            $("#newsListAddOrEditDialog").dialog({
                title: "新闻", 
                modal: true,
                closed: true,
                width: 500,
                height: "80%",
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#newsListAddOrEditForm").form("clear");
                },
                buttons: [{
                    text: "确认",
                    algin: "center",
                    iconCls: "icon-ok",
                    handler: function () {
                        if (!$("#newsId").val()) {
                            self.addNews();
                        } else {
                            self.updateNews();
                        }
                    }
                }]
            });

            $("#newsListTitle").textbox({
                width: 300,
                required: true
            });

            $("#newsListTitleEn").textbox({
                width: 300,
                required: true
            });

            $("#newsListImg").filebox({
                width: 300,
                required: true,
                buttonText: '选择图片',
                buttonAlign: 'right',
                prompt: "建议分辨率 255 * 192 大小100k"
            });

            $("#newsListDetailImg").filebox({
                width: 300,
                required: true,
                buttonText: '选择图片',
                buttonAlign: 'right',
                prompt: "建议分辨率 1100 * 510 大小100k"
            });

            $("#newsListDesc").textbox({
                width: 300,
                multiline: true
            });

            $("#newsListDescEn").textbox({
                width: 300,
                multiline: true
            });

            $("#newsListContent").textbox({
                width: 300,
                multiline: true
            });

            $("#newsListContentEn").textbox({
                width: 300,
                multiline: true
            });
        },

        _bindEvent: function() {
            $("#newsListGrid").parent().on('click', '.newsListEditBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                var newsTitle = rowDom.find('[field=title]').text();
                var newsTitleEn = rowDom.find('[field=titleEn]').text();
                var newsDesc = rowDom.find('[field=desc]').text();
                var newsDescEn = rowDom.find('[field=descEn]').text();
                var newsContent = rowDom.find('[field=content]').text();
                var newsContentEn = rowDom.find('[field=contentEn]').text();

                $("#newsListAddOrEditDialog").dialog("open");

                $("#newsListTitle").textbox("setText", newsTitle);
                $("#newsListTitleEn").textbox("setText", newsTitleEn); 
                $("#newsListDesc").textbox("setText", newsDesc);
                $("#newsListDescEn").textbox("setText", newsDescEn);
                $("#newsListContent").textbox("setText", newsContent);
                $("#newsListContentEn").textbox("setText", newsContentEn);  

                $("#newsId").val(id);
                $("#newsListTitle").textbox("setValue", newsTitle);
                $("#newsListTitleEn").textbox("setValue", newsTitleEn); 
                $("#newsListDesc").textbox("setValue", newsDesc);
                $("#newsListDescEn").textbox("setValue", newsDescEn);
                $("#newsListContent").textbox("setValue", newsContent);
                $("#newsListContentEn").textbox("setValue", newsContentEn);  

                $("#newsListImg").filebox({
                    required: false
                });

                $("#newsListDetailImg").filebox({
                    required: false
                });
            });

            $("#newsListGrid").parent().on('click', '.newsListLineBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                RA.NET.request({
                    type: "post",
                    url: RA.API.NEWS_LINE,
                    params: {
                        id: id,
                        status: "online"
                    },
                    successFn: function(resp) {
                        $("#newsListGrid").datagrid("reload");
                        RA.MSG_TIP.showSuccess("新闻上线成功");
                    },
                    errorFn: function(err) {
                        RA.MSG_TIP.showError("新闻上线失败: " + (err.msg? err.msg : ""));
                    }
                });  
            });

            $("#newsListGrid").parent().on('click', '.newsListOffLineBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                RA.NET.request({
                    type: "post",
                    url: RA.API.NEWS_OFF_LINE,
                    params: {
                        id: id,
                        status: "offline"
                    },
                    successFn: function(resp) {
                        $("#newsListGrid").datagrid("reload");
                        RA.MSG_TIP.showSuccess("新闻下线成功");
                    },
                    errorFn: function(err) {
                        RA.MSG_TIP.showError("新闻下线失败: " + (err.msg? err.msg : ""));
                    }
                });  
            });

            $("#newsListGrid").parent().on('click', '.newsListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '确定要删除选中新闻吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_NEWS,
                            params: {
                                id: id
                            },
                            successFn: function(resp) {
                                $("#newsListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除新闻成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showError("删除新闻失败: " + (err.msg? err.msg : ""));
                            }
                        });  
                    }
                });  
            });
        },

        addNews: function() {
            RA.NET.formSubmit({
                formId: "newsListAddOrEditForm",
                type: "post",
                url: RA.API.ADD_NEWS,
                successFn: function(resp) {
                    $("#newsListGrid").datagrid("reload");
                    $("#newsListAddOrEditDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("发布新闻成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("发布新闻失败: " + (err.msg? err.msg : ""));
                }
            });
        },

        updateNews: function() {
            RA.NET.formSubmit({
                formId: "newsListAddOrEditForm",
                type: "post",
                url: RA.API.UPDATE_NEWS,
                successFn: function(resp) {
                    $("#newsListGrid").datagrid("reload");
                    $("#newsListAddOrEditDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("更新新闻成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("更新新闻失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());