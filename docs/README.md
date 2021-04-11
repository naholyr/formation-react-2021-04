# Formation React (12/04/2021)

## Info utiles

Formateur : Nicolas Chambrier <nicolas@chambrier.fr> @naholyr

### Liens utiles

- Diagramme du cycle de vie des composants : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
- Ulimit & watch : https://www.imakewebsites.ca/posts/2018/03/06/node.js-too-many-open-files-and-ulimit/
- Qui est this ? https://github.com/byteclubfr/site/blob/readable-in-github/src/blog/this.md
- Features ES6 : http://es6-features.org/#ObjectMatchingShorthandNotation
- React : https://reactjs.org/docs/react-component.html
- Babel (transpilation) : https://babeljs.io/repl
- Rechercher un module : https://www.npmjs.com/search
- Vérifier le poids d'une dépendance : https://bundlephobia.com/
- Intégration d'ESLint dans l'IDE : https://facebook.github.io/create-react-app/docs/setting-up-your-editor
- Organiser les routes à un seul endroit : https://github.com/reacttraining/react-router/tree/master/packages/react-router-config
- Animations
  - React Transition Group : https://reactjs.org/docs/animation.html
  - React Router Transitions : https://reacttraining.com/react-router/web/example/animated-transitions
- Tests :
  - Tests fonctionnels E2E : Cypress
  - “Write tests. Not too many. Mostly integration” : https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c
  - Tester son routing (hors shallow rendering) : https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/testing.md
  - Tester ses hooks "custom" : https://github.com/mpeyper/react-hooks-testing-library (ou de manière générale, on écrit un composant qui utilise ce hook dans différentes situations et on le teste)
  - Mise en place des tests avec Jest/Enzyme : https://facebook.github.io/create-react-app/docs/running-tests
  - “Why I never use Shallow Rendering” : https://kentcdodds.com/blog/why-i-never-use-shallow-rendering
- « Challenges in Server Side Rendering React Apps” : https://vijayt.com/post/challenges-in-server-side-rendering-react-apps-ssr/
- “Hot reloading with create-react-app without ejecting” : https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
- “Portable console emulator for Windows” : https://cmder.net/
- “Execution in the kindom of nouns” : https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html
- “React Lifecycle Methods Diagram” : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
- “Understanding Redux Middleware And Writing Custom Ones” : https://designingforscale.com/understanding-redux-middleware-and-writing-custom-ones/

## Protips / bons réflexes

|                                                               Situation | Penser à…                                                                                   |
| ----------------------------------------------------------------------: | ------------------------------------------------------------------------------------------- |
|                                      Action au démarrage d'un composant | `componentDidMount` si besoin de `setState`, `componentWillMount` sinon                     |
|                                       Réagir aux modifications de props | `componentDidUpdate`                                                                        |
|                        `setState` dont la valeur dépend de `this.state` | utiliser un *functional updater* : `setState(oldState => newState)`                         |
| Abonnement à un événement ou action asynchrone dans `componentDidMount` | penser à annuler dans `componentWillUnmount` (si pas possible, gérer tout le flux ailleurs) |
|                                                            React Router | penser à installer `react-router-dom@next` afin d'éviter le problème _"update blocking"_    |

## ES6: Spreading operator

Rest parameters:

```js
const foo = (a, b, c, ...rest) {
  rest // [4, 5, 6]
}

foo(1, 2, 3, 4, 5, 6)
```

Spread arguments:

```js
const array = [1, 2, 3, 4, 5, 6];
foo(...array);
```

Spread operator (array, object)

```js
const a1 = [1, 2, 3];
const a2 = [4, 5, 6];
const a = [0, ...a1, ...a2, 7];

const o1 = { x: 1, y: 1 };
const o2 = { x: 2, z: 2 };
const o = { ...o1, ...o2, w: 3 };
// {x: 1, y: 1, x: 2, z: 2, w: 3}
// {x: 2, y: 1, z: 2, w: 3}
```

Attention: shallow copy

```js
const data = { users: [{ name: "Bob" }, { name: "John" }] };

const users2 = [...data.users, { name: "Jesus" }];
users2[0].name = "Toto";

data.users[0].name; // 'Toto'
```

## Immutable.js

```js
import { fromJS } from "immutable";

const data = fromJS({ users: [{ name: "Bob" }, { name: "John" }] });

data.get("users");
data.getIn(["users", 0, "name"]);

// data.users.push({ name: 'Jesus' }) (sauf qu'on ne modifie pas data → nouvelle instance)
data.set("users", data.get("users").push(fromJS({ name: "Jesus" })));
```

