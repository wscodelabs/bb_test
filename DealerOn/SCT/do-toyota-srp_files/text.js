"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};dealeron.runtime.define([],function(){function t(t){if("string"!=typeof t)return JSON.stringify(t);var n=arguments[1]instanceof Array?arguments[1]:arguments,r=arguments[1]instanceof Array?0:1;return t.replace(s,function(t,e){if(isNaN(parseInt(e)))return"object"!==_typeof(n[r])?"":(n[r][e]||"").toString()||"";var o=parseInt(e);if(o+r>=n.length)return"";var i=n[o+r];return"undefined"==typeof i||null===i?"":"string"!=typeof i&&"number"!=typeof i?JSON.stringify(i):i.toString()})}function n(n){var r=[];for(var e in n)r.push(t("{0}={1}",encodeURIComponent(e),encodeURIComponent(n[e])));return r.join("&")}function r(t){t||(t=window.location.search),t=t.replace(/^\?/,"");for(var n={},r=t.split("&"),e=0;e<r.length;e++){var o=r[e].split("=");if(2===o.length){var i=decodeURIComponent(o[0]),f=decodeURIComponent(o[1]);n[i]=f}}return n}function e(t){for(var n=t.split(/[\W]+/),r=n[0],e=r.toLowerCase(),o=1;o<n.length;o++){var i=n[o][0].toUpperCase()+n[o].substring(1).toLowerCase();e+=i}return e}function o(t,n){return(t||"").toString().toLowerCase()===(n||"").toString().toLowerCase()}function i(t,n){if(!t||!n)return!1;var r=(t||"").toString().toLowerCase(),e=(n||"").toString().toLowerCase();return r.indexOf(e)>-1}function f(t){try{return JSON.parse(t)}catch(n){return t}}function a(t,n){return 0===t.indexOf(n)}function u(t,n){var r=t.indexOf(n);return r!==-1&&r===t.length-n.length}var s=/{([^}]+)}/g;return{from:t,toQuery:n,fromQuery:r,camelCase:e,equalsIgnoreCase:o,containsIgnoreCase:i,parseType:f,startsWith:a,endsWith:u}});