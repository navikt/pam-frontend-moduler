import * as React from 'react';
import {Knapp} from "nav-frontend-knapper";

interface IkkeInnloggetToppProps {
    onLoggInn: () => void;
}

export const IkkeInnloggetMeny = ({ onLoggInn } : IkkeInnloggetToppProps ) => {
    return (
        <div className="topp">
            <div className="logo">
                <a href="/">Arbeidsplassen</a>
            </div>
            <Knapp onClick={onLoggInn} id="logg-inn" className="knapp knapp--mini">
                Logg inn
            </Knapp>
            <div className="mobilinnlogging">
                <Knapp onClick={onLoggInn} id="logg-inn" className="knapp knapp--mini">
                    Logg inn
                </Knapp>
            </div>
        </div>
    );
};
