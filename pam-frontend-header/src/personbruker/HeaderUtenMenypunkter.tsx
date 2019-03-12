import * as React from 'react';

interface HeaderUtenMenypunkterProps {
    onLoggInn: () => void;
    erLoggetInn: boolean;
}

export const HeaderUtenMenypunkter = ({ onLoggInn, erLoggetInn } : HeaderUtenMenypunkterProps ) => (
    <div className="HeaderUtenMenypunkter">
        <div className="topp">
            <div className="logo">
                <a className="lenke" href="/">Arbeidsplassen</a>
            </div>
            <button onClick={onLoggInn} id="logg-inn" className="Button Button--mini typo-normal">
                {erLoggetInn ? 'Logg ut' : 'Logg inn'}
            </button>
        </div>
    </div>
);
