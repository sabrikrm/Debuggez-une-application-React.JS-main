import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  // initialisation des valeurs des champs
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    type: "",
    email: "",
    message: "",
  });
  const handleInputChange = useCallback((field, value) => {
    console.log("value",value)
     setInputValue((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);
  const [sending, setSending] = useState(false); 
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      const { firstName, lastName, type, email, message } = inputValue;

    if (!firstName || !lastName || !type || !email || !message) {
      alert("veuillez remplir tous les champs avant d’envoyer le formulaire.");
      return;
    }


      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        onSuccess(); // on success pour message apparition

        setSending(false);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  console.log("imputvalue",inputValue)
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" name="lastName" value={inputValue.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
          <Field placeholder="" label="Prénom" name="firstName" value={inputValue.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} /> 
          
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => handleInputChange("type", value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" 
          name="email" value={inputValue.email} onChange={(e) => handleInputChange("email", e.target.value)}/>
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
            value={inputValue.message}
           onChange={(e) => handleInputChange("message", e.target.value)}

          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
