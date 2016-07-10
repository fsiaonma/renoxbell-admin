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
                // url: RA.API.GET_MESSAGE,
                data: [{
                    id: "id1",
                    param1: 1,
                    param2: 2,
                    param3: 3,
                    param4: 4
                }, {
                    id: "id2",
                    param1: 1,
                    param2: 2,
                    param3: 3,
                    param4: 4
                }, {
                    id: "id1",
                    param1: 1,
                    param2: 2,
                    param3: 3,
                    param4: 4
                }],
                loadFilter: function(resp) {
                    return resp;
                },
                pagination: true,
                pageSize: 30,
                method: "get",
                columns: [[   
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "param1", title: "留言人姓名", width: 150, align:"center"},
                    {field: "param2", title: "电子邮件", width: 150, align: "center"},
                    {field: "param3", title: "留言时间", width: 150, align: "center"},
                    {field: "param4", title: "内容", width: 400, align: "center"}
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