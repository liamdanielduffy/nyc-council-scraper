import { Page } from "puppeteer";
import { DATE_RANGE_SELECTOR, DATE_RANGE_SELECTOR_OPTIONS } from "./constants";
import { childrenOf, elementWithText, select } from "./utils";

export async function loadAllEvents(page: Page) {
  await page.evaluate(() => {
    select(DATE_RANGE_SELECTOR).click();
    elementWithText(
      childrenOf(DATE_RANGE_SELECTOR_OPTIONS),
      "All Years"
    ).click();
  });
  await page.waitForNavigation({ waitUntil: "networkidle0" });
}
