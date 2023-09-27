import { test, expect, request } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { AJAX } from "../page-objects/ajax-page";

test.describe("AJAX Data Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await test.step(`Go to AJAX Data`, async () => {
      const homePage = new HomePage(page);
      await homePage.gotoExamplePageLink("AJAX Data", "/ajax");
    });
  });
  test(`Test AJAX data request`, async ({ page }) => {
    const ajax = new AJAX(page);

    await test.step(`Ask for AJAX data`, async () => {
      await ajax.waitFor200Response("http://uitestingplayground.com/ajaxdata");
    });

    const ajaxData = await test.step(`Retrive AJAX data`, async () => {
      return await ajax.ajaxResponse().innerText({ timeout: 500 });
    });

    await test.step(`Validate AJAX data match expected result`, async () => {
      expect(ajaxData).toMatch(/^Data loaded with AJAX get request.$/);
    });
  });
});
