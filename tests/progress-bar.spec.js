import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { ProgressBar } from "../page-objects/progress-bar-page";

test.describe("Progress Bar Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await test.step(`Go to Progress Bar`, async () => {
      const homePage = new HomePage(page);
      await homePage.gotoExamplePageLink("Progress Bar", "/progressbar");
    });
  });

  test(`Test Progress Bar @regression`, async ({ page }) => {
    const progressBar = new ProgressBar(page);

    await test.step(`Start Progress Bar`, async () => {
      await progressBar.startButton().click();
    });

    await test.step(`Stop Progress Bar at 75%`, async () => {
      await progressBar.stopProgressBarAt(75);
    });

    await test.step(`Validate that the Progress Bar is between 75% and 80%`, async () => {
      const stopResults = await progressBar.stopResults().innerText();
      expect(stopResults).toMatch(/^Result: [012345], duration: \d+$/);
    });
  });
});
