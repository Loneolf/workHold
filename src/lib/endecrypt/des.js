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
var a = a || function(a, b) {
    var c = {}
      , d = c.lib = {}
      , e = function() {}
      , f = d.Base = {
      extend: function(a) {
        e.prototype = this;
        var b = new e;
        return a && b.mixIn(a),
        b.hasOwnProperty("init") || (b.init = function() {
            b.$super.init.apply(this, arguments)
          }
        ),
          b.init.prototype = b,
          b.$super = this,
          b
      },
      create: function() {
        var a = this.extend();
        return a.init.apply(a, arguments),
          a
      },
      init: function() {},
      mixIn: function(a) {
        for (var b in a)
          a.hasOwnProperty(b) && (this[b] = a[b]);
        a.hasOwnProperty("toString") && (this.toString = a.toString)
      },
      clone: function() {
        return this.init.prototype.extend(this)
      }
    }
      , g = d.WordArray = f.extend({
      init: function(a, c) {
        a = this.words = a || [],
          this.sigBytes = c != b ? c : 4 * a.length
      },
      toString: function(a) {
        return (a || i).stringify(this)
      },
      concat: function(a) {
        var b = this.words
          , c = a.words
          , d = this.sigBytes;
        if (a = a.sigBytes,
            this.clamp(),
          d % 4)
          for (var e = 0; a > e; e++)
            b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
        else if (65535 < c.length)
          for (e = 0; a > e; e += 4)
            b[d + e >>> 2] = c[e >>> 2];
        else
          b.push.apply(b, c);
        return this.sigBytes += a,
          this
      },
      clamp: function() {
        var b = this.words
          , c = this.sigBytes;
        b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4),
          b.length = a.ceil(c / 4)
      },
      clone: function() {
        var a = f.clone.call(this);
        return a.words = this.words.slice(0),
          a
      },
      random: function(b) {
        for (var c = [], d = 0; b > d; d += 4)
          c.push(4294967296 * a.random() | 0);
        return new g.init(c,b)
      }
    })
      , h = c.enc = {}
      , i = h.Hex = {
      stringify: function(a) {
        var b = a.words;
        a = a.sigBytes;
        for (var c = [], d = 0; a > d; d++) {
          var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
          c.push((e >>> 4).toString(16)),
            c.push((15 & e).toString(16))
        }
        return c.join("")
      },
      parse: function(a) {
        for (var b = a.length, c = [], d = 0; b > d; d += 2)
          c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
        return new g.init(c,b / 2)
      }
    }
      , j = h.Latin1 = {
      stringify: function(a) {
        var b = a.words;
        a = a.sigBytes;
        for (var c = [], d = 0; a > d; d++)
          c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
        return c.join("")
      },
      parse: function(a) {
        for (var b = a.length, c = [], d = 0; b > d; d++)
          c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
        return new g.init(c,b)
      }
    }
      , k = h.Utf8 = {
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
    }
      , l = d.BufferedBlockAlgorithm = f.extend({
      reset: function() {
        this._data = new g.init,
          this._nDataBytes = 0
      },
      _append: function(a) {
        "string" == typeof a && (a = k.parse(a)),
          this._data.concat(a),
          this._nDataBytes += a.sigBytes
      },
      _process: function(b) {
        var c = this._data
          , d = c.words
          , e = c.sigBytes
          , f = this.blockSize
          , h = e / (4 * f)
          , h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
        if (b = h * f,
            e = a.min(4 * b, e),
            b) {
          for (var i = 0; b > i; i += f)
            this._doProcessBlock(d, i);
          i = d.splice(0, b),
            c.sigBytes -= e
        }
        return new g.init(i,e)
      },
      clone: function() {
        var a = f.clone.call(this);
        return a._data = this._data.clone(),
          a
      },
      _minBufferSize: 0
    });
    d.Hasher = l.extend({
      cfg: f.extend(),
      init: function(a) {
        this.cfg = this.cfg.extend(a),
          this.reset()
      },
      reset: function() {
        l.reset.call(this),
          this._doReset()
      },
      update: function(a) {
        return this._append(a),
          this._process(),
          this
      },
      finalize: function(a) {
        return a && this._append(a),
          this._doFinalize()
      },
      blockSize: 16,
      _createHelper: function(a) {
        return function(b, c) {
          return new a.init(c).finalize(b)
        }
      },
      _createHmacHelper: function(a) {
        return function(b, c) {
          return new m.HMAC.init(a,c).finalize(b)
        }
      }
    });
    var m = c.algo = {};
    return c
  }(Math);
