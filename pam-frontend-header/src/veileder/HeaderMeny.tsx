import * as React from 'react';
import { Link } from 'react-router-dom';
import './HeaderMeny.less';

export enum VeilederTabId {
    STILLINGSSOK = 'STILLINGSSOK',
    MINE_STILLINGER = 'MINE_STILLINGER',
    KANDIDATLISTER = 'KANDIDATLISTER',
    KANDIDATSOK = 'KANDIDATSOK',
    REKRUTTERINGSBISTAND_INGEN_TAB = 'REKRUTTERINGSBISTAND_INGEN_TAB'
}

interface Tab {
    id: VeilederTabId;
    alternativId?: VeilederTabId.KANDIDATLISTER,
    tittel: string;
    href: string;
}

enum App {
    REKRUTTERINGSBISTAND = 'REKRUTTERINGSBISTAND',
    KANDIDATSOK = 'KANDIDATSOK',
    UKJENT = 'UKJENT'
}

function getApp(tabId : VeilederTabId) : App {
    if (tabId === VeilederTabId.MINE_STILLINGER || tabId === VeilederTabId.STILLINGSSOK || tabId === VeilederTabId.REKRUTTERINGSBISTAND_INGEN_TAB) {
        return App.REKRUTTERINGSBISTAND;
    } else if (tabId === VeilederTabId.KANDIDATLISTER || tabId === VeilederTabId.KANDIDATSOK) {
        return App.KANDIDATSOK
    }
    return App.UKJENT;
}

const tabs: Array<Tab> = [
    {
        id: VeilederTabId.STILLINGSSOK,
        tittel: 'Søk etter stilling',
        href: '/stillinger'
    },
    {
        id: VeilederTabId.MINE_STILLINGER,
        alternativId: VeilederTabId.KANDIDATLISTER,
        tittel: 'Mine stillinger',
        href: '/minestillinger'
    },
    {
        id: VeilederTabId.KANDIDATSOK,
        tittel: 'Kandidatsøk',
        href: '/kandidater'
    }
];

const internLenkeSkalBrukes = (tab: Tab, activeTabId: VeilederTabId) => (
    getApp(tab.id) === getApp(activeTabId)
);

const tabErAktiv = (tab: Tab, activeTabId: VeilederTabId) => (
    tab.id === activeTabId
    || (tab.alternativId && tab.alternativId === activeTabId)
);

interface VeilederHeaderMenyProps {
    activeTabID: VeilederTabId;
    innloggetBruker: string;
}

export const VeilederHeaderMeny = ({ activeTabID, innloggetBruker }: VeilederHeaderMenyProps) => {
    return (
        <div className="VeilederHeaderMeny">
            <div className="topp">
                <div className="venstre">
                    <div className="logo">
                        <i className="logo_icon"/>
                    </div>
                    <div className="logotekst">
                        {getApp(activeTabID) === App.REKRUTTERINGSBISTAND
                            ? <Link to="/">Rekrutteringsbistand</Link>
                            : <a href="/">Rekrutteringsbistand</a>
                        }
                    </div>
                </div>
                <div>
                    {innloggetBruker}
                </div>
            </div>
            <div className="meny">
                <ul>
                    {tabs.map((tab) => (
                        internLenkeSkalBrukes(tab, activeTabID)
                            ? <Link to={tab.href}  key={tab.id}>
                                <li className={tabErAktiv(tab, activeTabID) ? 'active' : 'not-active'}>
                                    {tab.tittel}
                                </li>
                            </Link>
                            : <a href={tab.href} key={tab.id}>
                                <li className={tabErAktiv(tab, activeTabID) ? 'active' : 'not-active'}>
                                    {tab.tittel}
                                </li>
                            </a>
                    ))}
                </ul>
            </div>
        </div>
    );
};
