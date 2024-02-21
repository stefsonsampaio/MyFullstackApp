import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Headers'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  return (
    <div className="container-app">
      <Header />
      <Main />
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
