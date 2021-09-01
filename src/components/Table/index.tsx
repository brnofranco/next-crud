import Client from '../../core/Client';

import { TrashIcon, EditIcon } from '../Icons';

import styles from './styles.module.sass';


interface TableProps {
    clients: Client[];
    selectedClient?: (client: Client) => void;
    deletedClient?: (client: Client) => void;
}

export default function Table(props: TableProps) {
    
    const showActions = props.deletedClient || props.selectedClient;

    function renderHeader() {
        return(
            <tr>
                <th className={styles.text}>Código</th>
                <th className={styles.text}>Nome</th>
                <th className={styles.text}>Idade</th>
                {showActions ? (
                    <th className={styles.text}>Ações</th>
                ) : false}
            </tr>
        );
    }

    function renderClients() {
        return props.clients?.map((client, i) => {
            return (
                <tr key={client.id} className={i % 2 === 0 ? styles.bgEven : styles.bgOdd}>
                    <td className={styles.text}>{client.id}</td>
                    <td className={styles.text}>{client.name}</td>
                    <td className={styles.text}>{client.age}</td>
                    {showActions ? renderActions(client) : false}
                </tr>
            );
        })
    }

    function renderActions(client: Client) {
        return(
            <td className={styles.flex}>
                {props.selectedClient ? (
                    <button onClick={() => props.selectedClient?.(client)} className={styles.button}>{EditIcon()}</button>
                ) : false}

                {props.deletedClient ? (
                    <button onClick={() => props.deletedClient?.(client)} className={styles.button}>{TrashIcon()}</button>
                ) : false}
            </td>
        );
    }
    
    return(
        <table className={styles.tableContainer}>
            <thead className={styles.header}>
                {renderHeader()}
            </thead>
            <tbody className={styles.body}>
                {renderClients()}
            </tbody>
        </table>
    )
}