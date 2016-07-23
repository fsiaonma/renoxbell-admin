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
             $("#bannerListAddBtn").linkbutton({
                width: 100,
                onClick: function() {
                    $("#bannerListAddDialog").dialog("open");
                }
            });
        },

        _initGrid: function() {
            $("#bannerListGrid").datagrid({
                border: false,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                rownumbers: true,
                url: RA.API_SERVER + RA.API.GET_BANNER_LIST,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                autoRowHeight: true,
                pageSize: 30,
                method: "get",
                toolbar: "#bannerListToolbar",
                columns: [[   
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "filename", title: "滚动图片名称", width: 150, align:"center"},
                    {field: "create_time", title: "创建时间", width: 150, align: "center"},
                    {field: "image", title: "滚动图片路径", width: 150, align: "center"},
                    {field: "_operate", title: "操作", align: "center", width: 150, formatter: function(val, row, index) {
                        var html = "";
                        html += "<a href='javascript:;' class='bannerListDelBtn' style='margin: 10px;'>删除</a>";
                        return html;  
                    }}
                ]],
                onLoadSuccess: function() {
                    $("#bannerListGrid").datagrid("resize");
                }
            });
        },

        _initDialog: function() {
            var self = this;

            $("#bannerListAddDialog").dialog({
                title: "图片上传", 
                modal: true,
                closed: true,
                width: 400,
                height: 150,
                maximizable: true,
                cache: false,
                onBeforeClose: function() {
                    $("#bannerListAddForm").form("clear");
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

            $('#bannerListVedioFile').filebox({    
                width: 300,
                buttonText: '选择文件', 
                buttonAlign: 'right',
                required: true,
                prompt: "建议分辨率 1600*549, 大小 100 K"
            });
        },

        _bindEvent: function() {
            $("#bannerListGrid").parent().on('click', '.bannerListDelBtn', function(event) {  
                var rowDom = $(event.target).closest('tr');
                var id = rowDom.find('[field=id]').text();
                $.messager.confirm('删除确认', '确定要删除选中 banner 吗？', function(flag) {
                    if (flag) {
                        RA.NET.request({
                            type: "post",
                            url: RA.API.DEL_BANNER,
                            params: {
                                id: id
                            },
                            successFn: function(resp) {
                                $("#bannerListGrid").datagrid("reload");
                                RA.MSG_TIP.showSuccess("删除 banner 成功");
                            },
                            errorFn: function(err) {
                                RA.MSG_TIP.showError("删除 banner 失败: " + (err.msg? err.msg : ""));
                            }
                        });
                    }
                })  
            });
        },

        submitForm: function() {
            RA.NET.formSubmit({
                formId: "bannerListAddForm",
                type: "post",
                url: RA.API.ADD_BANNER,
                successFn: function(resp) {
                    $("#bannerListGrid").datagrid("reload");
                    $("#bannerListAddDialog").dialog("close");
                    RA.MSG_TIP.showSuccess("添加 banner 成功");
                },
                errorFn: function(err) {
                    RA.MSG_TIP.showError("添加 banner 失败: " + (err.msg? err.msg : ""));
                }
            });
        }
    }
})().init());