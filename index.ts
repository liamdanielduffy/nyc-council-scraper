import express, { Request, Response } from "express";
import puppeteer, { Browser, Page } from "puppeteer";
import { loadAllEvents } from "./actions";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  const browser: Browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto("https://legistar.council.nyc.gov/Calendar.aspx");
  // await loadAllEvents(page);
  const content: string = await page.content();
  await browser.close();
  res.send(content);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
