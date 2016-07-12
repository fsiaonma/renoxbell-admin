"use strict";

$((function() {
    return {
        init: function() {
            this._initGrid();
            this._bindEvent();
        },

        _initGrid: function() {
            $("#msgListGrid").datagrid({
                border: false,
                rownumbers: true,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                autoRowHeight: true,
                nowrap : false,
                toolbar: "#msgListToolbar",
                url: RA.API_SERVER + RA.API.GET_MESSAGE,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                pageSize: 30,
                method: "get",
                columns: [[   
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "nickname", title: "留言人姓名", width: 150, align:"center"},
                    {field: "email", title: "电子邮件", width: 150, align: "center"},
                    {field: "create_time", title: "留言时间", width: 150, align: "center"},
                    {field: "content", title: "内容", width: 400, align: "center"}
                ]],
                onLoadSuccess: function() {
                    $("#msgListGrid").datagrid("resize");
                    $("#msgListGrid").datagrid("fixColumnSize");
                }
            });
        },

        _bindEvent: function() {

        }
    }
})().init());