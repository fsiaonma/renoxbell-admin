"use strict";

$((function() {
    return {
        init: function() {
            this._initToolBar();
            this._initGrid();
            this._bindEvent();
        },

        _initToolBar: function() {
             $("#askPriceListExportBtn").linkbutton({
                width: 100,
                onClick: function() {
                    
                }
            });
        },

        _initGrid: function() {
            $("#askPriceListGrid").datagrid({
                border: false,
                rownumbers: true,
                singleSelect: true,
                checkOnSelect: true,
                selectOnCheck: true,
                autoRowHeight: true,
                nowrap : false,
                // url: RA.API.GET_ASK_PRICE_LIST,
                data: [{
                    id: "id1",
                    param1: 1,
                    param2: 2,
                    param3: 3,
                    param4: 4,
                    param5: 5,
                    param6: 6
                }, {
                    id: "id2",
                    param1: 1,
                    param2: 2,
                    param3: 3,
                    param4: 4,
                    param5: 5,
                    param6: 6
                }, {
                    id: "id1",
                    param1: 1,
                    param2: 2,
                    param3: 3,
                    param4: 4,
                    param5: 5,
                    param6: 6
                }],
                loadFilter: function(resp) {
                    return resp;
                },
                pagination: true,
                pageSize: 30,
                method: "get",
                toolbar: "#askPriceListToolbar",
                columns: [[   
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "param1", title: "询价者姓名", width: 150, align:"center"},
                    {field: "param2", title: "电子邮件", width: 150, align: "center"},
                    {field: "param3", title: "电话", width: 150, align: "center"},
                    {field: "param4", title: "公司名称", width: 150, align: "center"},
                    {field: "param5", title: "询价时间", width: 150, align: "center"},
                    {field: "param6", title: "内容", width: 400, align: "center"}
                ]],
                onLoadSuccess: function() {
                    $("#askPriceListGrid").datagrid("resize");
                    $("#askPriceListGrid").datagrid("fixColumnSize");
                }
            });
        },

        _bindEvent: function() {

        }
    }
})().init());