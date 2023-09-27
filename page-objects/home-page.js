import { test } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);

    this.examplePageLink = (/** @type {String} */ name) =>
      page.getByRole("link", { name: name });
  }

  /**
   * @param {String} linkName
   * @param {String} pathURL
   */
  async gotoExamplePageLink(linkName, pathURL) {
    await this.examplePageLink(linkName).click();
    await this.page.waitForURL(`**${pathURL}`);
  }
}
