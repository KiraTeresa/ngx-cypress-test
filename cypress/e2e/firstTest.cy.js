describe("Our first suite", () => {

  /*
  **********************************
  * Lesson 22: Types of Locators
  **********************************
  */
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

  /*
**********************************
* Lesson 23: Finding Web Elements
**********************************
*/
  it('second test', () => {
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

  /*
**********************************
* Lesson 24: Saving Subject of the Command
**********************************
*/
  it("then and wrap methods", () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    // calling .then(), it's parameter becomes jquery syntax
    // this is why we can save it and use later
    // saving cypress syntax is not possible, because its async
    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelFirst).to.equal(passwordSecondText)

        // use wrap() to convert jquery back to cypress syntax
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      })
    })

  })

  /*
  **********************************
  * Lesson 25: Invoke Command
  **********************************
  */
  it('invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // 1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    // 2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    // 3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      // .should('contain', 'checked')
      .then(classValue => {
        expect(classValue).to.contain('checked')
      })
  })

  it.only('assert property', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      cy.get('nb-calendar-day-picker').contains('17').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 17, 2023')
    })
  })
})


