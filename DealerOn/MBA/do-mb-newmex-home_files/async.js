"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();dealeron.runtime.define(["system/logManager","system/linq"],function(e,t){var r=e.getLogger("Async Ops"),n={DEFERRED:0,PENDING:1,DONE:2};return function(){function e(t){_classCallCheck(this,e),this._error=null,this._result=null,this._defferredAction=t,this._state=n.DEFERRED,this._observers=[]}return _createClass(e,[{key:"then",value:function(e){var t=this;return this._state==n.DONE?void this._execAsync(function(){return e(t._error,t._result)}):this._state==n.DEFERRED?(this._observers.push(e),void this.execute()):void this._observers.push(e)}},{key:"execute",value:function(){var e=this;this._state===n.DEFERRED&&(this._state=n.PENDING,this._execAsync(function(){return e._defferredAction(function(t){return e._resolve(t)},function(t){return e._reject(t)})}))}},{key:"_resolve",value:function(e){return this._state===n.DONE?void r.warn("Multiple resolutions to a promise were attempted. These will be ignored."):(this._state=n.DONE,this._result=e,void this._publishResults())}},{key:"_reject",value:function(e){return this._state===n.DONE?void r.warn("Multiple resolutions to a promise were attempted. These will be ignored."):(this._state=n.DONE,this._error=e,void this._publishResults())}},{key:"_execAsync",value:function(e){return window.setImmediate?void window.setImmediate(e):void window.setTimeout(e,0)}},{key:"_publishResults",value:function(){var e=this;t.Enumerable.from(this._observers).forEach(function(t){return e._execAsync(function(){return t(e._error,e._result)})})}}],[{key:"await",value:function(t){return new e(t)}},{key:"awaitAll",value:function(r){r=t.Enumerable.from(r).toArray();var n=[];return new e(function(e,t){for(var s=function(s,i){s&&t(s),n.push(i),n.length===r.length&&e(n)},i=0;i<r.length;i++){var u=r[i];u.then(s)}})}}]),e}()});