$(document).ready(function () {
    adjust();
});
$(window).resize(function () {
    adjust();
});

function adjust() {
    $("html").css("font-size", $("body").width() / 10.8);
    $("body").show();
}

$(document).on("click", ".bottom ul li:last-child", function () {
    $(this).toggleClass("yck")
});


// 获取上一页面传过来的参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = decodeURI(window.location.search, "utf-8").substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * toast 提示
 * @param {*} e
 */
function showTip(e) {
    var t = '<div class="toast_box" style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 9999999;"><div class="toast_content" style="width:auto !important;max-width: 50%;height:auto;line-height: 0.4rem;border-radius:0.08rem;text-align:center;font-size: 0.28rem;color: #fff;padding: 0.3rem 0.45rem;background:url(./images/sdlr/toast_bg.png) repeat-x;margin: 65% auto;">' + e + "</div></div>";
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", t),
        setTimeout(function () {
            var e = document.getElementsByTagName("body")[0]
                , t = document.getElementsByClassName("toast_box")[0];
            e.removeChild(t)
        }, 1500)
}

/**
 * 因为页面路径不一致 需要再来一份
 * toast 提示
 * @param {*} e
 */
function showTip1(e) {
    var t = '<div class="toast_box" style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 9999999;"><div class="toast_content" style="width:auto !important;max-width: 50%;height:auto;line-height: 0.4rem;border-radius:0.08rem;text-align:center;font-size: 0.28rem;color: #fff;padding: 0.3rem 0.45rem;background:url(../images/sdlr/toast_bg.png) repeat-x;margin: 65% auto;">' + e + "</div></div>";
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", t),
        setTimeout(function () {
            var e = document.getElementsByTagName("body")[0]
                , t = document.getElementsByClassName("toast_box")[0];
            e.removeChild(t)
        }, 1500)
}

/**
 * 判断机型
 * @returns {int}  2:iPhone 1:Android  0:unknow
 */
function clientType() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Android") != -1) {
        return 1;
    }
    if (userAgent.indexOf("iPhone") != -1) {
        return 2;
    }
    return 0;
}

/**
 *  显示busyLoading
 */
function busyLoading_show() {
    // 带配置参数
    $("#busyLoading").busyLoad("show");
    $("#busyLoading").busyLoad("show", {
        spinner: "cubes", // pump, accordion, pulsar, cube, cubes, circle-line, circles, cube-grid
        image: false,
        fontawesome: false, // "fa fa-refresh fa-spin fa-2x fa-fw"
        custom: false, // jQuery Object
        color: "#fff",
        background: "rgba(0, 0, 0, 0.2)",
        maxSize: "50px", // Integer/String only for spinners & images, not fontawesome & custom
        minSize: "20px", // Integer/String only for spinners & images, not fontawesome & custom
        text: false,
        textColor: false, // default is color
        textMargin: ".5rem",
        textPosition: "right", // left, right, top, bottom
        fontSize: "1rem",
        fullScreen: false,
        animation: "fade", // fade, slide
        animationDuration: "fast", // String, Integer
        containerClass: "busy-load-container",
        containerItemClass: "busy-load-container-item",
        spinnerClass: "busy-load-spinner",
        textClass: "busy-load-text"
    });
}

/**
 *  隐藏busyLoading
 */
function busyLoading_hide() {
    $("#busyLoading").busyLoad("hide");
}

/**
 * 自定义消息弹框
 * @param {*} title
 * @param {*} content
 */
function alertTips(title, content) {
    if (title == "") {
        title = "温馨提示"
    }

    //创建遮罩层
    var tipsLayer = document.createElement("div");
    tipsLayer.className = "alertTips-layer";

    //创建弹窗窗口
    var alertBox = document.createElement("div");
    alertBox.className = "alertTips-alert-box";

    //创建窗口里的内容
    var alertContent1 = document.createElement("div");
    alertContent1.className = "alertTips-top-box";
    var span = document.createElement("span");
    span.innerHTML = title;
    var a = document.createElement("a");
    a.href = "javascript:void(0)";
    a.onclick = function () {
        tipsLayer.parentNode.removeChild(alertBox);
        tipsLayer.parentNode.removeChild(tipsLayer);
    };
    alertContent1.appendChild(span);
    alertContent1.appendChild(a);
    var alertContent2 = document.createElement("div");
    alertContent2.className = "alertTips-center-box";
    alertContent2.innerHTML = content;
    var alertContent3 = document.createElement("div");
    alertContent3.className = "alertTips-bottom-box";
    var btn = document.createElement("button");
    btn.className = "bg-blue";
    btn.innerHTML = "确定";
    btn.onclick = function () {
        tipsLayer.parentNode.removeChild(alertBox);
        tipsLayer.parentNode.removeChild(tipsLayer);
    };
    alertContent3.appendChild(btn);
    alertBox.appendChild(alertContent1);
    alertBox.appendChild(alertContent2);
    alertBox.appendChild(alertContent3);

    document.body.appendChild(tipsLayer);
    document.body.appendChild(alertBox);
}

