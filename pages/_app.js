import '../styles/globals.css'
import { Provider as EffectorProvider } from 'effector-react/ssr'
import { fork, serialize } from 'effector/fork'
import { app } from '../model/app'

const isBrowser = () => typeof window !== 'undefined'

let currentScope
let scope

const serializeDiff = (app, scope) => {
  const ignore = []
  for (const store of app.history.stores) {
    let needIgnore = true
    try {
      needIgnore = scope.getState(store) === store.defaultState
    } catch (err) {}
    if (needIgnore) {
      ignore.push(store)
    }
  }
  return serialize(scope, { ignore })
}

export default function App({ Component, pageProps }) {
  if (isBrowser()) {
    if (currentScope) {
      scope = fork(app, {
        values: {
          ...pageProps.store,
          ...serializeDiff(app, currentScope),
        }
      })
    } else {
      scope = fork(app, {
        values: pageProps.store,
      })
    }
    currentScope = scope
  } else {
    scope = fork(app, {
      values: pageProps.store,
    })
  }

  return (
    <EffectorProvider value={scope}>
      <Component {...pageProps} />
    </EffectorProvider>
  )
}
