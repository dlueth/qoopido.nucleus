/**
 * Qoopido support/test/css/borderradius
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @use /demand/pledge
 *
 * @require ../../css/property
 */

(function() {
	'use strict';

	function definition(Pledge, getCssProperty) {
		var defered  = Pledge.defer(),
			property = getCssProperty('border-radius');

		if(property) {
			defered.resolve(property);
		} else {
			defered.reject();
		}

		return defered.pledge;
	}

	provide([ '/demand/pledge', '../../css/property' ], definition);
}());