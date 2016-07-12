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
                    window.open(RA.API_SERVER + RA.API.EXPORT_ASK_PRICE_LIST);
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
                url: RA.API_SERVER + RA.API.GET_ASK_PRICE_LIST,
                loadFilter: function(resp) {
                    RA.NET.logoutFilter(resp);
                    var resObj = resp.data;
                    return resObj;
                },
                pagination: true,
                pageSize: 30,
                method: "get",
                toolbar: "#askPriceListToolbar",
                columns: [[   
                    {field: 'id', title: 'id', width: 40, hidden: true, align: 'center'}, 
                    {field: "nickname", title: "询价者姓名", width: 150, align:"center"},
                    {field: "email", title: "电子邮件", width: 150, align: "center"},
                    {field: "phone", title: "电话", width: 150, align: "center"},
                    {field: "company", title: "公司名称", width: 150, align: "center"},
                    {field: "create_time", title: "询价时间", width: 150, align: "center"},
                    {field: "content", title: "内容", width: 400, align: "center"}
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