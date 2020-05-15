import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
const http = "http://localhost:4000/api/values";
function App() {
  const [value, setValue] = useState<Object[]>([]);
  useEffect(() => {
    axios.get(http).then((res) => {
      console.log("res", res);
      // setValue()
    });
    setValue([1, 2]);
  }, []);
  return (
    <>
      <h2>{value}</h2>
      <Button>Click Here</Button>
    </>
  );
}

export default App;
