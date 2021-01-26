import * as React from 'react';
import './HeaderMeny.less';

interface OppfolgingHeaderProps {
    innloggetBruker: string;
}

export const OppfolgingHeader = ({ innloggetBruker }: OppfolgingHeaderProps) => (
    <div className="VeilederHeaderMeny">
        <div className="topp">
            <div className="venstre">
                <div className="logo">
                    <i className="logo_icon"/>
                </div>
                <div className="logotekst">
                    Arbeidsrettet oppfølging
                </div>
            </div>
            <div>
                { innloggetBruker }
            </div>
        </div>
    </div>
);
