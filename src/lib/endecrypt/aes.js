/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2017/1/5
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
var a = a ||
  function(a, b) {
    var c = {},
      d = c.lib = {},
      e = function() {},
      f = d.Base = {
        extend: function(a) {
          e.prototype = this;
          var b = new e;
          return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function() {
            b.$super.init.apply(this, arguments)
          }), b.init.prototype = b, b.$super = this, b
        },
        create: function() {
          var a = this.extend();
          return a.init.apply(a, arguments), a
        },
        init: function() {},
        mixIn: function(a) {
          for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
          a.hasOwnProperty("toString") && (this.toString = a.toString)
        },
        clone: function() {
          return this.init.prototype.extend(this)
        }
      },
      g = d.WordArray = f.extend({
        init: function(a, c) {
          a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
        },
        toString: function(a) {
          return (a || i).stringify(this)
        },
        concat: function(a) {
          var b = this.words,
            c = a.words,
            d = this.sigBytes;
          if (a = a.sigBytes, this.clamp(), d % 4) for (var e = 0; a > e; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
          else if (65535 < c.length) for (e = 0; a > e; e += 4) b[d + e >>> 2] = c[e >>> 2];
          else b.push.apply(b, c);
          return this.sigBytes += a, this
        },
        clamp: function() {
          var b = this.words,
            c = this.sigBytes;
          b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4)
        },
        clone: function() {
          var a = f.clone.call(this);
          return a.words = this.words.slice(0), a
        },
        random: function(b) {
          for (var c = [], d = 0; b > d; d += 4) c.push(4294967296 * a.random() | 0);
          return new g.init(c, b)
        }
      }),
      h = c.enc = {},
      i = h.Hex = {
        stringify: function(a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; a > d; d++) {
            var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
            c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16))
          }
          return c.join("")
        },
        parse: function(a) {
          for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
          return new g.init(c, b / 2)
        }
      },
      j = h.Latin1 = {
        stringify: function(a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; a > d; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
          return c.join("")
        },
        parse: function(a) {
          for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
          return new g.init(c, b)
        }
      },
      k = h.Utf8 = {
        stringify: function(a) {
          try {
            return decodeURIComponent(escape(j.stringify(a)))
          } catch (b) {
            throw Error("Malformed UTF-8 data")
          }
        },
        parse: function(a) {
          return j.parse(unescape(encodeURIComponent(a)))
        }
      },
      l = d.BufferedBlockAlgorithm = f.extend({
        reset: function() {
          this._data = new g.init, this._nDataBytes = 0
        },
        _append: function(a) {
          "string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
        },
        _process: function(b) {
          var c = this._data,
            d = c.words,
            e = c.sigBytes,
            f = this.blockSize,
            h = e / (4 * f),
            h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
          if (b = h * f, e = a.min(4 * b, e), b) {
            for (var i = 0; b > i; i += f) this._doProcessBlock(d, i);
            i = d.splice(0, b), c.sigBytes -= e
          }
          return new g.init(i, e)
        },
        clone: function() {
          var a = f.clone.call(this);
          return a._data = this._data.clone(), a
        },
        _minBufferSize: 0
      });
    d.Hasher = l.extend({
      cfg: f.extend(),
      init: function(a) {
        this.cfg = this.cfg.extend(a), this.reset()
      },
      reset: function() {
        l.reset.call(this), this._doReset()
      },
      update: function(a) {
        return this._append(a), this._process(), this
      },
      finalize: function(a) {
        return a && this._append(a), this._doFinalize()
      },
      blockSize: 16,
      _createHelper: function(a) {
        return function(b, c) {
          return new a.init(c).finalize(b)
        }
      },
      _createHmacHelper: function(a) {
        return function(b, c) {
          return new m.HMAC.init(a, c).finalize(b)
        }
      }
    });
    var m = c.algo = {};
    return c
  }(Math);
