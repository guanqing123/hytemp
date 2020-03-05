define(['config', 'vue', 'lodash', 'loading'], function (config, Vue, _, loading) {
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
        },
        methods: {
            // 获取url中全部参数的对象
            getUrlAllParams: function () {
                // 解决乱码问题
                var url = decodeURI(window.location.href)
                var res = {}
                var url_data = _.split(url, '?').length > 1 ? _.split(url, '?')[1] : null ;
                if (!url_data) return null
                var params_arr = _.split(url_data, '&')
                _.forEach(params_arr, function(item) {
                    var key = _.split(item, '=')[0]
                    var value = _.split(item, '=')[1]
                    res[key] = value
                });
                return res
            }
        },
        created: function () {
            var self = this;
            var params = self.getUrlAllParams();
            loading.showLoading("正在加载..","div");
            fetch(config.baseUrl + "/yszk/remindMe", {
                method: 'post',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.code === 200) {
                    self.totalSO = json.data.totalSO;
                    self.totalJS = json.data.totalJS;
                    self.totalSK = json.data.totalSK;
                }
            })
            //https://ask.dcloud.net.cn/article/12856
        }
    })
})