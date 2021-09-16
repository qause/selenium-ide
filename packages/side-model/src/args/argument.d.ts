export default class Argument<T, S extends Argument<any, any> = never> {
    readonly name: string;
    readonly description: string;
    readonly extending?: S;
    readonly identify: validationFunction<T>;
    readonly validate: validationFunction<T>;
    constructor({ name, description, identify, validate, extending, }: {
        name: string;
        description: string;
        identify: validationFunction<T>;
        validate: validationFunction<T>;
        extending?: S;
    });
    is(arg: Argument<any, any>): arg is Argument<T, S>;
    extensionOf(argument: Argument<any, any>): boolean;
}
export declare type validationFunction<T> = (value: T) => boolean;
//# sourceMappingURL=argument.d.ts.map