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
             $("#newsListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
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
                    {field: "creator", title: "创建人", width: 150, align: "center"},
                    {field: "create_time", title: "创建时间", width: 250, align: "center"},
                    {field: "last_modify", title: "最后修改时间", width: 200, align: "center"},
                    {field: "content", title: "内容", width: 200, align: "center"},
                    {field: "contentEn", title: "内容(英)", width: 200, align: "center"},
                    {field: "_operate", title: "操作", align: "center", width: 150, formatter: function(val, row, index) {
                        var html = "";
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
                title: "新闻发布", 
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
                        if (!$("#userId").val()) {
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

            $("#newsListDesc").textbox({
                width: 300,
                multiline: true
            });

            $("#newsListDescEn").textbox({
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
                var newsDesc = rowDom.find('[field=content]').text();
                var newsDescEn = rowDom.find('[field=contentEn]').text();

                $("#newsListAddOrEditDialog").dialog("open");

                $("#newsId").val(id);
                $("#newsListTitle").textbox("setText", newsTitle);
                $("#newsListTitleEn").textbox("setText", newsTitleEn); 
                $("#newsListDesc").textbox("setText", newsDesc);
                $("#newsListDescEn").textbox("setText", newsDescEn); 
            });

            $("#newsListGrid").parent().on('click', '.newsListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '1确定要删除选中新闻吗？', function(flag) {
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
                })  
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