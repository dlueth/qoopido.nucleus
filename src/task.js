/**
 * Qoopido task
 *
 * Provides basic web worker abstraction
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
 * @use /demand/validator/isInstanceOf
 *
 * @require ./base
 * @require ./support/method
 * @require ./function/unique/uuid
 */

(function() {
	'use strict';

	function definition(Pledge, isInstanceOf, base, supportMethod, functionUniqueUuid) {
		var NativeWorker = supportMethod('Worker'),
			NativeUrl    = supportMethod('URL'),
			NativeBlob   = supportMethod('Blob'),
			supported    = NativeWorker && NativeUrl && NativeBlob,
			source       = 'var a=this,b=/\\s+/g;a.addEventListener("message",function(b){a.postMessage({type:"result",result:a.process(b.data.load).apply(null,b.data.parameter)})},!1),a.process=function(a){var c=a.substring(a.indexOf("(")+1,a.indexOf(")")).replace(b,",").split(",");return c.push(a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))),Function.apply(null,c)};',
			threads      = { idle: [], busy: {} },
			queue        = [],
			worker, i = 0;

		function processQueue() {
			var task, thread;

			if(queue.length && (!supported || threads.idle.length)) {
				task = queue.shift();

				if(supported) {
					thread = threads.idle.shift();

					threads.busy[task.uuid] = thread;

					thread.addEventListener('message', task.onMessage);
					thread.addEventListener('error', task.onError);
					thread.postMessage({ load: task.load.toString(), parameter: task.parameter }, isInstanceOf(task.parameter, ArrayBuffer) ? [ task.parameter ] : null);
				} else {
					setTimeout(function(){
						try {
							task.deferred.resolve(task.load.apply(null, task.parameter));
						} catch(exception) {
							task.deferred.reject();
						}

						processQueue();
					}, 4);
				}
			}
		}

		function disposeTask(task) {
			var thread = threads.busy[task.uuid];

			delete threads.busy[task.uuid];

			thread.removeEventListener('message', task.onMessage);
			thread.removeEventListener('error', task.onError);
			threads.idle.push(thread);
			processQueue();
		}

		function Task(load, parameter) {
			var self     = this,
				deferred = Pledge.defer();

			self.uuid      = functionUniqueUuid();
			self.deferred  = deferred;
			self.load      = load;
			self.parameter = parameter || [];

			queue.push(self);
			processQueue();

			return deferred.pledge;
		}


		Task.prototype = {
			/* only for reference
			uuid:      null,
			deferred:  null,
			load:      null,
			parameter: null,
			*/
			onMessage: function(event) {
				var self = this;

				if(event.data.type === 'result') {
					self.deferred.resolve(event.data.result);
					disposeTask(self);
				}
			},
			onError: function() {
				var self = this;

				self.deferred.reject();
				disposeTask(self);
			}
		};

		if(supported) {
			try {
				worker = NativeUrl.createObjectURL(new NativeBlob([ source ], { type: 'application/javascript' }));

				for(; i < 4; i++) {
					threads.idle[i] = new NativeWorker(worker);
				}
			} catch(exception) {
				supported = false;
			}
		}

		return base.extend(Task);
	}

	provide([ '/demand/pledge', '/demand/validator/isInstanceOf', './base', './support/method', './function/unique/uuid' ],definition);
}());