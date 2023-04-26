describe("Our first suite", () => {

  it("first test", () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // by tag name
    cy.get('input')

    // by id
    cy.get("#inputEmail1")

    // by class name
    cy.get('.input-full-width')

    // by attribute name
    cy.get('[placeholder]')

    // by attribute name and value
    cy.get('[placeholder="Email"]')

    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    // by tag name and attribute with value
    cy.get('input[placeholder="Email"]')

    // by two different attributes
    cy.get('[placeholder="Email"][type="email"]')

    // by tag name, attribute with value, id and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    // the most recommended way by cypress
    cy.get('[data-cy="imputEmail1"]')

  })

  it.only('second test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"')

    // finds first
    cy.contains('Sign in')

    // adding a unique identifier
    cy.contains('[status="warning"]','Sign in')

    // find sign in button through another element of the same component by "travelling up"
    // find is used, to find the child element within a parent element, therefore a parent command must be run first
    // get would give us all buttons which are nested in a form
    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    // find the element "nb-card", which contains "Horizontal form"
    // within this element, find the one with the attribute "type", whos value is "email"
    cy.contains('nb-card','Horizontal form').find('[type="email"]')

  })

})


