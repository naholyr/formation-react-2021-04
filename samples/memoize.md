## Memoization

```js
// Principe général
f(42); // garder le résultat en mémoire
f(42); // renvoyer le résultat, sans recalculer
```

- en général juste le dernier appel

### fonctions

`memoize-one`

```js
const f = (a, b) => {
  console.log({ a, b });
  return a + b;
};

const g = memoize(f);

console.log(g(1, 2)); // { a: 1, b: 2 } \n 3
console.log(g(1, 2)); // 3 (pas de ré-exécution de f)
console.log(g(1, 1)); // { … } + résultat
console.log(g(1, 2)); // { … } + résultat (seul le dernier appel est mémoisé)
```

```js
// Exemple avec Redux
getTrials = memoize(history => data.history.filter(...).sort(...))
// Attention "data" devrait changer très fréquemment: memoize inutile
const selector = data => ({
  username: data.username,
  trials: getTrials(data.history)
}))
```

### plus spécifique à React

#### Mémoisation de composant

- Composant "contrôlé" ~= composant "pur"
- même props = même rendu

```js
// classe
class MonComposant extends React.PureComponent {
  …
}

// fonction
const MonComposant = React.memo((props) => {
  ...
})
```

#### Mémoisation de valeur dans un composant fonction (hook)

```js
const memoCompute = memoize(compute);
const Composant = ({ a, b }) => {
  const c = memoCompute(a, b);
};

const Composant = ({ a, b }) => {
  const c = React.useMemo(() => compute(a, b), [a, b]);
};
```
