import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function App() {
  const [response, setResponse] = useState();
  const [err, setErr] = useState();
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/inicio')
      .then(res => res.json())
      .then(response => {
        setResponse(response.data);
        setErr(null);
      })
      .catch(() => {
        setResponse(null);
        setErr(err)
      })
  }, [input]);

  return (
    <section className="contain">
      {console.log(response)}
      {response && response.map((pj) => {
        return (
          <div >
        <Card style={{ width: '18rem', margin: '10px 0'}}>
          <Card.Img variant="top" src={pj.image} />
          <Card.Body>
            <Card.Title>{pj.name}</Card.Title>
            <Card.Text>
              Estado: {pj.status}
            </Card.Text>
            <Button variant="primary">Ver mas</Button>
          </Card.Body>
        </Card>
        </div>
        )
      })
      }
    </section>
  );
}

export default App;
