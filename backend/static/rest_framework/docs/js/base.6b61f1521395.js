function getSearchTerm() {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split("&");
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == "q") {
      return sParameterName[1];
    }
  }
}

$(document).ready(() => {
  let search_term = getSearchTerm(),
    $search_modal = $("#mkdocs_search_modal");

  if (search_term) {
    $search_modal.modal();
  }

  // make sure search input gets autofocus everytime modal opens.
  $search_modal.on("shown.bs.modal", () => {
    $search_modal.find("#mkdocs-search-query").focus();
  });

  // Highlight.js
  hljs.initHighlightingOnLoad();
  $("table").addClass("table table-striped table-hover");
});


$("body").scrollspy({
  target: ".bs-sidebar",
});

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(() => {
  event.preventDefault();
});
