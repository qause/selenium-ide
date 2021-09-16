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
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const stream = __importStar(require("stream"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const unzipper = __importStar(require("unzipper"));
const tar_1 = __importDefault(require("tar"));
const resolve_driver_1 = require("./resolve-driver");
async function downloadDriver({ downloadDirectory, browser, platform, arch, version, artifactName, }) {
    let end;
    const p = new Promise(res => {
        end = res;
    });
    const url = await resolve_driver_1.resolveDriverUrl({ browser, platform, arch, version });
    const downloadDestination = path.join(downloadDirectory, artifactName || resolve_driver_1.resolveDriverName({ browser, platform, version }));
    const res = await node_fetch_1.default(url);
    if (!res.ok) {
        throw new Error('Failed to download driver');
    }
    if (url.endsWith('.zip')) {
        res.body.pipe(unzipper.Parse()).pipe(new stream.Transform({
            objectMode: true,
            transform: function (entry, _e, cb) {
                const fileName = entry.path;
                if (fileName === 'chromedriver' ||
                    fileName === 'chromedriver.exe' ||
                    fileName === 'geckodriver' ||
                    fileName === 'geckodriver.exe') {
                    entry
                        .pipe(fs.createWriteStream(downloadDestination))
                        .on('finish', end);
                }
                else {
                    entry.autodrain();
                    cb();
                }
            },
        }));
    }
    else {
        res.body.pipe(tar_1.default.t({
            filter: (path, _stat) => path === 'geckodriver',
            onentry: entry => {
                entry.pipe(fs.createWriteStream(downloadDestination)).on('close', end);
            },
        }));
    }
    await p;
    await fs.chmod(downloadDestination, 0o755);
    return downloadDestination;
}
exports.default = downloadDriver;
