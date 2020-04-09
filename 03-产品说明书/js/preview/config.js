

//微信jssdk  环境
function getDebug() {
    return false;
}

//获取网页地址
function getHtmlUrl() {
    return window.location.href;
}

//获取网站地址
function getDomainUrl() {
    //获取该网页地址
    var url = window.location.href;
    //获取参数部分
    var search = window.location.search;
    //获取路径部分
    var pathname = window.location.pathname;
    //获取跟路径   https://sklicense.aisino.com
    var baseUrl = url.replace(pathname,"")
        .replace(search, "");
    return baseUrl;
}

wxBasisPath = "/wxBasis";
walletPath = "/Wallet";
userPath = "/userCenter";
invoiceScanQrcodePath = "/invoiceScanQrcode";
caishuiPath = "/caishui";
scanQrcodePath = "/scanQRCode";
enterprisePath = "/enterprise";

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}

/**
 * 判断是否微信端访问
 * @returns {boolean}
 */
function isWeChatVisit(){
    // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
    var useragent = navigator.userAgent;
    if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
        return false;
    }
    return true;
}

/**
 * 判断是否支付宝访问
 * @returns {boolean}
 */
function isAliVisit(){
    // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
    var useragent = navigator.userAgent;
    return /AlipayClient/.test(useragent);

}

function fromWhere() {
    if(isWeChatVisit()){
        return 1;
    }else if(isAliVisit()){
        ap.hideOptionButton();
        return 2;
    }
    return -1;
}

// 去掉ios确认域名
// function customAlert(window) {
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[window.frames.length - 1].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}
// }
// 去掉ios确认域名
window.confirm = function(message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
//    var alertFrame = window.frames[0];
    var alertFrame = window.frames[window.frames.length - 1];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};