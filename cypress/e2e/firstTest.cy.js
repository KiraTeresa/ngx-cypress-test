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
    cy.contains('[status="warning"]', 'Sign in')

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
    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

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

  it('assert property', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      cy.get('nb-calendar-day-picker').contains('17').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 17, 2023')
    })
  })

  /*
  **********************************
  * Lesson 26: Checkboxes and Radio Buttons
  **********************************
  */
  it('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .check({force: true}) // force needed, because elements visibility is hidden
        .should('be.checked')

      cy.wrap(radioButtons)
        .eq(1)
        .check({force: true})

      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked')

      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')

    })
  })

  it('check boxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    // cy.get('[type="checkbox"]').check({force: true})
    // if box is already checked, the check() command will not uncheck it, but it will check all the boxes, which haven't been checked yet
    // to uncheck a checkbox, use click() command
    cy.get('[type="checkbox"]').eq(0).click({force: true})
  })

  /*
  **********************************
  * Lesson 27: Web Datepickers
  **********************************
  */
  it('web datepickers', () => {
    function selectDayFromCurrent(day){

      let date = new Date()
      // get current day, add two days, bring back into date format
      date.setDate(date.getDate() + day)
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleString('en-US', {month: 'short'})
      let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if(!dateAttribute.includes(futureMonth)){
          cy.get('[data-name="chevron-right"]').click()
          selectDayFromCurrent(day) // will create a while-loop
        } else {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }
      })
      return dateAssert
    }

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert = selectDayFromCurrent(3)

      //cy.get('nb-calendar-day-picker').contains('17').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    })
  })

  /*
  **********************************
  * Lesson 28: Lists and Dropdowns
  **********************************
  */
  it('check boxes', () => {
    cy.visit('/')

    // 1
    cy.get('nav nb-select').click()
    cy.get('.options-list').contains('Dark').click()
    cy.get('nav nb-select').should('contain', 'Dark')
    cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    // 2
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim()

        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])

        if(index < 3){
          cy.wrap(dropdown).click()
        }
      })
    })
  })

  /*
  **********************************
  * Lesson 29: Web Tables
  **********************************
  */
  it('web tables', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    // 1: change the value of an input field
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[ng-reflect-name="age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

    // 2: add a new value
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('[ng2-st-thead-form-row]').then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').eq(0).find('td').then(tableData => {
      cy.wrap(tableData).eq(2).should('contain', 'Artem')
      cy.wrap(tableData).eq(3).should('contain', 'Bondar')
    })

    // 3: filter
    const ages = [20, 30, 40, 200]

    cy.wrap(ages).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500) // waiting 0.5 sec
      cy.get('tbody tr').each(tableRow => {
        if(age == 200){
          cy.wrap(tableRow).find('td').should('contain', 'No data found')
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        }
      })
    })

  })

  /*
  **********************************
  * Lesson 30: PopUps and ToolTips
  **********************************
  */
  it('tootltip', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.get('button').contains('Default').click()
    cy.get('nb-tooltip').contains('This is a tooltip')
  })

  it('dialog box', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    // 1 (not recommended, because if window:confirm never gets fired, the following code will never be executed)
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Are you sure you want to delete?')
    })

    // 2 (better approach, because if window:confirm does not get fired, the stub will be empty, therefore there won't be an element on the stub (getCall(0)), thus not getting the correct confirm message will make the test fail)
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    // 3: select cancel
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)
  })

  it.only('popup', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()

    cy.get('nb-card').contains('Open Dialog').parent().find('button').contains('Open Dialog with component').click()

    cy.get('.cdk-overlay-container ngx-showcase-dialog').find('nb-card').then(card => {
      cy.wrap(card).contains('nb-card-header', 'This is a title passed to the dialog component')
      cy.wrap(card).get('nb-card-footer button').click()
    })

    cy.get('.cdk-overlay-container').should('contain', '')

  })
})


