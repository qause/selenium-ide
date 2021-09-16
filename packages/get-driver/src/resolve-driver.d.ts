/// <reference types="node" />
export declare function resolveDriverUrl({ browser, platform, arch, version, }: {
    browser: Browser;
    platform: Platform;
    arch: string;
    version: string;
}): Promise<string>;
export declare function resolveDriverName({ browser, platform, version, }: {
    browser: Browser;
    platform: Platform;
    version: string;
}): string;
export declare type Browser = 'electron' | 'chrome' | 'firefox';
export declare type Platform = NodeJS.Platform;
//# sourceMappingURL=resolve-driver.d.ts.map