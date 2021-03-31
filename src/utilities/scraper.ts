import puppeteer from 'puppeteer';
const url = 'https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1d8290284480469a9311657beea043b5&random=5eea3c645f5c1&iframeid=&mode=p';

const clickSelectedDate = async (dateToClick: number, page: puppeteer.Page) => {
    const allDates = await page.$$('.datepicker-available-day');
    let isLoaded = false;

    for (let i = 0; i <= allDates.length - 1; i++) {
        const dateElement = allDates[i]
        const innerHTML = await dateElement.$eval('a', element => element.textContent);
        const date = Number(innerHTML)

        if (date === dateToClick) { 
            await dateElement.click()
            while (!isLoaded) {
                await page.waitForTimeout(50)
                const result = await printSelectedDate(page);
                if (result.number === dateToClick) { 
                    isLoaded = true
                    return true
                }
            } 
        }
    }
    return false
};

const printSelectedDate = async (page: puppeteer.Page) => {

    let currentSelectedDate = await page.$('#offering-page-selected-long-date');
    const innerHTML = await currentSelectedDate?.evaluate(element => element.textContent);
    const number = Number(innerHTML.replace(/[^\d.-]/g, ""));
    return {
        fullDate: innerHTML,
        number
    };
};

const getNextDate = (today: Date, increment: number) => {
    var tomorrow = new Date(today);
    tomorrow.setDate(new Date().getDate() + increment);

    return {
        date: tomorrow, 
        dateNumber: tomorrow.getDate()
    };
}

const scraper = async () => {
    const today = new Date();
    const todayDate = today.getDate();
    const datesArray : number[] = [todayDate];
    
    // add in two weeks worth of dates
    for (let i = 1; i <= 20; i++) {
        const nextDate = getNextDate(today, i).dateNumber
        datesArray.push(nextDate)
    };

    console.log(datesArray)
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    await page.goto(url);

    // get all available dates
    for (let i = 0; i <= datesArray.length - 1; i++) {
        const date = datesArray[i];
        let isDateAvailable = await clickSelectedDate(date, page);
        if (isDateAvailable) {
            const output = await printSelectedDate(page);
            console.log("This is the date:", output.fullDate);
        };
        

        if (datesArray[i+1] < date) {
            //click next month
            const nextMonthArrow = await page.$('.ui-datepicker-next');
            await nextMonthArrow?.click();
            await page.waitForTimeout(1000);
        };
    };
   
};

scraper();