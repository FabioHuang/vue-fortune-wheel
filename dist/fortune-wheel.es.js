import { ref as Ln, computed as Yt, defineComponent as ue, reactive as le, watch as ce, onMounted as fe, createElementBlock as he, openBlock as de, normalizeStyle as pe, unref as ge } from "vue";
const ye = 16, _e = 20;
function me(t) {
  const n = Ln({ width: 600 }), e = Yt(() => {
    if (typeof window < "u") {
      const o = window.innerWidth, a = Math.min(o, n.value.width) - _e, s = Math.min(o, n.value.width) + 120;
      return { width: a, height: s };
    }
    return { width: 600, height: 600 };
  }), r = Yt(() => t.data.length <= 4 ? ye : t.data.length <= 6 ? 12 : 10), i = Yt(() => ({
    width: `${e.value.width}px`,
    height: `${e.value.height}px`,
    fontSize: `${r.value}px`,
    margin: "0 auto"
  }));
  return { wheelSize: e, fontSize: r, wheelStyle: i };
}
var xe = { value: () => {
} };
function Pn() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new Mt(e);
}
function Mt(t) {
  this._ = t;
}
function ve(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
Mt.prototype = Pn.prototype = {
  constructor: Mt,
  on: function(t, n) {
    var e = this._, r = ve(t + "", e), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((i = (t = r[o]).type) && (i = we(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function") throw new Error("invalid callback: " + n);
    for (; ++o < a; )
      if (i = (t = r[o]).type) e[i] = _n(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = _n(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new Mt(t);
  },
  call: function(t, n) {
    if ((i = arguments.length - 2) > 0) for (var e = new Array(i), r = 0, i, o; r < i; ++r) e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function(t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, e);
  }
};
function we(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function _n(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = xe, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Zt = "http://www.w3.org/1999/xhtml";
const mn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Zt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ot(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), mn.hasOwnProperty(n) ? { space: mn[n], local: t } : t;
}
function $e(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === Zt && n.documentElement.namespaceURI === Zt ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function Ae(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Fn(t) {
  var n = Ot(t);
  return (n.local ? Ae : $e)(n);
}
function be() {
}
function an(t) {
  return t == null ? be : function() {
    return this.querySelector(t);
  };
}
function Me(t) {
  typeof t != "function" && (t = an(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], a = o.length, s = r[i] = new Array(a), l, c, u = 0; u < a; ++u)
      (l = o[u]) && (c = t.call(l, l.__data__, u, o)) && ("__data__" in l && (c.__data__ = l.__data__), s[u] = c);
  return new R(r, this._parents);
}
function Ne(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ke() {
  return [];
}
function On(t) {
  return t == null ? ke : function() {
    return this.querySelectorAll(t);
  };
}
function Se(t) {
  return function() {
    return Ne(t.apply(this, arguments));
  };
}
function Ee(t) {
  typeof t == "function" ? t = Se(t) : t = On(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var a = n[o], s = a.length, l, c = 0; c < s; ++c)
      (l = a[c]) && (r.push(t.call(l, l.__data__, c, a)), i.push(l));
  return new R(r, i);
}
function Dn(t) {
  return function() {
    return this.matches(t);
  };
}
function qn(t) {
  return function(n) {
    return n.matches(t);
  };
}
var Ce = Array.prototype.find;
function Te(t) {
  return function() {
    return Ce.call(this.children, t);
  };
}
function Re() {
  return this.firstElementChild;
}
function Ie(t) {
  return this.select(t == null ? Re : Te(typeof t == "function" ? t : qn(t)));
}
var Le = Array.prototype.filter;
function Pe() {
  return Array.from(this.children);
}
function Fe(t) {
  return function() {
    return Le.call(this.children, t);
  };
}
function Oe(t) {
  return this.selectAll(t == null ? Pe : Fe(typeof t == "function" ? t : qn(t)));
}
function De(t) {
  typeof t != "function" && (t = Dn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], a = o.length, s = r[i] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && s.push(l);
  return new R(r, this._parents);
}
function Hn(t) {
  return new Array(t.length);
}
function qe() {
  return new R(this._enter || this._groups.map(Hn), this._parents);
}
function Et(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
Et.prototype = {
  constructor: Et,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function He(t) {
  return function() {
    return t;
  };
}
function Xe(t, n, e, r, i, o) {
  for (var a = 0, s, l = n.length, c = o.length; a < c; ++a)
    (s = n[a]) ? (s.__data__ = o[a], r[a] = s) : e[a] = new Et(t, o[a]);
  for (; a < l; ++a)
    (s = n[a]) && (i[a] = s);
}
function Ve(t, n, e, r, i, o, a) {
  var s, l, c = /* @__PURE__ */ new Map(), u = n.length, h = o.length, f = new Array(u), d;
  for (s = 0; s < u; ++s)
    (l = n[s]) && (f[s] = d = a.call(l, l.__data__, s, n) + "", c.has(d) ? i[s] = l : c.set(d, l));
  for (s = 0; s < h; ++s)
    d = a.call(t, o[s], s, o) + "", (l = c.get(d)) ? (r[s] = l, l.__data__ = o[s], c.delete(d)) : e[s] = new Et(t, o[s]);
  for (s = 0; s < u; ++s)
    (l = n[s]) && c.get(f[s]) === l && (i[s] = l);
}
function Be(t) {
  return t.__data__;
}
function Ge(t, n) {
  if (!arguments.length) return Array.from(this, Be);
  var e = n ? Ve : Xe, r = this._parents, i = this._groups;
  typeof t != "function" && (t = He(t));
  for (var o = i.length, a = new Array(o), s = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var u = r[c], h = i[c], f = h.length, d = We(t.call(u, u && u.__data__, c, r)), p = d.length, g = s[c] = new Array(p), v = a[c] = new Array(p), _ = l[c] = new Array(f);
    e(u, h, g, v, _, d, n);
    for (var $ = 0, x = 0, m, A; $ < p; ++$)
      if (m = g[$]) {
        for ($ >= x && (x = $ + 1); !(A = v[x]) && ++x < p; ) ;
        m._next = A || null;
      }
  }
  return a = new R(a, r), a._enter = s, a._exit = l, a;
}
function We(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ye() {
  return new R(this._exit || this._groups.map(Hn), this._parents);
}
function ze(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function Ue(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, a = Math.min(i, o), s = new Array(i), l = 0; l < a; ++l)
    for (var c = e[l], u = r[l], h = c.length, f = s[l] = new Array(h), d, p = 0; p < h; ++p)
      (d = c[p] || u[p]) && (f[p] = d);
  for (; l < i; ++l)
    s[l] = e[l];
  return new R(s, this._parents);
}
function Ke() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Ze(t) {
  t || (t = Qe);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = e[o], s = a.length, l = i[o] = new Array(s), c, u = 0; u < s; ++u)
      (c = a[u]) && (l[u] = c);
    l.sort(n);
  }
  return new R(i, this._parents).order();
}
function Qe(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Je() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function je() {
  return Array.from(this);
}
function tr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function nr() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function er() {
  return !this.node();
}
function rr(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, a = i.length, s; o < a; ++o)
      (s = i[o]) && t.call(s, s.__data__, o, i);
  return this;
}
function ir(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function or(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ar(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function sr(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function ur(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function lr(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function cr(t, n) {
  var e = Ot(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? or : ir : typeof n == "function" ? e.local ? lr : ur : e.local ? sr : ar)(e, n));
}
function Xn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function fr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function hr(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function dr(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function pr(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? fr : typeof n == "function" ? dr : hr)(t, n, e ?? "")) : it(this.node(), t);
}
function it(t, n) {
  return t.style.getPropertyValue(n) || Xn(t).getComputedStyle(t, null).getPropertyValue(n);
}
function gr(t) {
  return function() {
    delete this[t];
  };
}
function yr(t, n) {
  return function() {
    this[t] = n;
  };
}
function _r(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function mr(t, n) {
  return arguments.length > 1 ? this.each((n == null ? gr : typeof n == "function" ? _r : yr)(t, n)) : this.node()[t];
}
function Vn(t) {
  return t.trim().split(/^|\s+/);
}
function sn(t) {
  return t.classList || new Bn(t);
}
function Bn(t) {
  this._node = t, this._names = Vn(t.getAttribute("class") || "");
}
Bn.prototype = {
  add: function(t) {
    var n = this._names.indexOf(t);
    n < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var n = this._names.indexOf(t);
    n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Gn(t, n) {
  for (var e = sn(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Wn(t, n) {
  for (var e = sn(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function xr(t) {
  return function() {
    Gn(this, t);
  };
}
function vr(t) {
  return function() {
    Wn(this, t);
  };
}
function wr(t, n) {
  return function() {
    (n.apply(this, arguments) ? Gn : Wn)(this, t);
  };
}
function $r(t, n) {
  var e = Vn(t + "");
  if (arguments.length < 2) {
    for (var r = sn(this.node()), i = -1, o = e.length; ++i < o; ) if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? wr : n ? xr : vr)(e, n));
}
function Ar() {
  this.textContent = "";
}
function br(t) {
  return function() {
    this.textContent = t;
  };
}
function Mr(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Nr(t) {
  return arguments.length ? this.each(t == null ? Ar : (typeof t == "function" ? Mr : br)(t)) : this.node().textContent;
}
function kr() {
  this.innerHTML = "";
}
function Sr(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Er(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Cr(t) {
  return arguments.length ? this.each(t == null ? kr : (typeof t == "function" ? Er : Sr)(t)) : this.node().innerHTML;
}
function Tr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Rr() {
  return this.each(Tr);
}
function Ir() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Lr() {
  return this.each(Ir);
}
function Pr(t) {
  var n = typeof t == "function" ? t : Fn(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Fr() {
  return null;
}
function Or(t, n) {
  var e = typeof t == "function" ? t : Fn(t), r = n == null ? Fr : typeof n == "function" ? n : an(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Dr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function qr() {
  return this.each(Dr);
}
function Hr() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Xr() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Vr(t) {
  return this.select(t ? Xr : Hr);
}
function Br(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Gr(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function Wr(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function Yr(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function zr(t, n, e) {
  return function() {
    var r = this.__on, i, o = Gr(n);
    if (r) {
      for (var a = 0, s = r.length; a < s; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = e), i.value = n;
          return;
        }
    }
    this.addEventListener(t.type, o, e), i = { type: t.type, name: t.name, value: n, listener: o, options: e }, r ? r.push(i) : this.__on = [i];
  };
}
function Ur(t, n, e) {
  var r = Wr(t + ""), i, o = r.length, a;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var l = 0, c = s.length, u; l < c; ++l)
        for (i = 0, u = s[l]; i < o; ++i)
          if ((a = r[i]).type === u.type && a.name === u.name)
            return u.value;
    }
    return;
  }
  for (s = n ? zr : Yr, i = 0; i < o; ++i) this.each(s(r[i], n, e));
  return this;
}
function Yn(t, n, e) {
  var r = Xn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function Kr(t, n) {
  return function() {
    return Yn(this, t, n);
  };
}
function Zr(t, n) {
  return function() {
    return Yn(this, t, n.apply(this, arguments));
  };
}
function Qr(t, n) {
  return this.each((typeof n == "function" ? Zr : Kr)(t, n));
}
function* Jr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var zn = [null];
function R(t, n) {
  this._groups = t, this._parents = n;
}
function pt() {
  return new R([[document.documentElement]], zn);
}
function jr() {
  return this;
}
R.prototype = pt.prototype = {
  constructor: R,
  select: Me,
  selectAll: Ee,
  selectChild: Ie,
  selectChildren: Oe,
  filter: De,
  data: Ge,
  enter: qe,
  exit: Ye,
  join: ze,
  merge: Ue,
  selection: jr,
  order: Ke,
  sort: Ze,
  call: Je,
  nodes: je,
  node: tr,
  size: nr,
  empty: er,
  each: rr,
  attr: cr,
  style: pr,
  property: mr,
  classed: $r,
  text: Nr,
  html: Cr,
  raise: Rr,
  lower: Lr,
  append: Pr,
  insert: Or,
  remove: qr,
  clone: Vr,
  datum: Br,
  on: Ur,
  dispatch: Qr,
  [Symbol.iterator]: Jr
};
function N(t) {
  return typeof t == "string" ? new R([[document.querySelector(t)]], [document.documentElement]) : new R([[t]], zn);
}
function un(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function Un(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function gt() {
}
var ct = 0.7, Ct = 1 / ct, rt = "\\s*([+-]?\\d+)\\s*", ft = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", X = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ti = /^#([0-9a-f]{3,8})$/, ni = new RegExp(`^rgb\\(${rt},${rt},${rt}\\)$`), ei = new RegExp(`^rgb\\(${X},${X},${X}\\)$`), ri = new RegExp(`^rgba\\(${rt},${rt},${rt},${ft}\\)$`), ii = new RegExp(`^rgba\\(${X},${X},${X},${ft}\\)$`), oi = new RegExp(`^hsl\\(${ft},${X},${X}\\)$`), ai = new RegExp(`^hsla\\(${ft},${X},${X},${ft}\\)$`), xn = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
un(gt, Q, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: vn,
  // Deprecated! Use color.formatHex.
  formatHex: vn,
  formatHex8: si,
  formatHsl: ui,
  formatRgb: wn,
  toString: wn
});
function vn() {
  return this.rgb().formatHex();
}
function si() {
  return this.rgb().formatHex8();
}
function ui() {
  return Kn(this).formatHsl();
}
function wn() {
  return this.rgb().formatRgb();
}
function Q(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = ti.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? $n(n) : e === 3 ? new C(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? wt(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? wt(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = ni.exec(t)) ? new C(n[1], n[2], n[3], 1) : (n = ei.exec(t)) ? new C(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = ri.exec(t)) ? wt(n[1], n[2], n[3], n[4]) : (n = ii.exec(t)) ? wt(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = oi.exec(t)) ? Mn(n[1], n[2] / 100, n[3] / 100, 1) : (n = ai.exec(t)) ? Mn(n[1], n[2] / 100, n[3] / 100, n[4]) : xn.hasOwnProperty(t) ? $n(xn[t]) : t === "transparent" ? new C(NaN, NaN, NaN, 0) : null;
}
function $n(t) {
  return new C(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function wt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new C(t, n, e, r);
}
function li(t) {
  return t instanceof gt || (t = Q(t)), t ? (t = t.rgb(), new C(t.r, t.g, t.b, t.opacity)) : new C();
}
function Qt(t, n, e, r) {
  return arguments.length === 1 ? li(t) : new C(t, n, e, r ?? 1);
}
function C(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
un(C, Qt, Un(gt, {
  brighter(t) {
    return t = t == null ? Ct : Math.pow(Ct, t), new C(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ct : Math.pow(ct, t), new C(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new C(Z(this.r), Z(this.g), Z(this.b), Tt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: An,
  // Deprecated! Use color.formatHex.
  formatHex: An,
  formatHex8: ci,
  formatRgb: bn,
  toString: bn
}));
function An() {
  return `#${K(this.r)}${K(this.g)}${K(this.b)}`;
}
function ci() {
  return `#${K(this.r)}${K(this.g)}${K(this.b)}${K((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function bn() {
  const t = Tt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Z(this.r)}, ${Z(this.g)}, ${Z(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Tt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Z(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function K(t) {
  return t = Z(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Mn(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new F(t, n, e, r);
}
function Kn(t) {
  if (t instanceof F) return new F(t.h, t.s, t.l, t.opacity);
  if (t instanceof gt || (t = Q(t)), !t) return new F();
  if (t instanceof F) return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), a = NaN, s = o - i, l = (o + i) / 2;
  return s ? (n === o ? a = (e - r) / s + (e < r) * 6 : e === o ? a = (r - n) / s + 2 : a = (n - e) / s + 4, s /= l < 0.5 ? o + i : 2 - o - i, a *= 60) : s = l > 0 && l < 1 ? 0 : a, new F(a, s, l, t.opacity);
}
function fi(t, n, e, r) {
  return arguments.length === 1 ? Kn(t) : new F(t, n, e, r ?? 1);
}
function F(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
un(F, fi, Un(gt, {
  brighter(t) {
    return t = t == null ? Ct : Math.pow(Ct, t), new F(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ct : Math.pow(ct, t), new F(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new C(
      zt(t >= 240 ? t - 240 : t + 120, i, r),
      zt(t, i, r),
      zt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new F(Nn(this.h), $t(this.s), $t(this.l), Tt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Tt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Nn(this.h)}, ${$t(this.s) * 100}%, ${$t(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Nn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function $t(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function zt(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const ln = (t) => () => t;
function hi(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function di(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function pi(t) {
  return (t = +t) == 1 ? Zn : function(n, e) {
    return e - n ? di(n, e, t) : ln(isNaN(n) ? e : n);
  };
}
function Zn(t, n) {
  var e = n - t;
  return e ? hi(t, e) : ln(isNaN(t) ? n : t);
}
const Rt = function t(n) {
  var e = pi(n);
  function r(i, o) {
    var a = e((i = Qt(i)).r, (o = Qt(o)).r), s = e(i.g, o.g), l = e(i.b, o.b), c = Zn(i.opacity, o.opacity);
    return function(u) {
      return i.r = a(u), i.g = s(u), i.b = l(u), i.opacity = c(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function gi(t, n) {
  n || (n = []);
  var e = t ? Math.min(n.length, t.length) : 0, r = n.slice(), i;
  return function(o) {
    for (i = 0; i < e; ++i) r[i] = t[i] * (1 - o) + n[i] * o;
    return r;
  };
}
function yi(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function _i(t, n) {
  var e = n ? n.length : 0, r = t ? Math.min(e, t.length) : 0, i = new Array(r), o = new Array(e), a;
  for (a = 0; a < r; ++a) i[a] = cn(t[a], n[a]);
  for (; a < e; ++a) o[a] = n[a];
  return function(s) {
    for (a = 0; a < r; ++a) o[a] = i[a](s);
    return o;
  };
}
function mi(t, n) {
  var e = /* @__PURE__ */ new Date();
  return t = +t, n = +n, function(r) {
    return e.setTime(t * (1 - r) + n * r), e;
  };
}
function H(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
function xi(t, n) {
  var e = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (n === null || typeof n != "object") && (n = {});
  for (i in n)
    i in t ? e[i] = cn(t[i], n[i]) : r[i] = n[i];
  return function(o) {
    for (i in e) r[i] = e[i](o);
    return r;
  };
}
var Jt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ut = new RegExp(Jt.source, "g");
function vi(t) {
  return function() {
    return t;
  };
}
function wi(t) {
  return function(n) {
    return t(n) + "";
  };
}
function Qn(t, n) {
  var e = Jt.lastIndex = Ut.lastIndex = 0, r, i, o, a = -1, s = [], l = [];
  for (t = t + "", n = n + ""; (r = Jt.exec(t)) && (i = Ut.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), s[a] ? s[a] += o : s[++a] = o), (r = r[0]) === (i = i[0]) ? s[a] ? s[a] += i : s[++a] = i : (s[++a] = null, l.push({ i: a, x: H(r, i) })), e = Ut.lastIndex;
  return e < n.length && (o = n.slice(e), s[a] ? s[a] += o : s[++a] = o), s.length < 2 ? l[0] ? wi(l[0].x) : vi(n) : (n = l.length, function(c) {
    for (var u = 0, h; u < n; ++u) s[(h = l[u]).i] = h.x(c);
    return s.join("");
  });
}
function cn(t, n) {
  var e = typeof n, r;
  return n == null || e === "boolean" ? ln(n) : (e === "number" ? H : e === "string" ? (r = Q(n)) ? (n = r, Rt) : Qn : n instanceof Q ? Rt : n instanceof Date ? mi : yi(n) ? gi : Array.isArray(n) ? _i : typeof n.valueOf != "function" && typeof n.toString != "function" || isNaN(n) ? xi : H)(t, n);
}
var kn = 180 / Math.PI, jt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Jn(t, n, e, r, i, o) {
  var a, s, l;
  return (a = Math.sqrt(t * t + n * n)) && (t /= a, n /= a), (l = t * e + n * r) && (e -= t * l, r -= n * l), (s = Math.sqrt(e * e + r * r)) && (e /= s, r /= s, l /= s), t * r < n * e && (t = -t, n = -n, l = -l, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * kn,
    skewX: Math.atan(l) * kn,
    scaleX: a,
    scaleY: s
  };
}
var At;
function $i(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? jt : Jn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Ai(t) {
  return t == null || (At || (At = document.createElementNS("http://www.w3.org/2000/svg", "g")), At.setAttribute("transform", t), !(t = At.transform.baseVal.consolidate())) ? jt : (t = t.matrix, Jn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function jn(t, n, e, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, u, h, f, d, p) {
    if (c !== h || u !== f) {
      var g = d.push("translate(", null, n, null, e);
      p.push({ i: g - 4, x: H(c, h) }, { i: g - 2, x: H(u, f) });
    } else (h || f) && d.push("translate(" + h + n + f + e);
  }
  function a(c, u, h, f) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: H(c, u) })) : u && h.push(i(h) + "rotate(" + u + r);
  }
  function s(c, u, h, f) {
    c !== u ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: H(c, u) }) : u && h.push(i(h) + "skewX(" + u + r);
  }
  function l(c, u, h, f, d, p) {
    if (c !== h || u !== f) {
      var g = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: H(c, h) }, { i: g - 2, x: H(u, f) });
    } else (h !== 1 || f !== 1) && d.push(i(d) + "scale(" + h + "," + f + ")");
  }
  return function(c, u) {
    var h = [], f = [];
    return c = t(c), u = t(u), o(c.translateX, c.translateY, u.translateX, u.translateY, h, f), a(c.rotate, u.rotate, h, f), s(c.skewX, u.skewX, h, f), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, h, f), c = u = null, function(d) {
      for (var p = -1, g = f.length, v; ++p < g; ) h[(v = f[p]).i] = v.x(d);
      return h.join("");
    };
  };
}
var bi = jn($i, "px, ", "px)", "deg)"), Mi = jn(Ai, ", ", ")", ")"), ot = 0, st = 0, at = 0, te = 1e3, It, ut, Lt = 0, J = 0, Dt = 0, ht = typeof performance == "object" && performance.now ? performance : Date, ne = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function fn() {
  return J || (ne(Ni), J = ht.now() + Dt);
}
function Ni() {
  J = 0;
}
function Pt() {
  this._call = this._time = this._next = null;
}
Pt.prototype = ee.prototype = {
  constructor: Pt,
  restart: function(t, n, e) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    e = (e == null ? fn() : +e) + (n == null ? 0 : +n), !this._next && ut !== this && (ut ? ut._next = this : It = this, ut = this), this._call = t, this._time = e, tn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, tn());
  }
};
function ee(t, n, e) {
  var r = new Pt();
  return r.restart(t, n, e), r;
}
function ki() {
  fn(), ++ot;
  for (var t = It, n; t; )
    (n = J - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --ot;
}
function Sn() {
  J = (Lt = ht.now()) + Dt, ot = st = 0;
  try {
    ki();
  } finally {
    ot = 0, Ei(), J = 0;
  }
}
function Si() {
  var t = ht.now(), n = t - Lt;
  n > te && (Dt -= n, Lt = t);
}
function Ei() {
  for (var t, n = It, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : It = e);
  ut = t, tn(r);
}
function tn(t) {
  if (!ot) {
    st && (st = clearTimeout(st));
    var n = t - J;
    n > 24 ? (t < 1 / 0 && (st = setTimeout(Sn, t - ht.now() - Dt)), at && (at = clearInterval(at))) : (at || (Lt = ht.now(), at = setInterval(Si, te)), ot = 1, ne(Sn));
  }
}
function En(t, n, e) {
  var r = new Pt();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var Ci = Pn("start", "end", "cancel", "interrupt"), Ti = [], re = 0, Cn = 1, nn = 2, Nt = 3, Tn = 4, en = 5, kt = 6;
function qt(t, n, e, r, i, o) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (e in a) return;
  Ri(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ci,
    tween: Ti,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: re
  });
}
function hn(t, n) {
  var e = O(t, n);
  if (e.state > re) throw new Error("too late; already scheduled");
  return e;
}
function V(t, n) {
  var e = O(t, n);
  if (e.state > Nt) throw new Error("too late; already running");
  return e;
}
function O(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ri(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = ee(o, 0, e.time);
  function o(c) {
    e.state = Cn, e.timer.restart(a, e.delay, e.time), e.delay <= c && a(c - e.delay);
  }
  function a(c) {
    var u, h, f, d;
    if (e.state !== Cn) return l();
    for (u in r)
      if (d = r[u], d.name === e.name) {
        if (d.state === Nt) return En(a);
        d.state === Tn ? (d.state = kt, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[u]) : +u < n && (d.state = kt, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[u]);
      }
    if (En(function() {
      e.state === Nt && (e.state = Tn, e.timer.restart(s, e.delay, e.time), s(c));
    }), e.state = nn, e.on.call("start", t, t.__data__, e.index, e.group), e.state === nn) {
      for (e.state = Nt, i = new Array(f = e.tween.length), u = 0, h = -1; u < f; ++u)
        (d = e.tween[u].value.call(t, t.__data__, e.index, e.group)) && (i[++h] = d);
      i.length = h + 1;
    }
  }
  function s(c) {
    for (var u = c < e.duration ? e.ease.call(null, c / e.duration) : (e.timer.restart(l), e.state = en, 1), h = -1, f = i.length; ++h < f; )
      i[h].call(t, u);
    e.state === en && (e.on.call("end", t, t.__data__, e.index, e.group), l());
  }
  function l() {
    e.state = kt, e.timer.stop(), delete r[n];
    for (var c in r) return;
    delete t.__transition;
  }
}
function Ii(t, n) {
  var e = t.__transition, r, i, o = !0, a;
  if (e) {
    n = n == null ? null : n + "";
    for (a in e) {
      if ((r = e[a]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > nn && r.state < en, r.state = kt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[a];
    }
    o && delete t.__transition;
  }
}
function Li(t) {
  return this.each(function() {
    Ii(this, t);
  });
}
function Pi(t, n) {
  var e, r;
  return function() {
    var i = V(this, t), o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var a = 0, s = r.length; a < s; ++a)
        if (r[a].name === n) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Fi(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function() {
    var o = V(this, t), a = o.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var s = { name: n, value: e }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === n) {
          i[l] = s;
          break;
        }
      l === c && i.push(s);
    }
    o.tween = i;
  };
}
function Oi(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = O(this.node(), e).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((n == null ? Pi : Fi)(e, t, n));
}
function dn(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = V(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return O(i, r).value[n];
  };
}
function ie(t, n) {
  var e;
  return (typeof n == "number" ? H : n instanceof Q ? Rt : (e = Q(n)) ? (n = e, Rt) : Qn)(t, n);
}
function Di(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function qi(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Hi(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = n(r = a, e);
  };
}
function Xi(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = n(r = a, e);
  };
}
function Vi(t, n, e) {
  var r, i, o;
  return function() {
    var a, s = e(this), l;
    return s == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), l = s + "", a === l ? null : a === r && l === i ? o : (i = l, o = n(r = a, s)));
  };
}
function Bi(t, n, e) {
  var r, i, o;
  return function() {
    var a, s = e(this), l;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), l = s + "", a === l ? null : a === r && l === i ? o : (i = l, o = n(r = a, s)));
  };
}
function Gi(t, n) {
  var e = Ot(t), r = e === "transform" ? Mi : ie;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Bi : Vi)(e, r, dn(this, "attr." + t, n)) : n == null ? (e.local ? qi : Di)(e) : (e.local ? Xi : Hi)(e, r, n));
}
function Wi(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Yi(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function zi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Yi(t, o)), e;
  }
  return i._value = n, i;
}
function Ui(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Wi(t, o)), e;
  }
  return i._value = n, i;
}
function Ki(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Ot(t);
  return this.tween(e, (r.local ? zi : Ui)(r, n));
}
function Zi(t, n) {
  return function() {
    hn(this, t).delay = +n.apply(this, arguments);
  };
}
function Qi(t, n) {
  return n = +n, function() {
    hn(this, t).delay = n;
  };
}
function Ji(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Zi : Qi)(n, t)) : O(this.node(), n).delay;
}
function ji(t, n) {
  return function() {
    V(this, t).duration = +n.apply(this, arguments);
  };
}
function to(t, n) {
  return n = +n, function() {
    V(this, t).duration = n;
  };
}
function no(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ji : to)(n, t)) : O(this.node(), n).duration;
}
function eo(t, n) {
  if (typeof n != "function") throw new Error();
  return function() {
    V(this, t).ease = n;
  };
}
function ro(t) {
  var n = this._id;
  return arguments.length ? this.each(eo(n, t)) : O(this.node(), n).ease;
}
function io(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    V(this, t).ease = e;
  };
}
function oo(t) {
  if (typeof t != "function") throw new Error();
  return this.each(io(this._id, t));
}
function ao(t) {
  typeof t != "function" && (t = Dn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], a = o.length, s = r[i] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && s.push(l);
  return new W(r, this._parents, this._name, this._id);
}
function so(t) {
  if (t._id !== this._id) throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
    for (var l = n[s], c = e[s], u = l.length, h = a[s] = new Array(u), f, d = 0; d < u; ++d)
      (f = l[d] || c[d]) && (h[d] = f);
  for (; s < r; ++s)
    a[s] = n[s];
  return new W(a, this._parents, this._name, this._id);
}
function uo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function lo(t, n, e) {
  var r, i, o = uo(n) ? hn : V;
  return function() {
    var a = o(this, t), s = a.on;
    s !== r && (i = (r = s).copy()).on(n, e), a.on = i;
  };
}
function co(t, n) {
  var e = this._id;
  return arguments.length < 2 ? O(this.node(), e).on.on(t) : this.each(lo(e, t, n));
}
function fo(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function ho() {
  return this.on("end.remove", fo(this._id));
}
function po(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = an(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var s = r[a], l = s.length, c = o[a] = new Array(l), u, h, f = 0; f < l; ++f)
      (u = s[f]) && (h = t.call(u, u.__data__, f, s)) && ("__data__" in u && (h.__data__ = u.__data__), c[f] = h, qt(c[f], n, e, f, c, O(u, e)));
  return new W(o, this._parents, n, e);
}
function go(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = On(t));
  for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++s)
    for (var l = r[s], c = l.length, u, h = 0; h < c; ++h)
      if (u = l[h]) {
        for (var f = t.call(u, u.__data__, h, l), d, p = O(u, e), g = 0, v = f.length; g < v; ++g)
          (d = f[g]) && qt(d, n, e, g, f, p);
        o.push(f), a.push(u);
      }
  return new W(o, a, n, e);
}
var yo = pt.prototype.constructor;
function _o() {
  return new yo(this._groups, this._parents);
}
function mo(t, n) {
  var e, r, i;
  return function() {
    var o = it(this, t), a = (this.style.removeProperty(t), it(this, t));
    return o === a ? null : o === e && a === r ? i : i = n(e = o, r = a);
  };
}
function oe(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xo(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var a = it(this, t);
    return a === i ? null : a === r ? o : o = n(r = a, e);
  };
}
function vo(t, n, e) {
  var r, i, o;
  return function() {
    var a = it(this, t), s = e(this), l = s + "";
    return s == null && (l = s = (this.style.removeProperty(t), it(this, t))), a === l ? null : a === r && l === i ? o : (i = l, o = n(r = a, s));
  };
}
function wo(t, n) {
  var e, r, i, o = "style." + n, a = "end." + o, s;
  return function() {
    var l = V(this, t), c = l.on, u = l.value[o] == null ? s || (s = oe(n)) : void 0;
    (c !== e || i !== u) && (r = (e = c).copy()).on(a, i = u), l.on = r;
  };
}
function $o(t, n, e) {
  var r = (t += "") == "transform" ? bi : ie;
  return n == null ? this.styleTween(t, mo(t, r)).on("end.style." + t, oe(t)) : typeof n == "function" ? this.styleTween(t, vo(t, r, dn(this, "style." + t, n))).each(wo(this._id, t)) : this.styleTween(t, xo(t, r, n), e).on("end.style." + t, null);
}
function Ao(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function bo(t, n, e) {
  var r, i;
  function o() {
    var a = n.apply(this, arguments);
    return a !== i && (r = (i = a) && Ao(t, a, e)), r;
  }
  return o._value = n, o;
}
function Mo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, bo(t, n, e ?? ""));
}
function No(t) {
  return function() {
    this.textContent = t;
  };
}
function ko(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function So(t) {
  return this.tween("text", typeof t == "function" ? ko(dn(this, "text", t)) : No(t == null ? "" : t + ""));
}
function Eo(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Co(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Eo(i)), n;
  }
  return r._value = t, r;
}
function To(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Co(t));
}
function Ro() {
  for (var t = this._name, n = this._id, e = ae(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, l, c = 0; c < s; ++c)
      if (l = a[c]) {
        var u = O(l, n);
        qt(l, t, e, c, a, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new W(r, this._parents, t, e);
}
function Io() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, a) {
    var s = { value: a }, l = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var c = V(this, r), u = c.on;
      u !== t && (n = (t = u).copy(), n._.cancel.push(s), n._.interrupt.push(s), n._.end.push(l)), c.on = n;
    }), i === 0 && o();
  });
}
var Lo = 0;
function W(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function ae() {
  return ++Lo;
}
var G = pt.prototype;
W.prototype = {
  constructor: W,
  select: po,
  selectAll: go,
  selectChild: G.selectChild,
  selectChildren: G.selectChildren,
  filter: ao,
  merge: so,
  selection: _o,
  transition: Ro,
  call: G.call,
  nodes: G.nodes,
  node: G.node,
  size: G.size,
  empty: G.empty,
  each: G.each,
  on: co,
  attr: Gi,
  attrTween: Ki,
  style: $o,
  styleTween: Mo,
  text: So,
  textTween: To,
  remove: ho,
  tween: Oi,
  delay: Ji,
  duration: no,
  ease: ro,
  easeVarying: oo,
  end: Io,
  [Symbol.iterator]: G[Symbol.iterator]
};
function Po(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var pn = 1.70158;
(function t(n) {
  n = +n;
  function e(r) {
    return (r = +r) * r * (n * (r - 1) + r);
  }
  return e.overshoot = t, e;
})(pn);
var Fo = function t(n) {
  n = +n;
  function e(r) {
    return --r * r * ((r + 1) * n + r) + 1;
  }
  return e.overshoot = t, e;
}(pn);
(function t(n) {
  n = +n;
  function e(r) {
    return ((r *= 2) < 1 ? r * r * ((n + 1) * r - n) : (r -= 2) * r * ((n + 1) * r + n) + 2) / 2;
  }
  return e.overshoot = t, e;
})(pn);
var Oo = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Po
};
function Do(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function qo(t) {
  var n, e;
  t instanceof W ? (n = t._id, t = t._name) : (n = ae(), (e = Oo).time = fn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, l, c = 0; c < s; ++c)
      (l = a[c]) && qt(l, t, n, c, a, e || Do(l, n));
  return new W(r, this._parents, t, n);
}
pt.prototype.interrupt = Li;
pt.prototype.transition = qo;
const rn = Math.PI, on = 2 * rn, U = 1e-6, Ho = on - U;
function se(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n)
    this._ += arguments[n] + t[n];
}
function Xo(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return se;
  const e = 10 ** n;
  return function(r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Vo {
  constructor(n) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = n == null ? se : Xo(n);
  }
  moveTo(n, e) {
    this._append`M${this._x0 = this._x1 = +n},${this._y0 = this._y1 = +e}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(n, e) {
    this._append`L${this._x1 = +n},${this._y1 = +e}`;
  }
  quadraticCurveTo(n, e, r, i) {
    this._append`Q${+n},${+e},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(n, e, r, i, o, a) {
    this._append`C${+n},${+e},${+r},${+i},${this._x1 = +o},${this._y1 = +a}`;
  }
  arcTo(n, e, r, i, o) {
    if (n = +n, e = +e, r = +r, i = +i, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let a = this._x1, s = this._y1, l = r - n, c = i - e, u = a - n, h = s - e, f = u * u + h * h;
    if (this._x1 === null)
      this._append`M${this._x1 = n},${this._y1 = e}`;
    else if (f > U) if (!(Math.abs(h * l - c * u) > U) || !o)
      this._append`L${this._x1 = n},${this._y1 = e}`;
    else {
      let d = r - a, p = i - s, g = l * l + c * c, v = d * d + p * p, _ = Math.sqrt(g), $ = Math.sqrt(f), x = o * Math.tan((rn - Math.acos((g + f - v) / (2 * _ * $))) / 2), m = x / $, A = x / _;
      Math.abs(m - 1) > U && this._append`L${n + m * u},${e + m * h}`, this._append`A${o},${o},0,0,${+(h * d > u * p)},${this._x1 = n + A * l},${this._y1 = e + A * c}`;
    }
  }
  arc(n, e, r, i, o, a) {
    if (n = +n, e = +e, r = +r, a = !!a, r < 0) throw new Error(`negative radius: ${r}`);
    let s = r * Math.cos(i), l = r * Math.sin(i), c = n + s, u = e + l, h = 1 ^ a, f = a ? i - o : o - i;
    this._x1 === null ? this._append`M${c},${u}` : (Math.abs(this._x1 - c) > U || Math.abs(this._y1 - u) > U) && this._append`L${c},${u}`, r && (f < 0 && (f = f % on + on), f > Ho ? this._append`A${r},${r},0,1,${h},${n - s},${e - l}A${r},${r},0,1,${h},${this._x1 = c},${this._y1 = u}` : f > U && this._append`A${r},${r},0,${+(f >= rn)},${h},${this._x1 = n + r * Math.cos(o)},${this._y1 = e + r * Math.sin(o)}`);
  }
  rect(n, e, r, i) {
    this._append`M${this._x0 = this._x1 = +n},${this._y0 = this._y1 = +e}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function k(t) {
  return function() {
    return t;
  };
}
const Rn = Math.abs, M = Math.atan2, z = Math.cos, Bo = Math.max, Kt = Math.min, q = Math.sin, et = Math.sqrt, E = 1e-12, dt = Math.PI, Ft = dt / 2, St = 2 * dt;
function Go(t) {
  return t > 1 ? 0 : t < -1 ? dt : Math.acos(t);
}
function In(t) {
  return t >= 1 ? Ft : t <= -1 ? -Ft : Math.asin(t);
}
function Wo(t) {
  let n = 3;
  return t.digits = function(e) {
    if (!arguments.length) return n;
    if (e == null)
      n = null;
    else {
      const r = Math.floor(e);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${e}`);
      n = r;
    }
    return t;
  }, () => new Vo(n);
}
function Yo(t) {
  return t.innerRadius;
}
function zo(t) {
  return t.outerRadius;
}
function Uo(t) {
  return t.startAngle;
}
function Ko(t) {
  return t.endAngle;
}
function Zo(t) {
  return t && t.padAngle;
}
function Qo(t, n, e, r, i, o, a, s) {
  var l = e - t, c = r - n, u = a - i, h = s - o, f = h * l - u * c;
  if (!(f * f < E))
    return f = (u * (n - o) - h * (t - i)) / f, [t + f * l, n + f * c];
}
function bt(t, n, e, r, i, o, a) {
  var s = t - e, l = n - r, c = (a ? o : -o) / et(s * s + l * l), u = c * l, h = -c * s, f = t + u, d = n + h, p = e + u, g = r + h, v = (f + p) / 2, _ = (d + g) / 2, $ = p - f, x = g - d, m = $ * $ + x * x, A = i - o, b = f * g - p * d, L = (x < 0 ? -1 : 1) * et(Bo(0, A * A * m - b * b)), P = (b * x - $ * L) / m, D = (-b * $ - x * L) / m, I = (b * x + $ * L) / m, T = (-b * $ + x * L) / m, S = P - v, y = D - _, w = I - v, Y = T - _;
  return S * S + y * y > w * w + Y * Y && (P = I, D = T), {
    cx: P,
    cy: D,
    x01: -u,
    y01: -h,
    x11: P * (i / A - 1),
    y11: D * (i / A - 1)
  };
}
function Jo() {
  var t = Yo, n = zo, e = k(0), r = null, i = Uo, o = Ko, a = Zo, s = null, l = Wo(c);
  function c() {
    var u, h, f = +t.apply(this, arguments), d = +n.apply(this, arguments), p = i.apply(this, arguments) - Ft, g = o.apply(this, arguments) - Ft, v = Rn(g - p), _ = g > p;
    if (s || (s = u = l()), d < f && (h = d, d = f, f = h), !(d > E)) s.moveTo(0, 0);
    else if (v > St - E)
      s.moveTo(d * z(p), d * q(p)), s.arc(0, 0, d, p, g, !_), f > E && (s.moveTo(f * z(g), f * q(g)), s.arc(0, 0, f, g, p, _));
    else {
      var $ = p, x = g, m = p, A = g, b = v, L = v, P = a.apply(this, arguments) / 2, D = P > E && (r ? +r.apply(this, arguments) : et(f * f + d * d)), I = Kt(Rn(d - f) / 2, +e.apply(this, arguments)), T = I, S = I, y, w;
      if (D > E) {
        var Y = In(D / f * q(P)), yt = In(D / d * q(P));
        (b -= Y * 2) > E ? (Y *= _ ? 1 : -1, m += Y, A -= Y) : (b = 0, m = A = (p + g) / 2), (L -= yt * 2) > E ? (yt *= _ ? 1 : -1, $ += yt, x -= yt) : (L = 0, $ = x = (p + g) / 2);
      }
      var j = d * z($), tt = d * q($), _t = f * z(A), mt = f * q(A);
      if (I > E) {
        var xt = d * z(x), vt = d * q(x), Ht = f * z(m), Xt = f * q(m), B;
        if (v < dt)
          if (B = Qo(j, tt, Ht, Xt, xt, vt, _t, mt)) {
            var Vt = j - B[0], Bt = tt - B[1], Gt = xt - B[0], Wt = vt - B[1], gn = 1 / q(Go((Vt * Gt + Bt * Wt) / (et(Vt * Vt + Bt * Bt) * et(Gt * Gt + Wt * Wt))) / 2), yn = et(B[0] * B[0] + B[1] * B[1]);
            T = Kt(I, (f - yn) / (gn - 1)), S = Kt(I, (d - yn) / (gn + 1));
          } else
            T = S = 0;
      }
      L > E ? S > E ? (y = bt(Ht, Xt, j, tt, d, S, _), w = bt(xt, vt, _t, mt, d, S, _), s.moveTo(y.cx + y.x01, y.cy + y.y01), S < I ? s.arc(y.cx, y.cy, S, M(y.y01, y.x01), M(w.y01, w.x01), !_) : (s.arc(y.cx, y.cy, S, M(y.y01, y.x01), M(y.y11, y.x11), !_), s.arc(0, 0, d, M(y.cy + y.y11, y.cx + y.x11), M(w.cy + w.y11, w.cx + w.x11), !_), s.arc(w.cx, w.cy, S, M(w.y11, w.x11), M(w.y01, w.x01), !_))) : (s.moveTo(j, tt), s.arc(0, 0, d, $, x, !_)) : s.moveTo(j, tt), !(f > E) || !(b > E) ? s.lineTo(_t, mt) : T > E ? (y = bt(_t, mt, xt, vt, f, -T, _), w = bt(j, tt, Ht, Xt, f, -T, _), s.lineTo(y.cx + y.x01, y.cy + y.y01), T < I ? s.arc(y.cx, y.cy, T, M(y.y01, y.x01), M(w.y01, w.x01), !_) : (s.arc(y.cx, y.cy, T, M(y.y01, y.x01), M(y.y11, y.x11), !_), s.arc(0, 0, f, M(y.cy + y.y11, y.cx + y.x11), M(w.cy + w.y11, w.cx + w.x11), _), s.arc(w.cx, w.cy, T, M(w.y11, w.x11), M(w.y01, w.x01), !_))) : s.arc(0, 0, f, A, m, _);
    }
    if (s.closePath(), u) return s = null, u + "" || null;
  }
  return c.centroid = function() {
    var u = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2, h = (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 - dt / 2;
    return [z(h) * u, q(h) * u];
  }, c.innerRadius = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : k(+u), c) : t;
  }, c.outerRadius = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : k(+u), c) : n;
  }, c.cornerRadius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : k(+u), c) : e;
  }, c.padRadius = function(u) {
    return arguments.length ? (r = u == null ? null : typeof u == "function" ? u : k(+u), c) : r;
  }, c.startAngle = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : k(+u), c) : i;
  }, c.endAngle = function(u) {
    return arguments.length ? (o = typeof u == "function" ? u : k(+u), c) : o;
  }, c.padAngle = function(u) {
    return arguments.length ? (a = typeof u == "function" ? u : k(+u), c) : a;
  }, c.context = function(u) {
    return arguments.length ? (s = u ?? null, c) : s;
  }, c;
}
function jo(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ta(t, n) {
  return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function na(t) {
  return t;
}
function ea() {
  var t = na, n = ta, e = null, r = k(0), i = k(St), o = k(0);
  function a(s) {
    var l, c = (s = jo(s)).length, u, h, f = 0, d = new Array(c), p = new Array(c), g = +r.apply(this, arguments), v = Math.min(St, Math.max(-St, i.apply(this, arguments) - g)), _, $ = Math.min(Math.abs(v) / c, o.apply(this, arguments)), x = $ * (v < 0 ? -1 : 1), m;
    for (l = 0; l < c; ++l)
      (m = p[d[l] = l] = +t(s[l], l, s)) > 0 && (f += m);
    for (n != null ? d.sort(function(A, b) {
      return n(p[A], p[b]);
    }) : e != null && d.sort(function(A, b) {
      return e(s[A], s[b]);
    }), l = 0, h = f ? (v - c * x) / f : 0; l < c; ++l, g = _)
      u = d[l], m = p[u], _ = g + (m > 0 ? m * h : 0) + x, p[u] = {
        data: s[u],
        index: l,
        value: m,
        startAngle: g,
        endAngle: _,
        padAngle: $
      };
    return p;
  }
  return a.value = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : k(+s), a) : t;
  }, a.sortValues = function(s) {
    return arguments.length ? (n = s, e = null, a) : n;
  }, a.sort = function(s) {
    return arguments.length ? (e = s, n = null, a) : e;
  }, a.startAngle = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : k(+s), a) : r;
  }, a.endAngle = function(s) {
    return arguments.length ? (i = typeof s == "function" ? s : k(+s), a) : i;
  }, a.padAngle = function(s) {
    return arguments.length ? (o = typeof s == "function" ? s : k(+s), a) : o;
  }, a;
}
function lt(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
lt.prototype = {
  constructor: lt,
  scale: function(t) {
    return t === 1 ? this : new lt(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new lt(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
lt.prototype;
function ra(t, n, e) {
  const r = () => {
    t.container && N(t.container).append("circle").attr("cx", 0).attr("cy", 0).attr("r", t.rayon / 2.5).attr("fill", "#ffffff").attr("filter", "url(#shadow)").attr("stroke-width", 4).attr("stroke", "#000000");
  }, i = () => {
    t.container && N(t.container).append("circle").attr("cx", 0).attr("cy", 0).attr("r", (e.value.width - 4) / 2).attr("fill", "transparent").attr("stroke-width", "32").attr("filter", "url(#shadow)").attr("stroke", "#ffffff");
  }, o = () => {
    if (!t.container || !n.imgParams) return;
    const { width: p, height: g, src: v } = n.imgParams;
    N(t.container).append("image").attr("x", -p / 2).attr("y", -g / 2).attr("width", p).attr("height", g).attr("href", v).attr("preserveAspectRatio", "xMidYMid meet");
  }, a = () => {
    if (!t.container) return;
    const p = "M 95.195 31.734 m 21.9 0 a 21.9 21.9 0 1 0 -43.8 0 L 95.195 96.625 L 117.095 31.734";
    t.arrow = N(t.container).append("path").attr("d", p).attr("stroke", "#000000").attr("fill", "#000000").attr("filter", "url(#shadow)").attr("transform", `matrix(1, 0, 0, 1, -95, -${e.value.height / 2 - 20})`).attr("stroke-linejoin", "round").attr("stroke-width", "4").node(), N(t.container).append("circle").attr("cx", 95.195).attr("cy", 31.734).attr("r", 6).attr("fill", "white").attr("transform", `matrix(1, 0, 0, 1, -95, -${e.value.height / 2 - 20})`);
  }, s = () => {
    var p;
    l(), c(), u(), h(), f(), n.middleCircle && r(), i(), (p = n.imgParams) != null && p.src && o(), a();
  }, l = () => {
    const p = N("#wheel").append("svg").attr("font-size", "16px").attr("height", "100%").attr("width", "100%").attr("viewBox", `0 0 ${e.value.width + 40} ${e.value.height}`).attr("aria-label", "Fortune Wheel");
    t.svg = p.append("g").attr("class", "wrapper").attr(
      "transform",
      `translate(${(e.value.width + 40) / 2}, ${e.value.height / 2})`
    ).node();
  }, c = () => {
    if (!t.svg) return;
    const g = N(t.svg).append("defs").append("filter").attr("id", "shadow").attr("x", "-100%").attr("y", "-100%").attr("width", "550%").attr("height", "550%");
    g.append("feOffset").attr("in", "SourceAlpha").attr("dx", 0).attr("dy", 0).attr("result", "offsetOut"), g.append("feGaussianBlur").attr("stdDeviation", "9").attr("in", "offsetOut").attr("result", "drop"), g.append("feColorMatrix").attr("in", "drop").attr("result", "color-out").attr("type", "matrix").attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"), g.append("feBlend").attr("in", "SourceGraphic").attr("in2", "color-out").attr("mode", "normal");
  }, u = () => {
    t.svg && (t.container = N(t.svg).append("g").attr("class", "wheelholder").node(), t.vis = N(t.container).append("g").node(), t.pieGenerator = ea().value(() => 1).padAngle(0.01).sort(null), t.arcGenerator = Jo().outerRadius(t.rayon).innerRadius(0));
  }, h = () => {
    if (!t.pieGenerator || !t.arcGenerator || !t.vis) return;
    const p = t.pieGenerator(n.data);
    N(t.vis).selectAll(".slice").data(p).join("path").attr("class", "slice").attr("d", t.arcGenerator).attr("stroke", "#ffffff").attr("stroke-width", "5").attr("fill", (v) => v.data.bgColor).each(function(v, _) {
      var m, A, b, L, P;
      let x = ((A = (m = /(^.+?)L/.exec(N(this).attr("d") || "")) == null ? void 0 : m[1]) == null ? void 0 : A.replace(/,/g, " ")) || "";
      if (v.endAngle > Math.PI / 2) {
        const D = /M(.*?)A/, I = /A(.*?)0 0 1/, S = ((b = /0 0 1 (.*?)$/.exec(x)) == null ? void 0 : b[1]) || "", y = ((L = D.exec(x)) == null ? void 0 : L[1]) || "", w = ((P = I.exec(x)) == null ? void 0 : P[1]) || "";
        x = `M${S}A${w}0 0 0${y}`;
      }
      N(t.vis).append("path").attr("class", "hiddenarcs").attr("id", `middleArc${_}`).attr("d", x).style("fill", "none");
    });
  }, f = () => {
    if (!t.pieGenerator || !t.vis || !t.arcGenerator) return;
    const p = t.pieGenerator(n.data);
    N(t.vis).selectAll(".middleArcText").data(p).join("text").attr("class", "middleArcText").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("font-size", "32px").attr("transform", (g) => {
      const v = (g.startAngle + g.endAngle) / 2, [_, $] = t.arcGenerator.centroid(g), x = v * (180 / Math.PI) + 90;
      return `translate(${_}, ${$}) rotate(${x})`;
    }).text((g) => g.data.value).attr("fill", (g) => g.data.color).attr("stroke", "rgb(0 0 0 / 10%)").attr("letter-spacing", "1px");
  };
  return { createWheel: s, redrawWheel: () => {
    N("#wheel").selectAll("*").remove(), s();
  } };
}
const nt = 360, ia = 5;
function oa(t, n, e) {
  const r = Ln(!1), i = (a) => n.data.length === 0 ? 0 : n.data.findIndex((s) => s.id === a) + 1;
  return { spin: async () => {
    if (!r.value) {
      r.value = !0;
      try {
        const a = n.data.length, s = nt / a, l = i(n.modelValue), c = nt - s * (l - 1), u = nt * ia, h = c + u;
        t.rotation = Math.round(h / s) * s;
        let f = Math.round(a - t.rotation % nt / s);
        f = f >= a ? f % a : f;
        const d = s + s / 2;
        t.rotation += d - Math.round(s * 2);
        const p = cn(0, t.rotation);
        t.vis && await N(t.vis).transition().duration(n.animDuration).ease(Fo.overshoot(0.3)).attrTween("transform", () => {
          const g = n.data.length, v = nt / g;
          return (_) => {
            const $ = p(_), x = $ % nt;
            let m = Math.round(g - x / v);
            m = m >= g ? m % g : m, m < 0 && (m += g);
            const A = n.data[m];
            return e("update", A), `rotate(${$})`;
          };
        }).end(), e("done", n.data[f]);
      } catch (a) {
        console.error("Error spinning the wheel:", a);
      } finally {
        r.value = !1;
      }
    }
  } };
}
const sa = /* @__PURE__ */ ue({
  __name: "FortuneWheel",
  props: {
    data: {},
    animDuration: { default: 6e3 },
    modelValue: { default: 0 },
    imgParams: { default: () => ({ src: "", width: 0, height: 0 }) },
    middleCircle: { type: Boolean, default: !0 }
  },
  emits: ["done", "update"],
  setup(t, { expose: n, emit: e }) {
    const r = t, i = e, { wheelSize: o, wheelStyle: a } = me(r), s = le({
      pieGenerator: null,
      arcGenerator: null,
      arrow: null,
      container: null,
      rayon: 0,
      rotation: 0,
      isSpinning: !1,
      svg: null,
      vis: null
    }), { createWheel: l, redrawWheel: c } = ra(s, r, o), { spin: u } = oa(s, r, i);
    return ce(() => r.data, c, { deep: !0 }), fe(() => {
      s.rayon = Math.min(o.value.width, o.value.height) / 2, l();
    }), n({ spin: u }), (h, f) => (de(), he("div", {
      id: "wheel",
      class: "wheel",
      style: pe(ge(a)),
      role: "img",
      "aria-label": "Fortune Wheel"
    }, null, 4));
  }
});
export {
  sa as FortuneWheel
};
