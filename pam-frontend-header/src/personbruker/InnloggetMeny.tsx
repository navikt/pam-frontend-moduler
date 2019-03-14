import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import { ValiderNavigasjonProps } from './PersonbrukerHeaderMeny';

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

interface InnloggetToppProps {
    loggUtUrl: string;
    validerNavigasjon?: ValiderNavigasjonProps;
    personbruker: { navn: string };
    applikasjon: PersonbrukerApplikasjon;
}

interface StateProps {
    showMobileMenu: boolean;
}

const stillingssokTabActive = (match: any, location: any) => {
    if (!match) {
        return false;
    }
    return location.pathname === '/stillinger' || location.pathname.match(/\/stillinger\/stilling*/);
};

export class InnloggetMeny extends React.Component<InnloggetToppProps, StateProps> {
    constructor(props: any) {
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
        if (this.props.validerNavigasjon && !this.props.validerNavigasjon.redirectTillates()) {
            e.preventDefault();
            this.props.validerNavigasjon.redirectForhindretCallback(url);
        }
    }

    onNavigationMobileClick = (url: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (this.props.validerNavigasjon && !this.props.validerNavigasjon.redirectTillates()) {
            e.preventDefault();
            this.props.validerNavigasjon.redirectForhindretCallback(url);
        }
        this.hideMenu();
    }

