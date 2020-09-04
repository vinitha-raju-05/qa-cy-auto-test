/// <reference types="Cypress" />


Cypress.on('uncaught:exception', (err, runnable) => {

    return false
})

//Company: timeanddate.com
//About  : Calendar - sanity test automation suite
//Author : Vinitha Raju
//Date   : 20-08-2020
//Version: 1.0.1
//Update : 04-09-2020

describe('Calender Sanity Test', () => {
    beforeEach(() => {
        cy.visit("https://www.timeanddate.com/calendar/?year=2020&country=18")
    })

    // Verify the basic elements present in UI 
    it('TEST01: Basic elements', function () {

        cy.get('#logo a img').should('be.visible')
        cy.get('#header__inner').should('be.visible')
        cy.get('#naw').should('be.visible')
        cy.get('.navMenu__item').should('have.length', 11)
        cy.get('#socialButton').should('be.visible')
        cy.get('#searchButton').should('be.visible')
        cy.get('.hi a').should('have.length', 10)
        cy.get('div.row.socrow').should('be.visible')
        cy.get('#bct').should('be.visible')
        cy.get('.layout-grid__main').should('be.visible')
        cy.get('#cts').should('be.visible')
        cy.get('form strong').should('be.visible').and('have.text', 'Create calendar:')
        cy.get('label[for="sf_year"]').should('be.visible').and('have.text', 'Year:')
        cy.get('label[for="sf_year"]').click()
        cy.get('.mn li').should('have.length', 11)
        cy.get('label[for="sf_country"]').should('be.visible').and('have.text', 'Country:')
        cy.get('form input[value="Show"]').should('be.visible')
        cy.get('.ctxmenu').then((el) => {
            expect(el[0]).to.have.text('Quick Design')
            expect(el[1]).to.have.text('Formatting')
            expect(el[2]).to.have.text('More Options')
        })
        cy.get('#printlink3').should('be.visible')
        cy.get('#calarea').should('be.visible')
        cy.get('ul.pager').children().should('be.visible').and('have.length', 3)
        cy.get('#ct1').should('be.visible')
        cy.get('#mct1 tr th').should('be.visible').and('have.length', 12)
        cy.get('.ch1').should('be.visible')
        cy.get('div.eight.columns').should('be.visible')
        cy.get('h2').then((el) => {
            expect(el[0]).to.have.text('Tools')
            expect(el[1]).to.have.text('Customization Forms')
            expect(el[2]).to.have.text('Other Calendars')
            expect(el[3]).to.have.text('Date Calculators')
            expect(el[4]).to.have.text('Related Links')
        })
        cy.get('.footer').should('be.visible')
        cy.get('.feedback-bar').should('be.visible')
        cy.get('section.fixed.footer__wrap').should('be.visible')
        cy.get('.footer__logo').should('be.visible')
        cy.get('.footer__logo  p  a').should('have.text', '© Time and Date AS 1995–2020')
    })

    //Verify the <year> selected from dropdown is reflected at all <year> placeholders in the page
    it('TEST02: Year Selection', function () {

        const year = 2021
        cy.get('#sf_year').clear()
        cy.get('#sf_year').type(year)
        cy.get("input[value='Show']").click()
        cy.url().should('include', year)
        cy.get('li.current').should('have.text', year)
        cy.get('#ct1').contains(year)
        cy.get('table.border1.caln.lpad td ul li').contains(year)
        cy.get('h2').contains('Tools').next().first().contains(year)

    })

    //Verify the current system date is highlighted in Calender
    it('TEST03: Highlight current date', function () {

        const todaysDate = Cypress.moment().format('MM DD YYYY')
        cy.log('System Date = ' + todaysDate)
        const currYear = Cypress.moment().format('YYYY')
        cy.get('#ct1').should('contain', currYear)
        const currMonth = Cypress.moment().format('MMMM')
        cy.log('Current Month = ' + currMonth)
        cy.get('#mct1 tr th').should('contain', currMonth)
        const currDay = Cypress.moment().format('D')
        cy.log('Current Day = ' + currDay)
        cy.get('.chi').should('have.text', currDay).and('have.attr', 'title', 'This date is marked because it is the current date in this time zone. It will disappear if you print the calendar.')

    })

    //Verify the previous and next year displayed in Pager
    it('TEST04: Prev/Curr/Next Year', function () {

        const year = 2019
        cy.get('#sf_year').click({ force: true })
        cy.get('.mn li a').contains(year).click({ force: true })
        cy.get('form input[value="Show"]').click()
        cy.get('.pager li[class="current"]').should('have.text', year)
        cy.get('.pager li[class="prev"]').should('have.text', year - 1)
        cy.get('.pager li[class="next"]').should('have.text', year + 1)

    })

    /* 
       Verify 4 years are displayed in Pager, when <year> selected from dropdown is
       <currentYear> + 2 or <currentYear> - 2 
    */
    it('TEST05: Prev/Curr/Next + 2020', function () {

        const year = 2018
        const currYear = Cypress.moment().format('YYYY')
        cy.get('#sf_year').click({ force: true })
        cy.get('.mn li a').contains(year).click()
        cy.get('form input[value="Show"]').click()
        cy.get('ul[class="pager"]').children().should('be.visible').and('have.length', 4)
        cy.get('.pager li[class="current"]').should('have.text', year)
        cy.get('.pager li[class="other"]').should('have.text', currYear)

    })

    //Verify the country selection is reflected in the Calendar header
    it('TEST06: Country Selection', function () {

        const countryName = 'Argentina'
        cy.get('#sf_country').select(countryName)
        cy.get('input[value="Show"]').click()
        cy.get('#ct1').children().should('contain', countryName)

    })

    
    //Verify the list of items displayed in Calendar menu in Navigation bar  
    it('TEST08: Calendar Menu Items', function () {

        cy.get('.c-cl ul li').then((el) => {
            expect(el[0]).to.have.text('Calendar Info')
            expect(el[1]).to.have.text('Calendar 2020')
            expect(el[2]).to.have.text('Calendar 2021')
            expect(el[3]).to.have.text('Monthly Calendar')
            expect(el[4]).to.have.text('Printable Calendar (PDF)')
            expect(el[5]).to.have.text('Add Your Own Calendar Events')
            expect(el[6]).to.have.text('Calendar Creator')
            expect(el[7]).to.have.text('Advanced Calendar Creator')
            expect(el[8]).to.have.text('Holidays Worldwide')
            expect(el[9]).to.have.text('On This Day in History')
            expect(el[10]).to.have.text('Calendar Articles')

        })

    })

    //Verify mousehover on each item in the Calendars menu bar
    it('TEST09: Tooltip Verification', function () {
        cy.get('.hi a[href="/calendar/info.html"]').invoke('show')
            .and('have.attr', 'title', 'Get an overview of the calendar types we offer, as well as information about leap years, special calendar events ++ ')
        cy.get('.hi .active').invoke('show')
            .and('have.attr', 'title', 'See a calendar for the current year at the click of a mouse.')
        // Test to identify a missing title - assuming there was a requirement 
        // to display mouse hover for every item.
        // cy.aget('.hi a[href="/calendar/?year=2021"]').invoke('show')
        //     .and('have.attr', 'title', 'See a calendar for the next year at the click of a mouse.')
        // cy.get('.hi a[href="/on-this-day/"]').invoke('show')
        //     .nd('have.attr', 'title', 'See historical events that happened on this day')

    })

    //Verify the monthly calandar is loaded on selecting a particular month 
    it('TEST10: Monthly Calendar', function () {

        cy.get('#mct1 tr th a').then((el) => {
            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)
            cy.url().should('include', 'monthly.html')
            cy.get('[for="month"]').should('be.visible').and('have.text', 'Month:')
            cy.get('select[id="month"]').children().should('have.length', 12)
            cy.get('ul[class="pager"]').children().should('be.visible').and('have.length', 4)

        })

    })

    //Verify on click of print icon, Print page is loaded correctly
    it('TEST11: Print', function () {

        cy.get('#printlink3').click()
        cy.url().should('contain', 'print.html?')
        cy.get('#ct1').should('be.visible')
        cy.get('#mct1').should('be.visible')
        cy.get('#calcontrols').should('be.visible')
    })

    //Verify the Title : Show long/compact action under Formatting
    it('TEST12: Formatting - Title: Show long/compact', function () {

        cy.get('.ctxmenu').contains('Formatting').click()
        cy.get('ul.mn>li').eq(8)
            .contains('Title: Show long').should('be.visible').click()
        cy.get('#ct1 h1').contains('Norway')
        cy.get('.ctxmenu').contains('Formatting').click()
        cy.get('ul.mn>li')
            .contains('Title: Show long').should('not.be.visible')
        cy.get('ul.mn>li').eq(7)
            .contains('Title: Show compact').should('be.visible').click()
        cy.get('#ct1 h1').should('not.contain', 'Norway')

    })


    //Verify the Moonphase show/hide reflecting correctly on calendar display
    it('TEST14: Formatting - Moonphase: Show/Hide', function () {

        cy.get('td div[class="ck"]').should('be.visible')
        cy.get('.ctxmenu').contains('Formatting').click()
        cy.get('.mn li').contains('Moonphases: Hide').click()
        cy.get('td div[class="ck"]').should('not.be.visible')

    })

    //Verify the Basic customization - Show and Save 
    it('TEST15: Basic customization', function () {
        cy.get('.ctxmenu').contains('More Options').click()
        cy.get('ul.mn')
            .first()
            .contains('Basic, classic customization').click()
        cy.url().should('contain', '&df=1')
        cy.get('input[value="Show & Save Calendar"]').click()
        cy.get('.alert-notice.success').should('be.visible')
        cy.get('#sf_country').select("Argentina")
        cy.get('input[value="Show"]').first().click()
        cy.get('input[value="Show & Save"]').should('be.visible')
    })

    // //Verify the Advanced customization - Show and Save
    // it('TEST 16: Advanced customization', function () {
    //     cy.get('.ctxmenu').contains('More Options').click()
    //     cy.get('ul.mn>li')
    //         .eq(1)
    //         .contains('Advanced customization').click()
    //     cy.get('#nav').should('be.visible')
    //     cy.get('#socialButton').should('be.visible')
    //     cy.get('#searchButton').should('be.visible')
    //     cy.get('#ctti').should('be.visible')
    //     cy.get('li#t1').should('have.text', 'Country/Language')
    //     cy.get('div#cf1').should('be.visible')
    //     cy.get('li#t2').should('have.text', 'Period')
    //     cy.get('li#t2').click()
    //     cy.get('div#cf2').should('be.visible')
    //     cy.get('li#t3').should('have.text', 'Format')
    //     cy.get('li#t3').click()
    //     cy.get('div#cf3').should('be.visible')
    //     cy.get('li#t4').should('have.text', 'Design')
    //     cy.get('li#t4').click()
    //     cy.get('div#cf4').should('be.visible')
    //     cy.get('li#t5').should('have.text', 'Titles/texts')
    //     cy.get('li#t5').click()
    //     cy.get('div#cf5').should('be.visible')
    //     cy.get('li#t6').should('have.text', 'Holidays')
    //     cy.get('li#t6').click()
    //     cy.get('div#cf6').should('be.visible')
    //     cy.get('li#t7').should('have.text', 'Weeks')
    //     cy.get('li#t7').click()
    //     cy.get('div#cf7').should('be.visible')
    //     cy.get('li#t8').should('have.text', 'Moon')
    //     cy.get('li#t8').click()
    //     cy.get('div#cf8').should('be.visible')
    //     cy.get('li#t9').should('have.text', 'Other options')
    //     cy.get('li#t9').click()
    //     cy.get('div#cf9').should('be.visible')
    //     cy.get('#subr').should('be.visible')
    //     cy.get('#cspb').should('be.visible')
    //     cy.get('input[value="Show Calendar"]').should('be.visible')
    //     cy.get('input[value="Show & Save Calendar"]').should('be.visible')
    // })


    //Verify Your Default Calendar selection displays the last saved value
    it('TEST 17: Your Default Calendar', function () {
        var defaultCountry = 'Argentina'
        cy.get('.ctxmenu').contains('More Options').click()
        cy.get('ul.mn').first()
            .contains('Basic, classic customization').click()
        cy.url().should('contain', '&df=1')
        cy.get('#country').select(defaultCountry)
        cy.get('#country').invoke('val').then((val) => {
            cy.url().should('contain', `country=${val}`)
            cy.get('input[value="Show & Save Calendar"]').click()
            cy.get('.alert-notice.success').should('be.visible')
            cy.get('#sf_country').select('Fiji')
            cy.get('input[value="Show"]').first().click()
            cy.get('.ctxmenu').contains('More Options').click()
            cy.get('ul.mn>li').eq(2).contains('Your default calendar').should('be.visible')
            cy.get('ul.mn>li').eq(2).contains('Your default calendar').click()
            cy.get('#sf_country').should('have.value', val)
        })
    })

    // //Verify the Design applied to calendar is retained when formatting is applied
    // it('TEST 18: Design selection change', function () {
    //     cy.get('.ctxmenu').contains('Quick Design').click()
    //     cy.get('ul.mn>li').eq(5).contains('Contemporary').click()
    //     cy.get('.ctxmenu').contains('Formatting').click()
    //     cy.get('ul.mn>li').eq(7).contains('Title: Show compact').click()
    //     cy.get('.ctxmenu').contains('Quick Design').click()
    //     cy.get('ul.mn>li').eq(0).contains('Standard').click()
    //     cy.get('.cl1 th').should('have.css', 'border-color', 'rgb(0, 0, 238)')
    //     cy.get('.ctxmenu').contains('Formatting').click()
    //     cy.get('ul.mn>li').eq(7).contains('Title: Show long').click()
    //     cy.get('.cl1 th').should('have.css', 'border-color', 'rgb(0, 0, 238)')
    // })

    // //Verify the Formatting dropdown closes when you scroll the page
    // it('TEST 19: Dropdown overlap', function () {

    //     cy.get('.ctxmenu').contains('Formatting').click()
    //     cy.get('h1').scrollIntoView({ easing: 'swing' })
    //     cy.get('.c-cl').click()

    // })

    //Verify the basic elements in UI when the viewport is changed
    it('TEST 20: Mobile View - Basic elements', function () {
        cy.viewport('iphone-6')
        cy.get('#nav').should('be.visible')
        cy.get('#socialButton').should('be.visible')
        cy.get('#searchButton').should('be.visible')
        cy.get('.nav-bar a').should('have.text', 'timeanddate.com')
        cy.get('#navButton').should('be.visible')
        cy.get('#navButton').click()
        cy.get('.c-my').should('be.visible')
        cy.get('.c-hm').should('be.visible')
        cy.get('.c-wc').should('be.visible')
        cy.get('.c-tz').should('be.visible')
        cy.get('.c-cl').should('be.visible')
        cy.get('.c-wt').should('be.visible')
        cy.get('.c-sm').should('be.visible')
        cy.get('.c-tm').should('be.visible')
        cy.get('.c-cc').should('be.visible')
        cy.get('.c-ap').should('be.visible')
        cy.get('.c-ff').should('be.visible')
        cy.get('#navButton').click()
        cy.get('form[name="f1"]').should('be.visible')
        cy.get('form strong').should('have.text', 'Create calendar:')
        cy.get('label[for="sf_year"]').should('have.text', 'Year:')
        cy.get('label[for="sf_country"]').should('have.text', 'Country:')
        cy.get('#sf_year').should('be.visible')
        cy.get('#sf_country').should('be.visible')
        cy.get('input[type="submit"]').should('be.visible')
        cy.get('#printlink3').should('be.visible')
        cy.get('.ctxmenu').should('be.visible')
        cy.get('.ctxmenu').then((el) => {
            expect(el[0]).to.have.text('Quick Design')
            expect(el[1]).to.have.text('Formatting')
            expect(el[2]).to.have.text('More Options')
        })
        cy.get('#calarea').should('be.visible')
        cy.get('#calarea .pager').children().should('have.length', 3)
        cy.get('#ct1').children().should('be.visible')
        cy.get('#mct1').should('be.visible')
        cy.get('#ch1').should('be.visible')
        cy.get('.eight.columns').should('be.visible')
        cy.get('h2')
            .contains('Tools')
            .next()
            .children().then((list) => {
                expect(list).to.have.length(1)
            })
        cy.get('h2')
            .contains('Customization Forms')
            .next()
            .children().then((list) => {
                expect(list).to.have.length(3)
            })
        cy.get('.help-link.noprint').should('be.visible')
        cy.get('h2')
            .contains('Other Calendars')
            .next()
            .children().then((list) => {
                expect(list).to.have.length(4)
            })
        cy.get('h2')
            .contains('Date Calculators')
            .next()
            .children().then((list) => {
                expect(list).to.have.length(5)
            })
        cy.get('h2')
            .contains('Related Links')
            .next()
            .children().then((list) => {
                expect(list).to.have.length(4)
            })
        //footer-section
        cy.get('.footer').should('be.visible')
        cy.get('.feedback-bar').should('be.visible')
        cy.get('.fixed.feedback-bar__wrap').should('be.visible')
        cy.get('.footer__links').should('be.visible')
        cy.get('.footer__links-block.footer__links-block--company').should('be.visible')
        cy.get('.footer__links-block.footer__links-block--legal').should('be.visible')
        cy.get('.footer__links-block.footer__links-block--services').should('be.visible')
        cy.get('.footer__links-block.footer__links-block--sites').should('be.visible')
        cy.get('.footer__social').should('be.visible')
        cy.get('.footer__social-icons').should('be.visible')
        cy.get('.footer__copyright').should('be.visible')
        //feedback-form
        cy.get('#bls1').click()
        cy.get('#FBD').should('be.visible')
    })


})
