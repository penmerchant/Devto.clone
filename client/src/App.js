import { Route, Routes } from "react-router-dom";
import Layout from "./src/components/Layout/Layout";
import NewPost from "./src/pages/NewPost/createPost";
import Home from "./src/pages/home/home";
import Login from "./src/pages/login";
import CreateAccount from "./src/pages/authentication/register";
import SearchPage from "./src/pages/SearchPage/SearchPage";
import PostDetails from "./src/pages/post/postDetails";
import Footer from "./src/components/Footer/Footer";
import About from "./src/pages/about/about";
import Profile from "./src/pages/profile/profile";

function App() {
  return (
    <>
    <Layout>
      <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path='/newPost' element={<NewPost />}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/searchResult/:searchValue' element={<SearchPage />} />
        <Route path='/register' element={<CreateAccount />}/>
        <Route path='/post-details/:postId/' element={ <PostDetails />}/>
        <Route path='/about' element={<About />} />
      </Routes>
    </Layout>
    <Footer />
    </>
  );
}

export default App;
