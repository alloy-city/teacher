/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-cors-video-websockets-setclasses !*/
!function (e, a, n) { function o(e, a) { return typeof e === a } function c() { var e, a, n, c, s, t, r; for (var p in l) if (l.hasOwnProperty(p)) { if (e = [], a = l[p], a.name && (e.push(a.name.toLowerCase()), a.options && a.options.aliases && a.options.aliases.length)) for (n = 0; n < a.options.aliases.length; n++)e.push(a.options.aliases[n].toLowerCase()); for (c = o(a.fn, "function") ? a.fn() : a.fn, s = 0; s < e.length; s++)t = e[s], r = t.split("."), 1 === r.length ? Modernizr[r[0]] = c : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = c), i.push((c ? "" : "no-") + r.join("-")) } } function s(e) { var a = u.className, n = Modernizr._config.classPrefix || ""; if (f && (a = a.baseVal), Modernizr._config.enableJSClass) { var o = new RegExp("(^|\\s)" + n + "no-js(\\s|$)"); a = a.replace(o, "$1" + n + "js$2") } Modernizr._config.enableClasses && (a += " " + n + e.join(" " + n), f ? u.className.baseVal = a : u.className = a) } function t() { return "function" != typeof a.createElement ? a.createElement(arguments[0]) : f ? a.createElementNS.call(a, "http://www.w3.org/2000/svg", arguments[0]) : a.createElement.apply(a, arguments) } var i = [], l = [], r = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, a) { var n = this; setTimeout(function () { a(n[e]) }, 0) }, addTest: function (e, a, n) { l.push({ name: e, fn: a, options: n }) }, addAsyncTest: function (e) { l.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = r, Modernizr = new Modernizr, Modernizr.addTest("cors", "XMLHttpRequest" in e && "withCredentials" in new XMLHttpRequest); var p = !1; try { p = "WebSocket" in e && 2 === e.WebSocket.CLOSING } catch (d) { } Modernizr.addTest("websockets", p); var u = a.documentElement, f = "svg" === u.nodeName.toLowerCase(); Modernizr.addTest("video", function () { var e = t("video"), a = !1; try { a = !!e.canPlayType, a && (a = new Boolean(a), a.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), a.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), a.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), a.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), a.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, "")) } catch (n) { } return a }), Modernizr.addTest("audio", function () { var e = t("audio"), a = !1; try { a = !!e.canPlayType, a && (a = new Boolean(a), a.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), a.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), a.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), a.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), a.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, "")) } catch (n) { } return a }), c(), s(i), delete r.addTest, delete r.addAsyncTest; for (var y = 0; y < Modernizr._q.length; y++)Modernizr._q[y](); e.Modernizr = Modernizr }(window, document);

export default () => {
    /// #if DEBUG
    // console.log(Modernizr);
    /// #endif
    if (
        Modernizr.audio.m4a &&
        Modernizr.audio.mp3 &&
        Modernizr.audio.ogg &&
        Modernizr.audio.opus &&
        Modernizr.audio.wav &&
        Modernizr.cors &&
        Modernizr.video.h264 &&
        Modernizr.video.ogg &&
        Modernizr.video.vp9 &&
        Modernizr.video.webm &&
        Modernizr.websockets
    ) {
        /// #if DEBUG
        // console.log("Browser compatible.")
        /// #endif
        return true
    } else {
        console.error("Please, use another broswer");
        notify(string.alerts.uncompatibleBrowser, "danger", true);
        return false
    }
}
