import puppeteer, { Page } from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

async function loadAllEvents(page: Page) {
  await page.evaluate(() => {
    document.querySelector("#ctl00_ContentPlaceHolder1_lstYears_Arrow").click();
    [...document.querySelector(".rcbList").children]
      .filter((el) => el.textContent === "All Years")[0]
      .click();
  });
  await page.waitForNavigation({ waitUntil: "networkidle0" });
}

serve(async (_) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
await page.goto("https://legistar.council.nyc.gov/Calendar.aspx");
  await loadAllEvents(page);
  const text = await page.content();
  return new Response(text);
});
