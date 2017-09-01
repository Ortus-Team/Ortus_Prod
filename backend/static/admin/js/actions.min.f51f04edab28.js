(function (a) {
  let f; a.fn.actions = function (e) {
    let b = a.extend({}, a.fn.actions.defaults, e),
      g = a(this),
      k = !1,
      l = function () { a(b.acrossClears).hide(); a(b.acrossQuestions).show(); a(b.allContainer).hide(); },
      m = function () { a(b.acrossClears).show(); a(b.acrossQuestions).hide(); a(b.actionContainer).toggleClass(b.selectedClass); a(b.allContainer).show(); a(b.counterContainer).hide(); },
      n = function () { a(b.acrossClears).hide(); a(b.acrossQuestions).hide(); a(b.allContainer).hide(); a(b.counterContainer).show(); },
      p = function () {
        n();
        a(b.acrossInput).val(0); a(b.actionContainer).removeClass(b.selectedClass);
      },
      q = function (c) { c ? l() : n(); a(g).prop("checked", c).parent().parent().toggleClass(b.selectedClass, c); },
      h = function () {
        let c = a(g).filter(":checked").length,
          d = a(".action-counter").data("actionsIcnt"); a(b.counterContainer).html(interpolate(ngettext("%(sel)s of %(cnt)s selected", "%(sel)s of %(cnt)s selected", c), { sel: c, cnt: d }, !0)); a(b.allToggle).prop("checked", () => { let a; c === g.length ? (a = !0, l()) : (a = !1, p()); return a; });
      }; a(b.counterContainer).show();
    a(this).filter(":checked").each(function (c) { a(this).parent().parent().toggleClass(b.selectedClass); h(); a(b.acrossInput).val() === 1 && m(); }); a(b.allToggle).show().click(function () { q(a(this).prop("checked")); h(); }); a("a", b.acrossQuestions).click((c) => { c.preventDefault(); a(b.acrossInput).val(1); m(); }); a("a", b.acrossClears).click((c) => { c.preventDefault(); a(b.allToggle).prop("checked", !1); p(); q(0); h(); }); f = null; a(g).click((c) => {
      c || (c = window.event); const d = c.target ? c.target : c.srcElement; if (f &&
a.data(f) !== a.data(d) && !0 === c.shiftKey) { let e = !1; a(f).prop("checked", d.checked).parent().parent().toggleClass(b.selectedClass, d.checked); a(g).each(function () { if (a.data(this) === a.data(f) || a.data(this) === a.data(d))e = e ? !1 : !0; e && a(this).prop("checked", d.checked).parent().parent().toggleClass(b.selectedClass, d.checked); }); }a(d).parent().parent().toggleClass(b.selectedClass, d.checked); f = d; h();
    }); a("form#changelist-form table#result_list tr").find("td:gt(0) :input").change(() => { k = !0; }); a("form#changelist-form button[name=\"index\"]").click((a) => { if (k) return confirm(gettext("You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.")); });
    a("form#changelist-form input[name=\"_save\"]").click((c) => { let d = !1; a("select option:selected", b.actionContainer).each(function () { a(this).val() && (d = !0); }); if (d) return k ? confirm(gettext("You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.")) : confirm(gettext("You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.")); });
  };
  a.fn.actions.defaults = { actionContainer: "div.actions", counterContainer: "span.action-counter", allContainer: "div.actions span.all", acrossInput: "div.actions input.select-across", acrossQuestions: "div.actions span.question", acrossClears: "div.actions span.clear", allToggle: "#action-toggle", selectedClass: "selected" }; a(document).ready(() => { const e = a("tr input.action-select"); e.length > 0 && e.actions(); });
}(django.jQuery));
