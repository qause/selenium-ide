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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDrivers = void 0;
const fs = __importStar(require("fs-extra"));
const os_1 = __importDefault(require("os"));
const browser_info_1 = require("@seleniumhq/browser-info");
const get_driver_1 = require("@seleniumhq/get-driver");
const cache_1 = require("./cache");
async function updateDrivers() {
    const downloadDirectory = cache_1.CACHE_PATH;
    await fs.mkdirp(downloadDirectory);
    console.log('updating chromedriver...');
    const chromeInfo = (await browser_info_1.Chrome.getBrowserInfo(browser_info_1.Chrome.ChromeChannel.stable));
    await get_driver_1.downloadDriver({
        downloadDirectory,
        browser: 'chrome',
        platform: os_1.default.platform(),
        arch: os_1.default.arch(),
        version: chromeInfo.version,
        artifactName: 'chromedriver',
    });
    console.log('updating geckodriver...');
    await get_driver_1.downloadDriver({
        downloadDirectory,
        browser: 'firefox',
        platform: os_1.default.platform(),
        arch: os_1.default.arch(),
        version: '70.0',
        artifactName: 'geckodriver',
    });
}
exports.updateDrivers = updateDrivers;
