import { Route, Routes } from "react-router-dom";
import Layout from "./src/components/Layout/Layout";
import NewPost from "./src/pages/NewPost/createPost";
import Home from "./src/pages/home/home";
import Login from "./src/pages/login";
import CreateAccount from "./src/pages/authentication/register";
import SearchPage from "./src/pages/SearchPage/SearchPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path= '/home' element={<Home/>}/>
        <Route path='/newPost' element={<NewPost />}/>
        <Route to='/profile' element={<div>helo</div>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/searchResult/:searchValue' element={<SearchPage />} />
        <Route path='/register' element={<CreateAccount />}/>
      </Routes>
    </Layout>
  );
}

export default App;
