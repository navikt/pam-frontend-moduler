import * as React from 'react';
import { Link } from 'react-router-dom';
import './Arbeidsgivermeny.less';

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
  activeTabID: ArbeidsgiverTabId;
}

export const Arbeidsgivermeny = ({ activeTabID }: ArbeidsgiverHeaderMenyProps) =>  (
    <nav className="Arbeidsgivermeny">
        <ul>
            {tabs.map((tab) => (
                tabErIPamKandidatsok(tab.id) && tabErIPamKandidatsok(activeTabID)
                    ? <Link to={tab.href} className="Arbeidsgivermeny--lenke" key={tab.id}>
                        <li className={tab.id === activeTabID ? 'active' : 'not-active'}>
                            <div>{tab.tittel}</div>
                        </li>
                    </Link>
                    : <a href={tab.href} className="Arbeidsgivermeny--lenke" key={tab.id}>
                        <li className={tab.id === activeTabID ? 'active' : 'not-active'}>
                            <div>{tab.tittel}</div>
                        </li>
                    </a>
            ))}
        </ul>
    </nav>
);