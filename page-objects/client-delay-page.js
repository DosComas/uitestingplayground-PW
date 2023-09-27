import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class ClientDelay extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);

    this.triggerClientButton = () => page.getByTestId("ajaxButton");
    this.loadingSpiner = () => page.getByTestId("spinner");
    this.clientResponse = () => page.locator(".bg-success");
  }
}
