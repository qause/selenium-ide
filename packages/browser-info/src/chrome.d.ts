export declare namespace Chrome {
    function getBrowserInfo(channel?: ChromeChannel): Promise<BrowserInfo | BrowserInfo[]>;
    interface BrowserInfo {
        channel: ChromeChannel;
        binary: string;
        version: string;
    }
    enum ChromeChannel {
        stable = "stable",
        beta = "beta",
        canary = "canary"
    }
}
//# sourceMappingURL=chrome.d.ts.map