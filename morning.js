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

  //google keep (chrome)　開く
  exec(
    '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" https://keep.google.com/'
  );

  //入社監視用サイボウズ　開く
  exec(
    '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" https://daiseki-eco.cybozu.com/g/workflow/operation/petition_list.csp?cid=22&fid=132'
  );

  //入社監視用smartHR　開く
  exec(
    '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" https://daisekieco.smarthr.jp/procedures?q%5Btype_in%5D=boarding'
  );

  //情シス予定　開く
  exec(
    '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" https://daiseki-eco.cybozu.com/g/schedule/index.csp?type_search=user&search_text=207+248+344+376&gid=search'
  );

  //powertoysを開く(powertoysでキー割り当ての変更をしているが、たまに起動時にpowertoysが開かず割当が聞かなくなることがある為)
  const toys = '"C:\\Program Files\\PowerToys\\PowerToys.exe"';
  exec(toys, (error, stdout, stderr) => {
    if (error) {
      console.error(`powertoysが起動できなかった: ${error}`);
      return;
    }
    console.log(`標準出力: ${stdout}`);
    console.error(`標準エラー: ${stderr}`);
  });
})();
