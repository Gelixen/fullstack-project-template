import styles from './ClientsList.module.css';

import {useEffect, useState} from "react";
import logo from "../logo.svg";

export default function ClientsList() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    (async () => {
      const response = await fetch('/clients');
      const body = await response.json();
      setClients(body);
    })()
  }, [])

  return (
      <div className={styles.app}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <div className="App-intro">
            <h2>Clients</h2>
            {clients.map(client =>
                <div key={client.id}>
                  {client.name} ({client.email})
                </div>
            )}
          </div>
        </header>
      </div>
  );
}