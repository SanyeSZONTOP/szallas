
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';

import axios from 'axios';
import {AppBar, Button, Card, Container, Switch, TextField, Toolbar, Typography} from "@mui/material";

const API_URL = 'https://nodejs.sulla.hu/data';

const TraditionalPage = () => {
  const [szallasok, setSzallasok] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/get-all`)
        .then(response => setSzallasok(response.data))
        .catch(error => console.error(error));
  }, []);

  return (
      <Container>
        <Typography variant="h4" style={{ marginTop: '20px' }}>Hagyományos Felület</Typography>
        {szallasok.map(szallas => (
            <Card key={szallas.id} style={{ margin: '10px', padding: '10px' }}>
              <Typography variant="h6">{szallas.name}</Typography>
              <Button component={Link} to={`/get/${szallas.id}`} color="primary">Részletek</Button>
            </Card>
        ))}
      </Container>
  );
};

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      console.log('Bejelentkezés sikeres');
    } else {
      console.log('Sikertelen bejelentkezés');
    }
  };

  return (
      <Container>
        <Typography variant="h4" style={{ marginTop: '20px' }}>Admin Felület</Typography>
        <TextField
            label="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginTop: '10px' }}
        />
        <TextField
            type="password"
            label="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '10px' }}>
          Bejelentkezés
        </Button>
      </Container>
  );
};

const App = () => {
  return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Szállások Kezelése</Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/" exact component={TraditionalPage} />
          <Route path="/admin" component={AdminPage} />
        </Switch>

      </Router>
  );
};

export default App;
