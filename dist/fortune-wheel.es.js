import { ref as Pn, computed as zt, defineComponent as le, reactive as ce, watch as fe, onMounted as he, createElementBlock as de, openBlock as pe, normalizeStyle as ge, unref as ye } from "vue";
const Yt = 40, _e = 20;
function me(t) {
  const n = Pn({ width: 600 }), e = zt(() => {
    if (typeof window < "u") {
      const a = window.innerWidth, o = Math.min(a, n.value.width) - _e, s = Math.min(a, n.value.width) + 120;
      return { width: o, height: s };
    }
    return { width: 600, height: 600 };
  }), r = zt(() => {
    const a = Math.max(...t.data.map((o) => o.value.length), 0);
    return a <= 10 ? Yt : a <= 20 ? (20 - a) * 2 + Yt / 4 : Yt / 8;
  }), i = zt(() => ({
    width: `${e.value.width}px`,
    height: `${e.value.height}px`,
    fontSize: `${r.value}px`,
    margin: "0 auto"
  }));
  return { wheelSize: e, fontSize: r, wheelStyle: i };
}
var xe = { value: () => {
} };
function Fn() {
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
Mt.prototype = Fn.prototype = {
  constructor: Mt,
  on: function(t, n) {
    var e = this._, r = ve(t + "", e), i, a = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++a < o; ) if ((i = (t = r[a]).type) && (i = we(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function") throw new Error("invalid callback: " + n);
    for (; ++a < o; )
      if (i = (t = r[a]).type) e[i] = mn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = mn(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new Mt(t);
  },
  call: function(t, n) {
    if ((i = arguments.length - 2) > 0) for (var e = new Array(i), r = 0, i, a; r < i; ++r) e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (a = this._[t], r = 0, i = a.length; r < i; ++r) a[r].value.apply(n, e);
  },
  apply: function(t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, a = r.length; i < a; ++i) r[i].value.apply(n, e);
  }
};
function we(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function mn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = xe, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Qt = "http://www.w3.org/1999/xhtml";
const xn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Qt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ot(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), xn.hasOwnProperty(n) ? { space: xn[n], local: t } : t;
}
function $e(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === Qt && n.documentElement.namespaceURI === Qt ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function Ae(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function On(t) {
  var n = Ot(t);
  return (n.local ? Ae : $e)(n);
}
function be() {
}
function sn(t) {
  return t == null ? be : function() {
    return this.querySelector(t);
  };
}
function Me(t) {
  typeof t != "function" && (t = sn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var a = n[i], o = a.length, s = r[i] = new Array(o), l, c, u = 0; u < o; ++u)
      (l = a[u]) && (c = t.call(l, l.__data__, u, a)) && ("__data__" in l && (c.__data__ = l.__data__), s[u] = c);
  return new T(r, this._parents);
}
function Ne(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ke() {
  return [];
}
function Dn(t) {
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
  typeof t == "function" ? t = Se(t) : t = Dn(t);
  for (var n = this._groups, e = n.length, r = [], i = [], a = 0; a < e; ++a)
    for (var o = n[a], s = o.length, l, c = 0; c < s; ++c)
      (l = o[c]) && (r.push(t.call(l, l.__data__, c, o)), i.push(l));
  return new T(r, i);
}
function qn(t) {
  return function() {
    return this.matches(t);
  };
}
function Hn(t) {
  return function(n) {
    return n.matches(t);
  };
}
var Re = Array.prototype.find;
function Ce(t) {
  return function() {
    return Re.call(this.children, t);
  };
}
function Te() {
  return this.firstElementChild;
}
function Ie(t) {
  return this.select(t == null ? Te : Ce(typeof t == "function" ? t : Hn(t)));
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
  return this.selectAll(t == null ? Pe : Fe(typeof t == "function" ? t : Hn(t)));
}
function De(t) {
  typeof t != "function" && (t = qn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var a = n[i], o = a.length, s = r[i] = [], l, c = 0; c < o; ++c)
      (l = a[c]) && t.call(l, l.__data__, c, a) && s.push(l);
  return new T(r, this._parents);
}
function Xn(t) {
  return new Array(t.length);
}
function qe() {
  return new T(this._enter || this._groups.map(Xn), this._parents);
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
function Xe(t, n, e, r, i, a) {
  for (var o = 0, s, l = n.length, c = a.length; o < c; ++o)
    (s = n[o]) ? (s.__data__ = a[o], r[o] = s) : e[o] = new Et(t, a[o]);
  for (; o < l; ++o)
    (s = n[o]) && (i[o] = s);
}
function Ve(t, n, e, r, i, a, o) {
  var s, l, c = /* @__PURE__ */ new Map(), u = n.length, h = a.length, f = new Array(u), d;
  for (s = 0; s < u; ++s)
    (l = n[s]) && (f[s] = d = o.call(l, l.__data__, s, n) + "", c.has(d) ? i[s] = l : c.set(d, l));
  for (s = 0; s < h; ++s)
    d = o.call(t, a[s], s, a) + "", (l = c.get(d)) ? (r[s] = l, l.__data__ = a[s], c.delete(d)) : e[s] = new Et(t, a[s]);
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
  for (var a = i.length, o = new Array(a), s = new Array(a), l = new Array(a), c = 0; c < a; ++c) {
    var u = r[c], h = i[c], f = h.length, d = We(t.call(u, u && u.__data__, c, r)), g = d.length, p = s[c] = new Array(g), x = o[c] = new Array(g), _ = l[c] = new Array(f);
    e(u, h, p, x, _, d, n);
    for (var w = 0, $ = 0, m, A; w < g; ++w)
      if (m = p[w]) {
        for (w >= $ && ($ = w + 1); !(A = x[$]) && ++$ < g; ) ;
        m._next = A || null;
      }
  }
  return o = new T(o, r), o._enter = s, o._exit = l, o;
}
function We(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ze() {
  return new T(this._exit || this._groups.map(Xn), this._parents);
}
function Ye(t, n, e) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? a.remove() : e(a), r && i ? r.merge(i).order() : i;
}
function Ue(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, a = r.length, o = Math.min(i, a), s = new Array(i), l = 0; l < o; ++l)
    for (var c = e[l], u = r[l], h = c.length, f = s[l] = new Array(h), d, g = 0; g < h; ++g)
      (d = c[g] || u[g]) && (f[g] = d);
  for (; l < i; ++l)
    s[l] = e[l];
  return new T(s, this._parents);
}
function Ke() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, a = r[i], o; --i >= 0; )
      (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function Ze(t) {
  t || (t = Qe);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var o = e[a], s = o.length, l = i[a] = new Array(s), c, u = 0; u < s; ++u)
      (c = o[u]) && (l[u] = c);
    l.sort(n);
  }
  return new T(i, this._parents).order();
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
    for (var r = t[n], i = 0, a = r.length; i < a; ++i) {
      var o = r[i];
      if (o) return o;
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
    for (var i = n[e], a = 0, o = i.length, s; a < o; ++a)
      (s = i[a]) && t.call(s, s.__data__, a, i);
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
function Vn(t) {
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
  return t.style.getPropertyValue(n) || Vn(t).getComputedStyle(t, null).getPropertyValue(n);
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
function Bn(t) {
  return t.trim().split(/^|\s+/);
}
function un(t) {
  return t.classList || new Gn(t);
}
function Gn(t) {
  this._node = t, this._names = Bn(t.getAttribute("class") || "");
}
Gn.prototype = {
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
function Wn(t, n) {
  for (var e = un(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function zn(t, n) {
  for (var e = un(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function xr(t) {
  return function() {
    Wn(this, t);
  };
}
function vr(t) {
  return function() {
    zn(this, t);
  };
}
function wr(t, n) {
  return function() {
    (n.apply(this, arguments) ? Wn : zn)(this, t);
  };
}
function $r(t, n) {
  var e = Bn(t + "");
  if (arguments.length < 2) {
    for (var r = un(this.node()), i = -1, a = e.length; ++i < a; ) if (!r.contains(e[i])) return !1;
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
function Rr(t) {
  return arguments.length ? this.each(t == null ? kr : (typeof t == "function" ? Er : Sr)(t)) : this.node().innerHTML;
}
function Cr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Tr() {
  return this.each(Cr);
}
function Ir() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Lr() {
  return this.each(Ir);
}
function Pr(t) {
  var n = typeof t == "function" ? t : On(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Fr() {
  return null;
}
function Or(t, n) {
  var e = typeof t == "function" ? t : On(t), r = n == null ? Fr : typeof n == "function" ? n : sn(n);
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
function zr(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, a; e < i; ++e)
        a = n[e], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : n[++r] = a;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function Yr(t, n, e) {
  return function() {
    var r = this.__on, i, a = Gr(n);
    if (r) {
      for (var o = 0, s = r.length; o < s; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = e), i.value = n;
          return;
        }
    }
    this.addEventListener(t.type, a, e), i = { type: t.type, name: t.name, value: n, listener: a, options: e }, r ? r.push(i) : this.__on = [i];
  };
}
function Ur(t, n, e) {
  var r = Wr(t + ""), i, a = r.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var l = 0, c = s.length, u; l < c; ++l)
        for (i = 0, u = s[l]; i < a; ++i)
          if ((o = r[i]).type === u.type && o.name === u.name)
            return u.value;
    }
    return;
  }
  for (s = n ? Yr : zr, i = 0; i < a; ++i) this.each(s(r[i], n, e));
  return this;
}
function Yn(t, n, e) {
  var r = Vn(t), i = r.CustomEvent;
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
    for (var r = t[n], i = 0, a = r.length, o; i < a; ++i)
      (o = r[i]) && (yield o);
}
var Un = [null];
function T(t, n) {
  this._groups = t, this._parents = n;
}
function pt() {
  return new T([[document.documentElement]], Un);
}
function jr() {
  return this;
}
T.prototype = pt.prototype = {
  constructor: T,
  select: Me,
  selectAll: Ee,
  selectChild: Ie,
  selectChildren: Oe,
  filter: De,
  data: Ge,
  enter: qe,
  exit: ze,
  join: Ye,
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
  html: Rr,
  raise: Tr,
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
  return typeof t == "string" ? new T([[document.querySelector(t)]], [document.documentElement]) : new T([[t]], Un);
}
function ln(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function Kn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function gt() {
}
var ct = 0.7, Rt = 1 / ct, rt = "\\s*([+-]?\\d+)\\s*", ft = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", X = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ti = /^#([0-9a-f]{3,8})$/, ni = new RegExp(`^rgb\\(${rt},${rt},${rt}\\)$`), ei = new RegExp(`^rgb\\(${X},${X},${X}\\)$`), ri = new RegExp(`^rgba\\(${rt},${rt},${rt},${ft}\\)$`), ii = new RegExp(`^rgba\\(${X},${X},${X},${ft}\\)$`), oi = new RegExp(`^hsl\\(${ft},${X},${X}\\)$`), ai = new RegExp(`^hsla\\(${ft},${X},${X},${ft}\\)$`), vn = {
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
ln(gt, Q, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: wn,
  // Deprecated! Use color.formatHex.
  formatHex: wn,
  formatHex8: si,
  formatHsl: ui,
  formatRgb: $n,
  toString: $n
});
function wn() {
  return this.rgb().formatHex();
}
function si() {
  return this.rgb().formatHex8();
}
function ui() {
  return Zn(this).formatHsl();
}
function $n() {
  return this.rgb().formatRgb();
}
function Q(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = ti.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? An(n) : e === 3 ? new R(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? wt(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? wt(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = ni.exec(t)) ? new R(n[1], n[2], n[3], 1) : (n = ei.exec(t)) ? new R(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = ri.exec(t)) ? wt(n[1], n[2], n[3], n[4]) : (n = ii.exec(t)) ? wt(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = oi.exec(t)) ? Nn(n[1], n[2] / 100, n[3] / 100, 1) : (n = ai.exec(t)) ? Nn(n[1], n[2] / 100, n[3] / 100, n[4]) : vn.hasOwnProperty(t) ? An(vn[t]) : t === "transparent" ? new R(NaN, NaN, NaN, 0) : null;
}
function An(t) {
  return new R(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function wt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new R(t, n, e, r);
}
function li(t) {
  return t instanceof gt || (t = Q(t)), t ? (t = t.rgb(), new R(t.r, t.g, t.b, t.opacity)) : new R();
}
function Jt(t, n, e, r) {
  return arguments.length === 1 ? li(t) : new R(t, n, e, r ?? 1);
}
function R(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
ln(R, Jt, Kn(gt, {
  brighter(t) {
    return t = t == null ? Rt : Math.pow(Rt, t), new R(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ct : Math.pow(ct, t), new R(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new R(Z(this.r), Z(this.g), Z(this.b), Ct(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: bn,
  // Deprecated! Use color.formatHex.
  formatHex: bn,
  formatHex8: ci,
  formatRgb: Mn,
  toString: Mn
}));
function bn() {
  return `#${K(this.r)}${K(this.g)}${K(this.b)}`;
}
function ci() {
  return `#${K(this.r)}${K(this.g)}${K(this.b)}${K((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mn() {
  const t = Ct(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Z(this.r)}, ${Z(this.g)}, ${Z(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Ct(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Z(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function K(t) {
  return t = Z(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Nn(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new O(t, n, e, r);
}
function Zn(t) {
  if (t instanceof O) return new O(t.h, t.s, t.l, t.opacity);
  if (t instanceof gt || (t = Q(t)), !t) return new O();
  if (t instanceof O) return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), a = Math.max(n, e, r), o = NaN, s = a - i, l = (a + i) / 2;
  return s ? (n === a ? o = (e - r) / s + (e < r) * 6 : e === a ? o = (r - n) / s + 2 : o = (n - e) / s + 4, s /= l < 0.5 ? a + i : 2 - a - i, o *= 60) : s = l > 0 && l < 1 ? 0 : o, new O(o, s, l, t.opacity);
}
function fi(t, n, e, r) {
  return arguments.length === 1 ? Zn(t) : new O(t, n, e, r ?? 1);
}
function O(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
ln(O, fi, Kn(gt, {
  brighter(t) {
    return t = t == null ? Rt : Math.pow(Rt, t), new O(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ct : Math.pow(ct, t), new O(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new R(
      Ut(t >= 240 ? t - 240 : t + 120, i, r),
      Ut(t, i, r),
      Ut(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new O(kn(this.h), $t(this.s), $t(this.l), Ct(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Ct(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${kn(this.h)}, ${$t(this.s) * 100}%, ${$t(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function kn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function $t(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ut(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const cn = (t) => () => t;
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
  return (t = +t) == 1 ? Qn : function(n, e) {
    return e - n ? di(n, e, t) : cn(isNaN(n) ? e : n);
  };
}
function Qn(t, n) {
  var e = n - t;
  return e ? hi(t, e) : cn(isNaN(t) ? n : t);
}
const Tt = function t(n) {
  var e = pi(n);
  function r(i, a) {
    var o = e((i = Jt(i)).r, (a = Jt(a)).r), s = e(i.g, a.g), l = e(i.b, a.b), c = Qn(i.opacity, a.opacity);
    return function(u) {
      return i.r = o(u), i.g = s(u), i.b = l(u), i.opacity = c(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function gi(t, n) {
  n || (n = []);
  var e = t ? Math.min(n.length, t.length) : 0, r = n.slice(), i;
  return function(a) {
    for (i = 0; i < e; ++i) r[i] = t[i] * (1 - a) + n[i] * a;
    return r;
  };
}
function yi(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function _i(t, n) {
  var e = n ? n.length : 0, r = t ? Math.min(e, t.length) : 0, i = new Array(r), a = new Array(e), o;
  for (o = 0; o < r; ++o) i[o] = fn(t[o], n[o]);
  for (; o < e; ++o) a[o] = n[o];
  return function(s) {
    for (o = 0; o < r; ++o) a[o] = i[o](s);
    return a;
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
    i in t ? e[i] = fn(t[i], n[i]) : r[i] = n[i];
  return function(a) {
    for (i in e) r[i] = e[i](a);
    return r;
  };
}
var jt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Kt = new RegExp(jt.source, "g");
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
function Jn(t, n) {
  var e = jt.lastIndex = Kt.lastIndex = 0, r, i, a, o = -1, s = [], l = [];
  for (t = t + "", n = n + ""; (r = jt.exec(t)) && (i = Kt.exec(n)); )
    (a = i.index) > e && (a = n.slice(e, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, l.push({ i: o, x: H(r, i) })), e = Kt.lastIndex;
  return e < n.length && (a = n.slice(e), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? l[0] ? wi(l[0].x) : vi(n) : (n = l.length, function(c) {
    for (var u = 0, h; u < n; ++u) s[(h = l[u]).i] = h.x(c);
    return s.join("");
  });
}
function fn(t, n) {
  var e = typeof n, r;
  return n == null || e === "boolean" ? cn(n) : (e === "number" ? H : e === "string" ? (r = Q(n)) ? (n = r, Tt) : Jn : n instanceof Q ? Tt : n instanceof Date ? mi : yi(n) ? gi : Array.isArray(n) ? _i : typeof n.valueOf != "function" && typeof n.toString != "function" || isNaN(n) ? xi : H)(t, n);
}
var Sn = 180 / Math.PI, tn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function jn(t, n, e, r, i, a) {
  var o, s, l;
  return (o = Math.sqrt(t * t + n * n)) && (t /= o, n /= o), (l = t * e + n * r) && (e -= t * l, r -= n * l), (s = Math.sqrt(e * e + r * r)) && (e /= s, r /= s, l /= s), t * r < n * e && (t = -t, n = -n, l = -l, o = -o), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(n, t) * Sn,
    skewX: Math.atan(l) * Sn,
    scaleX: o,
    scaleY: s
  };
}
var At;
function $i(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? tn : jn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Ai(t) {
  return t == null || (At || (At = document.createElementNS("http://www.w3.org/2000/svg", "g")), At.setAttribute("transform", t), !(t = At.transform.baseVal.consolidate())) ? tn : (t = t.matrix, jn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function te(t, n, e, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function a(c, u, h, f, d, g) {
    if (c !== h || u !== f) {
      var p = d.push("translate(", null, n, null, e);
      g.push({ i: p - 4, x: H(c, h) }, { i: p - 2, x: H(u, f) });
    } else (h || f) && d.push("translate(" + h + n + f + e);
  }
  function o(c, u, h, f) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: H(c, u) })) : u && h.push(i(h) + "rotate(" + u + r);
  }
  function s(c, u, h, f) {
    c !== u ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: H(c, u) }) : u && h.push(i(h) + "skewX(" + u + r);
  }
  function l(c, u, h, f, d, g) {
    if (c !== h || u !== f) {
      var p = d.push(i(d) + "scale(", null, ",", null, ")");
      g.push({ i: p - 4, x: H(c, h) }, { i: p - 2, x: H(u, f) });
    } else (h !== 1 || f !== 1) && d.push(i(d) + "scale(" + h + "," + f + ")");
  }
  return function(c, u) {
    var h = [], f = [];
    return c = t(c), u = t(u), a(c.translateX, c.translateY, u.translateX, u.translateY, h, f), o(c.rotate, u.rotate, h, f), s(c.skewX, u.skewX, h, f), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, h, f), c = u = null, function(d) {
      for (var g = -1, p = f.length, x; ++g < p; ) h[(x = f[g]).i] = x.x(d);
      return h.join("");
    };
  };
}
var bi = te($i, "px, ", "px)", "deg)"), Mi = te(Ai, ", ", ")", ")"), ot = 0, st = 0, at = 0, ne = 1e3, It, ut, Lt = 0, J = 0, Dt = 0, ht = typeof performance == "object" && performance.now ? performance : Date, ee = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function hn() {
  return J || (ee(Ni), J = ht.now() + Dt);
}
function Ni() {
  J = 0;
}
function Pt() {
  this._call = this._time = this._next = null;
}
Pt.prototype = re.prototype = {
  constructor: Pt,
  restart: function(t, n, e) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    e = (e == null ? hn() : +e) + (n == null ? 0 : +n), !this._next && ut !== this && (ut ? ut._next = this : It = this, ut = this), this._call = t, this._time = e, nn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, nn());
  }
};
function re(t, n, e) {
  var r = new Pt();
  return r.restart(t, n, e), r;
}
function ki() {
  hn(), ++ot;
  for (var t = It, n; t; )
    (n = J - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --ot;
}
function En() {
  J = (Lt = ht.now()) + Dt, ot = st = 0;
  try {
    ki();
  } finally {
    ot = 0, Ei(), J = 0;
  }
}
function Si() {
  var t = ht.now(), n = t - Lt;
  n > ne && (Dt -= n, Lt = t);
}
function Ei() {
  for (var t, n = It, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : It = e);
  ut = t, nn(r);
}
function nn(t) {
  if (!ot) {
    st && (st = clearTimeout(st));
    var n = t - J;
    n > 24 ? (t < 1 / 0 && (st = setTimeout(En, t - ht.now() - Dt)), at && (at = clearInterval(at))) : (at || (Lt = ht.now(), at = setInterval(Si, ne)), ot = 1, ee(En));
  }
}
function Rn(t, n, e) {
  var r = new Pt();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var Ri = Fn("start", "end", "cancel", "interrupt"), Ci = [], ie = 0, Cn = 1, en = 2, Nt = 3, Tn = 4, rn = 5, kt = 6;
function qt(t, n, e, r, i, a) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (e in o) return;
  Ti(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ri,
    tween: Ci,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: ie
  });
}
function dn(t, n) {
  var e = D(t, n);
  if (e.state > ie) throw new Error("too late; already scheduled");
  return e;
}
function V(t, n) {
  var e = D(t, n);
  if (e.state > Nt) throw new Error("too late; already running");
  return e;
}
function D(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ti(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = re(a, 0, e.time);
  function a(c) {
    e.state = Cn, e.timer.restart(o, e.delay, e.time), e.delay <= c && o(c - e.delay);
  }
  function o(c) {
    var u, h, f, d;
    if (e.state !== Cn) return l();
    for (u in r)
      if (d = r[u], d.name === e.name) {
        if (d.state === Nt) return Rn(o);
        d.state === Tn ? (d.state = kt, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[u]) : +u < n && (d.state = kt, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[u]);
      }
    if (Rn(function() {
      e.state === Nt && (e.state = Tn, e.timer.restart(s, e.delay, e.time), s(c));
    }), e.state = en, e.on.call("start", t, t.__data__, e.index, e.group), e.state === en) {
      for (e.state = Nt, i = new Array(f = e.tween.length), u = 0, h = -1; u < f; ++u)
        (d = e.tween[u].value.call(t, t.__data__, e.index, e.group)) && (i[++h] = d);
      i.length = h + 1;
    }
  }
  function s(c) {
    for (var u = c < e.duration ? e.ease.call(null, c / e.duration) : (e.timer.restart(l), e.state = rn, 1), h = -1, f = i.length; ++h < f; )
      i[h].call(t, u);
    e.state === rn && (e.on.call("end", t, t.__data__, e.index, e.group), l());
  }
  function l() {
    e.state = kt, e.timer.stop(), delete r[n];
    for (var c in r) return;
    delete t.__transition;
  }
}
function Ii(t, n) {
  var e = t.__transition, r, i, a = !0, o;
  if (e) {
    n = n == null ? null : n + "";
    for (o in e) {
      if ((r = e[o]).name !== n) {
        a = !1;
        continue;
      }
      i = r.state > en && r.state < rn, r.state = kt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[o];
    }
    a && delete t.__transition;
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
    var i = V(this, t), a = i.tween;
    if (a !== e) {
      r = e = a;
      for (var o = 0, s = r.length; o < s; ++o)
        if (r[o].name === n) {
          r = r.slice(), r.splice(o, 1);
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
    var a = V(this, t), o = a.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var s = { name: n, value: e }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === n) {
          i[l] = s;
          break;
        }
      l === c && i.push(s);
    }
    a.tween = i;
  };
}
function Oi(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = D(this.node(), e).tween, i = 0, a = r.length, o; i < a; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((n == null ? Pi : Fi)(e, t, n));
}
function pn(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = V(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return D(i, r).value[n];
  };
}
function oe(t, n) {
  var e;
  return (typeof n == "number" ? H : n instanceof Q ? Tt : (e = Q(n)) ? (n = e, Tt) : Jn)(t, n);
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
  var r, i = e + "", a;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? a : a = n(r = o, e);
  };
}
function Xi(t, n, e) {
  var r, i = e + "", a;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? a : a = n(r = o, e);
  };
}
function Vi(t, n, e) {
  var r, i, a;
  return function() {
    var o, s = e(this), l;
    return s == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), l = s + "", o === l ? null : o === r && l === i ? a : (i = l, a = n(r = o, s)));
  };
}
function Bi(t, n, e) {
  var r, i, a;
  return function() {
    var o, s = e(this), l;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), l = s + "", o === l ? null : o === r && l === i ? a : (i = l, a = n(r = o, s)));
  };
}
function Gi(t, n) {
  var e = Ot(t), r = e === "transform" ? Mi : oe;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Bi : Vi)(e, r, pn(this, "attr." + t, n)) : n == null ? (e.local ? qi : Di)(e) : (e.local ? Xi : Hi)(e, r, n));
}
function Wi(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function zi(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Yi(t, n) {
  var e, r;
  function i() {
    var a = n.apply(this, arguments);
    return a !== r && (e = (r = a) && zi(t, a)), e;
  }
  return i._value = n, i;
}
function Ui(t, n) {
  var e, r;
  function i() {
    var a = n.apply(this, arguments);
    return a !== r && (e = (r = a) && Wi(t, a)), e;
  }
  return i._value = n, i;
}
function Ki(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Ot(t);
  return this.tween(e, (r.local ? Yi : Ui)(r, n));
}
function Zi(t, n) {
  return function() {
    dn(this, t).delay = +n.apply(this, arguments);
  };
}
function Qi(t, n) {
  return n = +n, function() {
    dn(this, t).delay = n;
  };
}
function Ji(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Zi : Qi)(n, t)) : D(this.node(), n).delay;
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
  return arguments.length ? this.each((typeof t == "function" ? ji : to)(n, t)) : D(this.node(), n).duration;
}
function eo(t, n) {
  if (typeof n != "function") throw new Error();
  return function() {
    V(this, t).ease = n;
  };
}
function ro(t) {
  var n = this._id;
  return arguments.length ? this.each(eo(n, t)) : D(this.node(), n).ease;
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
  typeof t != "function" && (t = qn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var a = n[i], o = a.length, s = r[i] = [], l, c = 0; c < o; ++c)
      (l = a[c]) && t.call(l, l.__data__, c, a) && s.push(l);
  return new z(r, this._parents, this._name, this._id);
}
function so(t) {
  if (t._id !== this._id) throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, a = Math.min(r, i), o = new Array(r), s = 0; s < a; ++s)
    for (var l = n[s], c = e[s], u = l.length, h = o[s] = new Array(u), f, d = 0; d < u; ++d)
      (f = l[d] || c[d]) && (h[d] = f);
  for (; s < r; ++s)
    o[s] = n[s];
  return new z(o, this._parents, this._name, this._id);
}
function uo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function lo(t, n, e) {
  var r, i, a = uo(n) ? dn : V;
  return function() {
    var o = a(this, t), s = o.on;
    s !== r && (i = (r = s).copy()).on(n, e), o.on = i;
  };
}
function co(t, n) {
  var e = this._id;
  return arguments.length < 2 ? D(this.node(), e).on.on(t) : this.each(lo(e, t, n));
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
  typeof t != "function" && (t = sn(t));
  for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, c = a[o] = new Array(l), u, h, f = 0; f < l; ++f)
      (u = s[f]) && (h = t.call(u, u.__data__, f, s)) && ("__data__" in u && (h.__data__ = u.__data__), c[f] = h, qt(c[f], n, e, f, c, D(u, e)));
  return new z(a, this._parents, n, e);
}
function go(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Dn(t));
  for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s)
    for (var l = r[s], c = l.length, u, h = 0; h < c; ++h)
      if (u = l[h]) {
        for (var f = t.call(u, u.__data__, h, l), d, g = D(u, e), p = 0, x = f.length; p < x; ++p)
          (d = f[p]) && qt(d, n, e, p, f, g);
        a.push(f), o.push(u);
      }
  return new z(a, o, n, e);
}
var yo = pt.prototype.constructor;
function _o() {
  return new yo(this._groups, this._parents);
}
function mo(t, n) {
  var e, r, i;
  return function() {
    var a = it(this, t), o = (this.style.removeProperty(t), it(this, t));
    return a === o ? null : a === e && o === r ? i : i = n(e = a, r = o);
  };
}
function ae(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xo(t, n, e) {
  var r, i = e + "", a;
  return function() {
    var o = it(this, t);
    return o === i ? null : o === r ? a : a = n(r = o, e);
  };
}
function vo(t, n, e) {
  var r, i, a;
  return function() {
    var o = it(this, t), s = e(this), l = s + "";
    return s == null && (l = s = (this.style.removeProperty(t), it(this, t))), o === l ? null : o === r && l === i ? a : (i = l, a = n(r = o, s));
  };
}
function wo(t, n) {
  var e, r, i, a = "style." + n, o = "end." + a, s;
  return function() {
    var l = V(this, t), c = l.on, u = l.value[a] == null ? s || (s = ae(n)) : void 0;
    (c !== e || i !== u) && (r = (e = c).copy()).on(o, i = u), l.on = r;
  };
}
function $o(t, n, e) {
  var r = (t += "") == "transform" ? bi : oe;
  return n == null ? this.styleTween(t, mo(t, r)).on("end.style." + t, ae(t)) : typeof n == "function" ? this.styleTween(t, vo(t, r, pn(this, "style." + t, n))).each(wo(this._id, t)) : this.styleTween(t, xo(t, r, n), e).on("end.style." + t, null);
}
function Ao(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function bo(t, n, e) {
  var r, i;
  function a() {
    var o = n.apply(this, arguments);
    return o !== i && (r = (i = o) && Ao(t, o, e)), r;
  }
  return a._value = n, a;
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
  return this.tween("text", typeof t == "function" ? ko(pn(this, "text", t)) : No(t == null ? "" : t + ""));
}
function Eo(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Ro(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Eo(i)), n;
  }
  return r._value = t, r;
}
function Co(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Ro(t));
}
function To() {
  for (var t = this._name, n = this._id, e = se(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, l, c = 0; c < s; ++c)
      if (l = o[c]) {
        var u = D(l, n);
        qt(l, t, e, c, o, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new z(r, this._parents, t, e);
}
function Io() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(a, o) {
    var s = { value: o }, l = { value: function() {
      --i === 0 && a();
    } };
    e.each(function() {
      var c = V(this, r), u = c.on;
      u !== t && (n = (t = u).copy(), n._.cancel.push(s), n._.interrupt.push(s), n._.end.push(l)), c.on = n;
    }), i === 0 && a();
  });
}
var Lo = 0;
function z(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function se() {
  return ++Lo;
}
var W = pt.prototype;
z.prototype = {
  constructor: z,
  select: po,
  selectAll: go,
  selectChild: W.selectChild,
  selectChildren: W.selectChildren,
  filter: ao,
  merge: so,
  selection: _o,
  transition: To,
  call: W.call,
  nodes: W.nodes,
  node: W.node,
  size: W.size,
  empty: W.empty,
  each: W.each,
  on: co,
  attr: Gi,
  attrTween: Ki,
  style: $o,
  styleTween: Mo,
  text: So,
  textTween: Co,
  remove: ho,
  tween: Oi,
  delay: Ji,
  duration: no,
  ease: ro,
  easeVarying: oo,
  end: Io,
  [Symbol.iterator]: W[Symbol.iterator]
};
function Po(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var gn = 1.70158;
(function t(n) {
  n = +n;
  function e(r) {
    return (r = +r) * r * (n * (r - 1) + r);
  }
  return e.overshoot = t, e;
})(gn);
var Fo = function t(n) {
  n = +n;
  function e(r) {
    return --r * r * ((r + 1) * n + r) + 1;
  }
  return e.overshoot = t, e;
}(gn);
(function t(n) {
  n = +n;
  function e(r) {
    return ((r *= 2) < 1 ? r * r * ((n + 1) * r - n) : (r -= 2) * r * ((n + 1) * r + n) + 2) / 2;
  }
  return e.overshoot = t, e;
})(gn);
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
  t instanceof z ? (n = t._id, t = t._name) : (n = se(), (e = Oo).time = hn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, l, c = 0; c < s; ++c)
      (l = o[c]) && qt(l, t, n, c, o, e || Do(l, n));
  return new z(r, this._parents, t, n);
}
pt.prototype.interrupt = Li;
pt.prototype.transition = qo;
const on = Math.PI, an = 2 * on, U = 1e-6, Ho = an - U;
function ue(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n)
    this._ += arguments[n] + t[n];
}
function Xo(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return ue;
  const e = 10 ** n;
  return function(r) {
    this._ += r[0];
    for (let i = 1, a = r.length; i < a; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Vo {
  constructor(n) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = n == null ? ue : Xo(n);
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
  bezierCurveTo(n, e, r, i, a, o) {
    this._append`C${+n},${+e},${+r},${+i},${this._x1 = +a},${this._y1 = +o}`;
  }
  arcTo(n, e, r, i, a) {
    if (n = +n, e = +e, r = +r, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let o = this._x1, s = this._y1, l = r - n, c = i - e, u = o - n, h = s - e, f = u * u + h * h;
    if (this._x1 === null)
      this._append`M${this._x1 = n},${this._y1 = e}`;
    else if (f > U) if (!(Math.abs(h * l - c * u) > U) || !a)
      this._append`L${this._x1 = n},${this._y1 = e}`;
    else {
      let d = r - o, g = i - s, p = l * l + c * c, x = d * d + g * g, _ = Math.sqrt(p), w = Math.sqrt(f), $ = a * Math.tan((on - Math.acos((p + f - x) / (2 * _ * w))) / 2), m = $ / w, A = $ / _;
      Math.abs(m - 1) > U && this._append`L${n + m * u},${e + m * h}`, this._append`A${a},${a},0,0,${+(h * d > u * g)},${this._x1 = n + A * l},${this._y1 = e + A * c}`;
    }
  }
  arc(n, e, r, i, a, o) {
    if (n = +n, e = +e, r = +r, o = !!o, r < 0) throw new Error(`negative radius: ${r}`);
    let s = r * Math.cos(i), l = r * Math.sin(i), c = n + s, u = e + l, h = 1 ^ o, f = o ? i - a : a - i;
    this._x1 === null ? this._append`M${c},${u}` : (Math.abs(this._x1 - c) > U || Math.abs(this._y1 - u) > U) && this._append`L${c},${u}`, r && (f < 0 && (f = f % an + an), f > Ho ? this._append`A${r},${r},0,1,${h},${n - s},${e - l}A${r},${r},0,1,${h},${this._x1 = c},${this._y1 = u}` : f > U && this._append`A${r},${r},0,${+(f >= on)},${h},${this._x1 = n + r * Math.cos(a)},${this._y1 = e + r * Math.sin(a)}`);
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
const In = Math.abs, M = Math.atan2, Y = Math.cos, Bo = Math.max, Zt = Math.min, q = Math.sin, et = Math.sqrt, E = 1e-12, dt = Math.PI, Ft = dt / 2, St = 2 * dt;
function Go(t) {
  return t > 1 ? 0 : t < -1 ? dt : Math.acos(t);
}
function Ln(t) {
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
function zo(t) {
  return t.innerRadius;
}
function Yo(t) {
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
function Qo(t, n, e, r, i, a, o, s) {
  var l = e - t, c = r - n, u = o - i, h = s - a, f = h * l - u * c;
  if (!(f * f < E))
    return f = (u * (n - a) - h * (t - i)) / f, [t + f * l, n + f * c];
}
function bt(t, n, e, r, i, a, o) {
  var s = t - e, l = n - r, c = (o ? a : -a) / et(s * s + l * l), u = c * l, h = -c * s, f = t + u, d = n + h, g = e + u, p = r + h, x = (f + g) / 2, _ = (d + p) / 2, w = g - f, $ = p - d, m = w * w + $ * $, A = i - a, b = f * p - g * d, L = ($ < 0 ? -1 : 1) * et(Bo(0, A * A * m - b * b)), P = (b * $ - w * L) / m, F = (-b * w - $ * L) / m, I = (b * $ + w * L) / m, S = (-b * w + $ * L) / m, C = P - x, y = F - _, v = I - x, B = S - _;
  return C * C + y * y > v * v + B * B && (P = I, F = S), {
    cx: P,
    cy: F,
    x01: -u,
    y01: -h,
    x11: P * (i / A - 1),
    y11: F * (i / A - 1)
  };
}
function Jo() {
  var t = zo, n = Yo, e = k(0), r = null, i = Uo, a = Ko, o = Zo, s = null, l = Wo(c);
  function c() {
    var u, h, f = +t.apply(this, arguments), d = +n.apply(this, arguments), g = i.apply(this, arguments) - Ft, p = a.apply(this, arguments) - Ft, x = In(p - g), _ = p > g;
    if (s || (s = u = l()), d < f && (h = d, d = f, f = h), !(d > E)) s.moveTo(0, 0);
    else if (x > St - E)
      s.moveTo(d * Y(g), d * q(g)), s.arc(0, 0, d, g, p, !_), f > E && (s.moveTo(f * Y(p), f * q(p)), s.arc(0, 0, f, p, g, _));
    else {
      var w = g, $ = p, m = g, A = p, b = x, L = x, P = o.apply(this, arguments) / 2, F = P > E && (r ? +r.apply(this, arguments) : et(f * f + d * d)), I = Zt(In(d - f) / 2, +e.apply(this, arguments)), S = I, C = I, y, v;
      if (F > E) {
        var B = Ln(F / f * q(P)), yt = Ln(F / d * q(P));
        (b -= B * 2) > E ? (B *= _ ? 1 : -1, m += B, A -= B) : (b = 0, m = A = (g + p) / 2), (L -= yt * 2) > E ? (yt *= _ ? 1 : -1, w += yt, $ -= yt) : (L = 0, w = $ = (g + p) / 2);
      }
      var j = d * Y(w), tt = d * q(w), _t = f * Y(A), mt = f * q(A);
      if (I > E) {
        var xt = d * Y($), vt = d * q($), Ht = f * Y(m), Xt = f * q(m), G;
        if (x < dt)
          if (G = Qo(j, tt, Ht, Xt, xt, vt, _t, mt)) {
            var Vt = j - G[0], Bt = tt - G[1], Gt = xt - G[0], Wt = vt - G[1], yn = 1 / q(Go((Vt * Gt + Bt * Wt) / (et(Vt * Vt + Bt * Bt) * et(Gt * Gt + Wt * Wt))) / 2), _n = et(G[0] * G[0] + G[1] * G[1]);
            S = Zt(I, (f - _n) / (yn - 1)), C = Zt(I, (d - _n) / (yn + 1));
          } else
            S = C = 0;
      }
      L > E ? C > E ? (y = bt(Ht, Xt, j, tt, d, C, _), v = bt(xt, vt, _t, mt, d, C, _), s.moveTo(y.cx + y.x01, y.cy + y.y01), C < I ? s.arc(y.cx, y.cy, C, M(y.y01, y.x01), M(v.y01, v.x01), !_) : (s.arc(y.cx, y.cy, C, M(y.y01, y.x01), M(y.y11, y.x11), !_), s.arc(0, 0, d, M(y.cy + y.y11, y.cx + y.x11), M(v.cy + v.y11, v.cx + v.x11), !_), s.arc(v.cx, v.cy, C, M(v.y11, v.x11), M(v.y01, v.x01), !_))) : (s.moveTo(j, tt), s.arc(0, 0, d, w, $, !_)) : s.moveTo(j, tt), !(f > E) || !(b > E) ? s.lineTo(_t, mt) : S > E ? (y = bt(_t, mt, xt, vt, f, -S, _), v = bt(j, tt, Ht, Xt, f, -S, _), s.lineTo(y.cx + y.x01, y.cy + y.y01), S < I ? s.arc(y.cx, y.cy, S, M(y.y01, y.x01), M(v.y01, v.x01), !_) : (s.arc(y.cx, y.cy, S, M(y.y01, y.x01), M(y.y11, y.x11), !_), s.arc(0, 0, f, M(y.cy + y.y11, y.cx + y.x11), M(v.cy + v.y11, v.cx + v.x11), _), s.arc(v.cx, v.cy, S, M(v.y11, v.x11), M(v.y01, v.x01), !_))) : s.arc(0, 0, f, A, m, _);
    }
    if (s.closePath(), u) return s = null, u + "" || null;
  }
  return c.centroid = function() {
    var u = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2, h = (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 - dt / 2;
    return [Y(h) * u, q(h) * u];
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
    return arguments.length ? (a = typeof u == "function" ? u : k(+u), c) : a;
  }, c.padAngle = function(u) {
    return arguments.length ? (o = typeof u == "function" ? u : k(+u), c) : o;
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
  var t = na, n = ta, e = null, r = k(0), i = k(St), a = k(0);
  function o(s) {
    var l, c = (s = jo(s)).length, u, h, f = 0, d = new Array(c), g = new Array(c), p = +r.apply(this, arguments), x = Math.min(St, Math.max(-St, i.apply(this, arguments) - p)), _, w = Math.min(Math.abs(x) / c, a.apply(this, arguments)), $ = w * (x < 0 ? -1 : 1), m;
    for (l = 0; l < c; ++l)
      (m = g[d[l] = l] = +t(s[l], l, s)) > 0 && (f += m);
    for (n != null ? d.sort(function(A, b) {
      return n(g[A], g[b]);
    }) : e != null && d.sort(function(A, b) {
      return e(s[A], s[b]);
    }), l = 0, h = f ? (x - c * $) / f : 0; l < c; ++l, p = _)
      u = d[l], m = g[u], _ = p + (m > 0 ? m * h : 0) + $, g[u] = {
        data: s[u],
        index: l,
        value: m,
        startAngle: p,
        endAngle: _,
        padAngle: w
      };
    return g;
  }
  return o.value = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : k(+s), o) : t;
  }, o.sortValues = function(s) {
    return arguments.length ? (n = s, e = null, o) : n;
  }, o.sort = function(s) {
    return arguments.length ? (e = s, n = null, o) : e;
  }, o.startAngle = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : k(+s), o) : r;
  }, o.endAngle = function(s) {
    return arguments.length ? (i = typeof s == "function" ? s : k(+s), o) : i;
  }, o.padAngle = function(s) {
    return arguments.length ? (a = typeof s == "function" ? s : k(+s), o) : a;
  }, o;
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
function ra(t, n, e, r) {
  const i = () => {
    t.container && N(t.container).append("circle").attr("cx", 0).attr("cy", 0).attr("r", t.rayon / 2.5).attr("fill", "#ffffff").attr("filter", "url(#shadow)").attr("stroke-width", 4).attr("stroke", "#000000");
  }, a = () => {
    t.container && N(t.container).append("circle").attr("cx", 0).attr("cy", 0).attr("r", (e.value.width - 4) / 2).attr("fill", "transparent").attr("stroke-width", "32").attr("filter", "url(#shadow)").attr("stroke", "#ffffff");
  }, o = () => {
    if (!t.container || !n.imgParams) return;
    const { width: p, height: x, src: _ } = n.imgParams;
    N(t.container).append("image").attr("x", -p / 2).attr("y", -x / 2).attr("width", p).attr("height", x).attr("href", _).attr("preserveAspectRatio", "xMidYMid meet");
  }, s = () => {
    if (!t.container) return;
    const p = "M 95.195 31.734 m 21.9 0 a 21.9 21.9 0 1 0 -43.8 0 L 95.195 96.625 L 117.095 31.734";
    t.arrow = N(t.container).append("path").attr("d", p).attr("stroke", "#000000").attr("fill", "#000000").attr("filter", "url(#shadow)").attr("transform", `matrix(1, 0, 0, 1, -95, -${e.value.height / 2 - 20})`).attr("stroke-linejoin", "round").attr("stroke-width", "4").node(), N(t.container).append("circle").attr("cx", 95.195).attr("cy", 31.734).attr("r", 6).attr("fill", "white").attr("transform", `matrix(1, 0, 0, 1, -95, -${e.value.height / 2 - 20})`);
  }, l = () => {
    var p;
    c(), u(), h(), f(), d(), n.middleCircle && i(), a(), (p = n.imgParams) != null && p.src && o(), s();
  }, c = () => {
    const p = N("#wheel").append("svg").attr("font-size", "16px").attr("height", "100%").attr("width", "100%").attr("viewBox", `0 0 ${e.value.width + 40} ${e.value.height}`).attr("aria-label", "Fortune Wheel");
    t.svg = p.append("g").attr("class", "wrapper").attr(
      "transform",
      `translate(${(e.value.width + 40) / 2}, ${e.value.height / 2})`
    ).node();
  }, u = () => {
    if (!t.svg) return;
    const x = N(t.svg).append("defs").append("filter").attr("id", "shadow").attr("x", "-100%").attr("y", "-100%").attr("width", "550%").attr("height", "550%");
    x.append("feOffset").attr("in", "SourceAlpha").attr("dx", 0).attr("dy", 0).attr("result", "offsetOut"), x.append("feGaussianBlur").attr("stdDeviation", "9").attr("in", "offsetOut").attr("result", "drop"), x.append("feColorMatrix").attr("in", "drop").attr("result", "color-out").attr("type", "matrix").attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"), x.append("feBlend").attr("in", "SourceGraphic").attr("in2", "color-out").attr("mode", "normal");
  }, h = () => {
    t.svg && (t.container = N(t.svg).append("g").attr("class", "wheelholder").node(), t.vis = N(t.container).append("g").node(), t.pieGenerator = ea().value(() => 1).padAngle(0.01).sort(null), t.arcGenerator = Jo().outerRadius(t.rayon).innerRadius(0));
  }, f = () => {
    if (!t.pieGenerator || !t.arcGenerator || !t.vis) return;
    const p = t.pieGenerator(n.data);
    N(t.vis).selectAll(".slice").data(p).join("path").attr("class", "slice").attr("d", t.arcGenerator).attr("stroke", "#ffffff").attr("stroke-width", "3").attr("fill", (_) => _.data.bgColor).each(function(_, w) {
      var A, b, L, P, F;
      let m = ((b = (A = /(^.+?)L/.exec(N(this).attr("d") || "")) == null ? void 0 : A[1]) == null ? void 0 : b.replace(/,/g, " ")) || "";
      if (_.endAngle > Math.PI / 2) {
        const I = /M(.*?)A/, S = /A(.*?)0 0 1/, y = ((L = /0 0 1 (.*?)$/.exec(m)) == null ? void 0 : L[1]) || "", v = ((P = I.exec(m)) == null ? void 0 : P[1]) || "", B = ((F = S.exec(m)) == null ? void 0 : F[1]) || "";
        m = `M${y}A${B}0 0 0${v}`;
      }
      N(t.vis).append("path").attr("class", "hiddenarcs").attr("id", `middleArc${w}`).attr("d", m).style("fill", "none");
    });
  }, d = () => {
    if (!t.pieGenerator || !t.vis || !t.arcGenerator) return;
    const p = t.pieGenerator(n.data);
    N(t.vis).selectAll(".middleArcText").data(p).join("text").attr("class", "middleArcText").attr("text-anchor", "end").attr("dominant-baseline", "middle").attr("font-size", `${r.value}px`).attr("font-family", "system-ui").attr("font-weight", 600).attr("transform", (x) => {
      const _ = (x.startAngle + x.endAngle) / 2, $ = t.rayon - 30, m = Math.cos(_) * $, A = Math.sin(_) * $, b = _ * (180 / Math.PI);
      return `translate(${m}, ${A}) rotate(${b}) scale(-1, -1)`;
    }).text((x) => x.data.value).attr("fill", (x) => x.data.color).attr("stroke", "rgb(0 0 0 / 10%)").attr("letter-spacing", "1px");
  };
  return { createWheel: l, redrawWheel: () => {
    N("#wheel").selectAll("*").remove(), l();
  } };
}
const nt = 360, ia = 5;
function oa(t, n, e) {
  const r = Pn(!1), i = (o) => n.data.length === 0 ? 0 : n.data.findIndex((s) => s.id === o) + 1;
  return { spin: async () => {
    if (!r.value) {
      r.value = !0;
      try {
        const o = n.data.length, s = nt / o, l = i(n.modelValue), c = nt - s * (l - 1), u = nt * ia, h = c + u;
        t.rotation = Math.round(h / s) * s;
        let f = Math.round(o - t.rotation % nt / s);
        f = f >= o ? f % o : f;
        const d = s + s / 2;
        t.rotation += d - Math.round(s * 2);
        const g = fn(0, t.rotation);
        t.vis && await N(t.vis).transition().duration(n.animDuration).ease(Fo.overshoot(0.3)).attrTween("transform", () => {
          const p = n.data.length, x = nt / p;
          return (_) => {
            const w = g(_), $ = w % nt;
            let m = Math.round(p - $ / x);
            m = m >= p ? m % p : m, m < 0 && (m += p);
            const A = n.data[m];
            return e("update", A), `rotate(${w})`;
          };
        }).end(), e("done", n.data[f]);
      } catch (o) {
        console.error("Error spinning the wheel:", o);
      } finally {
        r.value = !1;
      }
    }
  } };
}
const sa = /* @__PURE__ */ le({
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
    const r = t, i = e, { fontSize: a, wheelSize: o, wheelStyle: s } = me(r), l = ce({
      pieGenerator: null,
      arcGenerator: null,
      arrow: null,
      container: null,
      rayon: 0,
      rotation: 0,
      isSpinning: !1,
      svg: null,
      vis: null
    }), { createWheel: c, redrawWheel: u } = ra(l, r, o, a), { spin: h } = oa(l, r, i);
    return fe(() => r.data, u, { deep: !0 }), he(() => {
      l.rayon = Math.min(o.value.width, o.value.height) / 2, c();
    }), n({ spin: h }), (f, d) => (pe(), de("div", {
      id: "wheel",
      class: "wheel",
      style: ge(ye(s)),
      role: "img",
      "aria-label": "Fortune Wheel"
    }, null, 4));
  }
});
export {
  sa as FortuneWheel
};
