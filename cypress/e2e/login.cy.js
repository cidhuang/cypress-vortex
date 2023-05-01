/// <reference types="cypress" />

Cypress.Commands.add('setLayout', (index) => {
  cy.get('.general_change_layout').click()
  cy.get('div[data-modal="layout"]').as('layout-modal')
  cy.get('@layout-modal').find('.layout-list').find('.layout-item').as('layout-list')
  cy.get('@layout-list').eq(index).click()
  cy.get('@layout-modal').find('.primary').click()
})

context('Login', () => {
  beforeEach(() => {
    cy.session('login', () => {
      cy.visit('https://portal.vortexcloud.com/#/login')
      cy.get('#email').type('cidhuang@gmail.com')
      cy.get('#password').type('Vortex777')
      cy.get('[data-testid="login-button"]').click()
      cy.url().should('contain', '/#/group')
    })
  })
  //*
  it('group item count', () => {
    cy.visit('https://portal.vortexcloud.com/#/group')
    cy.get('.top-button-list').children().should('have.length', 6)
    let topButtonLabel = [
      ' View ',
      ' Devices ',
      ' Deep search ',
      ' Message center ',
      ' Archive '
    ]
    cy.get('.top-button-list').children().find('.label').find('h5').then(item => {
      for(let i=0;i<item.length;i++) {
        expect(item[i].textContent).to.equal(topButtonLabel[i])
      }
    })
  })
  //*/
  //*
  it('camera layout', () => {
    cy.visit('https://portal.vortexcloud.com/#/group')

    function checkLayout(index, gridCount) {
      cy.setLayout(index)
      cy.get('.camera-wrapper').should('have.length', gridCount)
    }
    const gridCounts = [1, 4, 9, 16, 6, 8, 13, 4, 7, 5, 7, 5, 3]
    gridCounts.forEach((value, index) => {
      checkLayout(index, value)
      for(let i=0;i<value;i++) {
        if(i === 0) {
          cy.get('.camera-wrapper').eq(i).find('.view-cell-status').not('.camera-disconnected').should('have.length', 1)
        }
        else if(i === 1) {
          cy.get('.camera-wrapper').eq(i).find('.view-cell-status').find('.camera-disconnected').should('have.length', 1)
        } else {
          cy.get('.camera-wrapper').eq(i).not('.view-cell-status').should('have.length', 1)
        }
      }
    });
  })
  //*/
  //*
  it('camera player control', () => {
    cy.visit('https://portal.vortexcloud.com/#/group')
    cy.setLayout(0)
    cy.setLayout(1)
    cy.get('.camera-wrapper').eq(0).click()

    cy.get('.event-only-button').click()

    cy.get('.playback-control').find('.go-live-button').click()

    cy.get('.viewcell-wrapper').find('.cell').eq(0)
      .find('.display-status-bar')
      .find('.status_hint_live_1st_line_dark')
      .should('have.length', 1)
  })
  //*/
  //*
  it('device count', () => {
    cy.visit('https://portal.vortexcloud.com/#/device/management')

    cy.get('.device-group-list').children().then(item => {

      function getNumber(str) {
        return parseInt(str.substring(str.lastIndexOf('(',)+1, str.lastIndexOf(')')))
      }

      let total = getNumber(item[0].children[1].textContent)

      for(let i=1;i<item.length;i++) {
        total = total - getNumber(item[i].children[1].textContent)
      }

      expect(total).to.equal(0)
    })

  })
  //*/


})