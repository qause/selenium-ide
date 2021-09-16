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
const variable_1 = __importDefault(require("../../src/args/variable"));
describe('variable schema', () => {
    describe('verify', () => {
        it('should verify a valid variable name', () => {
            expect(variable_1.default.validate('tomer')).toBeTruthy();
            expect(variable_1.default.validate('tomer2')).toBeTruthy();
            expect(variable_1.default.validate('tomer_steinfeld')).toBeTruthy();
        });
        it('should throw for a variable with an invalid character', () => {
            expect(() => variable_1.default.validate('aå')).toThrow('Unexpected token å');
        });
        it('should throw for variable starting with a number', () => {
            expect(() => variable_1.default.validate('5a')).toThrow('Unexpected token 5');
        });
        describe('property access', () => {
            it('should allow to access a property', () => {
                expect(variable_1.default.validate('tomer.steinfeld')).toBeTruthy();
            });
            it('should throw when trying to access an un-declared property', () => {
                expect(() => variable_1.default.validate('tomer..steinfeld')).toThrow('Unexpected token .');
            });
            it('should throw for a variable with an invalid property', () => {
                expect(() => variable_1.default.validate('tomer.aå')).toThrow('Unexpected token å');
            });
            it('should throw for variable property starting with a number', () => {
                expect(() => variable_1.default.validate('tomer.5a')).toThrow('Unexpected token 5');
            });
        });
        describe('array access', () => {
            it('should allow access to an array by index', () => {
                expect(variable_1.default.validate('tomer[0]')).toBeTruthy();
                expect(variable_1.default.validate('tomer[10]')).toBeTruthy();
                expect(variable_1.default.validate('tomer[1318237]')).toBeTruthy();
            });
            it('should allow access to nested variables by index', () => {
                expect(variable_1.default.validate('tomer[1][2]')).toBeTruthy();
            });
            it('should fail to access an array with an invalid integer index', () => {
                expect(() => variable_1.default.validate('tomer[00]')).toThrow('Unexpected token 0');
            });
            it('should not allow two opening brackets', () => {
                expect(() => variable_1.default.validate('tomer[[1]')).toThrow('Unexpected token [');
            });
            it('should not allow an opening bracket without a closing one', () => {
                expect(() => variable_1.default.validate('tomer[1')).toThrow('Missing token ]');
            });
            it('should not allow two closing tags', () => {
                expect(() => variable_1.default.validate('tomer]]')).toThrow('Unexpected token ]');
            });
            it('should not allow empty accessing array with no index', () => {
                expect(() => variable_1.default.validate('tomer[]')).toThrow('Unexpected token ]');
            });
            it('should not allow [.] syntax', () => {
                expect(() => variable_1.default.validate('tomer[.]')).toThrow('Unexpected token .');
            });
            it('should allow accessing array via variable index', () => {
                expect(variable_1.default.validate('tomer[steinfeld]')).toBeTruthy();
            });
        });
    });
});
