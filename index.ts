import express, { Request, Response } from "express";
import puppeteer, { Browser } from "puppeteer";
import { CALENDAR_PAGE_URL, loadAllEvents } from "./calendar";

const app = express();

app.get("/calendar/:pageNum", async (req: Request, res: Response) => {
  const browser: Browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(CALENDAR_PAGE_URL);
  await loadAllEvents(page);
  const content: string = await page.content();
  await browser.close();
  res.send(content);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
