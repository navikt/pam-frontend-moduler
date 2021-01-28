import * as React from 'react';
import Lenkeknapp from './Lenkeknapp';
import { KnappProps } from './Knapp';
import Chevron from 'nav-frontend-chevron';

interface TilbakeknappProps extends KnappProps {
    onClick?: (event: any) => void;
    redirect?: string;
}

const Tilbakeknapp = ({ onClick, redirect, ...rest }: TilbakeknappProps) => {
    return (
        <a
            className="Tilbakeknapp"
            href={redirect || '#'}
            onClick={onClick}
        >
            <Chevron type="venstre" className="Tilbakeknapp__chevron"/>
            <Lenkeknapp className="Knapp--link" {...rest} />
        </a>
    );
};

export default Tilbakeknapp;
