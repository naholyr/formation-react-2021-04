# Cheatsheet React

v0.1#WIP - avr. 2021

## Composants

[Initialiser le projet](https://fr.reactjs.org/docs/create-a-new-react-app.html) : `npx create-react-app mon-projet`

### Les bases

```jsx
<MonComposant />
```

#### Classe

```jsx
import { Component } from "react";

// Constructeur appelé une seule fois dans la vie du composant
// render() appelé à chaque mise à jour
class MonComposant extends Component {
  render() {
    return <p>Hello, world</p>;
  }
}

export default MonComposant;
```

#### Fonction

```jsx
// Fonction appelée à chaque mise à jour
const MonComposant = () => {
  return <p>Hello, world</p>;
};

export default MonComposant;
```

### Props

```jsx
<MonComposant who="you" />
```

#### Classe : `this.props` & [`defaultProps`](https://fr.reactjs.org/docs/react-component.html#defaultprops)

```jsx
class MonComposant extends Component {
  static defaultProps = {
    who: "world",
  };

  render() {
    return <p>Hello, {who}</p>;
  }
}
```

#### Fonction : argument `props` & [_destructuring_](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition)

```jsx
const MonComposant = ({ who = "world" }) => {
  return <p>Hello, {who}</p>;
};
```

#### Children

```jsx
<MonComposant>
  <p>One</p>
  <p>Two</p>
</MonComposant>
```

`props.children` contient `<p>One</p>` et `<p>Two</p>` sous forme de [simili-tableau](https://fr.reactjs.org/docs/react-api.html#reactchildren).

### State

#### Classe : `this.state` & [`setState`](https://fr.reactjs.org/docs/react-component.html#setstate)

```jsx
class MonComposant extends Component {
  // Initialisation
  state = { key1: "valeur initiale", key2: "..." };

  // Attention à la syntaxe "= () =>" qui permet d'éviter de perdre "this"
  handleClick = (e) => {
    e.preventDefault();
    // Merge: Conserve "key2", remplace "key1"
    this.setState({ key1: "nouvelle valeur" });
  };

  render() {
    return <p onClick={this.handleClick}>Click: {this.state.key1}</p>;
  }
}
```

Attention, `setState` est asynchrone :

```js
// this.state.value === 1
this.setState({ value: this.state.value + 1 }); // équivalent à this.setState({ value: 2 })
this.setState({ value: this.state.value + 1 }); // équivalent à this.setState({ value: 2 })
// L'incrément n'est en réalité fait qu'une fois !

this.setState((state) => ({ value: state.value + 1 })); // state.value === 1 au moment de l'application du changement
this.setState((state) => ({ value: state.value + 1 })); // state.value === 2 au moment de l'application du changement
// L'incrément est bien fait deux fois
```

#### Fonction : [`useState`](https://fr.reactjs.org/docs/hooks-reference.html#usestate)

```jsx
const MonComposant = () => {
  // On utilise pas un seul objet "state" avec plusieurs valeurs, mais un "useState" par valeur
  // useState() retourne la valeur actuelle (pour le rendu courant) + le setter
  const [value1, setValue1] = useState("valeur initiale");
  const [value2, setValue2] = useState("...");

  const handleClick = (e) => {
    e.preventDefault();
    // Remplace la valeur, pas de merge
    setValue1("nouvelle valeur");
  };

  return <p onClick={handleClick}>Click: {value1}</p>;
};
```

Attention, le _setter_ est asynchrone :

```js
// value === 1
setValue(value + 1); // équivalent à setValue(2)
setValue(value + 1); // équivalent à setValue(2)
// L'incrément n'est en réalité fait qu'une fois !

setValue((state) => value + 1); // state === 1 au moment de l'application du changement
setValue((state) => value + 1); // state === 2 au moment de l'application du changement
// L'incrément est bien fait deux fois
```

### Effets de bord

Déclencher des événements durant la vie du composant = se brancher sur le **cycle de vie**.

#### Classe : [`componentDidMount`, `componentDidUpdate`, componentWillUnmount`](https://fr.reactjs.org/docs/react-component.html#commonly-used-lifecycle-methods)

```js
  componentDidMount () {
    // Le composant vient d'être créé, le DOM est à jour
    // C'est l'endroit où on enregistre des listeners par exemple
    chat.subscribe(this.props.room);
  }

  componentWillUnmount () {
    // Le composant va être détruit, le DOM n'est pas encore à jour
    // C'est l'endroit où on nettoie ce qui doit l'être
    // → setTimeout dans le didMount = clearTimeout dans le willUnmount
    // → subscribe dans le didMount = unsubscribe dans le willUnmount
    // → requête dans le didMount = annulation de la requête si elle est encore en cours dans le willUnmount
    // etc.
    chat.unsubscribe(this.props.room);
  }

  componentDidUpdate (prevProps, prevState) {
    // Le composant a été mis à jour, le DOM est à jour
    // Causes possibles : modification de props ou de state
    // C'est l'endroit où selon les modifications reçues on va rejouer nettoyage + remise en place
    if (prevProps.room !== this.props.room) {
      chat.unsubscribe(prevProps.room);
      chat.subscribe(this.props.room);
    }
  }
```

#### Fonction : [`useEffect`](https://fr.reactjs.org/docs/hooks-reference.html#useeffect)

`useEffect(effet, conditions)`

- `effet` = fonction qui exécute l'effet + retourne la fonction de nettoyage
- `conditions` = tableau de valeurs, l'effet n'est relancé que si les valeurs changent entre deux renders

```js
// Conditions = [] → effet exécuté seulement une fois
useEffect(effect, []);

// Conditions non spécifié → effet exécuté à CHAQUE render
useEffect(effect);

// Généralement, conditions = les variables utilisées dans l'effet
useEffect(() => console.log("La valeur a changé", value), [value]);

// Le principe "effet + nettoyage" permet de gérer les effets de bord bien plus simplement qu'avec les classes
useEffect(
  () => {
    // effet
    chat.subscribe(room);
    // fonction de nettoyage: le scope point bien vers l'ancienne valeur
    return () => chat.unsubscribe(room);
  },
  // Condition: le state ou la prop "room" a changé de valeur
  [room]
);
```

### Typage

TODO

#### propTypes

#### TypeScript

### Outils utiles

TODO

#### Gestion des `className` dynamiques

### Performances

TODO

#### Valeur initiale de `useState`

#### Éviter les rendus inutiles : [`PureComponent`](https://fr.reactjs.org/docs/react-api.html#reactpurecomponent) & [`memo`](https://fr.reactjs.org/docs/react-api.html#reactmemo)

#### Éviter les calculs inutiles : mémoization

`npm install memoize-one`

## Redux

TODO
