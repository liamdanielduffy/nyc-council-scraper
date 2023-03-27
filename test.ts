import puppeteer, { Page } from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { DOMParser, Node } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts"

async function loadAllEvents(page: Page) {
  await page.evaluate(() => {
    document.querySelector("#ctl00_ContentPlaceHolder1_lstYears_Arrow").click();
    [...document.querySelector(".rcbList").children]
      .filter((el) => el.textContent === "All Years")[0]
      .click();
  });
  await page.waitForNavigation({ waitUntil: "networkidle0" });
}

export function getNumPages(
  html: string
): number | null {
  const parser = new DOMParser();
  const regex = /Page\s+(\d+)\s+of\s+(\d+)/i;
  const document = parser.parseFromString(html, "text/html");
  const node = document.querySelector("td.NumericPages > div.rgInfoPart");
  if (node) {
    const match = node.textContent.match(regex);
    if (match) {
      return parseInt(match[2])
    }
  }
  return null;
}

async function goTo(page: Page, n: number) {
  const pageHtml = await page.content();
  const numPages = getNumPages(pageHtml);
  await page.evaluate((n) => {
    const availablePages = [...document.querySelector("div.rgWrap.rgNumPart").children].map(
      (el) => el.textContent
    );
    if(availablePages.includes(n)) {
      [...document.querySelector("div.rgWrap.rgNumPart").children].filter(el => el.textContent === n)[0].click()
    }
  }, n);
}

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://legistar.council.nyc.gov/Calendar.aspx");

  await loadAllEvents(page);

  await goTo(page, 3);

  // Optional: Save a screenshot of the page
  await page.screenshot({ path: "screenshot.png" });
  await browser.close();
}

main().catch((error) => console.error(error));
