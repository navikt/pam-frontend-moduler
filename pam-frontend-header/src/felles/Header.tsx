import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Popover from './popover/Popover';
import './Header.less';
import { NavLink } from 'react-router-dom';
import { PersonbrukerApplikasjon, Personbrukermeny } from '../personbruker/Personbrukermeny';
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
                            <a className="lenke" href="/">Arbeidsplassen</a>
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
                                                            <div>For personbrukere:</div>
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
                                                    <div className="ArbeidsgiverSelect__mobile__wrapper">
                                                        {arbeidsgiverSelect && arbeidsgiverSelect}
                                                    </div>
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
                                    <div className="Header__Authentication__logout">
                                        <AuthButton label="Logg ut" onClick={onLogoutClick} />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="Header__Authentication--personbruker">
                                        <Normaltekst>For personbrukere:</Normaltekst>
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