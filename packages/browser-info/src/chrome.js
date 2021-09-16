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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chrome = void 0;
const os = __importStar(require("os"));
const sh_1 = require("./sh");
// Extrapolated from https://chromium.googlesource.com/chromium/src/+/master/chrome/test/chromedriver/chrome/chrome_finder_mac.mm
const CHROME_STABLE_MACOS_INSTALL_LOCATIONS = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '~/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const CHROME_BETA_MACOS_INSTALL_LOCATIONS = [
    '/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome',
    '~/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome',
];
const CHROME_CANARY_MACOS_INSTALL_LOCATIONS = [
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '~/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
];
// Taken from https://chromium.googlesource.com/chromium/src/+/master/chrome/test/chromedriver/chrome/chrome_finder.cc
const CHROME_STABLE_LINUX_INSTALL_LOCATIONS = [
    '/usr/local/sbin/google-chrome',
    '/usr/local/bin/google-chrome',
    '/usr/sbin/google-chrome',
    '/usr/bin/google-chrome',
    '/sbin/google-chrome',
    '/bin/google-chrome',
    '/opt/google/chrome/google-chrome',
];
const CHROME_BETA_LINUX_INSTALL_LOCATIONS = [
    '/usr/local/sbin/google-chrome-beta',
    '/usr/local/bin/google-chrome-beta',
    '/usr/sbin/google-chrome-beta',
    '/usr/bin/google-chrome-beta',
    '/sbin/google-chrome-beta',
    '/bin/google-chrome-beta',
    '/opt/google/chrome-beta/google-chrome-beta',
];
var Chrome;
(function (Chrome) {
    async function getBrowserInfo(channel) {
        const platform = os.platform();
        if (platform === 'darwin') {
            if (channel) {
                switch (channel) {
                    case ChromeChannel.stable: {
                        return await getChromeInfo(CHROME_STABLE_MACOS_INSTALL_LOCATIONS);
                    }
                    case ChromeChannel.beta: {
                        return await getChromeInfo(CHROME_BETA_MACOS_INSTALL_LOCATIONS);
                    }
                    case ChromeChannel.canary: {
                        return await getChromeInfo(CHROME_CANARY_MACOS_INSTALL_LOCATIONS);
                    }
                }
            }
            return (await Promise.all([
                getChromeInfo(CHROME_STABLE_MACOS_INSTALL_LOCATIONS),
                getChromeInfo(CHROME_BETA_MACOS_INSTALL_LOCATIONS),
                getChromeInfo(CHROME_CANARY_MACOS_INSTALL_LOCATIONS),
            ].map(p => p.catch(() => { })))).filter(Boolean);
        }
        else if (platform === 'linux') {
            if (channel) {
                switch (channel) {
                    case ChromeChannel.stable: {
                        return await getChromeInfo(CHROME_STABLE_LINUX_INSTALL_LOCATIONS);
                    }
                    case ChromeChannel.beta: {
                        return await getChromeInfo(CHROME_BETA_LINUX_INSTALL_LOCATIONS);
                    }
                    default: {
                        throw new Error(`Unsupported channel ${channel}`);
                    }
                }
            }
            return (await Promise.all([
                getChromeInfo(CHROME_STABLE_LINUX_INSTALL_LOCATIONS),
                getChromeInfo(CHROME_BETA_LINUX_INSTALL_LOCATIONS),
            ].map(p => p.catch(() => { })))).filter(Boolean);
        }
        else {
            throw new Error('Unsupported platform');
        }
    }
    Chrome.getBrowserInfo = getBrowserInfo;
    async function getChromeInfo(installLocations) {
        var e_1, _a;
        try {
            for (var installLocations_1 = __asyncValues(installLocations), installLocations_1_1; installLocations_1_1 = await installLocations_1.next(), !installLocations_1_1.done;) {
                let binary = installLocations_1_1.value;
                try {
                    const { stdout } = await sh_1.sh(binary, ['--version']);
                    return Object.assign({ binary }, parseChromeEdition(stdout));
                    // eslint-disable-next-line
                }
                catch (_b) { }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (installLocations_1_1 && !installLocations_1_1.done && (_a = installLocations_1.return)) await _a.call(installLocations_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new Error('Unable to find Chrome installation');
    }
    function parseChromeEdition(output) {
        const [version, channel] = output
            .split('\n')[0]
            .replace('Google Chrome ', '')
            .split(' ');
        return {
            version,
            channel: channel ? channel : ChromeChannel.stable,
        };
    }
    let ChromeChannel;
    (function (ChromeChannel) {
        ChromeChannel["stable"] = "stable";
        ChromeChannel["beta"] = "beta";
        ChromeChannel["canary"] = "canary";
    })(ChromeChannel = Chrome.ChromeChannel || (Chrome.ChromeChannel = {}));
})(Chrome = exports.Chrome || (exports.Chrome = {}));
