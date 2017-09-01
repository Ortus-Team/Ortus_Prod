/* global showAddAnotherPopup, showRelatedObjectLookupPopup showRelatedObjectPopup updateRelatedObjectLinks */

(function ($) {
  $(document).ready(() => {
    const modelName = $("#django-admin-form-add-constants").data("modelName");
    $("body").on("click", ".add-another", function (e) {
      e.preventDefault();
      const event = $.Event("django:add-another-related");
      $(this).trigger(event);
      if (!event.isDefaultPrevented()) {
        showAddAnotherPopup(this);
      }
    });

    if (modelName) {
      $(`form#${modelName}_form :input:visible:enabled:first`).focus();
    }
  });
}(django.jQuery));
