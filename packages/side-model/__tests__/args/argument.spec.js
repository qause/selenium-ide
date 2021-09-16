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
const argument_1 = __importDefault(require("../../src/args/argument"));
describe('argument schema', () => {
    it('should be able to create an argument', () => {
        expect(new argument_1.default({
            name: 'arg',
            description: 'desc',
            identify: () => true,
            validate: () => false,
        })).toBeDefined();
    });
    it('should have a name and description', () => {
        const arg = new argument_1.default({
            name: 'arg',
            description: 'desc',
            identify: () => true,
            validate: () => false,
        });
        expect(arg.name).toBe('arg');
        expect(arg.description).toBe('desc');
    });
    it('should have an identifying function', () => {
        const arg = new argument_1.default({
            name: 'arg',
            description: 'desc',
            identify: (value) => typeof value === 'number',
            validate: () => false,
        });
        expect(arg.identify(1)).toBeTruthy();
        expect(arg.identify('1')).toBeFalsy();
    });
    it('should have a verify function', () => {
        const arg = new argument_1.default({
            name: 'arg',
            description: 'desc',
            identify: () => true,
            validate: (value) => value === 1,
        });
        expect(arg.validate(1)).toBeTruthy();
        expect(arg.validate(2)).toBeFalsy();
    });
    describe('extending', () => {
        it('should not extend anything by default', () => {
            const arg = new argument_1.default({
                name: 'arg',
                description: 'desc',
                identify: () => true,
                validate: () => false,
            });
            expect(arg.extending).toBeUndefined();
        });
        it('should not extend a different argument', () => {
            const arg = new argument_1.default({
                name: 'arg',
                description: 'desc',
                identify: () => true,
                validate: () => false,
            });
            const arg2 = new argument_1.default({
                name: 'arg',
                description: 'desc',
                identify: () => true,
                validate: () => false,
            });
            expect(arg2.extensionOf(arg)).toBeFalsy();
        });
        it('should extend an argument', () => {
            const arg = new argument_1.default({
                name: 'arg',
                description: 'desc',
                identify: () => true,
                validate: () => false,
            });
            const arg2 = new argument_1.default({
                name: 'arg',
                description: 'desc',
                identify: () => true,
                validate: () => false,
                extending: arg,
            });
            expect(arg2.extensionOf(arg)).toBeTruthy();
        });
        it('should extend an extended argument', () => {
            const arg = new argument_1.default({
                name: 'arg',
                description: 'desc',
                identify: (_) => true,
                validate: (n) => n === 1,
            });
            const arg2 = new argument_1.default({
                name: 'arg',
                description: 'desc',
                identify: (_) => true,
                validate: (_) => false,
                extending: arg,
            });
            const arg3 = new argument_1.default({
                name: 'arg',
                description: 'desc',
                identify: (_) => true,
                validate: (_) => false,
                extending: arg2,
            });
            expect(arg3.extensionOf(arg)).toBeTruthy();
            expect(arg3.extending.extending.validate(1)).toBeTruthy();
        });
    });
});
