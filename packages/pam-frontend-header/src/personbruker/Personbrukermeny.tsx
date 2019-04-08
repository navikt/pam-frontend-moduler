import * as React from 'react';
import './Personbrukermeny.less';
import { NavLink } from 'react-router-dom';
import { ValiderNavigasjonProps } from '../felles/Header';

export enum PersonbrukerApplikasjon {
    STILLINGSSOK = 'STILLINGSSOK',
    CV = 'CV'
}

export interface PersonbrukerTab {
    tittel: string;
    href: string;
    app: PersonbrukerApplikasjon;
}

const tabs: Array<PersonbrukerTab> = [
    {
        tittel: 'Min side',
        href: '/minside',
        app: PersonbrukerApplikasjon.CV
    },
    {
        tittel: 'Stillingssøk',
        href: '/stillinger',
        app: PersonbrukerApplikasjon.STILLINGSSOK
    },
    {
        tittel: 'Favoritter',
        href: '/stillinger/favoritter',
        app: PersonbrukerApplikasjon.STILLINGSSOK
    },
    {
        tittel: 'Lagrede søk',
        href: '/stillinger/lagrede-sok',
        app: PersonbrukerApplikasjon.STILLINGSSOK
    },
    {
        tittel: 'CV',
        href: '/cv',
        app: PersonbrukerApplikasjon.CV
    },
    {
        tittel: 'Jobbprofil',
        href: '/jobbprofil',
        app: PersonbrukerApplikasjon.CV
    }
];

interface PersonbrukermenyProps {
    validerNavigasjon?: ValiderNavigasjonProps;
    applikasjon: PersonbrukerApplikasjon;
    onNavigationClick: (url: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const stillingssokTabActive = (match: any, location: any) => {
    if (!match) {
        return false;
    }
    return location.pathname === '/stillinger' || location.pathname.match(/\/stillinger\/stilling*/);
};

export const InnstillingerLenkeMobil = ({
    applikasjon,
    onNavigationClick
}: any) => (
    <div role="list" className="Personbrukermeny--lenke-wrapper Personbrukermeny__Innstillinger--mobile">
        {applikasjon === PersonbrukerApplikasjon.CV ? (
            <NavLink
                to="/personinnstillinger"
                onClick={onNavigationClick("/personinnstillinger")}
                activeClassName="Personbrukermeny--lenke-active"
                className="Personbrukermeny--lenke"
            >
                <div className="Personbrukermeny--lenke-inner" tabIndex={-1}><span>Innstillinger</span></div>
            </NavLink>
        ) : (
            <a
                href="/personinnstillinger"
                onClick={onNavigationClick("/personinnstillinger")}
                className="Personbrukermeny--lenke"
            >
                <div className="Personbrukermeny--lenke-inner" tabIndex={-1}><span>Innstillinger</span></div>
            </a>
        )}
    </div>
);

export const Personbrukermeny = ({ applikasjon, onNavigationClick }: PersonbrukermenyProps) => (
    <nav className="Personbrukermeny">
        {tabs.map((tab) => (
            applikasjon === tab.app ? (
                tab.href === '/stillinger' ? (
                    <div role="list" className="Personbrukermeny--lenke-wrapper" key={tab.href}>
                        <NavLink
                            to={tab.href}
                            onClick={onNavigationClick(tab.href)}
                            isActive={stillingssokTabActive}
                            activeClassName="Personbrukermeny--lenke-active"
                            className="Personbrukermeny--lenke"
                        >
                            <div className="Personbrukermeny--lenke-inner" tabIndex={-1}><span>{tab.tittel}</span></div>
                        </NavLink>
                    </div>
                ) : (
                    <div role="list" className={tab.href === '/cv' ? 'Personbrukermeny--lenke-wrapper-CV' : 'Personbrukermeny--lenke-wrapper'} key={tab.href}>
                        <NavLink
                            to={tab.href}
                            onClick={onNavigationClick(tab.href)}
                            activeClassName="Personbrukermeny--lenke-active"
                            className="Personbrukermeny--lenke"
                        >
                            <div className="Personbrukermeny--lenke-inner" tabIndex={-1}><span>{tab.tittel}</span></div>
                        </NavLink>
                    </div>
                )
            ) : (
                <div role="list" className={tab.href === '/cv' ? 'Personbrukermeny--lenke-wrapper-CV' : 'Personbrukermeny--lenke-wrapper'} key={tab.href}>
                    <a
                        href={tab.href}
                        onClick={onNavigationClick(tab.href)}
                        className="Personbrukermeny--lenke"
                    >
                        <div className="Personbrukermeny--lenke-inner" tabIndex={-1}><span>{tab.tittel}</span></div>
                    </a>
                </div>
            )
        ))}
        <InnstillingerLenkeMobil applikasjon={applikasjon} onNavigationClick={onNavigationClick} />
    </nav>
);