"use strict";

// RA.API_SERVER = "http://10.100.137.74:8000/api/";
RA.API_SERVER = "http://api.renoxbell.com/api/";

RA.API = {
	LOGOUT: "logout",

	GET_NEWS_LIST: "getNewsList",
	ADD_NEWS: "saveNews",
	UPDATE_NEWS: "saveNews",
	NEWS_LINE: "",
	NEWS_OFF_LINE: "",
	DEL_NEWS: "deleteNews",

	GET_VEDIO_LIST: "getVideoList",
	ADD_VEDIO: "saveVideo",
	DEL_VEDIO: "deleteVideo",

	GET_BANNER_LIST: "getBannerList",
	ADD_BANNER: "saveBanner",
	DEL_BANNER: "deleteBanner",

	GET_MESSAGE: "getMsgList",

	GET_ASK_PRICE_LIST: "getAskPriceList",
	EXPORT_ASK_PRICE_LIST: "exportAskPrice",

	GET_PRODUCT_LIST: "getProductList",
	ADD_PRODUCT: "saveProduct",
	UPDATE_PRODUCT: "saveProduct",
	GROUDING_PRODUCT: "", // 上架
	UNDERCARRIAGE_PRODUCT: "", // 下架
	DEL_PRODUCT: "deleteProduct",

	GET_PROJECT_LIST: "getProjectList",
	ADD_PROJECT: "saveProject",
	DEL_PROJECT: "deleteProject",

	GET_FACTORY_LIST: "getFactoryList",
	ADD_FACTORY: "saveFactory",
	DEL_FACTORY: "deleteFactory",

	GET_USER_LIST: "getUserList",
	ADD_USER: "saveUser",
	UPDATE_USER: "saveUser",
	DEL_USER: "deleteUser"
}