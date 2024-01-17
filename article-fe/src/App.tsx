import { Routes, Route } from 'react-router-dom'
import AllPosts from './pages/AllPosts'
import { EditArticle } from './pages/EditArticle'
import { AddNew } from './pages/AddNew'

function App() {

  return (
    <>
      <Routes>
        <Route path='/:limit/:offset' element={<AllPosts/>}/>
        <Route path='/edit' element={<EditArticle/>}/>
        <Route path='/add' element={<AddNew/>}/>
      </Routes>
    </>
  )
}

export default App
