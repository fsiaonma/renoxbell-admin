RA.MSG_TIP = {
	showSuccess: function(msg) {
		$.messager.show({
            title: '操作成功',
            msg: msg || '',
            timeout: 3000
        });
	},
	showError: function(msg) {
		$.messager.show({
            title: '操作失败',
            msg: msg || '',
            timeout: 3000
        });
	},
}