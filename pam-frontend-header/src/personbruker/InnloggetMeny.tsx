import * as React from 'react';
import { Knapp } from "nav-frontend-knapper";
import {  NavLink } from "react-router-dom";
import { Normaltekst } from "nav-frontend-typografi";
import NavFrontendChevron from "nav-frontend-chevron";
import { ValiderNavigasjonProps } from './PersonbrukerHeaderMeny';

export enum PersonbrukerApplikasjon {
    STILLINGSSOK = 'STILLINGSSOK',
    CV = 'CV',
    JOBBPROFIL = 'JOBBPROFIL'
}

export interface PersonbrukerTab {
    tittel: string;
    href: string;
    app: PersonbrukerApplikasjon;
}

const allTabs : Array<PersonbrukerTab> = [
    {
        tittel: 'Min side',
        href: '/cv',
        app: PersonbrukerApplikasjon.CV
    },
    // TODO: Kommentere inn igjen url'er til stillingssøket når det har blitt flyttet til arbeidsplassen
    //
    // {
    //     tittel: 'Stillingssøk',
    //     href: '/',
    //     app: PersonbrukerApplikasjon.STILLINGSSOK
    // },
    // {
    //     tittel: 'Favoritter',
    //     href: '/pam-stillingsok/favoritter',
    //     app: PersonbrukerApplikasjon.STILLINGSSOK
    // },
    // {
    //     tittel: 'Lagrede søk',
    //     href: '/pam-stillingsok/lagrede-sok',
    //     app: PersonbrukerApplikasjon.STILLINGSSOK
    // },
    {
        tittel: 'CV',
        href: '/cv/cv',
        app: PersonbrukerApplikasjon.CV
    },
    {
        tittel: 'Jobbprofil',
        href: '/jobbprofil',
        app: PersonbrukerApplikasjon.JOBBPROFIL
    }

];

// TODO: Fjerne stillingssokTabs når stillingsøket er flyttet til arbeidsplassen
const stillingssokTabs : Array<PersonbrukerTab> = [
    {
        tittel: 'Stillingssøk',
        href: '/',
        app: PersonbrukerApplikasjon.STILLINGSSOK
    },
    {
        tittel: 'Favoritter',
        href: '/pam-stillingsok/favoritter',
        app: PersonbrukerApplikasjon.STILLINGSSOK
    },
    {
        tittel: 'Lagrede søk',
        href: '/pam-stillingsok/lagrede-sok',
        app: PersonbrukerApplikasjon.STILLINGSSOK
    }
];

interface InnloggetToppProps {
    onLoggUt: () => void;
    validerNavigasjon?: ValiderNavigasjonProps;
    personbruker: { navn: string };
    applikasjon: PersonbrukerApplikasjon;
    // TODO: Denne trenger ikke lengre når stillingssøket er flyttet til arbeidsplassen
    visAlleMenyPunkter: boolean;
}

interface StateProps {
    showMobileMenu: boolean;
}

const stillingssokTabActive = (match : any, location : any) => {
    if (!match) {
        return false;
    }
    return location.pathname === "/" || location.pathname.match(/\/pam-stillingsok\/stilling*/);
};

export class InnloggetMeny extends React.Component<InnloggetToppProps, StateProps> {
    constructor(props : any) {
        super(props);
        this.state = {
            showMobileMenu: false
        }
    }

