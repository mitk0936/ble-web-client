/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/hm-10.js":
/*!**********************!*\
  !*** ./src/hm-10.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var hm10 = function hm10(_ref) {
  var onDisconnect = _ref.onDisconnect;
  // validate if BLE allowed
  var decoder = new TextDecoder("utf-8");
  var encoder = new TextEncoder("utf-8");
  var rxTxServiceId = '0000ffe0-0000-1000-8000-00805f9b34fb';
  var characteristicId = '0000ffe1-0000-1000-8000-00805f9b34fb';
  var service, characteristic;
  return function requestDevice() {
    return navigator.bluetooth.requestDevice({
      filters: [{
        services: [rxTxServiceId]
      }]
    }).then(function (device) {
      console.log('device', device);
      return device.gatt.connect();
    }).then(function (server) {
      console.log('server', server); // Getting Battery Service...

      return server.getPrimaryService(rxTxServiceId);
    }).then(function (service) {
      console.log('service', service); // Getting Battery Level Characteristic...

      return service.getCharacteristic(characteristicId);
    }).then(function (characteristic) {
      console.log('characteristic', characteristic);
      characteristic.startNotifications().then(function (char) {
        char.addEventListener('characteristicvaluechanged', function (response) {
          console.log(response.currentTarget.value.byteLength);
          alert(decoder.decode(response.currentTarget.value));
        });
      });
    }).then(function (value) {// console.log('Battery percentage is ' + value.getUint8(0));
    }).catch(function (error) {
      alert(error);
    }); // return navigator.bluetooth.requestDevice({
    //   filters: [{
    //     services: [rxTxServiceId]
    //   }]
    // })
    // .then(device => device.gatt.connect())
    // .then(server => server.getPrimaryService(rxTxServiceId))
    // .then(service => service.getCharacteristic(characteristicId))
    // .then(characteristic => {
    //   return {
    //     write: function (data) {
    //       characteristic.writeValue(
    //         encoder.encode(data)
    //       )
    //     },
    //     subscribe: function (onMessage) {
    //     }
    //   }
    //   console.log('Notifications have been started.');
    // })
    // .catch((err) => alert(err));
  };
};

/* harmony default export */ __webpack_exports__["default"] = (hm10);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hm_10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hm-10 */ "./src/hm-10.js");

alert(JSON.stringify(Object({"0":park}), null, 4));
debugger;

window.start = function () {
  var client = new _hm_10__WEBPACK_IMPORTED_MODULE_0__["default"]({
    onDisconnect: function onDisconnect() {
      return alert('Disconnected');
    }
  });
  client();
};

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map