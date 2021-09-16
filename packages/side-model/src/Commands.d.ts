import { ArgType } from './ArgTypes';
export interface CommandType {
    name: string;
    description: string;
    target?: ArgType;
}
export interface CommandTypes {
    [key: string]: CommandType;
}
declare const _default: CommandTypes;
export default _default;
//# sourceMappingURL=Commands.d.ts.map