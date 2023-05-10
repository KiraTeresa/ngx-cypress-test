describe('shadow dom', () => {
  it('access shadow dom', () => {
    cy.visit('https://radogado.github.io/shadow-dom-demo')

    // get shadow host, in order to be able to get shadow DOM
    cy.get('#app').shadow().find('#container')
  })
})
