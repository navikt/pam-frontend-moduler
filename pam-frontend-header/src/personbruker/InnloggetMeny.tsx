import * as React from 'react';
import { Knapp } from "nav-frontend-knapper";
import {  NavLink } from "react-router-dom";
import { Normaltekst } from "nav-frontend-typografi";
import NavFrontendChevron from "nav-frontend-chevron";

export enum PersonbrukerApplikasjon {
    STILLINGSSOK = 'STILLINGSSOK',
    CV = 'CV'
}

export interface PersonbrukerTab {
    tittel: string;
    href: string;
    app: PersonbrukerApplikasjon
}

const tabs : Array<PersonbrukerTab> = [
    {
        tittel: 'Min side',
        href: '/cv',
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
        href: '/cv/cv',
        app: PersonbrukerApplikasjon.CV
    }
];

interface InnloggetToppProps {
    onLoggUt: () => void;
    personbruker: { navn: string }
    applikasjon: PersonbrukerApplikasjon
}

interface StateProps {
    showMobileMenu: boolean;
}

const stillingssokTabActive = (match : any, location : any) => {
    if (!match) {
        return false;
    }
    return location.pathname === "/stillinger" || location.pathname.match(/\/stillinger\/stilling*/);
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


    render() {
        const { personbruker, onLoggUt, applikasjon } = this.props;
        const { showMobileMenu } = this.state;
        return (
            <div className="Innloggetmeny">
                <div className="topp">
                    <div className="logo">
                        Arbeidsplassen
                    </div>
                    <div className="innlogging">
                        <div>
                            {personbruker && personbruker.navn && (
                                <NavLink to="/stillinger/innstillinger" className="meny--navn lenke typo-normal" activeClassName="meny--navn-active">
                                    <div className="meny--navn-inner" tabIndex={-1}>
                                        <span className="meny--navn__text">{personbruker.navn}</span>
                                        <span className="meny--tannhjul"/>
                                    </div>
                                </NavLink>
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
                            tab.href === '/stillinger' ? (
                                <div className="meny--lenke-wrapper" key={tab.href}>
                                    <NavLink to={tab.href} isActive={stillingssokTabActive} activeClassName="meny--lenke-active" className="meny--lenke lenke">
                                        <span className="meny--lenke-inner" tabIndex={-1}>{tab.tittel}<NavFrontendChevron className="meny--chevron" /></span>
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="meny--lenke-wrapper" key={tab.href}>
                                    <NavLink to={tab.href} exact={tab.href === '/cv'} activeClassName="meny--lenke-active" className="meny--lenke lenke">
                                        <span className="meny--lenke-inner" tabIndex={-1}>{tab.tittel}<NavFrontendChevron className="meny--chevron" /></span>
                                    </NavLink>
                                </div>
                            )
                        ) : (
                            <div className="meny--lenke-wrapper" key={tab.href}>
                                <a href={tab.href} className="meny--lenke lenke">
                                    <span className="meny--lenke-inner" tabIndex={-1}>{tab.tittel}<NavFrontendChevron className="meny--chevron" /></span>
                                </a>
                            </div>
                        )
                    ))}
                    <div className="meny--lenke-wrapper">
                        <NavLink to="/stillinger/innstillinger" activeClassName="meny--lenke-active" className="meny--lenke meny--lenke-innstillinger">
                            <Normaltekst className="meny--lenke-inner">Innstillinger<NavFrontendChevron className="meny--chevron" /></Normaltekst>
                        </NavLink>
                    </div>
                </div>
                {showMobileMenu && (
                    <div className="mobilmeny">
                        <div className="mobilmeny--separator" />
                        {tabs.map((tab) => (
                            applikasjon === tab.app ? (
                                tab.href === '/stillinger' ? (
                                    <div className="mobilmeny--lenke-wrapper" key={tab.href}>
                                        <NavLink onClick={this.hideMenu} isActive={stillingssokTabActive} to={tab.href} activeClassName="mobilmeny--lenke-active" className="mobilmeny--lenke">
                                            <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                        </NavLink>
                                    </div>
                                ) : (
                                    <div className="mobilmeny--lenke-wrapper" key={tab.href}>
                                        <NavLink onClick={this.hideMenu} to={tab.href} exact={tab.href === '/cv'} activeClassName="mobilmeny--lenke-active" className="mobilmeny--lenke">
                                            <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                        </NavLink>
                                    </div>
                                )
                            ) : (
                                <div className="mobilmeny--lenke-wrapper" key={tab.href}>
                                    <a onClick={this.hideMenu} href={tab.href} className="mobilmeny--lenke">
                                        <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                    </a>
                                </div>
                            )
                        ))}
                        <div className="mobilmeny--lenke-wrapper">
                            <NavLink onClick={this.hideMenu} to="/pam-stillingsok/innstillinger" activeClassName="mobilmeny--lenke-active" className="mobilmeny--lenke">
                                <Normaltekst className="mobilmeny--lenke-inner">Innstillinger<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                            </NavLink>
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
