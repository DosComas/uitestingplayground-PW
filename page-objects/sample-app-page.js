import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class SampleApp extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);

    this.userNameInput = () => page.locator("//input[@type='text']");
    this.passwordInput = () => page.locator("//input[@type='password']");
    this.logInButton = () => page.getByTestId("login");
    this.logInStatusText = () => page.getByTestId("loginstatus");
  }
}
