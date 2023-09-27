import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { TextInput } from "../page-objects/text-input-page";

test.describe("Text Input Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await test.step(`Go to Text Input`, async () => {
      const homePage = new HomePage(page);
      await homePage.gotoExamplePageLink("Text Input", "/textinput");
    });
  });

  const testingCases = ["TEST Button", " ", "123456"];
  for (const testCase of testingCases) {
    test(`Test button name chances to '${testCase}' @regression`, async ({ page }) => {
      const textInput = new TextInput(page);

      await test.step(`Input ${testCase} on the Text Field`, async () => {
        await textInput.textField().fill(testCase);
        await textInput.button().click();
      });

      await test.step(`Validates that the input text and the button text are equal`, async () => {
        const buttonText = await textInput.button().textContent();
        expect(buttonText).toBe(testCase);
      });
    });
  }
});
