import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { ClientDelay } from "../page-objects/client-delay-page";

test.describe("Client Side Delay Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await test.step(`Go to Client Side Delay`, async () => {
      const homePage = new HomePage(page);
      await homePage.gotoExamplePageLink("Client Side Delay", "/clientdelay");
    });
  });

  test(`Test Client Side Delay @regression`, async ({ page }) => {
    const clientDelay = new ClientDelay(page);

    await test.step(`Ask for client data`, async () => {
      await clientDelay.triggerClientButton().click();
    });

    const clientData = await test.step(`Retrive client data`, async () => {
      await clientDelay.loadingSpiner().waitFor({ state: "hidden", timeout: 15500 });
      return await clientDelay.clientResponse().innerText({ timeout: 500 });
    });

    await test.step(`Validate client data match expected result`, async () => {
      expect(clientData).toMatch(/^Data calculated on the client side.$/);
    });
  });
});
