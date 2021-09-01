import Titulo from '../Title';

import styles from './styles.module.sass';

interface LayoutProps {
    title: string;
    children: any
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={styles.screenContainer}>
            <div className={styles.cardContainer}>
                <Titulo> {props.title} </Titulo>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}