import { Capabilities } from 'selenium-webdriver';
export declare function createDriver({ capabilities, }: {
    capabilities: {} | Capabilities;
}): Promise<import("selenium-webdriver").WebDriver>;
export declare function createHeadlessChrome(): Promise<import("selenium-webdriver").WebDriver>;
export declare function createHeadlessFirefox(): Promise<import("selenium-webdriver").WebDriver>;
//# sourceMappingURL=driver.d.ts.map