# Counter Application

A simple counter application that allows users to increment and decrement a number, with a zero boundary (no negative numbers allowed).

## Features

- Increment counter
- Decrement counter (won't go below 0)
- Clean, centered UI
- End-to-end testing with Cypress
- TypeScript support with path aliases
- Automated PR verification with GitHub Actions

## Project Structure

```
├── src/                # Source code
│   ├── components/     # React components
│   └── ...            # Other source files
├── cypress/
│   ├── e2e/           # End-to-end tests
│   └── support/       # Test support files and page objects
├── test-plan/         # Test documentation
├── .github/
│   └── workflows/     # GitHub Actions workflows
├── tsconfig.json      # TypeScript configuration
├── tsconfig.node.json # Node-specific TS config
├── cypress.config.ts  # Cypress configuration
├── .gitignore        # Git ignore configuration
└── package.json       # Project dependencies
```

## Cypress Configuration

Located in `cypress.config.ts`:

```typescript
{
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 4000,
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
}
```

Key features:

- TypeScript support for tests
- Automatic screenshots on failure
- Retry support for flaky tests
- No video recording for faster CI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd counter-application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at http://localhost:3000

## Testing

### Running E2E Tests

You can run the tests in two modes:

1. Interactive mode (opens Cypress Test Runner):

   ```bash
   npm run cypress:open
   ```

2. Headless mode (runs in terminal):
   ```bash
   npm test
   ```

### Test Coverage

The application has comprehensive end-to-end tests covering:

- Initial state and UI elements
- Increment functionality
- Decrement functionality with zero boundary
- Edge cases and rapid interactions

For detailed test coverage, see [test-plan/counter-test-plan.md](test-plan/counter-test-plan.md)

## Implementation Details

### Technology Stack

- HTML/CSS/JavaScript for the counter application
- Cypress for end-to-end testing
- TypeScript for type safety
- Page Object Pattern for test maintainability

### Key Features

1. **Counter Operations**

   - Increment: Increases counter by 1
   - Decrement: Decreases counter by 1 (stops at 0)

2. **Zero Boundary**

   - Counter never displays negative numbers
   - Decrement at 0 keeps the counter at 0

3. **UI Elements**
   - Clear, centered display
   - Responsive buttons
   - Immediate visual feedback

## Continuous Integration

The project uses GitHub Actions for automated testing on pull requests:

### Verify Workflow

Located in `.github/workflows/verify.yml`, this workflow:

- Triggers automatically on every pull request to main branch
- Sets up Node.js environment
- Installs dependencies
- Starts the application server
- Runs Cypress tests in headless mode
- Uploads test artifacts (screenshots) if tests fail

### CI Process

1. **Pull Request Creation**

   - Developer creates a PR to main branch
   - GitHub Actions automatically triggers verify workflow

2. **Verification Steps**

   - Checkout code
   - Setup Node.js 20
   - Install dependencies with `npm ci`
   - Start application server
   - Run Cypress tests
   - Upload artifacts if tests fail

3. **Results**
   - Success: All tests pass, PR can be reviewed
   - Failure: Screenshots uploaded, PR needs fixes

### Viewing Test Results

- Test results appear in PR's "Checks" tab
- Failed test screenshots available as artifacts
- Detailed test output in workflow logs

## Development

### Code Organization

- `index.html`: Main application code
- `cypress/e2e/counter.cy.ts`: Test specifications
- `cypress/support/page-objects/CounterPage.ts`: Page object for tests
- `test-plan/`: Detailed test documentation

### Test Selectors

The application uses data-test attributes for reliable test selection:

```html
<!-- Example of data-test attributes -->
<h1 data-test="counter-heading">Counter: <span data-test="counter-value">0</span></h1>
<button data-test="increment-button">Increment</button>
<button data-test="decrement-button">Decrement</button>
```

Available data-test selectors:

- `counter-heading`: Main counter heading
- `counter-value`: Counter display value
- `increment-button`: Increment button
- `decrement-button`: Decrement button

### Testing Best Practices

1. **Using Data-Test Attributes**

   ```typescript
   // In CounterPage.ts
   private readonly counterSelector: string = '[data-test="counter-value"]'
   private readonly incrementButtonSelector: string = '[data-test="increment-button"]'
   ```

2. **Page Object Pattern**

   - All selectors maintained in `CounterPage.ts`
   - Methods use data-test attributes for reliable selection
   - Chainable methods for fluent test writing

3. **Writing Tests**
   ```typescript
   // Example test using data-test selectors
   it('should increment counter', () => {
     cy.get('[data-test="increment-button"]').click()
     cy.get('[data-test="counter-value"]').should('have.text', '1')
   })
   ```

### Adding New Features

When adding new UI elements:

1. Add appropriate data-test attributes
2. Update `CounterPage.ts` with new selectors
3. Add corresponding test methods
4. Update test documentation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
