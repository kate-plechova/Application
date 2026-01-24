// import './App.css'
import type { FC } from 'react'
import { BookPage } from './books/components/BookPage/BookPage'
import { Header } from './user/components/Header/Header'

export const App: FC = () => {

  return (
    <div 
      className='w-full min-h-full m-0 p-0 flex flex-col overflow-hidden'
      data-theme="light"
    >
      <Header />
      <BookPage />
    </div>
  )
}

export default App
