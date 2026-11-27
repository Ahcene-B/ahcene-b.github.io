(function () {

  var photo = document.getElementById("nave-photo"), canvas = document.getElementById("nave-canvas");
  if (!photo || !canvas) return;
  var ctx = canvas.getContext("2d");
  var W = 105, H = 140;                                   // working size (half the canvas)
  var state = { seed: 7, k: 5, blocks: [false, true, true], concepts: true, input: null, rgb: null, feats: null, labels: null };

  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function gauss(r) { var u = 0; while (u === 0) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); }

  function conv(x, c, h, w, co, r) {                       // 3 x 3 convolution, padding 1, then ReLU
    var wt = new Float32Array(co * c * 9), sd = Math.sqrt(2 / (c * 9)), y = new Float32Array(co * h * w), i;
    for (i = 0; i < wt.length; i++) wt[i] = gauss(r) * sd;
    for (var o = 0; o < co; o++) {
      var yo = o * h * w, bias = gauss(r) * 0.1;
      for (var ci = 0; ci < c; ci++) {
        var xi = ci * h * w, wo = (o * c + ci) * 9;
        for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
          var kv = wt[wo + (dy + 1) * 3 + dx + 1], x0 = Math.max(0, -dx), x1 = Math.min(w, w - dx);
          for (var yy = 0; yy < h; yy++) {
            var sy = Math.min(h - 1, Math.max(0, yy + dy));          // edges repeated, not zero-padded
            var ry = yo + yy * w, rs = xi + sy * w;
            for (var xx = x0; xx < x1; xx++) y[ry + xx] += kv * x[rs + xx + dx];
            if (dx < 0) y[ry] += kv * x[rs];
            if (dx > 0) y[ry + w - 1] += kv * x[rs + w - 1];
          }
        }
      }
      for (i = 0; i < h * w; i++) { var v = y[yo + i] + bias; y[yo + i] = v > 0 ? v : 0; }
    }
    return y;
  }
  function pool(x, c, h, w) {                              // 2 x 2 max-pooling
    var h2 = h >> 1, w2 = w >> 1, y = new Float32Array(c * h2 * w2);
    for (var ci = 0; ci < c; ci++) for (var yy = 0; yy < h2; yy++) for (var xx = 0; xx < w2; xx++) {
      var b = ci * h * w + 2 * yy * w + 2 * xx, m = Math.max(x[b], x[b + 1], x[b + w], x[b + w + 1]);
      y[ci * h2 * w2 + yy * w2 + xx] = m;
    }
    return { x: y, h: h2, w: w2 };
  }

  function readPhoto() {
    var t = document.createElement("canvas"); t.width = W; t.height = H;
    var tc = t.getContext("2d"); tc.drawImage(photo, 0, 0, W, H);
    var d = tc.getImageData(0, 0, W, H).data, x = new Float32Array(3 * W * H);
    state.rgb = d;
    for (var i = 0; i < W * H; i++) for (var c = 0; c < 3; c++) x[c * W * H + i] = d[4 * i + c] / 127.5 - 1;
    state.input = x;
  }

  function encode() {                                      // the three blocks' feature maps
    var r = rng(state.seed), f1 = conv(state.input, 3, H, W, 12, r);
    var p1 = pool(f1, 12, H, W), f2 = conv(p1.x, 12, p1.h, p1.w, 24, r);
    var p2 = pool(f2, 24, p1.h, p1.w), f3 = conv(p2.x, 24, p2.h, p2.w, 32, r);
    state.feats = [{ x: f1, c: 12, h: H, w: W }, { x: f2, c: 24, h: p1.h, w: p1.w }, { x: f3, c: 32, h: p2.h, w: p2.w }];
  }

  function composite() {                                   // NAVE's composite features, one row per pixel
    var used = state.feats.filter(function (f, i) { return state.blocks[i]; });
    var D = used.reduce(function (s, f) { return s + f.c; }, 0), N = W * H, out = new Float32Array(N * D), scale = 1 / Math.sqrt(used.length);
    for (var yy = 0; yy < H; yy++) for (var xx = 0; xx < W; xx++) {
      var p = yy * W + xx, off = p * D;
      used.forEach(function (f) {
        var sy = Math.min(f.h - 1, Math.floor(yy * f.h / H)), sx = Math.min(f.w - 1, Math.floor(xx * f.w / W)), q = sy * f.w + sx, n = 0, c;
        for (c = 0; c < f.c; c++) { var v = f.x[c * f.h * f.w + q]; n += v * v; }
        n = n > 0 ? scale / Math.sqrt(n) : 0;
        for (c = 0; c < f.c; c++) out[off + c] = f.x[c * f.h * f.w + q] * n;
        off += f.c;
      });
    }
    return { x: out, D: D, N: N };
  }

  function kmeans(data, K) {                               // k-means++ start, then 12 rounds
    var x = data.x, D = data.D, N = data.N, r = rng(state.seed * 31 + K), C = new Float32Array(K * D), lab = new Uint8Array(N), d2 = new Float32Array(N).fill(Infinity), i, j, k;
    var first = Math.floor(r() * N); for (j = 0; j < D; j++) C[j] = x[first * D + j];
    for (k = 1; k < K; k++) {
      var total = 0;
      for (i = 0; i < N; i++) { var d = 0; for (j = 0; j < D; j++) { var e = x[i * D + j] - C[(k - 1) * D + j]; d += e * e; } if (d < d2[i]) d2[i] = d; total += d2[i]; }
      var target = r() * total, pick = 0; for (i = 0; i < N; i++) { target -= d2[i]; if (target <= 0) { pick = i; break; } }
      for (j = 0; j < D; j++) C[k * D + j] = x[pick * D + j];
    }
    for (var it = 0; it < 12; it++) {
      var sum = new Float32Array(K * D), cnt = new Uint32Array(K);
      for (i = 0; i < N; i++) {
        var best = 0, bd = Infinity;
        for (k = 0; k < K; k++) { var dd = 0; for (j = 0; j < D; j++) { var q = x[i * D + j] - C[k * D + j]; dd += q * q; } if (dd < bd) { bd = dd; best = k; } }
        lab[i] = best; cnt[best]++; for (j = 0; j < D; j++) sum[best * D + j] += x[i * D + j];
      }
      for (k = 0; k < K; k++) if (cnt[k]) for (j = 0; j < D; j++) C[k * D + j] = sum[k * D + j] / cnt[k];
    }
    var order = Array.from({ length: K }, function (_, k) { return k; });                 // colours by mean height
    var meanY = new Float32Array(K); for (i = 0; i < N; i++) meanY[lab[i]] += Math.floor(i / W);
    order.sort(function (a, b) { return meanY[a] / Math.max(1, cnt[a]) - meanY[b] / Math.max(1, cnt[b]); });
    var rank = new Uint8Array(K); order.forEach(function (k, n) { rank[k] = n; });
    for (i = 0; i < N; i++) lab[i] = rank[lab[i]];
    return lab;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    if (!state.concepts) { ctx.drawImage(photo, 0, 0, canvas.width, canvas.height); return; }
    if (!state.labels) { ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, canvas.width, canvas.height); return; }   // no block: white
    // each connected area of a concept, painted in the average colour of the photo under it
    var N = W * H, lab = state.labels, rgb = state.rgb, region = new Int32Array(N).fill(-1), stack = new Int32Array(N);
    var sums = [], n = 0;
    for (var start = 0; start < N; start++) {
      if (region[start] >= 0) continue;
      var top = 0, r = 0, g = 0, b = 0, count = 0, l = lab[start];
      stack[top++] = start; region[start] = n;
      while (top) {
        var q = stack[--top], qx = q % W;
        r += rgb[4 * q]; g += rgb[4 * q + 1]; b += rgb[4 * q + 2]; count++;
        if (qx > 0 && region[q - 1] < 0 && lab[q - 1] === l) { region[q - 1] = n; stack[top++] = q - 1; }
        if (qx < W - 1 && region[q + 1] < 0 && lab[q + 1] === l) { region[q + 1] = n; stack[top++] = q + 1; }
        if (q >= W && region[q - W] < 0 && lab[q - W] === l) { region[q - W] = n; stack[top++] = q - W; }
        if (q + W < N && region[q + W] < 0 && lab[q + W] === l) { region[q + W] = n; stack[top++] = q + W; }
      }
      sums.push([r / count, g / count, b / count]); n++;
    }
    var t = document.createElement("canvas"); t.width = W; t.height = H;
    var tc = t.getContext("2d"), img = tc.createImageData(W, H);
    for (var i = 0; i < N; i++) {
      var col = sums[region[i]];
      img.data[4 * i] = col[0]; img.data[4 * i + 1] = col[1]; img.data[4 * i + 2] = col[2]; img.data[4 * i + 3] = 255;
    }
    tc.putImageData(img, 0, 0);
    ctx.drawImage(t, 0, 0, canvas.width, canvas.height);
  }

  function run(reencode) {
    if (!state.blocks.some(Boolean)) { state.labels = null; draw(); return; }
    if (reencode || !state.feats) encode();
    state.labels = kmeans(composite(), state.k);
    draw();
  }

  function start() { readPhoto(); run(true); }
  if (photo.complete && photo.naturalWidth) start(); else photo.addEventListener("load", start);

  var toggle = document.getElementById("nave-toggle");
  toggle.addEventListener("click", function () {
    state.concepts = !state.concepts;
    toggle.textContent = state.concepts ? "Photo" : "Concepts";
    toggle.setAttribute("aria-pressed", String(state.concepts));
    draw();
  });
  document.getElementById("nave-new").addEventListener("click", function () { state.seed = Math.floor(Math.random() * 1e9); run(true); });
  var kInput = document.getElementById("nave-k"), kOut = document.getElementById("nave-k-out");
  kInput.addEventListener("input", function () { state.k = +kInput.value; kOut.textContent = kInput.value; run(false); });
  document.querySelectorAll(".demo-blocks input").forEach(function (box) {
    box.addEventListener("change", function () { state.blocks[+box.dataset.block] = box.checked; run(false); });
  });
})();
