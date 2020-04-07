define(['config', 'vue', 'installer', 'mui'], function (config, Vue, installer, mui) {
    Vue.use(installer);
    new Vue({
        el: '#index',
        template: '<div class="mui-content">\n' +
        '            <div class="mui-content-padded" style="margin: 15px 5px 0px 5px">\n' +
        '                <div class="mui-input-row mui-search">\n' +
        '                    <input type="search" class="mui-input-clear" placeholder="产品型号" @blur="search">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\t\t    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">\n' +
        '\t\t        <li class="mui-table-view-cell" v-for="sms in cpsms">\n' +
        '\t\t            <div class="mui-table">\n' +
        '\t\t                <div class="mui-table-cell mui-col-xs-12">\n' +
        '\t\t                    <h4 class="mui-ellipsis">型号：{{sms.cpxh}}</h4>\n' +
        '\t\t                    <p class="mui-h6 mui-ellipsis">名称：{{sms.cpmc}}</p>\n' +
        '\t\t                    <h6>代码：{{sms.cpdm}}</h6>\n' +
        '\t\t                    <div v-if="sms.lbs.length > 0" style="display: flex">\n' +
        '                                <template v-for="lb in sms.lbs">\n' +
        '                                    <template v-if="lb.lb === 1">\n' +
        '                                        <a href="javascript:void(0);" @click="download(wjm)" style="flex: 1; font-size: 12px;" v-for="(wjm, index) in lb.wjms">说明书-{{index+1}}</a>\n' +
        '                                    </template>\n' +
        '                                    <template v-else>\n' +
        '                                        <a href="javascript:void(0);" @click="download(wjm)" style="flex: 1; font-size: 12px;" v-for="(wjm, index) in lb.wjms">ROSH-{{index+1}}</a>\n' +
        '                                    </template>\n' +
        '                                </template>\n' +
        '                            </div>\n' +
        '\t\t                </div>\n' +
        '                    </div>\n' +
        '\t\t        </li>\n' +
        '\t\t    </ul>\n' +
        '\t\t</div>',
        data: function () {
            return {
                cpsms: []
            }
        },
        methods: {
            search: function (e) {
                var self = this;
                self.$show('数据加载中...');
                var params = "current=0&size=20&condition=" + e.target.value;
                fetch(config.testUrl + "/cpsms/search", {
                    method: 'post',
                    body: params,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    self.$hide();
                    if (self.$judgecode(json)) {
                        self.cpsms = json.data.records
                    }
                });
            },
            download: function (wjm) {
                var self = this;
                self.$show('下载中...');
                fetch(config.testUrl + "/cpsms/download", {
                    method: 'post',
                    body: JSON.stringify(wjm),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // .then(res => res.blob().then(blob => {
                    .then(function (response) {
                        response.blob().then(function (blob) {
                            self.$hide();
                            var filename = wjm.wjm;
                            if (window.navigator.msSaveOrOpenBlob) {
                                navigator.msSaveBlob(blob, filename); //兼容ie10
                            } else {
                                var a = document.createElement('a');

                                document.body.appendChild(a) //兼容火狐，将a标签添加到body当中

                                var url = window.URL.createObjectURL(blob);   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
                                a.href = url;
                                a.download = filename;
                                a.target='_blank'; // a标签增加target属性
                                a.click();
                                a.remove(); //移除a标签
                                window.URL.revokeObjectURL(url);
                                // window.open(URL.createObjectURL(blob))
                            }
                        })
                    })

                // }));
            }
        },
        created: function () {
            /*var self = this;
            self.$show('数据加载中...');
            fetch(config.testUrl + "/cpsms/search", {
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
            });*/
        },
        mounted: function () {
            this.$nextTick(function () {
                mui('.mui-input-row input').input();
            })
        }
    })
})