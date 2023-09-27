// @ts-check
import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { SampleApp } from "../page-objects/sample-app-page";

test.describe("Sample App Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await test.step(`Go to Sample App`, async () => {
      const homePage = new HomePage(page);
      await homePage.gotoExamplePageLink("Sample App", "/sampleapp");
    });
  });

  const testingCases = [
    { test: "invalid password", name: "test", password: "123", loginSuccess: false },
    { test: "invalid user name", name: "", password: "pwd", loginSuccess: false },
    { test: "valid credentials", name: "test", password: "pwd", loginSuccess: true },
  ];
  for (const testCase of testingCases) {
    test(`Test log in with ${testCase.test} @regression @smoke`, async ({ page }) => {
      const sampleApp = new SampleApp(page);

      await test.step(`Enter login credentials and click the login button`, async () => {
        // await sampleApp.page.waitForLoadState();
        await sampleApp.userNameInput().fill(testCase.name);
        await sampleApp.passwordInput().fill(testCase.password);
        await sampleApp.logInButton().click();
      });

      await test.step(`Validate the Log In status of the user`, async () => {
        const logInStatusText = await sampleApp.logInStatusText().innerText();

        if (testCase.loginSuccess) {
          expect(logInStatusText).toBe(`Welcome, ${testCase.name}!`);
        } else {
          expect(logInStatusText).toBe(`Invalid username/password`);
        }
      });
    });
  }
});
