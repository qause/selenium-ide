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
const arg_type_1 = __importDefault(require("../../src/args/arg-type"));
const argument_1 = __importDefault(require("../../src/args/argument"));
describe('ArgType', () => {
    describe('exact', () => {
        it('should extend an argument', () => {
            const argInput = new argument_1.default({
                name: 'num',
                description: 'desc',
                identify: (n) => typeof n === 'number',
                validate: (n) => n === 1,
            });
            const at = arg_type_1.default.exact(argInput);
            expect(at.validate(2)).toBeFalsy();
            expect(at.validate(1)).toBeTruthy();
        });
    });
    it('should allow undefined for optional arg-types', () => {
        const argInput = new argument_1.default({
            name: 'num',
            description: 'desc',
            identify: (n) => typeof n === 'number',
            validate: (n) => n === 1,
        });
        const at = arg_type_1.default.exact(argInput);
        expect(at.validate(undefined)).toBeTruthy();
    });
    it('should not allow undefined for optional arg-types', () => {
        const argInput = new argument_1.default({
            name: 'num',
            description: 'desc',
            identify: (n) => typeof n === 'number',
            validate: (n) => n === 1,
        });
        const at = arg_type_1.default.exact(argInput).isRequired();
        expect(() => at.validate(undefined)).toThrow('Argument is required');
    });
    describe('oneOf', () => {
        it('should identify the argument', () => {
            const numArg = new argument_1.default({
                name: 'num',
                description: 'desc',
                identify: (n) => typeof n === 'number',
                validate: (n) => n === 1,
            });
            const strArg = new argument_1.default({
                name: 'str',
                description: 'desc',
                identify: (s) => typeof s === 'string',
                validate: (s) => s === 'str',
            });
            const at = arg_type_1.default.oneOf([numArg, strArg]);
            expect.assertions(3);
            expect(at.identify(1)).toBe(numArg);
            expect(at.identify('1')).toBe(strArg);
            const arg = at.identify(1);
            if (numArg.is(arg)) {
                expect(arg.validate(1)).toBeTruthy();
            }
        });
        it('should validate the arguments', () => {
            const numArg = new argument_1.default({
                name: 'num',
                description: 'desc',
                identify: (n) => typeof n === 'number',
                validate: (n) => n === 1,
            });
            const strArg = new argument_1.default({
                name: 'str',
                description: 'desc',
                identify: (s) => typeof s === 'string',
                validate: (s) => s === 'str',
            });
            const at = arg_type_1.default.oneOf([numArg, strArg]);
            expect(at.validate(1)).toBeTruthy();
            expect(at.validate(2)).toBeFalsy();
            expect(at.validate('str')).toBeTruthy();
            expect(at.validate('tomer')).toBeFalsy();
        });
        it('should work with extending', () => {
            const numArg = new argument_1.default({
                name: 'num',
                description: 'desc',
                identify: (n) => typeof n === 'number',
                validate: (n) => n === 1,
            });
            const numArg2 = new argument_1.default({
                name: 'num',
                description: 'desc',
                identify: (n) => typeof n === 'number',
                validate: (n) => n === 1,
                extending: numArg,
            });
            const numArg3 = new argument_1.default({
                name: 'num',
                description: 'desc',
                identify: (n) => typeof n === 'number',
                validate: (n) => n === 1,
                extending: numArg2,
            });
            const strArg = new argument_1.default({
                name: 'str',
                description: 'desc',
                identify: (s) => typeof s === 'string',
                validate: (s) => s === 'str',
            });
            const at = arg_type_1.default.oneOf([numArg3, strArg]);
            expect.assertions(4);
            expect(at.identify(1)).toBe(numArg3);
            expect(at.identify('1')).toBe(strArg);
            const arg = at.identify(1);
            if (numArg3.is(arg)) {
                expect(arg.validate(1)).toBeTruthy();
                expect(arg.extensionOf(numArg)).toBeTruthy();
            }
        });
    });
});
