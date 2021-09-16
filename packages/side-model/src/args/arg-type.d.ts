import Argument from './argument';
export default class ArgType<T extends Argument<any, any>[]> {
    readonly args: T;
    required: boolean;
    constructor(args: T);
    isRequired(): this;
    identify(value: ExtractArgument<T[number]>): T[number];
    validate(value?: ExtractArgument<T[number]>): boolean;
    static exact<S extends Argument<any, any>>(arg: S): ArgType<S[]>;
    static oneOf<S extends Argument<any, any>[]>(args: S): ArgType<S>;
}
export declare type ExtractArgument<A> = A extends Argument<infer B, any> ? B : never;
//# sourceMappingURL=arg-type.d.ts.map