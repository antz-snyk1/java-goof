/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 86:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 46:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(86);
const github = __nccwpck_require__(46);

// Send logs to a dashboard or anywhere else to monitor or alert or act.
const remoteLogger = (payload) => {
  // At time: {TIME} to be filled in the template
  console.log(`Sending data to remote at `)
};

const doStateAction = (state, checkName) => {
  // React for success of fail state
  console.log(`${state}, for Snyk/${checkName}`)
};

const dispayLog = (payload, checkName) => {
  console.log(`Payload ID:, ${payload.id}`);
  console.log(`Description: ${payload.description}`);
  // To-Do: Use chalk to note state?
  console.log(`State: ${payload.state}`);
  doStateAction(payload.state, checkName)
  console.log(`Snyk Test page: ${payload.target_url}`);
  console.log(`Timestamp: ${payload.updated_at}`);
  remoteLogger(payload);
}

try {
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  const payload = github.context.payload
  // Check for Snyk OSS License payload
  if(payload.context.startsWith('license/snyk')) {
    dispayLog(payload, checkName="open source Licenses")
  }
  else if(payload.context.startsWith('security/snyk')) {
    dispayLog(payload, checkName="open source packages")
  } 
  else if(payload.context.startsWith('code/snyk')) {
    dispayLog(payload, checkName="Code")
  } else {
    // TO-Do: Containers & IAC+
    console.log(`Skipping ${payload.context.id}`)
  }
} catch (error) {
  core.setFailed(error.message);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;