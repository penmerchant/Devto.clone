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
    const onInputChange = useCallback( (event) =>{
      const {name , value} = event.target;
        let inputObj = {...form[name], value};
        if(inputObj.value.length !== 0){
          setForm({...form, [name]:{...inputObj, valid: true}});
        }
        else if(inputObj.value.length === 0){
          setForm({...form, [name]:{...inputObj, valid: false}});

        }
        setForm({...form, [name]:{...inputObj, touched: true}});
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
        if(!arr[i].valid && arr[i].value.length === 0){
          isValid = false;
          break;
        }
      }
      return isValid;
    },[form]);
    
    return {renderInputs, renderValues, setForm, isFormValid};

};

export default useForm;