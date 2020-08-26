/// <reference types="Cypress" />


Cypress.on('uncaught:exception', (err, runnable) => {

    return false
})

//Company: timeanddate.com
//About  : Calendar - sanity test automation suite
//Author : Vinitha Raju
//Date   : 26-08-2020
//Version: 1.0.1

describe('Calender Sanity Test', () => {
    beforeEach(() => {
        cy.visit("https://www.timeanddate.com/calendar/?year=2020&country=18")
    })

    it('TEST21',function(){


    })


})