import * as React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import ArbeidsgiverSelect from './ArbeidsgiverSelect';
import { Arbeidsgiver } from './PropTypes';
import './HeaderMeny.less';

export enum ArbeidsgiverTabId {
  VAAR_SIDE = 'VAAR_SIDE',
  KANDIDATSOK = 'KANDIDATSOK',
  KANDIDATLISTER = 'KANDIDATLISTER',
  STILLINGSANNONSER = 'STILLINGSANNONSER'
}

interface Tab {
  id: ArbeidsgiverTabId;
  tittel: string;
  href: string;
}

const tabs : Array<Tab> = [
    {
        id: ArbeidsgiverTabId.VAAR_SIDE,
        tittel: 'Vår side',
        href: '/stillingsregistrering'
    },
  {
        id: ArbeidsgiverTabId.KANDIDATSOK,
        tittel: 'Kandidatsøk',
        href: '/kandidater'
    },
    {
        id: ArbeidsgiverTabId.KANDIDATLISTER,
        tittel: 'Kandidatlister',
        href: '/kandidater/lister'
    },
    {
        id: ArbeidsgiverTabId.STILLINGSANNONSER,
        tittel: 'Stillingsannonser',
        href: '/stillingsregistrering/vilkaar'
    }
];

const tabErIPamKandidatsok = (tabId: ArbeidsgiverTabId) => (
    tabId === ArbeidsgiverTabId.KANDIDATSOK || tabId === ArbeidsgiverTabId.KANDIDATLISTER
);

interface ArbeidsgiverHeaderMenyProps {
  onLoggUt: () => void;
  onArbeidsgiverSelect: (orgNummer?: string) => void;
  arbeidsgivere: Array<Arbeidsgiver>;
  valgtArbeidsgiverId?: string;
  activeTabID: ArbeidsgiverTabId;
}

export const ArbeidsgiverHeaderMeny = ({ onLoggUt, onArbeidsgiverSelect, arbeidsgivere, valgtArbeidsgiverId, activeTabID } : ArbeidsgiverHeaderMenyProps ) => {
    return (
        <div className="HeaderMeny">
            <div className="topp">
                <div className="logo">
                    <a href="/">Arbeidsplassen</a>
                </div>
                <div>
                    {arbeidsgivere.length === 1 ? (
                        <Normaltekst className="topmeny-navn">
                            {arbeidsgivere[0].navn}
                        </Normaltekst>
                    ) :
                        (arbeidsgivere.length > 1 && valgtArbeidsgiverId !== undefined && (
                            <ArbeidsgiverSelect
                                arbeidsgivere={arbeidsgivere}
                                valgtArbeidsgiverId={valgtArbeidsgiverId}
                                onArbeidsgiverSelect={onArbeidsgiverSelect}
                            />
                        ))}
                </div>
                <div>
                    <Knapp onClick={onLoggUt} id="logg-ut" className="knapp knapp--mini knapp--loggut">
                        Logg ut
                    </Knapp>
                </div>
            </div>
            <div className="meny">
                <ul>
                    {tabs.map((tab) => (
                        tabErIPamKandidatsok(tab.id) && tabErIPamKandidatsok(activeTabID)
                            ? <Link to={tab.href} className="meny--lenke" key={tab.id}>
                                <li className={tab.id === activeTabID ? 'active' : 'not-active'}>
                                    {tab.tittel}
                                </li>
                            </Link>
                            : <a href={tab.href} className="meny--lenke" key={tab.id}>
                                <li className={tab.id === activeTabID ? 'active' : 'not-active'}>
                                    {tab.tittel}
                                </li>
                            </a>
                    ))}
                </ul>
            </div>
        </div>
    );
};
