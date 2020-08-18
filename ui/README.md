# Working with the React UI

This file explains how to work with the React-based PalembangDigital UI.

## Introduction

The [React-based](https://reactjs.org/) PalembangDigital UI was bootstrapped using [Create React App](https://github.com/facebook/create-react-app), a popular toolkit for generating React application setups. You can find general information about Create React App on [their documentation site](https://create-react-app.dev/).

## Development environment

To work with the React UI code, you will need to have the following tools installed:

- The [Node.js](https://nodejs.org/) JavaScript runtime.
- The [Yarn](https://yarnpkg.com/) package manager.

## Installing npm dependencies

The React UI depends on a large number of [npm](https://www.npmjs.com/) packages. These are not checked in, so you will need to download and install them locally via the Yarn package manager:

    yarn

Yarn consults the `package.json` and `yarn.lock` files for dependencies to install. It creates a `node_modules` directory with all installed dependencies.

## Running a local development server

You can start a development server for the React UI outside of a running PalembangDigital server by running:

    yarn start

This will open a browser window with the React app running on http://localhost:3000/. The page will reload if you make edits to the source code. You will also see any lint errors in the console.

Due to a `"proxy": "http://localhost:8080"` setting in the `package.json` file, any API requests from the React UI are proxied to `localhost` on port `8080` by the development server. This allows you to run a normal PalembangDigital server to handle API requests, while iterating separately on the UI.

    [browser] ----> [localhost:3000 (dev server)] --(proxy API requests)--> [localhost:8080 (PalembangDigital)]

## Running tests

Create React App uses the [Jest](https://jestjs.io/) framework for running tests. To run tests in interactive watch mode:

    yarn test

To generate an HTML-based test coverage report, run:

    CI=true yarn test --coverage

This creates a `coverage` subdirectory with the generated report. Open `coverage/lcov-report/index.html` in the browser to view it.

The `CI=true` environment variable prevents the tests from being run in interactive / watching mode.

See the [Create React App documentation](https://create-react-app.dev/docs/running-tests/) for more information about running tests.

## Linting

We use [lint-staged](https://github.com/okonet/lint-staged) for the linter. To detect and automatically fix lint errors against staged git files, run:

    yarn lint

This is also available via the `ui-lint-fix` target in the main PalembangDigital `Makefile`.

## Building the app for production

To build a production-optimized version of the React app to a `build` subdirectory, run:

    yarn build

**NOTE:** You will likely not need to do this directly. Instead, this is taken care of by the `build` target in the main PalembangDigital `Makefile` when building the full binary.

## Integration into PalembangDigital

To build a PalembangDigital binary that includes a compiled-in version of the production build of the React app, change to the root of the repository and run:

    make build

This installs npm dependencies via Yarn, builds a production build of the React app, and then finally compiles in all web assets into the PalembangDigital binary.
