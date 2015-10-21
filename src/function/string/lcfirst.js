/**
 * Qoopido function/string/ucfirst
 *
 * Provides globally unique uuids
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 */

(function() {
	'use strict';
	
	function definition() {
		return function functionStringLcfirst(value) {
			return value.charAt(0).toLowerCase() + value.slice(1);
		};
	}

	provide(definition);
}());