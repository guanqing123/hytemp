define(['config', 'vue', 'installer'], function (config, Vue, installer) {
    Vue.use(installer);
    new Vue({
        el: '#download',
        template: `<div v-show="isWeiXin" style="position: fixed; left: 0px; top: 0px; height: 1879px; width: 100%; z-index: 1000; background-color: rgba(0, 0, 0, 0.8);">
            <p style="text-align: center; margin-top: 10%; padding-left: 5%; padding-right: 5%;">
                <img src="images/dark.png" alt="微信打开" style="max-width: 100%; height: auto;">
            </p>
        </div>`,
        data: function () {
            return {
                isWeiXin: false
            }
        },
        created: function () {
            var self = this;
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                self.isWeiXin = true; // 是微信端
            } else {
                self.isWeiXin = false;
            }
            if (self.isWeiXin) return;
            var params = this.$urlParams();
            window.top.location.href = config.testUrl + '/cpsms/down?fileName=' + params.wjm;
        }
    })
})