import { Route, Routes } from "react-router-dom";
import Layout from "./src/components/Layout/Layout";
import NewPost from "./src/pages/NewPost/createPost";
import Home from "./src/pages/home/home";
import Login from "./src/pages/login";
import CreateAccount from "./src/pages/authentication/register";
import SearchPage from "./src/pages/SearchPage/SearchPage";
import PostDetails from "./src/pages/post/postDetails";

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
        <Route path='/post-details/:title/:postId/' element={ <PostDetails />}/>
      </Routes>
    </Layout>
  );
}

export default App;
