const puppeteer = require("puppeteer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const urlListName = "reportUrlList.csv";
const urlListPath = path.join(__dirname, urlListName);

async function openAllreports() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // サイボウズメッセージにアクセス→ログイン
  await page.goto("https://daiseki-eco.cybozu.com/g/message/index.csp?");
  await page.waitForSelector("input");
  await page.type('input[id="username-:0-text"]', "ec000376");
  await page.type('input[id="password-:1-text"]', "Fd6mrhv3!");
  await page.waitForTimeout(1000);
  await page.click("input[class='login-button']");

  // aタグのhref属性を全て取得
  await page.waitForSelector("a");
  await page.waitForTimeout(5000);
  const hrefs = await page.evaluate(() => {
    const anchorElements = Array.from(
      document.querySelectorAll("a")
      /* document.querySelectorAll('a[id^="generated-id-"]') */
    );
    const filteredAs = anchorElements.filter((a) => {
      return a.textContent.includes("業務日報");
    });
    return filteredAs.map((anchor) => anchor.getAttribute("href"));
  });
  console.log(hrefs);

  const urlHead = "https://daiseki-eco.cybozu.com";
  for (const href of hrefs) {
    const newPage = await browser.newPage(); // 新しいタブを開く
    await newPage.goto(urlHead + href);
    await sleep(2000);
  }
}

//待機用関数
const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

module.exports = openAllreports;
