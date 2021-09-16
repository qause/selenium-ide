export declare function sh(command: string, args?: string[], options?: object): Promise<Output>;
export declare function makeError(message: string, code: number, stdout: string, stderr: string): Error & Output & ErrorWithExitCode;
interface Output {
    stdout: string;
    stderr: string;
}
interface ErrorWithExitCode {
    code: number;
}
export {};
//# sourceMappingURL=sh.d.ts.map