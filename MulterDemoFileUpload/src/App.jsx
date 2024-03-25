import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Let's test multer</h1>
      <form action="http://localhost:3008/profile/defined" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <input type="submit" value="Upload now"/>
      </form>
    </>
  )
}

export default App