// 成功吐司提示
function alertSuccessToast(content, duration) {
    duration = isNaN(duration) ? 1500 : duration;

    var divShadow = document.createElement("div");
    divShadow.style.cssText="width: 100%; height: 100%; position: fixed; top: 0;background: rgba(0, 0, 0, 0.3); z-index: 99999;"

    var div = document.createElement("div");
    div.style.cssText="margin: 6.78rem auto;overflow: hidden;padding-top: 0.79rem;width: 7.53rem;text-align: center;background-color: #fff;border-radius: 0.3rem;";

    var img = document.createElement("img");
    img.style.cssText="margin-bottom: .46rem;width: 2.35rem;height: 2.37rem;"
    img.src = getDomainUrl() + "/51wechat/images/common/success.png";
    img.alt = "";

    var p = document.createElement("p");
    p.style.cssText="margin-bottom: .85rem; text-align: center;font-size: .45rem; color: #999;"
    p.innerHTML = content;

    div.appendChild(img);
    div.appendChild(p);
    divShadow.appendChild(div);
    document.body.appendChild(divShadow);

    setTimeout(function () {
        var d = 0.5;
        divShadow.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        divShadow.style.opacity = '0';
        setTimeout(function () {
            divShadow.parentNode.removeChild(divShadow)
        }, d * 1000);

    }, duration);
}

// 成功吐司提示  比例7.5的界面 使用这个
function alertSuccessToast1(content, duration) {
    duration = isNaN(duration) ? 1500 : duration;

    var divShadow = document.createElement("div");
    divShadow.style.cssText="width: 100%; height: 100%; position: fixed; top: 0;background: rgba(0, 0, 0, 0.3); z-index: 99999;"

    var div = document.createElement("div");
    div.style.cssText="margin: 4rem auto;overflow: hidden;padding-top: 0.79rem;width: 5rem;text-align: center;background-color: #fff;border-radius: 0.3rem;";

    var img = document.createElement("img");
    img.style.cssText="margin-bottom: .46rem;width: 2rem;height: 2rem;"
    img.src = getDomainUrl() + "/51wechat/images/common/success.png";
    img.alt = "";

    var p = document.createElement("p");
    p.style.cssText="margin-bottom: .5rem; text-align: center;font-size: .4rem; color: #999;"
    p.innerHTML = content;

    div.appendChild(img);
    div.appendChild(p);
    divShadow.appendChild(div);
    document.body.appendChild(divShadow);

    setTimeout(function () {
        var d = 0.5;
        divShadow.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        divShadow.style.opacity = '0';
        setTimeout(function () {
            divShadow.parentNode.removeChild(divShadow)
        }, d * 1000);

    }, duration);
}
/**
 * 统一分享到票夹
 */
function shareWallet() {
    var title = "您的好友分享电子发票票夹给您";
    var desc = "51发票的电子发票功能，能查询您所开的历史发票，方便您的报销。";
    var link = getDomainUrl() + wxBasisPath + "/glory/toGetUserInfo?type=0&path=" +
        getDomainUrl() + walletPath + "/invoiceCollect/redirectInvoiceWallet";
    var imgUrl = "https://mmbiz.qpic.cn/mmbiz_png/NFzlZ6CjQWTtM9NtWc0SeZJFdjXOQmTSK398Yjia1RDBXVNE88UJcFoOMFoUvUhecGxOb881gaVVRYjpBtzKibHA/0?wx_fmt=png";
    updateAppMessageShareData(title, desc, link, imgUrl);
    updateTimelineShareData(title, desc, link, imgUrl);
}

/**
 * 检测是否是url
 * @param str
 * @returns {boolean}
 * @constructor
 */
function IsURL(str){
    var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp=new RegExp(Expression);
    if(objExp.test(str)==true){
        return true;
    }else{
        return false;
    }
}

/**
 * 判断是否是邮箱
 * @param email 邮箱
 * @returns {boolean}
 */
