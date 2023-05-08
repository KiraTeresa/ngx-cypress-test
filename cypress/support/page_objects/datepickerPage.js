
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
      cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
    }
  })
  return dateAssert
}

export class DatepickerPage{

  selectCommonDatepickerDateFromToday(dayFromToday){
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert = selectDayFromCurrent(dayFromToday)
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    })
  }

  selectDatepickerWithRangeFromToday(dayFromTodayStart, dayFromTodayEnd){
    cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssertFirst = selectDayFromCurrent(dayFromTodayStart)
      let dateAssertLast = selectDayFromCurrent(dayFromTodayEnd)
      const finalDate = dateAssertFirst + " - " + dateAssertLast
      cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
    })
  }

}

export const onDatepickerPage = new DatepickerPage()
