Playwright Study Project

📌 Overview

This repository contains a collection of Playwright automated tests created for learning and experimentation purposes.
The goal of this project was to gain hands-on experience with Playwright, exploring its features and understanding how it can be applied to web test automation.

🎯 Objectives

Learn the basics of Playwright setup and configuration.

Understand how to interact with web elements (click, fill, assertions, etc.).

Explore test structuring with fixtures and Page Object Model (POM).

Practice real-world test scenarios, including login, adding items to a cart, and completing a purchase.

Gain confidence using Playwright before applying it in professional projects.

🛠️ Tech Stack

Language: JavaScript (Node.js)

Test Framework: Playwright Test

Editor: Visual Studio Code

Version Control: Git & GitHub

📂 Project Structure

playwright-demo/
│── tests/           # Test files
│── pages/           # Page Object Model classes
│── fixtures/        # Test fixtures
│── package.json     # Dependencies and scripts
│── playwright.config.js # Playwright configuration
└── README.md

▶️ How to Run

Clone the repository:

git clone https://github.com/barrosrafa98-qa/playwright-tests.git
cd playwright-tests
Install dependencies:

npm install

Run all tests:

npx playwright test
Run a specific test:

npx playwright test tests/saucedemo.spec.js

📖 Learning Notes

The tests include basic interactions, assertions, and end-to-end flows.

The project uses data-test attributes whenever possible for stable locators.

Page Objects are used to make tests more readable and maintainable.

⚠️ Disclaimer

This repository was created solely for educational purposes. Comments are written in Portuguese for better personal understanding, as this project was created solely for educational purposes.
The websites used in the tests are public demo sites designed for automation practice. No confidential or production data is involved.
