import * as React from 'react';
import Popover from './popover/Popover';
import './Header.less';
import { NavLink } from 'react-router-dom';
import { PersonbrukerApplikasjon, Personbrukermeny, InnstillingerLenkeMobil } from '../personbruker/Personbrukermeny';
import { Arbeidsgivermeny, ArbeidsgiverTabId } from '../arbeidsgiver/Arbeidsgivermeny';

export enum AuthStatus {
    IS_AUTHENTICATED = 'IS_AUTHENTICATED',
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    UNKNOWN = 'UNKNOWN'
}

export interface ValiderNavigasjonProps {
  redirectTillates: () => boolean;
  redirectForhindretCallback: (url: string) => void;
}

interface HeaderProps {
    onLoginClick: (role?: string) => void;
    onLogoutClick: () => void;
    useMenu: 'arbeidsgiver' | 'personbruker' | 'none';
    authenticationStatus: AuthStatus;
    applikasjon?: PersonbrukerApplikasjon | ArbeidsgiverTabId;
    visInnstillinger?: boolean;
    arbeidsgiverSelect?: any;
    validerNavigasjon?: ValiderNavigasjonProps;
    role?: 'arbeidsgiver' | 'personbruker';
    showName?: boolean;
}

interface HeaderStateProps {
    showPopover: boolean;
    showMobileMenu: boolean;
    underOppfolging?: boolean;
    name?: string;
}

interface AuthButtonProps {
    label: String
    onClick: () => void;
}

const AuthButton = ({ label, onClick } : AuthButtonProps) => (
    <button onClick={onClick} className="Header__Button Header__Button--mini">
        {label}
    </button>
);

const AktivitetsplanLenkeMobil =({ onNavigationClick }: any) => (
    <a
        href="https://aktivitetsplan.nav.no"
        className="Header__AktivitetsplanLenke"
        onClick={onNavigationClick('https://aktivitetsplan.nav.no')}
    >
        <div className="Header__AktivitetsplanLenke-inner">
            <span className="Header__AktivitetsplanLenke__text">Aktivitetsplan</span>
            <span className="Header__Lenkeikon"/>
        </div>
    </a>
);

export class Header extends React.Component<HeaderProps, HeaderStateProps> {
    state = {
        showPopover: false,
        showMobileMenu: false,
        underOppfolging: undefined,
        name: undefined
    };

