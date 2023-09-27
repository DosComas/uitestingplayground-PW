import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class TextInput extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);

    this.textField = () => page.getByTestId("newButtonName");
    this.button = () => page.getByTestId("updatingButton");
  }
}
