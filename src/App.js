import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";


function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {

      "title": "Conceitos Basicos React",
      "url": "https://github.com/Rafaell21/Conceitos-Basico-React.git",
      "techs": [React, Node]

    });

    const repository = response.data
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepository(repositories.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>)}
      </ul>
      <ul><button onClick={handleAddRepository}>Adicionar</button></ul>


    </div>
  );
}

export default App;
