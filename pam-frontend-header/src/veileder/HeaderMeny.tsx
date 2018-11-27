import * as React from 'react';
import { Link } from 'react-router-dom';
import './HeaderMeny.less';

export enum VeilederTabId {
    STILLINGSSOK = 'STILLINGSSOK',
    MINE_STILLINGER = 'MINE_STILLINGER',
    KANDIDATLISTER = 'KANDIDATLISTER',
    KANDIDATSOK = 'KANDIDATSOK'
}

interface Tab {
    id: VeilederTabId;
    alternativId?: VeilederTabId.KANDIDATLISTER,
    tittel: string;
    href: string;
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
    tab.id === VeilederTabId.KANDIDATSOK
    && (activeTabId === VeilederTabId.KANDIDATSOK || activeTabId === VeilederTabId.KANDIDATLISTER)
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
                        <a href="/">Rekrutteringsbistand</a>
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
