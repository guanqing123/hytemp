
//配置jssdk
function configJsSDK(htmlUrl, callback) {
    //获取签名
    $.ajax({
        type: 'POST',
        url: getDomainUrl() + wxBasisPath + "/api/getJsApiSign",
        data: {"url": htmlUrl},
        success: function (data) {
            // 配置jssdk
            wx.config({
                debug: getDebug(), // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.data.appid, // 必填，公众号的唯一标识
                timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                signature: data.data.signature,// 必填，签名
                beta: true,
                jsApiList: ['chooseInvoiceTitle', 'chooseInvoice','scanQRCode', 'getLocation','updateAppMessageShareData','updateTimelineShareData', 'hideMenuItems', 'hideAllNonBaseMenuItem', 'showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage',
                    'chooseImage','uploadImage'] // 必填，需要使用的JS接口列表
            });
            callback("success")
        },
        error: function (data) {
            callback("error")
        }
    });
}

//配置出错
function jsSdkError(callback) {
    wx.error(function (e) {
        alert(e)
        callback(e)
    })
}

//配置完成
function jsSdkReady(callback) {
    wx.ready(function (e) {
        //隐藏所有非基础类菜单
        wx.hideAllNonBaseMenuItem();
        //只显示微信相关
        showMenuItems(["menuItem:share:appMessage", "menuItem:share:timeline", 'menuItem:favorite']);
        callback(e)
    })
}

// 配置完成，隐藏所有微信分享菜单
function jsSdkReadyHideMenu(callback) {
    wx.ready(function (e) {
        // 隐藏所有非基础类菜单
        wx.hideAllNonBaseMenuItem();
        callback(e)
    })
}

//获取发票抬头列表
function chooseInvoiceTitle(callback) {
    //调用微信jssdk  获取发票抬头
    wx.invoke('chooseInvoiceTitle', {
        "scene": "2" //1表示开具发票  2表示其他
    }, function (res) {
        var choose_invoice_title_info = res.choose_invoice_title_info;
        choose_invoice_title_info = choose_invoice_title_info.replace(/\\/g, "");
        var jsonObj = JSON.parse(choose_invoice_title_info);
        var msg = ""
        if (res.err_msg === "chooseInvoiceTitle:ok") {
            msg = "success"
        } else if (res.err_msg === 'chooseInvoiceTitle:cancel') {
            msg = 'cancel'
        } else {
            msg = "fail"
        }
        callback(msg, jsonObj)
    })
}
//获取发票抬头
// 此处只是获取了 card_id	所选发票卡券的card_id encrypt_code 发票卡券的加密code
// 据此调用获取发票详细信息的接口获取发票信息
function chooseInvoice(callback) {
    //获取签名
    $.ajax({
        type: 'POST',
        url: getDomainUrl() + wxBasisPath + "/api/getChooseInvoiceSignature",
        success: function (data) {
            wx.invoke('chooseInvoice', {
                'timestamp': data.data.timestamp, // 卡券签名时间戳
                'nonceStr': data.data.nonceStr, // 卡券签名随机串
                'signType': data.data.signType, // 签名方式，默认'SHA1'
                'cardSign': data.data.cardSign // 卡券签名
            }, function (res) {
                var msg = "";
                var jsonObj = null;
                if (res.err_msg === "choose_invoice:ok") {
                    msg = "success";
                    var choose_invoice_info = res.choose_invoice_info;
                    choose_invoice_info = choose_invoice_info.replace(/\\/g, "");
                    jsonObj = JSON.parse(choose_invoice_info);
                } else if (res.err_msg === 'choose_invoice:cancel') {
                    msg = 'cancel'
                } else {
                    msg = "fail"
                }
                callback(msg, jsonObj)
            })
        },
        error: function (e) {
            alert("请求失败");
        }
    });
}

//微信扫一扫
function qrCode(callback) {
    wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            callback(result);
        }
    });
}

// 微信拍照或选择照片
function takePhoto(callback){
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
//            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            callback(res);
        }
    });
}

// 上传图片到微信服务端
function uploadImageToWXServer(chooseImageLocalId,callback){
    wx.uploadImage({
        localId: chooseImageLocalId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            callback(serverId);
        },fail:function(res){
            alert("上传图片到微信服务端失败"+res);
        }
    });
}

function getLocalImgData(chooseImageLocalId,callback){
    wx.getLocalImgData({
        localId: chooseImageLocalId, // 图片的localID
        success: function (res) {
            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            callback(localData);
        }
    });
}

/**
 * 是否可以分享
 */
function isEnableShare() {
    wx.checkJsApi({
        jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
            if (res.checkResult.updateAppMessageShareData === true) {
                return true;
            }else {
                return false;
            }
        }
    })
}

//分享微信朋友
function updateAppMessageShareData(title, desc, link, imgUrl) {
    wx.checkJsApi({
        jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            if (res.checkResult.updateAppMessageShareData === true) {
                wx.updateAppMessageShareData({
                    //*参数均为必填
                    title: title,
                    desc: desc,
                    //此链接的地址 必须在授权的域名下
                    link: link,
                    imgUrl: imgUrl,
                    success: function () {
                    }
                });
            } else {
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户点击了分享后执行的回调函数
                    }
                });
            }
        }
    });

}
//分享朋友圈
function updateTimelineShareData(title, desc, link, imgUrl) {
    wx.checkJsApi({
        jsApiList: ['updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
            if (res.checkResult.updateTimelineShareData === true) {
                wx.updateTimelineShareData({
                    title: title + "\n" + desc, // 分享标题
                    desc: "",
                    link: link,
                    imgUrl: imgUrl,
                    success: function () {
                        // 设置成功
                    }
                })
            } else {
                wx.onMenuShareTimeline({
                    title: title + "\n" + desc, // 分享标题
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户点击了分享后执行的回调函数
                    }
                })
            }
        }
    });

}
//批量隐藏菜单
function hideMenuItems(menuList) {
    wx.hideMenuItems({
        menuList: menuList // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
}
//批量显示菜单
function showMenuItems(menuList) {
    wx.showMenuItems({
        menuList: menuList
    })
}