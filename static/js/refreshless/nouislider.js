/*! nouislider - 11.1.0 - 2018-04-02 11:18:13 */

! function (a) {
  "function" == typeof define && define.amd ? define([], a) : "object" == typeof exports ? module.exports = a() : window.noUiSlider = a()
}(function () {
  "use strict";

  function a(a) {
    return "object" == typeof a && "function" == typeof a.to && "function" == typeof a.from
  }

  function b(a) {
    a.parentElement.removeChild(a)
  }

  function c(a) {
    return null !== a && void 0 !== a
  }

  function d(a) {
    a.preventDefault()
  }

  function e(a) {
    return a.filter(function (a) {
      return !this[a] && (this[a] = !0)
    }, {})
  }

  function f(a, b) {
    return Math.round(a / b) * b
  }

  function g(a, b) {
    var c = a.getBoundingClientRect(),
      d = a.ownerDocument,
      e = d.documentElement,
      f = p(d);
    return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (f.x = 0), b ? c.top + f.y - e.clientTop : c.left + f.x - e.clientLeft
  }

  function h(a) {
    return "number" == typeof a && !isNaN(a) && isFinite(a)
  }

  function i(a, b, c) {
    c > 0 && (m(a, b), setTimeout(function () {
      n(a, b)
    }, c))
  }

  function j(a) {
    return Math.max(Math.min(a, 100), 0)
  }

  function k(a) {
    return Array.isArray(a) ? a : [a]
  }

  function l(a) {
    a = String(a);
    var b = a.split(".");
    return b.length > 1 ? b[1].length : 0
  }

  function m(a, b) {
    a.classList ? a.classList.add(b) : a.className += " " + b
  }

  function n(a, b) {
    a.classList ? a.classList.remove(b) : a.className = a.className.replace(new RegExp("(^|\\b)" + b.split(" ").join("|") + "(\\b|$)", "gi"), " ")
  }

  function o(a, b) {
    return a.classList ? a.classList.contains(b) : new RegExp("\\b" + b + "\\b").test(a.className)
  }

  function p(a) {
    var b = void 0 !== window.pageXOffset,
      c = "CSS1Compat" === (a.compatMode || "");
    return {
      x: b ? window.pageXOffset : c ? a.documentElement.scrollLeft : a.body.scrollLeft,
      y: b ? window.pageYOffset : c ? a.documentElement.scrollTop : a.body.scrollTop
    }
  }

  function q() {
    return window.navigator.pointerEnabled ? {
      start: "pointerdown",
      move: "pointermove",
      end: "pointerup"
    } : window.navigator.msPointerEnabled ? {
      start: "MSPointerDown",
      move: "MSPointerMove",
      end: "MSPointerUp"
    } : {
      start: "mousedown touchstart",
      move: "mousemove touchmove",
      end: "mouseup touchend"
    }
  }

  function r() {
    var a = !1;
    try {
      var b = Object.defineProperty({}, "passive", {
        get: function () {
          a = !0
        }
      });
      window.addEventListener("test", null, b)
    } catch (a) {}
    return a
  }

  function s() {
    return window.CSS && CSS.supports && CSS.supports("touch-action", "none")
  }

  function t(a, b) {
    return 100 / (b - a)
  }

  function u(a, b) {
    return 100 * b / (a[1] - a[0])
  }

  function v(a, b) {
    return u(a, a[0] < 0 ? b + Math.abs(a[0]) : b - a[0])
  }

  function w(a, b) {
    return b * (a[1] - a[0]) / 100 + a[0]
  }

  function x(a, b) {
    for (var c = 1; a >= b[c];) c += 1;
    return c
  }

  function y(a, b, c) {
    if (c >= a.slice(-1)[0]) return 100;
    var d = x(c, a),
      e = a[d - 1],
      f = a[d],
      g = b[d - 1],
      h = b[d];
    return g + v([e, f], c) / t(g, h)
  }

  function z(a, b, c) {
    if (c >= 100) return a.slice(-1)[0];
    var d = x(c, b),
      e = a[d - 1],
      f = a[d],
      g = b[d - 1];
    return w([e, f], (c - g) * t(g, b[d]))
  }

  function A(a, b, c, d) {
    if (100 === d) return d;
    var e = x(d, a),
      g = a[e - 1],
      h = a[e];
    return c ? d - g > (h - g) / 2 ? h : g : b[e - 1] ? a[e - 1] + f(d - a[e - 1], b[e - 1]) : d
  }

  function B(a, b, c) {
    var d;
    if ("number" == typeof b && (b = [b]), !Array.isArray(b)) throw new Error("noUiSlider (" + $ + "): 'range' contains invalid value.");
    if (d = "min" === a ? 0 : "max" === a ? 100 : parseFloat(a), !h(d) || !h(b[0])) throw new Error("noUiSlider (" + $ + "): 'range' value isn't numeric.");
    c.xPct.push(d), c.xVal.push(b[0]), d ? c.xSteps.push(!isNaN(b[1]) && b[1]) : isNaN(b[1]) || (c.xSteps[0] = b[1]), c.xHighestCompleteStep.push(0)
  }

  function C(a, b, c) {
    if (!b) return !0;
    c.xSteps[a] = u([c.xVal[a], c.xVal[a + 1]], b) / t(c.xPct[a], c.xPct[a + 1]);
    var d = (c.xVal[a + 1] - c.xVal[a]) / c.xNumSteps[a],
      e = Math.ceil(Number(d.toFixed(3)) - 1),
      f = c.xVal[a] + c.xNumSteps[a] * e;
    c.xHighestCompleteStep[a] = f
  }

  function D(a, b, c) {
    this.xPct = [], this.xVal = [], this.xSteps = [c || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = b;
    var d, e = [];
    for (d in a) a.hasOwnProperty(d) && e.push([a[d], d]);
    for (e.length && "object" == typeof e[0][0] ? e.sort(function (a, b) {
        return a[0][0] - b[0][0]
      }) : e.sort(function (a, b) {
        return a[0] - b[0]
      }), d = 0; d < e.length; d++) B(e[d][1], e[d][0], this);
    for (this.xNumSteps = this.xSteps.slice(0), d = 0; d < this.xNumSteps.length; d++) C(d, this.xNumSteps[d], this)
  }

  function E(b) {
    if (a(b)) return !0;
    throw new Error("noUiSlider (" + $ + "): 'format' requires 'to' and 'from' methods.")
  }

  function F(a, b) {
    if (!h(b)) throw new Error("noUiSlider (" + $ + "): 'step' is not numeric.");
    a.singleStep = b
  }

  function G(a, b) {
    if ("object" != typeof b || Array.isArray(b)) throw new Error("noUiSlider (" + $ + "): 'range' is not an object.");
    if (void 0 === b.min || void 0 === b.max) throw new Error("noUiSlider (" + $ + "): Missing 'min' or 'max' in 'range'.");
    if (b.min === b.max) throw new Error("noUiSlider (" + $ + "): 'range' 'min' and 'max' cannot be equal.");
    a.spectrum = new D(b, a.snap, a.singleStep)
  }

  function H(a, b) {
    if (b = k(b), !Array.isArray(b) || !b.length) throw new Error("noUiSlider (" + $ + "): 'start' option is incorrect.");
    a.handles = b.length, a.start = b
  }

  function I(a, b) {
    if (a.snap = b, "boolean" != typeof b) throw new Error("noUiSlider (" + $ + "): 'snap' option must be a boolean.")
  }

  function J(a, b) {
    if (a.animate = b, "boolean" != typeof b) throw new Error("noUiSlider (" + $ + "): 'animate' option must be a boolean.")
  }

  function K(a, b) {
    if (a.animationDuration = b, "number" != typeof b) throw new Error("noUiSlider (" + $ + "): 'animationDuration' option must be a number.")
  }

  function L(a, b) {
    var c, d = [!1];
    if ("lower" === b ? b = [!0, !1] : "upper" === b && (b = [!1, !0]), !0 === b || !1 === b) {
      for (c = 1; c < a.handles; c++) d.push(b);
      d.push(!1)
    } else {
      if (!Array.isArray(b) || !b.length || b.length !== a.handles + 1) throw new Error("noUiSlider (" + $ + "): 'connect' option doesn't match handle count.");
      d = b
    }
    a.connect = d
  }

  function M(a, b) {
    switch (b) {
      case "horizontal":
        a.ort = 0;
        break;
      case "vertical":
        a.ort = 1;
        break;
      default:
        throw new Error("noUiSlider (" + $ + "): 'orientation' option is invalid.")
    }
  }

  function N(a, b) {
    if (!h(b)) throw new Error("noUiSlider (" + $ + "): 'margin' option must be numeric.");
    if (0 !== b && (a.margin = a.spectrum.getMargin(b), !a.margin)) throw new Error("noUiSlider (" + $ + "): 'margin' option is only supported on linear sliders.")
  }

  function O(a, b) {
    if (!h(b)) throw new Error("noUiSlider (" + $ + "): 'limit' option must be numeric.");
    if (a.limit = a.spectrum.getMargin(b), !a.limit || a.handles < 2) throw new Error("noUiSlider (" + $ + "): 'limit' option is only supported on linear sliders with 2 or more handles.")
  }

  function P(a, b) {
    if (!h(b) && !Array.isArray(b)) throw new Error("noUiSlider (" + $ + "): 'padding' option must be numeric or array of exactly 2 numbers.");
    if (Array.isArray(b) && 2 !== b.length && !h(b[0]) && !h(b[1])) throw new Error("noUiSlider (" + $ + "): 'padding' option must be numeric or array of exactly 2 numbers.");
    if (0 !== b) {
      if (Array.isArray(b) || (b = [b, b]), a.padding = [a.spectrum.getMargin(b[0]), a.spectrum.getMargin(b[1])], !1 === a.padding[0] || !1 === a.padding[1]) throw new Error("noUiSlider (" + $ + "): 'padding' option is only supported on linear sliders.");
      if (a.padding[0] < 0 || a.padding[1] < 0) throw new Error("noUiSlider (" + $ + "): 'padding' option must be a positive number(s).");
      if (a.padding[0] + a.padding[1] >= 100) throw new Error("noUiSlider (" + $ + "): 'padding' option must not exceed 100% of the range.")
    }
  }

  function Q(a, b) {
    switch (b) {
      case "ltr":
        a.dir = 0;
        break;
      case "rtl":
        a.dir = 1;
        break;
      default:
        throw new Error("noUiSlider (" + $ + "): 'direction' option was not recognized.")
    }
  }

  function R(a, b) {
    if ("string" != typeof b) throw new Error("noUiSlider (" + $ + "): 'behaviour' must be a string containing options.");
    var c = b.indexOf("tap") >= 0,
      d = b.indexOf("drag") >= 0,
      e = b.indexOf("fixed") >= 0,
      f = b.indexOf("snap") >= 0,
      g = b.indexOf("hover") >= 0;
    if (e) {
      if (2 !== a.handles) throw new Error("noUiSlider (" + $ + "): 'fixed' behaviour must be used with 2 handles");
      N(a, a.start[1] - a.start[0])
    }
    a.events = {
      tap: c || f,
      drag: d,
      fixed: e,
      snap: f,
      hover: g
    }
  }

  function S(a, b) {
    if (!1 !== b)
      if (!0 === b) {
        a.tooltips = [];
        for (var c = 0; c < a.handles; c++) a.tooltips.push(!0)
      } else {
        if (a.tooltips = k(b), a.tooltips.length !== a.handles) throw new Error("noUiSlider (" + $ + "): must pass a formatter for all handles.");
        a.tooltips.forEach(function (a) {
          if ("boolean" != typeof a && ("object" != typeof a || "function" != typeof a.to)) throw new Error("noUiSlider (" + $ + "): 'tooltips' must be passed a formatter or 'false'.")
        })
      }
  }

  function T(a, b) {
    a.ariaFormat = b, E(b)
  }

  function U(a, b) {
    a.format = b, E(b)
  }

  function V(a, b) {
    if ("string" != typeof b && !1 !== b) throw new Error("noUiSlider (" + $ + "): 'cssPrefix' must be a string or `false`.");
    a.cssPrefix = b
  }

  function W(a, b) {
    if ("object" != typeof b) throw new Error("noUiSlider (" + $ + "): 'cssClasses' must be an object.");
    if ("string" == typeof a.cssPrefix) {
      a.cssClasses = {};
      for (var c in b) b.hasOwnProperty(c) && (a.cssClasses[c] = a.cssPrefix + b[c])
    } else a.cssClasses = b
  }

  function X(a) {
    var b = {
        margin: 0,
        limit: 0,
        padding: 0,
        animate: !0,
        animationDuration: 300,
        ariaFormat: _,
        format: _
      },
      d = {
        step: {
          r: !1,
          t: F
        },
        start: {
          r: !0,
          t: H
        },
        connect: {
          r: !0,
          t: L
        },
        direction: {
          r: !0,
          t: Q
        },
        snap: {
          r: !1,
          t: I
        },
        animate: {
          r: !1,
          t: J
        },
        animationDuration: {
          r: !1,
          t: K
        },
        range: {
          r: !0,
          t: G
        },
        orientation: {
          r: !1,
          t: M
        },
        margin: {
          r: !1,
          t: N
        },
        limit: {
          r: !1,
          t: O
        },
        padding: {
          r: !1,
          t: P
        },
        behaviour: {
          r: !0,
          t: R
        },
        ariaFormat: {
          r: !1,
          t: T
        },
        format: {
          r: !1,
          t: U
        },
        tooltips: {
          r: !1,
          t: S
        },
        cssPrefix: {
          r: !0,
          t: V
        },
        cssClasses: {
          r: !0,
          t: W
        }
      },
      e = {
        connect: !1,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        cssPrefix: "noUi-",
        cssClasses: {
          target: "target",
          base: "base",
          origin: "origin",
          handle: "handle",
          handleLower: "handle-lower",
          handleUpper: "handle-upper",
          horizontal: "horizontal",
          vertical: "vertical",
          background: "background",
          connect: "connect",
          connects: "connects",
          ltr: "ltr",
          rtl: "rtl",
          draggable: "draggable",
          drag: "state-drag",
          tap: "state-tap",
          active: "active",
          tooltip: "tooltip",
          pips: "pips",
          pipsHorizontal: "pips-horizontal",
          pipsVertical: "pips-vertical",
          marker: "marker",
          markerHorizontal: "marker-horizontal",
          markerVertical: "marker-vertical",
          markerNormal: "marker-normal",
          markerLarge: "marker-large",
          markerSub: "marker-sub",
          value: "value",
          valueHorizontal: "value-horizontal",
          valueVertical: "value-vertical",
          valueNormal: "value-normal",
          valueLarge: "value-large",
          valueSub: "value-sub"
        }
      };
    a.format && !a.ariaFormat && (a.ariaFormat = a.format), Object.keys(d).forEach(function (f) {
      if (!c(a[f]) && void 0 === e[f]) {
        if (d[f].r) throw new Error("noUiSlider (" + $ + "): '" + f + "' is required.");
        return !0
      }
      d[f].t(b, c(a[f]) ? a[f] : e[f])
    }), b.pips = a.pips;
    var f = document.createElement("div"),
      g = void 0 !== f.style.msTransform,
      h = void 0 !== f.style.transform;
    b.transformRule = h ? "transform" : g ? "msTransform" : "webkitTransform";
    var i = [
      ["left", "top"],
      ["right", "bottom"]
    ];
    return b.style = i[b.dir][b.ort], b
  }

  function Y(a, c, f) {
    function h(a, b) {
      var c = ya.createElement("div");
      return b && m(c, b), a.appendChild(c), c
    }

    function l(a, b) {
      var d = h(a, c.cssClasses.origin),
        e = h(d, c.cssClasses.handle);
      return e.setAttribute("data-handle", b), e.setAttribute("tabindex", "0"), e.setAttribute("role", "slider"), e.setAttribute("aria-orientation", c.ort ? "vertical" : "horizontal"), 0 === b ? m(e, c.cssClasses.handleLower) : b === c.handles - 1 && m(e, c.cssClasses.handleUpper), d
    }

    function t(a, b) {
      return !!b && h(a, c.cssClasses.connect)
    }

    function u(a, b) {
      var d = h(b, c.cssClasses.connects);
      ka = [], la = [], la.push(t(d, a[0]));
      for (var e = 0; e < c.handles; e++) ka.push(l(b, e)), ta[e] = e, la.push(t(d, a[e + 1]))
    }

    function v(a) {
      m(a, c.cssClasses.target), 0 === c.dir ? m(a, c.cssClasses.ltr) : m(a, c.cssClasses.rtl), 0 === c.ort ? m(a, c.cssClasses.horizontal) : m(a, c.cssClasses.vertical), ja = h(a, c.cssClasses.base)
    }

    function w(a, b) {
      return !!c.tooltips[b] && h(a.firstChild, c.cssClasses.tooltip)
    }

    function x() {
      var a = ka.map(w);
      Q("update", function (b, d, e) {
        if (a[d]) {
          var f = b[d];
          !0 !== c.tooltips[d] && (f = c.tooltips[d].to(e[d])), a[d].innerHTML = f
        }
      })
    }

    function y() {
      Q("update", function (a, b, d, e, f) {
        ta.forEach(function (a) {
          var b = ka[a],
            e = U(sa, a, 0, !0, !0, !0),
            g = U(sa, a, 100, !0, !0, !0),
            h = f[a],
            i = c.ariaFormat.to(d[a]);
          b.children[0].setAttribute("aria-valuemin", e.toFixed(1)), b.children[0].setAttribute("aria-valuemax", g.toFixed(1)), b.children[0].setAttribute("aria-valuenow", h.toFixed(1)), b.children[0].setAttribute("aria-valuetext", i)
        })
      })
    }

    function z(a, b, c) {
      if ("range" === a || "steps" === a) return va.xVal;
      if ("count" === a) {
        if (b < 2) throw new Error("noUiSlider (" + $ + "): 'values' (>= 2) required for mode 'count'.");
        var d = b - 1,
          e = 100 / d;
        for (b = []; d--;) b[d] = d * e;
        b.push(100), a = "positions"
      }
      return "positions" === a ? b.map(function (a) {
        return va.fromStepping(c ? va.getStep(a) : a)
      }) : "values" === a ? c ? b.map(function (a) {
        return va.fromStepping(va.getStep(va.toStepping(a)))
      }) : b : void 0
    }

    function A(a, b, c) {
      function d(a, b) {
        return (a + b).toFixed(7) / 1
      }
      var f = {},
        g = va.xVal[0],
        h = va.xVal[va.xVal.length - 1],
        i = !1,
        j = !1,
        k = 0;
      return c = e(c.slice().sort(function (a, b) {
        return a - b
      })), c[0] !== g && (c.unshift(g), i = !0), c[c.length - 1] !== h && (c.push(h), j = !0), c.forEach(function (e, g) {
        var h, l, m, n, o, p, q, r, s, t, u = e,
          v = c[g + 1];
        if ("steps" === b && (h = va.xNumSteps[g]), h || (h = v - u), !1 !== u && void 0 !== v)
          for (h = Math.max(h, 1e-7), l = u; l <= v; l = d(l, h)) {
            for (n = va.toStepping(l), o = n - k, r = o / a, s = Math.round(r), t = o / s, m = 1; m <= s; m += 1) p = k + m * t, f[p.toFixed(5)] = ["x", 0];
            q = c.indexOf(l) > -1 ? 1 : "steps" === b ? 2 : 0, !g && i && (q = 0), l === v && j || (f[n.toFixed(5)] = [l, q]), k = n
          }
      }), f
    }

    function B(a, b, d) {
      function e(a, b) {
        var d = b === c.cssClasses.value,
          e = d ? k : l,
          f = d ? i : j;
        return b + " " + e[c.ort] + " " + f[a]
      }

      function f(a, f) {
        f[1] = f[1] && b ? b(f[0], f[1]) : f[1];
        var i = h(g, !1);
        i.className = e(f[1], c.cssClasses.marker), i.style[c.style] = a + "%", f[1] && (i = h(g, !1), i.className = e(f[1], c.cssClasses.value), i.setAttribute("data-value", f[0]), i.style[c.style] = a + "%", i.innerText = d.to(f[0]))
      }
      var g = ya.createElement("div"),
        i = [c.cssClasses.valueNormal, c.cssClasses.valueLarge, c.cssClasses.valueSub],
        j = [c.cssClasses.markerNormal, c.cssClasses.markerLarge, c.cssClasses.markerSub],
        k = [c.cssClasses.valueHorizontal, c.cssClasses.valueVertical],
        l = [c.cssClasses.markerHorizontal, c.cssClasses.markerVertical];
      return m(g, c.cssClasses.pips), m(g, 0 === c.ort ? c.cssClasses.pipsHorizontal : c.cssClasses.pipsVertical), Object.keys(a).forEach(function (b) {
        f(b, a[b])
      }), g
    }

    function C() {
      na && (b(na), na = null)
    }

    function D(a) {
      C();
      var b = a.mode,
        c = a.density || 1,
        d = a.filter || !1,
        e = a.values || !1,
        f = a.stepped || !1,
        g = z(b, e, f),
        h = A(c, b, g),
        i = a.format || {
          to: Math.round
        };
      return na = ra.appendChild(B(h, d, i))
    }

    function E() {
      var a = ja.getBoundingClientRect(),
        b = "offset" + ["Width", "Height"][c.ort];
      return 0 === c.ort ? a.width || ja[b] : a.height || ja[b]
    }

    function F(a, b, d, e) {
      var f = function (f) {
          return !!(f = G(f, e.pageOffset, e.target || b)) && (!(ra.hasAttribute("disabled") && !e.doNotReject) && (!(o(ra, c.cssClasses.tap) && !e.doNotReject) && (!(a === oa.start && void 0 !== f.buttons && f.buttons > 1) && ((!e.hover || !f.buttons) && (qa || f.preventDefault(), f.calcPoint = f.points[c.ort], void d(f, e))))))
        },
        g = [];
      return a.split(" ").forEach(function (a) {
        b.addEventListener(a, f, !!qa && {
          passive: !0
        }), g.push([a, f])
      }), g
    }

    function G(a, b, c) {
      var d, e, f = 0 === a.type.indexOf("touch"),
        g = 0 === a.type.indexOf("mouse"),
        h = 0 === a.type.indexOf("pointer");
      if (0 === a.type.indexOf("MSPointer") && (h = !0), f) {
        var i = function (a) {
          return a.target === c || c.contains(a.target)
        };
        if ("touchstart" === a.type) {
          var j = Array.prototype.filter.call(a.touches, i);
          if (j.length > 1) return !1;
          d = j[0].pageX, e = j[0].pageY
        } else {
          var k = Array.prototype.find.call(a.changedTouches, i);
          if (!k) return !1;
          d = k.pageX, e = k.pageY
        }
      }
      return b = b || p(ya), (g || h) && (d = a.clientX + b.x, e = a.clientY + b.y), a.pageOffset = b, a.points = [d, e], a.cursor = g || h, a
    }

    function H(a) {
      var b = a - g(ja, c.ort),
        d = 100 * b / E();
      return d = j(d), c.dir ? 100 - d : d
    }

    function I(a) {
      var b = 100,
        c = !1;
      return ka.forEach(function (d, e) {
        if (!d.hasAttribute("disabled")) {
          var f = Math.abs(sa[e] - a);
          (f < b || 100 === f && 100 === b) && (c = e, b = f)
        }
      }), c
    }

    function J(a, b) {
      "mouseout" === a.type && "HTML" === a.target.nodeName && null === a.relatedTarget && L(a, b)
    }

    function K(a, b) {
      if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === a.buttons && 0 !== b.buttonsProperty) return L(a, b);
      var d = (c.dir ? -1 : 1) * (a.calcPoint - b.startCalcPoint);
      W(d > 0, 100 * d / b.baseSize, b.locations, b.handleNumbers)
    }

    function L(a, b) {
      b.handle && (n(b.handle, c.cssClasses.active), ua -= 1), b.listeners.forEach(function (a) {
        za.removeEventListener(a[0], a[1])
      }), 0 === ua && (n(ra, c.cssClasses.drag), _(), a.cursor && (Aa.style.cursor = "", Aa.removeEventListener("selectstart", d))), b.handleNumbers.forEach(function (a) {
        S("change", a), S("set", a), S("end", a)
      })
    }

    function M(a, b) {
      var e;
      if (1 === b.handleNumbers.length) {
        var f = ka[b.handleNumbers[0]];
        if (f.hasAttribute("disabled")) return !1;
        e = f.children[0], ua += 1, m(e, c.cssClasses.active)
      }
      a.stopPropagation();
      var g = [],
        h = F(oa.move, za, K, {
          target: a.target,
          handle: e,
          listeners: g,
          startCalcPoint: a.calcPoint,
          baseSize: E(),
          pageOffset: a.pageOffset,
          handleNumbers: b.handleNumbers,
          buttonsProperty: a.buttons,
          locations: sa.slice()
        }),
        i = F(oa.end, za, L, {
          target: a.target,
          handle: e,
          listeners: g,
          doNotReject: !0,
          handleNumbers: b.handleNumbers
        }),
        j = F("mouseout", za, J, {
          target: a.target,
          handle: e,
          listeners: g,
          doNotReject: !0,
          handleNumbers: b.handleNumbers
        });
      g.push.apply(g, h.concat(i, j)), a.cursor && (Aa.style.cursor = getComputedStyle(a.target).cursor, ka.length > 1 && m(ra, c.cssClasses.drag), Aa.addEventListener("selectstart", d, !1)), b.handleNumbers.forEach(function (a) {
        S("start", a)
      })
    }

    function N(a) {
      a.stopPropagation();
      var b = H(a.calcPoint),
        d = I(b);
      if (!1 === d) return !1;
      c.events.snap || i(ra, c.cssClasses.tap, c.animationDuration), aa(d, b, !0, !0), _(), S("slide", d, !0), S("update", d, !0), S("change", d, !0), S("set", d, !0), c.events.snap && M(a, {
        handleNumbers: [d]
      })
    }

    function O(a) {
      var b = H(a.calcPoint),
        c = va.getStep(b),
        d = va.fromStepping(c);
      Object.keys(xa).forEach(function (a) {
        "hover" === a.split(".")[0] && xa[a].forEach(function (a) {
          a.call(ma, d)
        })
      })
    }

    function P(a) {
      a.fixed || ka.forEach(function (a, b) {
        F(oa.start, a.children[0], M, {
          handleNumbers: [b]
        })
      }), a.tap && F(oa.start, ja, N, {}), a.hover && F(oa.move, ja, O, {
        hover: !0
      }), a.drag && la.forEach(function (b, d) {
        if (!1 !== b && 0 !== d && d !== la.length - 1) {
          var e = ka[d - 1],
            f = ka[d],
            g = [b];
          m(b, c.cssClasses.draggable), a.fixed && (g.push(e.children[0]), g.push(f.children[0])), g.forEach(function (a) {
            F(oa.start, a, M, {
              handles: [e, f],
              handleNumbers: [d - 1, d]
            })
          })
        }
      })
    }

    function Q(a, b) {
      xa[a] = xa[a] || [], xa[a].push(b), "update" === a.split(".")[0] && ka.forEach(function (a, b) {
        S("update", b)
      })
    }

    function R(a) {
      var b = a && a.split(".")[0],
        c = b && a.substring(b.length);
      Object.keys(xa).forEach(function (a) {
        var d = a.split(".")[0],
          e = a.substring(d.length);
        b && b !== d || c && c !== e || delete xa[a]
      })
    }

    function S(a, b, d) {
      Object.keys(xa).forEach(function (e) {
        var f = e.split(".")[0];
        a === f && xa[e].forEach(function (a) {
          a.call(ma, wa.map(c.format.to), b, wa.slice(), d || !1, sa.slice())
        })
      })
    }

    function T(a) {
      return a + "%"
    }

    function U(a, b, d, e, f, g) {
      return ka.length > 1 && (e && b > 0 && (d = Math.max(d, a[b - 1] + c.margin)), f && b < ka.length - 1 && (d = Math.min(d, a[b + 1] - c.margin))), ka.length > 1 && c.limit && (e && b > 0 && (d = Math.min(d, a[b - 1] + c.limit)), f && b < ka.length - 1 && (d = Math.max(d, a[b + 1] - c.limit))), c.padding && (0 === b && (d = Math.max(d, c.padding[0])), b === ka.length - 1 && (d = Math.min(d, 100 - c.padding[1]))), d = va.getStep(d), !((d = j(d)) === a[b] && !g) && d
    }

    function V(a, b) {
      var d = c.ort;
      return (d ? b : a) + ", " + (d ? a : b)
    }

    function W(a, b, c, d) {
      var e = c.slice(),
        f = [!a, a],
        g = [a, !a];
      d = d.slice(), a && d.reverse(), d.length > 1 ? d.forEach(function (a, c) {
        var d = U(e, a, e[a] + b, f[c], g[c], !1);
        !1 === d ? b = 0 : (b = d - e[a], e[a] = d)
      }) : f = g = [!0];
      var h = !1;
      d.forEach(function (a, d) {
        h = aa(a, c[a] + b, f[d], g[d]) || h
      }), h && d.forEach(function (a) {
        S("update", a), S("slide", a)
      })
    }

    function Y(a, b) {
      return c.dir ? 100 - a - b : a
    }

    function Z(a, b) {
      sa[a] = b, wa[a] = va.fromStepping(b);
      var d = "translate(" + V(T(Y(b, 0) - Ba), "0") + ")";
      ka[a].style[c.transformRule] = d, ba(a), ba(a + 1)
    }

    function _() {
      ta.forEach(function (a) {
        var b = sa[a] > 50 ? -1 : 1,
          c = 3 + (ka.length + b * a);
        ka[a].style.zIndex = c
      })
    }

    function aa(a, b, c, d) {
      return !1 !== (b = U(sa, a, b, c, d, !1)) && (Z(a, b), !0)
    }

    function ba(a) {
      if (la[a]) {
        var b = 0,
          d = 100;
        0 !== a && (b = sa[a - 1]), a !== la.length - 1 && (d = sa[a]);
        var e = d - b,
          f = "translate(" + V(T(Y(b, e)), "0") + ")",
          g = "scale(" + V(e / 100, "1") + ")";
        la[a].style[c.transformRule] = f + " " + g
      }
    }

    function ca(a, b) {
      return null === a || !1 === a || void 0 === a ? sa[b] : ("number" == typeof a && (a = String(a)), a = c.format.from(a), a = va.toStepping(a), !1 === a || isNaN(a) ? sa[b] : a)
    }

    function da(a, b) {
      var d = k(a),
        e = void 0 === sa[0];
      b = void 0 === b || !!b, c.animate && !e && i(ra, c.cssClasses.tap, c.animationDuration), ta.forEach(function (a) {
        aa(a, ca(d[a], a), !0, !1)
      }), ta.forEach(function (a) {
        aa(a, sa[a], !0, !0)
      }), _(), ta.forEach(function (a) {
        S("update", a), null !== d[a] && b && S("set", a)
      })
    }

    function ea(a) {
      da(c.start, a)
    }

    function fa() {
      var a = wa.map(c.format.to);
      return 1 === a.length ? a[0] : a
    }

    function ga() {
      for (var a in c.cssClasses) c.cssClasses.hasOwnProperty(a) && n(ra, c.cssClasses[a]);
      for (; ra.firstChild;) ra.removeChild(ra.firstChild);
      delete ra.noUiSlider
    }

    function ha() {
      return sa.map(function (a, b) {
        var c = va.getNearbySteps(a),
          d = wa[b],
          e = c.thisStep.step,
          f = null;
        !1 !== e && d + e > c.stepAfter.startValue && (e = c.stepAfter.startValue - d), f = d > c.thisStep.startValue ? c.thisStep.step : !1 !== c.stepBefore.step && d - c.stepBefore.highestStep, 100 === a ? e = null : 0 === a && (f = null);
        var g = va.countStepDecimals();
        return null !== e && !1 !== e && (e = Number(e.toFixed(g))), null !== f && !1 !== f && (f = Number(f.toFixed(g))), [f, e]
      })
    }

    function ia(a, b) {
      var d = fa(),
        e = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format"];
      e.forEach(function (b) {
        void 0 !== a[b] && (f[b] = a[b])
      });
      var g = X(f);
      e.forEach(function (b) {
        void 0 !== a[b] && (c[b] = g[b])
      }), va = g.spectrum, c.margin = g.margin, c.limit = g.limit, c.padding = g.padding, c.pips && D(c.pips), sa = [], da(a.start || d, b)
    }
    var ja, ka, la, ma, na, oa = q(),
      pa = s(),
      qa = pa && r(),
      ra = a,
      sa = [],
      ta = [],
      ua = 0,
      va = c.spectrum,
      wa = [],
      xa = {},
      ya = a.ownerDocument,
      za = ya.documentElement,
      Aa = ya.body,
      Ba = "rtl" === ya.dir || 1 === c.ort ? 0 : 100;
    return v(ra), u(c.connect, ja), P(c.events), da(c.start), ma = {
      destroy: ga,
      steps: ha,
      on: Q,
      off: R,
      get: fa,
      set: da,
      reset: ea,
      __moveHandles: function (a, b, c) {
        W(a, b, sa, c)
      },
      options: f,
      updateOptions: ia,
      target: ra,
      removePips: C,
      pips: D
    }, c.pips && D(c.pips), c.tooltips && x(), y(), ma
  }

  function Z(a, b) {
    if (!a || !a.nodeName) throw new Error("noUiSlider (" + $ + "): create requires a single element, got: " + a);
    if (a.noUiSlider) throw new Error("noUiSlider (" + $ + "): Slider was already initialized.");
    var c = X(b, a),
      d = Y(a, c, b);
    return a.noUiSlider = d, d
  }
  var $ = "11.1.0";
  D.prototype.getMargin = function (a) {
    var b = this.xNumSteps[0];
    if (b && a / b % 1 != 0) throw new Error("noUiSlider (" + $ + "): 'limit', 'margin' and 'padding' must be divisible by step.");
    return 2 === this.xPct.length && u(this.xVal, a)
  }, D.prototype.toStepping = function (a) {
    return a = y(this.xVal, this.xPct, a)
  }, D.prototype.fromStepping = function (a) {
    return z(this.xVal, this.xPct, a)
  }, D.prototype.getStep = function (a) {
    return a = A(this.xPct, this.xSteps, this.snap, a)
  }, D.prototype.getNearbySteps = function (a) {
    var b = x(a, this.xPct);
    return {
      stepBefore: {
        startValue: this.xVal[b - 2],
        step: this.xNumSteps[b - 2],
        highestStep: this.xHighestCompleteStep[b - 2]
      },
      thisStep: {
        startValue: this.xVal[b - 1],
        step: this.xNumSteps[b - 1],
        highestStep: this.xHighestCompleteStep[b - 1]
      },
      stepAfter: {
        startValue: this.xVal[b - 0],
        step: this.xNumSteps[b - 0],
        highestStep: this.xHighestCompleteStep[b - 0]
      }
    }
  }, D.prototype.countStepDecimals = function () {
    var a = this.xNumSteps.map(l);
    return Math.max.apply(null, a)
  }, D.prototype.convert = function (a) {
    return this.getStep(this.toStepping(a))
  };
  var _ = {
    to: function (a) {
      return void 0 !== a && a.toFixed(2)
    },
    from: Number
  };
  return {
    version: $,
    create: Z
  }
});