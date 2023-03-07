import { Route, Routes } from "react-router-dom";
import Layout from "./src/components/Layout/Layout";
import NewPost from "./src/pages/NewPost/createPost";
import Home from "./src/pages/home/home";
import Login from "./src/pages/login";
import CreateAccount from "./src/pages/authentication/register";
import SearchPage from "./src/pages/ResultPage/SearchPage";
import PostDetails from "./src/pages/post/postDetails";
import Footer from "./src/components/Footer/Footer";
import About from "./src/pages/about/about";
import Profile from "./src/pages/profile/profile";
import EditPost from "./src/pages/edit/editpost/EditPost";
import EditProfile from "./src/pages/edit/editprofile/EditProfile";
import TagsView from "./src/pages/Tags/Tags";
import DeletePage from "./src/components/DeleteBox/DeletePage";
import EditComment from "./src/pages/edit/editcomment/EditComment";
import ReadingList from "./src/pages/ResultPage/ReadingList";
import TagsResultPage from "./src/pages/ResultPage/TagsResultList";
function App() {
  return (
    <>
    <Layout>
      <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path='/newPost' element={<NewPost />}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/searchResult/:searchValue' element={<SearchPage />} />
        <Route path='/register' element={<CreateAccount />}/>
        <Route path='/post-details/:postId/' element={ <PostDetails />}/>
        <Route path='/about' element={<About />} />
        <Route path='/edit-post/:postId' element={<EditPost />}/>
        <Route path='/edit-profile/:userId' element={<EditProfile />}/>
        <Route path='/tags' element={<TagsView />}/>
        <Route path='/delete-page/:type/:id' element={<DeletePage />}/>
        <Route path='/edit-comment/:commentId' element={<EditComment />} />
        <Route path='/reading-list/:userId' element={<ReadingList />}/>
        <Route path='/tag-result/:tagId' element={<TagsResultPage />}/>
        <Route path='/search-post/:keyword' element={<SearchPage /> } />
      </Routes>
    </Layout>
    <Footer />
    </>
  );
}

export default App;
