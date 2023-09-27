import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class AJAX extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);

    this.triggerAjaxButton = () => page.getByTestId("ajaxButton");
    this.ajaxResponse = () => page.locator(".bg-success");
  }

  /**
   * @param {string} pageURL
   */
  async waitFor200Response(pageURL) {
    const responsePromise = this.page.waitForResponse(
      (response) => response.url() === pageURL && response.status() === 200,
      { timeout: 15500 }
    );
    await this.triggerAjaxButton().click();
    await responsePromise;
  }
}