## Async setState: snippet intéressant

https://twitter.com/dan_abramov/status/1018945865745084416

## Environnement de développement

- create-react-app
- customisation:
  - react-app-rewired
  - react-app-rewire-eslint
  - react-app-rewire-scss

### Editorconfig

https://editorconfig.org/

### ESLint

`package.json` :

```json
{
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"],
    "rules": {
      "react/jsx-key": ["error", { "checkFragmentShorthand": true }]
    }
  }
}
```

- add plugin to your editor (search "ESLint")

### Prettier

https://github.com/prettier/prettier

```sh
npm add -D prettier
```

- add plugin to your editor (search "Prettier", in VSCode it's "Prettier - Code formatter" + set `"editor.formatOnSave": true`)

As pre-commit hook:

```sh
npm add -D pretty-quick husky
```

```js
// package.json
{
  "scripts": {
    "precommit": "pretty-quick --staged"
  }
}
```

## Testing

```js
// MyComponent.test.js
it("works", () => {
  const data = { x: 42, y: 33 };
  expect(data).toEquals(data);
});
```

```sh
npm test
```

### Testing rendered component

```js
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```

### Shallow rendering

```sh
npm add enzyme enzyme-adapter-react-16
```

```js
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const component = shallow(<MyComponent />);
  expect(component.find(ChildComponent)).toHaveLength(1);
});
```

### Jest Snapshots

```js
it("tests snapshot", () => {
  const data = { x: 42, y: 33 };
  expect(data).toMatchSnapshot();
});
```

## React router

```sh
npm add react-router-dom
```

```js
// Wrapper
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
```

### Routing

```js
import { Route, Switch } from 'react-router-dom'

// <Dashboard {match, location, history} /> is render iff URL matches /dashboard
<Route path="/dashboard" component={Dashboard}/>

// Only one route will be rendered (first matching)
// Otherwise '/invoices/dashboard' would also match '/invoices/:id'
<Switch>
  <Route exact path="/invoices/dashboard" component={Dashboard}/>
  <Route path="/invoices/:id" component={Invoice}/>
</Switch>
```

### Links

```js
import { Link } from "react-router-dom";

<Link to="/dashboard">...</Link>;
// Alternative: NavLink (className="active")
```

### Rendering issues with PureComponent / Redux

```js
import { withRouter } from 'react-router'

withRouter(connect(...)(MyComponent))
```

## Server-side rendering

- A node.js server able to import React components
  - Simplest = use Babel + react-app configuration
- A way to build state depending on URL
  - Use server-side API instead of client-side API (or polyfilled methods)
  - Run actions

### Server-side

```js
const store = createStore(
  reducer,
  initialState,
  ...
);

// Replay actions based on URL
store.dispatch(action1())
store.dispatch(action2())
...
```

```js
import { renderToString } from "react-dom/server";

// Render as string with computed store
renderToString(
  <Provider store={store}>
    <App />
  </Provider>
);
```

```js
// Send rendered component + initial state to client
send(
  layout // index.html
    .replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`)
    .replace(
      /<body>/,
      `<body><script>window.SSR_STATE=${JSON.stringify(state)}</script>`
    )
);
```

### Client-side

```js
// Client-side, you initiate store with proper initial state
const store = createStore(
  reducer,
  window.SSR_STATE || initialState,
  ...
);

// Data initialization only if not already server-side rendered
if (!window.SSR_STATE) {
  ...
}

// Use 'hydrate' instead of simply 'render' when reconnecting to existing DOM
const render = window.SSR_STATE ? ReactDOM.hydrate : ReactDOM.render;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### Routing

```js
import { StaticRouter } from "react-router";

<StaticRouter location={req.url} context={context}>
  <App />
</StaticRouter>;
```

### Data fetching

Challenge: given the URL, know what actions should be dispatched, or what data should be fetched and injected. More generally: what async actions should run.

Short answer: no bullet proof.

Solutions:

- [Centralized routes configuration + react-router-config](https://alligator.io/react/react-router-ssr/)
  - simple, efficient
  - constraints to a single, centralized, routes declaration, no nested dynamic routing
- If you really want nested dynamic routing, we can intercept async actions to aggregate promises and use Promise.all to be sure all are finished (that can be done via a Redux middleware, or in reducer you keep track of all promises so server will be able to plug to this)
