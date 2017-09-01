/* global DateTimeShortcuts, SelectFilter */
/**
 * Django admin inlines
 *
 * Based on jQuery Formset 1.1
 * @author Stanislaus Madueke (stan DOT madueke AT gmail DOT com)
 * @requires jQuery 1.2.6 or later
 *
 * Copyright (c) 2009, Stanislaus Madueke
 * All rights reserved.
 *
 * Spiced up with Code from Zain Memon's GSoC project 2009
 * and modified for Django by Jannis Leidel, Travis Swicegood and Julien Phalip.
 *
 * Licensed under the New BSD License
 * See: http://www.opensource.org/licenses/bsd-license.php
 */
(function ($) {
  $.fn.formset = function (opts) {
    const options = $.extend({}, $.fn.formset.defaults, opts);
    const $this = $(this);
    const $parent = $this.parent();
    const updateElementIndex = function (el, prefix, ndx) {
      const id_regex = new RegExp(`(${prefix}-(\\d+|__prefix__))`);
      const replacement = `${prefix}-${ndx}`;
      if ($(el).prop("for")) {
        $(el).prop("for", $(el).prop("for").replace(id_regex, replacement));
      }
      if (el.id) {
        el.id = el.id.replace(id_regex, replacement);
      }
      if (el.name) {
        el.name = el.name.replace(id_regex, replacement);
      }
    };
    const totalForms = $(`#id_${options.prefix}-TOTAL_FORMS`).prop("autocomplete", "off");
    let nextIndex = parseInt(totalForms.val(), 10);
    const maxForms = $(`#id_${options.prefix}-MAX_NUM_FORMS`).prop("autocomplete", "off");
    // only show the add button if we are allowed to add more items,
    // note that max_num = None translates to a blank string.
    const showAddButton = maxForms.val() === "" || (maxForms.val() - totalForms.val()) > 0;
    $this.each(function (i) {
      $(this).not(`.${options.emptyCssClass}`).addClass(options.formCssClass);
    });
    if ($this.length && showAddButton) {
      let addButton = options.addButton;
      if (addButton === null) {
        if ($this.prop("tagName") === "TR") {
          // If forms are laid out as table rows, insert the
          // "add" button in a new table row:
          const numCols = this.eq(-1).children().length;
          $parent.append(`<tr class="${options.addCssClass}"><td colspan="${numCols}"><a href="#">${options.addText}</a></tr>`);
          addButton = $parent.find("tr:last a");
        } else {
          // Otherwise, insert it immediately after the last form:
          $this.filter(":last").after(`<div class="${options.addCssClass}"><a href="#">${options.addText}</a></div>`);
          addButton = $this.filter(":last").next().find("a");
        }
      }
      addButton.click((e) => {
        e.preventDefault();
        const template = $(`#${options.prefix}-empty`);
        const row = template.clone(true);
        row.removeClass(options.emptyCssClass)
          .addClass(options.formCssClass)
          .attr("id", `${options.prefix}-${nextIndex}`);
        if (row.is("tr")) {
          // If the forms are laid out in table rows, insert
          // the remove button into the last table cell:
          row.children(":last").append(`<div><a class="${options.deleteCssClass}" href="#">${options.deleteText}</a></div>`);
        } else if (row.is("ul") || row.is("ol")) {
          // If they're laid out as an ordered/unordered list,
          // insert an <li> after the last list item:
          row.append(`<li><a class="${options.deleteCssClass}" href="#">${options.deleteText}</a></li>`);
        } else {
          // Otherwise, just insert the remove button as the
          // last child element of the form's container:
          row.children(":first").append(`<span><a class="${options.deleteCssClass}" href="#">${options.deleteText}</a></span>`);
        }
        row.find("*").each(function () {
          updateElementIndex(this, options.prefix, totalForms.val());
        });
        // Insert the new form when it has been fully edited
        row.insertBefore($(template));
        // Update number of total forms
        $(totalForms).val(parseInt(totalForms.val(), 10) + 1);
        nextIndex += 1;
        // Hide add button in case we've hit the max, except we want to add infinitely
        if ((maxForms.val() !== "") && (maxForms.val() - totalForms.val()) <= 0) {
          addButton.parent().hide();
        }
        // The delete button of each row triggers a bunch of other things
        row.find(`a.${options.deleteCssClass}`).click((e1) => {
          e1.preventDefault();
          // Remove the parent form containing this button:
          row.remove();
          nextIndex -= 1;
          // If a post-delete callback was provided, call it with the deleted form:
          if (options.removed) {
            options.removed(row);
          }
          $(document).trigger("formset:removed", [row, options.prefix]);
          // Update the TOTAL_FORMS form count.
          const forms = $(`.${options.formCssClass}`);
          $(`#id_${options.prefix}-TOTAL_FORMS`).val(forms.length);
          // Show add button again once we drop below max
          if ((maxForms.val() === "") || (maxForms.val() - forms.length) > 0) {
            addButton.parent().show();
          }
          // Also, update names and ids for all remaining form controls
          // so they remain in sequence:
          let i,
            formCount;
          const updateElementCallback = function () {
            updateElementIndex(this, options.prefix, i);
          };
          for (i = 0, formCount = forms.length; i < formCount; i++) {
            updateElementIndex($(forms).get(i), options.prefix, i);
            $(forms.get(i)).find("*").each(updateElementCallback);
          }
        });
        // If a post-add callback was supplied, call it with the added form:
        if (options.added) {
          options.added(row);
        }
        $(document).trigger("formset:added", [row, options.prefix]);
      });
    }
    return this;
  };

  /* Setup plugin defaults */
  $.fn.formset.defaults = {
    prefix: "form", // The form prefix for your django formset
    addText: "add another", // Text for the add link
    deleteText: "remove", // Text for the delete link
    addCssClass: "add-row", // CSS class applied to the add link
    deleteCssClass: "delete-row", // CSS class applied to the delete link
    emptyCssClass: "empty-row", // CSS class applied to the empty row
    formCssClass: "dynamic-form", // CSS class applied to each form in a formset
    added: null, // Function called each time a new form is added
    removed: null, // Function called each time a form is deleted
    addButton: null, // Existing add button to use
  };


  // Tabular inlines ---------------------------------------------------------
  $.fn.tabularFormset = function (options) {
    const $rows = $(this);
    const alternatingRows = function (row) {
      $($rows.selector).not(".add-row").removeClass("row1 row2")
        .filter(":even").addClass("row1").end()
        .filter(":odd").addClass("row2");
    };

    const reinitDateTimeShortCuts = function () {
      // Reinitialize the calendar and clock widgets by force
      if (typeof DateTimeShortcuts !== "undefined") {
        $(".datetimeshortcuts").remove();
        DateTimeShortcuts.init();
      }
    };

    const updateSelectFilter = function () {
      // If any SelectFilter widgets are a part of the new form,
      // instantiate a new SelectFilter instance for it.
      if (typeof SelectFilter !== "undefined") {
        $(".selectfilter").each((index, value) => {
          const namearr = value.name.split("-");
          SelectFilter.init(value.id, namearr[namearr.length - 1], false);
        });
        $(".selectfilterstacked").each((index, value) => {
          const namearr = value.name.split("-");
          SelectFilter.init(value.id, namearr[namearr.length - 1], true);
        });
      }
    };

    const initPrepopulatedFields = function (row) {
      row.find(".prepopulated_field").each(function () {
        let field = $(this),
          input = field.find("input, select, textarea"),
          dependency_list = input.data("dependency_list") || [],
          dependencies = [];
        $.each(dependency_list, (i, field_name) => {
          dependencies.push(`#${row.find(`.field-${field_name}`).find("input, select, textarea").attr("id")}`);
        });
        if (dependencies.length) {
          input.prepopulate(dependencies, input.attr("maxlength"));
        }
      });
    };

    $rows.formset({
      prefix: options.prefix,
      addText: options.addText,
      formCssClass: `dynamic-${options.prefix}`,
      deleteCssClass: "inline-deletelink",
      deleteText: options.deleteText,
      emptyCssClass: "empty-form",
      removed: alternatingRows,
      added(row) {
        initPrepopulatedFields(row);
        reinitDateTimeShortCuts();
        updateSelectFilter();
        alternatingRows(row);
      },
      addButton: options.addButton,
    });

    return $rows;
  };

  // Stacked inlines ---------------------------------------------------------
  $.fn.stackedFormset = function (options) {
    const $rows = $(this);
    const updateInlineLabel = function (row) {
      $($rows.selector).find(".inline_label").each(function (i) {
        const count = i + 1;
        $(this).html($(this).html().replace(/(#\d+)/g, `#${count}`));
      });
    };

    const reinitDateTimeShortCuts = function () {
      // Reinitialize the calendar and clock widgets by force, yuck.
      if (typeof DateTimeShortcuts !== "undefined") {
        $(".datetimeshortcuts").remove();
        DateTimeShortcuts.init();
      }
    };

    const updateSelectFilter = function () {
      // If any SelectFilter widgets were added, instantiate a new instance.
      if (typeof SelectFilter !== "undefined") {
        $(".selectfilter").each((index, value) => {
          const namearr = value.name.split("-");
          SelectFilter.init(value.id, namearr[namearr.length - 1], false);
        });
        $(".selectfilterstacked").each((index, value) => {
          const namearr = value.name.split("-");
          SelectFilter.init(value.id, namearr[namearr.length - 1], true);
        });
      }
    };

    const initPrepopulatedFields = function (row) {
      row.find(".prepopulated_field").each(function () {
        let field = $(this),
          input = field.find("input, select, textarea"),
          dependency_list = input.data("dependency_list") || [],
          dependencies = [];
        $.each(dependency_list, (i, field_name) => {
          dependencies.push(`#${row.find(`.form-row .field-${field_name}`).find("input, select, textarea").attr("id")}`);
        });
        if (dependencies.length) {
          input.prepopulate(dependencies, input.attr("maxlength"));
        }
      });
    };

    $rows.formset({
      prefix: options.prefix,
      addText: options.addText,
      formCssClass: `dynamic-${options.prefix}`,
      deleteCssClass: "inline-deletelink",
      deleteText: options.deleteText,
      emptyCssClass: "empty-form",
      removed: updateInlineLabel,
      added(row) {
        initPrepopulatedFields(row);
        reinitDateTimeShortCuts();
        updateSelectFilter();
        updateInlineLabel(row);
      },
      addButton: options.addButton,
    });

    return $rows;
  };

  $(document).ready(() => {
    $(".js-inline-admin-formset").each(function () {
      let data = $(this).data(),
        inlineOptions = data.inlineFormset;
      switch (data.inlineType) {
        case "stacked":
          $(`${inlineOptions.name}-group .inline-related`).stackedFormset(inlineOptions.options);
          break;
        case "tabular":
          $(`${inlineOptions.name}-group .tabular.inline-related tbody tr`).tabularFormset(inlineOptions.options);
          break;
      }
    });
  });
}(django.jQuery));
