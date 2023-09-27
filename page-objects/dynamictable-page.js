import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class DynamicTable extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);

    this.tableHeaders = () => page.getByRole("columnheader");
    this.tableCells = () => page.getByRole("cell");
    this.yellowText = () => page.locator(".bg-warning");
  }

  /**
   * @param {string} application
   * @param {string} resource
   */
  async getTableInfo(application, resource) {
    const headers = await this.tableHeaders().allInnerTexts();
    const cells = await this.tableCells().allTextContents();

    expect(headers).toContain(resource);
    expect(cells).toContain(application);
    return cells[headers.indexOf(resource) + cells.indexOf(application)];
  }

  /**
   * Test description.
   */
  async getYellowTextInfo() {
    return await this.yellowText().innerText();
  }
}
