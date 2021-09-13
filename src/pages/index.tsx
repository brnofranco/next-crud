import useClients from '../hooks/useClients';

import Layout from '../components/Layout';
import Table from '../components/Table';
import Form from '../components/Form';

export default function Home() {
  
  const { tableVisible, showTable, client, clients, selectClient, deletClient, setNewClient, newClient } = useClients();

  return (
    <Layout title="Cadastro Simples">
      {tableVisible 
      ?( <>
          <button onClick={newClient}> Novo Cliente </button>
          <Table 
            clients={clients}
            selectedClient={selectClient}
            deletedClient={deletClient}
          ></Table>
      </>)
      : (
        <Form 
          client={client}
          cancel={() => showTable()}
          clientChanged={setNewClient}
        />
        )}
      
    </Layout>
  )
}
