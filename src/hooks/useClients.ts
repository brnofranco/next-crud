import { useEffect, useState } from "react";
import useScreen from './useScreen';

import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import ClientCollection from "../firebase/db/ClientCollection";

export default function useClients() {
    const repo: ClientRepository = new ClientCollection()

    const { formVisible, tableVisible, showTable, showForm } = useScreen();

    const [client, setClient] = useState<Client>(Client.void());
    const [clients, setClients] = useState<Client[]>([]);
    
    useEffect(getAll, [])
    
    function getAll() {
      repo.getAll().then(clients => {
        setClients(clients);
        showTable();
      });
    }
  
    
    function selectClient(client: Client) {
      setClient(client);
      showForm();
    }
  
    async function deletClient(client: Client) {
      await repo.delete(client);
      getAll();
    }
  
    async function setNewClient(client: Client) {
      await repo.save(client);
      getAll();
    }
    
    function newClient() {
      setClient(Client.void());
      showForm();
    }

    return {
        formVisible, tableVisible, showTable, showForm, client, clients, selectClient, deletClient, setNewClient, newClient
    }
}