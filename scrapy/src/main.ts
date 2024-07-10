    // For more information, see https://crawlee.dev/
    import { PlaywrightCrawler, ProxyConfiguration, Dataset } from 'crawlee';

    import { router } from './routes.js';

    const startUrls = ['https://www.toolstation.com/dewalt-100-year-18v-xr-compact-brushless-combi-drill-kit/p13036'];

    const crawler = new PlaywrightCrawler({
        // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
        requestHandler: router,

       
        // Comment this option to scrape the full website.
        maxRequestsPerCrawl: 10,
        async failedRequestHandler({ request }) {

            
            // This function is called when the crawling of a request failed too many times
            await Dataset.pushData({
                url: request.url,
                succeeded: false,
                errors: request.errorMessages,
            })
        },
    });

    await crawler.run(startUrls);
