define(['vue'], function (Vue) {
    new Vue({
        el: '#index',
        template: '<div id="root">' +
        '    <div class="mui-card">\n' +
        '        <div class="mui-card-header">签收单</div>\n' +
        '        <div class="mui-card-content">\n' +
        '            <div class="mui-card-content-inner">\n' +
        '                您管辖的客户有部分订单发货超过15天了，需要上传签收单啦！\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="mui-card-footer">待上传订单总数: <span class="remaind-font">{{totalSO}}</span> (单位: 笔)</div>\n' +
        '    </div>\n' +
        '    <div class="mui-card">\n' +
        '        <div class="mui-card-header">开票提醒</div>\n' +
        '        <div class="mui-card-content">\n' +
        '            <div class="mui-card-content-inner">\n' +
        '                您管辖的客户有部分订单发货超过45天了，请及时与客户对接开票事宜！\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="mui-card-footer">待开金税总计: <span class="remaind-font">{{totalJS}}</span> (单位: 元)</div>\n' +
        '    </div>\n' +
        '    <div class="mui-card">\n' +
        '        <div class="mui-card-header">收款提醒</div>\n' +
        '        <div class="mui-card-content">\n' +
        '            <div class="mui-card-content-inner">\n' +
        '                您管辖的客户有部分货款即将到支付节点（30天后），请及时与客户对接，落实付款事宜！\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="mui-card-footer">待收款总计：<span class="remaind-font">{{totalSK}}</span> (单位: 元)</div>\n' +
        '    </div>' +
        '</div>',
        data: function () {
            return {
                totalSO: 0,
                totalJS: 0,
                totalSK: 0
            }
        }
    })
})