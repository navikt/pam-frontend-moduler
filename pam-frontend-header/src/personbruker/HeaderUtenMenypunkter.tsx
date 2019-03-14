import * as React from 'react';

interface HeaderUtenMenypunkterProps {
    onLoggInn?: () => void;
    onLoggUt?: () => void;
    erLoggetInn: boolean;
}

export const HeaderUtenMenypunkter = ({ onLoggInn, onLoggUt, erLoggetInn } : HeaderUtenMenypunkterProps ) => (
    <div className="HeaderUtenMenypunkter">
        <div className="topp">
            <div className="logo">
                <a className="lenke" href="/">Arbeidsplassen</a>
            </div>
            {erLoggetInn ? (
                <button onClick={onLoggUt} id="logg-inn" className="Header__Button Header__Button--mini typo-normal">
                    Logg ut
                </button>
            ) : (
                <button onClick={onLoggInn} id="logg-inn" className="Header__Button Header__Button--mini typo-normal">
                    Logg inn
                </button>
            )}
        </div>
    </div>
);
