export class CounterPage {
  private readonly counterSelector: string = '#counter'
  private readonly incrementButtonSelector: string = '#increment-btn'
  private readonly decrementButtonSelector: string = '#decrement-btn'
  private readonly headingSelector: string = 'h1'

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
   * Asserts the counter value
   * @param expectedValue - The expected value to check against
   * @returns this for method chaining
   */
  assertCounterValue(expectedValue: number): this {
    cy.get(this.counterSelector).should('have.text', expectedValue.toString())
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
    cy.get(this.incrementButtonSelector)
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Increment')

    cy.get(this.decrementButtonSelector)
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Decrement')

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

  /**
   * Verifies that counter stays at zero when trying to decrement
   * @returns this for method chaining
   */
  verifyNoNegativeNumbers(): this {
    // First verify we're at zero
    this.assertCounterValue(0)

    // Try to decrement and verify it stays at zero
    this.decrement()
    this.assertCounterValue(0)

    // Try multiple decrements to ensure it stays at zero
    this.decrement()
    this.decrement()
    this.assertCounterValue(0)

    return this
  }
}

export const counterPage = new CounterPage()
