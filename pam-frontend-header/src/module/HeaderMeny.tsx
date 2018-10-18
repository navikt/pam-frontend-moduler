import * as React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import ArbeidsgiverSelect from './ArbeidsgiverSelect';
import { Arbeidsgiver } from './PropTypes';
import './HeaderMeny.less';

export enum TabId {
  VAAR_SIDE = 'VAAR_SIDE',
  KANDIDATSOK = 'KANDIDATSOK',
  KANDIDATLISTER = 'KANDIDATLISTER',
  STILLINGSREGISTRERING = 'STILLINGSREGISTRERING'
}

interface Tab {
  id: TabId;
  tittel: string;
  href: string;
}

const tabs : Array<Tab> = [
    {
        id: TabId.VAAR_SIDE,
        tittel: 'Vår side',
        href: '/stillingsregistrering'
    },
  {
        id: TabId.KANDIDATSOK,
        tittel: 'Kandidatsøk',
        href: '/pam-kandidatsok'
    },
    {
        id: TabId.KANDIDATLISTER,
        tittel: 'Kandidatlister',
        href: '/pam-kandidatsok/lister'
    },
    {
        id: TabId.STILLINGSREGISTRERING,
        tittel: 'Stillingsregistrering',
        href: '/stillingsregistrering/vilkaar'
    }
];

const tabErIPamKandidatsok = (tabId: TabId) => (
    tabId === TabId.KANDIDATSOK || tabId === TabId.KANDIDATLISTER
);

interface HeaderMenyProps {
  onLoggUt: () => void;
  onArbeidsgiverSelect: (orgNummer?: string) => void;
  arbeidsgivere: Array<Arbeidsgiver>;
  valgtArbeidsgiverId?: string;
  activeTabID: TabId;
}

export const HeaderMeny = ({ onLoggUt, onArbeidsgiverSelect, arbeidsgivere, valgtArbeidsgiverId, activeTabID } : HeaderMenyProps ) => {
    const onLoggUtClick = () => {
        sessionStorage.removeItem('orgnr');
        onLoggUt();
    };
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
                    <Knapp onClick={onLoggUtClick} id="logg-ut" className="knapp knapp--mini knapp--loggut">
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
