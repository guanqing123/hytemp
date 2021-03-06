define(['lodash', 'mui'], function (_, mui) {
    /* 扩展mui.showLoading */
    (function($, window) {
        //显示加载框
        $.showLoading = function(message,type) {
            if ($.os.plus && type !== 'div') {
                $.plusReady(function() {
                    plus.nativeUI.showWaiting(message);
                });
            } else {
                var html = '';
                html += '<i class="mui-spinner mui-spinner-white"></i>';
                html += '<p class="text">' + (message || "数据加载中") + '</p>';

                //遮罩层
                var mask=document.getElementsByClassName("mui-show-loading-mask");
                if(mask.length==0){
                    mask = document.createElement('div');
                    mask.classList.add("mui-show-loading-mask");
                    document.body.appendChild(mask);
                    mask.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});
                }else{
                    mask[0].classList.remove("mui-show-loading-mask-hidden");
                }
                //加载框
                var toast=document.getElementsByClassName("mui-show-loading");
                if(toast.length==0){
                    toast = document.createElement('div');
                    toast.classList.add("mui-show-loading");
                    toast.classList.add('loading-visible');
                    document.body.appendChild(toast);
                    toast.innerHTML = html;
                    toast.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});
                }else{
                    toast[0].innerHTML = html;
                    toast[0].classList.add("loading-visible");
                }
            }
        };

        //隐藏加载框
        $.hideLoading = function(callback) {
            if ($.os.plus) {
                $.plusReady(function() {
                    plus.nativeUI.closeWaiting();
                });
            }
            var mask=document.getElementsByClassName("mui-show-loading-mask");
            var toast=document.getElementsByClassName("mui-show-loading");
            if(mask.length>0){
                mask[0].classList.add("mui-show-loading-mask-hidden");
            }
            if(toast.length>0){
                toast[0].classList.remove("loading-visible");
                callback && callback();
            }
        }
    })(mui, window);

    // vue插件必须具备Installer函数
    function Installer() { /*自定义初始化行为*/ }
    Installer.install = function (Vue) {

        /*获取url中全部参数的对象*/
        Vue.prototype.$urlParams = function () {
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
            return res;
        }

        /*loading*/
        Vue.prototype.$show = function (msg, type) {
            // 加载文字和类型，plus环境中类型为div时强制以div方式显示
            mui.showLoading(msg, type || "div");
        }

        /*hide*/
        Vue.prototype.$hide = function (callback) {
            // 隐藏后的回调函数
            mui.hideLoading(callback);
        }

        /* 判断请求结果 */
        Vue.prototype.$judgecode = function (res) {
            if (res.code != 200) {
                mui.toast(res.message, { duration:'short', type:'div' });
                return 0;
            } else {
                return 1;
            }
        }

        /* 根据文件类型判断是否是图片 */
        //图片文件的后缀名
        var imgExt = new Array(".png",".jpg",".jpeg",".bmp",".gif");

        //获取文件名后缀名
        String.prototype.extension = function(){
            var ext = null;
            var name = this.toLowerCase();
            var i = name.lastIndexOf(".");
            if(i > -1){
                var ext = name.substring(i);
            }
            return ext;
        }

        //判断Array中是否包含某个值
        Array.prototype.contain = function(obj){
            for(var i=0; i<this.length; i++){
                if(this[i] === obj)
                    return true;
            }
            return false;
        };

        //判断是否是图片文件
        Vue.prototype.$isImg = function (fileName) {
            var ext = fileName.extension();
            if (imgExt.contain(ext)) {
                return true;
            }
            return false;
        }
    }

    return Installer
})