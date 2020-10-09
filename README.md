This boilerplate project created as a starter for one of the projects I work with. It has no purpose to be the most versatile, the simplest or themost modern one. This is just a set of modules, helpers and approaches which work good for me here and now and which I can rely on. 

## What's included
Okay, here the main facts about the project:

- [Create React App](https://github.com/facebook/create-react-app). I love to tinker with bundlers (not really), but CRA provides a good starting point.
    - [react-app-rewired](https://github.com/timarney/react-app-rewired) included for overriding CRA configuration without ejecting.

- [TypeScript](https://github.com/microsoft/TypeScript). I highly recommend to strictly type all the project code and don't use explicit `any` unless absolutely necessary. In test files (and only in test files) `any` is acceptable.

- [Redux](https://github.com/reduxjs/redux) with middleware and other tools for convenient app state handling:
    - [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) is used to automate actions and reducers creation, make them type safe, and reduce code verbosity.
    - `updatePrimitiveValue` utility added to make simple one-line reducers.
    - [redux-observable](https://github.com/redux-observable/redux-observable) middleware is used to work with asyncronous logic using [rx](https://www.learnrxjs.io/) reactive approach.
    - [reselect](https://github.com/reduxjs/reselect) and [re-reselect](https://github.com/toomuchdesign/re-reselect) are used for caching selectors.
    - [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) middleware 

- API endpoint abstraction based on axios
    - `createEndpoint` endpoints factory
    - `mockApi` and `mockEndpoint` test helpers

- API requests handling
    - `createApiRequestEpic` factory of redux-observable epics for API requests. Factory takes `typesafe-actions` async action creator and endpoint. Those epics perform API request and dispatch according to it's lifecycle:
        - `require`, `succes` and `failure` actions
        - `setQueryStatus` action
    - `setQueryStatus` action, `api` reducer and `selectQueryStatus` selector
    - `getQueryName` helper to create unique identifier for each API request

- [styled-components](https://github.com/styled-components/styled-components)
    - Naming convention for styled components is taken from [this article](https://medium.com/inturn-eng/naming-styled-components-d7097950a245).
    - [babel-plugin-styled-components](https://github.com/styled-components/babel-plugin-styled-components) added to config using react-app-rewired for readable styled component class names and names in React DevTools.
    - GlobalStyle component for CSS reset.

- [Material UI](https://material-ui.com/)
    - App wrapped into Material UI `StylesProvider` with `injectFirst` property to make it possible to override Material UI styles with styled components.

- [Prettier](https://github.com/prettier/prettier) with few basic settings and ESlint integration.

- Tests
    - Jest configuration to collect coverage with 90% threshold
    - [Enzyme](https://github.com/enzymejs/enzyme) for components integration testing
    - Few utils for mocking and writing tests with usage examples

- `.vscode` configuration folder:
    - Few settings for code autoformat on save.
    - Recommended extensions for comfortable work with the project (install them!)
    - Launch script for debuggin unit tests

In the code you can find the simplest examples for pretty much everything from this list.

## What's NOT included (probably yet):
- ESlint config and tsconfig customizations, now they are pretty much default
- Abstractions for server state handling
- Immer
- Data normalization (probably using Normalizr)

## Known issues:
- No readable styled components names in jest

