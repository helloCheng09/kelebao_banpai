/*!

@Title: wall-e
@Description: 小移动前端方法合集
@Site: www.xiaofuni.cn
@Author: 瓦力
@License: 

*/
;
!(function () {
    "use strict";

    function WallE() {
        this.v = '1.0.0'; // 版本号
    }
    /**
     * 微信
     * 选择图片
     * 上传图片
     */
    WallE.prototype.wx_uploadimg = function ( payload, option) {
        var count = 1, // 选择照片数量
            sizeType = ['original', 'compressed'], // 照片是否压缩
            sourceType = ['album', 'camera']; // 相册还是相机
        if (typeof (opton) == Object) {
            !option.count ? count = 1 : count = option.count;
            !option.sizeType ? sizeType = ['original', 'compressed'] : sizeType = option.sizeType;
            !option.sourceType ? sourceType = ['album', 'camera'] : sourceType = option.sourceType;
        }
        wx.chooseImage({
            count: count,
            sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
            sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds[0];
                wx.uploadImage({
                    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 0, // 默认为1，显示进度提示
                    success: function (res) {
                        var localId = res.localId
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        payload({
                            localId: localId,
                            serverId: serverId
                        })
                    }
                });
            }
        });
    }

    /**
     * 图片预加载
     * img          string
     * imgele      string
     */
    WallE.prototype.preloadimg = function (option) {
        // 预加载图片
        var img = option.img
        // 替换的img element
        var imgele = $(option.imgele)
        var oImg = new Image()
        oImg.onload = function () {
            imgele.attr('src', oImg.src)
        }
        oImg.src = img
    }

    /*!
     *textarea 自动适应高度
     * @ textarea 的id值
     */
    WallE.prototype.autoTextarea = function (textareaId) {
        /**
         * 文本框根据输入内容自适应高度
         * @param                {HTMLElement}        输入框元素
         * @param                {Number}                设置光标与输入框保持的距离(默认0)
         * @param                {Number}                设置最大高度(可选)
         */
        var autoTextarea = function (elem, extra, maxHeight) {
            extra = extra || 0;
            var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                    elem.addEventListener ?
                        elem.addEventListener(type, callback, false) :
                        elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                    var val = elem.currentStyle[name];
                    if (name === 'height' && val.search(/px/i) !== 1) {
                        var rect = elem.getBoundingClientRect();
                        return rect.bottom - rect.top -
                            parseFloat(getStyle('paddingTop')) -
                            parseFloat(getStyle('paddingBottom')) + 'px';
                    };
                    return val;
                } : function (name) {
                    return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));
            elem.style.resize = 'none';
            var change = function () {
                var scrollTop, height,
                    padding = 0,
                    style = elem.style;
                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;
                if (!isFirefox && !isOpera) {
                    padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle(
                        'paddingBottom'));
                };
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                    if (maxHeight && elem.scrollHeight > maxHeight) {
                        height = maxHeight - padding;
                        style.overflowY = 'auto';
                    } else {
                        height = elem.scrollHeight - padding;
                        style.overflowY = 'hidden';
                    };
                    style.height = height + extra + 'px';
                    scrollTop += parseInt(style.height) - elem.currHeight;
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    elem.currHeight = parseInt(style.height);
                };
            };
            addEvent('propertychange', change);
            addEvent('input', change);
            addEvent('focus', change);
            change();
        };
        var text = document.getElementById(textareaId);
        autoTextarea(text);
    }
    /*!
     * 获取地址栏中参数值
     */
    WallE.prototype.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    /**
     *  全屏滚动 元素是否在可见范围内
     */
    WallE.prototype.elemVisible = function () {
        // 可视区域上边界限 $(window).scrollTop()
        // 下边界 $(window).scrollTop() + $(window).height()
        // 元素 顶边距离顶部距离要大于上边界 elem.offset().top
        // 元素 底边距离底部距离要小于下边界 elem.offset().top + elem.height()
        var midHeight = $(scrollPn) / 2
        var winTop = $(scrollPn).scrollTop()
        var winBot = $(scrollPn).scrollTop() + $(scrollPn).height() - 50
        var elemTop = elem.offset().top
        var elemBot = elem.offset().top + elem.height()

        // 在可视范围内
        if (elemTop > winTop && elemBot < winBot) {
            return true
        } else {
            return false
        }
    }

    /**
     * 获取当前手机网络状态 
     * 返回 Number 3 为wifi 6为4G
     */
    WallE.prototype.showNet = function () {
        myNetInfo = plus.networkinfo.getCurrentType()
        return myNetInfo
        // if(window.plus){
        //     root.showNet();
        // }else{
        //     document.addEventListener("plusready", showNet, false);
        // }
    }

    /**
     * 扩展方法和属性
     * extend
     */
    WallE.prototype.extend = function (obj) {
        Object.keys(obj).forEach(function (key) {
            var index = key
            var item = obj[key]
            wall[index] = item
        })
    }

    /**
     * 判断ios 和 android
     * 返回 ios android pc
     */
    WallE.prototype.whichEnd = function () {
        // 判断设备
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'android'
        } else if (isiOS) {
            return 'ios'
        } else {
            return 'pc'
        }
    }
    /**
     * animation 动画效果
     * #1 弹簧式
     * #2 淡入淡出
     * #3 不规则下落
     * 
     */
    WallE.prototype.animation = function () {

    }

    /**
     * alert弹窗
     */
    /**
     * animationDuration 动画时间
     * aniClass 动画分类 {ani-spring 弹簧}
     * delay 延迟关闭时间
     * maskbg 最外层背景色
     * bg 文本区域背景色
     * 
     **/
    WallE.prototype.alert = function (content, options) {
        // 关闭前一个弹窗
        clearTimeout(wall.alertTimer)
        $(".wall-alert").remove()
        // 参数识别
        var animationDuration, aniClass, delay, marskbg, bg
        options.marskbg ? marskbg = options.marskbg : marskbg = 'transparent'
        options.bg ? bg = options.bg : bg = 'rgba(0, 0, 0, 0.8)'
        options.animationDuration ? animationDuration = options.animationDuration : animationDuration = 200;
        options.delay ? delay = options.delay : delay = 1000;
        if (!content) { // 有弹窗内容
            if (options.alertHtml) {
                wallAlert = `
                <div class="wall-alert" style="display:flex" >
                    <div class="wall-alert-content wall-animation ${aniClass}" style="display:block;animation-duration: ${animationDuration}ms;">
                        ${options.alertHtml}
                    </div>
                </div>  
            `
            } else {
                if (options.loadingAni) {
                    var loadingAni = options.loadingAni
                    switch (loadingAni) {
                        case 1:
                            // 动画1
                            wallAlert = `
                                <div class="wall-alert" style="display:flex" >
                                    <div class="wall-alert-content wall-animation ${aniClass}" style="display:block;animation-duration: 999999ms;">
                                        <div id="ajaxloader2">
                                            <div class="outer"></div>
                                            <div class="inner"></div>
                                        </div>
                                    </div>
                                </div>  
                            `
                            break;
                    }
                } else {
                    console.error('请填入alert内容')
                }
            }
        } else {
            options.aniClass ? aniClass = options.aniClass : aniClass = "ani-spring";
            var wallAlert = `
                <div class="wall-alert" style="display:flex" >
                    <div class="wall-alert-content wall-animation ${aniClass}" style="display:block;animation-duration: ${animationDuration}ms;">
                        ${content}
                    </div>
                </div>  
            `;
        }

        // 弹出
        $('html').append(wallAlert)
        $('.wall-alert .wall-alert-content').css('backgroundColor', bg)
        $('.wall-alert').css('backgroundColor', marskbg)
        $("." + aniClass).removeClass("aniClass")

        // 延时关闭 关闭
        wall.alertTimer = setTimeout(() => {
            switch (aniClass) {
                case 'ani-spring':
                    springAni()
                    break;
            }

            function springAni() {
                $('.wall-alert-content').addClass('ani-spring-out')
                setTimeout(() => {
                    $(".wall-alert").remove()
                }, animationDuration);
            }
        }, delay);
        return false;
    }

    /**
     * 加载动画
     * fn load()
     * 
     * 
     */
    WallE.prototype.load = function (options) {
        var wallAlert, loadstyle, animationDuration, marskbg, bg
        options.loadstyle ? loadstyle = options.loadstyle : loadstyle = 1 // 加载预设
        options.marskbg ? marskbg = options.marskbg : marskbg = 'transparent'
        // options.bg ? bg = options.bg : bg = 'rgba(0, 0, 0, 0.8)'
        options.bg ? bg = options.bg : bg = 'transparent'
        switch (loadstyle) {
            case 1:
                // 动画1
                wallAlert = `
                <div class="wall-alert load-alert" style="display:flex" >
                        <div class="wall-alert-content wall-animation ani-spring" style="display:block;animation-duration: 200ms;">
                            <div id="ajaxbar1">
                            <div id="block1" class="barlittle"></div>
                            <div id="block2" class="barlittle"></div>
                            <div id="block3" class="barlittle"></div>
                            <div id="block4" class="barlittle"></div>
                            <div id="block5" class="barlittle"></div>
                    </div>
                        </div>
                    </div>  
                `
                break
            case 2:
                // 动画2
                wallAlert = `
                 <div class="wall-alert load-alert" style="display:flex" >
                         <div class="wall-alert-content wall-animation ani-spring" style="display:block;animation-duration: 200ms;">
                             <div id="ajaxloader2">
                                 <div class="outer"></div>
                                 <div class="inner"></div>
                             </div>
                         </div>
                     </div>  
                 `
                break
            case 3:
                // 动画3
                wallAlert = `
                  <div class="wall-alert load-alert" style="display:flex" >
                          <div class="wall-alert-content wall-animation ani-spring" style="">
                            <div id="ajaxwave1">
                                <div id="pointcircle1" class="pointcircle"></div>
                                <div id="pointcircle2" class="pointcircle"></div>
                                <div id="pointcircle3" class="pointcircle"></div>
                                <div id="pointcircle4" class="pointcircle"></div>
                                <div id="pointcircle5" class="pointcircle"></div>
                            </div>
                          </div>
                      </div>  
                  `
                break
            case 4:
                // 动画4
                wallAlert = `
                  <div class="wall-alert load-alert" style="display:flex" >
                          <div class="wall-alert-content wall-animation ani-spring" style="">
                            <div id="facebook">
                                <div class="bar"></div>
                                <div class="bar"></div>
                                <div class="bar"></div>
                            </div> 
                          </div>
                      </div>  
                  `
                break
            case 5:
                // 动画5
                wallAlert = `
                <div class="wall-alert load-alert" style="display:flex" >
                <div class="wall-alert-content wall-animation ani-spring" style="">
                <div class="spinner spinnerTwo"><span></span>
                </div>
                </div>
            </div>  
                  `
                break
            case 6:
                // 动画6
                wallAlert = `
                    <div class="wall-alert load-alert" style="display:flex" >
                        <div class="wall-alert-content wall-animation ani-spring" style="">
                            <div class="spinner spinnerThree">
                                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                    </div> 
                  `
                break
        }

        $('html').append(wallAlert)
        $('.wall-alert .wall-alert-content').css('backgroundColor', bg)
        $('.wall-alert').css('backgroundColor', marskbg)
        return {
            source: "load",
            html: wallAlert
        }
    }

    /**
     * 关闭方法
     */
    WallE.prototype.close = function (index) {
        // console.log(index)
        switch (index.source) {
            case "alert":
                break;
            case "load":
                $('.load-alert').remove()
                break;
        }
    }

    /**
     * 基于jq layui的ajax请求加载动画设置
     * iconNum layui 加载动画号
     * loadingAnimation 自定义加载动画
     */
    WallE.prototype.loadingShow = function (loadingAnimation) {
        // iconNum ? iconNum : iconNum = 0
        // 用户未自定义加载动画
        if (!loadingAnimation) {
            var index
            $('html,body').ajaxStart(function () {
                index = layer.load(iconNum, {
                    shade: false
                }); //0代表加载的风格，支持0-2
            });
            $('html,body').ajaxStop(function () {
                layer.close(index)
            });

            return false
        }

        // 用户已自定义加载动画
        $('html,body').ajaxStart(function () {

        });
        $('html,body').ajaxStop(function () {

        });
    }





    window.wall = new WallE()
})()