function isEmail(email){
    var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var objExp = new RegExp(emailReg);
    return objExp.test(email);
}

/**
 * 判断是否是手机号
 * @param phone 手机号
 * @returns {boolean}
 */
function isPhone(phone){
    var phoneReg = /^[1](([3|5|8][\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][0,1,2,3,5,6,7,8,9]))[\d]{8}$/;
    var objExp = new RegExp(phoneReg);
    return objExp.test(phone);
}

/**
 * 验证税号格式
 *
 * @param str
 * @returns
 */
function isTaxcode(str) {
    var reg = /^[a-zA-Z\d]+$/;
    var objExp = new RegExp(reg);
    return objExp.test(str);
}

/**
 * 验证税号长度
 *
 * @param str
 * @returns
 */
function isTaxcodeLength(str) {
    var ret = true;
    if (str.trim().length > 0 && (str.trim().length < 15 || str.trim().length > 20)) {
        ret =  false;
    }
    return ret;
}


/**
 * 去掉所有空格
 *
 * @param str
 * @param is_global
 * @returns
 */
function Trim(str, is_global)
{
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g")
    {
        result = result.replace(/\s/g, "");
    }

    return result;
}

/**
 * confirm重写
 *
 * @param obj
 */
function modal_confirm(obj){
    if(typeof obj.msg1 == ""||typeof obj.msg1 =="undefined"){
        obj.msg1 = "";
    }
    if(typeof obj.msg2 == ""||typeof obj.msg2 =="undefined"){
        obj.msg2 = "取消";
    }
    if(typeof obj.msg3 == ""||typeof obj.msg3 =="undefined"){
        obj.msg3 = "保存";
    }
    if(!(typeof obj.callback1 === "function")) { //是函数    其中 FunName 为函数名称
        obj.callback1 = function(){};
    }
    if(!(typeof obj.callback2 === "function")) { //是函数    其中 FunName 为函数名称
        obj.callback2 = function(){};
    }
    $("body").append("<div class='info_alert'>"+
        "<div class='content'>"+
        "<div class='content_top'>"+
        "<div class='text3'>"+obj.msg1
        +"</div>"+
        "</div>"+
        "<div class='content_bottom two'>"+
        "<input type='button' value='"+obj.msg2+"'>"+
        "<input type='button' value='"+obj.msg3+"'></div>"+
        "</div>"+
        "</div>");
    $(document).on("click",".content_bottom input[type='button']:first-child",function(){
        $(".info_alert").remove();
        obj.callback1();
        $(document).off("click",".content_bottom input[type='button']:first-child");
    });
    $(document).on("click",".content_bottom input[type='button']:last-child",function(){
        $(".info_alert").remove();
        obj.callback2();
        $(document).off("click",".content_bottom input[type='button']:last-child");
    });
}

function shownotice(msg) {
    if (!document.getElementById("m-toast")) {
        var div_toast = document.createElement("div");
        div_toast.className="m-toast-pop";
        div_toast.id="m-toast-pop";
        var div_toast_inner = document.createElement("div");
        div_toast_inner.className="m-toast-inner";
        var div_toast_inner_text = document.createElement("div");
        div_toast_inner_text.className="m-toast-inner-text";
        div_toast_inner_text.id="m-toast-inner-text";

        div_toast.style.cssText = "display: none; position: fixed; width: 100%;top: 0;bottom: 0;right: 0;overflow: auto;text-align: center;";
        div_toast_inner.style.cssText = "position: absolute;left:50%;top:30%;width: 100%; transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);text-align: center;";
        div_toast_inner_text.style.cssText = "display: inline-block;margin: 0 22px; padding: 19px 21px;font-size: 16px;color: #FFFFFF;letter-spacing: 0;line-height: 22px;background: rgba(0,0,0,0.72);border-radius: 10px;";

        div_toast_inner.appendChild(div_toast_inner_text);
        div_toast.appendChild(div_toast_inner);
        document.body.appendChild(div_toast);
    }
    $('#m-toast-inner-text').text(msg);
    $('#m-toast-pop').fadeIn();
    setTimeout(function() {
        $('#m-toast-pop').fadeOut();
    }, 2000);
}

function isWeixinOrAlipay(){
    var userAgent = window.navigator.userAgent;
    if ( userAgent.indexOf("MicroMessenger") > 0 ) {
        // 微信
        return "1";
    } else if (userAgent.indexOf("Alipayclient") > 0) {
        // 支付宝
        return "2";
    } else {
        // 其他
        return "3"
    }
}