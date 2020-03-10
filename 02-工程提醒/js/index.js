define(['config', 'vue', 'installer'], function (config, Vue, installer) {
    Vue.use(installer);
    new Vue({
        el: '#index',
        template: '<div id="root">' +
        '    <div @click="goso" class="mui-card">\n' +
        '        <div class="mui-card-header">签收单</div>\n' +
        '        <div class="mui-card-content">\n' +
        '            <div class="mui-card-content-inner">\n' +
        '                您管辖的客户有部分订单发货超过15天了，需要上传签收单啦！\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="mui-card-footer">待上传订单总数: <span style="color: red;">{{totalSO}}</span> (单位: 笔)</div>\n' +
        '    </div>\n' +
        '    <div @click="gojs" class="mui-card">\n' +
        '        <div class="mui-card-header">开票提醒</div>\n' +
        '        <div class="mui-card-content">\n' +
        '            <div class="mui-card-content-inner">\n' +
        '                您管辖的客户有部分订单发货超过45天了，请及时与客户对接开票事宜！\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="mui-card-footer">待开金税总计: <span style="color: red;">{{totalJS}}</span> (单位: 元)</div>\n' +
        '    </div>\n' +
        '    <div @click="gosk" class="mui-card">\n' +
        '        <div class="mui-card-header">收款提醒</div>\n' +
        '        <div class="mui-card-content">\n' +
        '            <div class="mui-card-content-inner">\n' +
        '                您管辖的客户有部分货款即将到支付节点（30天后），请及时与客户对接，落实付款事宜！\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="mui-card-footer">待收款总计：<span style="color: red;">{{totalSK}}</span> (单位: 元)</div>\n' +
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
            goso: function () {
                var self = this;
                var params = self.$urlParams();
                window.location.href = 'solist.html?ygbm='+ params.ygbm;
            },
            gojs: function () {
                var self = this;
                var params = self.$urlParams();
                window.location.href = 'jslist.html?ygbm='+ params.ygbm;
            },
            gosk: function () {
                var self = this;
                var params = self.$urlParams();
                window.location.href = 'sklist.html?ygbm='+ params.ygbm;
            }
        },
        created: function () {
            var self = this;
            var params = self.$urlParams();
            self.$show('数据加载中...');
            fetch(config.baseUrl + "/yszk/remindMe", {
                method: 'post',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => {
                self.$hide();
                if (self.$judgecode(json)){
                    self.totalSO = json.data.totalSO;
                    self.totalJS = json.data.totalJS;
                    self.totalSK = json.data.totalSK;
                }
            })
            .catch(function (err) {
                self.$hide();
            });
        }
    })
})