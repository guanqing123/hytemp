define(['config', 'vue', 'installer'], function (config, Vue, installer) {
    Vue.use(installer);
    new Vue({
        el: '#index',
        template: `<div class="mui-content">
            <div class="mui-input-row mui-search">
                <input type="search" class="mui-input-clear" placeholder="">
            </div>
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <h4 class="mui-ellipsis">信息化推进办公室张彦合同付款信息化</h4>
		                    <h5>申请人：李四</h5>
		                    <p class="mui-h6 mui-ellipsis">Hi，李明明，申请交行信息卡，100元等你拿，李明明，申请交行信息卡，100元等你拿，</p>
		                </div>
		                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <h4 class="mui-ellipsis-2">信息化推进办公室张彦合同付款信息化推进办公室张彦合同付款信息化推进办公室张彦合同付款</h4>
		                    <h5>申请人：李四</h5>
		                    <p class="mui-h6 mui-ellipsis">Hi，李明明，申请交行信息卡，100元等你拿，李明明，申请交行信息卡，100元等你拿，</p>
		                </div>
		                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                     
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <h4 class="mui-ellipsis-2">信息化推进办公室张彦合同付款信息化推进办公室张彦合同付款信息化推进办公室张彦合同付款</h4>
		                    <h5>申请人：李四</h5>
		                    <p class="mui-h6 mui-ellipsis">Hi，李明明，申请交行信息卡，100元等你拿，李明明，申请交行信息卡，100元等你拿，</p>
		                </div>
		                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                    
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <h4 class="mui-ellipsis-2">信息化推进办公室张彦合同付款信息化推进办公室张彦合同付款信息化推进办公室张彦合同付款</h4>
		                    <h5>申请人：李四</h5>
		                    <p class="mui-h6 mui-ellipsis">Hi，李明明，申请交行信息卡，100元等你拿，李明明，申请交行信息卡，100元等你拿，</p>
		                </div>
		                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                   
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <h4 class="mui-ellipsis-2">信息化推进办公室张彦合同付款信息化推进办公室张彦合同付款信息化推进办公室张彦合同付款</h4>
		                    <h5>申请人：李四</h5>
		                    <p class="mui-h6 mui-ellipsis">Hi，李明明，申请交行信息卡，100元等你拿，李明明，申请交行信息卡，100元等你拿，</p>
		                </div>
		                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                     
		                </div>
		            </div>
		        </li>
		    </ul>
		</div>`,
        data: function () {
            return {
                totalSO: 0,
                totalJS: 0,
                totalSK: 0
            }
        },
        methods: {

        },
        created: function () {
/*            var self = this;
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
            });*/
        }
    })
})