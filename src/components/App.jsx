import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";

const App = () => {
  const [formValues, setFormValues] = useState([]);
  return (
    <div className="all__form">
      <Form setFormValues={setFormValues} />
      <main>
        {formValues.map((item) => {
          return <Card item={item} key={item} />;
        })}
      </main>
    </div>
  );
};

export default App;
