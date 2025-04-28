import { counterPage } from '../support/page-objects/CounterPage'

describe('Counter App', () => {
  beforeEach((): void => {
    counterPage.visit()
  })

  describe('Initial State', () => {
    it('should display all UI elements correctly', (): void => {
      counterPage.verifyUIElements()
    })

    it('should display initial counter value of 0', (): void => {
      counterPage.assertCounterValue(0)
    })
  })

  describe('UI Elements', () => {
    it('should have correct button text', (): void => {
      counterPage.verifyButtonTexts()
    })

    it('should have visible counter display', (): void => {
      counterPage.verifyCounterDisplay()
    })

    it('should have proper heading structure', (): void => {
      counterPage.verifyHeadingStructure()
    })

    it('should have buttons enabled and clickable', (): void => {
      counterPage.increment().assertCounterValue(1).decrement().assertCounterValue(0)
    })
  })

  describe('Increment Operation', () => {
    it('should increment counter when clicking increment button', (): void => {
      counterPage.increment().assertCounterValue(1)
    })

    it('should handle multiple increments', (): void => {
      counterPage
        .increment() // 1
        .increment() // 2
        .increment() // 3
        .increment() // 4
        .increment() // 5
        .assertCounterValue(5)
    })
  })

  describe('Decrement Operation', () => {
    it('should not allow counter to go below 0', (): void => {
      counterPage.verifyNoNegativeNumbers()
    })

    it('should decrement counter when above 0', (): void => {
      counterPage
        .increment() // 1
        .assertCounterValue(1)
        .decrement() // back to 0
        .assertCounterValue(0)
    })

    it('should handle multiple decrements stopping at 0', (): void => {
      // First increment to 5
      counterPage
        .increment()
        .increment()
        .increment()
        .increment()
        .increment()
        .assertCounterValue(5)
        // Then decrement to test multiple decrements
        .decrement() // 4
        .assertCounterValue(4)
        .decrement() // 3
        .assertCounterValue(3)
        .decrement() // 2
        .assertCounterValue(2)
        .decrement() // 1
        .assertCounterValue(1)
        .decrement() // 0
        .assertCounterValue(0)
        // Verify can't go below 0
        .decrement()
        .assertCounterValue(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid clicks correctly', (): void => {
      // First increment to 5
      for (let i = 0; i < 5; i++) {
        counterPage.increment()
      }
      counterPage.assertCounterValue(5)

      // Then decrement rapidly, should stop at 0
      for (let i = 0; i < 7; i++) {
        counterPage.decrement()
      }
      counterPage.assertCounterValue(0)
    })

    it('should always maintain non-negative values', (): void => {
      // Try to decrement at 0
      counterPage
        .assertCounterValue(0)
        .decrement()
        .assertCounterValue(0)
        .increment() // 1
        .decrement() // 0
        .decrement() // stays at 0
        .assertCounterValue(0)
    })
  })
})
