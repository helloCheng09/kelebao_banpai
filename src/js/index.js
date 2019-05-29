(function (wall) {
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
    }

    /**
     * Functions
     * #1 bpindexwrap()
     */

    // 
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


})(window.wall || (window.wall = {}))