    render() {
        const { personbruker, loggUtUrl, applikasjon } = this.props;
        const { showMobileMenu } = this.state;

        return (
            <div className="Innloggetmeny">
                <div className="topp">
                    <div className="logo">
                        <a className="lenke" href="/">Arbeidsplassen</a>
                    </div>
                    <div className="innlogging">
                        <div>
                            {personbruker && personbruker.navn && (
                                <div>
                                    {(applikasjon === PersonbrukerApplikasjon.CV ? (
                                            <NavLink
                                                to='/personinnstillinger'
                                                onClick={this.onNavigationClick('/personinnstillinger')}
                                                className="Meny--navn lenke typo-normal"
                                                activeClassName="Meny--navn-active"
                                            >
                                                <div className="Meny--navn-inner" tabIndex={-1}>
                                                    <span className="Meny--navn__text">{personbruker.navn}</span>
                                                    <span className="Meny--tannhjul"/>
                                                </div>
                                            </NavLink>
                                        ) : (
                                            <a
                                                href="/personinnstillinger"
                                                onClick={this.onNavigationClick('/personinnstillinger')}
                                                className="Meny--navn lenke typo-normal"
                                            >
                                                <div className="Meny--navn-inner" tabIndex={-1}>
                                                    <span className="Meny--navn__text">{personbruker.navn}</span>
                                                    <span className="Meny--tannhjul"/>
                                                </div>
                                            </a>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <a href={loggUtUrl} id="logg-ut" className="Header__Button Header__Button--mini typo-normal">
                                Logg ut
                            </a>
                        </div>
                    </div>
                    <div className="Mobilmeny--toggle">
                        {showMobileMenu ? (
                            <div role="button" onClick={this.onToggleMenu} id="logg-ut" className="Mobilmeny__Button--toggle">
                                <span className="Mobilmeny__Text--toggle">Lukk</span>
                                <div className="Mobilmeny--lukk"/>
                            </div>
                        ) : (
                            <div role="button" onClick={this.onToggleMenu} id="logg-ut" className="Mobilmeny__Button--toggle">
                                <span className="Mobilmeny__Text--toggle">Meny</span>
                                <div className="Mobilmeny--apne"/>
                            </div>
                        )}
                    </div>
                </div>
                <div className="Meny">
                    {tabs.map((tab) => (
                        applikasjon === tab.app ? (
                            tab.href === '/stillinger' ? (
                                <div className="Meny--lenke-wrapper" key={tab.href}>
                                    <NavLink
                                        to={tab.href}
                                        onClick={this.onNavigationClick(tab.href)}
                                        isActive={stillingssokTabActive}
                                        activeClassName="Meny--lenke-active"
                                        className="Meny--lenke lenke"
                                    >
                                        <span className="Meny--lenke-inner" tabIndex={-1}>{tab.tittel}</span>
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="Meny--lenke-wrapper" key={tab.href}>
                                    <NavLink
                                        to={tab.href}
                                        onClick={this.onNavigationClick(tab.href)}
                                        activeClassName="Meny--lenke-active"
                                        className="Meny--lenke lenke"
                                    >
                                        <span className="Meny--lenke-inner" tabIndex={-1}>{tab.tittel}</span>
                                    </NavLink>
                                </div>
                            )
                        ) : (
                            <div className="Meny--lenke-wrapper" key={tab.href}>
                                <a
                                    href={tab.href}
                                    onClick={this.onNavigationClick(tab.href)}
                                    className="Meny--lenke lenke"
                                >
                                    <span className="Meny--lenke-inner" tabIndex={-1}>{tab.tittel}</span>
                                </a>
                            </div>
                        )
                    ))}
                </div>
                {showMobileMenu && (
                    <div className="Mobilmeny">
                        <div className="Mobilmeny--separator"/>
                        {tabs.map((tab) => (
                            applikasjon === tab.app ? (
                                tab.href === '/stillinger' ? (
                                    <div className="Mobilmeny--lenke-wrapper" key={tab.href}>
                                        <NavLink
                                            onClick={this.onNavigationMobileClick(tab.href)}
                                            isActive={stillingssokTabActive}
                                            to={tab.href}
                                            activeClassName="Mobilmeny--lenke-active"
                                            className="Mobilmeny--lenke"
                                        >
                                            <Normaltekst className="Mobilmeny--lenke-inner">
                                                <span>{tab.tittel}</span>
                                                <NavFrontendChevron className="Mobilmeny--chevron"/>
                                            </Normaltekst>
                                        </NavLink>
                                    </div>
                                ) : (
                                    <div className="Mobilmeny--lenke-wrapper" key={tab.href}>
                                        <NavLink
                                            onClick={this.onNavigationMobileClick(tab.href)}
                                            to={tab.href}
                                            activeClassName="Mobilmeny--lenke-active"
                                            className="Mobilmeny--lenke"
                                        >
                                            <Normaltekst className="Mobilmeny--lenke-inner">
                                                <span>{tab.tittel}</span>
                                                <NavFrontendChevron className="Mobilmeny--chevron"/>
                                            </Normaltekst>
                                        </NavLink>
                                    </div>
                                )
                            ) : (
                                <div className="Mobilmeny--lenke-wrapper" key={tab.href}>
                                    <a
                                        onClick={this.onNavigationMobileClick(tab.href)}
                                        href={tab.href}
                                        className="Mobilmeny--lenke"
                                    >
                                        <Normaltekst className="Mobilmeny--lenke-inner">
                                            <span>{tab.tittel}</span>
                                            <NavFrontendChevron className="Mobilmeny--chevron"/>
                                        </Normaltekst>
                                    </a>
                                </div>
                            )
                        ))}
                        <div className="Mobilmeny--lenke-wrapper">
                            {(applikasjon === PersonbrukerApplikasjon.CV ? (
                                <NavLink
                                    to='/personinnstillinger'
                                    onClick={this.onNavigationMobileClick('/personinnstillinger')}
                                    className="Mobilmeny--lenke"
                                    activeClassName="Mobilmeny--lenke-active"
                                >
                                    <Normaltekst className="Mobilmeny--lenke-inner">
                                        <span>Innstillinger</span>
                                        <NavFrontendChevron className="Mobilmeny--chevron"/>
                                    </Normaltekst>
                                </NavLink>
                            ) : (
                                <a
                                    onClick={this.onNavigationMobileClick('/personinnstillinger')}
                                    href="/personinnstillinger"
                                    className="Mobilmeny--lenke"
                                >
                                    <Normaltekst className="Mobilmeny--lenke-inner">
                                        <span>Innstillinger</span>
                                        <NavFrontendChevron className="Mobilmeny--chevron"/>
                                    </Normaltekst>
                                </a>
                            ))}
                        </div>
                        <div className="Mobilmeny--loggut-wrapper">
                            <a href={loggUtUrl} id="logg-ut" className="Header__Button Header__Button--mini Mobilmeny--loggut">
                                Logg ut
                            </a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};
