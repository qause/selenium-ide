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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../../src/commands/store"));
describe('store schema', () => {
    describe('validate', () => {
        it('text should be required', () => {
            expect(() => store_1.default.validate({ text: undefined, variable: 'a' })).toThrow('Argument is required');
        });
        it('variable should be required', () => {
            expect(() => store_1.default.validate({ text: 'a', variable: undefined })).toThrow('Argument is required');
        });
        it('should validate', () => {
            expect(store_1.default.validate({ text: 'a', variable: 'a' })).toBeTruthy();
        });
    });
});
