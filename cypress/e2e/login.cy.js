describe('template spec', () => {
  it('login', () => {
    cy.visit('https://portal.vortexcloud.com/#/login')

    cy.get('#email')
      .type('cidhuang@gmail.com').should('have.value', 'cidhuang@gmail.com')

    cy.get('#password')
      .type('Vortex777').should('have.value', 'Vortex777')

    cy.get('[data-testid="login-button"]')
      .click()

  })

})