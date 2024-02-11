const eveningModule = () => {
  const puppeteer = require("puppeteer");
  const path = require("path");

  (async () => {
    /* 打刻 */
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
  })();
};

module.exports = { eveningModule };
