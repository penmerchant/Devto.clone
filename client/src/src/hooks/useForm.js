import { useCallback, useState } from "react";

const useForm = (formObj) =>{
    const [form, setForm] = useState(formObj);
    //render form input components
    const renderInputs = () =>{
        return Object.values(form).map((formInput) =>{
            const {renderInput , label, valid, value} = formInput;
            return renderInput(onInputChange, value , valid, label, onCustomInputChange);
        } );
    };
    //render form values
    const renderValues = () =>{
      let values = {};
      Object.keys(form).forEach((inputObj) => {
        values[inputObj] = form[inputObj].value;
      });
      return values
    };

    //detect any changes on input component
    const onInputChange = useCallback( (e) =>{
        const {name , value} = e.target;
        let inputObj = {...form[name], value};
        if(inputObj.value.length !== 0){
          inputObj = {...inputObj, valid:true, touched: true};
        }
        else if(inputObj.value.length === 0){
          console.log('eh');
          inputObj = {...inputObj, valid:false, touched: false};
        }
        setForm({...form, [name]: inputObj }); 
        console.log({...form});
    }, [form]);


    //detect any changes for custom components 
    const onCustomInputChange = useCallback(
      (type, value, InputIsValid) => {
        setForm({
          ...form,
          [type]: { ...form[type], value, valid: InputIsValid },
        });
      },
      [form]
    );
    //validating input
    //validating form
    const isFormValid = useCallback(() =>{
      let isValid = true;
      const arr = Object.values(form);
      for(let i=0;i<arr.length;i++){
        if(!arr[i].valid){
          isValid = false;
          break;
        }
      }
      return isValid;
    },[form]);
    
    return {renderInputs, renderValues, setForm, isFormValid};

};

export default useForm;