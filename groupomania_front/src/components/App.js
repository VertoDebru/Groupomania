import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";

const logged = true;

const checkLogin = (() => {
  if(logged)  return <Main />;
  else return <Login />;
});

const checkFooter = (() => {
  if(logged) return <Footer />;
});

function App() {
  return (
    <div>
      <Header />
      {checkLogin()}
      {checkFooter()}
    </div>
  );
}

export default App;
