import moment from 'moment'
import { login } from './util/login.util'
import { testingUser1 } from './util/credentials'

describe('Calculate', () => {

  const perfomCalculation = (
    operationId: string,
    operationName: string,
    argument1: string,
    argument2: string,
    expectedResult: string,
  ) => {
    cy.get('#left-menu-home').click()
    cy
      .get('#operation-selector').click()
      .get(operationId).click()

    let cost
    cy.get('#cost').then(($input) => {
      const value = $input.val()
      cost = value
    })
    
    if (argument1) {
      cy.get('#argument-input-1').type(argument1)
    }
    if (argument2) {
      cy.get('#argument-input-2').type(argument2)
    }

    cy.get('#calculate-button').click()

    cy.get('#operation-result').should('have.value', expectedResult)
    cy.get('#final-balance').should('not.have.value', '')

    cy.get('#left-menu-records').click()

    cy.get('tbody > tr').eq(0).find('td').should('have.length', 6).then(($tds) => {
      expect($tds.eq(0)).to.contain.text(operationName);
      expect($tds.eq(1)).to.contain.text(`$ ${cost}`);
      expect($tds.eq(2)).to.contain.text('$');
      expect($tds.eq(3)).to.contain.text(expectedResult);
      expect($tds.eq(4)).to.contain.text(moment().format('M/DD/YYYY').toString());
    });
  }

  const generateRandomString = () => {
    cy.get('#left-menu-home').click()
    cy
      .get('#operation-selector').click()
      .get('#operation-6').click()

    let cost
    cy.get('#cost').then(($input) => {
      const value = $input.val()
      cost = value
    })

    cy.get('#calculate-button').click()

    cy.get('#operation-result').should('not.have.value', '')
    cy.get('#final-balance').should('not.have.value', '')

    cy.get('#left-menu-records').click()

    cy.get('tbody > tr').eq(0).find('td').should('have.length', 6).then(($tds) => {
      expect($tds.eq(0)).to.contain.text("Random String");
      expect($tds.eq(1)).to.contain.text(`$ ${cost}`);
      expect($tds.eq(2)).to.contain.text('$');
      expect($tds.eq(4)).to.contain.text(moment().format('M/DD/YYYY').toString());
    });
  }

  it('must calculate operations', () => {
    login(testingUser1.email, testingUser1.password)
    perfomCalculation('#operation-1', 'Addition', '1', '2', '3')
    perfomCalculation('#operation-2', 'Subtraction', '1', '2', '-1')
    perfomCalculation('#operation-3', 'Multiplication', '1', '2', '2')
    perfomCalculation('#operation-4', 'Division', '1', '2', '0.5')
    perfomCalculation('#operation-5', 'Square Root', '16', '', '4')
    generateRandomString()
  })
  
})
