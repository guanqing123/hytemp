define(['config', 'vue', 'installer', 'mui'], function (config, Vue, installer, mui) {
    Vue.use(installer);
    new Vue({
        el: '#index',
        template: `<div class="mui-content">
            <div class="mui-content-padded" style="margin: 15px 5px 0px 5px">
                <div class="mui-input-row mui-search">
                    <input type="search" class="mui-input-clear" placeholder="产品型号" @blur="search">
                </div>
            </div>
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
		        <li class="mui-table-view-cell" v-for="sms in cpsms">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-12">
		                    <h4 class="mui-ellipsis">型号：{{sms.cpxh}}</h4>
		                    <p class="mui-h6 mui-ellipsis">名称：{{sms.cpmc}}</p>
		                    <h6>代码：{{sms.cpdm}}</h6>
                            <template v-for="lb in sms.lbs">
                                <template v-if="lb.lb === 1">
                                    <a v-for="(wjm, index) in lb.wjms" class="mui-h6 mui-table-cell mui-col-xs-4">说明书-{{index+1}}</a>
                                </template>
                                <template v-else>
                                    <a v-for="(wjm, index) in lb.wjms" class="mui-h6 mui-table-cell mui-col-xs-4">ROSH-{{index+1}}</a>
                                </template>
                            </template>
		                </div>
		            </div>
		        </li>
		    </ul>
		</div>`,
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
                .then(res => res.json())
                .then(json => {
                    self.$hide();
                    if (self.$judgecode(json)) {
                        self.cpsms = json.data.records
                    }
                });
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