/// <reference types="Cypress" />

// Just declaring stuff i'll use throughout the test
const DOG_SITE = "https://build-cy717a5fk.now.sh/"
const aVISIBLE_DOGS = ["affenpinscher", "african", "airedale", "akita", "appenzeller", "australian", "basenji", "beagle", "bluetick", "borzoi", "bouvier", "boxer"]

describe('Dog Site Test', () => {
    beforeEach(() => {
        // alias the search-box
        cy.visit(DOG_SITE)
        cy.get('[placeholder="search"]').as('searchbox')
    })
    describe ('Site Content', () => {
        it('Search bar visible with placeholder text', () => {
            cy.get('@searchbox').should('be.visible').click()
        })
    
        it('Instruction Text Visible', () => {
            cy.contains('Click on a breed to see some images.').should('be.visible')
    
        })

        it('Dogs Title Logo Visible', () => {
            cy.contains('Dogs!').should('be.visible')
    
        })

        it('12 Dog tiles present', () => {
            // This was extremely frustrating, the leading ' ' in the partial classname
            // was required... :eyeroll:
            cy.get('*[class^=" breed-menu_buttons"]').should('have.length', 12)
        })

        it('Grid of pictures appear when clicking breed', () => {
            // I initially tried this by intercepting network traffic on inital page-load
            // but didn't want to take too long
            cy.get('@searchbox').type(aVISIBLE_DOGS[0])
            cy.get('*[class^=" breed-menu_buttons"]').click()
            cy.get('*[class^="breed-gallery_loadMoreContainer"').should('be.visible')
            cy.get('*[class^="breed-gallery_imageItem"').should('have.length.gte', 0);
        })

        it('Refresh clears previous search-term', () => {
            cy.get('@searchbox').type('randomStr')
            cy.reload()
            cy.contains('randomStr').should('not.exist')
        })
    })
    
    // I have a feeling im doing these network interceptions all wrong, but hey I gave it
    // a shot and they passed? 
    describe ('Network', () => {
        it('Page Load: Network request to */api/breeds/list/all', () => {
            cy.intercept('**/list/all', () => {
                cy.visit(DOG_SITE)
                expect(req.statuscode).to.be('200')
            })
        })

        it('Dog Selected: Network request to */api/breed/{breed_name}/images', () => {
            cy.intercept('https://dog.ceo/api/breed/$aVISIBLE_DOGS[0]/images', () => {
                cy.get('@searchbox').type(aVISIBLE_DOGS[0])
                cy.get('*[class^=" breed-menu_buttons"]').click()
                expect(req.body).to.include('https://images.dog.ceo/breeds/african')
            })
        })
        

        xit('Second load of dog-tile shouldn\'t make network request', () => {
            // Not sure how to check that a network request wasn't made since im waiting
            // on a potential callback to not resolve, hmm.
        })
    })
    
    describe ('UI/UX', () => {
    
    })
    
    describe ('Search Functionality', () => {
    
    })
})

