! function(e) {
    function t(o) { if (n[o]) return n[o].exports; var r = n[o] = { i: o, l: !1, exports: {} }; return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports } var n = {};
    t.m = e, t.c = n, t.d = function(e, n, o) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: o }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 240) }({ 0: function(e, t) { e.exports = jQuery }, 240: function(e, t, n) { "use strict";

        function o(e) { return e && e.__esModule ? e : { default: e } } var r = n(0),
            i = o(r),
            a = n(241),
            c = o(a);
        n(242), c.default.template = function(e) { var t = "translate(" + (e.clientX - 15) + "px, " + (e.clientY - 15) + "px)"; return { position: "fixed", left: 0, top: 0, background: "#999", border: "solid 1px #999", opacity: .6, borderRadius: "100%", height: "30px", width: "30px", padding: 0, margin: 0, display: "block", overflow: "hidden", pointerEvents: "none", webkitUserSelect: "none", mozUserSelect: "none", userSelect: "none", webkitTransform: t, mozTransform: t, transform: t } }, (0, c.default)(); var u = navigator.userAgent,
            s = !!u.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i),
            d = window.location.pathname; if (d = d.split("/")[1], s && "assets" === d) { var l = (0, i.default)('meta[name="chart-name"]').attr("content"),
                f = window.location.protocol + "//" + window.location.host + "/zh-cn/f2/3.x/demo/mobile-index.html";
            (0, i.default)('\n  <div class="header">\n    <a class="icon" href="' + f + '"></a>\n    ' + l + "\n  </div>").insertBefore(".chart-wrapper"), (0, i.default)("html").css("background-color", "#F4F6F9"), window.addEventListener("orientationchange", function() { 180 != window.orientation && 0 != window.orientation || window.location.reload(), 90 != window.orientation && -90 != window.orientation || window.location.reload() }) } }, 241: function(e, t, n) { "use strict"; var o;! function(r, i, a, c) {
            function u(e, t, n, o, r) { o = o || 0, r = r || 0, this.identifier = t, this.target = e, this.clientX = n.clientX + o, this.clientY = n.clientY + r, this.screenX = n.screenX + o, this.screenY = n.screenY + r, this.pageX = n.pageX + o, this.pageY = n.pageY + r }

            function s() { var e = []; return e.item = function(e) { return this[e] || null }, e.identifiedTouch = function(e) { return this[e + 1] || null }, e }

            function d() { for (var e = [r, i.documentElement], t = ["ontouchstart", "ontouchmove", "ontouchcancel", "ontouchend"], n = 0; n < e.length; n++)
                    for (var o = 0; o < t.length; o++) e[n] && e[n][t[o]] == c && (e[n][t[o]] = null) }

            function l() { return "ontouchstart" in r || r.Modernizr && r.Modernizr.touch || (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2 }

            function f(e) { e.preventDefault(), e.stopPropagation() }

            function h(e) { return function(t) { f(t), 1 === t.which && (("mousedown" == t.type || !E || E && !E.dispatchEvent) && (E = t.target), b && !t.shiftKey && (p("touchend", t), b = !1), p(e, t), !b && t.shiftKey && (b = !0, x = { pageX: t.pageX, pageY: t.pageY, clientX: t.clientX, clientY: t.clientY, screenX: t.screenX, screenY: t.screenY }, p("touchstart", t)), "mouseup" == t.type && (x = null, b = !1, E = null)) } }

            function p(e, t) { var n = i.createEvent("Event");
                n.initEvent(e, !0, !0), n.altKey = t.altKey, n.ctrlKey = t.ctrlKey, n.metaKey = t.metaKey, n.shiftKey = t.shiftKey, n.touches = m(t, e), n.targetTouches = m(t, e), n.changedTouches = g(t, e), E.dispatchEvent(n) }

            function v(e) { var t = new s; if (b) { var n = y.multiTouchOffset,
                        o = x.pageX - e.pageX,
                        r = x.pageY - e.pageY;
                    t.push(new u(E, 1, x, -1 * o - n, -1 * r + n)), t.push(new u(E, 2, x, o + n, r - n)) } else t.push(new u(E, 1, e, 0, 0)); return t }

            function m(e, t) { if ("mouseup" == e.type) return new s; var n = v(e); return b && "mouseup" != e.type && "touchend" == t && n.splice(1, 1), n }

            function g(e, t) { var n = v(e); return !b || "mouseup" == e.type || "touchstart" != t && "touchend" != t || n.splice(0, 1), n }

            function w(e) { var t, n, o, r; for (n = 0; n < e.touches.length; n++) { t = e.touches[n], o = X[t.identifier], o || (o = X[t.identifier] = i.createElement("div"), i.body.appendChild(o)), r = y.template(t); for (var a in r) o.style[a] = r[a] } if ("touchend" == e.type || "touchcancel" == e.type)
                    for (n = 0; n < e.changedTouches.length; n++) t = e.changedTouches[n], (o = X[t.identifier]) && (o.parentNode.removeChild(o), delete X[t.identifier]) }

            function y() { l() || (d(), r.addEventListener("mousedown", h("touchstart"), !0), r.addEventListener("mousemove", h("touchmove"), !0), r.addEventListener("mouseup", h("touchend"), !0), r.addEventListener("mouseenter", f, !0), r.addEventListener("mouseleave", f, !0), r.addEventListener("mouseout", f, !0), r.addEventListener("mouseover", f, !0), r.addEventListener("touchstart", w, !1), r.addEventListener("touchmove", w, !1), r.addEventListener("touchend", w, !1), r.addEventListener("touchcancel", w, !1)) } var x, E, b = !1,
                X = {};
            i.createTouch || (i.createTouch = function(e, t, n, o, i, a, s, d, l) { return d != c && l != c || (d = o - r.pageXOffset, l = i - r.pageYOffset), new u(t, n, { pageX: o, pageY: i, screenX: a, screenY: s, clientX: d, clientY: l }) }), i.createTouchList || (i.createTouchList = function() { for (var e = new s, t = 0; t < arguments.length; t++) e[t] = arguments[t]; return e.length = arguments.length, e }), y.multiTouchOffset = 75, y.template = function(e) { var t = "translate(" + (e.clientX - 15) + "px, " + (e.clientY - 15) + "px)"; return { position: "fixed", left: 0, top: 0, background: "#fff", border: "solid 1px #999", opacity: .6, borderRadius: "100%", height: "30px", width: "30px", padding: 0, margin: 0, display: "block", overflow: "hidden", pointerEvents: "none", webkitUserSelect: "none", mozUserSelect: "none", userSelect: "none", webkitTransform: t, mozTransform: t, transform: t } }, (o = function() { return y }.call(t, n, t, e)) !== c && (e.exports = o) }(window, document) }, 242: function(e, t) {} });