import ArgType, { ExtractArgument } from '../args/arg-type';
import Argument from '../args/argument';
export default class Command<T extends CommandArguments> {
    readonly name: string;
    readonly description: string;
    readonly args: T;
    readonly validate: CommandValidationFunction<T>;
    constructor({ name, description, validate, args, }: {
        name: string;
        description: string;
        validate: CommandValidationFunction<T>;
        args: T;
    });
}
interface CommandArguments {
    [key: string]: ArgType<Argument<any, any>[]>;
}
declare type ExtractArgType<A> = A extends ArgType<infer B> ? ExtractArgument<B[number]> | undefined : never;
declare type ExtractArgumentFromArgType<A extends CommandArguments> = {
    [K in keyof A]: ExtractArgType<A[K]>;
};
declare type CommandValidationFunction<A extends CommandArguments> = (value: ExtractArgumentFromArgType<A>) => boolean;
export {};
//# sourceMappingURL=command.d.ts.map