enum BrowserConstants {
  CHROME = "chrome",
  FIREFOX = "firefox",
  WEBKIT = "webkit",
  CHROMIUM = "chromium",
  MSEDGE = "msedge",
  EDGE = "edge",
  BLANK = "",
}

export default class Browser {
  public static type(browser: string) {
    let browserType: BrowserConstants;
    if (browser === BrowserConstants.FIREFOX) {
      browserType = BrowserConstants.FIREFOX;
    } else if (browser === BrowserConstants.WEBKIT) {
      browserType = BrowserConstants.WEBKIT;
    } else {
      browserType = BrowserConstants.CHROMIUM;
    }
    return browserType;
  }

  public static channel(browser: string) {
    let browserChannel: BrowserConstants;
    if (browser === BrowserConstants.CHROME) {
      browserChannel = BrowserConstants.CHROME;
    } else if (browser === BrowserConstants.EDGE) {
      browserChannel = BrowserConstants.MSEDGE;
    } else {
      browserChannel = BrowserConstants.BLANK;
    }
    return browserChannel;
  }
}
