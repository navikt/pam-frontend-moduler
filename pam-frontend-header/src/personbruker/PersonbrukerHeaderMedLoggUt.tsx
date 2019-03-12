import * as React from 'react';
import './PersonbrukerHeaderMeny.less';
import { Knapp } from 'nav-frontend-knapper';

interface PersonbrukerHeaderMedLoggUtProps {
    onLoggUt: () => void;
}

export const PersonbrukerHeaderMedLoggUt = ({ onLoggUt }: PersonbrukerHeaderMedLoggUtProps) => (
    <div className="PersonbrukerHeaderMeny">
        <div className="topp">
            <div className="logo">
                <a href="/">Arbeidsplassen</a>
            </div>

            <div>
                <Knapp onClick={onLoggUt} id="logg-ut" className="knapp knapp--mini">
                    Logg ut
                </Knapp>
            </div>
        </div>
    </div>
);
