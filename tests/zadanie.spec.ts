import { test, expect } from "@playwright/test";

//Uzupelnijcie testy

test("Exercise Navigation", async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("Exercise Page Filters", async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("Calorie Calculator Form", async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("1 Rep Max Form", async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("Register and Login User", async ({ page }) => {
  await page.goto("http://localhost:5173");
});
