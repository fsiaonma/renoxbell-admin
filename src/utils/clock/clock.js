"use strict";

RA.CLOCK_TIMEOUT_ID = null;

RA.CLOCK = {
	start: function(eleId) {
		if (RA.CLOCK_TIMEOUT_ID) {
			clearTimeout(RA.CLOCK_TIMEOUT_ID);
		}

		var showTime = function() {
			var date = new Date(Number(new Date().getTime()));
		    var year = date.getFullYear();
		    var month = date.getMonth() + 1;
		    var day = date.getDate();
		    var hour = date.getHours();
		    hour = hour > 9? hour : "0" + hour;
		    var min = date.getMinutes();
		    min = min > 9? min : "0" + min;
		    var second = date.getSeconds();
		    second = second > 9? second : "0" + second;
		    var timeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + second;
		    $("#" + eleId).html(timeStr);
		    RA.CLOCK_TIMEOUT_ID = setTimeout(showTime, 1000);
		};

		showTime();
	},

	stop: function() {
		if (RA.CLOCK_TIMEOUT_ID) {
			clearTimeout(RA.CLOCK_TIMEOUT_ID);
		}
	}
}