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
jest.mock('os');
jest.mock('../src/sh');
const os = __importStar(require("os"));
const chrome_1 = require("../src/chrome");
const sh_1 = require("../src/sh");
const { getBrowserInfo, ChromeChannel } = chrome_1.Chrome;
const mockSh = sh_1.sh;
const mockPlatform = os.platform;
describe('chrome browser info', () => {
    describe('macOS', () => {
        beforeAll(() => {
            mockPlatform.mockReturnValue('darwin');
        });
        afterAll(() => {
            mockPlatform.mockReset();
        });
        it('should get stable chrome browser info', async () => {
            mockSh.mockReturnValueOnce(Promise.resolve({ stdout: 'Google Chrome 76.0.3809.132\n', stderr: '' }));
            expect(await getBrowserInfo(ChromeChannel.stable)).toEqual({
                binary: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                version: '76.0.3809.132',
                channel: 'stable',
            });
        });
        it('should fail to get chrome info when its not installed', async () => {
            mockSh.mockReturnValueOnce(Promise.reject(sh_1.makeError('error', 1, '', '')));
            expect.assertions(1);
            try {
                await getBrowserInfo(ChromeChannel.stable);
            }
            catch (err) {
                expect(err.message).toBe('Unable to find Chrome installation');
            }
        });
        it('should get all chrome info', async () => {
            mockSh.mockImplementation(binary => {
                if (binary.includes('Canary')) {
                    return Promise.resolve({
                        stdout: 'Google Chrome 79.0.3915.0 canary\n',
                        stderr: '',
                    });
                }
                else if (binary.includes('Beta')) {
                    return Promise.resolve({
                        stdout: 'Google Chrome 75.0.3770.75 beta\n',
                        stderr: '',
                    });
                }
                else {
                    return Promise.resolve({
                        stdout: 'Google Chrome 76.0.3809.132\n',
                        stderr: '',
                    });
                }
            });
            expect(await getBrowserInfo()).toEqual([
                {
                    binary: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                    version: '76.0.3809.132',
                    channel: 'stable',
                },
                {
                    binary: '/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome',
                    version: '75.0.3770.75',
                    channel: 'beta',
                },
                {
                    binary: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
                    version: '79.0.3915.0',
                    channel: 'canary',
                },
            ]);
            mockSh.mockReset();
        });
        it('should get partial chrome info if some installations do not exist', async () => {
            mockSh.mockImplementation(binary => {
                if (binary.includes('Canary')) {
                    return Promise.resolve({
                        stdout: 'Google Chrome 79.0.3915.0 canary\n',
                        stderr: '',
                    });
                }
                else if (binary.includes('Beta')) {
                    return Promise.reject(sh_1.makeError('error', 1, '', ''));
                }
                else {
                    return Promise.resolve({
                        stdout: 'Google Chrome 76.0.3809.132\n',
                        stderr: '',
                    });
                }
            });
            expect(await getBrowserInfo()).toEqual([
                {
                    binary: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                    version: '76.0.3809.132',
                    channel: 'stable',
                },
                {
                    binary: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
                    version: '79.0.3915.0',
                    channel: 'canary',
                },
            ]);
            mockSh.mockReset();
        });
    });
    describe('linux', () => {
        beforeAll(() => {
            mockPlatform.mockReturnValue('linux');
        });
        afterAll(() => {
            mockPlatform.mockReset();
        });
        it('should get stable chrome browser info', async () => {
            mockSh.mockReturnValueOnce(Promise.resolve({ stdout: 'Google Chrome 76.0.3809.132\n', stderr: '' }));
            expect(await getBrowserInfo(ChromeChannel.stable)).toEqual({
                binary: '/usr/local/sbin/google-chrome',
                version: '76.0.3809.132',
                channel: 'stable',
            });
        });
        it('should fail to get chrome info when its not installed', async () => {
            mockSh.mockReturnValueOnce(Promise.reject(sh_1.makeError('error', 1, '', '')));
            expect.assertions(1);
            try {
                await getBrowserInfo(ChromeChannel.stable);
            }
            catch (err) {
                expect(err.message).toBe('Unable to find Chrome installation');
            }
        });
        it('should fail to get canary chrome channel since it is not available on linux', async () => {
            expect.assertions(1);
            try {
                await getBrowserInfo(ChromeChannel.canary);
            }
            catch (err) {
                expect(err.message).toBe('Unsupported channel canary');
            }
        });
        it('should get all chrome info', async () => {
            mockSh.mockImplementation(binary => {
                if (binary.includes('beta')) {
                    return Promise.resolve({
                        stdout: 'Google Chrome 75.0.3770.75 beta\n',
                        stderr: '',
                    });
                }
                else {
                    return Promise.resolve({
                        stdout: 'Google Chrome 76.0.3809.132\n',
                        stderr: '',
                    });
                }
            });
            expect(await getBrowserInfo()).toEqual([
                {
                    binary: '/usr/local/sbin/google-chrome',
                    version: '76.0.3809.132',
                    channel: 'stable',
                },
                {
                    binary: '/usr/local/sbin/google-chrome-beta',
                    version: '75.0.3770.75',
                    channel: 'beta',
                },
            ]);
            mockSh.mockReset();
        });
        it('should get partial chrome info if some installations do not exist', async () => {
            mockSh.mockImplementation(binary => {
                if (binary.includes('beta')) {
                    return Promise.reject(sh_1.makeError('error', 1, '', ''));
                }
                else {
                    return Promise.resolve({
                        stdout: 'Google Chrome 76.0.3809.132\n',
                        stderr: '',
                    });
                }
            });
            expect(await getBrowserInfo()).toEqual([
                {
                    binary: '/usr/local/sbin/google-chrome',
                    version: '76.0.3809.132',
                    channel: 'stable',
                },
            ]);
            mockSh.mockReset();
        });
    });
});
