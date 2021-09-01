interface InputProps {
    text: string;
    type?: 'text'| 'number';
    value: any;
    readOnly?: boolean;
    onChange?: (value: any) => void;
}

export default function Input(props: InputProps) {
    return(
        <div>
            <label> {props.text} </label>
            <input 
                type={props.type ?? 'text'} 
                value={props.value} 
                readOnly={props.readOnly} 
                onChange={e => props.onChange?.(e.target.value)}
            />
        </div>
    )
}