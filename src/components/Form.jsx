import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Form = ({ setFormValues }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("Belarus");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [checkedIdentity, setCheckedIdentity] = useState(false);
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [lastNameDirty, setLastNameDirty] = useState(false);
  const [firstNameError, setFirstNameError] = useState(
    "Имя не может быть пустым"
  );
  const [lastNameError, setLastNameError] = useState(
    "Фамилия не может быть пустой"
  );
  const [formValid, setFormValid] = useState(false);
  const [birthDateDirty, setBirthDateDirty] = useState(false);
  const [birthDateError, setBirthDateError] = useState(
    "Дата введена некорректно"
  );

  useEffect(() => {
    if (firstNameError || lastNameError || birthDateError || !agree) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [firstNameError, lastNameError, birthDateError, agree]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "firstName": {
        setFirstNameDirty(true);
        break;
      }
      case "lastName": {
        setLastNameDirty(true);
        break;
      }
      case "birthDate": {
        setBirthDateDirty(true);
        break;
      }
      default:
        break;
    }
  };

  const nameHandler = (e) => {
    setFirstName(e.target.value);
    const re = /^[а-яА-ЯёЁa-zA-Z]+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setFirstNameError("Некорректное имя");
    } else {
      setFirstNameError("");
    }
    if (!e.target.value) {
      setFirstNameError("Имя не может быть пустым");
    }
  };
  const surnameHandler = (e) => {
    setLastName(e.target.value);
    const re = /^[а-яА-ЯёЁa-zA-Z]+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setLastNameError("Некорректное имя");
    } else {
      setLastNameError("");
    }
    if (!e.target.value) {
      setLastNameError("Имя не может быть пустым");
    }
  };
  const birthDateHandler = (e) => {
    setBirthDate(e.target.value);
    if (!e.target.value) {
      setBirthDateError("Дата введена некорректно");
    } else setBirthDateError("");
  };

  useEffect(() => {
    setErrors({});
    if (!agree) {
      setErrors((state) => ({ ...state, agree }));
    }
    if (birthDate === "") {
      setErrors((state) => ({ ...state, birthDate }));
    }
    if (firstName === "") {
      setErrors((state) => ({ ...state, firstName }));
    }
    if (lastName === "") {
      setErrors((state) => ({ ...state, lastName }));
    }
  }, [agree, birthDate, firstName, lastName]);

  const reset = () => {
    setAgree(false);
    setCountry("Belarus");
    setBirthDate("");
    setFirstName("");
    setLastName("");
    setCheckedIdentity(false);
    setFormValid(false);
    setFirstNameDirty(false);
    setLastNameDirty(false);
    setBirthDateDirty(false);
    setFirstNameError("Имя не может быть пустым");
    setLastNameError("Фамилия не может быть пустой");
    setBirthDateError("Дата введена некорректно");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      setFormValues((state) => [
        ...state,
        { firstName, lastName, birthDate, country, agree, checkedIdentity }
      ]);
      reset();
      alert("Information is saved!");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="firstName">
        <p className="text__form">Name:</p>
        {firstNameDirty && firstNameError && (
          <div style={{ color: "red" }}>{firstNameError}</div>
        )}
        <input
          type="text"
          name="firstName"
          value={firstName}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => nameHandler(e)}
        />
      </label>
      <label className="label" htmlFor="lastName">
        <p className="text__form">Surname:</p>
        {lastNameDirty && lastNameError && (
          <div style={{ color: "red" }}>{lastNameError}</div>
        )}
        <input
          type="text"
          name="lastName"
          value={lastName}
          onBlur={(e) => blurHandler(e)}
          onChange={
            ((event) => setLastName(event.target.value),
            (e) => surnameHandler(e))
          }
        />
      </label>
      <label className="label" htmlFor="birthDate">
        <p className="text__form">Birth date:</p>
        {birthDateDirty && birthDateError && (
          <div className="date__error" style={{ color: "red" }}>
            {birthDateError}
          </div>
        )}

        <input
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => birthDateHandler(e)}
          type="date"
          name="birthDate"
          value={birthDate}
        />
      </label>
      <label className="label" htmlFor="country">
        <p className="text__form">Country:</p>
        <select
          className="select__country"
          name="country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}>
          <option>Belarus</option>
          <option>Russia</option>
          <option>Ukraine</option>
        </select>
      </label>
      <label className="check" htmlFor="agree">
        <p className="agree__text">
          I agree with the rules{" "}
          {errors?.agree !== undefined && (
            <span className="agreement">* agreement must be checked</span>
          )}
        </p>
        <input
          type="checkbox"
          className="box__check"
          name="agree"
          checked={agree}
          onChange={() => setAgree((prev) => !prev)}
        />
      </label>

      <label className="check__flex" htmlFor="identity">
        <p className="gender">male</p>
        <input
          checked={checkedIdentity}
          type="checkbox"
          id="identity"
          className="identity"
          onChange={() => {
            setCheckedIdentity(!checkedIdentity);
          }}
        />
        <span className="identity__label" />
        <p className="gender">female</p>
      </label>

      <div className="div">
        <input
          disabled={!formValid}
          type="submit"
          value="Submit"
          className="button__form"
        />
      </div>
    </form>
  );
};

Form.defaultProps = {
  setFormValues: PropTypes.func
};
Form.propTypes = {
  setFormValues: PropTypes.func
};

export default Form;
