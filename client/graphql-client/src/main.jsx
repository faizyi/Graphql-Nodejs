import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"

const clinet = new ApolloClient({
  uri: "http://localhost:4003/graphql",
  cache: new InMemoryCache(),
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={clinet}>
    <App />
    </ApolloProvider>
  </StrictMode>,
)
