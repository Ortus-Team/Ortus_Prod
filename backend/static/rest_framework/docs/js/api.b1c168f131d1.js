function normalizeHTTPHeader(str) {
  // Capitalize HTTP headers for display.
  return (str.charAt(0).toUpperCase() + str.substring(1))
    .replace(/-(.)/g, ($1) => $1.toUpperCase())
    .replace(/(Www)/g, ($1) => "WWW")
    .replace(/(Xss)/g, ($1) => "XSS")
    .replace(/(Md5)/g, ($1) => "MD5");
}

let responseDisplay = "data";
const coreapi = window.coreapi;
const schema = window.schema;

// Language Control
$("#language-control li").click(function (event) {
  event.preventDefault();
  const languageMenuItem = $(this).find("a");
  const language = languageMenuItem.data("language");

  const languageControls = $(this).closest("ul").find("li");
  languageControls.find("a").not(`[data-language="${language}"]`).parent().removeClass("active");
  languageControls.find("a").filter(`[data-language="${language}"]`).parent().addClass("active");

  $("#selected-language").text(language);

  const codeBlocks = $("pre.highlight");
  codeBlocks.not(`[data-language="${language}"]`).addClass("hide");
  codeBlocks.filter(`[data-language="${language}"]`).removeClass("hide");
});

function formEntries(form) {
  // Polyfill for new FormData(form).entries()
  const formData = new FormData(form);
  if (formData.entries !== undefined) {
    return formData.entries();
  }

  const entries = [];

  for (const { name, type, value, files, checked, selectedOptions } of Array.from(form.elements)) {
    if (!name) {
      continue;
    }

    if (type === "file") {
      for (const file of files) {
        entries.push([name, file]);
      }
    } else if (type === "select-multiple" || type === "select-one") {
      for (const elm of Array.from(selectedOptions)) {
        entries.push([name, elm.value]);
      }
    } else if (type === "checkbox") {
      if (checked) {
        entries.push([name, value]);
      }
    } else {
      entries.push([name, value]);
    }
  }
  return entries;
}

// API Explorer
$("form.api-interaction").submit(function (event) {
  event.preventDefault();

  const form = $(this).closest("form");
  const key = form.data("key");
  const params = {};

  const entries = formEntries(form.get()[0]);
  for (const [paramKey, paramValue] of entries) {
    const elem = form.find(`[name=${paramKey}]`);
    const dataType = elem.data("type") || "string";

    if (dataType === "integer" && paramValue) {
      var value = parseInt(paramValue);
      if (!isNaN(value)) {
        params[paramKey] = value;
      }
    } else if (dataType === "number" && paramValue) {
      var value = parseFloat(paramValue);
      if (!isNaN(value)) {
        params[paramKey] = value;
      }
    } else if (dataType === "boolean" && paramValue) {
      var value = {
        true: true,
        false: false,
      }[paramValue.toLowerCase()];
      if (value !== undefined) {
        params[paramKey];
      }
    } else if (dataType === "array" && paramValue) {
      try {
        params[paramKey] = JSON.parse(paramValue);
      } catch (err) {
        // Ignore malformed JSON
      }
    } else if (dataType === "object" && paramValue) {
      try {
        params[paramKey] = JSON.parse(paramValue);
      } catch (err) {
        // Ignore malformed JSON
      }
    } else if (dataType === "string" && paramValue) {
      params[paramKey] = paramValue;
    }
  }

  form.find(":checkbox").each(function (index) {
    // Handle unselected checkboxes
    const name = $(this).attr("name");
    if (!params.hasOwnProperty(name)) {
      params[name] = false;
    }
  });

  function requestCallback(request) {
    // Fill in the "GET /foo/" display.
    const parser = document.createElement("a");
    parser.href = request.url;
    const method = request.options.method;
    const path = parser.pathname + parser.hash + parser.search;

    form.find(".request-method").text(method);
    form.find(".request-url").text(path);
  }

  function responseCallback(response, responseText) {
    // Display the 'Data'/'Raw' control.
    form.closest(".modal-content").find(".toggle-view").removeClass("hide");

    // Fill in the "200 OK" display.
    form.find(".response-status-code").removeClass("label-success").removeClass("label-danger");
    if (response.ok) {
      form.find(".response-status-code").addClass("label-success");
    } else {
      form.find(".response-status-code").addClass("label-danger");
    }
    form.find(".response-status-code").text(response.status);
    form.find(".meta").removeClass("hide");

    // Fill in the Raw HTTP response display.
    let panelText = `HTTP/1.1 ${response.status} ${response.statusText}\n`;
    response.headers.forEach((header, key) => {
      panelText += `${normalizeHTTPHeader(key)}: ${header}\n`;
    });
    if (responseText) {
      panelText += `\n${responseText}`;
    }
    form.find(".response-raw-response").text(panelText);
  }

  // Instantiate a client to make the outgoing request.
  const options = {
    requestCallback,
    responseCallback,
  };

  // Setup authentication options.
  if (window.auth && window.auth.type === "token") {
    // Header authentication
    options.auth = new coreapi.auth.TokenAuthentication({
      prefix: window.auth.scheme,
      token: window.auth.token,
    });
  } else if (window.auth && window.auth.type === "basic") {
    // Basic authentication
    options.auth = new coreapi.auth.BasicAuthentication({
      username: window.auth.username,
      password: window.auth.password,
    });
  } else if (window.auth && window.auth.type === "session") {
    // Session authentication
    options.auth = new coreapi.auth.SessionAuthentication({
      csrfCookieName: "csrftoken",
      csrfHeaderName: "X-CSRFToken",
    });
  }

  const client = new coreapi.Client(options);

  client.action(schema, key, params).then((data) => {
    const response = JSON.stringify(data, null, 2);
    form.find(".request-awaiting").addClass("hide");
    form.find(".response-raw").addClass("hide");
    form.find(".response-data").addClass("hide");
    form.find(".response-data").text("");
    form.find(".response-data").jsonView(response);

    if (responseDisplay === "data") {
      form.find(".response-data").removeClass("hide");
    } else {
      form.find(".response-raw").removeClass("hide");
    }
  }).catch((error) => {
    const response = JSON.stringify(error.content, null, 2);
    form.find(".request-awaiting").addClass("hide");
    form.find(".response-raw").addClass("hide");
    form.find(".response-data").addClass("hide");
    form.find(".response-data").text("");
    form.find(".response-data").jsonView(response);

    if (responseDisplay === "data") {
      form.find(".response-data").removeClass("hide");
    } else {
      form.find(".response-raw").removeClass("hide");
    }
  });
});

