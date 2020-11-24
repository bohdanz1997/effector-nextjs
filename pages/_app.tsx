import '../models/init'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { Provider as EffectorProvider } from 'effector-react/ssr'
import { Domain } from 'effector'
import { Scope, fork, serialize } from 'effector/fork'
import { app } from '../models/app'
import { GlobalStyles, theme } from './global-styles'

const isBrowser = () => typeof window !== 'undefined'

let currentScope: Scope
let scope: Scope

const serializeDiff = (app: Domain, scope: Scope) => {
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

export default function App({ Component, pageProps }: AppProps) {
  if (isBrowser()) {
    if (currentScope) {
      scope = fork(app, {
        values: {
          ...pageProps.store,
          ...serializeDiff(app, currentScope),
        },
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
      <Normalize />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </EffectorProvider>
  )
}
