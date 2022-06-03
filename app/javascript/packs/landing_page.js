! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(e) {
    "use strict";

    function _inheritsLoose(t, e) {
        t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
    }

    function _assertThisInitialized(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    /*!
     * GSAP 3.0.1
     * https://greensock.com
     *
     * @license Copyright 2008-2019, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    function n(t) {
        return "string" == typeof t
    }

    function o(t) {
        return "function" == typeof t
    }

    function p(t) {
        return "number" == typeof t
    }

    function q(t) {
        return void 0 === t
    }

    function r(t) {
        return "object" == typeof t
    }

    function s(t) {
        return !1 !== t
    }

    function t() {
        return "undefined" != typeof window
    }

    function u(t) {
        return o(t) || n(t)
    }

    function J(t) {
        return (l = dt(t, at)) && ee
    }

    function K(t, e) {
        return console.warn("Invalid", t, "tween of", e, "Missing plugin? gsap.registerPlugin()")
    }

    function L(t, e) {
        return !e && console.warn(t)
    }

    function M(t, e) {
        return t && (at[t] = e) && l && (l[t] = e) || at
    }

    function N() {
        return 0
    }

    function W(t) {
        var e, n, i = t[0];
        if (!r(i) && !o(i)) return G(t) ? t : [t];
        if (!(e = (i._gsap || {}).harness)) {
            for (n = ct.length; n-- && !ct[n].targetTest(i););
            e = ct[n]
        }
        for (n = t.length; n--;) t[n]._gsap || (t[n]._gsap = new Ft(t[n], e));
        return t
    }

    function X(t) {
        return t._gsap || W(vt(t))[0]._gsap
    }

    function Y(t, e) {
        var r = t[e];
        return o(r) ? t[e]() : q(r) && t.getAttribute(e) || r
    }

    function Z(t, e) {
        return (t = t.split(",")).forEach(e) || t
    }

    function $(t) {
        return Math.round(1e4 * t) / 1e4
    }

    function _(t, e) {
        for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r;);
        return n < r
    }

    function aa(t, e, r) {
        var n, i = p(t[1]),
            a = (i ? 2 : 1) + (e < 2 ? 0 : 1),
            o = t[a];
        return i && (o.duration = t[1]), 1 === e ? (o.runBackwards = 1, o.immediateRender = s(o.immediateRender)) : 2 === e && (n = t[a - 1], o.startAt = n, o.immediateRender = s(o.immediateRender)), o.parent = r, o
    }

    function ba() {
        var t, e, r = ot.length,
            n = ot.slice(0);
        for (ut = {}, t = ot.length = 0; t < r; t++)(e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    }

    function ca(t, e, r, n) {
        ot.length && ba(), t.render(e, r, n), ot.length && ba()
    }

    function da(t) {
        var e = parseFloat(t);
        return e || 0 === e ? e : t
    }

    function ea(t) {
        return t
    }

    function fa(t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t
    }

    function ga(t, e) {
        for (var r in e) r in t || "duration" === r || "ease" === r || (t[r] = e[r])
    }

    function ia(t, e) {
        for (var n in e) t[n] = r(e[n]) ? ia(t[n] || (t[n] = {}), e[n]) : e[n];
        return t
    }

    function ja(t, e) {
        var r, n = {};
        for (r in t) r in e || (n[r] = t[r]);
        return n
    }

    function na(t, e, r, n) {
        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
        var i = e._prev,
            a = e._next;
        i ? i._next = a : t[r] === e && (t[r] = a), a ? a._prev = i : t[n] === e && (t[n] = i), e._dp = t, e._next = e._prev = e.parent = null
    }

    function oa(t, e) {
        !t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t), t._act = 0
    }

    function pa(t) {
        for (var e = t; e;) e._dirty = 1, e = e.parent;
        return t
    }

    function sa(t) {
        var e;
        return t._repeat ? (e = t.duration() + t._rDelay) * ~~(t._tTime / e) : 0
    }

    function ta(t, e) {
        return 0 < e._ts ? (t - e._start) * e._ts : (e._dirty ? e.totalDuration() : e._tDur) + (t - e._start) * e._ts
    }

    function ua(t, e, r) {
        if (e.parent && oa(e), e._start = r + e._delay, e._end = e._start + (e.totalDuration() / e._ts || 0), function _addLinkedListItem(t, e, r, n, i) {
                void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
                var a, s = t[n];
                if (i)
                    for (a = e[i]; s && s[i] > a;) s = s._prev;
                s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = s, e.parent = t
            }(t, e, "_first", "_last", t._sort ? "_start" : 0), (t._recent = e)._time || !e._dur && e._initted) {
            var n = (t.rawTime() - e._start) * e._ts;
            (!e._dur || mt(0, e.totalDuration(), n) - e._tTime > B) && e.render(n, !0)
        }
        if (pa(t), t._dp && t._time >= t._dur && t._ts && t._dur < t.duration())
            for (var i = t; i._dp;) i.totalTime(i._tTime, !0), i = i._dp;
        return t
    }

    function va(t, e, r, n) {
        return It(t, e), t._initted ? !r && t._pt && t.vars.lazy ? (ot.push(t), t._lazy = [e, n], 1) : void 0 : 1
    }

    function ya(t) {
        if (t instanceof Et) return pa(t);
        var e = t._repeat;
        return t._tDur = e ? e < 0 ? 1e20 : $(t._dur * (e + 1) + t._rDelay * e) : t._dur, pa(t.parent), t
    }

    function Aa(t, e) {
        var r, i, a = t.labels,
            s = t._recent || _t,
            o = t.duration() >= D ? s.endTime(!1) : t._dur;
        return n(e) && (isNaN(e) || e in a) ? "<" === (r = e.charAt(0)) || ">" === r ? ("<" === r ? s._start : s.endTime(0 <= s._repeat)) + (parseFloat(e.substr(1)) || 0) : (r = e.indexOf("=")) < 0 ? (e in a || (a[e] = o), a[e]) : (i = +(e.charAt(r - 1) + e.substr(r + 1)), 1 < r ? Aa(t, e.substr(0, r - 1)) + i : o + i) : null == e ? o : +e
    }

    function Ba(t, e) {
        return t || 0 === t ? e(t) : e
    }

    function Da(t) {
        return (t + "").substr((parseFloat(t) + "").length)
    }

    function Ga(t) {
        return r(t) && "length" in t && t.length - 1 in t && r(t[0]) && t !== i
    }

    function Ja(t) {
        if (o(t)) return t;
        var d = r(t) ? t : {
                each: t
            },
            _ = Dt(d.ease),
            m = d.from || 0,
            g = parseFloat(d.base) || 0,
            v = {},
            e = 0 < m && m < 1,
            y = isNaN(m) || e,
            b = d.axis,
            w = m,
            T = m;
        return n(m) ? w = T = {
                center: .5,
                edges: .5,
                end: 1
            }[m] || 0 : !e && y && (w = m[0], T = m[1]),
            function(t, e, r) {
                var n, i, a, s, o, u, h, l, f, c = (r || d).length,
                    p = v[c];
                if (!p) {
                    if (!(f = "auto" === d.grid ? 0 : (d.grid || [1, D])[1])) {
                        for (h = -D; h < (h = r[f++].getBoundingClientRect().left) && f < c;);
                        f--
                    }
                    for (p = v[c] = [], n = y ? Math.min(f, c) * w - .5 : m % f, i = y ? c * T / f - .5 : m / f | 0, l = D, u = h = 0; u < c; u++) a = u % f - n, s = i - (u / f | 0), p[u] = o = b ? Math.abs("y" === b ? s : a) : j(a * a + s * s), h < o && (h = o), o < l && (l = o);
                    p.max = h - l, p.min = l, p.v = c = (parseFloat(d.amount) || parseFloat(d.each) * (c < f ? c - 1 : b ? "y" === b ? c / f : f : Math.max(f, c / f)) || 0) * ("edges" === m ? -1 : 1), p.b = c < 0 ? g - c : g, p.u = Da(d.amount || d.each) || 0, _ = _ && c < 0 ? Ct(_) : _
                }
                return c = (p[t] - p.min) / p.max || 0, $(p.b + (_ ? _(c) : c) * p.v) + p.u
            }
    }

    function Ka(e) {
        var r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1;
        return function(t) {
            return ~~(Math.round(parseFloat(t) / e) * e * r) / r + (p(t) ? 0 : Da(t))
        }
    }

    function La(u, t) {
        var h, l, e = G(u);
        return !e && r(u) && (h = e = u.radius || D, u = vt(u.values), (l = !p(u[0])) && (h *= h)), Ba(t, e ? function(t) {
            for (var e, r, n = parseFloat(l ? t.x : t), i = parseFloat(l ? t.y : 0), a = D, s = 0, o = u.length; o--;)(e = l ? (e = u[o].x - n) * e + (r = u[o].y - i) * r : Math.abs(u[o] - n)) < a && (a = e, s = o);
            return s = !h || a <= h ? u[s] : t, l || s === t || p(t) ? s : s + Da(t)
        } : Ka(u))
    }

    function Ma(t, e, r, n) {
        return Ba(G(t) ? !e : !n, function() {
            return G(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && ~~(Math.round((t + Math.random() * (e - t)) / r) * r * n) / n
        })
    }

    function Qa(e, r, t) {
        return Ba(t, function(t) {
            return e[~~r(t)]
        })
    }

    function Ta(t) {
        for (var e, r, n, i, a = 0, s = ""; ~(e = t.indexOf("random(", a));) n = t.indexOf(")", e), i = "[" === t.charAt(e + 7), r = t.substr(e + 7, n - e - 7).match(i ? it : H), s += t.substr(a, e - a) + Ma(i ? r : +r[0], +r[1], +r[2] || 1e-5), a = n + 1;
        return s + t.substr(a, t.length - a)
    }

    function Wa(t, e, r) {
        var n, i, a, s = t.labels,
            o = D;
        for (n in s)(i = s[n] - e) < 0 == !!r && i && o > (i = Math.abs(i)) && (a = n, o = i);
        return a
    }

    function Ya(t) {
        return oa(t), t.progress() < 1 && bt(t, "onInterrupt"), t
    }

    function bb(t, e, r) {
        return (6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * wt + .5 | 0
    }

    function cb(t, e) {
        var r, n, i, a, s, o, u, h, l, f, c = t ? p(t) ? [t >> 16, t >> 8 & wt, t & wt] : 0 : Tt.black;
        if (!c) {
            if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Tt[t]) c = Tt[t];
            else if ("#" === t.charAt(0)) 4 === t.length && (t = "#" + (r = t.charAt(1)) + r + (n = t.charAt(2)) + n + (i = t.charAt(3)) + i), c = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & wt, t & wt];
            else if ("hsl" === t.substr(0, 3))
                if (c = f = t.match(H), e) {
                    if (~t.indexOf("=")) return t.match(tt)
                } else a = +c[0] % 360 / 360, s = +c[1] / 100, r = 2 * (o = +c[2] / 100) - (n = o <= .5 ? o * (s + 1) : o + s - o * s), 3 < c.length && (c[3] *= 1), c[0] = bb(a + 1 / 3, r, n), c[1] = bb(a, r, n), c[2] = bb(a - 1 / 3, r, n);
            else c = t.match(H) || Tt.transparent;
            c = c.map(Number)
        }
        return e && !f && (r = c[0] / wt, n = c[1] / wt, i = c[2] / wt, o = ((u = Math.max(r, n, i)) + (h = Math.min(r, n, i))) / 2, u === h ? a = s = 0 : (l = u - h, s = .5 < o ? l / (2 - u - h) : l / (u + h), a = u === r ? (n - i) / l + (n < i ? 6 : 0) : u === n ? (i - r) / l + 2 : (r - n) / l + 4, a *= 60), c[0] = a + .5 | 0, c[1] = 100 * s + .5 | 0, c[2] = 100 * o + .5 | 0), c
    }

    function db(t, e) {
        var r, n, i, a = (t + "").match(xt),
            s = 0,
            o = "";
        if (!a) return t;
        for (r = 0; r < a.length; r++) n = a[r], s += (i = t.substr(s, t.indexOf(n, s) - s)).length + n.length, 3 === (n = cb(n, e)).length && n.push(1), o += i + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
        return o + t.substr(s)
    }

    function gb(t) {
        var e, r = t.join(" ");
        xt.lastIndex = 0, xt.test(r) && (e = kt.test(r), t[0] = db(t[0], e), t[1] = db(t[1], e))
    }

    function ob(t) {
        var e = (t + "").split("("),
            r = Ot[e[0]];
        return r && 1 < e.length && r.config ? r.config.apply(null, ~t.indexOf("{") ? [function _parseObjectInString(t) {
            for (var e, r, n, i = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], o = 1, u = a.length; o < u; o++) r = a[o], e = o !== u - 1 ? r.lastIndexOf(",") : r.length, n = r.substr(0, e), i[s] = isNaN(n) ? n.replace(St, "").trim() : +n, s = r.substr(e + 1).trim();
            return i
        }(e[1])] : rt.exec(t)[1].split(",").map(da)) : Ot._CE && Pt.test(t) ? Ot._CE("", t) : r
    }

    function rb(t, e, r, n) {
        void 0 === r && (r = function easeOut(t) {
            return 1 - e(1 - t)
        }), void 0 === n && (n = function easeInOut(t) {
            return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
        });
        var i, a = {
            easeIn: e,
            easeOut: r,
            easeInOut: n
        };
        return Z(t, function(t) {
            for (var e in Ot[t] = at[t] = a, Ot[i = t.toLowerCase()] = r, a) Ot[i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Ot[t + "." + e] = a[e]
        }), a
    }

    function sb(e) {
        return function(t) {
            return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
        }
    }

    function tb(r, t, e) {
        function sk(t) {
            return 1 === t ? 1 : n * Math.pow(2, -10 * t) * Q((t - a) * i) + 1
        }
        var n = 1 <= t ? t : 1,
            i = (e || (r ? .3 : .45)) / (t < 1 ? t : 1),
            a = i / F * (Math.asin(1 / n) || 0),
            s = "out" === r ? sk : "in" === r ? function(t) {
                return 1 - sk(1 - t)
            } : sb(sk);
        return i = F / i, s.config = function(t, e) {
            return tb(r, t, e)
        }, s
    }

    function ub(e, r) {
        function Ak(t) {
            return --t * t * ((r + 1) * t + r) + 1
        }
        void 0 === r && (r = 1.70158);
        var t = "out" === e ? Ak : "in" === e ? function(t) {
            return 1 - Ak(1 - t)
        } : sb(Ak);
        return t.config = function(t) {
            return ub(e, t)
        }, t
    }
    var R, i, a, h, l, f, d, c, m, g, v, y, b, w, T, x, k, A, O, P, S, C, U = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        },
        E = {
            duration: .5,
            overwrite: !1,
            delay: 0
        },
        D = 1e8,
        B = 1 / D,
        F = 2 * Math.PI,
        z = F / 4,
        I = 0,
        j = Math.sqrt,
        V = Math.cos,
        Q = Math.sin,
        G = Array.isArray,
        H = /(?:-?\.?\d|\.)+/gi,
        tt = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        et = /[-+=\.]*\d+(?:\.|e-|e)*\d*/gi,
        rt = /\(([^()]+)\)/i,
        nt = /[\+-]=-?[\.\d]+/,
        it = /[#\-+\.]*\b[a-z\d-=+%.]+/gi,
        at = {},
        st = {},
        ot = [],
        ut = {},
        ht = {},
        lt = {},
        ft = 30,
        ct = [],
        pt = "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
        dt = function _merge(t, e) {
            for (var r in e) t[r] = e[r];
            return t
        },
        _t = {
            _start: 0,
            endTime: N
        },
        mt = function _clamp(t, e, r) {
            return r < t ? t : e < r ? e : r
        },
        gt = [].slice,
        vt = function toArray(t, e) {
            return !n(t) || e || !a && Mt() ? G(t) ? function _flatten(t, r, i) {
                return void 0 === i && (i = []), t.forEach(function(t) {
                    var e;
                    return n(t) && !r || Ga(t) ? (e = i).push.apply(e, vt(t)) : i.push(t)
                }) || i
            }(t, e) : Ga(t) ? gt.call(t, 0) : t ? [t] : [] : gt.call(h.querySelectorAll(t), 0)
        },
        yt = function mapRange(e, t, r, n, i) {
            var a = t - e,
                s = n - r;
            return Ba(i, function(t) {
                return r + (t - e) / a * s
            })
        },
        bt = function _callback(t, e, r) {
            var n, i, a = t.vars,
                s = a[e];
            if (s) return n = a[e + "Params"], i = a.callbackScope || t, r && ot.length && ba(), n ? s.apply(i, n) : s.call(i, t)
        },
        wt = 255,
        Tt = {
            aqua: [0, wt, wt],
            lime: [0, wt, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, wt],
            navy: [0, 0, 128],
            white: [wt, wt, wt],
            olive: [128, 128, 0],
            yellow: [wt, wt, 0],
            orange: [wt, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [wt, 0, 0],
            pink: [wt, 192, 203],
            cyan: [0, wt, wt],
            transparent: [wt, wt, wt, 0]
        },
        xt = function() {
            var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (t in Tt) e += "|" + t + "\\b";
            return new RegExp(e + ")", "gi")
        }(),
        kt = /hsl[a]?\(/,
        At = (b = Date.now, w = 500, T = 33, x = b(), k = x, O = A = 1 / 60, y = {
            time: 0,
            frame: 0,
            tick: function tick() {
                yj(!0)
            },
            wake: function wake() {
                f && (!a && t() && (i = a = window, h = i.document || {}, at.gsap = ee, (i.gsapVersions || (i.gsapVersions = [])).push(ee.version), J(l || i.GreenSockGlobals || !i.gsap && i || {}), v = i.requestAnimationFrame), m && y.sleep(), g = v || function(t) {
                    return setTimeout(t, 1e3 * (O - y.time) + 1 | 0)
                }, c = 1, yj(2))
            },
            sleep: function sleep() {
                (v ? i.cancelAnimationFrame : clearTimeout)(m), c = 0, g = N
            },
            lagSmoothing: function lagSmoothing(t, e) {
                w = t || 1e8, T = Math.min(e, w, 0)
            },
            fps: function fps(t) {
                A = 1 / (t || 60), O = y.time + A
            },
            add: function add(t) {
                P.indexOf(t) < 0 && P.push(t), Mt()
            },
            remove: function remove(t) {
                var e;
                ~(e = P.indexOf(t)) && P.splice(e, 1)
            },
            _listeners: P = []
        }),
        Mt = function _wake() {
            return !c && At.wake()
        },
        Ot = {},
        Pt = /^[\d.\-M][\d.\-,\s]/,
        St = /["']/g,
        Ct = function _invertEase(e) {
            return function(t) {
                return 1 - e(1 - t)
            }
        },
        Dt = function _parseEase(t, e) {
            return t && (o(t) ? t : Ot[t] || ob(t)) || e
        };

    function yj(e) {
        var t, r, n = b() - k,
            i = !0 === e;
        w < n && (x += n - T), k += n, y.time = (k - x) / 1e3, (0 < (t = y.time - O) || i) && (y.frame++, O += t + (A <= t ? .004 : A - t), r = 1), i || (m = g(yj)), r && P.forEach(function(t) {
            return t(y.time, n, y.frame, e)
        })
    }

    function Rk(t) {
        return t < C ? S * t * t : t < .7272727272727273 ? S * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? S * (t -= 2.25 / 2.75) * t + .9375 : S * Math.pow(t - 2.625 / 2.75, 2) + .984375
    }
    Z("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
        var r = e < 5 ? e + 1 : e;
        rb(t + ",Power" + (r - 1), e ? function(t) {
            return Math.pow(t, r)
        } : function(t) {
            return t
        }, function(t) {
            return 1 - Math.pow(1 - t, r)
        }, function(t) {
            return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2
        })
    }), Ot.Linear.easeNone = Ot.none = Ot.Linear.easeIn, rb("Elastic", tb("in"), tb("out"), tb()), S = 7.5625, C = 1 / 2.75, rb("Bounce", function(t) {
        return 1 - Rk(1 - t)
    }, Rk), rb("Expo", function(t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0
    }), rb("Circ", function(t) {
        return -(j(1 - t * t) - 1)
    }), rb("Sine", function(t) {
        return 1 - V(t * z)
    }), rb("Back", ub("in"), ub("out"), ub()), Ot.SteppedEase = Ot.steps = at.SteppedEase = {
        config: function config(t, e) {
            void 0 === t && (t = 1);
            var r = 1 / t,
                n = t + (e ? 0 : 1),
                i = e ? 1 : 0;
            return function(t) {
                return ((n * mt(0, .99999999, t) | 0) + i) * r
            }
        }
    }, E.ease = Ot["quad.out"];
    var Bt, Ft = function GSCache(t, e) {
            this.id = I++, (t._gsap = this).target = t, this.harness = e, this.get = e ? e.get : Y, this.set = e ? e.getSetter : jt
        },
        Rt = ((Bt = Animation.prototype).delay = function delay(t) {
            return t || 0 === t ? (this._delay = t, this) : this._delay
        }, Bt.duration = function duration(t) {
            var e = arguments.length,
                r = this._repeat,
                n = 0 < r ? r * ((e ? t : this._dur) + this._rDelay) : 0;
            return e ? this.totalDuration(r < 0 ? t : t + n) : this.totalDuration() && this._dur
        }, Bt.totalDuration = function totalDuration(t) {
            if (!arguments.length) return this._tDur;
            var e = this._repeat,
                r = (t || this._rDelay) && e < 0;
            return this._tDur = r ? 1e20 : t, this._dur = r ? t : (t - e * this._rDelay) / (e + 1), this._dirty = 0, pa(this.parent), this
        }, Bt.totalTime = function totalTime(t, e) {
            if (Mt(), !arguments.length) return this._tTime;
            var r, n = this.parent || this._dp;
            if (n && n.smoothChildTiming && this._ts) {
                for (r = this._start, this._start = n._time - (0 < this._ts ? t / this._ts : ((this._dirty ? this.totalDuration() : this._tDur) - t) / -this._ts), this._end += this._start - r, n._dirty || pa(n); n.parent;) n.parent._time !== n._start + (0 < n._ts ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
                this.parent || ua(this._dp, this, this._start - this._delay)
            }
            return this._tTime === t && this._dur || ca(this, t, e), this
        }, Bt.time = function time(t, e) {
            return arguments.length ? this.totalTime(t + sa(this), e) : this._time
        }, Bt.totalProgress = function totalProgress(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._tTime / this.totalDuration()
        }, Bt.progress = function progress(t, e) {
            return arguments.length ? this.totalTime(this.duration() * t + sa(this), e) : this.duration() ? this._time / this._dur : this.ratio
        }, Bt.iteration = function iteration(t, e) {
            var r = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? 1 + ~~(this._tTime / r) : 1
        }, Bt.timeScale = function timeScale(t) {
            var e = this._ts;
            return arguments.length ? e ? (this._end = this._start + this._tDur / (this._ts = t || B), function _recacheAncestors(t) {
                for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
                return t
            }(this).totalTime(this._tTime, !0)) : (this._pauseTS = t, this) : e || this._pauseTS
        }, Bt.paused = function paused(t) {
            var e = !this._ts;
            return arguments.length ? (e !== t && (t ? (this._pauseTS = this._ts, this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (this._ts = this._pauseTS, t = this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= B), this.totalTime(t, !0))), this) : e
        }, Bt.startTime = function startTime(t) {
            return arguments.length ? (this.parent && this.parent._sort && ua(this.parent, this, t - this._delay), this) : this._start
        }, Bt.endTime = function endTime(t) {
            return this._start + (s(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts)
        }, Bt.rawTime = function rawTime(t) {
            var e = this.parent || this._dp;
            return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ta(e.rawTime(t), this) : this._tTime : this._tTime
        }, Bt.repeat = function repeat(t) {
            return arguments.length ? (this._repeat = t, ya(this)) : this._repeat
        }, Bt.repeatDelay = function repeatDelay(t) {
            return arguments.length ? (this._rDelay = t, ya(this)) : this._rDelay
        }, Bt.yoyo = function yoyo(t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, Bt.seek = function seek(t, e) {
            return this.totalTime(Aa(this, t), s(e))
        }, Bt.restart = function restart(t, e) {
            return this.play().totalTime(t ? -this._delay : 0, s(e))
        }, Bt.play = function play(t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, Bt.reverse = function reverse(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, Bt.pause = function pause(t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, Bt.resume = function resume() {
            return this.paused(!1)
        }, Bt.reversed = function reversed(t) {
            var e = this._ts || this._pauseTS;
            return arguments.length ? (t !== this.reversed() && (this[this._ts ? "_ts" : "_pauseTS"] = Math.abs(e) * (t ? -1 : 1), this.totalTime(this._tTime, !0)), this) : e < 0
        }, Bt.invalidate = function invalidate() {
            return this._initted = 0, this
        }, Bt.isActive = function isActive() {
            var t, e = this.parent || this._dp,
                r = this._start;
            return !e || this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - B
        }, Bt.eventCallback = function eventCallback(t, e, r) {
            var n = this.vars;
            return 1 < arguments.length ? (e ? (n[t] = e, r && (n[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete n[t], this) : n[t]
        }, Bt.then = function then(e) {
            var r = this;
            return void 0 === e && (e = N), new Promise(function(t) {
                r._prom = function() {
                    e(r), t()
                }
            })
        }, Bt.kill = function kill() {
            Ya(this)
        }, Animation);

    function Animation(t, e) {
        var r = t.parent || R;
        this.vars = t, this._dur = this._tDur = +t.duration || 0, this._delay = +t.delay || 0, (this._repeat = t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase, ya(this)), this._ts = 1, this.data = t.data, c || At.wake(), r && ua(r, this, e || 0 === e ? e : r._time), t.reversed && this.reversed(!0), t.paused && this.paused(!0)
    }
    fa(Rt.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: 0,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -B,
        _prom: 0
    });
    var Et = function(i) {
        function Timeline(t, e) {
            var r;
            return void 0 === t && (t = {}), (r = i.call(this, t, e) || this).labels = {}, r.smoothChildTiming = s(t.smoothChildTiming), r.autoRemoveChildren = !!t.autoRemoveChildren, r._sort = s(t.sortChildren), r
        }
        _inheritsLoose(Timeline, i);
        var t = Timeline.prototype;
        return t.to = function to(t, e, r, n) {
            return new Xt(t, aa(arguments, 0, this), Aa(this, p(e) ? n : r)), this
        }, t.from = function from(t, e, r, n) {
            return new Xt(t, aa(arguments, 1, this), Aa(this, p(e) ? n : r)), this
        }, t.fromTo = function fromTo(t, e, r, n, i) {
            return new Xt(t, aa(arguments, 2, this), Aa(this, p(e) ? i : n)), this
        }, t.set = function set(t, e, r) {
            return e.duration = 0, e.parent = this, e.repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Xt(t, e, Aa(this, r)), this
        }, t.call = function call(t, e, r) {
            return ua(this, Xt.delayedCall(0, t, e), Aa(this, r))
        }, t.staggerTo = function staggerTo(t, e, r, n, i, a, s) {
            return r.duration = e, r.stagger = r.stagger || n, r.onComplete = a, r.onCompleteParams = s, r.parent = this, new Xt(t, r, Aa(this, i)), this
        }, t.staggerFrom = function staggerFrom(t, e, r, n, i, a, o) {
            return r.runBackwards = 1, r.immediateRender = s(r.immediateRender), this.staggerTo(t, e, r, n, i, a, o)
        }, t.staggerFromTo = function staggerFromTo(t, e, r, n, i, a, o, u) {
            return n.startAt = r, n.immediateRender = s(n.immediateRender), this.staggerTo(t, e, n, i, a, o, u)
        }, t.render = function render(t, e, r) {
            var n, i, a, s, o, u, h, l, f, c, p, d = this._time,
                _ = this._dirty ? this.totalDuration() : this._tDur,
                m = this._dur,
                g = _ - B < t && 0 <= t && this !== R ? _ : t < B ? 0 : t,
                v = this._zTime < 0 != t < 0 && this._initted;
            if (g !== this._tTime || r || v) {
                if (v && (m || (d = this._zTime), !t && e || (this._zTime = t)), n = g, f = this._start, u = 0 === (l = this._ts), d !== this._time && m && (n += this._time - d), this._repeat && (p = this._yoyo, o = m + this._rDelay, (m < (n = $(g % o)) || _ === g) && (n = m), (s = ~~(g / o)) && s === g / o && (n = m, s--), (c = ~~(this._tTime / o)) && c === this._tTime / o && c--, p && 1 & s && (n = m - n), s !== c && !this._lock)) {
                    var y = p && 1 & c,
                        b = y === (p && 1 & s);
                    if (s < c && (y = !y), d = y ? 0 : m, this._lock = 1, this.render(d, e, !m)._lock = 0, !e && this.parent && bt(this, "onRepeat"), d !== this._time || u != !this._ts) return this;
                    if (b && (this._lock = 2, d = y ? m + 1e-4 : -1e-4, this.render(d, !0)), this._lock = 0, !this._ts && !u) return this
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (h = function _findNextPauseTween(t, e, r) {
                        var n;
                        if (e < r)
                            for (n = t._first; n && n._start <= r;) {
                                if (!n._dur && "isPause" === n.data && n._start > e) return n;
                                n = n._next
                            } else
                                for (n = t._last; n && n._start >= r;) {
                                    if (!n._dur && "isPause" === n.data && n._start < e) return n;
                                    n = n._prev
                                }
                    }(this, $(d), $(n))) && (g -= n - (n = h._start)), this._tTime = g, this._time = n, this._act = !l, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1), d || !n || e || bt(this, "onStart"), d <= n && 0 <= t)
                    for (i = this._first; i;) {
                        if (a = i._next, (i._act || n >= i._start) && i._ts && h !== i) {
                            if (i.parent !== this) return this.render(t, e, r);
                            if (i.render(0 < i._ts ? (n - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (n - i._start) * i._ts, e, r), n !== this._time || !this._ts && !u) {
                                h = 0;
                                break
                            }
                        }
                        i = a
                    } else {
                        i = this._last;
                        for (var w = t < 0 ? t : n; i;) {
                            if (a = i._prev, (i._act || w <= i._end) && i._ts && h !== i) {
                                if (i.parent !== this) return this.render(t, e, r);
                                if (i.render(0 < i._ts ? (w - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (w - i._start) * i._ts, e, r), n !== this._time || !this._ts && !u) {
                                    h = 0;
                                    break
                                }
                            }
                            i = a
                        }
                    }
                if (h && !e && (this.pause(), h.render(d <= n ? 0 : -B)._zTime = d <= n ? 1 : -1, this._ts)) return this._start = f, this.render(t, e, r);
                this._onUpdate && !e && bt(this, "onUpdate", !0), (g === _ || !g && this._ts < 0) && (f !== this._start && Math.abs(l) === Math.abs(this._ts) || (!n || _ >= this.totalDuration()) && (!t && m || oa(this, 1), e || t < 0 && !d || (bt(this, g === _ ? "onComplete" : "onReverseComplete", !0), this._prom && g === _ && this._prom())))
            }
            return this
        }, t.add = function add(t, e) {
            var r = this;
            if (p(e) || (e = Aa(this, e)), !(t instanceof Rt)) {
                if (G(t)) return t.forEach(function(t) {
                    return r.add(t, e)
                }), pa(this);
                if (n(t)) return this.addLabel(t, e);
                if (!o(t)) return this;
                t = Xt.delayedCall(0, t)
            }
            return this !== t ? ua(this, t, e) : this
        }, t.getChildren = function getChildren(t, e, r, n) {
            void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === n && (n = -D);
            for (var i = [], a = this._first; a;) a._start >= n && (a instanceof Xt ? e && i.push(a) : (r && i.push(a), t && i.push.apply(i, a.getChildren(!0, e, r)))), a = a._next;
            return i
        }, t.getById = function getById(t) {
            for (var e = this.getChildren(1, 1, 1), r = e.length; r--;)
                if (e[r].vars.id === t) return e[r]
        }, t.remove = function remove(t) {
            return n(t) ? this.removeLabel(t) : o(t) ? this.killTweensOf(t) : (na(this, t), t === this._recent && (this._recent = this._last), pa(this))
        }, t.totalTime = function totalTime(t, e) {
            return arguments.length ? (this._forcing = 1, this.parent || this._dp || !this._ts || (this._start = At.time - (0 < this._ts ? t / this._ts : (this.totalDuration() - t) / -this._ts)), i.prototype.totalTime.call(this, t, e), this._forcing = 0, this) : this._tTime
        }, t.addLabel = function addLabel(t, e) {
            return this.labels[t] = Aa(this, e), this
        }, t.removeLabel = function removeLabel(t) {
            return delete this.labels[t], this
        }, t.addPause = function addPause(t, e, r) {
            var n = Xt.delayedCall(0, e || N, r);
            return n.data = "isPause", this._hasPause = 1, ua(this, n, Aa(this, t))
        }, t.removePause = function removePause(t) {
            var e = this._first;
            for (t = Aa(this, t); e;) e._start === t && "isPause" === e.data && oa(e), e = e._next
        }, t.killTweensOf = function killTweensOf(t, e, r) {
            for (var n = this.getTweensOf(t, r), i = n.length; i--;) n[i].kill(t, e);
            return this
        }, t.getTweensOf = function getTweensOf(t, e) {
            for (var r, n = [], i = vt(t), a = this._first; a;) a instanceof Xt ? !_(a._targets, i) || e && !a.isActive() || n.push(a) : (r = a.getTweensOf(i, e)).length && n.push.apply(n, r), a = a._next;
            return n
        }, t.tweenTo = function tweenTo(t, e) {
            var r = this,
                n = Aa(r, t),
                i = e && e.startAt,
                a = Xt.to(r, fa({
                    ease: "none",
                    lazy: !1,
                    time: n,
                    duration: Math.abs(n - (i && "time" in i ? i.time : r._time)) / r.timeScale() || B,
                    onStart: function onStart() {
                        r.pause();
                        var t = Math.abs(n - r._time) / r.timeScale();
                        a._dur !== t && (a._dur = t, a.render(a._time, !0, !0)), e && e.onStart && e.onStart.apply(a, e.onStartParams || [])
                    }
                }, e));
            return a
        }, t.tweenFromTo = function tweenFromTo(t, e, r) {
            return this.tweenTo(e, fa({
                startAt: {
                    time: Aa(this, t)
                }
            }, r))
        }, t.recent = function recent() {
            return this._recent
        }, t.nextLabel = function nextLabel(t) {
            return void 0 === t && (t = this._time), Wa(this, Aa(this, t))
        }, t.previousLabel = function previousLabel(t) {
            return void 0 === t && (t = this._time), Wa(this, Aa(this, t), 1)
        }, t.currentLabel = function currentLabel(t) {
            return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + B)
        }, t.shiftChildren = function shiftChildren(t, e, r) {
            void 0 === r && (r = 0);
            for (var n, i = this._first, a = this.labels; i;) i._start >= r && (i._start += t), i = i._next;
            if (e)
                for (n in a) a[n] >= r && (a[n] += t);
            return pa(this)
        }, t.invalidate = function invalidate() {
            var t = this._first;
            for (this._lock = 0; t;) t.invalidate(), t = t._next;
            return i.prototype.invalidate.call(this)
        }, t.clear = function clear(t) {
            void 0 === t && (t = !0);
            for (var e, r = this._first; r;) e = r._next, this.remove(r), r = e;
            return this._time = this._tTime = 0, t && (this.labels = {}), pa(this)
        }, t.totalDuration = function totalDuration(t) {
            var e, r, n = 0,
                i = this,
                a = i._last,
                s = D,
                o = i._repeat,
                u = o * i._rDelay || 0,
                h = o < 0;
            if (arguments.length) return h ? i : i.timeScale(i.totalDuration() / t);
            if (i._dirty) {
                for (; a;) e = a._prev, a._dirty && a.totalDuration(), a._start > s && i._sort && a._ts && !i._lock ? (i._lock = 1, ua(i, a, a._start - a._delay), i._lock = 0) : s = a._start, a._start < 0 && a._ts && (n -= a._start, (!i.parent && !i._dp || i.parent && i.parent.smoothChildTiming) && (i._start += a._start / i._ts, i._time -= a._start, i._tTime -= a._start), i.shiftChildren(-a._start, !1, -D), s = 0), n < (r = a._end = a._start + a._tDur / Math.abs(a._ts || a._pauseTS)) && a._ts && (n = $(r)), a = e;
                i._dur = i === R && i._time > n ? i._time : Math.min(D, n), i._tDur = h && (i._dur || u) ? 1e20 : Math.min(D, n * (o + 1) + u), i._end = i._start + (i._tDur / Math.abs(i._ts || i._pauseTS) || 0), i._dirty = 0
            }
            return i._tDur
        }, Timeline.updateRoot = function updateRoot(t) {
            if (R._ts && ca(R, ta(t, R)), At.frame >= ft) {
                ft += U.autoSleep || 120;
                var e = R._first;
                if ((!e || !e._ts) && U.autoSleep && At._listeners.length < 2) {
                    for (; e && !e._ts;) e = e._next;
                    e || At.sleep()
                }
            }
        }, Timeline
    }(Rt);
    fa(Et.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });

    function Bb(t, e, i, a, s, u) {
        var h, l, f, c;
        if (ht[t] && !1 !== (h = new ht[t]).init(s, h.rawVars ? e[t] : function _processVars(t, e, i, a, s) {
                if (o(t) && (t = Yt(t, s, e, i, a)), !r(t) || t.style && t.nodeType || G(t)) return n(t) ? Yt(t, s, e, i, a) : t;
                var u, h = {};
                for (u in t) h[u] = Yt(t[u], s, e, i, a);
                return h
            }(e[t], a, s, u, i), i, a, u) && (i._pt = l = new te(i._pt, s, t, 0, 1, h.render, h, 0, h.priority), i !== d))
            for (f = i._ptLookup[i._targets.indexOf(s)], c = h._props.length; c--;) f[h._props[c]] = l;
        return h
    }
    var zt, Lt = function _addPropTween(t, e, r, i, a, s, u, h, l) {
            o(i) && (i = i(a || 0, t, s));
            var f, c = t[e],
                p = "get" !== r ? r : o(c) ? l ? t[e.indexOf("set") || !o(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : c,
                d = o(c) ? l ? qt : Ut : Zt;
            if (n(i) && (~i.indexOf("random(") && (i = Ta(i)), "=" === i.charAt(1) && (i = parseFloat(p) + parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) + Da(p))), p !== i) return isNaN(p + i) ? (c || e in t || K(e, i), function _addComplexStringPropTween(t, e, r, n, i, a, s) {
                var o, u, h, l, f, c, p, d, _ = new te(this._pt, t, e, 0, 1, Wt, null, i),
                    m = 0,
                    g = 0;
                for (_.b = r, _.e = n, r += "", (p = ~(n += "").indexOf("random(")) && (n = Ta(n)), a && (a(d = [r, n], t, e), r = d[0], n = d[1]), u = r.match(et) || []; o = et.exec(n);) l = o[0], f = n.substring(m, o.index), h ? h = (h + 1) % 5 : "rgba(" === f.substr(-5) && (h = 1), l !== u[g++] && (c = parseFloat(u[g - 1]), _._pt = {
                    _next: _._pt,
                    p: f || 1 === g ? f : ",",
                    s: c,
                    c: "=" === l.charAt(1) ? parseFloat(l.substr(2)) * ("-" === l.charAt(0) ? -1 : 1) : parseFloat(l) - c,
                    m: h && h < 4 ? Math.round : 0
                }, m = et.lastIndex);
                return _.c = m < n.length ? n.substring(m, n.length) : "", _.fp = s, (nt.test(n) || p) && (_.e = 0), this._pt = _
            }.call(this, t, e, p, i, d, h || U.stringFilter, l)) : (f = new te(this._pt, t, e, +p || 0, i - (p || 0), "boolean" == typeof c ? Qt : Vt, 0, d), l && (f.fp = l), u && f.modifier(u, this, t), this._pt = f)
        },
        It = function _initTween(t, e) {
            var r, n, i, a, o, u, h, l, f, c, p, d, _ = t.vars,
                m = _.ease,
                g = _.startAt,
                v = _.immediateRender,
                y = _.lazy,
                b = _.onUpdate,
                w = _.onUpdateParams,
                T = _.callbackScope,
                x = _.runBackwards,
                k = _.yoyoEase,
                A = _.keyframes,
                M = _.autoRevert,
                O = t._dur,
                P = t._startAt,
                S = t._targets,
                C = t.parent,
                D = C && "nested" === C.data ? C.parent._targets : S,
                B = "auto" === t._overwrite,
                F = t.timeline;
            if (!F || A && m || (m = "none"), t._ease = Dt(m, E.ease), t._yEase = k ? Ct(Dt(!0 === k ? m : k, E.ease)) : 0, k && t._yoyo && !t._repeat && (k = t._yEase, t._yEase = t._ease, t._ease = k), !F) {
                if (P && P.render(-1, !0).kill(), g) {
                    if (oa(t._startAt = Xt.set(S, fa({
                            data: "isStart",
                            overwrite: !1,
                            parent: C,
                            immediateRender: !0,
                            lazy: s(y),
                            startAt: null,
                            delay: 0,
                            onUpdate: b,
                            onUpdateParams: w,
                            callbackScope: T,
                            stagger: 0
                        }, g))), v)
                        if (0 < e) M || (t._startAt = 0);
                        else if (O) return
                } else if (x && O)
                    if (P) M || (t._startAt = 0);
                    else if (e && (v = !1), oa(t._startAt = Xt.set(S, dt(ja(_, st), {
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: v && s(y),
                        immediateRender: v,
                        stagger: 0,
                        parent: C
                    }))), v) {
                    if (!e) return
                } else _initTween(t._startAt, e), v && (M || (t._startAt = 0));
                for (r = ja(_, st), d = (l = S[t._pt = 0] ? X(S[0]).harness : 0) && _[l.prop], n = 0; n < S.length; n++) {
                    if (h = (o = S[n])._gsap || W(S)[n]._gsap, t._ptLookup[n] = c = {}, ut[h.id] && ba(), p = D === S ? n : D.indexOf(o), l && !1 !== (f = new l).init(o, d || r, t, p, D) && (t._pt = a = new te(t._pt, o, f.name, 0, 1, f.render, f, 0, f.priority), f._props.forEach(function(t) {
                            c[t] = a
                        }), f.priority && (u = 1)), !l || d)
                        for (i in r) ht[i] && (f = Bb(i, r, t, p, o, D)) ? f.priority && (u = 1) : c[i] = a = Lt.call(t, o, i, "get", r[i], p, D, 0, _.stringFilter);
                    t._op && t._op[n] && t.kill(o, t._op[n]), B && (zt = t, R.killTweensOf(o, c, !0), zt = 0), t._pt && (s(y) && O || y && !O) && (ut[h.id] = 1)
                }
                u && Ht(t), t._onInit && t._onInit(t)
            }
            t._from = !F && !!_.runBackwards, t._onUpdate = b, t._initted = 1
        },
        Yt = function _parseFuncOrString(t, e, r, i, a) {
            return o(t) ? t.call(e, r, i, a) : n(t) && ~t.indexOf("random(") ? Ta(t) : t
        },
        Nt = pt + ",repeat,repeatDelay,yoyo,yoyoEase",
        $t = (Nt + ",id,stagger,delay,duration").split(","),
        Xt = function(k) {
            function Tween(t, e, n) {
                var i;
                "number" == typeof e && (n.duration = e, e = n, n = null);
                var a, o, h, l, f, c, p, d, _ = (i = k.call(this, function _inheritDefaults(t) {
                        var e = t.parent || R,
                            r = t.keyframes ? ga : fa;
                        if (s(t.inherit))
                            for (; e;) r(t, e.vars.defaults), e = e.parent;
                        return t
                    }(e), n) || this).vars,
                    m = _.duration,
                    g = _.delay,
                    v = _.immediateRender,
                    y = _.stagger,
                    b = _.overwrite,
                    w = _.keyframes,
                    T = _.defaults,
                    x = vt(t);
                if (i._targets = x.length ? W(x) : L("GSAP target " + t + " not found.", !U.nullTargetWarn) || [{}], i._ptLookup = [], i._overwrite = b, w || y || u(m) || u(g)) {
                    if (e = i.vars, (a = i.timeline = new Et({
                            data: "nested",
                            defaults: T || {}
                        })).kill(), a.parent = _assertThisInitialized(i), w) fa(a.vars.defaults, {
                        ease: "none"
                    }), w.forEach(function(t) {
                        return a.to(x, t, ">")
                    });
                    else {
                        if (l = x.length, p = y ? Ja(y) : N, r(y))
                            for (f in y) ~Nt.indexOf(f) && ((d = d || {})[f] = y[f]);
                        for (o = 0; o < l; o++) {
                            for (f in h = {}, e) $t.indexOf(f) < 0 && (h[f] = e[f]);
                            h.stagger = 0, d && dt(h, d), e.yoyoEase && !e.repeat && (h.yoyoEase = e.yoyoEase), c = x[o], h.duration = +Yt(m, _assertThisInitialized(i), o, c, x), h.delay = (+Yt(g, _assertThisInitialized(i), o, c, x) || 0) - i._delay, !y && 1 === l && h.delay && (i._delay = g = h.delay, i._start += g, h.delay = 0), a.to(c, h, p(o, c, x))
                        }
                        m = g = 0
                    }
                    m || i.duration(m = a.duration())
                } else i.timeline = 0;
                return !0 === b && (zt = _assertThisInitialized(i), R.killTweensOf(x), zt = 0), (v || !m && !w && i._start === i.parent._time && s(v) && function _hasNoPausedAncestors(t) {
                    return !t || t._ts && _hasNoPausedAncestors(t.parent)
                }(_assertThisInitialized(i)) && "nested" !== i.parent.data) && (i._tTime = -B, i.render(Math.max(0, -g))), i
            }
            _inheritsLoose(Tween, k);
            var t = Tween.prototype;
            return t.render = function render(t, e, r) {
                var n, i, a, s, o, u, h, l, f, c = this._time,
                    p = this._tDur,
                    d = this._dur,
                    _ = p - B < t && 0 <= t ? p : t < B ? 0 : t;
                if (d) {
                    if (_ !== this._tTime || r || this._startAt && this._zTime < 0 != t < 0) {
                        if (n = _, l = this.timeline, this._repeat) {
                            if (s = d + this._rDelay, d < (n = $(_ % s)) && (n = d), (a = ~~(_ / s)) && a === _ / s && (n = d, a--), (u = this._yoyo && 1 & a) && (f = this._yEase, n = d - n), (o = ~~(this._tTime / s)) && o === this._tTime / s && o--, n === c && !r) return this;
                            a !== o && this.vars.repeatRefresh && !this._lock && (this._lock = 1, this.render(s * a, !0).invalidate()._lock = 0)
                        }
                        if (!this._initted && va(this, n, r, e)) return this;
                        for (this._tTime = _, this._time = n, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = h = (f || this._ease)(n / d), this._from && (this.ratio = h = 1 - h), c || !n || e || bt(this, "onStart"), i = this._pt; i;) i.r(h, i.d), i = i._next;
                        l && l.render(t < 0 ? t : !n && u ? -B : l._dur * h, e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, r), bt(this, "onUpdate")), this._repeat && a !== o && this.vars.onRepeat && !e && this.parent && bt(this, "onRepeat"), _ !== p && _ || this._tTime !== _ || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, r), !t && d || !(_ || this._ts < 0) || oa(this, 1), e || t < 0 && !c || (bt(this, _ === p ? "onComplete" : "onReverseComplete", !0), this._prom && _ === p && this._prom()))
                    }
                } else ! function _renderZeroDurationTween(t, e, r, n) {
                    var i, a, s, o = t._zTime < 0 ? 0 : 1,
                        u = e < 0 ? 0 : 1,
                        h = t._rDelay,
                        l = 0;
                    if (h && t._repeat && ((a = ~~((l = mt(0, t._tDur, e)) / h)) && a === l / h && a--, (s = ~~(t._tTime / h)) && s === t._tTime / h && s--, a !== s && (o = 1 - u, t.vars.repeatRefresh && t.invalidate())), (t._initted || !va(t, e, n, r)) && (u !== o || n)) {
                        for (r && !e || (t._zTime = e), t.ratio = u, t._from && (u = 1 - u), t._time = 0, t._tTime = l, r || bt(t, "onStart"), i = t._pt; i;) i.r(u, i.d), i = i._next;
                        !u && t._startAt && !t._onUpdate && t._start && t._startAt.render(e, !0, n), t._onUpdate && !r && bt(t, "onUpdate"), l && t._repeat && !r && t.parent && bt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === u && (t.ratio && oa(t, 1), r || (bt(t, t.ratio ? "onComplete" : "onReverseComplete", !0), t._prom && t.ratio && t._prom()))
                    }
                }(this, t, e, r);
                return this
            }, t.targets = function targets() {
                return this._targets
            }, t.invalidate = function invalidate() {
                return this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), k.prototype.invalidate.call(this)
            }, t.kill = function kill(t, e) {
                if (void 0 === e && (e = "all"), zt === this) return zt;
                if (!(t || e && "all" !== e) && this.parent) return this._lazy = 0, Ya(this);
                if (this.timeline) return this.timeline.killTweensOf(t, e), this;
                var r, i, a, s, o, u, h, l = this._targets,
                    f = t ? vt(t) : l,
                    c = this._ptLookup,
                    p = this._pt;
                if ((!e || "all" === e) && function _arraysMatch(t, e) {
                        for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r];);
                        return r < 0
                    }(l, f)) return Ya(this);
                for (r = this._op = this._op || [], "all" !== e && (n(e) && (o = {}, Z(e, function(t) {
                        return o[t] = 1
                    }), e = o), e = function _addAliasesToVars(t, e) {
                        var r, n, i, a, s = t[0] ? X(t[0]).harness : 0,
                            o = s && s.aliases;
                        if (!o) return e;
                        for (n in r = dt({}, e), o)
                            if (n in r)
                                for (i = (a = o[n].split(",")).length; i--;) r[a[i]] = r[n];
                        return r
                    }(l, e)), h = l.length; h--;)
                    if (~f.indexOf(l[h]))
                        for (o in i = c[h], "all" === e ? (r[h] = e, s = i, a = {}) : (a = r[h] = r[h] || {}, s = e), s)(u = i && i[o]) && ("kill" in u.d && !0 !== u.d.kill(o) || (na(this, u, "_pt"), delete i[o])), "all" !== a && (a[o] = 1);
                return this._initted && !this._pt && p && Ya(this), this
            }, Tween.to = function to(t, e, r) {
                return new Tween(t, e, r)
            }, Tween.from = function from(t, e) {
                return new Tween(t, aa(arguments, 1))
            }, Tween.delayedCall = function delayedCall(t, e, r, n) {
                return new Tween(e, 0, {
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: t,
                    onComplete: e,
                    onReverseComplete: e,
                    onCompleteParams: r,
                    onReverseCompleteParams: r,
                    callbackScope: n
                })
            }, Tween.fromTo = function fromTo(t, e, r) {
                return new Tween(t, aa(arguments, 2))
            }, Tween.set = function set(t, e) {
                return e.duration = 0, e.repeatDelay || (e.repeat = 0), new Tween(t, e)
            }, Tween.killTweensOf = function killTweensOf(t, e, r) {
                return R.killTweensOf(t, e, r)
            }, Tween
        }(Rt);
    fa(Xt.prototype, {
        _targets: [],
        _initted: 0,
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }), Z("staggerTo,staggerFrom,staggerFromTo", function(r) {
        Xt[r] = function() {
            var t = new Et,
                e = vt(arguments);
            return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e)
        }
    });

    function Mb(t, e, r) {
        return t.setAttribute(e, r)
    }

    function Ub(t, e, r, n) {
        n.mSet(t, e, n.m.call(n.tween, r, n.mt), n)
    }
    var Zt = function _setterPlain(t, e, r) {
            return t[e] = r
        },
        Ut = function _setterFunc(t, e, r) {
            return t[e](r)
        },
        qt = function _setterFuncWithParam(t, e, r, n) {
            return t[e](n.fp, r)
        },
        jt = function _getSetter(t, e) {
            return o(t[e]) ? Ut : q(t[e]) && t.setAttribute ? Mb : Zt
        },
        Vt = function _renderPlain(t, e) {
            return e.set(e.t, e.p, ~~(1e4 * (e.s + e.c * t)) / 1e4, e)
        },
        Qt = function _renderBoolean(t, e) {
            return e.set(e.t, e.p, !!(e.s + e.c * t), e)
        },
        Wt = function _renderComplexString(t, e) {
            var r = e._pt,
                n = "";
            if (!t && e.b) n = e.b;
            else if (1 === t && e.e) n = e.e;
            else {
                for (; r;) n = r.p + (r.m ? r.m(r.s + r.c * t) : ~~(1e4 * (r.s + r.c * t)) / 1e4) + n, r = r._next;
                n += e.c
            }
            e.set(e.t, e.p, n, e)
        },
        Gt = function _renderPropTweens(t, e) {
            for (var r = e._pt; r;) r.r(t, r.d), r = r._next
        },
        Jt = function _addPluginModifier(t, e, r, n) {
            for (var i, a = this._pt; a;) i = a._next, a.p === n && a.modifier(t, e, r), a = i
        },
        Kt = function _killPropTweensOf(t) {
            for (var e, r, n = this._pt; n;) r = n._next, n.p === t && !n.op || n.op === t ? na(this, n, "_pt") : n.dep || (e = 1), n = r;
            return !e
        },
        Ht = function _sortPropTweensByPriority(t) {
            for (var e, r, n, i, a = t._pt; a;) {
                for (e = a._next, r = n; r && r.pr > a.pr;) r = r._next;
                (a._prev = r ? r._prev : i) ? a._prev._next = a: n = a, (a._next = r) ? r._prev = a : i = a, a = e
            }
            t._pt = n
        },
        te = (PropTween.prototype.modifier = function modifier(t, e, r) {
            this.mSet = this.mSet || this.set, this.set = Ub, this.m = t, this.mt = r, this.tween = e
        }, PropTween);

    function PropTween(t, e, r, n, i, a, s, o, u) {
        this.t = e, this.s = n, this.c = i, this.p = r, this.r = a || Vt, this.d = s || this, this.set = o || Zt, this.pr = u || 0, (this._next = t) && (t._prev = this)
    }
    Z(pt + ",parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert", function(t) {
        st[t] = 1, "on" === t.substr(0, 2) && (st[t + "Params"] = 1)
    }), at.TweenMax = at.TweenLite = Xt, at.TimelineLite = at.TimelineMax = Et, R = new Et({
        sortChildren: !1,
        defaults: E,
        autoRemoveChildren: !0,
        id: "root"
    }), U.stringFilter = gb;
    var ee = {
        registerPlugin: function registerPlugin() {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
            e.forEach(function(t) {
                return function _createPlugin(t) {
                    var e = (t = !t.name && t.default || t).name,
                        r = o(t),
                        n = e && !r && t.init ? function() {
                            this._props = []
                        } : t,
                        i = {
                            init: N,
                            render: Gt,
                            add: Lt,
                            kill: Kt,
                            modifier: Jt,
                            rawVars: 0
                        },
                        a = {
                            targetTest: 0,
                            get: 0,
                            getSetter: jt,
                            aliases: {},
                            register: 0
                        };
                    if (Mt(), t !== n) {
                        if (ht[e]) return;
                        fa(n, fa(ja(t, i), a)), dt(n.prototype, dt(i, ja(t, a))), ht[n.prop = e] = n, t.targetTest && (ct.push(n), st[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
                    }
                    M(e, n), t.register && t.register(ee, n, te)
                }(t)
            })
        },
        timeline: function timeline(t) {
            return new Et(t)
        },
        getTweensOf: function getTweensOf(t, e) {
            return R.getTweensOf(t, e)
        },
        getProperty: function getProperty(i, t, e, r) {
            n(i) && (i = vt(i)[0]);
            var a = X(i || {}).get,
                s = e ? ea : da;
            return "native" === e && (e = ""), i ? t ? s((ht[t] && ht[t].get || a)(i, t, e, r)) : function(t, e, r) {
                return s((ht[t] && ht[t].get || a)(i, t, e, r))
            } : i
        },
        quickSetter: function quickSetter(r, e, n) {
            if (1 < (r = vt(r)).length) {
                var i = r.map(function(t) {
                        return ee.quickSetter(t, e, n)
                    }),
                    a = i.length;
                return function(t) {
                    for (var e = a; e--;) i[e](t)
                }
            }
            r = r[0] || {};
            var s = ht[e],
                o = X(r),
                u = s ? function(t) {
                    var e = new s;
                    d._pt = 0, e.init(r, n ? t + n : t, d, 0, [r]), e.render(1, e), d._pt && Gt(1, d)
                } : o.set(r, e);
            return s ? u : function(t) {
                return u(r, e, n ? t + n : t, o, 1)
            }
        },
        isTweening: function isTweening(t) {
            return 0 < R.getTweensOf(t, !0).length
        },
        defaults: function defaults(t) {
            return t && t.ease && (t.ease = Dt(t.ease, E.ease)), ia(E, t || {})
        },
        config: function config(t) {
            return ia(U, t || {})
        },
        registerEffect: function registerEffect(t) {
            var i = t.name,
                n = t.effect,
                e = t.plugins,
                a = t.defaults,
                s = t.extendTimeline;
            (e || "").split(",").forEach(function(t) {
                return t && !ht[t] && !at[t] && L(i + " effect requires " + t + " plugin.")
            }), lt[i] = function(t, e) {
                return n(vt(t), fa(e || {}, a))
            }, s && (Et.prototype[i] = function(t, e, n) {
                return this.add(lt[i](t, r(e) ? e : (n = e) && {}), n)
            })
        },
        registerEase: function registerEase(t, e) {
            Ot[t] = Dt(e)
        },
        parseEase: function parseEase(t, e) {
            return arguments.length ? Dt(t, e) : Ot
        },
        getById: function getById(t) {
            return R.getById(t)
        },
        exportRoot: function exportRoot(t, e) {
            void 0 === t && (t = {});
            var r, n, i = new Et(t);
            for (i.smoothChildTiming = s(t.smoothChildTiming), R.remove(i), i._dp = 0, i._time = i._tTime = R._time, r = R._first; r;) n = r._next, !e && !r._dur && r instanceof Xt && r.vars.onComplete === r._targets[0] || ua(i, r, r._start - r._delay), r = n;
            return ua(R, i, 0), i
        },
        utils: {
            wrap: function wrap(e, t, r) {
                var n = t - e;
                return G(e) ? Qa(e, wrap(0, e.length), t) : Ba(r, function(t) {
                    return (n + (t - e) % n) % n + e
                })
            },
            wrapYoyo: function wrapYoyo(e, t, r) {
                var n = t - e,
                    i = 2 * n;
                return G(e) ? Qa(e, wrapYoyo(0, e.length - 1), t) : Ba(r, function(t) {
                    return e + (n < (t = (i + (t - e) % i) % i) ? i - t : t)
                })
            },
            distribute: Ja,
            random: Ma,
            snap: La,
            normalize: function normalize(t, e, r) {
                return yt(t, e, 0, 1, r)
            },
            getUnit: Da,
            clamp: function clamp(e, r, t) {
                return Ba(t, function(t) {
                    return mt(e, r, t)
                })
            },
            splitColor: cb,
            toArray: vt,
            mapRange: yt,
            pipe: function pipe() {
                for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                return function(t) {
                    return e.reduce(function(t, e) {
                        return e(t)
                    }, t)
                }
            },
            unitize: function unitize(e, r) {
                return function(t) {
                    return e(parseFloat(t)) + (r || Da(t))
                }
            },
            interpolate: function interpolate(e, r, t, i) {
                var a = isNaN(e + r) ? 0 : function(t) {
                    return (1 - t) * e + t * r
                };
                if (!a) {
                    var s, o, u, h, l, f = n(e),
                        c = {};
                    if (!0 === t && (i = 1) && (t = null), f) e = {
                        p: e
                    }, r = {
                        p: r
                    };
                    else if (G(e) && !G(r)) {
                        for (u = [], h = e.length, l = h - 2, o = 1; o < h; o++) u.push(interpolate(e[o - 1], e[o]));
                        h--, a = function func(t) {
                            t *= h;
                            var e = Math.min(l, ~~t);
                            return u[e](t - e)
                        }, t = r
                    } else i || (e = dt(G(e) ? [] : {}, e));
                    if (!u) {
                        for (s in r) Lt.call(c, e, s, "get", r[s]);
                        a = function func(t) {
                            return Gt(t, c) || (f ? e.p : e)
                        }
                    }
                }
                return Ba(t, a)
            }
        },
        install: J,
        effects: lt,
        ticker: At,
        updateRoot: Et.updateRoot,
        plugins: ht,
        globalTimeline: R,
        core: {
            PropTween: te,
            globals: M,
            Tween: Xt,
            Timeline: Et,
            Animation: Rt,
            getCache: X
        }
    };
    Z("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
        return ee[t] = Xt[t]
    }), At.add(Et.updateRoot), d = ee.to({}, {
        duration: 0
    });

    function Zb(t, a) {
        return {
            name: t,
            rawVars: 1,
            init: function init(t, i, e) {
                e._onInit = function(t) {
                    var e, r;
                    if (n(i) && (e = {}, Z(i, function(t) {
                            return e[t] = 1
                        }), i = e), a) {
                        for (r in e = {}, i) e[r] = a(i[r]);
                        i = e
                    }! function _addModifiers(t, e) {
                        var r, n, i, a = t._targets;
                        for (r in e)
                            for (n = a.length; n--;)(i = t._ptLookup[n][r]) && i.d.modifier && i.d.modifier(e[r], t, a[n], r)
                    }(t, i)
                }
            }
        }
    }
    ee.registerPlugin({
        name: "attr",
        init: function init(t, e, r, n, i) {
            for (var a in e) this.add(t, "setAttribute", (t.getAttribute(a) || 0) + "", e[a], n, i, 0, 0, a), this._props.push(a)
        }
    }, {
        name: "endArray",
        init: function init(t, e) {
            for (var r = e.length; r--;) this.add(t, r, t[r], e[r])
        }
    }, Zb("roundProps", Ka), Zb("modifiers"), Zb("snap", La)), Xt.version = Et.version = ee.version = "3.0.1", f = 1, t() && Mt();

    function Ic(t, e) {
        return e.set(e.t, e.p, ~~(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }

    function Jc(t, e) {
        return e.set(e.t, e.p, 1 === t ? e.e : ~~(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }

    function Kc(t, e) {
        return e.set(e.t, e.p, t ? ~~(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
    }

    function Lc(t, e) {
        var r = e.s + e.c * t;
        e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
    }

    function Mc(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
    }

    function Nc(t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    }

    function Oc(t, e, r) {
        return t.style[e] = r
    }

    function Pc(t, e, r) {
        return t.style.setProperty(e, r)
    }

    function Qc(t, e, r) {
        return t._gsap[e] = r
    }

    function Rc(t, e, r) {
        return t._gsap.scaleX = t._gsap.scaleY = r
    }

    function Sc(t, e, r, n, i) {
        var a = t._gsap;
        a.scaleX = a.scaleY = r, a.renderTransform(i, a)
    }

    function Tc(t, e, r, n, i) {
        var a = t._gsap;
        a[e] = r, a.renderTransform(i, a)
    }

    function Xc(t, e) {
        var r = ne.createElementNS ? ne.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ne.createElement(t);
        return r.style ? r : ne.createElement(t)
    }

    function Yc(t, e) {
        var r = getComputedStyle(t);
        return r[e] || r.getPropertyValue(e.replace(Ee, "-$1").toLowerCase()) || r.getPropertyValue(e)
    }

    function Zc(t, e) {
        var r = (e || se).style,
            n = 5,
            i = "O,Moz,ms,Ms,Webkit".split(",");
        if (t in r) return t;
        for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(i[n] + t in r););
        return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? i[n] : "") + t
    }

    function $c() {
        ! function _windowExists() {
            return "undefined" != typeof window
        }() || (re = window, ne = re.document, ie = ne.documentElement, se = Xc("div") || {
            style: {}
        }, oe = Xc("div"), Ne = Zc(Ne), $e = Zc($e), se.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", he = !!Zc("perspective"), ae = 1)
    }

    function ad(t, e) {
        for (var r = e.length; r--;)
            if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
    }

    function bd(e) {
        var r;
        try {
            r = e.getBBox()
        } catch (t) {
            r = function _getBBoxHack(t) {
                var e, r = Xc("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                    n = this.parentNode,
                    i = this.nextSibling,
                    a = this.style.cssText;
                if (ie.appendChild(r), r.appendChild(this), this.style.display = "block", t) try {
                    e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = _getBBoxHack
                } catch (t) {} else this._gsapBBox && (e = this._gsapBBox());
                return i ? n.insertBefore(this, i) : n.appendChild(this), ie.removeChild(r), this.style.cssText = a, e
            }.call(e, !0)
        }
        return !r || r.width || r.x || r.y ? r : {
            x: +ad(e, ["x", "cx", "x1"]),
            y: +ad(e, ["y", "cy", "y1"]),
            width: 0,
            height: 0
        }
    }

    function cd(t) {
        return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !bd(t))
    }

    function dd(t, e) {
        if (e) {
            var r = t.style;
            e in De && (e = Ne), r.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), r.removeProperty(e.replace(Ee, "-$1").toLowerCase())) : r.removeAttribute(e)
        }
    }

    function ed(t, e, r, n, i, a) {
        var s = new te(t._pt, e, r, 0, 1, a ? Nc : Mc);
        return (t._pt = s).b = n, s.e = i, t._props.push(r), s
    }

    function gd(t, e, r, n) {
        var i, a, s, o, u = parseFloat(r),
            h = (r + "").substr((u + "").length) || "px",
            l = se.style,
            f = Le.test(e),
            c = "svg" === t.tagName.toLowerCase(),
            p = (c ? "client" : "offset") + (f ? "Width" : "Height"),
            d = "px" === n;
        return n === h || Xe[n] || Xe[h] ? u : (o = t.getCTM && cd(t), "%" === n && De[e] ? $(u / (o ? t.getBBox()[f ? "width" : "height"] : t[p]) * 100) : (l[f ? "width" : "height"] = 100 + (d ? h : n), a = "em" === n && t.appendChild && !c ? t : t.parentNode, o && (a = (t.ownerSVGElement || {}).parentNode), a && a !== ne && a.appendChild || (a = ne.body), (s = a._gsap) && "%" === n && s.width && f && s.time === At.time ? i = s.width * u / 100 : (a.appendChild(se), i = se[p], a.removeChild(se), f && "%" === n && ((s = X(a)).time = At.time, s.width = i / u * 100)), $(d ? i * u / 100 : 100 / i * u)))
    }

    function hd(t, e, r, n) {
        var i;
        return ae || $c(), e in Ye && ~(e = Ye[e]).indexOf(",") && (e = e.split(",")[0]), De[e] ? (i = Ve(t, n), i = "transformOrigin" !== e ? i[e] : Qe(Yc(t, $e)) + i.zOrigin + "px") : (i = t.style[e]) && "auto" !== i && !n || (i = Yc(t, e) || Y(t, e)), r ? gd(t, e, i, r) + r : i
    }

    function id(t, e, r, n) {
        var i, a, s, o, u, h, l, f, c, p, d, _, m = new te(this._pt, t.style, e, 0, 1, Wt),
            g = 0,
            v = 0;
        if (m.b = r, m.e = n, r += "", "auto" === (n += "") && (t.style[e] = n, n = Yc(t, e) || n, t.style[e] = r), gb(i = [r, n]), n = i[1], s = (r = i[0]).match(ze) || [], (n.match(ze) || []).length) {
            for (; a = ze.exec(n);) l = a[0], c = n.substring(g, a.index), u ? u = (u + 1) % 5 : "rgba(" === c.substr(-5) && (u = 1), l !== (h = s[v++] || "") && (o = parseFloat(h) || 0, d = h.substr((o + "").length), (_ = "=" === l.charAt(1) ? +(l.charAt(0) + "1") : 0) && (l = l.substr(2)), f = parseFloat(l), p = l.substr((f + "").length), g = ze.lastIndex - p.length, p || (p = p || U.units[e] || d, g === n.length && (n += p, m.e += p)), d !== p && (o = gd(t, e, h, p)), m._pt = {
                _next: m._pt,
                p: c || 1 === v ? c : ",",
                s: o,
                c: _ ? _ * f : f - o,
                m: u && u < 4 ? Math.round : 0
            });
            m.c = g < n.length ? n.substring(g, n.length) : ""
        } else m.r = "display" === e ? Nc : Mc;
        return nt.test(n) && (m.e = 0), this._pt = m
    }

    function kd(t) {
        var e = t.split(" "),
            r = e[0],
            n = e[1] || "50%";
        return "top" !== r && "bottom" !== r && "left" !== n && "right" !== n || (e = r, r = n, n = e), e[0] = Ze[r] || r, e[1] = Ze[n] || n, e.join(" ")
    }

    function ld(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var r, n, i, a = e.t,
                s = a.style,
                o = e.u;
            if ("all" === o || !0 === o) s.cssText = "", n = 1;
            else
                for (i = (o = o.split(",")).length; - 1 < --i;) r = o[i], De[r] && (n = 1, r = "transformOrigin" === r ? $e : Ne), dd(a, r);
            n && (dd(a, Ne), (n = a._gsap) && (n.svg && a.removeAttribute("transform"), delete n.x))
        }
    }

    function pd(t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
    }

    function qd(t) {
        var e = Yc(t, Ne);
        return pd(e) ? qe : e.substr(7).match(tt).map($)
    }

    function rd(t, e) {
        var r, n, i, a, s = t._gsap,
            o = t.style,
            u = qd(t);
        return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(i = t.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f]).join(",") ? qe : u : (u !== qe || t.offsetParent || t === ie || s.svg || (i = o.display, o.display = "block", (r = t.parentNode) && t.offsetParent || (a = 1, n = t.nextSibling, ie.appendChild(t)), u = qd(t), i ? o.display = i : dd(t, "display"), a && (n ? r.insertBefore(t, n) : r ? r.appendChild(t) : ie.removeChild(t))), e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u)
    }

    function sd(t, e, r, n, i, a) {
        var s, o, u, h = t._gsap,
            l = i || rd(t, !0),
            f = h.xOrigin || 0,
            c = h.yOrigin || 0,
            p = h.xOffset || 0,
            d = h.yOffset || 0,
            _ = l[0],
            m = l[1],
            g = l[2],
            v = l[3],
            y = l[4],
            b = l[5],
            w = e.split(" "),
            T = parseFloat(w[0]) || 0,
            x = parseFloat(w[1]) || 0;
        r ? l !== qe && (o = _ * v - m * g) && (u = T * (-m / o) + x * (_ / o) - (_ * b - m * y) / o, T = T * (v / o) + x * (-g / o) + (g * b - v * y) / o, x = u) : (T = (s = bd(t)).x + (~w[0].indexOf("%") ? T / 100 * s.width : T), x = s.y + (~(w[1] || w[0]).indexOf("%") ? x / 100 * s.height : x)), n || !1 !== n && h.smooth ? (y = T - f, b = x - c, h.xOffset += y * _ + b * g - y, h.yOffset += y * m + b * v - b) : h.xOffset = h.yOffset = 0, h.xOrigin = T, h.yOrigin = x, h.smooth = !!n, h.origin = e, h.originIsAbsolute = !!r, a && (ed(a, h, "xOrigin", f, T), ed(a, h, "yOrigin", c, x), ed(a, h, "xOffset", p, h.xOffset), ed(a, h, "yOffset", d, h.yOffset))
    }

    function vd(t, e, r) {
        var n = Da(e);
        return $(parseFloat(e) + parseFloat(gd(t, "x", r + "px", n))) + n
    }

    function Cd(t, e, r, i, a, s) {
        var o, u, h = 360,
            l = n(a),
            f = parseFloat(a) * (l && ~a.indexOf("rad") ? Be : 1),
            c = s ? f * s : f - i,
            p = i + c + "deg";
        return l && ("short" === (o = a.split("_")[1]) && (c %= h) !== c % 180 && (c += c < 0 ? h : -h), "cw" === o && c < 0 ? c = (c + 36e9) % h - ~~(c / h) * h : "ccw" === o && 0 < c && (c = (c - 36e9) % h - ~~(c / h) * h)), t._pt = u = new te(t._pt, e, r, i, c, Jc), u.e = p, u.u = "deg", t._props.push(r), u
    }

    function Dd(t, e, r) {
        var n, i, a, s, o, u, h, l = oe.style,
            f = r._gsap;
        for (i in l.cssText = getComputedStyle(r).cssText + ";position:absolute;display:block;", l[Ne] = e, ne.body.appendChild(oe), n = Ve(oe, 1), De)(a = f[i]) !== (s = n[i]) && "perspective" !== i && (o = Da(a) !== (h = Da(s)) ? gd(r, i, a, h) : parseFloat(a), u = parseFloat(s), t._pt = new te(t._pt, f, i, o, u - o, Ic), t._pt.u = h, t._props.push(i));
        ne.body.removeChild(oe)
    }
    var re, ne, ie, ae, se, oe, ue, he, le, fe, ce, pe = Ot.Power0,
        de = Ot.Power1,
        _e = Ot.Power2,
        me = Ot.Power3,
        ge = Ot.Power4,
        ve = Ot.Linear,
        ye = Ot.Quad,
        be = Ot.Cubic,
        we = Ot.Quart,
        Te = Ot.Quint,
        xe = Ot.Strong,
        ke = Ot.Elastic,
        Ae = Ot.Back,
        Me = Ot.SteppedEase,
        Oe = Ot.Bounce,
        Pe = Ot.Sine,
        Se = Ot.Expo,
        Ce = Ot.Circ,
        De = {},
        Be = 180 / Math.PI,
        Fe = Math.PI / 180,
        Re = Math.atan2,
        Ee = /([A-Z])/g,
        ze = /[-+=\.]*\d+[\.e-]*\d*[a-z%]*/g,
        Le = /(?:left|right|width|margin|padding|x)/i,
        Ie = /[\s,\(]\S/,
        Ye = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        },
        Ne = "transform",
        $e = Ne + "Origin",
        Xe = {
            deg: 1,
            rad: 1,
            turn: 1
        },
        Ze = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        },
        Ue = {
            clearProps: function clearProps(t, e, r, n, i) {
                var a = t._pt = new te(t._pt, e, r, 0, 0, ld);
                return a.u = n, a.pr = -10, a.tween = i, t._props.push(r), 1
            }
        },
        qe = [1, 0, 0, 1, 0, 0],
        je = {},
        Ve = function _parseTransform(t, e) {
            var r = t._gsap || new Ft(t);
            if ("x" in r && !e) return r;
            var n, i, a, s, o, u, h, l, f, c, p, d, _, m, g, v, y, b, w, T, x, k, A, M, O, P, S, C, D, B, F = t.style,
                R = r.scaleX < 0,
                E = r.xOrigin || 0,
                z = r.yOrigin || 0,
                L = "deg",
                I = Yc(t, $e) || "0";
            return n = i = a = u = h = l = f = c = p = 0, s = o = 1, r.svg = !(!t.getCTM || !cd(t)), d = rd(t, r.svg), r.svg && sd(t, I, r.originIsAbsolute, !1 !== r.smooth, d), d !== qe && (v = d[0], y = d[1], b = d[2], w = d[3], n = T = d[4], i = x = d[5], 6 === d.length ? (s = Math.sqrt(v * v + y * y), o = Math.sqrt(w * w + b * b), u = v || y ? Re(y, v) * Be : r.rotation || 0, f = b || w ? Re(b, w) * Be + u : r.skewX || 0, r.svg && (n -= E - (E * v + z * b), i -= z - (E * y + z * w))) : (B = d[6], C = d[7], O = d[8], P = d[9], S = d[10], D = d[11], n = d[12], i = d[13], a = d[14], h = (_ = Re(B, S)) * Be, _ && (k = T * (m = Math.cos(-_)) + O * (g = Math.sin(-_)), A = x * m + P * g, M = B * m + S * g, O = T * -g + O * m, P = x * -g + P * m, S = B * -g + S * m, D = C * -g + D * m, T = k, x = A, B = M), l = (_ = Re(-b, S)) * Be, _ && (m = Math.cos(-_), D = w * (g = Math.sin(-_)) + D * m, v = k = v * m - O * g, y = A = y * m - P * g, b = M = b * m - S * g), u = (_ = Re(y, v)) * Be, _ && (k = v * (m = Math.cos(_)) + y * (g = Math.sin(_)), A = T * m + x * g, y = y * m - v * g, x = x * m - T * g, v = k, T = A), h && 359.9 < Math.abs(h) + Math.abs(u) && (h = u = 0, l = 180 - l), s = $(Math.sqrt(v * v + y * y + b * b)), o = $(Math.sqrt(x * x + B * B)), _ = Re(T, x), f = 2e-4 < Math.abs(_) ? _ * Be : 0, p = D ? 1 / (D < 0 ? -D : D) : 0), r.svg && (d = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !pd(Yc(t, Ne)), d && t.setAttribute("transform", d))), 90 < Math.abs(f) && Math.abs(f) < 270 && (R ? (s *= -1, f += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (o *= -1, f += f <= 0 ? 180 : -180)), r.x = ((r.xPercent = n && Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0) ? 0 : n) + "px", r.y = ((r.yPercent = i && Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0) ? 0 : i) + "px", r.z = a + "px", r.scaleX = $(s), r.scaleY = $(o), r.rotation = $(u) + L, r.rotationX = $(h) + L, r.rotationY = $(l) + L, r.skewX = f + L, r.skewY = c + L, r.transformPerspective = p + "px", (r.zOrigin = parseFloat(I.split(" ")[2]) || 0) && (F[$e] = Qe(I)), r.xOffset = r.yOffset = 0, r.force3D = U.force3D, r.renderTransform = r.svg ? tr : he ? He : We, r
        },
        Qe = function _firstTwoOnly(t) {
            return (t = t.split(" "))[0] + " " + t[1]
        },
        We = function _renderNon3DTransforms(t, e) {
            e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, He(t, e)
        },
        Ge = "0deg",
        Je = "0px",
        Ke = ") ",
        He = function _renderCSSTransforms(t, e) {
            var r = e || this,
                n = r.xPercent,
                i = r.yPercent,
                a = r.x,
                s = r.y,
                o = r.z,
                u = r.rotation,
                h = r.rotationY,
                l = r.rotationX,
                f = r.skewX,
                c = r.skewY,
                p = r.scaleX,
                d = r.scaleY,
                _ = r.transformPerspective,
                m = r.force3D,
                g = r.target,
                v = r.zOrigin,
                y = "",
                b = "auto" === m && t && 1 !== t || !0 === m;
            if (v && (l !== Ge || h !== Ge)) {
                var w, T = parseFloat(h) * Fe,
                    x = Math.sin(T),
                    k = Math.cos(T);
                T = parseFloat(l) * Fe, w = Math.cos(T), a = vd(g, a, x * w * -v), s = vd(g, s, -Math.sin(T) * -v), o = vd(g, o, k * w * -v + v)
            }(n || i) && (y = "translate(" + n + "%, " + i + "%) "), !b && a === Je && s === Je && o === Je || (y += o !== Je || b ? "translate3d(" + a + ", " + s + ", " + o + ") " : "translate(" + a + ", " + s + Ke), _ !== Je && (y += "perspective(" + _ + Ke), u !== Ge && (y += "rotate(" + u + Ke), h !== Ge && (y += "rotateY(" + h + Ke), l !== Ge && (y += "rotateX(" + l + Ke), f === Ge && c === Ge || (y += "skew(" + f + ", " + c + Ke), 1 === p && 1 === d || (y += "scale(" + p + ", " + d + Ke), g.style[Ne] = y || "translate(0, 0)"
        },
        tr = function _renderSVGTransforms(t, e) {
            var r, n, i, a, s, o = e || this,
                u = o.xPercent,
                h = o.yPercent,
                l = o.x,
                f = o.y,
                c = o.rotation,
                p = o.skewX,
                d = o.skewY,
                _ = o.scaleX,
                m = o.scaleY,
                g = o.target,
                v = o.xOrigin,
                y = o.yOrigin,
                b = o.xOffset,
                w = o.yOffset,
                T = o.forceCSS,
                x = parseFloat(l),
                k = parseFloat(f);
            c = parseFloat(c), p = parseFloat(p), (d = parseFloat(d)) && (p += d = parseFloat(d), c += d), c || p ? (c *= Fe, p *= Fe, r = Math.cos(c) * _, n = Math.sin(c) * _, i = Math.sin(c - p) * -m, a = Math.cos(c - p) * m, p && (d *= Fe, s = Math.tan(p - d), i *= s = Math.sqrt(1 + s * s), a *= s, d && (s = Math.tan(d), r *= s = Math.sqrt(1 + s * s), n *= s)), r = $(r), n = $(n), i = $(i), a = $(a)) : (r = _, a = m, n = i = 0), (x && !~(l + "").indexOf("px") || k && !~(f + "").indexOf("px")) && (x = gd(g, "x", l, "px"), k = gd(g, "y", f, "px")), (v || y || b || w) && (x = $(x + v - (v * r + y * i) + b), k = $(k + y - (v * n + y * a) + w)), (u || h) && (s = g.getBBox(), x = $(x + u / 100 * s.width), k = $(k + h / 100 * s.height)), s = "matrix(" + r + "," + n + "," + i + "," + a + "," + x + "," + k + ")", g.setAttribute("transform", s), T && (g.style[Ne] = s)
        },
        er = {
            name: "css",
            register: $c,
            targetTest: function targetTest(t) {
                return t.style && t.nodeType
            },
            init: function init(t, e, r, n, i) {
                var a, s, o, u, h, l, f, c, p, d, _, m, g, v, y, b = this._props,
                    w = t.style;
                for (f in ae || $c(), e)
                    if ("autoRound" !== f && (s = e[f], !ht[f] || !Bb(f, e, r, n, t, i)))
                        if (l = Ue[f], "function" === (h = typeof s) && (h = typeof(s = s.call(r, n, t, i))), "string" === h && ~s.indexOf("random(") && (s = Ta(s)), l) l(this, t, f, s, r) && (y = 1);
                        else if ("--" === f.substr(0, 2)) this.add(w, "setProperty", getComputedStyle(t).getPropertyValue(f) + "", s + "", n, i, 0, 0, f);
                else {
                    if (a = hd(t, f), u = parseFloat(a), (d = "string" === h && "=" === s.charAt(1) ? +(s.charAt(0) + "1") : 0) && (s = s.substr(2)), o = parseFloat(s), f in Ye && ("autoAlpha" === f && (1 === u && "hidden" === hd(t, "visibility") && o && (u = 0), ed(this, w, "visibility", u ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), "scale" !== f && ~(f = Ye[f]).indexOf(",") && (f = f.split(",")[0])), _ = f in De) {
                        if (m || (g = t._gsap, v = !1 !== e.smoothOrigin && g.smooth, (m = this._pt = new te(this._pt, w, Ne, 0, 1, g.renderTransform, g)).dep = 1), "scale" === f) {
                            this._pt = new te(this._pt, t, "scale", u, d ? d * o : o - u, 0, 0, Rc), b.push("scale");
                            continue
                        }
                        if ("transformOrigin" === f) {
                            s = kd(s), g.svg ? sd(t, s, 0, v, 0, this) : ((p = parseFloat(s.split(" ")[2])) !== g.zOrigin && ed(this, g, "zOrigin", g.zOrigin, p), ed(this, w, f, Qe(a), Qe(s)));
                            continue
                        }
                        if ("svgOrigin" === f) {
                            sd(t, s, 1, v, 0, this);
                            continue
                        }
                        if (f in je) {
                            Cd(this, g, f, u, s, d);
                            continue
                        }
                        if ("smoothOrigin" === f) {
                            ed(this, g, "smooth", g.smooth, s);
                            continue
                        }
                        if ("force3D" === f) {
                            g[f] = s;
                            continue
                        }
                        if ("transform" === f) {
                            Dd(this, s, t);
                            continue
                        }
                    }
                    if (_ || (o || 0 === o) && (u || 0 === u) && !Ie.test(s) && f in w)(c = (a + "").substr((u + "").length)) !== (p = (s + "").substr((o + "").length) || (f in U.units ? U.units[f] : c)) && (u = gd(t, f, a, p)), this._pt = new te(this._pt, _ ? g : w, f, u, d ? d * o : o - u, "px" !== p || !1 === e.autoRound || _ ? Ic : Lc), this._pt.u = p || 0, c !== p && (this._pt.b = a, this._pt.r = Kc);
                    else if (f in w) id.call(this, t, f, a, s);
                    else {
                        if (!(f in t)) {
                            K("Invalid " + f + " tween " + s + ". Missing plugin? gsap.registerPlugin()");
                            continue
                        }
                        this.add(t, f, t[f], s, n, i)
                    }
                    b.push(f)
                }
                y && Ht(this)
            },
            get: hd,
            aliases: Ye,
            getSetter: function getSetter(t, e, r) {
                return e in De && e !== $e && (t._gsap.x || hd(t, "x")) ? r && ue === r ? "scale" === e ? Rc : Qc : (ue = r || {}) && ("scale" === e ? Sc : Tc) : t.style && !q(t.style[e]) ? Oc : ~e.indexOf("-") ? Pc : jt(t, e)
            }
        };
    ee.utils.checkPrefix = Zc, ce = Z((le = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (fe = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function(t) {
        De[t] = 1
    }), Z(fe, function(t) {
        U.units[t] = "deg", je[t] = 1
    }), Ye[ce[13]] = le + "," + fe, Z("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,9:rotateX,10:rotateY", function(t) {
        var e = t.split(":");
        Ye[e[1]] = ce[e[0]]
    }), Z("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
        U.units[t] = "px"
    }), ee.registerPlugin(er);
    var rr = ee.registerPlugin(er) || ee;
    e.Back = Ae, e.Bounce = Oe, e.CSSPlugin = er, e.Circ = Ce, e.Cubic = be, e.Elastic = ke, e.Expo = Se, e.Linear = ve, e.Power0 = pe, e.Power1 = de, e.Power2 = _e, e.Power3 = me, e.Power4 = ge, e.Quad = ye, e.Quart = we, e.Quint = Te, e.Sine = Pe, e.SteppedEase = Me, e.Strong = xe, e.TimelineLite = Et, e.TimelineMax = Et, e.TweenLite = Xt, e.TweenMax = Xt, e.default = rr, e.gsap = rr, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});

/** 
 * Author: Shadow Themes
 * Author URL: http://shadow-themes.com
 */
 "use strict";

 var ashade = {},
     $ashade_html = jQuery('html'),
     ashade_tns = [],
     $ashade_body = jQuery('body'),
     $ashade_window = jQuery(window),
     $ashade_header = jQuery('header#ashade-header'),
     $ashade_footer = jQuery('footer#ashade-footer'),
     $ashade_main = jQuery('main.ashade-content-wrap'),
     $ashade_scroll = jQuery('.ashade-content-scroll'),
     $ashade_header_holder,
     ashade_f_grid = [];
 
 // Default Options
 ashade.config = {
     'smooth_ease': 0.1,
     'content_load_delay': 0.8,
     'header_scroll': false,
     'referrer': document.referrer,
     'location': jQuery(location).attr('href'),
     'home_link': false
 }
 
 if ($ashade_body.hasClass('ashade-header-scrollable')) {
     ashade.config.header_scroll = true;
     var $ashade_header_inner = $ashade_header.children('.ashade-header-inner');
 }
 
 // Landing Object
 if ($ashade_body.hasClass('ashade-home-template')) {
     var ashade_landing = {
         get_event: function() {
             let this_event = false;
             if (window.location.href.indexOf('?event=') > -1) {
                 this_event = window.location.href.split('?event=')[1];
             } else if (window.location.href.indexOf('?page_id=') > -1 && window.location.href.indexOf('&event=') > -1) {
                 this_event = window.location.href.split('&event=')[1];
             }
             return this_event;
         },
         get_location: function() {
             let this_url = false;
             if (window.location.href.indexOf('?event=') > -1) {
                 this_url = window.location.href.split('?event=')[0];
             } else if (window.location.href.indexOf('?page_id=') > -1 && window.location.href.indexOf('&event=') > -1) {
                 this_url = window.location.href.split('&event=')[0];
             }
             return this_url;
         },
         get_event_url: function(event) {
             let this_event_url = false;
             if (window.location.href.indexOf('?page_id=') > -1) {
                 this_event_url = window.location.href + '&event=' + event;
             } else {
                 this_event_url = window.location.href + '?event=' + event;
             }
             return this_event_url;
         }
     }
 } else {
     ashade_landing = false;
 }
 
 ashade.link_exception = function($this) {
     // Disable location change on link click by Class and ID;
     let classes = [
             'comment-reply-link',
             'ajax_add_to_cart',
             'remove'
         ],
         ids = [
             'cancel-comment-reply-link'
         ],
         result = false;
     classes.forEach(function(this_class) {
         if ($this.hasClass(this_class)) {
             result = true;
         }
     });
     ids.forEach(function(this_id) {
         if ($this.attr('id') == this_id) result = true;
     });
     return result;
 }
 
 // Grid Filtering
 class Ashade_Filtered_Grid {
     constructor(this_obj) {
         let this_class = this;
 
         if (!this_obj) {
             return false;
         }
 
         // Create $el
         if (this_obj instanceof jQuery) {
             this.$el = this_obj;
         } else {
             this.$el = jQuery(this_obj);
         }
 
         if (this.$el.hasClass('ashade-gallery-adjusted')) {
             this.type = 'adjusted';
         } else {
             this.type = 'grid';
         }
 
         this.id = this.$el.attr('id');
         this.$filter = jQuery('.ashade-filter-wrap[data-id="' + this.id + '"]');
         this.$filter_mobile_wrap = jQuery('<div class="ashade-mobile-filter-wrap"/>').appendTo(this.$filter);
         this.$filter_mobile = jQuery('<div class="ashade-mobile-filter"/>').appendTo(this.$filter_mobile_wrap);
         this.$filter_mobile.append('<span class="ashade-mobile-filter-label">' + this.$filter.data('label') + '</span>');
         this.$filter_mobile_value = jQuery('<span class="ashade-mobile-filter-value">' + this.$filter.find('a.is-active').text() + '</span>').appendTo(this.$filter_mobile);
         this.$filter_mobile_list = jQuery('<ul class="ashade-mobile-filter-list"/>').insertAfter(this.$filter_mobile).slideUp(1);
         this.$filter_mobile_wrap.append('\
         <svg xmlns="http://www.w3.org/2000/svg" width="19.875" height="10.969" viewBox="0 0 19.875 10.969">\
             <path id="arrow-down" d="M-8.812-12.937,0-4.078l8.813-8.859,1.125,1.125L.563-2.437,0-1.969l-.562-.469-9.375-9.375Z" transform="translate(9.938 12.938)"/>\
         </svg>');
 
         // Add list items
         this.$filter.children('a').each(function() {
             let $this_a = jQuery(this),
                 this_li = jQuery('<li data-category="' + $this_a.data('category') + '">' + $this_a.text() + '</li>').appendTo(this_class.$filter_mobile_list);
             this_li.on('click', function(e) {
                 e.preventDefault();
                 let $this = jQuery(this),
                     category = $this.data('category'),
                     label = $this.text();
 
                 this_class.set(category, label);
             });
         });
 
         // Set Current Values
         this.$filter.children('a.is-active').each(function() {
             let category = jQuery(this).data('category'),
                 label = jQuery(this).text();
 
             this_class.$filter_mobile_list.find('[data-category="' + category + '"]').addClass('is-active');
             this_class.$filter_mobile_value.text(label);
         });
 
         // Setup
         this.$el.addClass('ashade-grid-filtered');
 
         this_class.layout();
 
         // Bind Actions
         this.$filter.on('click', 'a', function(e) {
             e.preventDefault();
             let $this = jQuery(this),
                 category = $this.data('category'),
                 label = $this.text();
 
             this_class.set(category, label);
         });
         this.$filter_mobile.on('click', function() {
             jQuery(this).parents('.ashade-filter-wrap').toggleClass('is-open');
             this_class.$filter_mobile_list.slideToggle(300);
 
         });
         jQuery(window)
             .on('resize', function() {
                 this_class.layout();
             })
             .on('load', function() {
                 this_class.layout();
             });
     }
     set(category, label) {
         let this_class = this;
         // Set Active Filter Item
         this_class.$filter.find('.is-active').removeClass('is-active');
         this_class.$filter.find('[data-category="' + category + '"]').addClass('is-active');
 
         // Hide not match Items
         this_class.$el.children('div').removeClass('ashade-grid-item-hidden');
         this_class.$el.children('div:not(' + category + ')').addClass('ashade-grid-item-hidden');
 
         // Update Mobile List
         this_class.$filter_mobile_value.text(label);
         this_class.$filter.removeClass('is-open');
         this_class.$filter_mobile_list.slideUp(300);
 
         // reLayout Grid
         this_class.layout();
 
     }
     layout() {
         let this_class = this,
             count = 0,
             row_height = 0,
             container_height = 0,
             $items = this.$el.children('div:not(.ashade-grid-item-hidden)'),
             spacing_x = parseInt($items.css('margin-left'), 10) + parseInt($items.css('margin-right'), 10),
             spacing_y = parseInt($items.css('margin-top'), 10) + parseInt($items.css('margin-bottom'), 10),
             item_width = $items.width() + spacing_x,
             columns = Math.round(this.$el.width() / item_width);
 
         if ('adjusted' == this.type) {
             var current_row = [];
         }
 
         $items.each(function() {
             let $this = jQuery(this),
                 this_height = $this.height() + spacing_y,
                 setX = item_width * count,
                 setY = container_height;
 
             // Check item Height
             if (this_height > row_height) {
                 row_height = this_height;
             }
 
             // Set Position
             $this.css('transform', 'translate3d(' + setX + 'px, ' + setY + 'px, 0) scale(1,1)');
 
             if ('adjusted' == this_class.type) {
                 current_row.push({
                     index: jQuery(this).index(),
                     xPos: setX,
                     yPos: setY,
                 });
             }
 
             // Count Next
             count++
             if (count >= columns) {
                 count = 0;
                 container_height += row_height;
 
                 if ('adjusted' == this_class.type) {
                     let rowItemHeight = row_height - spacing_y;
                     jQuery(current_row).each(function() {
                         let $current = this_class.$el.children('div:eq(' + this.index + ')');
                         if ($current.height() < rowItemHeight) {
                             let newY = this.yPos + ((rowItemHeight - $current.height()) / 2);
                             $current.css('transform', 'translate3d(' + this.xPos + 'px, ' + newY + 'px, 0) scale(1,1)');
                         }
                     });
                     current_row.length = 0;
                 }
 
                 row_height = 0;
             }
         });
         // Add Last Row Height
         if (count > 0) {
             container_height += row_height;
 
             if ('adjusted' == this_class.type) {
                 let rowItemHeight = row_height - spacing_y;
                 jQuery(current_row).each(function() {
                     let $current = this_class.$el.children('div:eq(' + this.index + ')');
                     if ($current.height() < rowItemHeight) {
                         let newY = this.yPos + ((rowItemHeight - $current.height()) / 2);
                         $current.css('transform', 'translate3d(' + this.xPos + 'px, ' + newY + 'px, 0) scale(1,1)');
                     }
                 });
                 current_row.length = 0;
             }
         }
         this.$el.height(container_height);
 
         if ($ashade_body.hasClass('ashade-home-template') && $ashade_body.hasClass('ashade-smooth-scroll')) {
             ashade.sScroll.layout();
         }
     }
 }
 
 // Magic Cursor
 ashade.cursor = {
     $el: jQuery('.ashade-cursor'),
     $el_main: jQuery('span.ashade-cursor-circle'),
     targetX: $ashade_window.width() / 2,
     targetY: $ashade_window.height() / 2,
     currentX: $ashade_window.width() / 2,
     currentY: $ashade_window.height() / 2,
     easing: 0.2,
     init: function() {
         let $this_el = this.$el;
 
         // Cursor Move
         $ashade_window.on('mousemove', function(e) {
             ashade.cursor.targetX = e.clientX - $this_el.width() / 2;
             ashade.cursor.targetY = e.clientY - $this_el.height() / 2;
         });
         if ($this_el.length) {
             ashade.cursor.animate();
         }
 
         // Show and Hide Cursor
         $ashade_window.on('mouseleave', function() {
             ashade.cursor.$el.addClass('is-inactive');
         }).on('mouseenter', function() {
             ashade.cursor.$el.removeClass('is-inactive');
         });
 
         // Bind Interractions
         jQuery(document).on('mouseenter', 'a', function() {
             if (jQuery(this).hasClass('ashade-lightbox-link')) {
                 ashade.cursor.$el.addClass('int-lightbox');
             } else {
                 ashade.cursor.$el.addClass('int-link');
             }
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-link int-lightbox');
             });
         }).on('mouseenter', 'a', function() {
             if (jQuery(this).hasClass('shadowcore-lightbox-link')) {
                 ashade.cursor.$el.addClass('int-lightbox');
             } else {
                 ashade.cursor.$el.addClass('int-link');
             }
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-link int-lightbox');
             });
         }).on('mouseenter', 'button', function() {
             ashade.cursor.$el.addClass('int-link');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-link');
             });
         }).on('mouseenter', 'input[type="submit"]', function() {
             ashade.cursor.$el.addClass('int-link');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-link');
             });
         }).on('mouseenter', '.ashade-back', function() {
             jQuery('.ashade-back').on('mouseenter', function() {
                 ashade.cursor.$el.addClass('int-link');
                 jQuery(this).on('mouseleave', function() {
                     ashade.cursor.$el.removeClass('int-link');
                 });
             });
         }).on('mouseenter', '.is-link', function() {
             jQuery('.is-link').on('mouseenter', function() {
                 ashade.cursor.$el.addClass('int-link');
                 jQuery(this).on('mouseleave', function() {
                     ashade.cursor.$el.removeClass('int-link');
                 });
             });
         }).on('mouseenter', '.ashade-aside-overlay', function() {
             ashade.cursor.$el.addClass('int-close');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-close');
             });
         }).on('mouseenter', '.ashade-categories-overlay', function() {
             ashade.cursor.$el.addClass('int-close');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-close');
             });
         }).on('mouseenter', '.shadowcore-before-after', function() {
             ashade.cursor.$el.addClass('int-grab-h');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-grab-h');
             });
         }).on('mouseenter', '.shadowcore-testimonials-carousel .tns-inner', function() {
             ashade.cursor.$el.addClass('int-grab-h');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-grab-h');
             });
         }).on('mouseenter', '.ashade-albums-slider', function() {
             ashade.cursor.$el.addClass('int-grab-h');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-grab-h');
             });
         }).on('mouseenter', '.pswp__scroll-wrap', function() {
             ashade.cursor.$el.addClass('int-grab-h');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-grab-h');
             });
         }).on('mouseenter', '.price_slider.ui-slider-horizontal', function() {
             ashade.cursor.$el.addClass('int-grab-h');
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-grab-h');
             });
         }).on('mouseenter', '.ashade-albums-carousel', function() {
             if (jQuery(this).hasClass('is-vertical')) {
                 ashade.cursor.$el.addClass('int-grab-v');
             } else {
                 ashade.cursor.$el.addClass('int-grab-h');
             }
             jQuery(this).on('mouseleave', function() {
                 ashade.cursor.$el.removeClass('int-grab-h int-grab-v');
             });
         });
     },
     animate: function() {
         let $this_el = ashade.cursor.$el;
         ashade.cursor.currentX += ((ashade.cursor.targetX - ashade.cursor.currentX) * ashade.cursor.easing);
         ashade.cursor.currentY += ((ashade.cursor.targetY - ashade.cursor.currentY) * ashade.cursor.easing);
         $this_el.css('transform', 'translate3d(' + ashade.cursor.currentX + 'px, ' + ashade.cursor.currentY + 'px, 0)');
         requestAnimationFrame(ashade.cursor.animate);
     }
 };
 ashade.cursor.init();
 
 // Lightbox
 if (jQuery('.ashade-lightbox-link').length || jQuery('.shadowcore-lightbox-link').length) {
     ashade.pswp = {
         gallery: Array(),
         html: jQuery('\
     <!-- Root element of PhotoSwipe. Must have class pswp. -->\
     <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\
       <div class="pswp__bg"></div><!-- PSWP Background -->\
       \
       <div class="pswp__scroll-wrap">\
         <div class="pswp__container">\
           <div class="pswp__item"></div>\
           <div class="pswp__item"></div>\
           <div class="pswp__item"></div>\
         </div><!-- .pswp__container -->\
         \
         <div class="pswp__ui pswp__ui--hidden">\
           <div class="pswp__top-bar">\
             <!--  Controls are self-explanatory. Order can be changed. -->\
             <div class="pswp__counter"></div>\
             \
             <button class="pswp__button pswp__button--close" title="Close (Esc)">\
               <svg xmlns="http://www.w3.org/2000/svg" width="15.375" height="15.375" viewBox="0 0 15.375 15.375"><path id="close" d="M-6.562-16.687,0-10.078l6.563-6.609,1.125,1.125L1.078-9,7.688-2.437,6.563-1.312,0-7.922-6.562-1.312-7.687-2.437-1.078-9l-6.609-6.562Z" transform="translate(7.688 16.688)" fill="#fff"/></svg>\
             </button>\
             \
             <div class="pswp__preloader">\
               <div class="pswp__preloader__icn">\
                 <div class="pswp__preloader__cut">\
                 <div class="pswp__preloader__donut"></div>\
                 </div><!-- .pswp__preloader__cut -->\
               </div><!-- .pswp__preloader__icn -->\
             </div><!-- .pswp__preloader -->\
           </div><!-- .pswp__top-bar -->\
           \
           <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
             <div class="pswp__share-tooltip"></div>\
           </div><!-- .pswp__share-modal -->\
           \
           <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">\
             <svg xmlns="http://www.w3.org/2000/svg" width="9.844" height="17.625" viewBox="0 0 9.844 17.625"><path id="prev" d="M2.25-17.812l1.125,1.125L-4.359-9,3.375-1.312,2.25-.187-6-8.437-6.469-9-6-9.562Z" transform="translate(6.469 17.813)" fill="#fff"/></svg>\
           </button>\
           <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">\
             <svg xmlns="http://www.w3.org/2000/svg" width="9.844" height="17.625" viewBox="0 0 9.844 17.625"><path id="next" d="M-2.25-17.812,6-9.562,6.469-9,6-8.437-2.25-.187-3.375-1.312,4.359-9l-7.734-7.687Z" transform="translate(3.375 17.813)" fill="#fff"/></svg>\
           </button>\
           \
           <div class="pswp__caption">\
             <div class="pswp__caption__center"></div>\
           </div><!-- .pswp__caption -->\
         </div><!-- .pswp__ui pswp__ui--hidden -->\
       </div><!-- .pswp__scroll-wrap -->\
     </div><!-- .pswp -->').appendTo($ashade_body)
     };
 }
 
 // Coming Soon Count Down
 ashade.count_down = {
     init: function() {
         let $dom = jQuery('#ashade-coming-soon'),
             datetime = new Date($dom.find('time').text() + 'T00:00:00'),
             is_this;
 
         $dom.find('time').remove();
         this.labels = $dom.data('labels');
         this.days = jQuery('<h2>0</h2>')
             .appendTo($dom).wrap('<div/>')
             .after('<span>' + ashade.count_down.labels[0] + '</span>');
         this.hours = jQuery('<h2>0</h2>')
             .appendTo($dom).wrap('<div/>')
             .after('<span>' + ashade.count_down.labels[1] + '</span>');
         this.minutes = jQuery('<h2>0</h2>')
             .appendTo($dom).wrap('<div/>')
             .after('<span>' + ashade.count_down.labels[2] + '</span>');
         this.seconds = jQuery('<h2>0</h2>')
             .appendTo($dom).wrap('<div/>')
             .after('<span>' + ashade.count_down.labels[3] + '</span>');
 
         this.update(datetime);
 
         if (this.interval) {
             clearInterval(this.interval);
         }
 
         this.interval = setInterval(function() {
             ashade.count_down.update(datetime);
         }, 1000);
     },
     update: function(endDate) {
         let now = new Date();
         let difference = endDate.getTime() - now.getTime();
 
         if (difference <= 0) {
             clearInterval(this.interval);
         } else {
             let seconds = Math.floor(difference / 1000);
             let minutes = Math.floor(seconds / 60);
             let hours = Math.floor(minutes / 60);
             let days = Math.floor(hours / 24);
 
             hours %= 24;
             minutes %= 60;
             seconds %= 60;
 
             if (days < 10) {
                 days = ("0" + days).slice(-2);
             }
 
             this.days.text(days);
             this.hours.text(("0" + hours).slice(-2));
             this.minutes.text(("0" + minutes).slice(-2));
             this.seconds.text(("0" + seconds).slice(-2));
         }
     }
 };
 
 // Ashade Lazy Loading
 class Ashade_Lazy {
     constructor(this_class) {
         let classVar = this;
 
         const images = document.querySelectorAll(this_class);
 
         const options = {};
 
         if ('IntersectionObserver' in window) {
             classVar.imgObserver = new IntersectionObserver((entries) => {
                 entries.forEach((entry) => {
                     if (!entry.isIntersecting) {
                         return;
                     } else {
                         classVar.preloadImage(entry.target);
                         classVar.imgObserver.unobserve(entry.target);
                     }
                 });
             }, options);
 
             images.forEach(image => {
                 classVar.imgObserver.observe(image);
             });
         } else {
             if ($ashade_body.hasClass('ashade-albums-template--ribbon')) {
                 if (jQuery(this_class + ':not(.is-loaded)').length) {
                     jQuery(this_class + ':not(.is-loaded)').each(function() {
                         classVar.preloadImage(this);
                     });
                 }
             } else {
                 if (jQuery(this_class + ':not(.is-loaded)').length) {
                     jQuery(this_class + ':not(.is-loaded)').each(function() {
                         if (classVar.inView(this)) {
                             classVar.preloadImage(this);
                         }
                     });
                 }
                 $ashade_window.on('scroll', function() {
                     if (jQuery(this_class + ':not(.is-loaded)').length) {
                         jQuery(this_class + ':not(.is-loaded)').each(function() {
                             if (classVar.inView(this)) {
                                 classVar.preloadImage(this);
                             }
                         });
                     }
                 });
             }
         }
     }
 
     inView(this_el) {
         // Check if Element is in View
         var rect = this_el.getBoundingClientRect()
         return (
             (rect.height > 0 || rect.width > 0) &&
             rect.bottom >= 0 &&
             rect.right >= 0 &&
             rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
             rect.left <= (window.innerWidth || document.documentElement.clientWidth)
         )
     }
 
     preloadImage(this_img) {
         const src = this_img.getAttribute('data-src');
         if (!src) {
             console.log('Can not load image. No image src defined.');
             return
         }
         this_img.src = src;
         this_img.addEventListener("load", function(e) {
             e.target.classList.add('is-loaded');
             if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                 if (jQuery(this_img).parents('div').hasClass('ashade-justified-gallery')) {
                     setTimeout(function() {
                         jQuery(this_img).parent('a').addClass('is-ready');
                     }, 100, this_img);
                     setTimeout(function() {
                         jQuery(this_img).parents('.ashade-justified-gallery').justifiedGallery();
                     }, 500, this_img);
                 }
             }
         });
     }
 }
 // Support for Old Safari Browser
 if ('IntersectionObserver' in window) {} else {
     var ashade_lazy_old = {
         inView: function(this_el) {
             // Check if Element is in View
             var rect = this_el.getBoundingClientRect()
             return (
                 (rect.height > 0 || rect.width > 0) &&
                 rect.bottom >= 0 &&
                 rect.right >= 0 &&
                 rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                 rect.left <= (window.innerWidth || document.documentElement.clientWidth)
             )
         },
         preloadImage: function(this_img) {
             const src = this_img.getAttribute('data-src');
             if (!src) {
                 console.log('Can not load image. No image src defined.');
                 return
             }
             this_img.src = src;
             this_img.addEventListener("load", function(e) {
                 e.target.classList.add('is-loaded');
             });
         }
     }
 }
 
 // Ashade Kenburns
 if (jQuery('.ashade-kenburns-slider').length) {
     ashade.kenburns = {
         init: function() {
             // Set Variables
             let this_f = this;
             this_f.$el = jQuery('.ashade-kenburns-slider');
             this_f.items = this_f.$el.find('.ashade-kenburns-slide').length;
             this_f.transition = parseInt(this_f.$el.data('transition'), 10);
             this_f.delay = parseInt(this_f.$el.data('delay'), 10) / 1000 + this_f.transition * 0.001;
             this_f.zoom = this_f.$el.data('zoom');
             this_f.from = this_f.zoom;
             this_f.to = 1;
             this_f.active = 0;
 
             // Setup Items
             let prev_offset_x = 0,
                 prev_offset_y = 0;
 
             this_f.$el.find('.ashade-kenburns-slide').each(function() {
                 let offset_x = Math.random() * 100,
                     offset_y = Math.random() * 100;
 
                 if (prev_offset_x > 50 && offset_x > 50) {
                     offset_x = offset_x - 50;
                 } else if (prev_offset_x < 50 && offset_x < 50) {
                     offset_x = offset_x + 50;
                 }
                 if (prev_offset_y > 50 && offset_y > 50) {
                     offset_y = offset_y - 50;
                 } else if (prev_offset_y < 50 && offset_y < 50) {
                     offset_y = offset_y + 50;
                 }
 
                 prev_offset_x = offset_x;
                 prev_offset_y = offset_y;
 
                 jQuery(this).css({
                     'transition': 'opacity ' + this_f.transition + 'ms',
                     'transform-origin': offset_x + '% ' + offset_y + '%',
                     'background-image': 'url(' + jQuery(this).data('src') + ')'
                 });
             });
 
             // Run Slider
             ashade.kenburns.change();
         },
         change: function() {
             let this_f = this,
                 scale_from = this_f.from,
                 scale_to = this_f.to;
 
             // Loop
             if (this_f.active >= this_f.items) {
                 this_f.active = 0;
             }
             let current_slide = this_f.$el.find('.ashade-kenburns-slide').eq(this_f.active);
 
             gsap.fromTo(current_slide, {
                 scale: scale_from,
                 onStart: function() {
                     current_slide.addClass('is-active');
                 }
             }, {
                 scale: scale_to,
                 duration: this_f.delay,
                 ease: 'none',
                 onComplete: function() {
                     ashade.kenburns.active++;
                     ashade.kenburns.from = scale_to;
                     ashade.kenburns.to = scale_from;
                     ashade.kenburns.change();
                     ashade.kenburns.$el.find('.is-active').removeClass('is-active');
                 }
             });
         }
     };
 }
 
 // Counter
 ashade.counter = function(this_el) {
     jQuery(this_el).prop('Counter', 0).animate({
         Counter: jQuery(this_el).text()
     }, {
         duration: parseInt(jQuery(this_el).parent().data('delay'), 10),
         easing: 'swing',
         step: function(now) {
             jQuery(this_el).text(Math.ceil(now));
         }
     });
 }
 
 // Smooth Scroll
 ashade.old_scroll_top = 0;
 if ($ashade_body.hasClass('ashade-smooth-scroll')) {
     ashade.sScroll = {
         target: 0,
         current: 0,
         animate: function() {
             ashade.sScroll.current += ((ashade.sScroll.target - ashade.sScroll.current) * ashade.config.smooth_ease);
             $ashade_scroll.css('transform', 'translate3d(0, -' + ashade.sScroll.current + 'px, 0)');
 
             if (ashade.config.header_scroll) {
                 $ashade_header_inner.css('transform', 'translate3d(0, -' + ashade.sScroll.current + 'px, 0)');
             }
             if (jQuery('.wp-block-cover-image.has-parallax').length) {
                 jQuery('.wp-block-cover-image.has-parallax').each(function() {
                     let $this = jQuery(this),
                         this_speed = 50,
                         this_offset_top = $this.offset().top,
                         current_scroll = ($ashade_window.scrollTop() - this_offset_top) / 100,
                         set_top = current_scroll * 100 - current_scroll * this_speed;
                     $this.css('background-position', 'center ' + set_top + 'px');
                 });
             }
             if (jQuery('.wp-block-cover.has-parallax').length) {
                 jQuery('.wp-block-cover.has-parallax').each(function() {
                     let $this = jQuery(this),
                         this_speed = 50,
                         this_offset_top = $this.offset().top,
                         current_scroll = ($ashade_window.scrollTop() - this_offset_top) / 100,
                         set_top = current_scroll * 100 - current_scroll * this_speed;
                     $this.css('background-position', 'center ' + set_top + 'px');
                 });
             }
 
             if (!$ashade_body.hasClass('ashade-home-template')) {
                 if ($ashade_body.hasClass('admin-bar')) {
                     if ($ashade_scroll.height() !== ($ashade_body.height() + jQuery('#wpadminbar').height())) {
                         ashade.sScroll.layout();
                     }
                 } else {
                     if ($ashade_scroll.height() !== $ashade_body.height()) {
                         ashade.sScroll.layout();
                     }
                 }
             }
 
             requestAnimationFrame(ashade.sScroll.animate);
         },
         /* ashade.layout() */
         layout: function() {
             // Old Safari Browsers support
             if ('IntersectionObserver' in window) {} else {
                 if (!$ashade_body.hasClass('ashade-albums-template--ribbon')) {
                     if (jQuery('img.ashade-lazy:not(.is-loaded)').length) {
                         jQuery('img.ashade-lazy:not(.is-loaded)').each(function() {
                             if (ashade_lazy_old.inView(this)) {
                                 ashade_lazy_old.preloadImage(this);
                             }
                         });
                     }
                 }
             }
 
             if ($ashade_scroll.length) {
                 let this_content = $ashade_scroll.children('.ashade-content');
                 this_content.css('min-height', '0px');
 
                 // Set Body Height (for smooth scroll)
                 if ($ashade_scroll.height() <= $ashade_window.height()) {
                     let min_height = $ashade_window.height() - $ashade_footer.height();
 
                     if (!$ashade_body.hasClass('no-header-padding'))
                         min_height = min_height - $ashade_scroll.children('.ashade-header-holder').height();
 
                     if ($ashade_body.hasClass('ashade-layout--horizontal')) {
                         if (jQuery('.ashade-to-top-wrap.ashade-back-wrap').length) {
                             min_height = min_height - jQuery('.ashade-to-top-wrap.ashade-back-wrap').height();
                         }
                         if (jQuery('.ashade-page-title-wrap').length) {
                             min_height = min_height - jQuery('.ashade-page-title-wrap').height();
                         }
                     }
                     this_content.css('min-height', min_height + 'px');
                     $ashade_scroll.addClass('is-centered');
                 } else {
                     $ashade_scroll.removeClass('is-centered');
                 }
 
                 if ($ashade_body.hasClass('ashade-smooth-scroll')) {
                     $ashade_body.height($ashade_scroll.height() - jQuery('#wpadminbar').height());
                 }
             }
         }
     };
     if ($ashade_scroll.length || $ashade_body.hasClass('ashade-home-template')) {
         ashade.sScroll.animate();
     }
 }
 
 ashade.init = function() {
     // Change all # to void(0)
     jQuery('a[href="#"]').each(function() {
         jQuery(this).attr('href', 'javascript:void(0)');
     });
 
     if (ashade.config.referrer !== '' && ashade.config.referrer !== ashade.config.location && window.history.length > 1) {
         $ashade_body.addClass('has-history');
     } else {
         $ashade_body.addClass('no-history');
     }
 
     $ashade_body.addClass('is-init');
 
     // Header Fade Point
     ashade.config.fade_point = parseInt($ashade_header.data('fade-point'), 10);
     if (!ashade.config.fade_point) ashade.config.fade_point = 0;
 
     if ($ashade_window.scrollTop() > ashade.config.fade_point) {
         $ashade_header.addClass('is-faded');
     } else {
         $ashade_header.removeClass('is-faded');
     }
 
     // Init Coming Soon Counter
     if (jQuery('#ashade-coming-soon').length) {
         ashade.count_down.init();
     }
 
     // Right Click Protection
     if ($ashade_body.hasClass('ashade-rcp')) {
         jQuery(document).on('contextmenu', function(e) {
             e.preventDefault();
             if (jQuery('.ashade-rcp-message-wrap').length) {
                 alert(jQuery('.ashade-rcp-message-wrap').text());
             }
         });
     }
     // Image Drag Protection
     if ($ashade_body.hasClass('ashade-idp')) {
         jQuery('a').on('mousedown', function(e) {
             e.preventDefault();
         });
         jQuery('.ashade-content img').on('mousedown', function(e) {
             e.preventDefault();
         });
     }
 
     // Page Background
     if (jQuery('.ashade-page-background[data-src]').length) {
         jQuery('.ashade-page-background[data-src]').each(function() {
             jQuery(this).css('background-image', 'url(' + jQuery(this).data('src') + ')');
             if (jQuery(this).attr('data-opacity'))
                 jQuery(this).css('opacity', jQuery(this).data('opacity'));
         });
     }
 
     // Admin Bar Fixes
     if ($ashade_body.hasClass('admin-bar')) {
         $ashade_html.addClass('has-admin-bar');
     } else {
         $ashade_html.addClass('no-admin-bar');
     }
     ashade.old_scroll_top = $ashade_window.scrollTop();
 
     // 404 Page
     if (jQuery('.ashade-404-background').length) {
         $ashade_body.addClass('is-404-page');
     }
 
     // Password Protected
     if (jQuery('.ashade-protected-form-wrap').length) {
         let $protected_wrap = jQuery('.ashade-protected-form-wrap'),
             $protected_form = jQuery('.ashade-protected-form-wrap > form'),
             $protected_form_inner = jQuery('<div class="ashade-protected-form-inner">').appendTo($protected_form),
             $password_input = $protected_form.find('label > input')
             .appendTo($protected_form_inner)
             .wrap('<div class="ashade-protected-input-wrap"/>')
             .attr('placeholder', $protected_wrap.data('placeholder')),
             $input_wrap = $protected_form.find('.ashade-protected-input-wrap'),
             $password_submit = $protected_form.find('input[type="submit"]')
             .appendTo($protected_form_inner)
             .wrap('<div class="ashade-protected-submit-wrap"/>'),
             $password_toggler = jQuery('\
       <a href="javascript:void(0)" class="ashade-password-view">\
         <svg xmlns="http://www.w3.org/2000/svg" width="23.063" height="20.625" viewBox="0 0 23.063 20.625" class="ashade-password-view__hide">\
           <path id="icon-eye-close" d="M-9.187-19.312l5.063,5.063A12.269,12.269,0,0,1,0-15a11.773,11.773,0,0,1,3.563.563,14.278,14.278,0,0,1,3,1.289,19.761,19.761,0,0,1,2.344,1.641,17.981,17.981,0,0,1,1.523,1.336q.4.422.633.7l.469.516-.469.516A22.142,22.142,0,0,1,5.531-4.547L10.313.188,9.188,1.313,4.078-3.844,2.719-5.25.375-7.547-2.2-10.125l-2.3-2.344-1.125-1.125-4.687-4.594ZM0-13.5a10.181,10.181,0,0,0-2.953.469l1.547,1.547A2.235,2.235,0,0,1,0-12a2.17,2.17,0,0,1,1.594.656A2.17,2.17,0,0,1,2.25-9.75a2.235,2.235,0,0,1-.516,1.406L3.844-6.187A5.14,5.14,0,0,0,5.25-9.75a5.011,5.011,0,0,0-.8-2.719A10.624,10.624,0,0,0,0-13.5Zm-7.031.656,1.922,1.922A5.21,5.21,0,0,0-5.25-9.75,5.033,5.033,0,0,0-3.914-6.258,5.179,5.179,0,0,0-.562-4.547l.047.047H.516l.094-.047q.328-.047.609-.094L2.484-3.375A7.7,7.7,0,0,1,.7-3.047H.656Q.094-3,0-3t-.656-.047H-.7a10.683,10.683,0,0,1-3.07-.7A17.743,17.743,0,0,1-6.539-5.039,22.492,22.492,0,0,1-8.812-6.586q-1.125-.867-1.547-1.242t-.7-.609l-.469-.516.469-.516A16.965,16.965,0,0,1-7.031-12.844Zm.469,1.5a16.522,16.522,0,0,0-2.906,2.3A22.631,22.631,0,0,0-5.859-6.422,6.559,6.559,0,0,1-6.75-9.75,7.359,7.359,0,0,1-6.562-11.344Zm13.125,0A7.359,7.359,0,0,1,6.75-9.75a6.559,6.559,0,0,1-.891,3.328A22.5,22.5,0,0,0,9.422-9,15.178,15.178,0,0,0,6.563-11.344ZM0-10.5a.755.755,0,0,0-.328.094l.984.984A.755.755,0,0,0,.75-9.75a.73.73,0,0,0-.211-.539A.73.73,0,0,0,0-10.5Z" transform="translate(11.531 19)" fill="gray"/>\
         </svg>\
         <svg xmlns="http://www.w3.org/2000/svg" width="23.063" height="12" viewBox="0 0 23.063 12"  class="ashade-password-view__show">\
           <path id="icon-eye-open" d="M-3.539-14.414A11.421,11.421,0,0,1,0-15a11.629,11.629,0,0,1,3.516.563,13.481,13.481,0,0,1,3.094,1.383q1.313.82,2.344,1.617a17.189,17.189,0,0,1,1.594,1.359l.516.609L11.531-9l-.469.469a7.144,7.144,0,0,1-.516.563q-.328.328-1.406,1.219a20.627,20.627,0,0,1-2.2,1.594A16.089,16.089,0,0,1,4.148-3.82a12.208,12.208,0,0,1-3.3.773A6.853,6.853,0,0,1,0-3a6.853,6.853,0,0,1-.844-.047A12.45,12.45,0,0,1-4.125-3.8,14.53,14.53,0,0,1-6.961-5.18q-1.2-.773-2.156-1.523a16.651,16.651,0,0,1-1.477-1.266l-.469-.562L-11.531-9l.469-.469a7.961,7.961,0,0,1,.563-.609q.375-.375,1.523-1.336A17.465,17.465,0,0,1-6.586-13.1,15.616,15.616,0,0,1-3.539-14.414ZM0-13.5a10.849,10.849,0,0,0-4.547,1.078H-4.5A5,5,0,0,0-5.25-9.75,5.118,5.118,0,0,0-3.914-6.234,5.137,5.137,0,0,0-.562-4.5H.563A5.137,5.137,0,0,0,3.914-6.234,5.118,5.118,0,0,0,5.25-9.75a5.242,5.242,0,0,0-.75-2.719A10.937,10.937,0,0,0,0-13.5Zm-1.594,2.156A2.17,2.17,0,0,1,0-12a2.17,2.17,0,0,1,1.594.656A2.17,2.17,0,0,1,2.25-9.75a2.17,2.17,0,0,1-.656,1.594A2.17,2.17,0,0,1,0-7.5a2.17,2.17,0,0,1-1.594-.656A2.17,2.17,0,0,1-2.25-9.75,2.17,2.17,0,0,1-1.594-11.344Zm-4.969.047A18.386,18.386,0,0,0-9.375-9,17.308,17.308,0,0,0-5.719-6.187,6.418,6.418,0,0,1-6.75-9.75,6.745,6.745,0,0,1-6.562-11.3Zm13.125,0A6.745,6.745,0,0,1,6.75-9.75,6.418,6.418,0,0,1,5.719-6.187,17.309,17.309,0,0,0,9.375-9,18.386,18.386,0,0,0,6.563-11.3Z" transform="translate(11.531 15)" fill="gray"/>\
         </svg>\
       </a>').appendTo($input_wrap);
 
         $protected_form.find('p').remove();
         $password_submit.val($protected_wrap.data('submit'));
         $password_toggler.on('click', function(e) {
             e.preventDefault();
             if ($password_input.attr('type') == 'password') {
                 $password_input.attr('type', 'text');
                 $protected_wrap.addClass('is-view-password');
             } else {
                 $password_input.attr('type', 'password');
                 $protected_wrap.removeClass('is-view-password');
             }
         })
     }
 
     // More Categories
     if (jQuery('.ashade-category-more').length) {
         jQuery('.ashade-category-more').on('click', function(e) {
             e.preventDefault();
             $ashade_body.addClass('is-faded shown-more-categories');
         });
         jQuery('.ashade-categories-overlay').on('click', function(e) {
             $ashade_body.removeClass('is-faded shown-more-categories');
         });
         jQuery('.ashade-more-categories-close').on('click', function(e) {
             $ashade_body.removeClass('is-faded shown-more-categories');
         });
     }
 
     // Header Holder
     $ashade_header_holder = jQuery('<div class="ashade-header-holder"></div>');
     $ashade_header_holder.height($ashade_header.height()).prependTo($ashade_scroll);
 
     // Set Logo Size
     if (jQuery('a.ashade-logo').length) {
         jQuery('a.ashade-logo').each(function() {
             let $this = jQuery(this),
                 $img = $this.children('img'),
                 w = $img.attr('width'),
                 h = $img.attr('height');
             if ($this.hasClass('is-retina')) {
                 $this.width(w / 2).height(h / 2);
             } else {
                 $this.width(w).height(h);
             }
         });
     }
 
     // Set Menu Active Parent Items
     if (jQuery('.current-menu-item').length) {
         jQuery('.current-menu-item').each(function() {
             jQuery(this).parents('li').addClass('current-menu-ancestor');
         });
     }
 
     // Mobile Menu DOM Construct
     if (jQuery('.ashade-page-title-wrap').length) {
         if (jQuery('.ashade-content-wrap .ashade-content').length) {
             let ashade_mobile_title = jQuery('<div class="ashade-mobile-title-wrap">' + jQuery('.ashade-page-title-wrap').html() + '</div>');
             jQuery('.ashade-content-wrap .ashade-content').prepend(ashade_mobile_title);
         }
     }
     let ashade_mobile_header = jQuery('<div class="ashade-mobile-header">'),
         mobile_menu_button = jQuery('<a href="javascript:void(0)" class="ashade-mobile-menu-button"><i class="la la-bars"></i></a>').appendTo(ashade_mobile_header),
         mobile_menu = jQuery('<nav class="ashade-mobile-menu"></nav>').appendTo($ashade_body),
         mobile_menu_close = jQuery('<a href="javascript:void(0)" class="ashade-mobile-menu-close"><svg xmlns="http://www.w3.org/2000/svg" width="15.375" height="15.375" viewBox="0 0 15.375 15.375"><path id="close" d="M-6.562-16.687,0-10.078l6.563-6.609,1.125,1.125L1.078-9,7.688-2.437,6.563-1.312,0-7.922-6.562-1.312-7.687-2.437-1.078-9l-6.609-6.562Z" transform="translate(7.688 16.688)" fill="#fff"/></svg></a>').appendTo(mobile_menu);
 
     if (jQuery('.ashade-aside-overlay').length) {
         ashade_mobile_header.append('\
       <a class="ashade-aside-toggler" href="javascript:void(0)">\
         <span class="ashade-aside-toggler__icon01"></span>\
         <span class="ashade-aside-toggler__icon02"></span>\
         <span class="ashade-aside-toggler__icon03"></span>\
       </a>');
     }
 
     if ($ashade_header.find('.ashade-wc-header-cart').length) {
         ashade_mobile_header.prepend($ashade_header.find('.ashade-wc-header-cart').clone());
     }
 
     if ($ashade_body.hasClass('ashade-albums-back')) {
         let $ashade_mobile_back = jQuery('\
       <a href="javascript:void(0)" class="ashade-mobile-back">\
         <svg xmlns="http://www.w3.org/2000/svg" width="9.844" height="17.625" viewBox="0 0 9.844 17.625">\
           <path d="M2.25-17.812l1.125,1.125L-4.359-9,3.375-1.312,2.25-.187-6-8.437-6.469-9-6-9.562Z" transform="translate(6.469 17.813)" fill="#ffffff"/>\
         </svg>\
       </a>');
         $ashade_mobile_back.on('click', function(e) {
             e.preventDefault();
             ashade.change_location('history.back');
         });
         ashade_mobile_header.prepend($ashade_mobile_back);
     }
 
     $ashade_header.find('.ashade-nav-block').append(ashade_mobile_header);
 
     if ($ashade_header.find('.ashade-nav').length) {
         mobile_menu.append('\
       <div class="ashade-mobile-menu-inner">\
         <div class="ashade-mobile-menu-content">\
           ' + $ashade_header.find('.ashade-nav').html() + '\
         </div>\
       </div>\
     ');
         mobile_menu.find('ul.main-menu a').on('click', function(e) {
             var $this = jQuery(this),
                 $parent = $this.parent();
             if ($parent.hasClass('menu-item-has-children') || $parent.find('ul').length) {
                 e.preventDefault();
                 $parent.children('ul').slideToggle(300).toggleClass('is-open');
             }
         });
         mobile_menu.find('ul.sub-menu').slideUp(1);
     }
 
     mobile_menu_button.on('click', function() {
         $ashade_body.addClass('ashade-mobile-menu-shown').addClass('is-locked');
         ashade.old_scroll_top = $ashade_window.scrollTop();
         gsap.fromTo('.ashade-mobile-menu ul.main-menu > li', {
             x: 0,
             y: 40,
             opacity: 0,
         }, {
             x: 0,
             y: 0,
             opacity: 1,
             duration: 0.2,
             delay: 0.3,
             stagger: 0.1,
             onComplete: function() {
                 $ashade_body.removeClass('is-locked');
             }
         }, );
     });
 
     mobile_menu_close.on('click', function() {
         let setDelay = 0;
         $ashade_body.addClass('is-locked');
         if (mobile_menu.find('.is-open').length) {
             mobile_menu.find('ul.sub-menu').slideUp(300);
             setDelay = 0.3;
         }
         gsap.fromTo('.ashade-mobile-menu ul.main-menu > li', {
             x: 0,
             y: 0,
             opacity: 1
         }, {
             x: 0,
             y: -40,
             opacity: 0,
             duration: 0.2,
             delay: setDelay,
             stagger: 0.1,
             onComplete: function() {
                 $ashade_body.removeClass('ashade-mobile-menu-shown').removeClass('is-locked');
             }
         }, );
     });
 
     jQuery('.ashade-menu-overlay').on('click', function() {
         $ashade_body.removeClass('ashade-mobile-menu-shown').removeClass('is-locked');
     });
 
     // Mobile Meintenance Email
     if ($ashade_body.hasClass('ashade-maintenance-wrap')) {
         ashade_mobile_header.prepend('<a class="ashade-contacts-toggler" href="javascript:void(0)"><i class="la la-envelope"></i></a>');
         jQuery(document).on('click', '.ashade-contacts-toggler', function() {
             $ashade_body.addClass('contacts-shown');
         });
         jQuery(document).on('click', '.ashade-contacts-close', function() {
             $ashade_body.removeClass('contacts-shown');
         });
     }
 
     // Aside Open and Close
     jQuery(document).on('click', 'a.ashade-aside-toggler', function(e) {
         e.preventDefault();
         $ashade_body.addClass('ashade-aside-shown').removeClass('ashade-menu-fade');
         ashade.old_scroll_top = $ashade_window.scrollTop();
     });
     jQuery('a.ashade-aside-close').on('click', function(e) {
         e.preventDefault();
         $ashade_body.removeClass('ashade-aside-shown');
     });
     jQuery('.ashade-aside-overlay').on('click', function() {
         $ashade_body.removeClass('ashade-aside-shown');
     });
 
     // Main Nav Events
     jQuery('nav.ashade-nav a').on('mouseenter', function() {
         $ashade_body.addClass('ashade-menu-fade');
     });
     jQuery('nav.ashade-nav').on('mouseleave', function() {
         $ashade_body.removeClass('ashade-menu-fade');
     });
 
     // Back Button Functions 
     jQuery('.ashade-back').on('click', function(e) {
         e.preventDefault();
         var $this = jQuery(this);
 
         // Albums Back
         if ($this.hasClass('albums-go-back')) {
             ashade.change_location('history.back');
         }
 
         // Back to Top
         if ($this.hasClass('is-to-top')) {
             if (!$ashade_body.hasClass('ashade-layout--horizontal')) {
                 if ($ashade_window.scrollTop() > $ashade_window.height() / 2) {
                     $ashade_body.addClass('has-to-top');
                 }
             }
             $this.addClass('in-action');
 
             if (jQuery('.ashade-albums-carousel').length) {
                 ashade_ribbon.target = 0;
                 ashade_ribbon.currentStep = 0;
                 setTimeout(function() {
                     $ashade_body.removeClass('has-to-top');
                     $this.removeClass('in-action');
                 }, 300, $this);
             } else {
                 jQuery('html, body').stop().animate({
                     scrollTop: 0
                 }, 500, function() {
                     if (!$ashade_body.hasClass('ashade-layout--horizontal')) {
                         $ashade_body.removeClass('has-to-top');
                     }
                     $this.removeClass('in-action');
                 });
             }
         }
 
         // 404 Page
         if ($this.hasClass('is-404-return')) {
             let this_referrer = document.referrer;
             if (this_referrer == '') {
                 this_referrer = $this.data('home');
             }
             ashade.change_location(this_referrer);
         }
         if ($this.hasClass('is-404-home')) {
             ashade.change_location($this.data('href'));
         }
 
         // Maintenace Mode - Write Message
         if ($this.hasClass('is-message')) {
             $ashade_body.addClass('is-locked in-message-mode');
             $this.parent().removeClass('is-loaded');
             gsap.to('.ashade-content-wrap .ashade-content', {
                 opacity: 0,
                 y: -150,
                 duration: 0.7,
                 onComplete: function() {
                     jQuery('.ashade-back-wrap .is-message').hide();
                     jQuery('.ashade-back-wrap .is-message-close').show();
                 }
             });
             gsap.to('.ashade-page-background', {
                 opacity: 0,
                 scale: 1.05,
                 duration: 1,
             });
             gsap.to('#ashade-contacts-wrap', {
                 opacity: 1,
                 y: 0,
                 duration: 0.7,
                 delay: 0.3,
                 onComplete: function() {
                     $ashade_body.removeClass('is-locked');
                     jQuery('.ashade-back-wrap').addClass('is-loaded');
                 }
             });
         }
 
         // Maintenace Mode - Close Message
         if ($this.hasClass('is-message-close')) {
             $ashade_body.addClass('is-locked').removeClass('in-message-mode');
             $this.parent().removeClass('is-loaded');
             gsap.to('#ashade-contacts-wrap', {
                 opacity: 0,
                 y: 150,
                 duration: 0.7,
                 onComplete: function() {
                     jQuery('.ashade-back-wrap .is-message').show();
                     jQuery('.ashade-back-wrap .is-message-close').hide();
                 }
             });
             gsap.to('.ashade-page-background', {
                 opacity: 0.13,
                 scale: 1,
                 duration: 1,
             });
             gsap.to('.ashade-content-wrap .ashade-content', {
                 opacity: 1,
                 y: 0,
                 duration: 1,
                 delay: 0.3,
                 onComplete: function() {
                     $ashade_body.removeClass('is-locked');
                     jQuery('.ashade-back-wrap').addClass('is-loaded');
                 }
             });
         }
     });
 
     // Home Template Core
     if ($ashade_body.hasClass('ashade-home-template')) {
 
         // Functions
         let home_functions = {
             animate: function(event) {
                 let $this = jQuery('a[data-event="' + event + '"]').parent();
 
                 ashade.cursor.$el.removeClass('int-link');
                 $ashade_body.removeClass('is-faded').addClass('ashade-content-shown');
                 jQuery('.ashade-home-link-wrap').addClass('is-inactive');
 
                 gsap.to('.ashade-page-background', {
                     opacity: 0,
                     scale: 1.05,
                     duration: 1,
                     delay: 0.5,
                 });
                 gsap.to('.ashade-home-link--works', 0.5, {
                     css: {
                         top: 0,
                         opacity: 0,
                     },
                     delay: 0.5,
                 });
                 gsap.to('.ashade-home-link--contacts', 0.5, {
                     css: {
                         top: '200%',
                         opacity: 0,
                     },
                     delay: 0.5,
                 });
 
                 jQuery('.ashade-page-title').empty().append('<span>' + $this.find('span:first-child').text() + '</span>' + $this.find('span:last-child').text()).removeClass('is-inactive');
                 jQuery('.ashade-home-return').removeClass('is-inactive');
 
                 gsap.to('.ashade-page-title-wrap', 0.5, {
                     css: {
                         top: '100%',
                         opacity: 1
                     },
                     delay: 1,
                     onComplete: function() {
                         jQuery('.ashade-page-title-wrap').addClass('is-loaded').removeClass('is-inactive');
                     }
                 });
                 gsap.to('.ashade-back-wrap', 0.5, {
                     css: {
                         top: '100%',
                         opacity: 1
                     },
                     delay: 1,
                     onComplete: function() {
                         jQuery('.ashade-back-wrap').addClass('is-loaded').removeClass('is-inactive');
                     }
                 });
 
                 if ($this.parent().hasClass('ashade-home-link--works')) {
                     var $current_content = jQuery('#ashade-home-works');
                 }
                 if ($this.parent().hasClass('ashade-home-link--contacts')) {
                     var $current_content = jQuery('#ashade-home-contacts');
                 }
 
                 $current_content
                     .wrap('<main class="ashade-content-wrap"/>')
                     .wrap('<div class="ashade-content-scroll"/>')
                     .wrap('<div class="ashade-content"/>')
                     .wrap('<section class="ashade-section"/>');
 
                 if ($ashade_body.hasClass('ashade-smooth-scroll')) {
                     $ashade_scroll = $ashade_body.find('.ashade-content-scroll');
                     $ashade_body.height($ashade_scroll.height());
                 }
                 ashade.layout();
 
                 if (jQuery('.ashade-grid.has-filter:not(.is-masonry)').length) {
                     jQuery('.ashade-grid.has-filter:not(.is-masonry)').each(function() {
                         ashade_f_grid[jQuery(this).attr('id')].layout();
                     });
                 }
 
                 gsap.fromTo('.ashade-content', 1, {
                     y: 100,
                     opacity: 0,
                 }, {
                     y: 0,
                     opacity: 1,
                     duration: 1,
                     delay: 1.2,
                 });
             },
             back: function() {
                 $ashade_body.addClass('is-locked');
                 gsap.fromTo('.ashade-content', 1, {
                     y: 0,
                     opacity: 1,
                 }, {
                     y: -100,
                     opacity: 0,
                     duration: 1,
                     onComplete: function() {
                         if ($ashade_body.find('.ashade-content-scroll').length) {
                             var $scroll_content = $ashade_body.find('.ashade-content-scroll');
                             if ($scroll_content.find('#ashade-home-works').length) {
                                 var $current_content = jQuery('#ashade-home-works');
                             }
                             if ($scroll_content.find('#ashade-home-contacts').length) {
                                 var $current_content = jQuery('#ashade-home-contacts');
                             }
                             for (var i = 0; i < 4; i++) {
                                 $current_content.unwrap();
                             }
                             if ($ashade_body.hasClass('ashade-smooth-scroll')) {
                                 ashade.sScroll.layout();
                                 $ashade_body.height($ashade_window.height());
                             }
                         }
                     }
                 });
 
                 if (jQuery('.ashade-page-title-wrap').length) {
                     jQuery('.ashade-page-title-wrap').removeClass('is-loaded').addClass('is-inactive');
                     gsap.to('.ashade-page-title-wrap', 0.5, {
                         css: {
                             top: 0,
                             opacity: 0
                         },
                         delay: 0.5,
                     });
                 }
                 if (jQuery('.ashade-back-wrap').length) {
                     jQuery('.ashade-back-wrap').removeClass('is-loaded').addClass('is-inactive');
                     gsap.to('.ashade-back-wrap', 0.5, {
                         css: {
                             top: '200%',
                             opacity: 0
                         },
                         delay: 0.5,
                     });
                 }
                 gsap.to('.ashade-home-link--works', 0.5, {
                     css: {
                         top: '100%',
                         opacity: 1
                     },
                     delay: 1,
                     onComplete: function() {
                         jQuery('.ashade-home-link--works').addClass('is-loaded').removeClass('is-inactive');
                     }
                 });
                 gsap.to('.ashade-home-link--contacts', 0.5, {
                     css: {
                         top: '100%',
                         opacity: 1
                     },
                     delay: 1,
                     onComplete: function() {
                         jQuery('.ashade-home-link--contacts').addClass('is-loaded').removeClass('is-inactive');
                     }
                 });
                 gsap.to('.ashade-page-background', {
                     opacity: jQuery('.ashade-page-background').attr('data-opacity'),
                     scale: 1,
                     duration: 1,
                     delay: 1,
                     onComplete: function() {
                         $ashade_body.removeClass('ashade-content-shown');
                         $ashade_body.removeClass('is-locked');
                     }
                 });
             },
             load: function(event) {
                 let $this = jQuery('a[data-event="' + event + '"]').parent(),
                     nowDelay = 0.5;
 
                 $ashade_body.removeClass('is-faded').addClass('ashade-content-shown');
                 jQuery('.ashade-home-link-wrap').addClass('is-inactive');
 
                 jQuery('.ashade-page-background').css({
                     'transform': 'scale(1.05)',
                     'opacity': '0'
                 });
                 gsap.to('.ashade-home-link--works', 0.5, {
                     css: {
                         top: 0,
                         opacity: 0
                     },
                     delay: nowDelay,
                 });
                 gsap.to('.ashade-home-link--contacts', 0.5, {
                     css: {
                         top: '200%',
                         opacity: 0
                     },
                     delay: nowDelay,
                 });
 
                 jQuery('.ashade-page-title').empty().append('<span>' + $this.find('span:first-child').text() + '</span>' + $this.find('span:last-child').text()).removeClass('is-inactive');
                 jQuery('.ashade-home-return').removeClass('is-inactive');
 
                 gsap.to('.ashade-page-title-wrap', 0.5, {
                     css: {
                         top: '100%',
                         opacity: 1
                     },
                     delay: 1,
                     onComplete: function() {
                         jQuery('.ashade-page-title-wrap').addClass('is-loaded').removeClass('is-inactive');
                     }
                 });
                 gsap.to('.ashade-back-wrap', 0.5, {
                     css: {
                         top: '100%',
                         opacity: 1
                     },
                     delay: 1,
                     onComplete: function() {
                         jQuery('.ashade-back-wrap').addClass('is-loaded').removeClass('is-inactive');
                     }
                 });
 
                 if ($this.parent().hasClass('ashade-home-link--works')) {
                     var $current_content = jQuery('#ashade-home-works');
                 }
                 if ($this.parent().hasClass('ashade-home-link--contacts')) {
                     var $current_content = jQuery('#ashade-home-contacts');
                 }
 
                 $current_content
                     .wrap('<main class="ashade-content-wrap"/>')
                     .wrap('<div class="ashade-content-scroll"/>')
                     .wrap('<div class="ashade-content"/>')
                     .wrap('<section class="ashade-section"/>');
 
                 if ($ashade_body.hasClass('ashade-smooth-scroll')) {
                     $ashade_scroll = $ashade_body.find('.ashade-content-scroll');
                     $ashade_body.height($ashade_scroll.height());
                 }
                 ashade.layout();
 
                 if (jQuery('.ashade-grid.has-filter:not(.is-masonry)').length) {
                     jQuery('.ashade-grid.has-filter:not(.is-masonry)').each(function() {
                         ashade_f_grid[jQuery(this).attr('id')].layout();
                     });
                 }
 
                 gsap.fromTo('.ashade-content', 1, {
                     y: 100,
                     opacity: 0,
                 }, {
                     y: 0,
                     opacity: 1,
                     duration: 1,
                     delay: 1.2,
                 });
             },
 
         }
 
         if (window.location.href.indexOf('?event=') > -1 || window.location.href.indexOf('&event=') > -1) {
             let event = ashade_landing.get_event();
             let state_obj = {
                 'page': event
             };
             history.replaceState(state_obj, '', window.location.href);
             home_functions.load(event);
         }
 
         // Open needed state
         window.onpopstate = function(e) {
             let state = e.state;
             if (state == null) {
                 home_functions.back();
             } else {
                 if ('back' == state.page) {
                     home_functions.back();
                 } else {
                     home_functions.animate(state.page);
                 }
             }
         };
 
         // Link Clicked
         jQuery('.ashade-home-link--a').on('click', function(e) {
             e.preventDefault();
             let event = jQuery(this).data('event'),
                 state_obj = {
                     'page': event
                 };
             if ('back' == event) {
                 history.pushState(state_obj, '', ashade_landing.get_location());
                 home_functions.back();
             } else {
                 history.pushState(state_obj, '', ashade_landing.get_event_url(event));
                 home_functions.animate(event);
             }
         });
     }
 
     // All Links Events
    //  jQuery('a').on('click', function(e) {
    //      var $this = jQuery(this),
    //          this_href = $this.attr('href');
 
    //      if (this_href.indexOf('javascript') !== 0) {
    //          if (this_href.indexOf('#') == 0) {
    //              window.location.hash = this_href;
    //          } else {
    //              if (!$ashade_body.hasClass('ashade-unloading--none')) {
    //                  if ($this.attr('target') && '_blank' == $this.attr('target')) {
    //                      // Nothing to do here. Open link in new tab.
    //                  } else if (this_href.indexOf('elementor-action') > -1) {
    //                      // Nothing to do here. Download Link.
    //                  } else if ($this.is('[download]')) {
    //                      // Nothing to do here. Download Link.
    //                  } else if (this_href.indexOf('tel:') > -1 || this_href.indexOf('mailto:') > -1) {
    //                      // Nothing to do here. Tel or Email Link
    //                  } else {
    //                      if (!ashade.link_exception($this)) {
    //                          e.preventDefault();
    //                          if (this_href == '#') {
    //                              e.preventDefault();
    //                          } else if ($this.hasClass('ashade-lightbox-link') || $this.hasClass('shadowcore-lightbox-link')) {
    //                              e.preventDefault();
    //                          } else if (this_href.length > 1 && this_href[0] !== '#' && !/\.(jpg|png|gif)$/.test(this_href)) {
    //                              e.preventDefault();
    //                              ashade.change_location(this_href);
    //                          }
    //                      }
    //                  }
    //              }
    //          }
    //      }
    //  });
 
     // Filtering Grid
     if (jQuery('.ashade-grid.has-filter:not(.is-masonry)').length) {
         jQuery('.ashade-grid.has-filter:not(.is-masonry)').each(function() {
             ashade_f_grid[jQuery(this).attr('id')] = new Ashade_Filtered_Grid(this);
         });
     }
 
     // Masonry Items
     if (jQuery('.is-masonry').length) {
         jQuery('.is-masonry').each(function() {
             var $this = jQuery(this);
             $this.cache = [];
             $this.children('div').each(function() {
                 $this.cache.push(this);
             });
             $this.masonry();
 
             // Filter
             if ($this.hasClass('has-filter')) {
                 let $filter = $this.prev('div.ashade-filter-wrap'),
                     $filter_mobile_wrap = jQuery('<div class="ashade-mobile-filter-wrap"/>').appendTo($filter),
                     $filter_mobile = jQuery('<div class="ashade-mobile-filter"/>').appendTo($filter_mobile_wrap),
                     $filter_mobile_list = jQuery('<ul class="ashade-mobile-filter-list"/>').insertAfter($filter_mobile).slideUp(1),
                     $filter_mobile_value = jQuery('<span class="ashade-mobile-filter-value">' + $filter.find('a.is-active').text() + '</span>').appendTo($filter_mobile),
                     filter_action = function(category, label) {
                         // Remove and Set Active Class
                         $filter.find('.is-active').removeClass('is-active');
                         $filter.find('[data-category="' + category + '"]').addClass('is-active');
 
                         // Show and Hide Items
                         if ('*' == category) {
                             $this.empty();
                             jQuery($this.cache).each(function() {
                                 $this.append(jQuery(this));
                                 $this.masonry('appended', jQuery(this));
                             });
                             $this.masonry('reloadItems');
                             $this.masonry('layout');
                         } else {
                             if (!$this.children('div' + category).length) {
                                 jQuery($this.cache).each(function() {
                                     if (jQuery(this).is('div' + category)) {
                                         $this.append(jQuery(this));
                                         $this.masonry('appended', jQuery(this));
                                     }
                                 });
                                 $this.masonry('reloadItems');
                                 $this.masonry('layout')
                             }
                             if ($this.children('div:not(' + category + ')').length) {
                                 $this.children('div:not(' + category + ')').each(function() {
                                     $this.masonry('remove', jQuery(this));
                                 });
                             }
                             $this.masonry('layout')
                         }
 
                         // Update Mobile List
                         $filter_mobile_value.text(label);
                         $filter.removeClass('is-open');
                         $filter_mobile_list.slideUp(300);
 
                         // Relayout Sscroll for Home
                         if ($ashade_body.hasClass('ashade-home-template') && $ashade_body.hasClass('ashade-smooth-scroll')) {
                             ashade.sScroll.layout();
                         }
                     };
 
                 $filter_mobile.prepend('<span class="ashade-mobile-filter-label">' + $filter.data('label') + '</span>');
                 $filter_mobile_wrap.append('\
         <svg xmlns="http://www.w3.org/2000/svg" width="19.875" height="10.969" viewBox="0 0 19.875 10.969">\
             <path id="arrow-down" d="M-8.812-12.937,0-4.078l8.813-8.859,1.125,1.125L.563-2.437,0-1.969l-.562-.469-9.375-9.375Z" transform="translate(9.938 12.938)"/>\
         </svg>');
 
                 // Add list items
                 $filter.children('a').each(function() {
                     let $this_a = jQuery(this),
                         this_li = jQuery('<li data-category="' + $this_a.data('category') + '">' + $this_a.text() + '</li>').appendTo($filter_mobile_list);
 
                     this_li.on('click', function(e) {
                         e.preventDefault();
                         let $this = jQuery(this),
                             category = $this.data('category'),
                             label = $this.text();
 
                         filter_action(category, label);
                     });
                 });
 
                 // Set Current Values
                 $filter.children('a.is-active').each(function() {
                     let category = jQuery(this).data('category'),
                         label = jQuery(this).text();
 
                     $filter_mobile_list.find('[data-category="' + category + '"]').addClass('is-active');
                     $filter_mobile_value.text(label);
                 });
 
                 // Bind Actions
                 $filter_mobile.on('click', function() {
                     jQuery(this).parents('.ashade-filter-wrap').toggleClass('is-open');
                     $filter_mobile_list.slideToggle(300);
                 });
 
                 $filter.on('click', 'a', function(e) {
                     e.preventDefault();
                     let $this_link = jQuery(this),
                         category = $this_link.data('category'),
                         label = $this_link.text();
 
                     filter_action(category, label);
                 });
             }
         });
     }
 
     // Kenburns Sliders
     if (jQuery('.ashade-kenburns-slider').length) {
         ashade.kenburns.init();
     }
 
     // Ashade Images Lazy Loading Init
     if (jQuery('img.ashade-lazy').length) {
         new Ashade_Lazy('img.ashade-lazy');
     }
 
     // Justify Gallery
     if (jQuery('.ashade-justified-gallery').length) {
         jQuery('.ashade-justified-gallery').each(function() {
             if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && jQuery('img.ashade-lazy').length) {
                 var options = {
                     rowHeight: parseInt(jQuery(this).attr('data-row-height'), 10),
                     lastRow: jQuery(this).attr('data-last-row'),
                     margins: parseInt(jQuery(this).attr('data-spacing'), 10),
                     captions: false,
                     selector: 'a.is-ready',
                     waitThumbnailsLoad: true
                 }
             } else {
                 var options = {
                     rowHeight: parseInt(jQuery(this).attr('data-row-height'), 10),
                     lastRow: jQuery(this).attr('data-last-row'),
                     margins: parseInt(jQuery(this).attr('data-spacing'), 10),
                     captions: false,
                     waitThumbnailsLoad: true
                 }
             }
             jQuery(this).justifiedGallery(options);
         });
     }
 
     // Lightbox
     if (jQuery('.ashade-lightbox-link').length) {
         jQuery('.ashade-lightbox-link').each(function() {
             let $this = jQuery(this),
                 this_item = {},
                 this_gallery = 'default';
 
             if ($this.data('size')) {
                 let item_size = $this.attr('data-size').split('x');
                 this_item.w = item_size[0];
                 this_item.h = item_size[1];
             }
             this_item.src = $this.attr('href');
 
             if ($this.data('caption')) {
                 this_item.title = $this.data('caption');
             }
 
             if ($this.data('gallery')) {
                 this_gallery = $this.data('gallery');
             }
 
             if (ashade.pswp.gallery[this_gallery]) {
                 ashade.pswp.gallery[this_gallery].push(this_item);
             } else {
                 ashade.pswp.gallery[this_gallery] = [];
                 ashade.pswp.gallery[this_gallery].push(this_item);
             }
 
             $this.data('count', ashade.pswp.gallery[this_gallery].length - 1);
         });
 
         jQuery(document).on('click', '.ashade-lightbox-link', function(e) {
             e.preventDefault();
 
             let $this = jQuery(this),
                 this_index = parseInt($this.data('count'), 10),
                 this_gallery = 'default',
                 this_options = {
                     index: this_index,
                     bgOpacity: 0.85,
                     showHideOpacity: true,
                     getThumbBoundsFn: function(index) {
                         var thumbnail = $this[0],
                             pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                             rect = thumbnail.getBoundingClientRect();
 
                         return {
                             x: rect.left,
                             y: rect.top + pageYScroll,
                             w: rect.width
                         };
                     },
                 };
 
             if ($this.data('gallery')) {
                 this_gallery = $this.data('gallery');
             }
 
             ashade.pswp.lightbox = new PhotoSwipe($ashade_body.find('.pswp')[0], PhotoSwipeUI_Default, ashade.pswp.gallery[this_gallery], this_options);
             ashade.pswp.lightbox.init();
         });
     }
 
     // Contact Form
     if (jQuery('.wpcf7').length) {
         jQuery('.wpcf7').each(function() {
             let $this = jQuery(this),
                 $form = $this.children('form.wpcf7-form');
 
             $form.on('submit', function() {
                 $form.addClass('in-process');
             });
             this.addEventListener('wpcf7submit', function(event) {
                 $form.removeClass('in-process');
             }, false);
         });
     }
 
     // Spacer
     jQuery('.ashade-spacer').each(function() {
         jQuery(this).height(jQuery(this).data('size'));
     });
 
     // Sticky Post Preview
     if (jQuery('.ashade-post-preview.is-sticky').length) {
         jQuery('.ashade-post-preview.is-sticky').each(function() {
             let $this = jQuery(this);
             $this.wrapInner('<div class="ashade-sticky-post-wrap"/>');
         });
     }
 
     // Search Form
     if (jQuery('.ashade-search-form svg').length) {
         jQuery('.ashade-search-form svg').on('click', function() {
             jQuery(this).parents('form').submit();
         });
     }
 
     // Custom Select
     if ($ashade_body.find('select').length) {
         $ashade_body.find('select').each(function() {
             let $this = jQuery(this),
                 $select = jQuery('<div class="ashade-select is-link"/>'),
                 $list = jQuery('<ul class="ashade-select__list"/>');
 
             $this.wrap('<div class="ashade-select-wrap"/>').after($list).after($select).addClass('is-hidden');
             let $wrap = $this.parent('.ashade-select-wrap');
             $wrap.css('max-width', $this.width() + 'px').append('\
         <svg xmlns="http://www.w3.org/2000/svg" width="19.875" height="10.969" viewBox="0 0 19.875 10.969">\
             <path id="arrow-down" d="M-8.812-12.937,0-4.078l8.813-8.859,1.125,1.125L.563-2.437,0-1.969l-.562-.469-9.375-9.375Z" transform="translate(9.938 12.938)"/>\
         </svg>');
             $list.slideUp(1);
 
             if ('' == $this.val() || !$this.val()) {
                 $select.text($this.children('option:first').text());
             } else {
                 $select.text($this.children('option[value="' + $this.val() + '"]').text());
             }
 
             $this.children('option').each(function() {
                 let $opt = jQuery(this);
                 $list.append('<li class="is-link" data-value="' + $opt.val() + '">' + $opt.text() + '</li>');
             });
 
             $select.on('click', function(e) {
                 e.stopPropagation();
                 let $thisWrap = jQuery(this).parent();
 
                 // Close Other Lists
                 jQuery('div.ashade-select-wrap.is-active').not($thisWrap[0]).each(function() {
                     jQuery(this).removeClass('is-active').children('ul').slideUp(300);
                 });
 
                 // Open Current List
                 $wrap.toggleClass('is-active');
                 $list.slideToggle(300);
             });
 
             $list.children('li').on('click', function(e) {
                 // Close List and Pick Value
                 e.stopPropagation();
                 $select.text(jQuery(this).text());
                 $wrap.removeClass('is-active');
                 $list.slideUp(300);
                 $this.val(jQuery(this).data('value')).trigger('change');
             });
 
             jQuery(document).on('click', function(e) {
                 // Close All Lists
                 jQuery('div.ashade-select-wrap.is-active').each(function() {
                     jQuery(this).removeClass('is-active').children('ul').slideUp(300);
                 });
             });
         });
     }
 
     // Custom Radio
     if ($ashade_body.find('input[type="radio"]').length) {
         $ashade_body.find('input[type="radio"]').each(function() {
             let $this = jQuery(this),
                 check_class = '';
 
             if ($this.is(':checked')) {
                 check_class = 'is-checked';
             }
 
             $this.wrap('<div class="ashade-radio-wrap is-link ' + check_class + '"></div>').on('click', function() {
                 jQuery('[name="' + jQuery(this).attr('name') + '"]').each(function() {
                     var $current = jQuery(this);
                     if ($current.is(':checked')) {
                         $current.parent('div').addClass('is-checked');
                     } else {
                         $current.parent('div').removeClass('is-checked');
                     }
                 });
             });
 
         });
     }
 
     // Custom Checkbox
     if ($ashade_body.find('input[type="checkbox"]').length) {
         $ashade_body.find('input[type="checkbox"]').each(function() {
             let check_class = '';
 
             if (jQuery(this).is(':checked')) {
                 check_class = 'is-checked';
             }
 
             jQuery(this).wrap('<div class="ashade-checkbox-wrap is-link ' + check_class + '"></div>').on('click', function() {
                 var $this = jQuery(this);
                 if ($this.is(":checked")) {
                     $this.parent('div').addClass('is-checked');
                 } else {
                     $this.parent('div').removeClass('is-checked');
                 }
             });
         });
     }
 
     // Back to Top
     if (jQuery('.ashade-back.is-to-top').length && $ashade_body.hasClass('ashade-layout--horizontal')) {
         $ashade_body.addClass('has-to-top');
     }
 
     // Image Slider
     if (jQuery('.ashade-albums-slider').length) {
         ashade_slider.init();
     }
 
     // Image Ribbon
     if (jQuery('.ashade-albums-carousel').length) {
         ashade_ribbon.init();
     }
 
     // Client's Page Buttons
     if (jQuery('.ahshade-client-like').length) {
         jQuery(document).on('click', '.ahshade-client-like', function(e) {
             e.preventDefault();
             let $this = jQuery(this),
                 $parent = jQuery(this).parents('.ashade-client-item'),
                 this_event = '';
 
             $parent.removeClass('is-disliked');
             $parent.removeClass('is-unviewed');
             $parent.addClass('is-busy');
             if ($parent.hasClass('is-liked')) {
                 // Remove Like
                 this_event = 'remove';
             } else {
                 // Add Like
                 this_event = 'like';
             }
 
             jQuery.post(ashade_urls['ajax'], {
                 action: 'ashade_client_approval',
                 post_id: $parent.parent().data('id'),
                 item_id: $this.data('id'),
                 event: this_event
             }, function(response) {
                 $parent.removeClass('is-busy');
                 if ('remove' == this_event) {
                     $parent.removeClass('is-liked');
                     $parent.addClass('is-unviewed');
                 } else {
                     $parent.addClass('is-liked');
                     $parent.removeClass('is-unviewed');
                 }
             });
         });
     }
     if (jQuery('.ahshade-client-dislike').length) {
         jQuery(document).on('click', '.ahshade-client-dislike', function(e) {
             e.preventDefault();
             let $this = jQuery(this),
                 $parent = jQuery(this).parents('.ashade-client-item'),
                 this_event = '';
 
             $parent.removeClass('is-liked');
             $parent.removeClass('is-unviewed');
             $parent.addClass('is-busy');
             if ($parent.hasClass('is-disliked')) {
                 // Remove Like
                 this_event = 'remove';
             } else {
                 // Add Like
                 this_event = 'dislike';
             }
 
             jQuery.post(ashade_urls['ajax'], {
                 action: 'ashade_client_approval',
                 post_id: $parent.parent().data('id'),
                 item_id: $this.data('id'),
                 event: this_event
             }, function(response) {
                 $parent.removeClass('is-busy');
                 if ('remove' == this_event) {
                     $parent.removeClass('is-disliked');
                     $parent.addClass('is-unviewed');
                 } else {
                     $parent.addClass('is-disliked');
                     $parent.removeClass('is-unviewed');
                 }
             });
         });
     }
 
     // Author Notify
     if (jQuery('.ashade-author-notify-button').length) {
         jQuery('.ashade-author-notify-button').on('click', function() {
             let $this = jQuery(this),
                 $parent = $this.parent(),
                 client_data = $this.data('client'),
                 $gallery = $parent.parent().find('.ashade-client-grid');
 
             client_data.url = document.URL;
             client_data.title = document.title;
             if ('yes' == client_data.includes) {
                 let images_array = Array();
                 $gallery.find('.is-liked').each(function() {
                     images_array.push(jQuery(this).data('id'));
                 });
                 client_data.images = images_array;
             }
 
             jQuery.post(ashade_urls['ajax'], {
                 action: 'shadowcore_proofing_notify',
                 client_data: $this.data('client'),
             }, function(response) {
                 $this.slideUp(300);
                 $parent.find('.ashade-client-notify-message').html(response).slideDown(300);
                 setTimeout(function() {
                     $this.slideDown(300);
                     $parent.find('.ashade-client-notify-message').slideUp(300);
                 }, 3000, $this, $parent);
             });
         });
     }
 
 
     // Grid Item
     if (jQuery('.ashade-grid-item').length) {
         jQuery('.ashade-grid-item').on('mouseenter', function() {
             jQuery(this).parent().addClass('ashade-grid--hovered');
         }).on('mouseleave', function() {
             jQuery(this).parent().removeClass('ashade-grid--hovered');
         });
     }
 
     ashade.layout();
     ashade.loading();
 }
 
 ashade.layout = function() {
     // Close Mobile Menu (if it don't use)
     if ($ashade_window.width() > 760) {
         $ashade_body.removeClass('ashade-mobile-menu-shown');
     }
 
     // Attachment Page
     if (jQuery('.ashade-attachment-wrap').length) {
         jQuery('.ashade-attachment-wrap').each(function() {
             let $this = jQuery(this),
                 $inner = $this.find('.ashade-attachment-inner'),
                 $imgWrap = $this.find('.ashade-attachment'),
                 ratio = $imgWrap.data('ratio'),
                 maxH = $ashade_window.height() - $ashade_header.height() - $ashade_footer.height() - parseInt($inner.css('padding-top'), 10) - parseInt($inner.css('padding-bottom'), 10),
                 maxW = $ashade_window.width() - parseInt($inner.css('padding-left'), 10) - parseInt($inner.css('padding-right'), 10),
                 tempW = maxH / ratio,
                 setW, setH;
             if ($ashade_body.hasClass('admin-bar')) {
                 maxH = maxH - jQuery('#wpadminbar').height();
             }
             if (tempW > maxW) {
                 setW = maxW;
                 setH = setW * ratio;
             } else {
                 setH = maxH;
                 setW = maxH / ratio;
             }
             $this.css({
                 'padding-top': $ashade_header.height(),
                 'padding-bottom': $ashade_footer.height(),
             })
             $imgWrap.find('img').width(setW).height(setH);
         });
     }
 
     // Header Space Holder
     if (typeof $ashade_header_holder !== 'undefined') {
         $ashade_header_holder.height($ashade_header.height());
     }
 
     // Header Padding to Home Template
     if (jQuery('#ashade-home-works').length) {
         jQuery('#ashade-home-works').css('padding-top', $ashade_header.height() + 'px');
     }
     if (jQuery('#ashade-home-contacts').length) {
         jQuery('#ashade-home-contacts').css('padding-top', $ashade_header.height() + 'px');
     }
 
     // Relayout Masonry items
     if (jQuery('.is-masonry').length) {
         jQuery('.is-masonry').each(function() {
             var $this_el = jQuery(this);
             if ('absolute' == $this_el.children('div').css('position')) {
                 $this_el.masonry('layout');
             } else {
                 $this_el.masonry();
             }
         });
     }
 
     // Fullheight Row
     if (jQuery('.ashade-row-fullheight').length) {
         jQuery('.ashade-row-fullheight').each(function() {
             var $this = jQuery(this),
                 minHeight = $ashade_window.height();
 
             if ($ashade_body.hasClass('admin-bar')) {
                 minHeight = minHeight - jQuery('#wpadminbar').height();
             }
             if ($this.hasClass('exclude-header')) {
                 minHeight = minHeight - $ashade_header.height();
             }
             if ($this.hasClass('exclude-footer')) {
                 minHeight = minHeight - $ashade_footer.height();
             }
             $this.css('min-height', minHeight + 'px');
         });
     }
 
     // Dropdown Menu Position
     $ashade_header.find('.ashade-menu-offset').removeClass('ashade-menu-offset');
 
     $ashade_header.find('.sub-menu').each(function() {
         var $this = jQuery(this),
             this_left = $this.offset().left,
             this_left_full = $this.offset().left + $this.width() + parseInt($this.css('padding-left'), 10) + parseInt($this.css('padding-right'), 10);
 
         if (this_left_full > $ashade_window.width()) {
             $this.addClass('ashade-menu-offset');
         }
     });
 
     // Smooth Scroll Functions
     ashade.old_scroll_top = $ashade_window.scrollTop();
     if ($ashade_body.hasClass('ashade-smooth-scroll')) {
         ashade.sScroll.layout();
     }
 }
 
 // Loading Animation
 ashade.loading = function() {
     if ($ashade_body.hasClass('ashade-loading--full')) {
         // Load Page Title and Guides
         if (!$ashade_body.hasClass('ashade-layout--horizontal')) {
             // Vertical Layout
             if (jQuery('.ashade-page-title-wrap:not(.is-inactive)').length) {
                 gsap.to('.ashade-page-title-wrap:not(.is-inactive)', 0.5, {
                     css: {
                         top: '100%',
                     },
                     onComplete: function() {
                         jQuery('.ashade-page-title-wrap:not(.is-inactive)').addClass('is-loaded');
                     }
                 });
             }
             if (jQuery('.ashade-back-wrap:not(.is-inactive)').length) {
                 gsap.to('.ashade-back-wrap:not(.is-inactive)', 0.5, {
                     css: {
                         top: '100%',
                     },
                     onComplete: function() {
                         jQuery('.ashade-back-wrap:not(.is-inactive)').addClass('is-loaded');
                     }
                 });
             }
         } else {
             // Horizontal Layout
             if (jQuery('.ashade-page-title-wrap:not(.is-inactive)').length) {
                 if (jQuery('.ashade-page-title-wrap:not(.is-inactive)').hasClass('ashade-page-title--is-alone')) {
                     setTimeout("jQuery('.ashade-page-title-wrap:not(.is-inactive)').addClass('is-loaded')", 500);
                 } else {
                     gsap.to('.ashade-page-title-wrap:not(.is-inactive)', 0.5, {
                         x: 0,
                         delay: 0.5,
                         onComplete: function() {
                             jQuery('.ashade-page-title-wrap:not(.is-inactive)').addClass('is-loaded');
                         }
                     });
                 }
             }
             if (jQuery('.ashade-back-wrap:not(.is-inactive)').length) {
                 gsap.to('.ashade-back-wrap:not(.is-inactive)', 0.5, {
                     css: {
                         x: 0,
                     },
                     delay: 0.5,
                     onComplete: function() {
                         jQuery('.ashade-back-wrap:not(.is-inactive)').addClass('is-loaded');
                     }
                 });
             }
         }
 
         // Load Home Links
         if (ashade_landing && 'contacts' !== ashade_landing.get_event() && 'works' !== ashade_landing.get_event()) {
             gsap.to('.ashade-home-link--works:not(.is-inactive)', 0.5, {
                 css: {
                     top: '100%',
                 },
                 onComplete: function() {
                     jQuery('.ashade-home-link--works:not(.is-inactive)').addClass('is-loaded');
                 }
             });
             gsap.to('.ashade-home-link--contacts:not(.is-inactive)', 0.5, {
                 css: {
                     top: '100%',
                 },
                 onComplete: function() {
                     jQuery('.ashade-home-link--contacts:not(.is-inactive)').addClass('is-loaded');
                 }
             });
         }
 
         // Load Page Background
         if (ashade_landing && ('contacts' == ashade_landing.get_event() || 'works' == ashade_landing.get_event())) {
             if (jQuery('.ashade-page-background').length) {
                 gsap.fromTo('.ashade-page-background', {
                     scale: 1.05,
                     opacity: 0,
                 }, {
                     scale: 1.05,
                     opacity: 0,
                     duration: 1,
                     delay: ashade.config.content_load_delay,
 
                 });
             }
         } else {
             if (jQuery('.ashade-page-background').length) {
                 gsap.fromTo('.ashade-page-background', {
                     scale: 1.05,
                     opacity: 0,
                 }, {
                     scale: 1,
                     opacity: jQuery('.ashade-page-background').data('opacity'),
                     duration: 1,
                     delay: ashade.config.content_load_delay,
 
                 });
             }
         }
 
         let logoDelay = ashade.config.content_load_delay;
         if ($ashade_window.width() < 760) {
             logoDelay = 0.1;
         }
 
         // Load Logo
        //  gsap.from('.ashade-logo', {
        //      x: '-50%',
        //      opacity: 0,
        //      duration: 0.5,
        //      delay: logoDelay
        //  });
 
         // Load Mobile Menu
        //  gsap.from('.ashade-mobile-header > a', {
        //      x: 10,
        //      y: -10,
        //      opacity: 0,
        //      duration: 0.2,
        //      delay: 0.1,
        //      stagger: 0.1
        //  }, );
 
         // Load Menu
        //  gsap.from('.ashade-nav ul.main-menu > li', {
        //      x: -10,
        //      y: -10,
        //      opacity: 0,
        //      duration: 0.2,
        //      delay: ashade.config.content_load_delay,
        //      stagger: 0.1
        //  }, );
 
         // Load Footer Socials
         if (jQuery('.ashade-footer__socials').length) {
             if ($ashade_window.width() < 760) {
                 gsap.from('.ashade-footer__socials li', {
                     x: 0,
                     y: 20,
                     opacity: 0,
                     duration: 0.2,
                     delay: ashade.config.content_load_delay,
                     stagger: 0.1
                 }, );
             } else {
                 gsap.from('.ashade-footer__socials li', {
                     x: -10,
                     y: -10,
                     opacity: 0,
                     duration: 0.2,
                     delay: ashade.config.content_load_delay,
                     stagger: 0.1
                 }, );
             }
         }
 
         // Load Fotoer Copyright
         if (jQuery('.ashade-footer__copyright').length) {
             if ($ashade_window.width() < 760) {
                 gsap.from('.ashade-footer__copyright', {
                     y: 20,
                     opacity: 0,
                     duration: 0.5,
                     delay: ashade.config.content_load_delay
                 });
             } else {
                 gsap.from('.ashade-footer__copyright', {
                     x: 50,
                     opacity: 0,
                     duration: 0.5,
                     delay: ashade.config.content_load_delay
                 });
             }
         }
 
         // Show Content
         if (!$ashade_body.hasClass('ashade-home-template')) {
             if (jQuery('.ashade-content').length) {
                 let contentDelay = ashade.config.content_load_delay * 1.7;
                 if ($ashade_window.width() < 760) {
                     contentDelay = 0.5;
                 }
                 gsap.from('.ashade-content', {
                     opacity: 0,
                     y: 100,
                     duration: 1,
                     delay: contentDelay,
                     onStart: function() {
                         ashade.content_loaded();
                     }
                 });
             }
         }
 
         // Show 404 Text
         if (jQuery('.ashade-404-text').length) {
             let contentDelay = ashade.config.content_load_delay * 1.7;
             if ($ashade_window.width() < 760) {
                 contentDelay = 0.5;
             }
             gsap.from('.ashade-404-text', {
                 opacity: 0,
                 y: 50,
                 duration: 1,
                 delay: contentDelay
             });
         }
 
         // Show Protected Test
         if (jQuery('.ashade-protected-text').length) {
             let contentDelay = ashade.config.content_load_delay * 1.7;
             if ($ashade_window.width() < 760) {
                 contentDelay = 0.5;
             }
             gsap.from('.ashade-protected-text', {
                 opacity: 0,
                 y: 50,
                 duration: 1,
                 delay: contentDelay
             });
         }
 
         // Show Albums Ribbon Content
         if (jQuery('.ashade-albums-carousel').length) {
             if (jQuery('.ashade-albums-carousel').hasClass('is-vertical')) {
                 gsap.from('.ashade-album-item__inner', {
                     opacity: 0,
                     y: 100,
                     duration: 1,
                     stagger: 0.1,
                     delay: ashade.config.content_load_delay * 1.7
                 });
             } else {
                 gsap.from('.ashade-album-item__inner', {
                     opacity: 0,
                     x: 100,
                     duration: 1,
                     stagger: 0.1,
                     delay: ashade.config.content_load_delay * 1.7
                 });
             }
             if (ashade_ribbon.$bar) {
                 gsap.from(ashade_ribbon.$bar[0], {
                     opacity: 0,
                     y: 20,
                     duration: 1,
                     delay: ashade.config.content_load_delay * 1.7
                 });
             }
         }
 
         // Show Albums Slider Content
         if (jQuery('.ashade-albums-slider').length) {
             if (jQuery('.ashade-album-item__title').length) {
                 gsap.to('.ashade-album-item__title', {
                     css: {
                         top: '100%',
                     },
                     delay: 0.5,
                     duration: 1,
                     onComplete: function() {
                         jQuery('.ashade-album-item__title').addClass('is-loaded');
                     }
                 });
             }
             if (jQuery('.ashade-album-item__explore').length) {
                 gsap.to('.ashade-album-item__explore', {
                     css: {
                         top: '100%',
                     },
                     delay: 0.5,
                     duration: 1,
                     onComplete: function() {
                         jQuery('.ashade-album-item__explore').addClass('is-loaded');
                     }
                 });
             }
             gsap.fromTo('.ashade-slider-prev', {
                 x: -50,
             }, {
                 x: 0,
                 delay: ashade.config.content_load_delay * 1.7,
                 duration: 0.5,
                 onStart: function() {
                     jQuery('.ashade-slider-prev').addClass('is-loaded');
                 }
             });
             gsap.fromTo('.ashade-slider-next', {
                 x: 50,
             }, {
                 x: 0,
                 delay: ashade.config.content_load_delay * 1.7,
                 duration: 0.5,
                 onStart: function() {
                     jQuery('.ashade-slider-next').addClass('is-loaded');
                 }
             });
             gsap.from('.ashade-album-item__image', {
                 scale: 1.05,
                 opacity: 0,
                 duration: 1,
                 delay: ashade.config.content_load_delay * 1.7,
             });
         }
 
        $ashade_body.addClass('is-loaded')
     } else {
         jQuery('.ashade-home-link--works:not(.is-inactive)').addClass('is-loaded');
         jQuery('.ashade-home-link--contacts:not(.is-inactive)').addClass('is-loaded');
         jQuery('.ashade-back-wrap:not(.is-inactive)').addClass('is-loaded');
         jQuery('.ashade-page-title-wrap:not(.is-inactive)').addClass('is-loaded');
         jQuery('.ashade-album-item__title').addClass('is-loaded');
         jQuery('.ashade-album-item__explore').addClass('is-loaded');
         jQuery('.ashade-slider-prev').addClass('is-loaded');
         jQuery('.ashade-slider-next').addClass('is-loaded');
     }
     if ($ashade_body.hasClass('ashade-loading--fade')) {
         setTimeout("$ashade_body.addClass('is-loaded')", 500);
     }
     if ($ashade_body.hasClass('ashade-loading--none')) {
         $ashade_body.addClass('is-loaded');
     }
 
 }
 
 ashade.change_location = function(this_href) {
     if ($ashade_body.hasClass('ashade-unloading--none')) {
         if ('history.back' == this_href) {
             //window.history.back();
             window.location = ashade.config.referrer;
         } else {
             window.location = this_href;
         }
     } else if ($ashade_body.hasClass('ashade-unloading--full')) {
         ashade.cursor.$el.addClass('is-unloading');
         $ashade_body.addClass('is-locked');
         if ($ashade_window.width() < 760 && $ashade_body.hasClass('ashade-mobile-menu-shown')) {
             let setDelay = 0;
             $ashade_body.addClass('is-locked');
             if (jQuery('.ashade-mobile-menu').find('.is-open').length) {
                 jQuery('.ashade-mobile-menu').find('ul.sub-menu').slideUp(300);
                 setDelay = 0.3;
             }
             gsap.fromTo('.ashade-mobile-menu ul.main-menu > li', {
                 x: 0,
                 y: 0,
                 opacity: 1
             }, {
                 x: 0,
                 y: -40,
                 opacity: 0,
                 duration: 0.2,
                 delay: setDelay,
                 stagger: 0.1,
                 onComplete: function() {
                     window.location = this_href;
                 }
             }, );
             return false;
         }
         $ashade_body.removeClass('is-loaded');
         if ($ashade_body.hasClass('ashade-aside-shown')) {
             $ashade_body.removeClass('ashade-aside-shown');
         }
         if ($ashade_body.hasClass('ashade-mobile-menu-shown')) {
             $ashade_body.removeClass('ashade-mobile-menu-shown');
         }
 
         // Unload Content
         if (jQuery('.ashade-content').length) {
             gsap.to('.ashade-content', {
                 css: {
                     opacity: 0,
                     y: -100,
                 },
                 duration: 0.6,
             });
         }
 
         // Unload 404 Content
         if (jQuery('.ashade-404-text').length) {
             gsap.to('.ashade-404-text', {
                 css: {
                     opacity: 0,
                     y: -50,
                 },
                 duration: 0.6,
             });
         }
 
         // Unload Protected Content
         if (jQuery('.ashade-protected-text').length) {
             gsap.to('.ashade-protected-text', {
                 css: {
                     opacity: 0,
                     y: -50,
                 },
                 duration: 0.6,
             });
         }
 
         // Unload Albums Carousel Content
         if (jQuery('.ashade-albums-carousel').length) {
             if (ashade_ribbon.type == 'vertical') {
                 gsap.to('.ashade-album-item__inner.is-inview', {
                     css: {
                         opacity: 0,
                         y: -100,
                     },
                     stagger: 0.1,
                     delay: 0.5,
                     duration: 0.6,
                 });
             } else {
                 gsap.to('.ashade-album-item__inner.is-inview', {
                     css: {
                         opacity: 0,
                         x: -100,
                     },
                     stagger: 0.1,
                     delay: 0.5,
                     duration: 0.6,
                 });
             }
             if (ashade_ribbon.$bar) {
                 gsap.to(ashade_ribbon.$bar[0], {
                     opacity: 0,
                     y: 20,
                     duration: 1,
                 });
             }
         }
 
         // Unload Albums Slider Content
         if (jQuery('.ashade-albums-slider').length) {
             if (jQuery('.ashade-album-item__title').length) {
                 setTimeout("jQuery('.ashade-album-item__title').removeClass('is-loaded')", 300);
                 gsap.to('.ashade-album-item__title', {
                     css: {
                         top: '0%',
                     },
                     delay: 1.2,
                     duration: 1,
                 });
             }
             if (jQuery('.ashade-album-item__explore').length) {
                 setTimeout("jQuery('.ashade-album-item__explore').removeClass('is-loaded')", 300);
                 gsap.to('.ashade-album-item__explore', {
                     css: {
                         top: '200%',
                     },
                     delay: 1.2,
                     duration: 1,
                 });
             }
             gsap.fromTo('.ashade-slider-prev', {
                 x: 0,
             }, {
                 x: -50,
                 duration: 0.5,
                 onStart: function() {
                     jQuery('.ashade-slider-prev').removeClass('is-loaded');
                 }
             });
             gsap.fromTo('.ashade-slider-next', {
                 x: 0,
             }, {
                 x: 50,
                 duration: 0.5,
                 onStart: function() {
                     jQuery('.ashade-slider-next').removeClass('is-loaded');
                 }
             });
             gsap.to('.ashade-album-item__image', {
                 css: {
                     scale: 1.05,
                     opacity: 0,
                 },
                 duration: 1,
                 delay: ashade.config.content_load_delay * 1.7,
             });
         }
 
         // Remove Logo
         gsap.to('.ashade-logo', {
             css: {
                 x: '-50%',
                 opacity: 0,
             },
             duration: 0.5,
             delay: 0.5
         });
 
         // Remove Menu
         gsap.to('.ashade-nav ul.main-menu > li', {
             css: {
                 x: -10,
                 y: -10,
                 opacity: 0,
             },
             duration: 0.2,
             delay: 0.5,
             stagger: 0.1
         }, );
 
         // Unload Mobile Menu
         gsap.to('.ashade-mobile-header > a', {
             x: -10,
             y: -10,
             opacity: 0,
             duration: 0.2,
             delay: 0.5,
             stagger: 0.1
         }, );
 
         // Footer Socials
         if (jQuery('.ashade-footer__socials').length) {
             gsap.to('.ashade-footer__socials li', {
                 css: {
                     x: -10,
                     y: -10,
                     opacity: 0,
                 },
                 duration: 0.2,
                 delay: 0.5,
                 stagger: 0.1
             }, );
         }
 
         // Fotoer Copyright
         if (jQuery('.ashade-footer__copyright').length) {
             gsap.to('.ashade-footer__copyright', {
                 css: {
                     x: 50,
                     opacity: 0,
                 },
                 duration: 0.5,
                 delay: 0.5
             });
         }
 
         // Remove Page Title and Guides
         if (!$ashade_body.hasClass('ashade-layout--horizontal')) {
             // Vertical Layout
             if (jQuery('.ashade-page-title-wrap').length) {
                 setTimeout("jQuery('.ashade-page-title-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
                 gsap.to('.ashade-page-title-wrap', 0.5, {
                     css: {
                         top: 0,
                     },
                     delay: 1.1,
                 });
             }
             if (jQuery('.ashade-back-wrap').length) {
                 setTimeout("jQuery('.ashade-back-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
                 gsap.to('.ashade-back-wrap', 0.5, {
                     css: {
                         top: '200%',
                     },
                     delay: 1.1,
                 });
             }
         } else {
             // Horizontal Layout
             if (jQuery('.ashade-page-title-wrap:not(.is-inactive)').length) {
                 if (jQuery('.ashade-page-title-wrap:not(.is-inactive)').hasClass('ashade-page-title--is-alone')) {
                     setTimeout("jQuery('.ashade-page-title-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
                 } else {
                     setTimeout("jQuery('.ashade-page-title-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
                     gsap.to('.ashade-page-title-wrap:not(.is-inactive)', 0.5, {
                         x: '-100%',
                         delay: 1.1,
                     });
                 }
             }
             if (jQuery('.ashade-back-wrap:not(.is-inactive)').length) {
                 setTimeout("jQuery('.ashade-back-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
                 gsap.to('.ashade-back-wrap:not(.is-inactive):not(.ashade-404-return-wrap)', 0.5, {
                     css: {
                         x: '100%',
                     },
                     delay: 1.1,
                 });
                 gsap.to('.ashade-back-wrap.ashade-404-return-wrap:not(.is-inactive)', 0.5, {
                     css: {
                         x: '-100%',
                     },
                     delay: 1.1,
                 });
             }
         }
 
         // Home Template Unloading
         if ($ashade_body.hasClass('ashade-home-template')) {
             if (!$ashade_body.hasClass('ashade-home-state--contacts') && !$ashade_body.hasClass('ashade-home-state--works')) {
                 var links_delay = 0.5,
                     links_timeout = 0;
             } else {
                 var links_delay = 1.1,
                     links_timeout = 600;
             }
             setTimeout("jQuery('.ashade-home-link--works:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
             gsap.to('.ashade-home-link--works:not(.is-inactive)', 0.5, {
                 css: {
                     top: 0,
                 },
                 delay: links_delay,
             });
             setTimeout("jQuery('.ashade-home-link--contacts:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
             gsap.to('.ashade-home-link--contacts:not(.is-inactive)', 0.5, {
                 css: {
                     top: '200%',
                 },
                 delay: links_delay,
             });
         }
 
         // Remove Page Background
         if (jQuery('.ashade-page-background').length) {
             gsap.to('.ashade-page-background', {
                 css: {
                     scale: 1.05,
                     opacity: 0,
                 },
                 duration: 1,
                 delay: ashade.config.content_load_delay * 1.7,
             });
         }
 
         setTimeout(function() {
             if ('history.back' == this_href) {
                 //window.history.back();
                 window.location = ashade.config.referrer;
             } else {
                 window.location = this_href;
             }
         }, 2100, this_href);
     } else if ($ashade_body.hasClass('ashade-unloading--fade')) {
         // Fade Unload
         $ashade_body.addClass('is-fade-unload');
         gsap.to('body', {
             css: {
                 opacity: 0,
             },
             duration: 1,
         });
 
         setTimeout(function() {
             if ('history.back' == this_href) {
                 //window.history.back();
                 window.location = ashade.config.referrer;
             } else {
                 window.location = this_href;
             }
         }, 1000, this_href);
     }
 }
 
 // DOM Ready. Init Template Core.
 jQuery(document).ready(function() {
     ashade.init();
 });
 
 $ashade_window.on('resize', function() {
     // Window Resize Actions
     ashade.layout();
     setTimeout(ashade.layout(), 500);
 }).on('load', function() {
     // Window Load Actions
     ashade.layout();
 }).on('scroll', function() {
     // Header Fade Point
     if ($ashade_window.scrollTop() > ashade.config.fade_point) {
         $ashade_header.addClass('is-faded');
     } else {
         $ashade_header.removeClass('is-faded');
     }
 
     if ($ashade_body.hasClass('ashade-aside-shown')) {
         $ashade_window.scrollTop(ashade.old_scroll_top);
     }
     if ($ashade_body.hasClass('ashade-mobile-menu-shown')) {
         $ashade_window.scrollTop(ashade.old_scroll_top);
     }
     if ($ashade_body.hasClass('ashade-smooth-scroll')) {
         ashade.sScroll.target = $ashade_window.scrollTop();
         if (ashade.sScroll.target > ($ashade_scroll.height() - $ashade_window.height())) {
             ashade.sScroll.layout();
         }
     }
 
     //Window Scroll Actions
     if (jQuery('.ashade-back.is-to-top:not(.in-action)').length) {
         if (!$ashade_body.hasClass('ashade-layout--horizontal')) {
             if ($ashade_window.scrollTop() > $ashade_window.height() / 2) {
                 $ashade_body.addClass('has-to-top');
             } else {
                 $ashade_body.removeClass('has-to-top');
             }
         } else {
             $ashade_body.addClass('has-to-top');
         }
     }
 });
 
 // Keyboard Controls
 jQuery(document).on('keyup', function(e) {
     switch (e.keyCode) {
         case 27: // 'Esc' Key
             if ($ashade_body.hasClass('ashade-aside-shown')) {
                 $ashade_body.removeClass('ashade-aside-shown');
             }
             if ($ashade_body.hasClass('shown-more-categories')) {
                 $ashade_body.removeClass('shown-more-categories');
             }
             break;
         default:
             break;
     }
 });
 
 // Init Content After Loading
 ashade.content_loaded = function() {
     ashade.layout();
 }
 
 // Firefox Back Button Fix
 window.onunload = function() {};
 
 // Safari Back Button Fix
 jQuery(window).on('pageshow', function(event) {
     if (event.originalEvent.persisted) {
         window.location.reload()
     }
 });