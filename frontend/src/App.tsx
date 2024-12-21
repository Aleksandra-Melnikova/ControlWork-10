import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import Layout from "./components/Layout/Layout.tsx";
import AddNew from './containers/AddNew/AddNew.tsx';

function App() {
  return <>
    <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddNew/>} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  </Layout></>;
}

export default App;
