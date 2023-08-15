import puppeteer from 'puppeteer-core';
const SBR_WS_ENDPOINT = 'wss://your-endpoint';

async function main(keyword) {
    console.log('Connecting to Scraping Browser...');
    const browser = await puppeteer.connect({
        browserWSEndpoint: SBR_WS_ENDPOINT,
    });
    try {
        console.log('Connected! Navigating to Goodreads search results...');
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2*60*1000);
        await page.goto(`https://www.goodreads.com/search?q=${keyword}`);
        console.log('Navigated! Scraping book titles...');

        const books = await page.$$eval('.bookTitle', nodes => nodes.map(node => node.innerText));
        
        console.log(`Books with "${keyword}" in the title:`);
		let returnStatement = ""
        books.forEach((book, index) => {
            // console.log(`${index + 1}. ${book}`);
			returnStatement += `${index + 1}. ${book}\n`
        });

		return returnStatement

    } finally {
        await browser.close();
    }
}

export default main;