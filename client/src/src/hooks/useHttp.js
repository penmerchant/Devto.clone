import {useCallback, useState} from 'react';

const useHttp = () =>{
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    // const activeHttpReqs = useRef([]);

    
    const sendRequest = useCallback(
        async (url, method='GET' , body= null, headers={}, credentials) =>{
        
        // const httpAbortControl = new AbortController();
        // activeHttpReqs.current.push(httpAbortControl);
        let response = {};
        
        if(method === 'GET'){
            setLoading(true);
        }

        try{ 
            response = await fetch(url,{
                method,
                body,
                headers,
                // signal: httpAbortControl.signal,
                credentials
            });
        } catch(error) {
            setLoading(false);
            setError(true);
            throw new Error('Error');
        }
        // if(!response.ok){
            
        //     throw new Error('Unable to retrieve the data', 500);
        // }

        const responseData = await response.json();
        // activeHttpReqs.current = activeHttpReqs.current.filter(
        //     (reqCtrl) => reqCtrl !== !httpAbortControl
        //   );
        setLoading(false);
        return responseData;
    },[]);

    // useEffect(()=>{
    //     return ()=>{
    //         activeHttpReqs.current.forEach((abortCtrl) => abortCtrl.abort())
    //     };
    // }, []);

    return {sendRequest , isError, isLoading , setError};
};
export default useHttp;