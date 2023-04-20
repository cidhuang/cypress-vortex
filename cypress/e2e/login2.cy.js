/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.session('login', () => {
      cy.visit('https://portal.vortexcloud.com/#/login')
      cy.get('#email').type('cidhuang@gmail.com')
      cy.get('#password').type('Vortex777')
      cy.get('[data-testid="login-button"]').click().wait(15000)
    })
  })
  //*
  it('group', () => {
    cy.visit('https://portal.vortexcloud.com/#/group')
    cy.get('.top-button-list').children().should('have.length', 6)
  })
  //*/
  it('device', () => {
    cy.visit('https://portal.vortexcloud.com/#/device/management')

    cy.get('.device-group-list').children().then(item => {

      function getNumber(str) {
        return parseInt(str.substring(str.lastIndexOf('(',)+1, str.lastIndexOf(')')))
      }

      cy.log('list', item.length)
      let total = getNumber(item[0].children[1].textContent)

      for(let i=1;i<item.length;i++) {
        total = total - getNumber(item[i].children[1].textContent)

      }
    
      cy.log('total', total)

      if(total != 0) {
        throw new Error("test fails here")
      }
    })

  })



})