import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
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
}

interface HeaderStateProps {
    showPopover: boolean;
    showMobileMenu: boolean;
}

interface AuthButtonProps {
    label: String
    onClick: () => void;
}

const AuthButton = ({ label, onClick } : AuthButtonProps) => (
    <button onClick={onClick} className="Header__Button Header__Button--mini typo-normal">
        {label}
    </button>
);

export class Header extends React.Component<HeaderProps, HeaderStateProps> {
    state = {
        showPopover: false,
        showMobileMenu: false
    };

    componentDidMount() {
        const { role } = this.props;
        if (role) {
            localStorage.setItem('innloggetBrukerKontekst', role);
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
            showMobileMenu
        } = this.state;

        return(
            <div className="Header__wrapper">
                <div className="Header">
                    <div className="Header__topp">
                        <div className="Header__logo">
                            <a href="/" aria-label="Logo Arbeidsplassen">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 40"><g id="Layer_2"><path fill="#424448" d="M13.7 10.2L8.4 27h3.9l1-4h5.1l1 4h4l-5.3-16.8h-4.4zm.4 9.8l.4-1.6c.5-1.7.9-3.6 1.3-5.4h.1c.4 1.8.9 3.7 1.4 5.4l.4 1.6h-3.6zM28.5 16.4l-.4-2.2H25V27h3.8v-7.4c.7-1.7 1.9-2.4 2.8-2.4.5 0 .9.1 1.4.2l.6-3.3c-.4-.2-.8-.3-1.5-.3-1.3.1-2.7.9-3.6 2.6zM42.4 13.9c-1.2 0-2.4.5-3.4 1.4l.1-2V8.9h-3.8V27h3l.3-1.4h.1c1 1.1 2.2 1.7 3.3 1.7 2.8 0 5.4-2.5 5.4-6.9 0-4-1.9-6.5-5-6.5zm-1.3 10.3c-.6 0-1.4-.2-2-.8v-5.3c.7-.8 1.4-1.1 2.2-1.1 1.5 0 2.2 1.1 2.2 3.4 0 2.7-1 3.8-2.4 3.8zM55.4 13.9c-3.1 0-6 2.6-6 6.7 0 4.2 2.8 6.7 6.5 6.7 1.5 0 3.2-.5 4.5-1.4l-1.3-2.3c-.9.5-1.8.8-2.8.8-1.7 0-3-.9-3.3-2.7h7.7c.1-.3.2-1 .2-1.7-.1-3.5-1.9-6.1-5.5-6.1zM53 19.2c.3-1.6 1.3-2.4 2.5-2.4 1.5 0 2.1 1 2.1 2.4H53zM65.3 8.4c-1.3 0-2.2.8-2.2 2s.9 2 2.2 2c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2zM63.4 14.2h3.8V27h-3.8zM78.2 13.3l.1 1.9c-.9-.8-1.7-1.3-3.1-1.3-2.7 0-5.3 2.5-5.3 6.7s2.1 6.7 5.2 6.7c1.2 0 2.5-.7 3.4-1.6h.1l.3 1.3H82V8.9h-3.8v4.4zm0 9.7c-.6.8-1.3 1.1-2.1 1.1-1.5 0-2.3-1.1-2.3-3.6 0-2.4 1.1-3.6 2.3-3.6.7 0 1.4.2 2.1.8V23zM90.9 19.3c-1.3-.5-2.5-.8-2.5-1.6 0-.6.5-1 1.5-1 .9 0 1.8.4 2.7 1.1l1.7-2.3c-1.1-.8-2.5-1.6-4.5-1.6-3 0-4.9 1.6-4.9 4 0 2.1 1.8 3.2 3.4 3.8 1.3.5 2.6.9 2.6 1.7 0 .7-.5 1.1-1.6 1.1s-2.1-.5-3.3-1.3l-1.7 2.4c1.3 1.1 3.2 1.8 4.9 1.8 3.4 0 5.3-1.8 5.3-4.1-.1-2.5-2-3.4-3.6-4zM103.9 13.9c-1.3 0-2.6.7-3.6 1.6h-.1l-.3-1.3h-3.1v17.5h3.8V28l-.1-2c.9.9 2 1.3 3.1 1.3 2.8 0 5.4-2.5 5.4-6.9-.2-4-2-6.5-5.1-6.5zm-1.3 10.3c-.6 0-1.4-.2-2-.8v-5.3c.7-.8 1.4-1.1 2.2-1.1 1.5 0 2.2 1.1 2.2 3.4 0 2.7-1.1 3.8-2.4 3.8zM115.8 24.2c-.3 0-.7-.3-.7-1.1V8.9h-3.8V23c0 2.6.9 4.3 3.5 4.3.9 0 1.5-.1 1.9-.3l-.5-2.8h-.4zM124 13.9c-2 0-3.8.7-5.5 1.7l1.3 2.5c1.2-.7 2.3-1.2 3.4-1.2 1.4 0 1.9.7 2 1.8-5.1.5-7.2 2-7.2 4.7 0 2.2 1.5 3.9 3.8 3.9 1.4 0 2.6-.7 3.7-1.6h.1l.4 1.3h3.1v-7.3c0-3.9-1.8-5.8-5.1-5.8zm1.3 9.4c-.7.7-1.2 1.1-2.1 1.1-.9 0-1.5-.4-1.5-1.2 0-1 .9-1.7 3.6-2.1v2.2zM137.9 19.3c-1.3-.5-2.5-.8-2.5-1.6 0-.6.5-1 1.5-1 .9 0 1.8.4 2.7 1.1l1.7-2.3c-1.1-.8-2.5-1.6-4.5-1.6-3 0-4.9 1.6-4.9 4 0 2.1 1.8 3.2 3.4 3.8 1.3.5 2.6.9 2.6 1.7 0 .7-.5 1.1-1.6 1.1s-2.1-.5-3.3-1.3l-1.7 2.4c1.3 1.1 3.2 1.8 4.9 1.8 3.4 0 5.3-1.8 5.3-4.1-.2-2.5-2-3.4-3.6-4zM149.3 19.3c-1.3-.5-2.5-.8-2.5-1.6 0-.6.5-1 1.5-1 .9 0 1.8.4 2.7 1.1l1.7-2.3c-1.1-.8-2.5-1.6-4.5-1.6-3 0-4.9 1.6-4.9 4 0 2.1 1.8 3.2 3.4 3.8 1.3.5 2.6.9 2.6 1.7 0 .7-.5 1.1-1.6 1.1s-2.1-.5-3.3-1.3l-1.7 2.4c1.3 1.1 3.2 1.8 4.9 1.8 3.4 0 5.3-1.8 5.3-4.1-.2-2.5-2-3.4-3.6-4zM160.4 13.9c-3.1 0-6 2.6-6 6.7 0 4.2 2.8 6.7 6.5 6.7 1.5 0 3.2-.5 4.5-1.4l-1.3-2.3c-.9.5-1.8.8-2.8.8-1.7 0-3-.9-3.3-2.7h7.7c.1-.3.2-1 .2-1.7 0-3.5-1.8-6.1-5.5-6.1zm-2.4 5.3c.3-1.6 1.3-2.4 2.5-2.4 1.5 0 2.1 1 2.1 2.4H158zM176.1 13.9c-1.7 0-3 .9-4.1 1.9h-.1l-.3-1.6h-3.1V27h3.8v-8.6c.8-.8 1.4-1.2 2.4-1.2 1.1 0 1.6.6 1.6 2.4V27h3.8v-8c-.1-3.2-1.3-5.1-4-5.1z"/></g></svg>
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
                                            {visInnstillinger && (
                                                <div>
                                                    {(applikasjon === PersonbrukerApplikasjon.CV ? (
                                                        <NavLink
                                                            to='/personinnstillinger'
                                                            onClick={this.onNavigationClick('/personinnstillinger')}
                                                            className="Header__Innstillinger typo-normal"
                                                            activeClassName="Header__Innstillinger-active"
                                                        >
                                                            <div className="Header__Innstillinger-inner" tabIndex={-1}>
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
                                                            <div className="Header__Innstillinger-inner" tabIndex={-1}>
                                                                <span className="Header__Innstillinger__text">Innstillinger</span>
                                                                <span className="Header__Tannhjul"/>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                            <div>
                                                <AuthButton label="Logg ut" onClick={onLogoutClick} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="Header__VelgRolle">
                                                <button
                                                    onClick={this.onPopoverOpen}
                                                    className="Header__Button Header__Button--mini typo-normal"
                                                    aria-haspopup="true"
                                                    aria-expanded={showPopover}
                                                >
                                                    Logg inn
                                                </button>
                                                {showPopover && (
                                                    <Popover onClose={this.onPopoverClose}>
                                                        <div className="Header__VelgRolle__row">
                                                            <div>For jobbsøkere:</div>
                                                            <AuthButton label="Logg inn" onClick={this.onLoginClick('personbruker')} />
                                                        </div>
                                                        <div className="Header__VelgRolle__row">
                                                            <div>For arbeidsgivere:</div>
                                                            <AuthButton label="Logg inn" onClick={this.onLoginClick('arbeidsgiver')} />
                                                        </div>
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
                                        <AuthButton label="Logg ut" onClick={onLogoutClick} />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="Header__Authentication--personbruker">
                                        <Normaltekst>For jobbsøkere:</Normaltekst>
                                        <AuthButton label="Logg inn" onClick={this.onLoginClick('personbruker')} />
                                    </div>
                                    <div className="Header__Authentication--arbeidsgiver">
                                        <Normaltekst>For arbeidsgivere:</Normaltekst>
                                        <AuthButton label="Logg inn" onClick={this.onLoginClick('arbeidsgiver')} />
                                    </div>
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