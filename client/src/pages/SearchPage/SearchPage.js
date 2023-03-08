import { useParams } from "react-router-dom";
const SearchPage = () =>{
    let {searchValue} = useParams();
    // alert(searchValue);
    console.log(searchValue);
    return (
        <>
        </>
    );
}

export default SearchPage;