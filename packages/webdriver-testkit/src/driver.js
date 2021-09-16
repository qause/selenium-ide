"use strict";
// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHeadlessFirefox = exports.createHeadlessChrome = exports.createDriver = void 0;
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome = __importStar(require("selenium-webdriver/chrome"));
const firefox = __importStar(require("selenium-webdriver/firefox"));
const cache_1 = require("./cache");
async function createDriver({ capabilities, }) {
    const { chromeService, firefoxService } = createServices();
    return await new selenium_webdriver_1.Builder()
        .setChromeService(chromeService)
        .setFirefoxService(firefoxService)
        .withCapabilities(capabilities)
        .build();
}
exports.createDriver = createDriver;
async function createHeadlessChrome() {
    return await createDriver({
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': { args: ['headless', 'disable-gpu'] },
        },
    });
}
exports.createHeadlessChrome = createHeadlessChrome;
async function createHeadlessFirefox() {
    return await createDriver({
        capabilities: {
            browserName: 'firefox',
            'moz:firefoxOptions': { args: ['-headless'] },
        },
    });
}
exports.createHeadlessFirefox = createHeadlessFirefox;
function createServices() {
    return {
        chromeService: new chrome.ServiceBuilder(path.join(cache_1.CACHE_PATH, `chromedriver${os.platform() === 'win32' ? '.exe' : ''}`)),
        firefoxService: new firefox.ServiceBuilder(path.join(cache_1.CACHE_PATH, `geckodriver${os.platform() === 'win32' ? '.exe' : ''}`)),
    };
}
