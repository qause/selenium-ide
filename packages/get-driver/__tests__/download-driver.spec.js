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
const fs = __importStar(require("fs-extra"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const download_driver_1 = __importDefault(require("../src/download-driver"));
jest.setTimeout(60000);
describe('download-driver', () => {
    let tempDir;
    beforeEach(async () => {
        tempDir = await createRandomDirectory();
    });
    afterEach(async () => {
        await fs.remove(tempDir);
    });
    it('should download the driver for the current platform', async () => {
        expect.assertions(2);
        const chromedriver = await download_driver_1.default({
            downloadDirectory: tempDir,
            browser: 'electron',
            platform: os.platform(),
            arch: os.arch(),
            version: '6.0.9',
        });
        const cp = child_process_1.spawn(chromedriver, ['--version']);
        let stdout = '';
        let processExit;
        const p = new Promise(res => {
            processExit = res;
        });
        cp.stdout.on('data', data => {
            stdout += data;
        });
        cp.on('close', code => {
            expect(code).toBe(0);
            processExit();
        });
        await p;
        expect(stdout).toEqual(expect.stringMatching(/chromedriver/i));
    });
    it('should download chromedriver for the current platform', async () => {
        expect.assertions(2);
        const chromedriver = await download_driver_1.default({
            downloadDirectory: tempDir,
            browser: 'chrome',
            platform: os.platform(),
            arch: os.arch(),
            version: '78.0.3904.11',
        });
        const cp = child_process_1.spawn(chromedriver, ['--version']);
        let stdout = '';
        let processExit;
        const p = new Promise(res => {
            processExit = res;
        });
        cp.stdout.on('data', data => {
            stdout += data;
        });
        cp.on('close', code => {
            expect(code).toBe(0);
            processExit();
        });
        await p;
        expect(stdout).toEqual(expect.stringMatching(/chromedriver/i));
    });
    it('should download geckodriver for the current platform', async () => {
        expect.assertions(2);
        const geckodriver = await download_driver_1.default({
            downloadDirectory: tempDir,
            browser: 'firefox',
            platform: os.platform(),
            arch: os.arch(),
            version: '69.0.1',
        });
        const cp = child_process_1.spawn(geckodriver, ['--version']);
        let stdout = '';
        let processExit;
        const p = new Promise(res => {
            processExit = res;
        });
        cp.stdout.on('data', data => {
            stdout += data;
        });
        cp.on('close', code => {
            expect(code).toBe(0);
            processExit();
        });
        await p;
        expect(stdout).toEqual(expect.stringMatching(/geckodriver/i));
    });
    it('should fail to download a non-existent driver', async () => {
        expect.assertions(1);
        try {
            await download_driver_1.default({
                downloadDirectory: tempDir,
                browser: 'electron',
                platform: 'darwin',
                arch: 'ia32',
                version: '6.0.9',
            });
        }
        catch (err) {
            expect(err.message).toBe('Failed to download driver');
        }
    });
});
async function createRandomDirectory() {
    const randomName = `__side__test__${Math.floor(Math.random() * 100000)}`;
    const res = path.join(os.tmpdir(), randomName);
    await fs.mkdir(res);
    return res;
}
