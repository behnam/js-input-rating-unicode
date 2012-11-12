js-input-rating-unicode
=======================

JavaScript rating input element using Unicode

Version 0.6.1

<http://code.behnam.es/js-input-rating-unicode/>

JavaScript Library
------------------

This is a javascript library to create graphical form input elements
using Unicode characters, like
[Geometry Shapes](http://www.unicode.org/charts/PDF/U25A0.pdf) and
[Block Elements](http://www.unicode.org/charts/PDF/U2580.pdf).

Try out some of it's features on the [test page](test.html).

How to Use
----------

To use the library, download the files and add this lines on the HTML
head section:

    <script charset="utf-8" src="jquery-1.8.2.min.js"></script>
    <script charset="utf-8" src="js-input-rating-unicode.js"></script>
    <link rel="stylesheet" href="js-input-rating-unicode.css" />

You can also configure the library after it's imported, for example:

    <script>
	input_rating_unicode.config.default_options.mode = 'BLACK CIRCLE';
    </script>

And here's a list of supported modes:

    * ●○		BLACK CIRCLE
    * ●◐○		BLACK CIRCLE, HALF
    * ○●		WHITE CIRCLE
    * ○◑●		WHITE CIRCLE, HALF
    * ○◔◑◕●		WHITE CIRCLE, QUADRANT
    * ■□		BLACK SQUARE
    * ■◧□		BLACK SQUARE, HALF
    * ■▦□		BLACK SQUARE, ORTHOGONAL
    * ■▦▤□		BLACK SQUARE, ORTHOGONAL, HORIZONTAL
    * ■▦▥□		BLACK SQUARE, ORTHOGONAL, VERTICAL
    * ■▩□		BLACK SQUARE, DIAGONAL
    * ■▩▧□		BLACK SQUARE, DIAGONAL, LOWER RIGHT
    * ■▩▨□		BLACK SQUARE, DIAGONAL, LOWER LEFT
    * □■		WHITE SQUARE
    * □◨■		WHITE SQUARE, HALF
    * □▦■		WHITE SQUARE, ORTHOGONAL
    * □▤▦■		WHITE SQUARE, ORTHOGONAL, HORIZONTAL
    * □▥▦■		WHITE SQUARE, ORTHOGONAL, VERTICAL
    * □▩■		WHITE SQUARE, DIAGONAL
    * □▧▩■		WHITE SQUARE, DIAGONAL, LOWER RIGHT
    * □▨▩■		WHITE SQUARE, DIAGONAL, LOWER LEFT
    * █▇▆▅▄▃▂▁ 		BLACK BLOCK, STEPS
    * █▉▊▋▌▍▎▏ 		BLACK BLOCK, BARS
    * █▓▒░ 		BLACK BLOCK, SHADES
    * █▛▌▘ 		BLACK BLOCK, QUADRANTS, TOP
    * █▙▌▖ 		BLACK BLOCK, QUADRANTS, BOTTOM
    * █▛▌▖ 		BLACK BLOCK, QUADRANTS, ALTERNATE


Code License
------------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Copyright (C) 2011-2012  Behnam Esfahbod  <http://behnam.es/>.

