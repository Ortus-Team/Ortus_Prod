(function ($) {
  $(() => {
    $(".cancel-link").click((e) => {
      e.preventDefault();
      window.history.back();
    });
  });
}(django.jQuery));
