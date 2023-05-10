import {navigateTo} from "../support/page_objects/navigationPage";
import {onFormLayoutsPage} from "../support/page_objects/formLayoutsPage";
import {onDatepickerPage} from "../support/page_objects/datepickerPage";
import {onSmartTablePage} from "../support/page_objects/smartTablePage.";

describe('Test with Page Objects', () => {

  beforeEach('open application', () => {
    cy.openHomePage()
  })

  it('verify navigation across the pages',()=> {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.smartTablePage()
    navigateTo.toastrPage()
    navigateTo.toolTipPage()
  })

  it.only('should submit Inline and Basic form and select tomorrow date in the calendar', {browser: '!chrome'},() => {

    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password-123')

    navigateTo.datepickerPage()
    onDatepickerPage.selectCommonDatepickerDateFromToday(1)
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)

    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar')
    onSmartTablePage.updateAgeByFirstName('Artem', 30)
    onSmartTablePage.deleteRowByIndex(1)
  })
})
