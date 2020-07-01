define(['config', 'vue', 'iscrollTable', 'installer', 'lodash'], function (config, Vue, iscrollTable, installer, _) {
    Vue.use(installer);
    new Vue({
        el: '#jslist',
        template: ` <div class="pages-tables" id="pages-tables">
                <div class="rolling-table meal-table" ref="tableBox" :style="{height: maxHeight + 'px'}">
                    <table class="table" id="table" cellpadding="0" cellspacing="0" ref="rollingTable">
                        <tr v-for="(x,i) in xList" :key="i">
                            <th class="rows " :class="{'cross': index == 0 && i == 0}" v-for="(l,index) in x" :key="index" :colspan="l.colspan" :rowspan="l.rowspan">{{l.name}}</th>
                        </tr>
                        <tr v-for="(l,i) in yList" :key="i + 'a'">
                            <template v-for="(x, xKey) in xField">
                                <td v-for="(ll,yKey) in l" :key="yKey" v-if="x === yKey" :class="{'cols': yKey == xField[0]}">
                                    {{ yList[i][yKey]}}
                                </td>
                            </template>
                        </tr>
                        <tr></tr>
                    </table>
                </div>
        </div>`,
        data: function () {
            return {
                maxHeight:'100%',
                scroll: {
                    scroller: null
                },
                xList: [
                    [
                        {
                            field_name: "PJT",
                            name: "项目编号"
                        },
                        {
                            field_name: "OPPDES_0",
                            name: "项目名称"
                        },
                        {
                            field_name: "RQ",
                            name: "发货日期"
                        },
                        {
                            field_name: "FHJE",
                            name: "发货金额"
                        },
                        {
                            field_name: "JSFP",
                            name: "已开金税"
                        },
                        {
                            field_name: "FLJE",
                            name: "返利金额"
                        },
                        {
                            field_name: "THJE",
                            name: "退货金额"
                        },
                        {
                            field_name: "DKJS",
                            name: "待开金税"
                        }
                    ]
                ],
                xField: ['PJT', 'OPPDES_0', 'RQ', 'FHJE', 'JSFP', 'FLJE', 'THJE', 'DKJS'],
                yList: [],
                current: 1,
                size: 65536,
                pages: 0, // 总页数
                currentPage: 1, // 当前页数
                total: 0, // 总条数
                ygbm: ''
            }
        },
        methods: {
            getData: function () {
                var self = this;
                self.$show('数据加载中...');
                fetch(config.baseUrl + '/yszk/jsList',{
                    method: 'post',
                    body: JSON.stringify({
                        ygbm : self.ygbm,
                        current: self.currentPage,
                        size: self.size
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(json => {
                    self.$hide();
                    if (self.$judgecode(json)) {
                        self.total = json.data.total;
                        self.pages = json.data.pages;
                        self.$set(self, 'yList', _.concat(self.yList, json.data.records));
                        self.currentPage ++;
                    }
                });
            },
            hengshuping: function () {
                var self = this;
                setTimeout(function () {
                    if(window.orientation==180||window.orientation==0){
                        self.maxHeight = window.innerHeight;
                        self.scroll.scroller.refresh();
                    }
                    if(window.orientation==90||window.orientation==-90){
                        self.maxHeight = window.innerHeight;
                        self.scroll.scroller.refresh();
                    }
                }, 200);
            }
        },
        created: function () {
            var params = this.$urlParams();
            this.ygbm = params.ygbm;
            this.getData();
        },
        mounted: function () {
            // this.maxHeight = window.screen.height
            this.maxHeight = window.innerHeight
            this.scroll.scroller =  iscrollTable.createIScroller(".meal-table");
            // addWaterMarker(document.getElementById('watermark'))
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.hengshuping, false);
        },
        beforeDestroy: function () {
            window.removeEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.hengshuping, false);
        }
    })
})