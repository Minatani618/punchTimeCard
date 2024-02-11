const morningModule = () => {
  const puppeteer = require("puppeteer");
  const { exec } = require("child_process");
  const fs = require("fs");
  const path = require("path");

  const urlListName = "reportUrlList.csv";
  const urlListPath = path.join(__dirname, urlListName);

  (async () => {
    /* 出勤打刻 */
    // Puppeteerでクロミウムを起動し、s-clockingを表示
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    // s-clockingログイン
    await page.goto("https://cl.i-abs.co.jp/CX_s-clocking/");
    inputEle = await page.$$('input[type="text"]');
    await inputEle[0].type("daisekieco");
    await inputEle[1].type("000376");
    await page.type('input[type="password"]', "fd6mrhv3");
    await page.click('input[type="submit"]');

    //メニューから打刻をクリック (3番目のaタグをクリック)
    let selector = "a";
    await page.waitForSelector(selector);
    await page.waitForTimeout(3000);
    const links = await page.$$(selector);
    await links[2].click();

    //打刻画面で打刻をクリック
    selector = "a.btn_01.c-enter";
    await page.waitForSelector(selector);
    await page.waitForTimeout(3000);
    const links2 = await page.$(selector);
    await links2.click();

    //打刻確定
    selector = "button";
    await page.waitForSelector(selector);
    await page.waitForTimeout(3000);
    const buttons = await page.$(selector);
    await page.click(selector);

    //余韻
    await page.waitForTimeout(1500);
    await browser.close();

    /* 各種webページを開く */
    //サイボウズ　開く
    exec(
      '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" https://daiseki-eco.cybozu.com/g/'
    );

    //google todo　開く
    exec(
      '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" https://calendar.google.com/calendar/u/0/r?tab=uc&pli=1'
    );

    //google keep (chrome)　開く
    exec(
      '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" https://keep.google.com/'
    );

    //各社員の日報を開く
    /*     const csvContent = fs.readFileSync(urlListPath, "utf-8");
    console.log(csvContent);
    const urls = csvContent
      .split("\n")
      .map((urlandname) => urlandname.split(",")[0]);
    console.log(urls); */
    /* urls.forEach((url) => {
      console.log(url);
      exec(
        '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" https://daiseki-eco.cybozu.com/g/message/view.csp?cid=1394&rid=64&mid=611'
      );
    }); */
  })();
};

module.exports = { morningModule };
