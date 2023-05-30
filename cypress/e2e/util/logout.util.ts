export const logout = () => {
  cy.get('#left-menu-logout').click()
  cy.get('#confirm-logout-button').click()
  cy.get('#email-input').should('be.visible')
  cy.get('#password-input').should('be.visible')
}
