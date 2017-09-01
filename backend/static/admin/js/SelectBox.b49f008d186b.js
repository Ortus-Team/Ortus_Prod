(function ($) {
  var SelectBox = {
    cache: {},
    init(id) {
      const box = document.getElementById(id);
      let node;
      SelectBox.cache[id] = [];
      const cache = SelectBox.cache[id];
      const boxOptions = box.options;
      const boxOptionsLength = boxOptions.length;
      for (let i = 0, j = boxOptionsLength; i < j; i++) {
        node = boxOptions[i];
        cache.push({ value: node.value, text: node.text, displayed: 1 });
      }
    },
    redisplay(id) {
      // Repopulate HTML select box from cache
      const box = document.getElementById(id);
      let node;
      $(box).empty(); // clear all options
      let new_options = box.outerHTML.slice(0, -9); // grab just the opening tag
      const cache = SelectBox.cache[id];
      for (let i = 0, j = cache.length; i < j; i++) {
        node = cache[i];
        if (node.displayed) {
          const new_option = new Option(node.text, node.value, false, false);
          // Shows a tooltip when hovering over the option
          new_option.setAttribute("title", node.text);
          new_options += new_option.outerHTML;
        }
      }
      new_options += "</select>";
      box.outerHTML = new_options;
    },
    filter(id, text) {
      // Redisplay the HTML select box, displaying only the choices containing ALL
      // the words in text. (It's an AND search.)
      const tokens = text.toLowerCase().split(/\s+/);
      let node,
        token;
      const cache = SelectBox.cache[id];
      for (let i = 0, j = cache.length; i < j; i++) {
        node = cache[i];
        node.displayed = 1;
        const node_text = node.text.toLowerCase();
        const numTokens = tokens.length;
        for (let k = 0; k < numTokens; k++) {
          token = tokens[k];
          if (node_text.indexOf(token) === -1) {
            node.displayed = 0;
            break; // Once the first token isn't found we're done
          }
        }
      }
      SelectBox.redisplay(id);
    },
    delete_from_cache(id, value) {
      let node,
        delete_index = null;
      const cache = SelectBox.cache[id];
      for (let i = 0, j = cache.length; i < j; i++) {
        node = cache[i];
        if (node.value === value) {
          delete_index = i;
          break;
        }
      }
      cache.splice(delete_index, 1);
    },
    add_to_cache(id, option) {
      SelectBox.cache[id].push({ value: option.value, text: option.text, displayed: 1 });
    },
    cache_contains(id, value) {
      // Check if an item is contained in the cache
      let node;
      const cache = SelectBox.cache[id];
      for (let i = 0, j = cache.length; i < j; i++) {
        node = cache[i];
        if (node.value === value) {
          return true;
        }
      }
      return false;
    },
    move(from, to) {
      const from_box = document.getElementById(from);
      let option;
      const boxOptions = from_box.options;
      const boxOptionsLength = boxOptions.length;
      for (let i = 0, j = boxOptionsLength; i < j; i++) {
        option = boxOptions[i];
        const option_value = option.value;
        if (option.selected && SelectBox.cache_contains(from, option_value)) {
          SelectBox.add_to_cache(to, { value: option_value, text: option.text, displayed: 1 });
          SelectBox.delete_from_cache(from, option_value);
        }
      }
      SelectBox.redisplay(from);
      SelectBox.redisplay(to);
    },
    move_all(from, to) {
      const from_box = document.getElementById(from);
      let option;
      const boxOptions = from_box.options;
      const boxOptionsLength = boxOptions.length;
      for (let i = 0, j = boxOptionsLength; i < j; i++) {
        option = boxOptions[i];
        const option_value = option.value;
        if (SelectBox.cache_contains(from, option_value)) {
          SelectBox.add_to_cache(to, { value: option_value, text: option.text, displayed: 1 });
          SelectBox.delete_from_cache(from, option_value);
        }
      }
      SelectBox.redisplay(from);
      SelectBox.redisplay(to);
    },
    sort(id) {
      SelectBox.cache[id].sort((a, b) => {
        a = a.text.toLowerCase();
        b = b.text.toLowerCase();
        try {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
        } catch (e) {
          // silently fail on IE 'unknown' exception
        }
        return 0;
      });
    },
    select_all(id) {
      const box = document.getElementById(id);
      const boxOptions = box.options;
      const boxOptionsLength = boxOptions.length;
      for (let i = 0; i < boxOptionsLength; i++) {
        boxOptions[i].selected = "selected";
      }
    },
  };
  window.SelectBox = SelectBox;
}(django.jQuery));
