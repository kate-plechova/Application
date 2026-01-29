import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { BrowserRouter, Route, Routes } from 'react-router'
import { StatPage } from './stats/StatPage.tsx'
import { MainLayout } from './common/MainLayout.tsx'
import { BookPage } from './books/components/BookPage/BookPage.tsx'
import { Bookmarks } from './user/components/Bookmarks.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path="/stats" element={<StatPage />} />

          <Route path="layout" element={<MainLayout />}>
            {/* <Route index element={<div>DUDE</div>} /> */}
            <Route index element={<BookPage />} />
            <Route path="stats" element={<StatPage />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