    componentDidMount() {
        const { role, showName, useMenu } = this.props;
        const { name, underOppfolging } = this.state;

        if (role) {
            localStorage.setItem('innloggetBrukerKontekst', role);
        }

        if ((showName && name === undefined) || (useMenu === 'personbruker' && underOppfolging === undefined)) {
            const { NODE_ENV } = process.env;
            if (NODE_ENV === 'development') {
                this.setState({
                    underOppfolging: useMenu === 'personbruker',
                    name: showName ? "Navn Navnesen" : undefined
                })
            } else {
                fetch('/cv/api/rest/person/headerinfo', {
                    method: 'GET',
                    credentials: 'include'
                })
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        underOppfolging: useMenu === 'personbruker' ? result.underOppfolging : false,
                        name: showName ? `${result.fornavn} ${result.etternavn}` : undefined
                    });
                }).catch((e) => {
                    this.setState({
                        underOppfolging: false,
                        name: undefined
                    });
                    throw e;
                });
            }
        }
    }

    componentDidUpdate(prevProps: HeaderProps, prevState: HeaderStateProps) {
        if (prevProps.arbeidsgiverSelect === this.props.arbeidsgiverSelect && prevState.showMobileMenu) {
            this.setState({
                showMobileMenu: false
            });
        }
    }

    onPopoverClose = () => {
        this.setState({
            showPopover: false
        });
    }

    onPopoverOpen = () => {
        this.setState({
            showPopover: true
        });
    }

    onLoginClick = (role: string) => () => {
        localStorage.setItem('innloggetBrukerKontekst', role);
        this.props.onLoginClick(role);
    }

    onLogoutClick = () => {
        localStorage.removeItem('innloggetBrukerKontekst');
        this.props.onLogoutClick();
    }

    onToggleMenu = () => {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu
        });
    };

    onNavigationClick = (url: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (this.props.validerNavigasjon && !this.props.validerNavigasjon.redirectTillates()) {
            e.preventDefault();
            this.props.validerNavigasjon.redirectForhindretCallback(url);
        }
    }

    render() {
        const {
            authenticationStatus,
            onLogoutClick,
            applikasjon,
            useMenu,
            validerNavigasjon,
            arbeidsgiverSelect,
            visInnstillinger
        } = this.props;
        const {
            showPopover,
            showMobileMenu,
            underOppfolging,
            name
        } = this.state;

        return(
            <div className={`Header__wrapper${authenticationStatus === AuthStatus.IS_AUTHENTICATED ? ' Header__wrapper__border' : ''}`}>
                <div className="Header">
                    <div className="Header__topp">
                        <div className="Header__logo">
                            <a href="/" aria-label="Logo Arbeidsplassen">
                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 40"><path fill="#40c1ac" d="M15.9 0L0 40h174.1L190 0z"/><path fill="#062040" d="M24.4 15.2c1.7 0 2.8.8 3.5 1.9v-1.4c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2v7.9h.8c.2 0 .3.2.2.4l-.5 1.4c0 .1-.1.1-.2.1h-2.2c-.1 0-.2-.1-.2-.2v-1.4c-.7 1.2-1.9 1.9-3.5 1.9-2.6 0-4.8-2.4-4.8-5.3-.1-3 2.1-5.3 4.7-5.3zm.5 8.5c1.8 0 3-1.3 3-3.2 0-1.9-1.3-3.2-3-3.2-1.8 0-3 1.3-3 3.2 0 1.9 1.2 3.2 3 3.2zM33.5 25.2v-7.9h-.8c-.2 0-.3-.2-.2-.4l.5-1.4c0-.1.1-.1.2-.1h2.2c.1 0 .2.1.2.2v2c.8-1.4 2-2.4 3.8-2.5.1 0 .2.1.2.2v2c0 .1-.1.2-.2.2-2.6 0-3.8 1.4-3.8 3.2v4.4c0 .1-.1.2-.2.2h-1.8c0 .1-.1 0-.1-.1zM43.5 23.8v1.4c0 .1-.1.2-.2.2h-2.4c-.2 0-.3-.2-.2-.4l.7-1.7V11.7c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2v5.4c.7-1.2 1.9-1.9 3.5-1.9 2.6 0 4.8 2.3 4.8 5.3 0 2.9-2.2 5.3-4.8 5.3-1.7-.1-2.8-.8-3.6-2zm6.1-3.3c0-1.9-1.3-3.2-3-3.2-1.8 0-3 1.3-3 3.2 0 1.9 1.3 3.2 3 3.2 1.8 0 3-1.3 3-3.2zM58.6 15.2c2.5 0 4.8 1.9 4.8 5v.8c0 .1-.1.2-.2.2H56c.2 1.5 1.1 2.4 2.6 2.4 1 0 1.9-.1 2.3-.9 0-.1.1-.1.2-.1h1.8c.2 0 .3.1.2.3-.5 1.8-2.4 2.7-4.4 2.7-2.8 0-4.9-2.3-4.9-5.3 0-2.8 2-5.1 4.8-5.1zm2.6 4.2c0-1.4-1-2.2-2.5-2.2s-2.3.9-2.6 2.2h5.1zM65.1 12.2c0-.9.7-1.7 1.7-1.7.9 0 1.7.8 1.7 1.7 0 .9-.8 1.7-1.7 1.7-1 0-1.7-.7-1.7-1.7zm.6 13v-9.5c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2v9.5c0 .1-.1.2-.2.2h-1.8c-.1 0-.2-.1-.2-.2zM74.9 15.2c1.7 0 2.8.8 3.5 1.9v-5.4c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2v11.9h.8c.2 0 .3.2.2.4l-.5 1.4c0 .1-.1.1-.2.1h-2.2c-.1 0-.2-.1-.2-.2v-1.4c-.7 1.2-1.9 1.9-3.5 1.9-2.6 0-4.8-2.3-4.8-5.3s2.1-5.3 4.7-5.3zm.5 8.5c1.8 0 3-1.3 3-3.2 0-1.9-1.3-3.2-3-3.2-1.8 0-3 1.3-3 3.2 0 1.9 1.2 3.2 3 3.2zM83.3 22.9c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2.2.6 1.2 1 2.4 1 1.4 0 2.3-.4 2.3-1.2 0-2.3-6.8.1-6.8-4.2 0-2 1.6-3.2 4.3-3.2 2.4 0 4.3 1.1 4.4 2.9 0 .1-.1.2-.2.2H90c-.1 0-.2-.1-.2-.2-.2-.7-1.1-1.1-2.2-1.1-1.3 0-2.1.4-2.1 1.3 0 2.1 6.9-.2 6.9 4.2 0 1.9-1.7 3.1-4.5 3.1-2.5 0-4.5-1.1-4.6-2.8zM100.7 25.7c-1.7 0-2.8-.8-3.5-1.9v5.4c0 .1-.1.2-.2.2h-1.8c-.1 0-.2-.1-.2-.2V17.3h-.8c-.2 0-.3-.2-.2-.4l.5-1.4c0-.1.1-.1.2-.1H97c.1 0 .2.1.2.2V17c.7-1.2 1.9-1.9 3.5-1.9 2.6 0 4.8 2.3 4.8 5.3s-2.1 5.3-4.8 5.3zm-.5-8.5c-1.8 0-3 1.3-3 3.2 0 1.9 1.3 3.2 3 3.2 1.8 0 3-1.3 3-3.2.1-1.8-1.2-3.2-3-3.2zM107.8 25.2V11.7c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2v13.5c0 .1-.1.2-.2.2H108c-.1 0-.2-.1-.2-.2zM117 15.2c1.7 0 2.8.8 3.5 1.9v-1.4c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2v7.9h.8c.2 0 .3.2.2.4l-.5 1.4c0 .1-.1.1-.2.1h-2.2c-.1 0-.2-.1-.2-.2v-1.4c-.7 1.2-1.9 1.9-3.5 1.9-2.6 0-4.8-2.4-4.8-5.3-.1-3 2-5.3 4.7-5.3zm.5 8.5c1.8 0 3-1.3 3-3.2 0-1.9-1.3-3.2-3-3.2-1.8 0-3 1.3-3 3.2-.1 1.9 1.2 3.2 3 3.2zM125.3 22.9c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2.2.6 1.2 1 2.4 1 1.4 0 2.3-.4 2.3-1.2 0-2.3-6.8.1-6.8-4.2 0-2 1.6-3.2 4.3-3.2 2.4 0 4.3 1.1 4.4 2.9 0 .1-.1.2-.2.2H132c-.1 0-.2-.1-.2-.2-.2-.7-1.1-1.1-2.2-1.1-1.3 0-2.1.4-2.1 1.3 0 2.1 6.9-.2 6.9 4.2 0 1.9-1.7 3.1-4.5 3.1-2.4 0-4.5-1.1-4.6-2.8zM136.4 22.9c0-.1.1-.2.2-.2h1.8c.1 0 .2.1.2.2.2.6 1.2 1 2.4 1 1.4 0 2.3-.4 2.3-1.2 0-2.3-6.8.1-6.8-4.2 0-2 1.6-3.2 4.3-3.2 2.4 0 4.3 1.1 4.4 2.9 0 .1-.1.2-.2.2h-1.9c-.1 0-.2-.1-.2-.2-.2-.7-1.1-1.1-2.2-1.1-1.3 0-2.1.4-2.1 1.3 0 2.1 6.9-.2 6.9 4.2 0 1.9-1.7 3.1-4.5 3.1-2.4 0-4.4-1.1-4.6-2.8zM152.5 15.2c2.5 0 4.8 1.9 4.8 5v.8c0 .1-.1.2-.2.2H150c.2 1.5 1.1 2.4 2.6 2.4 1 0 1.9-.1 2.3-.9 0-.1.1-.1.2-.1h1.8c.2 0 .3.1.2.3-.5 1.8-2.4 2.7-4.4 2.7-2.8 0-4.9-2.3-4.9-5.3-.2-2.8 1.9-5.1 4.7-5.1zm2.5 4.2c0-1.4-1-2.2-2.5-2.2s-2.3.9-2.6 2.2h5.1zM159.1 15.6c0-.1.1-.1.2-.1h2.2c.1 0 .2.1.2.2v1.6c.6-1.3 1.7-2.1 3.4-2.1 2.6 0 3.6 1.9 3.6 4.9v5.2c0 .1-.1.2-.2.2h-1.8c-.1 0-.2-.1-.2-.2v-5.2c0-2.3-1-2.8-2.3-2.8-1.8 0-2.6 1.3-2.6 3.2v4.8c0 .1-.1.2-.2.2h-1.8c-.1 0-.2-.1-.2-.2v-7.9h-.8c-.2 0-.3-.2-.2-.4l.7-1.4z"/></svg>
                            </a>
                        </div>
                        <div className="Header__Authentication">
                            {authenticationStatus === AuthStatus.UNKNOWN ? (
                                <div />
                            ) : (
                                <div className="Header__Authentication__buttons">
                                    {authenticationStatus === AuthStatus.IS_AUTHENTICATED ? (
                                        <div className="Header__Innstillinger__wrapper">
                                            {arbeidsgiverSelect && arbeidsgiverSelect}
                                            {underOppfolging &&
                                                <a
                                                    href="https://aktivitetsplan.nav.no"
                                                    className="Header__AktivitetsplanLenke"
                                                >
                                                    <div className="Header__AktivitetsplanLenke-inner">
                                                        <span className="Header__AktivitetsplanLenke__text">Aktivitetsplan</span>
                                                        <span className="Header__Lenkeikon"/>
                                                    </div>
                                                </a>
                                            }
                                            {visInnstillinger && (
                                                <div>
                                                    {(applikasjon === PersonbrukerApplikasjon.CV ? (
                                                        <NavLink
                                                            to='/personinnstillinger'
                                                            onClick={this.onNavigationClick('/personinnstillinger')}
                                                            className="Header__Innstillinger typo-normal"
                                                            activeClassName="Header__Innstillinger-active"
                                                        >
                                                            <div className="Header__Innstillinger-inner">
                                                                <span className="Header__Innstillinger__text">Innstillinger</span>
                                                                <span className="Header__Tannhjul"/>
                                                            </div>
                                                        </NavLink>
                                                    ) : (
                                                        <a
                                                            href="/personinnstillinger"
                                                            onClick={this.onNavigationClick('/personinnstillinger')}
                                                            className="Header__Innstillinger typo-normal"
                                                        >
                                                            <div className="Header__Innstillinger-inner">
                                                                <span className="Header__Innstillinger__text">Innstillinger</span>
                                                                <span className="Header__Tannhjul"/>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                            {name && (
                                                <div className="Header__name">
                                                    {name}
                                                </div>
                                            )}
                                            <div className={name ? 'Header__logout-name' : ''}>
                                                <AuthButton label="Logg ut" onClick={onLogoutClick} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="Header__VelgRolle">
                                                <button
                                                    onClick={this.onPopoverOpen}
                                                    className="Header__Button Header__Button--mini"
                                                    aria-haspopup="true"
                                                    aria-expanded={showPopover}
                                                >
                                                    Logg inn
                                                </button>
                                                {showPopover && (
                                                    <Popover onClose={this.onPopoverClose}>
                                                        <button
                                                            onClick={this.onLoginClick('personbruker')}
                                                            className="Header__VelgRolle__row"
                                                            aria-label="Logg inn som jobbsøker"
                                                        >
                                                            <div>For jobbsøkere</div>
                                                            <div className="Login__Icon" />
                                                        </button>
                                                        <div className="border--solid" />
                                                        <button
                                                            onClick={this.onLoginClick('arbeidsgiver')}
                                                            className="Header__VelgRolle__row"
                                                            aria-label="Logg inn som arbeidsgiver"
                                                        >
                                                            <div>For arbeidsgivere</div>
                                                            <div className="Login__Icon" />
                                                        </button>
                                                    </Popover>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {authenticationStatus !== AuthStatus.UNKNOWN && (
                            <div className="Header__Authentication--mobile">
                                {authenticationStatus === AuthStatus.IS_AUTHENTICATED ? (
                                    showMobileMenu ? (
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
                                    )
                                ) : (
                                    <button
                                        onClick={this.onToggleMenu}
                                        className="Header__login--mobile Header__Button Header__Button--mini Header__Button--flat"
                                    >
                                        Logg inn
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    {authenticationStatus !== AuthStatus.UNKNOWN && showMobileMenu && (
                        <div className="Headermenu__mobile">
                            {authenticationStatus === AuthStatus.IS_AUTHENTICATED ? (
                                <div>
                                    {useMenu !== 'none' && (
                                        <div className="Menu__wrapper__mobile">
                                            {useMenu === 'arbeidsgiver' ? (
                                                <div>
                                                    {arbeidsgiverSelect && (
                                                        <div className="ArbeidsgiverSelect__mobile__wrapper">
                                                            {arbeidsgiverSelect}
                                                        </div>
                                                    )}
                                                    <Arbeidsgivermeny activeTabID={applikasjon as ArbeidsgiverTabId} />
                                                </div>
                                            ) : (
                                                <Personbrukermeny
                                                    applikasjon={applikasjon as PersonbrukerApplikasjon}
                                                    validerNavigasjon={validerNavigasjon}
                                                    onNavigationClick={this.onNavigationClick}
                                                />
                                            )}
                                        </div>
                                    )}
                                    {useMenu === 'none' && visInnstillinger && (
                                        <InnstillingerLenkeMobil
                                            applikasjon={applikasjon as PersonbrukerApplikasjon}
                                            onNavigationClick={this.onNavigationClick}
                                        />
                                    )}
                                    <div className="Header__Authentication__logout">
                                        {underOppfolging && <AktivitetsplanLenkeMobil onNavigationClick={this.onNavigationClick} />}
                                        <div className="Header__name__wrapper">
                                            {name && (
                                                <div className="Header__name">
                                                    {name}
                                                </div>
                                            )}
                                            <div className={name ? 'Header__logout-name' : ''}>
                                                <AuthButton label="Logg ut" onClick={onLogoutClick} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="Header__VelgRolle">
                                    <button
                                        onClick={this.onLoginClick('personbruker')}
                                        className="Header__VelgRolle__row"
                                        aria-label="Logg inn som jobbsøker"
                                    >
                                        <div>For jobbsøkere</div>
                                        <div className="Login__Icon" />
                                    </button>
                                    <div className="border--solid" />
                                    <button
                                        onClick={this.onLoginClick('arbeidsgiver')}
                                        className="Header__VelgRolle__row"
                                        aria-label="Logg inn som arbeidsgiver"
                                    >
                                        <div>For arbeidsgivere</div>
                                        <div className="Login__Icon" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {authenticationStatus === AuthStatus.IS_AUTHENTICATED && useMenu !== 'none' && (
                        <div className="Menu__wrapper">
                            {useMenu === 'arbeidsgiver' ? (
                                <Arbeidsgivermeny activeTabID={applikasjon as ArbeidsgiverTabId} />
                            ) : (
                                <Personbrukermeny
                                    applikasjon={applikasjon as PersonbrukerApplikasjon}
                                    validerNavigasjon={validerNavigasjon} 
                                    onNavigationClick={this.onNavigationClick}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
