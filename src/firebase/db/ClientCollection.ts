import firebase from "../config";
import Client from "../../core/Client";
import ClientRepository from "../../core/ClientRepository";

export default class ClientCollection implements ClientRepository {
    
    #converter = {
        toFirestore(client: Client) {
            return {
                name: client.name,
                age: client.age,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Client {
            const data = snapshot.data(options);
            return new Client(data.name, data.age, snapshot.id);
        }
    }
    
    async save(client: Client): Promise<Client> {
        if(client?.id) {
            await this.collectionClient().doc(client.id).set(client);
            return client; 
        } else {
            const docRef = await this.collectionClient().add(client);
            const doc = await docRef.get();
            return doc.data();
        }
    }

    async delete(client: Client): Promise<void> {
        return this.collectionClient().doc(client.id).delete();
    }

    async getAll(): Promise<Client[]> {
        const query = await this.collectionClient().get();
        return query.docs.map(doc => doc.data()) ?? [];
    }

    private collectionClient() {
        return firebase.firestore().collection('clients').withConverter(this.#converter);
    }
}