/*! EovendoScratchGame 0.0.1 30-12-2013 */
/*
appMsg 0.1

THIS FILE CONTAINS GENERAL FACEBOOK CONNECTION CODE
DO NOT ALTER THIS INFORMATION

Copyright Â© 2013 Kenneth BrÃ¸gger-Luplau
Blueblau

https://github.com/Blueblau/jQuery.appMsg

Copyright filed under MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
$(document).ready(function () {
    $.appMsg = { //Default configuration
        config: {
            type: "modal", //Default type
            "class": "appMsg", //Default class. CSS should be updates equally to this class
            title: null, //Default fallback text if buttons have no labels
            texts: {
                ok: "OK",
                cancel: "Cancel",
                yes: "Yes",
                no: "No",
                close: "Close"
            },
            afterShow: $.noop(), //Function called after modal appears
            afterHide: $.noop(), //Function called after modal hides
            ignorable: !0, //Dertermines if the closebutton should be present, if you should be able to close it by clicking the overlay or pressing esc-button.
            autoClose: !0, //Closes on each button press. If false, you will have to close it manually on each callback
            position: ["50%", "50%"], //Default position
            animate: {
                modal: ["flipInY", "bounceOutUp"], //Default animation
                alert: ["wobble", "bounceOutUp"]
            }
        }, //Kicker. Merges configuration.
        init: function (a) {
            var a = $.extend(this.config, a);
            $("body").attr("ontouchstart", "")
        }, //Prototype of modals
        modal: function (a, b) {
            var c = this,
                d = $.extend({}, this.config),
                b = $.extend(d, b),
                e = $(this._printModal(b)); //Print content
            if (e.data("config", b), e.data("config").title = a, //Print header
                b.title && e.append("<h2>" + a + "</h2>"), b.content) {
                var f = $("<div class='" + this.config["class"] + "-content' />"),
                    g = b.content;
                e.append(f), g instanceof jQuery && (g = g.clone(!0), b.originalContent = g, b.content.empty()), f.append(g)
            } //Print textfield
            b.input && e.append($(this._printInput(b))), //Print buttons
            b.buttons && $.each(b.buttons, function (a) {
                e.append(c._printButton(a, e))
            }), b.ignorable && e.append("<div class='" + this.config["class"] + "-close'><span></span></div>"), //Queue modal if a modal is currently visible
            this._visibleModal.length ? //Ignore queue
            b.ignoreQueue ? this.show(e) : this._modalsInQueue.push(e) : this.show(e)
        }, //Shows modals
        show: function (a) {
            var b = $(this._printOverlay()),
                c = a.data("config");
            this._visibleModal.unshift(a), $("body").append(b), b.append(a), this._updatePosition(a), b.hide().fadeIn("fast"), a.addClass("animated " + (c.animate[c.type] && c.animate[c.type][0] ? c.animate[c.type][0] : c.animate.modal[0])), c.afterShow && c.afterShow(), $.appMsg.bind.trigger("appMsg.afterShow"), this._handleBinds(a)
        }, //Hides modals
        hide: function (a) {
            var b = this;
            "undefined" == typeof a && (a = this._visibleModal[0]);
            var c = a.data().config;
            a.addClass("animated " + (c.animate[c.type] && c.animate[c.type][1] ? c.animate[c.type][1] : c.animate.modal[1])), a.parent().fadeOut("slow", function () {
                b._afterHide(), a.data().config.afterHide && a.data().config.afterHide(), //Restore the orginal content
                a.data().config.content instanceof jQuery && c.content.replaceWith(c.originalContent), a.trigger("remove"), a.remove(), $(this).remove()
            })
        }, //Event container
        bind: $(this), //Event fired after modals are hidden
        _afterHide: function () {
            this._visibleModal.shift(), this._modalsInQueue.length ? (this.show(this._modalsInQueue[0]), this._modalsInQueue.shift()) : $.appMsg.bind.trigger("appMsg.afterLastHide"), $.appMsg.bind.trigger("appMsg.afterHide")
        }, //Que container
        _modalsInQueue: [], //Current visible modal
        _visibleModal: [], //Positionupdater
        _updatePosition: function (a) {
            function b() {
                a.css({
                    top: c.config.position[0],
                    "margin-top": "-" + a.innerHeight() / 2 + "px",
                    left: c.config.position[1],
                    "margin-left": "-" + a.innerWidth() / 2 + "px"
                }), a.offset().top <= 0 && a.css({
                    position: "relative",
                    "margin-top": "25px",
                    "margin-bottom": "25px",
                    top: "0"
                }), a.outerHeight() > $(window).height() ? a.parent().css({
                    position: "absolute",
                    overflow: "scroll",
                    "-webkit-overflow-scrolling": "touch"
                }) : a.parent().css({
                    position: "fixed"
                }), $.appMsg.bind.trigger("appMsg.updatePosition", {
                    top: a.css("top"),
                    "margin-top": a.css("marginTop"),
                    left: a.css("left"),
                    "margin-left": a.css("marginLeft")
                })
            }
            var c = this;
            $(window).resize(function () {
                b()
            }), b()
        }, //Handles all binds to the DOM
        _handleBinds: function (a) {
            var b = this,
                c = a.data("config");
            c.ignorable ? (a.parent().on("click", function () {
                b.hide(a)
            }), a.click(function (a) {
                a.stopPropagation()
            }), $(document).keyup(function (c) {
                27 == c.keyCode && b.hide(a)
            })) : $(document).unbind("keyup"), c.autoClose && $("button", a).click(function () {
                b.hide(b._visibleModal[0])
            }), $("[class*='close'], [class*='close'] span", a).click(function () {
                b.hide(b._visibleModal[0])
            })
        }, //Creates the overlay in the DOM
        _printOverlay: function () {
            var a = $("<div class='" + this.config["class"] + "-overlay' />");
            return a
        }, //Creates the modal in the DOM
        _printModal: function (a) {
            var b = a.type,
                c = $("<div class='" + this.config["class"] + "-" + b + "' />");
            return a["class"] !== this.config["class"] && c.addClass(a["class"]), c
        }, //Creates inputs
        _printInput: function (a) {
            var b = $("<input type='text' class='" + this.config["class"] + "-input' placeholder='" + a.input + "' />");
            return b
        }, //Creates buttons
        _printButton: function (a, b) {
            var c, d = b.data("config");
            c = "function" == typeof d.buttons[a] ? this.config.texts[a] || this.config.texts.ok : d.buttons[a][0];
            var e;
            e = "function" == typeof d.buttons[a] ? d.buttons[a] : d.buttons[a][1];
            var f = $("<button class='" + this.config["class"] + "-" + a + " " + this.config["class"] + "'>" + c + "</button>");
            return f.unbind().click(function (c) {
                c.preventDefault();
                var f = {
                    title: b.data("config").title,
                    type: d.type,
                    button: a
                };
                $.appMsg.bind.trigger("appMsg.close", f), d.input && (f.input = b.find("input").val()), e(f)
            }), f
        }
    }, $("[data-appmsg-id]").on("click", function () {
        var a = $("#" + $(this).attr("data-appmsg-id"));
        $.appMsg.modal($.appMsg.config.title, $.extend($.appMsg.config, {
            content: a
        }))
    })
}),
/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
function (a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
}(navigator.userAgent || navigator.vendor || window.opera),
/*!
 * selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms of the MIT license.
 * selectivizr.com
 */
