var Msg = {};
var overlay;
var dialog;
/*
layer.open()=index
layer.close(index)
//icon:1 对勾,2 叉，0警告，3问号，4锁，5不开心，6开心

var idx = Msg.confirm("你确认删除吗？", function () {
                alert("OK");
                Msg.hide(idx);
            });

*/
Msg.show = function (msg, type) {
    if (type == 0) {
        overlay = layer.msg(msg, {
            offset: 3,
            icon: 1,
            shift: 1,
            skin: 'msgSucc',
            time: 3000
        });
    } else if (type == 1) {
        overlay = layer.alert(msg, { icon: 2, shift: 0, title: '', closeBtn: 0, shadeClose: true });
    } else if (type == 3) {
        overlay = layer.msg(msg, {
            icon: 16,
            shift: 0,
            shade: [0.4, '#999'],
            time: 0
        });
    } else if (type == 9) {
        overlay = layer.msg(msg, {
            offset: 3,
            icon: 0,
            shift: 6,
            skin: 'msgWaring',
            time: 5000
        });
    } else if (type == 90) {
        overlay = layer.alert(msg, { icon: 1, shift: 0, title: '', closeBtn: 0, shadeClose: true });
    } else if (type == 91) {
        overlay = layer.msg(msg, {
            icon: 0,
            shift: 6,
            time: 5000
        });
    }
    return overlay;
};
Msg.hide = function (index) {
    if (index == null || index == undefined || index == "") {
        layer.close(overlay);
    }
    else if (index == "all") {
        layer.closeAll();
    }
    else {
        layer.close(index);
    }
};
Msg.confirm = function (msg, event) {
    return layer.confirm(msg, { icon: 3, closeBtn: 0, title: '' }, event);
};
var Dialog = {};
Dialog.open = function (ref, width, height, title,event,endevt) {
    dialog = layer.open({
        type: 1,
        title: title,
        closeBtn: "1",
        skin: 'winComm',
        area: [width + "px", height + "px"],
        content: $("#" + ref),
        success: event,
        end:endevt
    });
    return dialog;
};
Dialog.close = function (index) {
    if (index == null || index == undefined || index == "") {
        layer.close(dialog);
    }
    else if (index == "all") {
        layer.closeAll();
    }
    else {
        layer.close(index);
    }
};

//获取URL参数
var Url = {};
Url.get = function (param) {
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
    var r = location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return "";
}
