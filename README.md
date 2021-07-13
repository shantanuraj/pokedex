# pokedex

Available at [pokedex.shantanu.vercel.app](https://pokedex.shantanu.vercel.app/).

## Motivation

I built this to demonstrate `AbortController` usage in conjuction with `redux-saga`.
It's quite over-engineered, but it works.

* Each request is dispatched with a unique key.
* The host component dispatches a cancellation action with the key on unmount.
```tsx
  useEffect(() => {
    ...
    return () => {
      if (loading) dispatch(apiRequestCancel('pokemons'))
    }
  }, [dispatch, load, pokemons.state]);
```
* The api fetch saga races over the network request promise and the cancellation signal.
```tsx
  const { response, cancel } = yield race({
    response: call(fetch, url, { signal }),
    cancel: take(cancelAction(key))
  })
```
* On receiving the cancellation signal or if the saga is cancelled, the controller is aborted.
```tsx
  try {
    ...
    if (cancel) return controller.abort();
    ...
  } finally {
    if (yield cancelled()) controller.abort();
  }
```

## Other notes

* The app bundle is overly split, each route is it's bundle.
* The search keyboard shortcut (cmd+f / ctrl+f) brings up the search page.