import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { EtikettLiten } from 'nav-frontend-typografi';
import { ValiderNavigasjonProps } from './PersonbrukerHeaderMeny';

export enum PersonbrukerApplikasjon {
    STILLINGSSOK = 'STILLINGSSOK',
    CV = 'CV',
    PORTAL = 'PORTAL'
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
    state = {
        showMobileMenu: false
    }

    componentDidMount() {
        if (this.props.applikasjon === PersonbrukerApplikasjon.CV) {
            localStorage.setItem('innloggetBrukerKontekst', 'personbruker');
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

    onLogoutClick = () => {
        localStorage.removeItem('innloggetBrukerKontekst');
        window.location.href = this.props.loggUtUrl;
    }

    render() {
        const { personbruker, applikasjon } = this.props;
        const { showMobileMenu } = this.state;

        return (
            <div className="PersonbrukerHeaderMeny">
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
                                <button onClick={this.onLogoutClick} id="logg-ut" className="Header__Button Header__Button--mini typo-normal">
                                    Logg ut
                                </button>
                            </div>
                        </div>
                        <div className="Mobilmeny--toggle">
                            {showMobileMenu ? (
                                <div
                                    role="button"
                                    onClick={this.onToggleMenu}
                                    id="Mobilmeny__Button--toggle"
                                    className="Mobilmeny__Button--toggle"
                                    aria-expanded={true}
                                    aria-controls="Mobilmeny"
                                >
                                    <div className="Mobilmeny--lukk-wrapper">
                                        <div className="Mobilmeny--lukk"/>
                                    </div>
                                    <span className="Mobilmeny__Text--toggle">Lukk</span>
                                </div>
                            ) : (
                                <div
                                    role="button"
                                    onClick={this.onToggleMenu}
                                    id="Mobilmeny__Button--toggle"
                                    className="Mobilmeny__Button--toggle"
                                    aria-expanded={false}
                                    aria-controls="Mobilmeny"
                                >
                                    <div className="Mobilmeny--apne"/>
                                    <span className="Mobilmeny__Text--toggle">Meny</span>
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
                                    <div className={tab.href === '/cv' ? 'Meny--lenke-wrapper-CV' : 'Meny--lenke-wrapper'} key={tab.href}>
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
                                <div className={tab.href === '/cv' ? 'Meny--lenke-wrapper-CV' : 'Meny--lenke-wrapper'} key={tab.href}>
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
                        <div className="Mobilmeny" id="Mobilmeny">
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
                                                <EtikettLiten className="Mobilmeny--lenke-inner">
                                                    {tab.tittel}
                                                </EtikettLiten>
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
                                                <EtikettLiten className="Mobilmeny--lenke-inner">
                                                    {tab.tittel}
                                                </EtikettLiten>
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
                                            <EtikettLiten className="Mobilmeny--lenke-inner">
                                                {tab.tittel}
                                            </EtikettLiten>
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
                                        <EtikettLiten className="Mobilmeny--lenke-inner">
                                            Innstillinger
                                        </EtikettLiten>
                                    </NavLink>
                                ) : (
                                    <a
                                        onClick={this.onNavigationMobileClick('/personinnstillinger')}
                                        href="/personinnstillinger"
                                        className="Mobilmeny--lenke"
                                    >
                                        <EtikettLiten className="Mobilmeny--lenke-inner">
                                            Innstillinger
                                        </EtikettLiten>
                                    </a>
                                ))}
                            </div>
                            <div className="Mobilmeny--logout-wrapper">
                                <button onClick={this.onLogoutClick} id="logg-ut" className="Header__Button Header__Button--mini">
                                    Logg ut
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};
