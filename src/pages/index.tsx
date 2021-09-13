import { useState, useEffect } from 'react';

import Layout from '../components/Layout';
import Table from '../components/Table';
import Form from '../components/Form';
import Client from '../core/Client';
import ClientRepository from '../core/ClientRepository';
import ClientCollection from '../firebase/db/ClientCollection';

export default function Home() {
  
  const repo: ClientRepository = new ClientCollection()
  
  const [visible, setVisible] = useState<'table' | 'form'>('table');
  const [client, setClient] = useState<Client>(Client.void());
  const [clients, setClients] = useState<Client[]>([[]]);
  
  useEffect(getAll, [])
  
  function getAll() {
    repo.getAll().then(clients => {
      setClients(clients);
      setVisible('table');
    });
  }

  
  function selectedClient(client: Client) {
    setClient(client);
    setVisible('form');
  }

  async function deletedClient(client: Client) {
    await repo.delete(client);
    getAll();
  }

  async function setNewClient(client: Client) {
    await repo.save(client);
    getAll();
  }
  
  function newClient() {
    setClient(Client.void());
    setVisible('form');
  }

  return (
    <Layout title="Cadastro Simples">
      {visible === 'table' 
      ?( <>
          <button onClick={newClient}> Novo Cliente </button>
          <Table 
            clients={clients}
            selectedClient={selectedClient}
            deletedClient={deletedClient}
          ></Table>
      </>)
      : (
        <Form 
          client={client}
          cancel={() => setVisible('table')}
          clientChanged={setNewClient}
        />
        )}
      
    </Layout>
  )
}