!
  function() {
    var b = a,
      c = b.lib.WordArray;
    b.enc.Base64 = {
      stringify: function(a) {
        var b = a.words,
          c = a.sigBytes,
          d = this._map;
        a.clamp(), a = [];
        for (var e = 0; c > e; e += 3) for (var f = (b[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 16 | (b[e + 1 >>> 2] >>> 24 - 8 * ((e + 1) % 4) & 255) << 8 | b[e + 2 >>> 2] >>> 24 - 8 * ((e + 2) % 4) & 255, g = 0; 4 > g && c > e + .75 * g; g++) a.push(d.charAt(f >>> 6 * (3 - g) & 63));
        if (b = d.charAt(64)) for (; a.length % 4;) a.push(b);
        return a.join("")
      },
      parse: function(a) {
        var b = a.length,
          d = this._map,
          e = d.charAt(64);
        e && (e = a.indexOf(e), -1 != e && (b = e));
        for (var e = [], f = 0, g = 0; b > g; g++) if (g % 4) {
          var h = d.indexOf(a.charAt(g - 1)) << 2 * (g % 4),
            i = d.indexOf(a.charAt(g)) >>> 6 - 2 * (g % 4);
          e[f >>> 2] |= (h | i) << 24 - 8 * (f % 4), f++
        }
        return c.create(e, f)
      },
      _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
  }(), function(b) {
  function c(a, b, c, d, e, f, g) {
    return a = a + (b & c | ~b & d) + e + g, (a << f | a >>> 32 - f) + b
  }
  function d(a, b, c, d, e, f, g) {
    return a = a + (b & d | c & ~d) + e + g, (a << f | a >>> 32 - f) + b
  }
  function e(a, b, c, d, e, f, g) {
    return a = a + (b ^ c ^ d) + e + g, (a << f | a >>> 32 - f) + b
  }
  function f(a, b, c, d, e, f, g) {
    return a = a + (c ^ (b | ~d)) + e + g, (a << f | a >>> 32 - f) + b
  }
  for (var g = a, h = g.lib, i = h.WordArray, j = h.Hasher, h = g.algo, k = [], l = 0; 64 > l; l++) k[l] = 4294967296 * b.abs(b.sin(l + 1)) | 0;
  h = h.MD5 = j.extend({
    _doReset: function() {
      this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
    },
    _doProcessBlock: function(a, b) {
      for (var g = 0; 16 > g; g++) {
        var h = b + g,
          i = a[h];
        a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
      }
      var g = this._hash.words,
        h = a[b + 0],
        i = a[b + 1],
        j = a[b + 2],
        l = a[b + 3],
        m = a[b + 4],
        n = a[b + 5],
        o = a[b + 6],
        p = a[b + 7],
        q = a[b + 8],
        r = a[b + 9],
        s = a[b + 10],
        t = a[b + 11],
        u = a[b + 12],
        v = a[b + 13],
        w = a[b + 14],
        x = a[b + 15],
        y = g[0],
        z = g[1],
        A = g[2],
        B = g[3],
        y = c(y, z, A, B, h, 7, k[0]),
        B = c(B, y, z, A, i, 12, k[1]),
        A = c(A, B, y, z, j, 17, k[2]),
        z = c(z, A, B, y, l, 22, k[3]),
        y = c(y, z, A, B, m, 7, k[4]),
        B = c(B, y, z, A, n, 12, k[5]),
        A = c(A, B, y, z, o, 17, k[6]),
        z = c(z, A, B, y, p, 22, k[7]),
        y = c(y, z, A, B, q, 7, k[8]),
        B = c(B, y, z, A, r, 12, k[9]),
        A = c(A, B, y, z, s, 17, k[10]),
        z = c(z, A, B, y, t, 22, k[11]),
        y = c(y, z, A, B, u, 7, k[12]),
        B = c(B, y, z, A, v, 12, k[13]),
        A = c(A, B, y, z, w, 17, k[14]),
        z = c(z, A, B, y, x, 22, k[15]),
        y = d(y, z, A, B, i, 5, k[16]),
        B = d(B, y, z, A, o, 9, k[17]),
        A = d(A, B, y, z, t, 14, k[18]),
        z = d(z, A, B, y, h, 20, k[19]),
        y = d(y, z, A, B, n, 5, k[20]),
        B = d(B, y, z, A, s, 9, k[21]),
        A = d(A, B, y, z, x, 14, k[22]),
        z = d(z, A, B, y, m, 20, k[23]),
        y = d(y, z, A, B, r, 5, k[24]),
        B = d(B, y, z, A, w, 9, k[25]),
        A = d(A, B, y, z, l, 14, k[26]),
        z = d(z, A, B, y, q, 20, k[27]),
        y = d(y, z, A, B, v, 5, k[28]),
        B = d(B, y, z, A, j, 9, k[29]),
        A = d(A, B, y, z, p, 14, k[30]),
        z = d(z, A, B, y, u, 20, k[31]),
        y = e(y, z, A, B, n, 4, k[32]),
        B = e(B, y, z, A, q, 11, k[33]),
        A = e(A, B, y, z, t, 16, k[34]),
        z = e(z, A, B, y, w, 23, k[35]),
        y = e(y, z, A, B, i, 4, k[36]),
        B = e(B, y, z, A, m, 11, k[37]),
        A = e(A, B, y, z, p, 16, k[38]),
        z = e(z, A, B, y, s, 23, k[39]),
        y = e(y, z, A, B, v, 4, k[40]),
        B = e(B, y, z, A, h, 11, k[41]),
        A = e(A, B, y, z, l, 16, k[42]),
        z = e(z, A, B, y, o, 23, k[43]),
        y = e(y, z, A, B, r, 4, k[44]),
        B = e(B, y, z, A, u, 11, k[45]),
        A = e(A, B, y, z, x, 16, k[46]),
        z = e(z, A, B, y, j, 23, k[47]),
        y = f(y, z, A, B, h, 6, k[48]),
        B = f(B, y, z, A, p, 10, k[49]),
        A = f(A, B, y, z, w, 15, k[50]),
        z = f(z, A, B, y, n, 21, k[51]),
        y = f(y, z, A, B, u, 6, k[52]),
        B = f(B, y, z, A, l, 10, k[53]),
        A = f(A, B, y, z, s, 15, k[54]),
        z = f(z, A, B, y, i, 21, k[55]),
        y = f(y, z, A, B, q, 6, k[56]),
        B = f(B, y, z, A, x, 10, k[57]),
        A = f(A, B, y, z, o, 15, k[58]),
        z = f(z, A, B, y, v, 21, k[59]),
        y = f(y, z, A, B, m, 6, k[60]),
        B = f(B, y, z, A, t, 10, k[61]),
        A = f(A, B, y, z, j, 15, k[62]),
        z = f(z, A, B, y, r, 21, k[63]);
      g[0] = g[0] + y | 0, g[1] = g[1] + z | 0, g[2] = g[2] + A | 0, g[3] = g[3] + B | 0
    },
    _doFinalize: function() {
      var a = this._data,
        c = a.words,
        d = 8 * this._nDataBytes,
        e = 8 * a.sigBytes;
      c[e >>> 5] |= 128 << 24 - e % 32;
      var f = b.floor(d / 4294967296);
      for (c[(e + 64 >>> 9 << 4) + 15] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8), c[(e + 64 >>> 9 << 4) + 14] = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), a.sigBytes = 4 * (c.length + 1), this._process(), a = this._hash, c = a.words, d = 0; 4 > d; d++) e = c[d], c[d] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
      return a
    },
    clone: function() {
      var a = j.clone.call(this);
      return a._hash = this._hash.clone(), a
    }
  }), g.MD5 = j._createHelper(h), g.HmacMD5 = j._createHmacHelper(h)
}(Math), function() {
  var b = a,
    c = b.lib,
    d = c.Base,
    e = c.WordArray,
    c = b.algo,
    f = c.EvpKDF = d.extend({
      cfg: d.extend({
        keySize: 4,
        hasher: c.MD5,
        iterations: 1
      }),
      init: function(a) {
        this.cfg = this.cfg.extend(a)
      },
      compute: function(a, b) {
        for (var c = this.cfg, d = c.hasher.create(), f = e.create(), g = f.words, h = c.keySize, c = c.iterations; g.length < h;) {
          i && d.update(i);
          var i = d.update(a).finalize(b);
          d.reset();
          for (var j = 1; c > j; j++) i = d.finalize(i), d.reset();
          f.concat(i)
        }
        return f.sigBytes = 4 * h, f
      }
    });
  b.EvpKDF = function(a, b, c) {
    return f.create(c).compute(a, b)
  }
}(), a.lib.Cipher ||
function(b) {
  var c = a,
    d = c.lib,
    e = d.Base,
    f = d.WordArray,
    g = d.BufferedBlockAlgorithm,
    h = c.enc.Base64,
    i = c.algo.EvpKDF,
    j = d.Cipher = g.extend({
      cfg: e.extend(),
      createEncryptor: function(a, b) {
        return this.create(this._ENC_XFORM_MODE, a, b)
      },
      createDecryptor: function(a, b) {
        return this.create(this._DEC_XFORM_MODE, a, b)
      },
      init: function(a, b, c) {
        this.cfg = this.cfg.extend(c), this._xformMode = a, this._key = b, this.reset()
      },
      reset: function() {
        g.reset.call(this), this._doReset()
      },
      process: function(a) {
        return this._append(a), this._process()
      },
      finalize: function(a) {
        return a && this._append(a), this._doFinalize()
      },
      keySize: 4,
      ivSize: 4,
      _ENC_XFORM_MODE: 1,
      _DEC_XFORM_MODE: 2,
      _createHelper: function(a) {
        return {
          encrypt: function(b, c, d) {
            return ("string" == typeof c ? p : o).encrypt(a, b, c, d)
          },
          decrypt: function(b, c, d) {
            return ("string" == typeof c ? p : o).decrypt(a, b, c, d)
          }
        }
      }
    });
  d.StreamCipher = j.extend({
    _doFinalize: function() {
      return this._process(!0)
    },
    blockSize: 1
  });
  var k = c.mode = {},
    l = function(a, c, d) {
      var e = this._iv;
      e ? this._iv = b : e = this._prevBlock;
      for (var f = 0; d > f; f++) a[c + f] ^= e[f]
    },
    m = (d.BlockCipherMode = e.extend({
      createEncryptor: function(a, b) {
        return this.Encryptor.create(a, b)
      },
      createDecryptor: function(a, b) {
        return this.Decryptor.create(a, b)
      },
      init: function(a, b) {
        this._cipher = a, this._iv = b
      }
    })).extend();
  m.Encryptor = m.extend({
    processBlock: function(a, b) {
      var c = this._cipher,
        d = c.blockSize;
      l.call(this, a, b, d), c.encryptBlock(a, b), this._prevBlock = a.slice(b, b + d)
    }
  }), m.Decryptor = m.extend({
    processBlock: function(a, b) {
      var c = this._cipher,
        d = c.blockSize,
        e = a.slice(b, b + d);
      c.decryptBlock(a, b), l.call(this, a, b, d), this._prevBlock = e
    }
  }), k = k.CBC = m, m = (c.pad = {}).Pkcs7 = {
    pad: function(a, b) {
      for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], g = 0; c > g; g += 4) e.push(d);
      c = f.create(e, c), a.concat(c)
    },
    unpad: function(a) {
      a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2]
    }
  }, d.BlockCipher = j.extend({
    cfg: j.cfg.extend({
      mode: k,
      padding: m
    }),
    reset: function() {
      j.reset.call(this);
      var a = this.cfg,
        b = a.iv,
        a = a.mode;
      if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;
      else c = a.createDecryptor, this._minBufferSize = 1;
      this._mode = c.call(a, this, b && b.words)
    },
    _doProcessBlock: function(a, b) {
      this._mode.processBlock(a, b)
    },
    _doFinalize: function() {
      var a = this.cfg.padding;
      if (this._xformMode == this._ENC_XFORM_MODE) {
        a.pad(this._data, this.blockSize);
        var b = this._process(!0)
      } else b = this._process(!0), a.unpad(b);
      return b
    },
    blockSize: 4
  });
  var n = d.CipherParams = e.extend({
      init: function(a) {
        this.mixIn(a)
      },
      toString: function(a) {
        return (a || this.formatter).stringify(this)
      }
    }),
    k = (c.format = {}).OpenSSL = {
      stringify: function(a) {
        var b = a.ciphertext;
        return a = a.salt, (a ? f.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(h)
      },
      parse: function(a) {
        a = h.parse(a);
        var b = a.words;
        if (1398893684 == b[0] && 1701076831 == b[1]) {
          var c = f.create(b.slice(2, 4));
          b.splice(0, 4), a.sigBytes -= 16
        }
        return n.create({
          ciphertext: a,
          salt: c
        })
      }
    },
    o = d.SerializableCipher = e.extend({
      cfg: e.extend({
        format: k
      }),
      encrypt: function(a, b, c, d) {
        d = this.cfg.extend(d);
        var e = a.createEncryptor(c, d);
        return b = e.finalize(b), e = e.cfg, n.create({
          ciphertext: b,
          key: c,
          iv: e.iv,
          algorithm: a,
          mode: e.mode,
          padding: e.padding,
          blockSize: a.blockSize,
          formatter: d.format
        })
      },
      decrypt: function(a, b, c, d) {
        return d = this.cfg.extend(d), b = this._parse(b, d.format), a.createDecryptor(c, d).finalize(b.ciphertext)
      },
      _parse: function(a, b) {
        return "string" == typeof a ? b.parse(a, this) : a
      }
    }),
    c = (c.kdf = {}).OpenSSL = {
      execute: function(a, b, c, d) {
        return d || (d = f.random(8)), a = i.create({
          keySize: b + c
        }).compute(a, d), c = f.create(a.words.slice(b), 4 * c), a.sigBytes = 4 * b, n.create({
          key: a,
          iv: c,
          salt: d
        })
      }
    },
    p = d.PasswordBasedCipher = o.extend({
      cfg: o.cfg.extend({
        kdf: c
      }),
      encrypt: function(a, b, c, d) {
        return d = this.cfg.extend(d), c = d.kdf.execute(c, a.keySize, a.ivSize), d.iv = c.iv, a = o.encrypt.call(this, a, b, c.key, d), a.mixIn(c), a
      },
      decrypt: function(a, b, c, d) {
        return d = this.cfg.extend(d), b = this._parse(b, d.format), c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt), d.iv = c.iv, o.decrypt.call(this, a, b, c.key, d)
      }
    })
}(), function() {
  for (var b = a, c = b.lib.BlockCipher, d = b.algo, e = [], f = [], g = [], h = [], i = [], j = [], k = [], l = [], m = [], n = [], o = [], p = 0; 256 > p; p++) o[p] = 128 > p ? p << 1 : p << 1 ^ 283;
  for (var q = 0, r = 0, p = 0; 256 > p; p++) {
    var s = r ^ r << 1 ^ r << 2 ^ r << 3 ^ r << 4,
      s = s >>> 8 ^ 255 & s ^ 99;
    e[q] = s, f[s] = q;
    var t = o[q],
      u = o[t],
      v = o[u],
      w = 257 * o[s] ^ 16843008 * s;
    g[q] = w << 24 | w >>> 8, h[q] = w << 16 | w >>> 16, i[q] = w << 8 | w >>> 24, j[q] = w, w = 16843009 * v ^ 65537 * u ^ 257 * t ^ 16843008 * q, k[s] = w << 24 | w >>> 8, l[s] = w << 16 | w >>> 16, m[s] = w << 8 | w >>> 24, n[s] = w, q ? (q = t ^ o[o[o[v ^ t]]], r ^= o[o[r]]) : q = r = 1
  }
  var x = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
    d = d.AES = c.extend({
      _doReset: function() {
        for (var a = this._key, b = a.words, c = a.sigBytes / 4, a = 4 * ((this._nRounds = c + 6) + 1), d = this._keySchedule = [], f = 0; a > f; f++) if (c > f) d[f] = b[f];
        else {
          var g = d[f - 1];
          f % c ? c > 6 && 4 == f % c && (g = e[g >>> 24] << 24 | e[g >>> 16 & 255] << 16 | e[g >>> 8 & 255] << 8 | e[255 & g]) : (g = g << 8 | g >>> 24, g = e[g >>> 24] << 24 | e[g >>> 16 & 255] << 16 | e[g >>> 8 & 255] << 8 | e[255 & g], g ^= x[f / c | 0] << 24), d[f] = d[f - c] ^ g
        }
        for (b = this._invKeySchedule = [], c = 0; a > c; c++) f = a - c, g = c % 4 ? d[f] : d[f - 4], b[c] = 4 > c || 4 >= f ? g : k[e[g >>> 24]] ^ l[e[g >>> 16 & 255]] ^ m[e[g >>> 8 & 255]] ^ n[e[255 & g]]
      },
      encryptBlock: function(a, b) {
        this._doCryptBlock(a, b, this._keySchedule, g, h, i, j, e)
      },
      decryptBlock: function(a, b) {
        var c = a[b + 1];
        a[b + 1] = a[b + 3], a[b + 3] = c, this._doCryptBlock(a, b, this._invKeySchedule, k, l, m, n, f), c = a[b + 1], a[b + 1] = a[b + 3], a[b + 3] = c
      },
      _doCryptBlock: function(a, b, c, d, e, f, g, h) {
        for (var i = this._nRounds, j = a[b] ^ c[0], k = a[b + 1] ^ c[1], l = a[b + 2] ^ c[2], m = a[b + 3] ^ c[3], n = 4, o = 1; i > o; o++) var p = d[j >>> 24] ^ e[k >>> 16 & 255] ^ f[l >>> 8 & 255] ^ g[255 & m] ^ c[n++],
          q = d[k >>> 24] ^ e[l >>> 16 & 255] ^ f[m >>> 8 & 255] ^ g[255 & j] ^ c[n++],
          r = d[l >>> 24] ^ e[m >>> 16 & 255] ^ f[j >>> 8 & 255] ^ g[255 & k] ^ c[n++],
          m = d[m >>> 24] ^ e[j >>> 16 & 255] ^ f[k >>> 8 & 255] ^ g[255 & l] ^ c[n++],
          j = p,
          k = q,
          l = r;
        p = (h[j >>> 24] << 24 | h[k >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[255 & m]) ^ c[n++], q = (h[k >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[m >>> 8 & 255] << 8 | h[255 & j]) ^ c[n++], r = (h[l >>> 24] << 24 | h[m >>> 16 & 255] << 16 | h[j >>> 8 & 255] << 8 | h[255 & k]) ^ c[n++], m = (h[m >>> 24] << 24 | h[j >>> 16 & 255] << 16 | h[k >>> 8 & 255] << 8 | h[255 & l]) ^ c[n++], a[b] = p, a[b + 1] = q, a[b + 2] = r, a[b + 3] = m
      },
      keySize: 8
    });
  b.AES = c._createHelper(d)
}();
export default a;
