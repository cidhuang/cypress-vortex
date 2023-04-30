/// <reference types="cypress" />

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
        cy.log(i, item[i].textContent)
        expect(item[i].textContent).to.equal(topButtonLabel[i])
      }
    })
  })
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