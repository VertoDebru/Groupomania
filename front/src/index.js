import { render } from 'react-dom';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import './styles/index.css';
// Import components
import Header from "./components/Header";
import App from './components/App';
import Register from './routes/Register';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/Register" element={<Register />} />
    <Route path="*" element={
      <div>
        <Header />
        <main>
          <section className='error'>
            <h2>ERROR 404</h2>
            <p>There's nothing here!</p>
            <a href="./../">Go to Main page</a>
          </section>
        </main>
      </div>
      }
    />
  </Routes>
  </BrowserRouter>,
  rootElement
);
