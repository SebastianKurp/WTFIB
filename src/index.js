import React from "react"
import ReactDOM from "react-dom"
import { Helmet } from "react-helmet"
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://wtfib-api.fly.dev"
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Sebastian Kupriel-WIB</title>
    </Helmet>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
