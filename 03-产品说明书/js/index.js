define(['config', 'vue', 'plugins/installer', 'plugins/PullUpDown','mui', 'jquery'], function (config, Vue, installer, PullUpDown, mui, $) {
    Vue.use(installer);
    new Vue({
        el: '#index',
        components: {
            "PullUpDown" : PullUpDown
        },
        template: `<div class="mui-content">
             <div class="mui-content-padded" style="margin: 15px 5px 0px 5px">
                 <div class="mui-input-row mui-search">
                     <input type="search" class="mui-input-clear customW" placeholder="产品型号" @blur="search">
                     <button type="button" >搜索</button>
                 </div>
             </div>
             <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed pull">
                <PullUpDown ref="pull" :pullDown="false" :sum="sum" :currentPage="currentPage" :count="count" @nextPage="nextPage">
                 <li class="mui-table-view-cell" v-for="sms in cpsms">
                     <div class="mui-table">
                         <div class="mui-table-cell mui-col-xs-12">
                             <h4 class="mui-ellipsis">型号：{{sms.cpxh}}</h4>
                             <p class="mui-h6 mui-ellipsis">名称：{{sms.cpmc}}</p>
                             <h6>代码：{{sms.cpdm}}</h6>
                             <div v-if="sms.lbs.length > 0" style="display: flex">
                                 <template v-for="lb in sms.lbs">
                                     <template v-if="lb.lb === 1">
                                         <a href="javascript:void(0);" @click="download(wjm)" style="flex: 1; font-size: 12px;" v-for="(wjm, index) in lb.wjms">说明书-{{index+1}}</a>
                                     </template>
                                     <template v-else>
                                         <a href="javascript:void(0);" @click="download(wjm)" style="flex: 1; font-size: 12px;" v-for="(wjm, index) in lb.wjms">ROSH-{{index+1}}</a>
                                     </template>
                                 </template>
                             </div>
                         </div>
                     </div>
                 </li>
                 </PullUpDown>
             </ul>
             <div v-show="share" id="shadowContainer">
                <div class="iknow" @click="hideShare"></div>
             </div>
             <a class="backTop hide">
                <span class="mui-icon mui-icon-arrowup"></span>
             </a>
            
             <div class="mui-zoom-scroller" v-show="showImg" @click="hideImg">
                <img :src="src" data-preview-lazyload="" style="" class="mui-zoom" @load="loadImage">
             </div>
        </div>`,
        data: function () {
            return {
                cpsms: [],
                share: false,
                count: 0,
                currentPage: 0,
                sum: 0,
                condition:'',
                src:'',
                showImg: false
            }
        },
        methods: {
            search: function (e) {
                var self = this;
                self.$show('数据加载中...');
                self.currentPage = 1;
                self.condition = e.target.value;
                var params = "current="+self.currentPage+"&size=10&condition=" + self.condition;
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
                        var res = json.data;
                        self.cpsms = res.records
                        self.count = res.pages;
                        self.sum = res.total;
                        self.currentPage ++;
                        // 关闭下拉
                        self.$refs['pull'].closePullDown();
                    }
                });
            },
            /*download: function (wjm) {
                window.location.href = 'download.html?wjm='+ wjm.wjm
            },*/
            hideShare: function () {
                var self = this;
                self.share = !self.share
            },
            nextPage: function () {
                var self = this;
                self.$show('数据加载中...');
                var params = "current="+self.currentPage+"&size=10&condition=" + self.condition;
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
                        var res = json.data;
                        self.cpsms = self.cpsms.concat(res.records);
                        self.count = res.pages;
                        self.sum = res.total;
                        self.currentPage ++;
                        // 关闭下拉
                        self.$refs['pull'].closePullDown();
                    }
                });
            },
            download: function (wjm) {
                var self = this;
                if (!self.$isImg(wjm.wjm)) {
                    var btns = ['否', '下载'];
                    mui.confirm('非图片格式文件,是否下载?', '温馨提醒', btns, function (e) {
                        if (e.index == 1) {
                            window.location.href = 'download.html?wjm='+ wjm.wjm
                        }
                    })
                    return false;
                }
                self.$show('图片加载中...');
                /* fetch(config.testUrl + "/cpsms/d_f", {
                    method: 'post',
                    body: JSON.stringify(wjm),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.blob().then(blob => {
                    debugger
                    self.$hide();
                    var filename = wjm.wjm;
                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob, filename); //兼容ie10
                    } else {
                        var a = document.createElement('a');
                        document.body.appendChild(a) //兼容火狐，将a标签添加到body当中
                        var url = window.URL.createObjectURL(blob);   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
                        self.src = url;
                        a.href = url;
                        a.download = filename;
                        a.target='_blank'; // a标签增加target属性
                        a.click();
                        a.remove(); //移除a标签
                        window.URL.revokeObjectURL(url);
                    }
                }));*/
                self.src = config.testUrl + '/cpsms/down?fileName=' + wjm.wjm;
            },
            loadImage: function () {
                var self = this;
                self.showImg = true;
                self.$hide();
            },
            hideImg: function () {
                var self = this;
                self.showImg = false;
                self.src = "";
            }
        },
        mounted: function () {
            var self = this;
            this.$nextTick(function () {
                mui('.mui-input-row input').input();
            });
        }
    })
})