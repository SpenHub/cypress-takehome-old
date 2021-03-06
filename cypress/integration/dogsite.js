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
    xdescribe ('Site Content', () => {
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
    
    describe ('Search Functionality', () => {
        xit('Searching for initally-visible dog-button: valid search', () => {
            cy.get('@searchbox').type(aVISIBLE_DOGS[9])
            cy.get('*[class^=" breed-menu_buttons"]').should('have.length', 1)
        })

        it('Searching for non-visible dog-button: valid search', () => {
            cy.get('@searchbox').type('shiba')
            cy.get('*[class^=" breed-menu_buttons"]').should('have.length', 1)
        })

        it('Partial-Match search: Only show first 12 breeds', () => {

        })

        it('Full-Match search: only show matching breed', () => {

        })
    })

    // I have a feeling im doing these network interceptions all wrong, but hey I gave it
    // a shot and they passed? 
    xdescribe ('Network', () => {
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
        

        xit('Second load of dog-button shouldn\'t make network request', () => {
            // Not sure how to check that a network request wasn't made since im waiting
            // on a potential callback to not resolve, hmm.
        })
    })
    
    xdescribe ('UI/UX', () => {
        const oWIDE_VIEWPORT = {
            width: 1920,
            height: 1080
        }
        const oNARROW_VIEWPORT = {
            width: 700, 
            height: 1080
        }
        beforeEach(() => {
            cy.viewport(oWIDE_VIEWPORT.width, oWIDE_VIEWPORT.height)
        })
        it('Clicking dog-button changes button-style to show selection', () => {
            cy.get('@searchbox').type(aVISIBLE_DOGS[4])
            cy.get('*[class^=" breed-menu_buttons"]').click()
            cy.get('*[class^="breed-menu_activeReady"]').should('have.css', 'background-color', 'rgb(106, 90, 205)')
        })

        it('Clicking dog button shows dog title with breed pictures', () => {
            cy.get('@searchbox').type(aVISIBLE_DOGS[5])
            cy.get('*[class^=" breed-menu_buttons"]').click()
            cy.get('*[class^="breed-gallery_newBreedBanner"').find('span').should('be.visible')
        })
        
        // I'm not a fan of hardcoding pixel values but I wasn't sure how to get uncomputed css vars
        it('Responsive: 4x3 grid of dog buttons on wide-width', () => {
            cy.get('*[class^=" breed-menu_buttons"]').should('have.css', 'min-width', '345.6px')
        })
        
        // I'd love to find out how you guys do responsive UI testing, that's something I've struggled with
        it('Responsive: 2x6 grid of dog buttons with width < 767px', () => {
            cy.viewport(oNARROW_VIEWPORT.width, oNARROW_VIEWPORT.height)
            cy.get('*[class^=" breed-menu_buttons"]').should('have.css', 'min-width', '280px')
        })

        it('Responsive: 2x6 grid of dog-tiles search-result with small-width page', () => {
            cy.viewport(oNARROW_VIEWPORT.width, oNARROW_VIEWPORT.height)
            cy.get('@searchbox').type(aVISIBLE_DOGS[6])
            cy.get('*[class^=" breed-menu_buttons"]').click()
            cy.get('*[class^="breed-gallery_gallery"').should('have.css', 'width', '629.9999877929688px')
        })
    })
})