// 'Data'/'Raw' control
$(".toggle-view button").click(function () {
  responseDisplay = $(this).data("display-toggle");
  $(this).removeClass("btn-default").addClass("btn-info").siblings().removeClass("btn-info");
  if (responseDisplay === "raw") {
    $(this).closest(".modal-content").find(".response-raw").removeClass("hide");
    $(this).closest(".modal-content").find(".response-data").addClass("hide");
  } else {
    $(this).closest(".modal-content").find(".response-data").removeClass("hide");
    $(this).closest(".modal-content").find(".response-raw").addClass("hide");
  }
});

// Authentication: none
$("#auth-control").find("[data-auth='none']").click((event) => {
  event.preventDefault();
  window.auth = null;
  $("#selected-authentication").text("none");
  $("#auth-control").children().removeClass("active");
  $("#auth-control").find("[data-auth='none']").addClass("active");
});

// Authentication: token
$("form.authentication-token-form").submit(function (event) {
  event.preventDefault();
  const form = $(this).closest("form");
  const scheme = form.find("input#scheme").val();
  const token = form.find("input#token").val();
  window.auth = {
    type: "token",
    scheme,
    token,
  };
  $("#selected-authentication").text("token");
  $("#auth-control").children().removeClass("active");
  $("#auth-control").find("[data-auth='token']").addClass("active");
  $("#auth_token_modal").modal("hide");
});

// Authentication: basic
$("form.authentication-basic-form").submit(function (event) {
  event.preventDefault();
  const form = $(this).closest("form");
  const username = form.find("input#username").val();
  const password = form.find("input#password").val();
  window.auth = {
    type: "basic",
    username,
    password,
  };
  $("#selected-authentication").text("basic");
  $("#auth-control").children().removeClass("active");
  $("#auth-control").find("[data-auth='basic']").addClass("active");
  $("#auth_basic_modal").modal("hide");
});

// Authentication: session
$("form.authentication-session-form").submit((event) => {
  event.preventDefault();
  window.auth = {
    type: "session",
  };
  $("#selected-authentication").text("session");
  $("#auth-control").children().removeClass("active");
  $("#auth-control").find("[data-auth='session']").addClass("active");
  $("#auth_session_modal").modal("hide");
});
