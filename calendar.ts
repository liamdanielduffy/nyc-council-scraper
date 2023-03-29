import { Page } from "puppeteer";

export const CALENDAR_PAGE_URL = "https://legistar.council.nyc.gov/Calendar.aspx";

export async function loadAllEvents(page: Page) {

    await page.evaluate(() => {

        function select(selector: string): HTMLElement {
            return document.querySelector(selector) as HTMLElement;
        }

        function childrenOf(selector: string): HTMLElement[] {
            return [...select(selector).children] as HTMLElement[];
        }

         function elementWithText(
           elements: HTMLElement[],
           text: string
         ): HTMLElement {
           return elements.filter((el) => el.textContent === text)[0];
         }

        const DATE_RANGE_SELECTOR =
          "#ctl00_ContentPlaceHolder1_lstYears_Arrow";
          
        const DATE_RANGE_SELECTOR_OPTIONS = ".rcbList";

        select(DATE_RANGE_SELECTOR).click();
        elementWithText(
          childrenOf(DATE_RANGE_SELECTOR_OPTIONS),
          "All Years"
        ).click();
    });

    await page.waitForNavigation({ waitUntil: "networkidle0" });
}