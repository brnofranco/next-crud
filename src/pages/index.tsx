import { useState } from 'react';

import Layout from '../components/Layout';
import Table from '../components/Table';
import Form from '../components/Form';
import Client from '../core/Client';

export default function Home() {
  const [visible, setVisible] = useState<'table' | 'form'>('table');
  const [client, setClient] = useState<Client>(Client.void());
  
  const clients = [
    new Client('Ana', 22, '00'),
    new Client('Bruno', 14, '01'),
    new Client('Gorges', 90, '02'),
  ]
  
  function selectedClient(client: Client) {
    setClient(client);
    setVisible('form');
  }

  function deletedClient(client: Client) {
    console.log(client.name);
  }

  function setNewClient(client: Client) {
    setVisible('table');
  }
  
  function createNewClient() {
    setClient(Client.void());
    setVisible('form');
  }

  return (
    <Layout title="Cadastro Simples">
      {visible === 'table' 
      ?( <>
          <button onClick={createNewClient}> Novo Cliente </button>
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
