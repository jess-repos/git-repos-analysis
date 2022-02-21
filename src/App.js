import Content from './components/Content'
import Form from './components/Form'
import DataProvider from './context/DataProvider'

function App() {
  return (
    <>
      <DataProvider>
        <Form />
        <Content />
      </DataProvider>
    </>
  )
}

export default App
