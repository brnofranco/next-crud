import styles from './styles.module.sass';

export default function Title(props) {
    return(
        <div>
            <h1>{props.children}</h1>
            <hr />
        </div>
    );
}