function (a) {}(this), window.Modernizr = function (a, b, c) {
    function d(a) {
        o.cssText = a
    }

    function e(a, b) {
        return typeof a === b
    }
    var f, g, h, i = "2.7.1",
        j = {}, k = !0,
        l = b.documentElement,
        m = "modernizr",
        n = b.createElement(m),
        o = n.style,
        p = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
        q = {}, r = [],
        s = r.slice,
        t = function (a, c, d, e) {
            var f, g, h, i, j = b.createElement("div"),
                k = b.body,
                n = k || b.createElement("body");
            if (parseInt(d, 10))
                for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : m + (d + 1), j.appendChild(h);
            return f = ["&#173;", '<style id="s', m, '">', a, "</style>"].join(""), j.id = m, (k ? j : n).innerHTML += f, n.appendChild(j), k || (n.style.background = "", n.style.overflow = "hidden", i = l.style.overflow, l.style.overflow = "hidden", l.appendChild(n)), g = c(j, a), k ? j.parentNode.removeChild(j) : (n.parentNode.removeChild(n), l.style.overflow = i), !! g
        }, u = function () {
            function a(a, f) {
                f = f || b.createElement(d[a] || "div"), a = "on" + a;
                var g = a in f;
                return g || (f.setAttribute || (f = b.createElement("div")), f.setAttribute && f.removeAttribute && (f.setAttribute(a, ""), g = e(f[a], "function"), e(f[a], "undefined") || (f[a] = c), f.removeAttribute(a))), f = null, g
            }
            var d = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return a
        }(),
        v = {}.hasOwnProperty;
    h = e(v, "undefined") || e(v.call, "undefined") ? function (a, b) {
        return b in a && e(a.constructor.prototype[b], "undefined")
    } : function (a, b) {
        return v.call(a, b)
    }, Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this;
        if ("function" != typeof b) throw new TypeError;
        var c = s.call(arguments, 1),
            d = function () {
                if (this instanceof d) {
                    var e = function () {};
                    e.prototype = b.prototype;
                    var f = new e,
                        g = b.apply(f, c.concat(s.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return b.apply(a, c.concat(s.call(arguments)))
            };
        return d
    }), q.canvas = function () {
        var a = b.createElement("canvas");
        return !!a.getContext && !! a.getContext("2d")
    }, q.touch = function () {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : t(["@media (", p.join("touch-enabled),("), m, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
            c = 9 === a.offsetTop
        }), c
    };
    for (var w in q) h(q, w) && (g = w.toLowerCase(), j[g] = q[w](), r.push((j[g] ? "" : "no-") + g));
    return j.addTest = function (a, b) {
        if ("object" == typeof a)
            for (var d in a) h(a, d) && j.addTest(d, a[d]);
        else {
            if (a = a.toLowerCase(), j[a] !== c) return j;
            b = "function" == typeof b ? b() : b, "undefined" != typeof k && k && (l.className += " " + (b ? "" : "no-") + a), j[a] = b
        }
        return j
    }, d(""), n = f = null,
    function (a, b) {
        function c(a, b) {
            var c = a.createElement("p"),
                d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function d() {
            var a = s.elements;
            return "string" == typeof a ? a.split(" ") : a
        }

        function e(a) {
            var b = r[a[p]];
            return b || (b = {}, q++, a[p] = q, r[q] = b), b
        }

        function f(a, c, d) {
            if (c || (c = b), k) return c.createElement(a);
            d || (d = e(c));
            var f;
            return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f)
        }

        function g(a, c) {
            if (a || (a = b), k) return a.createDocumentFragment();
            c = c || e(a);
            for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) f.createElement(h[g]);
            return f
        }

        function h(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
                return s.shivMethods ? f(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function (a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(s, b.frag)
        }

        function i(a) {
            a || (a = b);
            var d = e(a);
            return s.shivCSS && !j && !d.hasCSS && (d.hasCSS = !! c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || h(a, d), a
        }
        var j, k, l = "3.7.0",
            m = a.html5 || {}, n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            p = "_html5shiv",
            q = 0,
            r = {};
        ! function () {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function () {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                }()
            } catch (c) {
                j = !0, k = !0
            }
        }();
        var s = {
            elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: l,
            shivCSS: m.shivCSS !== !1,
            supportsUnknownElements: k,
            shivMethods: m.shivMethods !== !1,
            type: "default",
            shivDocument: i,
            createElement: f,
            createDocumentFragment: g
        };
        a.html5 = s, i(b)
    }(this, b), j._version = i, j._prefixes = p, j.hasEvent = u, j.testStyles = t, l.className = l.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (k ? " js " + r.join(" ") : ""), j
}(this, this.document),
function (a, b, c) {
    function d(a) {
        return "[object Function]" == q.call(a)
    }

    function e(a) {
        return "string" == typeof a
    }

    function f() {}

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = r.shift();
        s = 1, a ? a.t ? o(function () {
            ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : s = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && o(function () {
                    v.removeChild(l)
                }, 50);
                for (var d in A[c]) A[c].hasOwnProperty(d) && A[c][d].onload()
            }
        }
        var j = j || m.errorTimeout,
            l = b.createElement(a),
            n = 0,
            q = 0,
            t = {
                t: d,
                s: c,
                e: f,
                a: i,
                x: j
            };
        1 === A[c] && (q = 1, A[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
            k.call(this, q)
        }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), o(k, j)) : A[c].push(l))
    }

    function j(a, b, c, d, f) {
        return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 1 == r.length && h()), this
    }

    function k() {
        var a = m;
        return a.loader = {
            load: j,
            i: 0
        }, a
    }
    var l, m, n = b.documentElement,
        o = a.setTimeout,
        p = b.getElementsByTagName("script")[0],
        q = {}.toString,
        r = [],
        s = 0,
        t = "MozAppearance" in n.style,
        u = t && !! b.createRange().compareNode,
        v = u ? n : p.parentNode,
        n = a.opera && "[object Opera]" == q.call(a.opera),
        n = !! b.attachEvent && !n,
        w = t ? "object" : n ? "script" : "img",
        x = n ? "script" : w,
        y = Array.isArray || function (a) {
            return "[object Array]" == q.call(a)
        }, z = [],
        A = {}, B = {
            timeout: function (a, b) {
                return b.length && (a.timeout = b[0]), a
            }
        };
    m = function (a) {
        function b(a) {
            var b, c, d, a = a.split("!"),
                e = z.length,
                f = a.pop(),
                g = a.length,
                f = {
                    url: f,
                    origUrl: f,
                    prefixes: a
                };
            for (c = 0; g > c; c++) d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));
            for (c = 0; e > c; c++) f = z[c](f);
            return f
        }

        function g(a, e, f, g, h) {
            var i = b(a),
                j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), A[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (l = function () {
                        var a = [].slice.call(arguments);
                        m.apply(this, a), n()
                    }), g(a, l, b, 0, j);
                    else if (Object(a) === a)
                        for (i in h = function () {
                            var b, c = 0;
                            for (b in a) a.hasOwnProperty(b) && c++;
                            return c
                        }(), a) a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function () {
                            var a = [].slice.call(arguments);
                            m.apply(this, a), n()
                        } : l[i] = function (a) {
                            return function () {
                                var b = [].slice.call(arguments);
                                a && a.apply(this, b), n()
                            }
                        }(m[i])), g(a[i], l, b, i, j))
                } else !c && n()
            }
            var h, i, j = !! a.test,
                k = a.load || a.both,
                l = a.callback || f,
                m = l,
                n = a.complete || f;
            c(j ? a.yep : a.nope, !! k), k && c(k)
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0);
        else if (y(a))
            for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);
        else Object(a) === a && h(a, l)
    }, m.addPrefix = function (a, b) {
        B[a] = b
    }, m.addFilter = function (a) {
        z.push(a)
    }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", l = function () {
        b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k, l, n = b.createElement("script"),
            e = e || m.errorTimeout;
        n.src = a;
        for (l in d) n.setAttribute(l, d[l]);
        c = j ? h : c || f, n.onreadystatechange = n.onload = function () {
            !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null)
        }, o(function () {
            k || (k = 1, c(1))
        }, e), i ? n.onload() : p.parentNode.insertBefore(n, p)
    }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var j, e = b.createElement("link"),
            c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (p.parentNode.insertBefore(e, p), o(c, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
},
/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This wScratchPad jQuery plug-in is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @github      http://github.com/websanova/wScratchPad
 * @version         Version 1.4.4
 *
 ******************************************/
function (a) {
    function b(a, b) {
        return this.sp = null, this.settings = a, this.$elem = b, this.enabled = !0, this.scratch = !1, this.canvas = null, this.ctx = null, this
    }
    a.fn.wScratchPad = function (c, d) {
        if ("object" == typeof c) d = c;
        else if ("string" == typeof c) {
            var e = [],
                f = this.each(function () {
                    var b = a(this).data("_wScratchPad");
                    b && ("reset" === c ? b.reset() : "clear" === c ? b.clear() : "enabled" === c ? b.enabled = d === !0 : void 0 !== a.fn.wScratchPad.defaultSettings[c] && (void 0 !== d ? b.settings[c] = d : e.push(b.settings[c])))
                });
            return 1 === e.length ? e[0] : e.length > 0 ? e : f
        }
        return d = a.extend({}, a.fn.wScratchPad.defaultSettings, d || {}), this.each(function () {
            var c = a(this),
                e = jQuery.extend(!0, {}, d),
                f = document.createElement("canvas");
            if (!f.getContext) return c.html("Browser does not support HTML5 canvas, please upgrade to a more modern browser."), !1;
            var g = new b(e, c);
            c.append(g.generate()), //get number of pixels of canvas for percent calculations 
            g.pixels = g.canvas.width * g.canvas.height, c.data("_wScratchPad", g), g.init()
        })
    }, a.fn.wScratchPad.defaultSettings = {
        width: 210, // set width - best to match image width
        height: 100, // set height - best to match image height
        image: "", // set image path
        image2: null, // set overlay image path - if set color is not used
        color: "#336699", // set scratch color - if image2 is not set uses color
        overlay: "none", // set the type of overlay effect 'none', 'lighter' - only used with color
        size: 10, // set size of scratcher
        realtimePercent: !1, // Update scratch percent only on the mouseup/touchend (for better performances on mobile device)
        scratchDown: null, // scratchDown callback
        scratchUp: null, // scratchUp callback
        scratchMove: null, // scratcMove callback
        cursor: null
    }, b.prototype = {
        generate: function () {
            var b = this;
            return this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.sp = a("<div></div>").css({
                position: "relative"
            }).append(a(this.canvas).attr("width", this.settings.width + "px").attr("height", this.settings.height + "px")), a(this.canvas).mousedown(function (c) {
                return b.enabled ? (c.preventDefault(), c.stopPropagation(), //reset canvas offset in case it has moved
                    b.canvas_offset = a(b.canvas).offset(), b.scratch = !0, b.scratchFunc(c, b, "Down"), void 0) : !0
            }).mousemove(function (a) {
                a.preventDefault(), a.stopPropagation(), b.scratch && b.scratchFunc(a, b, "Move")
            }).mouseup(function (a) {
                a.preventDefault(), a.stopPropagation(), //make sure we are in draw mode otherwise this will fire on any mouse up.
                b.scratch && (b.scratch = !1, b.scratchFunc(a, b, "Up"))
            }), this.bindMobile(this.sp), this.sp
        },
        bindMobile: function (a) {
            a.bind("touchstart touchmove touchend touchcancel", function () {
                var a = event.changedTouches,
                    b = a[0],
                    c = "";
                switch (event.type) {
                case "touchstart":
                    c = "mousedown";
                    break;
                case "touchmove":
                    c = "mousemove";
                    break;
                case "touchend":
                    c = "mouseup";
                    break;
                default:
                    return
                }
                var d = document.createEvent("MouseEvent");
                d.initMouseEvent(c, !0, !0, window, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null), b.target.dispatchEvent(d), event.preventDefault()
            })
        },
        init: function () {
            this.sp.css("width", this.settings.width), this.sp.css("height", this.settings.height), this.sp.css("cursor", this.settings.cursor ? 'url("' + this.settings.cursor + '"), default' : "default"), a(this.canvas).css({
                cursor: this.settings.cursor ? 'url("' + this.settings.cursor + '"), default' : "default"
            }), this.canvas.width = this.settings.width, this.canvas.height = this.settings.height, this.pixels = this.canvas.width * this.canvas.height, this.settings.image2 ? this.drawImage(this.settings.image2) : ("none" != this.settings.overlay && "transparent" != this.settings.overlay ? (this.settings.image && this.drawImage(this.settings.image), this.ctx.globalCompositeOperation = this.settings.overlay) : "transparent" !== this.settings.overlay && this.setBgImage(), this.ctx.fillStyle = this.settings.color, this.ctx.beginPath(), this.ctx.rect(0, 0, this.settings.width, this.settings.height), this.ctx.fill())
        },
        reset: function () {
            this.ctx.globalCompositeOperation = "source-over", this.init()
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.settings.width, this.settings.height)
        },
        setBgImage: function () {
            this.settings.image && this.sp.css({
                backgroundImage: "url(" + this.settings.image + ")"
            })
        },
        drawImage: function (b) {
            var c = this,
                d = new Image;
            d.src = b, a(d).load(function () {
                c.ctx.drawImage(d, 0, 0, c.settings.width, c.settings.height), c.setBgImage()
            })
        },
        scratchFunc: function (a, b, c) {
            a.pageX = Math.floor(a.pageX - b.canvas_offset.left), a.pageY = Math.floor(a.pageY - b.canvas_offset.top), b["scratch" + c](a, b), (this.settings.realtimePercent || "Up" == c) && b.settings["scratch" + c] && b.settings["scratch" + c].apply(b, [a, b.scratchPercentage(b)])
        },
        scratchPercentage: function (a) {
            for (var b = 0, c = a.ctx.getImageData(0, 0, a.canvas.width, a.canvas.height), d = 0, e = c.data.length; e > d; d += 4) 0 == c.data[d] && 0 == c.data[d + 1] && 0 == c.data[d + 2] && 0 == c.data[d + 3] && b++;
            return 100 * (b / a.pixels)
        },
        scratchDown: function (a, b) {
            b.ctx.globalCompositeOperation = "destination-out", b.ctx.lineJoin = "round", b.ctx.lineCap = "round", b.ctx.strokeStyle = b.settings.color, b.ctx.lineWidth = b.settings.size, //draw single dot in case of a click without a move
            b.ctx.beginPath(), b.ctx.arc(a.pageX, a.pageY, b.settings.size / 2, 0, 2 * Math.PI, !0), b.ctx.closePath(), b.ctx.fill(), //start the path for a drag
            b.ctx.beginPath(), b.ctx.moveTo(a.pageX, a.pageY)
        },
        scratchMove: function (a, b) {
            b.ctx.lineTo(a.pageX, a.pageY), b.ctx.stroke()
        },
        scratchUp: function (a, b) {
            b.ctx.closePath()
        }
    }
}(jQuery);
var eo = {}, updateUserBalance = updateUserBalance || function () {
        console.log("updateUserBalance")
    }, OpenProfilePhoneNumberPopup = OpenProfilePhoneNumberPopup || function () {
        console.log("OpenProfilePhoneNumberPopup")
    }, OpenProfileAddressPopup = OpenProfileAddressPopup || function () {
        console.log("OpenProfileAddressPopup")
    };
