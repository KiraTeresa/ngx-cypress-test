export class SmartTablePage{


  updateAgeByFirstName(name, age){
    cy.get('tbody').contains('tr', name).then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[ng-reflect-name="age"]').clear().type(age)
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', age)
    })
  }

  addNewRecordWithFirstAndLastName(firstName, lastName){
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('[ng2-st-thead-form-row]').then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').eq(0).find('td').then(tableData => {
      cy.wrap(tableData).eq(2).should('contain', 'Artem')
      cy.wrap(tableData).eq(3).should('contain', 'Bondar')
    })
  }

  deleteRowByIndex(index){
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })
  }
}

export const onSmartTablePage = new SmartTablePage()
