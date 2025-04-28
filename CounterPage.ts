export class CounterPage {
  private readonly counterSelector: string = '[data-test="counter-value"]'
  private readonly incrementButtonSelector: string = '[data-test="increment-button"]'
  private readonly decrementButtonSelector: string = '[data-test="decrement-button"]'
  private readonly headingSelector: string = '[data-test="counter-heading"]'

  /**
   * Visits the counter page
   * @returns this for method chaining
   */
  visit(): this {
    cy.visit('/')
    return this
  }

  /**
   * Gets the current counter value
   * @returns Cypress chain containing the counter value as a number
   */
  getCurrentValue(): Cypress.Chainable<number> {
    return cy
      .get(this.counterSelector)
      .invoke('text')
      .then((text) => parseInt(text, 10))
  }

  /**
   * Increments the counter
   * @returns this for method chaining
   */
  increment(): this {
    cy.get(this.incrementButtonSelector).click()
    return this
  }

  /**
   * Decrements the counter
   * @returns this for method chaining
   */
  decrement(): this {
    cy.get(this.decrementButtonSelector).click()
    return this
  }

  /**
   * Asserts that the counter displays the expected value
   * @param expected The expected counter value
   * @returns this for method chaining
   */
  assertCounterValue(expected: number): this {
    cy.get(this.counterSelector).should('have.text', expected.toString())
    return this
  }

  /**
   * Verifies that all UI elements are present and correctly displayed
   * @returns this for method chaining
   */
  verifyUIElements(): this {
    this.verifyHeadingStructure()
    this.verifyCounterDisplay()
    this.verifyButtonTexts()
    return this
  }

  /**
   * Verifies the button texts are correct
   * @returns this for method chaining
   */
  verifyButtonTexts(): this {
    cy.get(this.incrementButtonSelector).should('have.text', 'Increment')
    cy.get(this.decrementButtonSelector).should('have.text', 'Decrement')
    return this
  }

  /**
   * Verifies that the counter cannot go below 0
   * @returns this for method chaining
   */
  verifyNoNegativeNumbers(): this {
    this.assertCounterValue(0).decrement().assertCounterValue(0).decrement().assertCounterValue(0)
    return this
  }

  /**
   * Verifies the counter display is visible and shows correct initial value
   * @returns this for method chaining
   */
  verifyCounterDisplay(): this {
    cy.get(this.counterSelector).should('be.visible').and('have.text', '0')
    return this
  }

  /**
   * Verifies the heading structure is correct
   * @returns this for method chaining
   */
  verifyHeadingStructure(): this {
    cy.get(this.headingSelector)
      .should('be.visible')
      .and('contain.text', 'Counter:')
      .within(() => {
        cy.get(this.counterSelector).should('exist')
      })
    return this
  }
}

export const counterPage = new CounterPage()
