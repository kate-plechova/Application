// import './App.css'
import type { FC } from 'react'
import { BookPage } from './books/components/BookPage/BookPage'
// import { Header } from './user/components/Header/Header'
import { Route, Routes } from 'react-router'
import { StatPage } from './stats/StatPage'
import { MainLayout } from './common/MainLayout'
import { Bookmarks } from './user/components/Bookmarks'

export const App: FC = () => {

  return (
    <Routes>
      {/* <Route path='/' element={<App />} />
      <Route path="/stats" element={<StatPage />} /> */}

      <Route path="/" element={<MainLayout />}>
        {/* <Route index element={<div>DUDE</div>} /> */}
        <Route index element={<BookPage />} />
        <Route path="stats" element={<StatPage />} />
        <Route path="bookmarks" element={<Bookmarks />} />
      </Route>
    </Routes>
    // <div 
    //   className='w-full min-h-full m-0 p-0 flex flex-col overflow-hidden'
    //   data-theme="light"
    // >
    //   <Header />
    //   <BookPage />
    // </div>
  )
}

export default App
