(function (c) {
  c.fn.prepopulate = function (e, f, g) {
    return this.each(function () {
      let a = c(this),
        b = function () { if (!a.data("_changed")) { const b = []; c.each(e, (a, d) => { d = c(d); d.val().length > 0 && b.push(d.val()); }); a.val(URLify(b.join(" "), f, g)); } }; a.data("_changed", !1); a.change(() => { a.data("_changed", !0); }); a.val() || c(e.join(",")).keyup(b).change(b).focus(b);
    });
  };
}(django.jQuery));
