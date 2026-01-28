import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { BrowserRouter, Route, Routes } from 'react-router'
import { StatPage } from './stats/StatPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path="/stats" element={<StatPage />} />
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
