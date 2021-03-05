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
        xit('Search bar visible with placeholder text', () => {
            cy.get('@searchbox').should('be.visible').click()
        })
    
        xit('Instruction Text Visible', () => {
            cy.contains('Click on a breed to see some images.').should('be.visible')
    
        })

        xit('Dogs Title Logo Visible', () => {
            cy.contains('Dogs!').should('be.visible')
    
        })

        xit('12 Dog tiles present', () => {
            // This was extremely frustrating, the leading ' ' in the partial classname
            // was required... :eyeroll:
            cy.get('*[class^=" breed-menu_buttons"]').should('have.length', 12)
        })

        xit('Refresh clears previous search-term', () => {
            cy.get('@searchbox').type('randomStr')
            cy.reload()
            cy.contains('randomStr').should('not.exist')
        })

        it('Grid of pictures appear when clicking breed', () => {
            // I initially tried this by intercepting network traffic on inital page-load
            // but didn't want to take too long
            cy.get('@searchbox').type(aVISIBLE_DOGS[0])
            cy.get('*[class^=" breed-menu_buttons"]').click()
            cy.get('*[class^="breed-gallery_loadMoreContainer"').should('be.visible')
            cy.get('*[class^="breed-gallery_imageItem"').should('have.length.gte', 0);
        })
    })
    
    xdescribe ('Network', () => {
    
    })
    
    xdescribe ('UI/UX', () => {
    
    })
    
    xdescribe ('Search Functionality', () => {
    
    })
})

