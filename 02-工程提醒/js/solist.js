define(['config', 'vue', 'iscrollTable', 'installer', 'lodash'], function (config, Vue, iscrollTable, installer, _) {
    Vue.use(installer);
    new Vue({
        el: '#solist',
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
                            field_name: "XMBH",
                            name: "项目编号"
                        },
                        {
                            field_name: "DDH",
                            name: "订单号"
                        }
                    ]
                ],
                xField: ['XMBH', 'DDH'],
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
            nextPage: function () {
              var self = this;
              self.getData();
            },
            getData: function () {
                var self = this;
                self.$show('数据加载中...');
                fetch(config.baseUrl + '/yszk/soList',{
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
                        self.currentPage ++
                    }
                });
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
        }
    })
})