    onToggleMenu = () => {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu
        });
    };

    hideMenu = () => {
        this.setState({
            showMobileMenu: false
        });
    };

    onNavigationClick = (url: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (this.props.validerNavigasjon && !this.props.validerNavigasjon.valider()) {
            e.preventDefault();
            this.props.validerNavigasjon.callback(url);
        }
    }

    onNavigationMobileClick = (url: string) => (e: any) => {
        if (this.props.validerNavigasjon && !this.props.validerNavigasjon.valider()) {
            e.preventDefault();
            this.props.validerNavigasjon.callback(url);
        }
        this.hideMenu();
    }

    render() {
        const { personbruker, applikasjon, onLoggUt, visAlleMenyPunkter } = this.props;
        const { showMobileMenu } = this.state;
        const tabs = visAlleMenyPunkter ? allTabs : stillingssokTabs;
        return (
            <div className="Innloggetmeny">
                <div className="topp">
                    <div className="logo">
                        Arbeidsplassen
                    </div>
                    <div className="innlogging">
                        <div>
                            {personbruker && personbruker.navn && (
                                <div>
                                    {applikasjon === PersonbrukerApplikasjon.STILLINGSSOK ? (
                                        <NavLink
                                            to="/pam-stillingsok/innstillinger"
                                            onClick={this.onNavigationClick("/pam-stillingsok/innstillinger")}
                                            className="meny--navn lenke typo-normal"
                                            activeClassName="meny--navn-active"
                                        >
                                            <div className="meny--navn-inner" tabIndex={-1}>
                                                <span className="meny--navn__text">{personbruker.navn}</span>
                                                <span className="meny--tannhjul"/>
                                            </div>
                                        </NavLink>
                                    ) : (
                                        <a
                                            href="/pam-stillingsok/innstillinger"
                                            onClick={this.onNavigationClick("/pam-stillingsok/innstillinger")}
                                            className="meny--navn lenke typo-normal"
                                        >
                                            <div className="meny--navn-inner" tabIndex={-1}>
                                                <span className="meny--navn__text">{personbruker.navn}</span>
                                                <span className="meny--tannhjul"/>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <Knapp onClick={onLoggUt} id="logg-ut" className="knapp knapp--mini">
                                Logg ut
                            </Knapp>
                        </div>
                    </div>
                    <div className="mobilinnlogging">
                        {showMobileMenu ? (
                            <div role="button" onClick={this.onToggleMenu} id="logg-ut" className="mobilmeny--toggle">
                                <span className="mobilmeny--toggle-text">Lukk</span>
                                <div className="mobilmeny--lukk" />
                            </div>
                            ) : (
                            <div role="button" onClick={this.onToggleMenu} id="logg-ut" className="mobilmeny--toggle">
                                <span className="mobilmeny--toggle-text">Meny</span>
                                <div className="mobilmeny--apne" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="meny">
                    {tabs.map((tab) => (
                        applikasjon === tab.app ? (
                            tab.href === '/' ? (
                                <div className="meny--lenke-wrapper" key={tab.href}>
                                    <NavLink
                                        to={tab.href}
                                        onClick={this.onNavigationClick(tab.href)}
                                        isActive={stillingssokTabActive}
                                        activeClassName="meny--lenke-active"
                                        className="meny--lenke lenke"
                                    >
                                        <span className="meny--lenke-inner" tabIndex={-1}>{tab.tittel}<NavFrontendChevron className="meny--chevron" /></span>
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="meny--lenke-wrapper" key={tab.href}>
                                    <NavLink
                                        to={tab.href}
                                        onClick={this.onNavigationClick(tab.href)}
                                        exact={tab.href === '/cv'}
                                        activeClassName="meny--lenke-active"
                                        className="meny--lenke lenke"
                                    >
                                        <span className="meny--lenke-inner" tabIndex={-1}>{tab.tittel}<NavFrontendChevron className="meny--chevron" /></span>
                                    </NavLink>
                                </div>
                            )
                        ) : (
                            <div className="meny--lenke-wrapper" key={tab.href}>
                                <a
                                    href={tab.href}
                                    onClick={this.onNavigationClick(tab.href)}
                                    className="meny--lenke lenke"
                                >
                                    <span className="meny--lenke-inner" tabIndex={-1}>{tab.tittel}<NavFrontendChevron className="meny--chevron" /></span>
                                </a>
                            </div>
                        )
                    ))}
                </div>
                {showMobileMenu && (
                    <div className="mobilmeny">
                        <div className="mobilmeny--separator" />
                        {tabs.map((tab) => (
                            applikasjon === tab.app ? (
                                tab.href === '/' ? (
                                    <div className="mobilmeny--lenke-wrapper" key={tab.href}>
                                        <NavLink
                                            onClick={this.onNavigationMobileClick(tab.href)}
                                            isActive={stillingssokTabActive}
                                            to={tab.href}
                                            activeClassName="mobilmeny--lenke-active"
                                            className="mobilmeny--lenke"
                                        >
                                            <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                        </NavLink>
                                    </div>
                                ) : (
                                    <div className="mobilmeny--lenke-wrapper" key={tab.href}>
                                        <NavLink
                                            onClick={this.onNavigationMobileClick(tab.href)}
                                            to={tab.href}
                                            exact={tab.href === '/cv'}
                                            activeClassName="mobilmeny--lenke-active"
                                            className="mobilmeny--lenke"
                                        >
                                            <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                        </NavLink>
                                    </div>
                                )
                            ) : (
                                <div className="mobilmeny--lenke-wrapper" key={tab.href}>
                                    <a
                                        onClick={this.onNavigationMobileClick(tab.href)}
                                        href={tab.href}
                                        className="mobilmeny--lenke"
                                    >
                                        <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                    </a>
                                </div>
                            )
                        ))}
                        <div className="mobilmeny--lenke-wrapper">
                            {applikasjon === PersonbrukerApplikasjon.STILLINGSSOK ? (
                                <NavLink
                                    onClick={this.onNavigationMobileClick("/pam-stillingsok/innstillinger")}
                                    to="/pam-stillingsok/innstillinger"
                                    activeClassName="mobilmeny--lenke-active"
                                    className="mobilmeny--lenke"
                                >
                                    <Normaltekst className="mobilmeny--lenke-inner">Innstillinger<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                </NavLink>
                            ) : (
                                <a
                                    onClick={this.onNavigationMobileClick("/pam-stillingsok/innstillinger")}
                                    href="/pam-stillingsok/innstillinger"
                                    className="mobilmeny--lenke"
                                >
                                    <Normaltekst className="mobilmeny--lenke-inner">Innstillinger<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                </a>
                            )}
                        </div>
                        <div className="mobilmeny--loggut-wrapper">
                            <Knapp onClick={onLoggUt} id="logg-ut" className="knapp knapp--mini mobilmeny--loggut">
                                Logg ut
                            </Knapp>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};
