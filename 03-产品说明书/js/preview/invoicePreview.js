var invoiceId = getQueryString("invoiceId");
var openid = getQueryString("openid");
// var invoiceType = getQueryString("invoiceType");// 发票类型
// var source = getQueryString("source"); //发票来源
var from = getQueryString("from");
var startTime = getQueryString("startTime");
var endTime = getQueryString("endTime");
var fileType = getQueryString("fileType");
/**
 * 展示pdf
 * @param base64String
 */
function showPdf(base64String) {
    var pdf_url = {data: window.atob(base64String)};
    pdfImg.show({
        url: pdf_url
        , containerId: "pdfImgContainer"		// PDF转图片容器ID（必须）
        , imgWidth: "100%"	// 图片<img>宽度属性，默认100%
        , imgWrapCls: "pdfImg_wrapper"	// <img>外层div使用class样式类
        , black: false		// true图片转为黑白，默认false
        , viewport: 1.2		// 图片清晰度，默认1，一般设定在1-2之间，数值越大，图片分辨率越大，浏览器处理速度越慢
        , success: function () {	// 成功回调函数
            $("#pdfImgContainer").css("visibility","visible");
        }
        , error: function (msg) {	// 失败回调函数
            alert("加载PDF失败！" + msg);
        }
    });
}

$(document).ready(function () {
    //获取jsSdk签名
    configJsSDK(getHtmlUrl(),function () {});
    //隐藏所有菜单
    jsSdkReadyHideMenu(function () {});

    //加个延时
    setTimeout(function () {
        requestData();
    },1000);
});

function requestData() {
    if(fileType === "OFD" || fileType === "PSP"){
        $("title").html("发票预览");
        getAnnex();
    }else{
        if (from==0) {
            $("title").html("查看附件");
            getAnnex();
        } else if (from==1) {
            $("title").html("发票预览");
            getPdf();
        }else {
            alert("未查询到数据！");
        }
    }

    // //电子票
    // if (invoiceType == 51) {
    //     //请求数据 /invoiceData/getpdf
    //     getPdf();
    // }else if (invoiceType == 61 || invoiceType == 60|| invoiceType == 2|| invoiceType == 0|| invoiceType == 41) {
    //     // 请求
    //     getAnnex();
    // }else {
    //     alert("此发票没有附件！")
    // }
}

/**
 * 获取附件
 */
function getAnnex() {
    var data = {
        openid: openid,
        invoiceId: invoiceId,
        fileType: fileType
    };
    showLoading();
    $.ajax({
        type: "POST",
        // url: "http://localhost:8082" + "/invoiceData/getAnnex",
        url: getDomainUrl() + walletPath + "/invoiceData/getAnnex",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            hideLoading();
            if (response.length > 0) {
                $(".pic").css("visibility","visible");
                $(".pic").attr("src","data:image/png;base64," + response);
            }else {
                alert("加载失败");
            }
        },
        error: function (msg) {
            hideLoading();
            alert("加载失败");
        },
        complete: function (request, str) {
            if('error' === str){
                alert("加载失败");
            }
            hideLoading();
        }
    });
}
/**
 * 获取电子发票的pdf
 */
function getPdf() {
    var data = {
        openid: openid,
        invoiceId: invoiceId,
        startTime: startTime,
        endTime: endTime
    };
    showLoading();
    $.ajax({
        type: "POST",
        // url: "http://localhost:8082" + "/invoiceData/getpdf",
        url: getDomainUrl() + walletPath + "/invoiceData/getpdf",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            hideLoading();
            if (response.length > 0) {
                showPdf(response);
            }else {
                alert("加载失败");
            }
        },
        error: function (msg) {
            hideLoading();
            alert("加载失败");
        },
        complete: function (request, str) {
            if('error' === str){
                alert("加载失败");
            }
            hideLoading();
        }
    });
}