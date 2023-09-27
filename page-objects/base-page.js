import { test, expect } from "@playwright/test";

export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async testFun() {
    console.log("TEST TEST");
  }
}
