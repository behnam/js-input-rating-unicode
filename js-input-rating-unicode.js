/* charset=utf-8
 *
 * js-input-rating-unicode
 * JavaScript rating input element using Unicode
 *
 * Version 0.6
 * http://code.behnam.es/js-input-rating-unicode/
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright (C) 2011-2012  Behnam Esfahbod  <behnam@behnam.es>
 */


window.input_rating_unicode = (function($){
  var config = {
    prefix: 'input-rating-unicode',

    default_options: {
      'mode': 'BLACK SQUARE',
      'min': 0,
      'max': 5,
      'size': 5,
      'size-auto': true,
      /* TODO 'cancelable': false, */
    },

    modes: {
      "BLACK CIRCLE":				'●○',
      "BLACK CIRCLE, HALF":			'●◐○',
      "WHITE CIRCLE":				'○●',
      "WHITE CIRCLE, HALF":			'○◑●',
      "WHITE CIRCLE, QUADRANT":			'○◔◑◕●',

      "BLACK SQUARE":				'■□',
      "BLACK SQUARE, HALF":			'■◧□',
      "BLACK SQUARE, ORTHOGONAL":		'■▦□',
      "BLACK SQUARE, ORTHOGONAL, HORIZONTAL":	'■▦▤□',
      "BLACK SQUARE, ORTHOGONAL, VERTICAL":	'■▦▥□',
      "BLACK SQUARE, DIAGONAL":			'■▩□',
      "BLACK SQUARE, DIAGONAL, LOWER RIGHT":	'■▩▧□',
      "BLACK SQUARE, DIAGONAL, LOWER LEFT":	'■▩▨□',
      "WHITE SQUARE":				'□■',
      "WHITE SQUARE, HALF":			'□◨■',

      "BLACK BLOCK, STEPS":			'█▇▆▅▄▃▂▁ ',
      "BLACK BLOCK, BARS":			'█▉▊▋▌▍▎▏ ',
      "BLACK BLOCK, SHADES":			'█▓▒░ ',

      "BLACK BLOCK, QUADRANTS, TOP":		'█▛▌▘ ',
      "BLACK BLOCK, QUADRANTS, BOTTOM":		'█▙▌▖ ',
      "BLACK BLOCK, QUADRANTS, ALTERNATE":	'█▛▌▖ ',
    },

    on_init: null,
  };

  function init_page () {
    $("input."+config.prefix).each(function(){
      create(this);
    });
    if (config.on_init !== null)
      config.on_init();
  };

  function create (input) {
    var $input = $(input);
    var o = {};

    if (typeof input._rating !== 'undefined') {
      /* Remove old box, keep the options */
      o = input._rating._options;
      $(input._rating).remove();
    }
    else {
      /* Set new options */
      o = $.extend({}, config.default_options);
      $.each(['min', 'max'], function (i, x) {
	var v = $input.attr(x);
	if (o[x] === null && v !== undefined) o[x] = parseFloat(v);
      });
      $.each(['size'], function (i, x) {
	var v = $input.data(config.prefix+'-'+x);
	if (o[x] === null && v !== undefined) o[x] = parseFloat(v);
      });
      $.each(['size-auto'], function (i, x) {
	var v = $input.data(config.prefix+'-'+x);
	if (o[x] === null && v !== undefined) o[x] = /true/i.test(v);
      });
      $.each(['mode'], function (i, x) {
	var v = $input.data(config.prefix+'-'+x);
	if (o[x] === null && v !== undefined) o[x] = v;
      });
      o.chars = config.modes[o.mode];
    }
    if (o['size-auto']) o.size = o.max;
    o.chars = config.modes[o.mode];
    o.degree = o.chars.length-1;

    /* Create the rating box */
    var html = '<div '
      + 'class="'+ config.prefix+'-box' +'" '
      + 'style="display: inline-block;" '
      + '>';
    html += '<div '
      + 'class="'+ config.prefix+'-shadow' +'" '
      + 'style="pointer-events: none; position: absolute; z-index: -1;" '
      + '></div>';
    html += '<div '
      + 'class="'+ config.prefix+'-highlight' +'" '
      + 'style="pointer-events: none; position: absolute; z-index: 1;" '
      + '></div>';
    html += '<div '
      + 'class="'+ config.prefix+'-text' +'" '
      + 'style="pointer-events: none;" '
      + '></div>';
    html += '</div>';
    var rating = input._rating = $input.after(html).next().get(0);
    var $rating = $(rating);

    rating._options = o;
    rating._input = input;
    rating._$text = $rating.children('.'+config.prefix+'-text');
    rating._$shadow = $rating.children('.'+config.prefix+'-shadow');
    rating._$highlight = $rating.children('.'+config.prefix+'-highlight');

    rating._$shadow.text(
	gen_text(rating._options, rating._options.size));

    /* Set callbacks */
    $input.change(function (event) {
      _set_value (event.target._rating, event.target.value);
    }).change();

    $rating.bind(
	'mousedown mousemove mouseout mouseup',
	function (event) {
	  var rating = event.target;
	  var $rating = $(rating);
	  switch (event.type) {
	    case 'mouseup':
	      _set_value (rating, _read_mouse(rating, event));
	    case 'mousemove':
	      _highlight_value (rating, _read_mouse(rating, event));
	      break;
	    case 'mouseout':
	      _highlight_value (rating, null);
	      break;
	    case 'mousedown':
	      return false;
	  }
	}
    );

    /* Hide actual input */
    $input.addClass(config.prefix+'-input');
  }

  function _read_mouse (rating, event) {
    var $rating = $(rating);
    var o = rating._options;
    var w = $rating.width();
    var x = event.offsetX - (rating._$text.offset().left - $rating.offset().left);
    var v1 = o.size * (x / w);
    var v2 = Math.round(v1 * o.degree) / o.degree;
    if (v2 < o.min) v2 = o.min;
    if (v2 > o.max) v2 = o.max;
    return v2;
  }

  function _highlight_value (rating, value) {
    var $rating = $(rating);
    if (value === null) {
      rating._$highlight.css('display', 'none');
    }
    else {
      rating._$highlight.css('display', 'block');
      rating._$highlight.text(
	  gen_text(rating._options, value));
    }
  }

  function _set_value (rating, value) {
    var o = rating._options;
    if (value < o.min) value = o.min;
    if (value > o.max) value = o.max;
    rating._options.value = rating._input.value = value;
    rating._$text.text(
	gen_text(rating._options, value));
  }

  function gen_text (options, value) {
    var vi = Math.floor(value),
	vr = value - vi;

    var str = "";
    for (var x = 1; x <= vi; x++) {
      str += options.chars[0];
    }
    if (value < options.size) {
      var x = Math.floor((1-vr) * options.degree);
      str += options.chars[x];
    }
    for (var x = vi+2; x <= options.size; x++) {
      str += options.chars[options.degree];
    }
    return str;
  }

  function set_option (input, opt_name, opt_value) {
    if (typeof input._rating === 'undefined') return;
    input._rating._options[opt_name] = opt_value;
    create(input);
  }

  /* Initialize page */
  $(init_page);

  /* Public API */
  return {
    config: config,
    init_page: init_page,
    create: create,
    gen_text: gen_text,
    set_option: set_option,
  };

})(jQuery);

