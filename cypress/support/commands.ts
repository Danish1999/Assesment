/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email: string, password: string) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject: Element, options?: Partial<TypeOptions>) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject: Element, options?: Partial<TypeOptions>) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn: Function, url: string, options: Partial<VisitOptions>) => { ... })

/**
 * Extends the Cypress namespace to include custom commands
 */
declare namespace Cypress {
  interface Chainable {
    /**
     * Resets the counter value to 0
     * @example
     * cy.resetCounter()
     */
    resetCounter(): Chainable<void>
  }
}

/**
 * Custom command to reset counter state to 0
 */
Cypress.Commands.add('resetCounter', () => {
  cy.window().then((win: Window) => {
    const counterElement = win.document.getElementById('counter')
    if (counterElement) {
      counterElement.textContent = '0'
    }
  })
})
