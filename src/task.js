/**
 * @use /demand/abstract/uuid
 * @use /demand/pledge
 * @use /demand/validator/isInstanceOf
 * @use /demand/function/defer
 *
 * @require ./support/method
 */

(function(global) {
	'use strict';

	function definition(abstractUuid, Pledge, isInstanceOf, defer, supportMethod) {
		var ArrayBuffer  = 'ArrayBuffer' in global ? ArrayBuffer : null,
			NativeWorker = supportMethod('Worker'),
			NativeUrl    = supportMethod('URL'),
			NativeBlob   = supportMethod('Blob'),
			supported    = NativeWorker && NativeUrl && NativeBlob,
			source       = 'function d(a){return a.replace(c,"").trim()}function e(a){return a}var a=this,b=/function\s.*?\(([^)]*)\)/,c=/\/\*.*\*\//;a.addEventListener("message",function(b){a.postMessage({type:"result",result:a.process(b.data.load).apply(null,b.data.parameter)})},!1),a.process=function(a){var c=a.match(b)[1].split(",").map(d).filter(e);return c.push(a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))),Function.apply(null,c)};',
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
					thread.postMessage({ load: task.load.toString(), parameter: task.parameter }, ArrayBuffer && isInstanceOf(task.parameter, ArrayBuffer) ? [ task.parameter ] : null);
				} else {
					defer(function(){
						try {
							task.deferred.resolve(task.load.apply(null, task.parameter));
						} catch(exception) {
							task.deferred.reject();
						}

						processQueue();
					});
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
			var self     = this.parent.constructor.call(this),
				deferred = Pledge.defer();

			self.deferred  = deferred;
			self.load      = load;
			self.parameter = parameter || [];

			queue.push(self);
			processQueue();

			return deferred.pledge;
		}

		Task.prototype = {
			/* only for reference
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

		return Task.extends(abstractUuid);
	}

	provide([ '/demand/abstract/uuid', '/demand/pledge', '/demand/validator/isInstanceOf', '/demand/function/defer', './support/method' ],definition);
}(this));