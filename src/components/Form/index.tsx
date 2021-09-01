import { useState } from 'react';
import Client from '../../core/Client';
import Input from './Input';

interface FormProps {
    client: Client;
    clientChanged?: (client: Client) => void;
    cancel?: () => void;
}

export default function Form(props: FormProps) {
    const id = props.client?.id;    
    const [name, setName] = useState(props.client?.name ?? '');
    const [age, setAge] = useState(props.client?.age ?? 0);
    
    return(
        <div>
            {id ? (
                <Input text="Código" value={id} readOnly/>
            ): false}
                <Input text="Nome" value={name} onChange={setName} />
                <Input text="Idade" value={age} type="number" onChange={setAge} />
                <button onClick={() => props.clientChanged?.(new Client(name, +age, id))}>Salvar</button>
                <button onClick={props.cancel}>Cancelar</button>
        </div>
    )
}