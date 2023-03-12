import { useState } from "react";
import PageContext from "../context/DataContext";

const PagePersistent = ({children}) => {
    const [page, setPage] = useState({id: ''});

    const getPageData = () => {
        const data = JSON.parse(sessionStorage.getItem('page'));
        return data;
    };

    const setPageData = (id) => {
        setPage({...page, id: id})
        sessionStorage.setItem('page', JSON.stringify(id));
    };

    return (
    <PageContext.Provider value={{page,setPageData, getPageData}}>
        {children}
    </PageContext.Provider>)
};

export default PagePersistent;