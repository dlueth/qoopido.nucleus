/**
 * Qoopido support/test/capability/datauri
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
 */

(function(document) {
	'use strict';

	function definition(Pledge) {
		var defered = Pledge.defer(),
			sample  = document.createElement('img');

		sample.onload = function() {
			if(sample.width === 1 && sample.height === 1) {
				defered.resolve();
			} else {
				defered.reject();
			}

			delete sample.onload;
		};

		sample.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

		return defered.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(document));