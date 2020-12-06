import 'assets/styles/app.css'
import 'models/init'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { Provider as EffectorProvider } from 'effector-react/ssr'
import { Domain } from 'effector'
import { fork, Scope, serialize } from 'effector/fork'

import { isBrowser } from 'lib/ssr'
import { app } from 'models/app'
import { GlobalStyles, theme } from 'components/global-styles'

let currentScope: Scope
let scope: Scope

const serializeDiff = (app: Domain, scope: Scope) => {
  const ignore = []
  for (const store of app.history.stores) {
    let needIgnore = true
    try {
      needIgnore = scope.getState(store) === store.defaultState
    } catch (error) {}
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
