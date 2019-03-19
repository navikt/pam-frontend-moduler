import * as React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
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

export class ArbeidsgiverHeaderMeny extends React.Component<ArbeidsgiverHeaderMenyProps> {
    componentDidMount() {
        localStorage.setItem('innloggetBrukerKontekst', 'arbeidsgiver');
    }

    render() {
        const { arbeidsgivere, valgtArbeidsgiverId, onArbeidsgiverSelect, onLoggUt, activeTabID } = this.props;
        return (
            <div className="ArbeidsgiverHeaderMeny__wrapper">
                <div className="ArbeidsgiverHeaderMeny">
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
                            <button onClick={onLoggUt} id="logg-ut" className="Header__Button Header__Button--mini knapp--loggut">
                                Logg ut
                            </button>
                        </div>
                    </div>
                    <div className="meny">
                        <ul>
                            {tabs.map((tab) => (
                                tabErIPamKandidatsok(tab.id) && tabErIPamKandidatsok(activeTabID)
                                    ? <Link to={tab.href} className="meny--lenke" key={tab.id}>
                                        <li className={tab.id === activeTabID ? 'active' : 'not-active'}>
                                            <div>{tab.tittel}</div>
                                        </li>
                                    </Link>
                                    : <a href={tab.href} className="meny--lenke" key={tab.id}>
                                        <li className={tab.id === activeTabID ? 'active' : 'not-active'}>
                                            <div>{tab.tittel}</div>
                                        </li>
                                    </a>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};
