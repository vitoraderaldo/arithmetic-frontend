import { Config } from "./config.util";

export const login = (email: string, password: string) => {
  cy.visit(Config.baseUrl);
  cy.get('#email-input').type(email)
  cy.get('#password-input').type(password)
  cy.get('#login-button').click()
}
