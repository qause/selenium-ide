import { Browser, Platform } from './resolve-driver';
export default function downloadDriver({ downloadDirectory, browser, platform, arch, version, artifactName, }: {
    downloadDirectory: string;
    browser: Browser;
    platform: Platform;
    arch: string;
    version: string;
    artifactName?: string;
}): Promise<string>;
//# sourceMappingURL=download-driver.d.ts.map