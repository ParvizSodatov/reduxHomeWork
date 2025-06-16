import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import AsynchRedux from './AsynchRedux.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Layout/>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/CreateAsynchThunk' element={<AsynchRedux/>}></Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
