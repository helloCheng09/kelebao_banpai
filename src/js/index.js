(function(wall) {
    /**
     * Limit Public
     * Bind wall
     */
    wall.extend({})
        // 请求地址
        // https://www.easy-mock.com/mock/5cce2e138ae25d6ff1c9cca5/jiesonglist/jslist
        // wall.baseurl = 'https://www.easy-mock.com/mock/5cce2e138ae25d6ff1c9cca5/jiesonglist'
    wall.baseurl = 'http://www.mamawozaizhe.com/index.php/mobile2/jieSong/'
    wall.$api = {}
        // 入口
    if (document.getElementById('bpindexwrap')) {
        bpindexwrap()
    } else if (document.getElementById('classwrap')) {
        classdet()
    } else if (document.getElementById('signinwrap')) {
        signin()
    } else if (document.getElementById('picwrap')) {
        picshow()
    }

    /**
     * Functions
     * #1 bpindexwrap()
     */

    // 班牌首页
    function bpindexwrap() {
        // 轮播图
        // 课程列表
        var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {},
        })
    }
    // 班牌班级详情
    function classdet() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
        })
    }

    // 班牌 签到
    function signin() {
        // $('<div class="panel" style="width: 400px; text-align: center;">\n      <span style="color: #808080; font-size: 12px;">skipOverlapLabels:</span>\n      <button style="width: 50px;" id="skip">true</button>\n      <button class="active" style="width: 50px;" id="notSkip">false</button>\n    </div>').insertBefore('#mountNode');

        var data = [{
            name: '迟到',
            y: 2,
            const: 'const'
        }, {
            name: '实到',
            y: 34,
            const: 'const'
        }, {
            name: '请假',
            y: 5,
            const: 'const'
        }, {
            name: '未到',
            y: 1,
            const: 'const'
        }];

        var chart = new F2.Chart({
            id: 'mountNode',
            pixelRatio: window.devicePixelRatio
        });

        chart.source(data);
        chart.coord('polar', {
            transposed: true,
            radius: 0.75
        });
        chart.legend(false);
        chart.axis(false);
        chart.tooltip(false);

        // 添加饼图文本
        chart.pieLabel({
            sidePadding: 40,
            label1: function label1(data, color) {
                return {
                    text: data.name,
                    fill: color
                };
            },
            label2: function label2(data) {
                return {
                    text: String(Math.floor(data.y * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '人',
                    fill: '#808080',
                    fontWeight: 'bold'
                };
            }
        });

        chart.interval().position('const*y').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864']).adjust('stack');
        chart.render();

    }

    // 图片墙
    function picshow() {
        layui.use('flow', function() {
            var flow = layui.flow;

            flow.load({
                elem: '#LAY_demo1' //流加载容器
                    ,
                scrollElem: '#LAY_demo1' //滚动条所在元素，一般不用填，此处只是演示需要。
                    ,
                done: function(page, next) { //执行下一页的回调

                    //模拟数据插入
                    setTimeout(function() {
                        var lis = [];
                        for (var i = 0; i < 18; i++) {
                            lis.push('<li>' + '<img src="../img/pic3.png" alt=""><div class="des-text">班级荣誉</div>' + '</li>')
                        }

                        //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                        //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                        next(lis.join(''), page < 10); //假设总页数为 10
                    }, 500);
                }
            });

        });

    }

})(window.wall || (window.wall = {}))