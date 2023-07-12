import {} from 'react'
import App from './App.jsx'
import AuthContextProvider from './contexts/Auth/index.jsx'
import FilesContextProvider from './contexts/Files/index.jsx'
import { ConfigProvider } from 'antd'
import { ApolloProvider } from '@apollo/client'
import client from './client.js'

const AppProviders = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#80df9a',
        },
      }}
      >
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <FilesContextProvider>
            <App />
          </FilesContextProvider>
        </AuthContextProvider>
      </ApolloProvider>
    </ConfigProvider>
  )
}

export default AppProviders