eo.isMobile = !1, eo.isTablet = !1, eo.isIe8 = $.browser.msie && parseInt($.browser.version, 10) < 9, eo.isAndroid = navigator.userAgent.indexOf("Android") > -1 ? parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8)) : !1, eo.browserDetection = function () { //mobile
    ($.browser.mobile || $(".eo-mobile").length) && ($("html").addClass("eo-mobile"), this.isMobile = !0, Modernizr.canvas || this.handleInvalidBrowser(), //Android fix
        eo.isAndroid && ($("#eo-container").height($(window).height() - $(".Header").height()), $("html").addClass("eo-isAndroid")), $(window).scrollTop(1).scrollTop(0)), $("#eo").is(".eo-tablet") && ($("html").addClass("eo-tablet"), this.isTablet = !0), eo.isIe8 && $("html").addClass("lt-ie9"), $(".eo-card").bind("touchmove", !1), Modernizr.canvas || eo.isIe8 || this.handleInvalidBrowser()
}, eo.handleInvalidBrowser = function () {
    alert("Din browser understÃ¸ttes ikke!")
}, eo.init = function () {
    eo.username = eo.getUrlParameter("id") ? eo.getUrlParameter("id") : $("#username").val(), eo.browserDetection(), eo.handleBindings(), eo.scratchCompleteHandler.init(), eo.cardSlider.init()
}, eo.cardSlider = {
    currentCard: 0,
    $slider: $(".eo-card-slider"),
    totalCardsIndex: 2,
    positions: {
        offset: null,
        left: null,
        center: null,
        right: null
    },
    stages: null,
    update: function () {
        (eo.isMobile || eo.isTablet) && $("#eo").css("min-height", $(window).height() - $("#eo").position().top), this.cardWidth = $(".eo-card").first().width(), this.cardHeight = $(".eo-card").first().height(), this.sliderWidth = eo.cardSlider.$slider.width(), //Four positions the 3 cards can be in
        this.positions.offset = "-" + 1.8 * eo.cardSlider.cardWidth + "px", this.positions.left = "-" + (eo.cardSlider.cardWidth - (eo.cardSlider.sliderWidth - eo.cardSlider.cardWidth) / 3) + "px", this.positions.center = eo.cardSlider.sliderWidth / 2 - eo.cardSlider.cardWidth / 2 + "px", this.positions.right = 1.4 * eo.cardSlider.sliderWidth + "px", //Three stages each three cards can positioned in
        this.stages = [
            [this.positions.center, this.positions.right, this.positions.right],
            [this.positions.left, this.positions.center, this.positions.right],
            [this.positions.offset, this.positions.left, this.positions.center]
        ], //Animate to current card
        this.show(this.currentCard), //Animate to current page
        eo.showPage(eo.currentPage)
    },
    nextButtonHandler: function (a) {
        a ? $(".eo-next").show() : $(".eo-next").hide()
    },
    handleWindowResize: function () {
        var a, b = this,
            c = 0;
        $(window).resize(function () {
            c = $(window).width(), a = clearTimeout(a), a = setTimeout(function () {
                $(window).width() == c && b.update()
            }, 500)
        })
    },
    init: function () {
        var a = this;
        this.update(), $(".eo-card").bind("touchend click", function () {
            a.currentCard !== $(this).index() && a.show($(this).index())
        }), (eo.isMobile || eo.isTablet) && this.handleWindowResize()
    },
    next: function () {
        this.currentCard == this.totalCardsIndex ? eo.showPage("#eo-endgame") : ($(".eo-card").eq(this.currentCard).addClass("scratched"), this.show(this.currentCard + 1))
    },
    show: function (a) {
        var b = this;
        eo.scratchCompleteHandler.scratched.indexOf(a) > -1 ? this.nextButtonHandler(!0) : this.nextButtonHandler(!1), this.currentCard = a, $("#eo #eo-game .eo-card").each(function (c) {
            $(this).animate({
                left: b.stages[a][c]
            }, 500)
        }), $(".eo-counter span").text(a + 1)
    }
}, eo.scratchCompleteHandler = {
    won: !1,
    scratched: [],
    init: function () {
        this.getCards()
    },
    enableScratch: function () {
        var a = this;
        !Modernizr.canvas || eo.isMobile && !Modernizr.touch || eo.isMobile && eo.isAndroid ? //Fallback for non-canvas browsers
        $("#eo-game .eo-card").each(function () {
            var b = $(this),
                c = b.data("cardId");
            $(".eo-overlay", this).addClass("no-canvas"), $(this).bind("click touchstart", function () {
                $(".eo-overlay", this).addClass("scratched"), a.scratchComplete(c, b.index())
            })
        }) : ( //Scratch effect
            $("#eo-game .eo-card").each(function () {
                var b = $(this),
                    c = b.data("cardId");
                $(".eo-overlay", this).wScratchPad({
                    overlay: "transparent",
                    size: 40,
                    image2: "../Content/Images/skrabelod.png",
                    width: b.width(),
                    height: b.height(),
                    scratchUp: function (d, e) {
                        e > 70 && a.scratchComplete(c, b.index())
                    }
                })
            }), //Stop scratching when the mouse leaves the 
            $("body").bind("mouseenter mouseup mouseleave touchend", function () {
                $("canvas", this).trigger("mouseup")
            }))
    },
    cards: null,
    getCards: function () {
        var a = this;
        $.ajax({
            url: "https://apps.realmail.dk/scratchcards/eovendo/api/getCards/",
            dataType: "JSONP",
            type: "GET",
            jsonpCallback: "callback",
            data: {
                id: eo.username
            },
            success: function (b) { //console.log("response", response);
                b.status ? (a.cards = {}, //Map cards holder with server response
                    $.each(b.cards, function (b, c) {
                        var d;
                        a.cards[c.cardId] = d = {
                            cardId: c.cardId,
                            $el: $("#eo-game .eo-card").eq(b),
                            prizes: c.prizes,
                            won: c.won,
                            scratched: c.scratched,
                            winnerCard: c.winnerCard
                        }, d.$el.data(d)
                    }), a.render()) : $.appMsg.modal("Der er sket en uventet fejl", {
                    content: "Vi beklager, men der er sket fejl, da vi prÃ¸vede at hente dine skrabelodder. PrÃ¸v venligst igen senere.",
                    buttons: {
                        ok: ["GenindlÃ¦s siden",
                            function () {
                                document.location.reload()
                            }
                        ],
                        cancel: ["Afbryd",
                            function () {}
                        ]
                    }
                })
            }
        })
    },
    scratchComplete: function (a, b) { //console.log("scratchComplete", cardId);
        //console.log("scratchComplete", cardId);
        return this.cards[a].scratched ? !1 : (this.cards[a].scratched = !0, this.scratched.push(b), $.ajax({
            url: "https://apps.realmail.dk/scratchcards/eovendo/api/cardScratched/",
            dataType: "JSONP",
            type: "GET",
            jsonpCallback: "callback",
            data: {
                id: eo.username,
                cid: a
            },
            success: function (a) {
                !a.status
            }
        }), eo.cardSlider.nextButtonHandler(!0), void 0)
    },
    callbackAction: null,
    render: function () {
        var a = this;
        $.each(this.cards, function (b, c) { //console.log("render", cardId);
            //Debug prize won
            $.urlParam("prize") && (c.won = $.urlParam("prize"));
            var d = $(".eo-prizes", c.$el);
            c.scratched && ($(".eo-overlay", c.$el).addClass("scratched"), a.scratched.push(c.$el.index())), d.empty(), $.each(c.prizes, function (a, c) {
                var e = $('<li><div class="eo-image" style="background-image: url(' + c.imgUrl + ')"></div><div class="eo-title">' + c.title + "</div></li>"); //Prize won handler
                c.won && (e.addClass("won"), eo.scratchCompleteHandler.won = !0, //Write validation code on winner page
                    $(".eo-won .eo-validation-code").text(b)), d.append(e)
            }), //Prize won handler
            c.won && ( //Show winner page
                $(".eo-won").css("display", "table-cell").siblings().hide(), "cash" == c.won ? ( //Update user balance
                    $(".eo-cash-prize").show().siblings().hide(), a.callbackAction = function () {
                        updateUserBalance()
                    }) : "digital" == c.won ? ( //SMS Voucher prize
                    $(".eo-digital-prize").show().siblings().hide(), a.callbackAction = function () {
                        OpenProfilePhoneNumberPopup()
                    }) : (console.log("hulabula"), //Sponsor prize
                    $(".eo-regular-prize").show().siblings().hide(), a.callbackAction = function () {
                        OpenProfileAddressPopup()
                    }), //Set end game behavior
                $("#eo-endgame .eo-button").click(a.callbackAction)), //Write validation code on each card
            $(".eo-validation-code", c.$el).text(b)
        }), this.enableScratch(), eo.scratchCompleteHandler.scratched.length ? eo.cardSlider.show(eo.scratchCompleteHandler.scratched[eo.scratchCompleteHandler.scratched.length - 1]) : eo.cardSlider.show(0)
    }
}, eo.currentPage = "#eo-start", eo.showPage = function (a) { //console.log("showPage", destination);
    this.currentPage = a;
    var b = $("#eo-container");
    parseInt(b.css("marginTop"), 10);
    var c = -($("#eo-container").height() * $(a).index()) + "px";
    b.animate({
        "margin-top": c
    }, 400)
}, eo.getUrlParameter = function (a) {
    var b = decodeURI((RegExp(a + "=(.+?)(&|$)").exec(location.search) || [, null])[1]);
    return "null" == b ? !1 : b
}, eo.handleBindings = function () {
    $(".eo-button").click(function (a) {
        a.preventDefault();
        var b = $(this).attr("href");
        eo.showPage(b)
    }), $(".eo-next").click(function () {
        eo.cardSlider.next()
    })
}, $(document).ready(function () {
    eo.init()
}),
/*
IE8 Polyfill
*/
Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
    var b = this.length >>> 0,
        c = Number(arguments[1]) || 0;
    for (c = 0 > c ? Math.ceil(c) : Math.floor(c), 0 > c && (c += b); b > c; c++)
        if (c in this && this[c] === a) return c;
    return -1
}), $.urlParam = function (a) {
    var b = new RegExp("[\\?&]" + a + "=([^&#]*)").exec(window.location.href);
    return null == b ? null : b[1] || 0
};