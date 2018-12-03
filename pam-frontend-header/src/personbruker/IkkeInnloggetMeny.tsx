import * as React from 'react';
import { Knapp } from "nav-frontend-knapper";

interface IkkeInnloggetToppProps {
    onLoggInn: () => void;
}

export const IkkeInnloggetMeny = ({ onLoggInn } : IkkeInnloggetToppProps ) => (
    <div className="topp">
        <div className="logo">
            Arbeidsplassen
        </div>
        <Knapp onClick={onLoggInn} id="logg-inn" className="knapp knapp--mini">
            Logg inn
        </Knapp>
    </div>
);
