$(document).ready(function () {
    if (!isWeChatVisit() && !isAliVisit()) {
        alert('已禁止本次访问：您必须使用微信或者支付宝内置浏览器访问本页面！');
        // 以下代码是用javascript强行关闭当前页面
        var opened = window.open('about:blank', '_self');
        opened.opener = null;
        opened.close();
    }
});