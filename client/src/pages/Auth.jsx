import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

function Auth() {
  const [formStatus,setFormStatus] = useState("register");

  const toggleFormState = ()=>{
    console.log("clicked");
    if(formStatus==="register"){
      setFormStatus("login");
    }
    else if(formStatus==="login"){
      setFormStatus("register");
    }
  }

  return (
    <>
      {formStatus === "register" ? <RegistrationForm toggleFormState={toggleFormState} /> : <LoginForm  toggleFormState={toggleFormState}/>}
    </>
  );
}

export default Auth;
