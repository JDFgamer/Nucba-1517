import React, { useState, useEffect } from "react";

function App() {
  const [response, setResponse] = useState();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/api')
      .then(res => res.json(),)
      .then(response => {
        setResponse(response)
        setLoading(false)
        setErr(null)
      })
      .catch(() => {
        setResponse(null)
        setErr(err)
      })

  }, [input])

  return (
    <div >
      { !loading ?
        <><h1>{response.header.title}</h1><section>
          {response.body.user && response.body.user.map((e, i) => {
            return (
              <div key={i}>
                {e.name}
                <h1>{e.email}</h1>
              </div>
            );
          })}
        </section></>
               : null }
    </div>
  );
}

export default App;
