import { Dataset, createPlaywrightRouter } from 'crawlee';

export const router = createPlaywrightRouter();


router.addDefaultHandler(async ({ request, enqueueLinks, log }) => {
    console.log('>>>>', request)

    const url = request.loadedUrl
    console.log(url)

    if (url?.includes('cookies') || url?.includes('privacy') || url?.includes('winkelwagen')) {
        console.log('working')
        log.info(`Ignoring ${url}`);
        return;
    }
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        globs: ['https://www.toolstation.com/dewalt-100-year-18v-xr-compact-brushless-combi-drill-kit/p13036'],
        label: 'detail',
    });
});

router.addHandler('detail', async ({ request, page, log, pushData }) => {


    const title = await page.title();

    const price = await page.locator(':has-text("£")').textContent();

    log.info('proce', price)
    

    // const producttitle = await page.getByTestId('product-lister-product-title-link').first().innerText();
    // const pTitle = await page.locator('a [data-testid="product-lister-product-title-link"]').allInnerTexts()
    // console.log(producttitle)



    // console.log(pTitle)
    // const productPrice = await page.locator('p > span > span > font > font').first().textContent();
    // console.log('jsjdfskjd', productPrice)

    // console.log( request.url, title, )
    // await Dataset.exportToJSON('test')

    // await pushData({
    //     // url: request.loadedUrl,
    //     title,
        
    // });    
});

router.addHandler
