import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProgressBar extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);

    this.startButton = () => page.getByTestId("startButton");
    this.stopButton = () => page.getByTestId("stopButton");
    this.progressBarStatus = () => page.getByTestId("progressBar");
    this.stopResults = () => page.getByTestId("result");
  }

  /**
   * @param {Number} targetValue
   */
  async stopProgressBarAt(targetValue) {
    let currentProgressBar;
    do {
      currentProgressBar = Number(
        await this.progressBarStatus().getAttribute("aria-valuenow")
      );
    } while (currentProgressBar < targetValue);
    await this.stopButton().click();
  }
}
