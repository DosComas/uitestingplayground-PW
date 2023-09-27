import { test as setup, expect } from "@playwright/test";
import { storageState } from "./playwright.config";
import credentials from "./.auth/credentials.json";

const userName = credentials.userName;
const password = credentials.password;

setup("Do login if state is not valid", async ({ page }) => {
  await page.goto("/");

  // Check log in status
  const login = false;
  if (login) {
    // Already logged in
    console.log(`I'm logged in as ${userName}`);
  } else {
    // Do log in
    console.log(`I'm logging in as ${userName} with password ${password}`);
    // Assert
    console.log(`Now I'm logged in as ${userName}`);

    await page.context().storageState({ path: storageState });
  }
});
