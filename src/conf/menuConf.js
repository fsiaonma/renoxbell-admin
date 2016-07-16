"use strict";

RA.menuConf = [{
	title: "信息提示",
	children: [{
		id: "toNewsList",
		title: "新闻管理",
		icon: "icon-ra-news",
		href: "src/templates/newsList.html"
	}, {
		id: "toVedioList",
		title: "视频管理",
		icon: "icon-ra-vedio",
		href: "src/templates/vedioList.html"
	}, {
		id: "toBannerList",
		title: "banner管理",
		icon: "icon-ra-banner",
		href: "src/templates/bannerList.html"
	}]
}, {
	title: "留言询价",
	children: [{
		id: "toMsgList",
		title: "查看留言",
		icon: "icon-ra-message",
		href: "src/templates/msgList.html"
	}, {
		id: "toAskPriceList",
		title: "查看询价",
		icon: "icon-ra-price",
		href: "src/templates/askPriceList.html"
	}]
}, {
	title: "分类维护",
	children: [{
		id: "toProductList",
		title: "产品管理",
		icon: "icon-ra-product",
		href: "src/templates/productList.html"
	}, {
		id: "toProjectList",
		title: "工厂管理",
		icon: "icon-ra-project",
		href: "src/templates/projectList.html"
	}]
}, {
	title: "用户维护",
	children: [{
		id: "toUserList",
		title: "用户管理",
		icon: "icon-ra-user",
		href: "src/templates/userList.html"
	}]
}];