!function() {
  var b = a
    , c = b.lib.WordArray;
  b.enc.Base64 = {
    stringify: function(a) {
      var b = a.words
        , c = a.sigBytes
        , d = this._map;
      a.clamp(),
        a = [];
      for (var e = 0; c > e; e += 3)
        for (var f = (b[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 16 | (b[e + 1 >>> 2] >>> 24 - 8 * ((e + 1) % 4) & 255) << 8 | b[e + 2 >>> 2] >>> 24 - 8 * ((e + 2) % 4) & 255, g = 0; 4 > g && c > e + .75 * g; g++)
          a.push(d.charAt(f >>> 6 * (3 - g) & 63));
      if (b = d.charAt(64))
        for (; a.length % 4; )
          a.push(b);
      return a.join("")
    },
    parse: function(a) {
      var b = a.length
        , d = this._map
        , e = d.charAt(64);
      e && (e = a.indexOf(e),
      -1 != e && (b = e));
      for (var e = [], f = 0, g = 0; b > g; g++)
        if (g % 4) {
          var h = d.indexOf(a.charAt(g - 1)) << 2 * (g % 4)
            , i = d.indexOf(a.charAt(g)) >>> 6 - 2 * (g % 4);
          e[f >>> 2] |= (h | i) << 24 - 8 * (f % 4),
            f++
        }
      return c.create(e, f)
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  }
}(),
  function(b) {
    function c(a, b, c, d, e, f, g) {
      return a = a + (b & c | ~b & d) + e + g,
      (a << f | a >>> 32 - f) + b
    }
    function d(a, b, c, d, e, f, g) {
      return a = a + (b & d | c & ~d) + e + g,
      (a << f | a >>> 32 - f) + b
    }
    function e(a, b, c, d, e, f, g) {
      return a = a + (b ^ c ^ d) + e + g,
      (a << f | a >>> 32 - f) + b
    }
    function f(a, b, c, d, e, f, g) {
      return a = a + (c ^ (b | ~d)) + e + g,
      (a << f | a >>> 32 - f) + b
    }
    for (var g = a, h = g.lib, i = h.WordArray, j = h.Hasher, h = g.algo, k = [], l = 0; 64 > l; l++)
      k[l] = 4294967296 * b.abs(b.sin(l + 1)) | 0;
    h = h.MD5 = j.extend({
      _doReset: function() {
        this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
      },
      _doProcessBlock: function(a, b) {
        for (var g = 0; 16 > g; g++) {
          var h = b + g
            , i = a[h];
          a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
        }
        var g = this._hash.words
          , h = a[b + 0]
          , i = a[b + 1]
          , j = a[b + 2]
          , l = a[b + 3]
          , m = a[b + 4]
          , n = a[b + 5]
          , o = a[b + 6]
          , p = a[b + 7]
          , q = a[b + 8]
          , r = a[b + 9]
          , s = a[b + 10]
          , t = a[b + 11]
          , u = a[b + 12]
          , v = a[b + 13]
          , w = a[b + 14]
          , x = a[b + 15]
          , y = g[0]
          , z = g[1]
          , A = g[2]
          , B = g[3]
          , y = c(y, z, A, B, h, 7, k[0])
          , B = c(B, y, z, A, i, 12, k[1])
          , A = c(A, B, y, z, j, 17, k[2])
          , z = c(z, A, B, y, l, 22, k[3])
          , y = c(y, z, A, B, m, 7, k[4])
          , B = c(B, y, z, A, n, 12, k[5])
          , A = c(A, B, y, z, o, 17, k[6])
          , z = c(z, A, B, y, p, 22, k[7])
          , y = c(y, z, A, B, q, 7, k[8])
          , B = c(B, y, z, A, r, 12, k[9])
          , A = c(A, B, y, z, s, 17, k[10])
          , z = c(z, A, B, y, t, 22, k[11])
          , y = c(y, z, A, B, u, 7, k[12])
          , B = c(B, y, z, A, v, 12, k[13])
          , A = c(A, B, y, z, w, 17, k[14])
          , z = c(z, A, B, y, x, 22, k[15])
          , y = d(y, z, A, B, i, 5, k[16])
          , B = d(B, y, z, A, o, 9, k[17])
          , A = d(A, B, y, z, t, 14, k[18])
          , z = d(z, A, B, y, h, 20, k[19])
          , y = d(y, z, A, B, n, 5, k[20])
          , B = d(B, y, z, A, s, 9, k[21])
          , A = d(A, B, y, z, x, 14, k[22])
          , z = d(z, A, B, y, m, 20, k[23])
          , y = d(y, z, A, B, r, 5, k[24])
          , B = d(B, y, z, A, w, 9, k[25])
          , A = d(A, B, y, z, l, 14, k[26])
          , z = d(z, A, B, y, q, 20, k[27])
          , y = d(y, z, A, B, v, 5, k[28])
          , B = d(B, y, z, A, j, 9, k[29])
          , A = d(A, B, y, z, p, 14, k[30])
          , z = d(z, A, B, y, u, 20, k[31])
          , y = e(y, z, A, B, n, 4, k[32])
          , B = e(B, y, z, A, q, 11, k[33])
          , A = e(A, B, y, z, t, 16, k[34])
          , z = e(z, A, B, y, w, 23, k[35])
          , y = e(y, z, A, B, i, 4, k[36])
          , B = e(B, y, z, A, m, 11, k[37])
          , A = e(A, B, y, z, p, 16, k[38])
          , z = e(z, A, B, y, s, 23, k[39])
          , y = e(y, z, A, B, v, 4, k[40])
          , B = e(B, y, z, A, h, 11, k[41])
          , A = e(A, B, y, z, l, 16, k[42])
          , z = e(z, A, B, y, o, 23, k[43])
          , y = e(y, z, A, B, r, 4, k[44])
          , B = e(B, y, z, A, u, 11, k[45])
          , A = e(A, B, y, z, x, 16, k[46])
          , z = e(z, A, B, y, j, 23, k[47])
          , y = f(y, z, A, B, h, 6, k[48])
          , B = f(B, y, z, A, p, 10, k[49])
          , A = f(A, B, y, z, w, 15, k[50])
          , z = f(z, A, B, y, n, 21, k[51])
          , y = f(y, z, A, B, u, 6, k[52])
          , B = f(B, y, z, A, l, 10, k[53])
          , A = f(A, B, y, z, s, 15, k[54])
          , z = f(z, A, B, y, i, 21, k[55])
          , y = f(y, z, A, B, q, 6, k[56])
          , B = f(B, y, z, A, x, 10, k[57])
          , A = f(A, B, y, z, o, 15, k[58])
          , z = f(z, A, B, y, v, 21, k[59])
          , y = f(y, z, A, B, m, 6, k[60])
          , B = f(B, y, z, A, t, 10, k[61])
          , A = f(A, B, y, z, j, 15, k[62])
          , z = f(z, A, B, y, r, 21, k[63]);
        g[0] = g[0] + y | 0,
          g[1] = g[1] + z | 0,
          g[2] = g[2] + A | 0,
          g[3] = g[3] + B | 0
      },
      _doFinalize: function() {
        var a = this._data
          , c = a.words
          , d = 8 * this._nDataBytes
          , e = 8 * a.sigBytes;
        c[e >>> 5] |= 128 << 24 - e % 32;
        var f = b.floor(d / 4294967296);
        for (c[(e + 64 >>> 9 << 4) + 15] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8),
               c[(e + 64 >>> 9 << 4) + 14] = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8),
               a.sigBytes = 4 * (c.length + 1),
               this._process(),
               a = this._hash,
               c = a.words,
               d = 0; 4 > d; d++)
          e = c[d],
            c[d] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
        return a
      },
      clone: function() {
        var a = j.clone.call(this);
        return a._hash = this._hash.clone(),
          a
      }
    }),
      g.MD5 = j._createHelper(h),
      g.HmacMD5 = j._createHmacHelper(h)
  }(Math),
  function() {
    var b = a
      , c = b.lib
      , d = c.Base
      , e = c.WordArray
      , c = b.algo
      , f = c.EvpKDF = d.extend({
      cfg: d.extend({
        keySize: 4,
        hasher: c.MD5,
        iterations: 1
      }),
      init: function(a) {
        this.cfg = this.cfg.extend(a)
      },
      compute: function(a, b) {
        for (var c = this.cfg, d = c.hasher.create(), f = e.create(), g = f.words, h = c.keySize, c = c.iterations; g.length < h; ) {
          i && d.update(i);
          var i = d.update(a).finalize(b);
          d.reset();
          for (var j = 1; c > j; j++)
            i = d.finalize(i),
              d.reset();
          f.concat(i)
        }
        return f.sigBytes = 4 * h,
          f
      }
    });
    b.EvpKDF = function(a, b, c) {
      return f.create(c).compute(a, b)
    }
  }(),
a.lib.Cipher || function(b) {
  var c = a
    , d = c.lib
    , e = d.Base
    , f = d.WordArray
    , g = d.BufferedBlockAlgorithm
    , h = c.enc.Base64
    , i = c.algo.EvpKDF
    , j = d.Cipher = g.extend({
    cfg: e.extend(),
    createEncryptor: function(a, b) {
      return this.create(this._ENC_XFORM_MODE, a, b)
    },
    createDecryptor: function(a, b) {
      return this.create(this._DEC_XFORM_MODE, a, b)
    },
    init: function(a, b, c) {
      this.cfg = this.cfg.extend(c),
        this._xformMode = a,
        this._key = b,
        this.reset()
    },
    reset: function() {
      g.reset.call(this),
        this._doReset()
    },
    process: function(a) {
      return this._append(a),
        this._process()
    },
    finalize: function(a) {
      return a && this._append(a),
        this._doFinalize()
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
  var k = c.mode = {}
    , l = function(a, c, d) {
    var e = this._iv;
    e ? this._iv = b : e = this._prevBlock;
    for (var f = 0; d > f; f++)
      a[c + f] ^= e[f]
  }
    , m = (d.BlockCipherMode = e.extend({
    createEncryptor: function(a, b) {
      return this.Encryptor.create(a, b)
    },
    createDecryptor: function(a, b) {
      return this.Decryptor.create(a, b)
    },
    init: function(a, b) {
      this._cipher = a,
        this._iv = b
    }
  })).extend();
  m.Encryptor = m.extend({
    processBlock: function(a, b) {
      var c = this._cipher
        , d = c.blockSize;
      l.call(this, a, b, d),
        c.encryptBlock(a, b),
        this._prevBlock = a.slice(b, b + d)
    }
  }),
    m.Decryptor = m.extend({
      processBlock: function(a, b) {
        var c = this._cipher
          , d = c.blockSize
          , e = a.slice(b, b + d);
        c.decryptBlock(a, b),
          l.call(this, a, b, d),
          this._prevBlock = e
      }
    }),
    k = k.CBC = m,
    m = (c.pad = {}).Pkcs7 = {
      pad: function(a, b) {
        for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], g = 0; c > g; g += 4)
          e.push(d);
        c = f.create(e, c),
          a.concat(c)
      },
      unpad: function(a) {
        a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2]
      }
    },
    d.BlockCipher = j.extend({
      cfg: j.cfg.extend({
        mode: k,
        padding: m
      }),
      reset: function() {
        j.reset.call(this);
        var a = this.cfg
          , b = a.iv
          , a = a.mode;
        if (this._xformMode == this._ENC_XFORM_MODE)
          var c = a.createEncryptor;
        else
          c = a.createDecryptor,
            this._minBufferSize = 1;
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
        } else
          b = this._process(!0),
            a.unpad(b);
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
  })
    , k = (c.format = {}).OpenSSL = {
    stringify: function(a) {
      var b = a.ciphertext;
      return a = a.salt,
        (a ? f.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(h)
    },
    parse: function(a) {
      a = h.parse(a);
      var b = a.words;
      if (1398893684 == b[0] && 1701076831 == b[1]) {
        var c = f.create(b.slice(2, 4));
        b.splice(0, 4),
          a.sigBytes -= 16
      }
      return n.create({
        ciphertext: a,
        salt: c
      })
    }
  }
    , o = d.SerializableCipher = e.extend({
    cfg: e.extend({
      format: k
    }),
    encrypt: function(a, b, c, d) {
      d = this.cfg.extend(d);
      var e = a.createEncryptor(c, d);
      return b = e.finalize(b),
        e = e.cfg,
        n.create({
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
      return d = this.cfg.extend(d),
        b = this._parse(b, d.format),
        a.createDecryptor(c, d).finalize(b.ciphertext)
    },
    _parse: function(a, b) {
      return "string" == typeof a ? b.parse(a, this) : a
    }
  })
    , c = (c.kdf = {}).OpenSSL = {
    execute: function(a, b, c, d) {
      return d || (d = f.random(8)),
        a = i.create({
          keySize: b + c
        }).compute(a, d),
        c = f.create(a.words.slice(b), 4 * c),
        a.sigBytes = 4 * b,
        n.create({
          key: a,
          iv: c,
          salt: d
        })
    }
  }
    , p = d.PasswordBasedCipher = o.extend({
    cfg: o.cfg.extend({
      kdf: c
    }),
    encrypt: function(a, b, c, d) {
      return d = this.cfg.extend(d),
        c = d.kdf.execute(c, a.keySize, a.ivSize),
        d.iv = c.iv,
        a = o.encrypt.call(this, a, b, c.key, d),
        a.mixIn(c),
        a
    },
    decrypt: function(a, b, c, d) {
      return d = this.cfg.extend(d),
        b = this._parse(b, d.format),
        c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt),
        d.iv = c.iv,
        o.decrypt.call(this, a, b, c.key, d)
    }
  })
}(),
  function() {
    function b(a, b) {
      var c = (this._lBlock >>> a ^ this._rBlock) & b;
      this._rBlock ^= c,
        this._lBlock ^= c << a
    }
    function c(a, b) {
      var c = (this._rBlock >>> a ^ this._lBlock) & b;
      this._lBlock ^= c,
        this._rBlock ^= c << a
    }
    var d = a
      , e = d.lib
      , f = e.WordArray
      , e = e.BlockCipher
      , g = d.algo
      , h = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]
      , i = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]
      , j = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28]
      , k = [{
      0: 8421888,
      268435456: 32768,
      536870912: 8421378,
      805306368: 2,
      1073741824: 512,
      1342177280: 8421890,
      1610612736: 8389122,
      1879048192: 8388608,
      2147483648: 514,
      2415919104: 8389120,
      2684354560: 33280,
      2952790016: 8421376,
      3221225472: 32770,
      3489660928: 8388610,
      3758096384: 0,
      4026531840: 33282,
      134217728: 0,
      402653184: 8421890,
      671088640: 33282,
      939524096: 32768,
      1207959552: 8421888,
      1476395008: 512,
      1744830464: 8421378,
      2013265920: 2,
      2281701376: 8389120,
      2550136832: 33280,
      2818572288: 8421376,
      3087007744: 8389122,
      3355443200: 8388610,
      3623878656: 32770,
      3892314112: 514,
      4160749568: 8388608,
      1: 32768,
      268435457: 2,
      536870913: 8421888,
      805306369: 8388608,
      1073741825: 8421378,
      1342177281: 33280,
      1610612737: 512,
      1879048193: 8389122,
      2147483649: 8421890,
      2415919105: 8421376,
      2684354561: 8388610,
      2952790017: 33282,
      3221225473: 514,
      3489660929: 8389120,
      3758096385: 32770,
      4026531841: 0,
      134217729: 8421890,
      402653185: 8421376,
      671088641: 8388608,
      939524097: 512,
      1207959553: 32768,
      1476395009: 8388610,
      1744830465: 2,
      2013265921: 33282,
      2281701377: 32770,
      2550136833: 8389122,
      2818572289: 514,
      3087007745: 8421888,
      3355443201: 8389120,
      3623878657: 0,
      3892314113: 33280,
      4160749569: 8421378
    }, {
      0: 1074282512,
      16777216: 16384,
      33554432: 524288,
      50331648: 1074266128,
      67108864: 1073741840,
      83886080: 1074282496,
      100663296: 1073758208,
      117440512: 16,
      134217728: 540672,
      150994944: 1073758224,
      167772160: 1073741824,
      184549376: 540688,
      201326592: 524304,
      218103808: 0,
      234881024: 16400,
      251658240: 1074266112,
      8388608: 1073758208,
      25165824: 540688,
      41943040: 16,
      58720256: 1073758224,
      75497472: 1074282512,
      92274688: 1073741824,
      109051904: 524288,
      125829120: 1074266128,
      142606336: 524304,
      159383552: 0,
      176160768: 16384,
      192937984: 1074266112,
      209715200: 1073741840,
      226492416: 540672,
      243269632: 1074282496,
      260046848: 16400,
      268435456: 0,
      285212672: 1074266128,
      301989888: 1073758224,
      318767104: 1074282496,
      335544320: 1074266112,
      352321536: 16,
      369098752: 540688,
      385875968: 16384,
      402653184: 16400,
      419430400: 524288,
      436207616: 524304,
      452984832: 1073741840,
      469762048: 540672,
      486539264: 1073758208,
      503316480: 1073741824,
      520093696: 1074282512,
      276824064: 540688,
      293601280: 524288,
      310378496: 1074266112,
      327155712: 16384,
      343932928: 1073758208,
      360710144: 1074282512,
      377487360: 16,
      394264576: 1073741824,
      411041792: 1074282496,
      427819008: 1073741840,
      444596224: 1073758224,
      461373440: 524304,
      478150656: 0,
      494927872: 16400,
      511705088: 1074266128,
      528482304: 540672
    }, {
      0: 260,
      1048576: 0,
      2097152: 67109120,
      3145728: 65796,
      4194304: 65540,
      5242880: 67108868,
      6291456: 67174660,
      7340032: 67174400,
      8388608: 67108864,
      9437184: 67174656,
      10485760: 65792,
      11534336: 67174404,
      12582912: 67109124,
      13631488: 65536,
      14680064: 4,
      15728640: 256,
      524288: 67174656,
      1572864: 67174404,
      2621440: 0,
      3670016: 67109120,
      4718592: 67108868,
      5767168: 65536,
      6815744: 65540,
      7864320: 260,
      8912896: 4,
      9961472: 256,
      11010048: 67174400,
      12058624: 65796,
      13107200: 65792,
      14155776: 67109124,
      15204352: 67174660,
      16252928: 67108864,
      16777216: 67174656,
      17825792: 65540,
      18874368: 65536,
      19922944: 67109120,
      20971520: 256,
      22020096: 67174660,
      23068672: 67108868,
      24117248: 0,
      25165824: 67109124,
      26214400: 67108864,
      27262976: 4,
      28311552: 65792,
      29360128: 67174400,
      30408704: 260,
      31457280: 65796,
      32505856: 67174404,
      17301504: 67108864,
      18350080: 260,
      19398656: 67174656,
      20447232: 0,
      21495808: 65540,
      22544384: 67109120,
      23592960: 256,
      24641536: 67174404,
      25690112: 65536,
      26738688: 67174660,
      27787264: 65796,
      28835840: 67108868,
      29884416: 67109124,
      30932992: 67174400,
      31981568: 4,
      33030144: 65792
    }, {
      0: 2151682048,
      65536: 2147487808,
      131072: 4198464,
      196608: 2151677952,
      262144: 0,
      327680: 4198400,
      393216: 2147483712,
      458752: 4194368,
      524288: 2147483648,
      589824: 4194304,
      655360: 64,
      720896: 2147487744,
      786432: 2151678016,
      851968: 4160,
      917504: 4096,
      983040: 2151682112,
      32768: 2147487808,
      98304: 64,
      163840: 2151678016,
      229376: 2147487744,
      294912: 4198400,
      360448: 2151682112,
      425984: 0,
      491520: 2151677952,
      557056: 4096,
      622592: 2151682048,
      688128: 4194304,
      753664: 4160,
      819200: 2147483648,
      884736: 4194368,
      950272: 4198464,
      1015808: 2147483712,
      1048576: 4194368,
      1114112: 4198400,
      1179648: 2147483712,
      1245184: 0,
      1310720: 4160,
      1376256: 2151678016,
      1441792: 2151682048,
      1507328: 2147487808,
      1572864: 2151682112,
      1638400: 2147483648,
      1703936: 2151677952,
      1769472: 4198464,
      1835008: 2147487744,
      1900544: 4194304,
      1966080: 64,
      2031616: 4096,
      1081344: 2151677952,
      1146880: 2151682112,
      1212416: 0,
      1277952: 4198400,
      1343488: 4194368,
      1409024: 2147483648,
      1474560: 2147487808,
      1540096: 64,
      1605632: 2147483712,
      1671168: 4096,
      1736704: 2147487744,
      1802240: 2151678016,
      1867776: 4160,
      1933312: 2151682048,
      1998848: 4194304,
      2064384: 4198464
    }, {
      0: 128,
      4096: 17039360,
      8192: 262144,
      12288: 536870912,
      16384: 537133184,
      20480: 16777344,
      24576: 553648256,
      28672: 262272,
      32768: 16777216,
      36864: 537133056,
      40960: 536871040,
      45056: 553910400,
      49152: 553910272,
      53248: 0,
      57344: 17039488,
      61440: 553648128,
      2048: 17039488,
      6144: 553648256,
      10240: 128,
      14336: 17039360,
      18432: 262144,
      22528: 537133184,
      26624: 553910272,
      30720: 536870912,
      34816: 537133056,
      38912: 0,
      43008: 553910400,
      47104: 16777344,
      51200: 536871040,
      55296: 553648128,
      59392: 16777216,
      63488: 262272,
      65536: 262144,
      69632: 128,
      73728: 536870912,
      77824: 553648256,
      81920: 16777344,
      86016: 553910272,
      90112: 537133184,
      94208: 16777216,
      98304: 553910400,
      102400: 553648128,
      106496: 17039360,
      110592: 537133056,
      114688: 262272,
      118784: 536871040,
      122880: 0,
      126976: 17039488,
      67584: 553648256,
      71680: 16777216,
      75776: 17039360,
      79872: 537133184,
      83968: 536870912,
      88064: 17039488,
      92160: 128,
      96256: 553910272,
      100352: 262272,
      104448: 553910400,
      108544: 0,
      112640: 553648128,
      116736: 16777344,
      120832: 262144,
      124928: 537133056,
      129024: 536871040
    }, {
      0: 268435464,
      256: 8192,
      512: 270532608,
      768: 270540808,
      1024: 268443648,
      1280: 2097152,
      1536: 2097160,
      1792: 268435456,
      2048: 0,
      2304: 268443656,
      2560: 2105344,
      2816: 8,
      3072: 270532616,
      3328: 2105352,
      3584: 8200,
      3840: 270540800,
      128: 270532608,
      384: 270540808,
      640: 8,
      896: 2097152,
      1152: 2105352,
      1408: 268435464,
      1664: 268443648,
      1920: 8200,
      2176: 2097160,
      2432: 8192,
      2688: 268443656,
      2944: 270532616,
      3200: 0,
      3456: 270540800,
      3712: 2105344,
      3968: 268435456,
      4096: 268443648,
      4352: 270532616,
      4608: 270540808,
      4864: 8200,
      5120: 2097152,
      5376: 268435456,
      5632: 268435464,
      5888: 2105344,
      6144: 2105352,
      6400: 0,
      6656: 8,
      6912: 270532608,
      7168: 8192,
      7424: 268443656,
      7680: 270540800,
      7936: 2097160,
      4224: 8,
      4480: 2105344,
      4736: 2097152,
      4992: 268435464,
      5248: 268443648,
      5504: 8200,
      5760: 270540808,
      6016: 270532608,
      6272: 270540800,
      6528: 270532616,
      6784: 8192,
      7040: 2105352,
      7296: 2097160,
      7552: 0,
      7808: 268435456,
      8064: 268443656
    }, {
      0: 1048576,
      16: 33555457,
      32: 1024,
      48: 1049601,
      64: 34604033,
      80: 0,
      96: 1,
      112: 34603009,
      128: 33555456,
      144: 1048577,
      160: 33554433,
      176: 34604032,
      192: 34603008,
      208: 1025,
      224: 1049600,
      240: 33554432,
      8: 34603009,
      24: 0,
      40: 33555457,
      56: 34604032,
      72: 1048576,
      88: 33554433,
      104: 33554432,
      120: 1025,
      136: 1049601,
      152: 33555456,
      168: 34603008,
      184: 1048577,
      200: 1024,
      216: 34604033,
      232: 1,
      248: 1049600,
      256: 33554432,
      272: 1048576,
      288: 33555457,
      304: 34603009,
      320: 1048577,
      336: 33555456,
      352: 34604032,
      368: 1049601,
      384: 1025,
      400: 34604033,
      416: 1049600,
      432: 1,
      448: 0,
      464: 34603008,
      480: 33554433,
      496: 1024,
      264: 1049600,
      280: 33555457,
      296: 34603009,
      312: 1,
      328: 33554432,
      344: 1048576,
      360: 1025,
      376: 34604032,
      392: 33554433,
      408: 34603008,
      424: 0,
      440: 34604033,
      456: 1049601,
      472: 1024,
      488: 33555456,
      504: 1048577
    }, {
      0: 134219808,
      1: 131072,
      2: 134217728,
      3: 32,
      4: 131104,
      5: 134350880,
      6: 134350848,
      7: 2048,
      8: 134348800,
      9: 134219776,
      10: 133120,
      11: 134348832,
      12: 2080,
      13: 0,
      14: 134217760,
      15: 133152,
      2147483648: 2048,
      2147483649: 134350880,
      2147483650: 134219808,
      2147483651: 134217728,
      2147483652: 134348800,
      2147483653: 133120,
      2147483654: 133152,
      2147483655: 32,
      2147483656: 134217760,
      2147483657: 2080,
      2147483658: 131104,
      2147483659: 134350848,
      2147483660: 0,
      2147483661: 134348832,
      2147483662: 134219776,
      2147483663: 131072,
      16: 133152,
      17: 134350848,
      18: 32,
      19: 2048,
      20: 134219776,
      21: 134217760,
      22: 134348832,
      23: 131072,
      24: 0,
      25: 131104,
      26: 134348800,
      27: 134219808,
      28: 134350880,
      29: 133120,
      30: 2080,
      31: 134217728,
      2147483664: 131072,
      2147483665: 2048,
      2147483666: 134348832,
      2147483667: 133152,
      2147483668: 32,
      2147483669: 134348800,
      2147483670: 134217728,
      2147483671: 134219808,
      2147483672: 134350880,
      2147483673: 134217760,
      2147483674: 134219776,
      2147483675: 0,
      2147483676: 133120,
      2147483677: 2080,
      2147483678: 131104,
      2147483679: 134350848
    }]
      , l = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679]
      , m = g.DES = e.extend({
      _doReset: function() {
        for (var a = this._key.words, b = [], c = 0; 56 > c; c++) {
          var d = h[c] - 1;
          b[c] = a[d >>> 5] >>> 31 - d % 32 & 1
        }
        for (a = this._subKeys = [],
               d = 0; 16 > d; d++) {
          for (var e = a[d] = [], f = j[d], c = 0; 24 > c; c++)
            e[c / 6 | 0] |= b[(i[c] - 1 + f) % 28] << 31 - c % 6,
              e[4 + (c / 6 | 0)] |= b[28 + (i[c + 24] - 1 + f) % 28] << 31 - c % 6;
          for (e[0] = e[0] << 1 | e[0] >>> 31,
                 c = 1; 7 > c; c++)
            e[c] >>>= 4 * (c - 1) + 3;
          e[7] = e[7] << 5 | e[7] >>> 27
        }
        for (b = this._invSubKeys = [],
               c = 0; 16 > c; c++)
          b[c] = a[15 - c]
      },
      encryptBlock: function(a, b) {
        this._doCryptBlock(a, b, this._subKeys)
      },
      decryptBlock: function(a, b) {
        this._doCryptBlock(a, b, this._invSubKeys)
      },
      _doCryptBlock: function(a, d, e) {
        this._lBlock = a[d],
          this._rBlock = a[d + 1],
          b.call(this, 4, 252645135),
          b.call(this, 16, 65535),
          c.call(this, 2, 858993459),
          c.call(this, 8, 16711935),
          b.call(this, 1, 1431655765);
        for (var f = 0; 16 > f; f++) {
          for (var g = e[f], h = this._lBlock, i = this._rBlock, j = 0, m = 0; 8 > m; m++)
            j |= k[m][((i ^ g[m]) & l[m]) >>> 0];
          this._lBlock = i,
            this._rBlock = h ^ j
        }
        e = this._lBlock,
          this._lBlock = this._rBlock,
          this._rBlock = e,
          b.call(this, 1, 1431655765),
          c.call(this, 8, 16711935),
          c.call(this, 2, 858993459),
          b.call(this, 16, 65535),
          b.call(this, 4, 252645135),
          a[d] = this._lBlock,
          a[d + 1] = this._rBlock
      },
      keySize: 2,
      ivSize: 2,
      blockSize: 2
    });
    d.DES = e._createHelper(m),
      g = g.TripleDES = e.extend({
        _doReset: function() {
          var a = this._key.words;
          this._des1 = m.createEncryptor(f.create(a.slice(0, 2))),
            this._des2 = m.createEncryptor(f.create(a.slice(2, 4))),
            this._des3 = m.createEncryptor(f.create(a.slice(4, 6)))
        },
        encryptBlock: function(a, b) {
          this._des1.encryptBlock(a, b),
            this._des2.decryptBlock(a, b),
            this._des3.encryptBlock(a, b)
        },
        decryptBlock: function(a, b) {
          this._des3.decryptBlock(a, b),
            this._des2.encryptBlock(a, b),
            this._des1.decryptBlock(a, b)
        },
        keySize: 6,
        ivSize: 2,
        blockSize: 2
      }),
      d.TripleDES = e._createHelper(g)
  }(),
  a.mode.ECB = function() {
    var b = a.lib.BlockCipherMode.extend();
    return b.Encryptor = b.extend({
      processBlock: function(a, b) {
        this._cipher.encryptBlock(a, b)
      }
    }),
      b.Decryptor = b.extend({
        processBlock: function(a, b) {
          this._cipher.decryptBlock(a, b)
        }
      }),
      b
  }();
export default a;
