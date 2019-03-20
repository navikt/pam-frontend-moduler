import * as React from 'react';
import './PersonbrukerHeaderMeny.less';
import { Normaltekst } from 'nav-frontend-typografi';
import Popover from './popover/Popover';

interface HeaderUtenMenypunkterProps {
    loggInnUrl: string;
    loggInnUrlArbeidsgiver?: string;
    loggUtUrl: string;
    erInnlogget: boolean;
}

interface HeaderUtenMenypunkterState {
    showMobileMenu: boolean;
    showPopover: boolean;
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

export class HeaderUtenMenypunkter extends React.Component<HeaderUtenMenypunkterProps, HeaderUtenMenypunkterState> {
    state = {
        showMobileMenu: false,
        showPopover: false
    }

    onToggleMenu = () => {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu
        });
    };

    onLoginClick = () => {
        this.setState({
            showPopover: true
        });
    }

    onPopoverClose = () => {
        this.setState({
            showPopover: false
        });
    }

    onLogoutClick = () => {
        localStorage.removeItem('innloggetBrukerKontekst');
        window.location.href = this.props.loggUtUrl;
    }

    onLoginArbeidsgiverClick = () => {
        localStorage.setItem('innloggetBrukerKontekst', 'arbeidsgiver');
        window.location.href = this.props.loggInnUrlArbeidsgiver || window.location.href;
    }

    onLoginPersonbrukerClick = () => {
        localStorage.setItem('innloggetBrukerKontekst', 'personbruker');
        window.location.href = this.props.loggInnUrl;
    }

    render() {
        const { erInnlogget } = this.props;
        const { showMobileMenu, showPopover } = this.state;

        return (
            <div className="PersonbrukerHeaderMeny">
                <div className="HeaderUtenMenypunkter">
                    <div className="topp">
                        <div className="logo">
                            <a className="lenke" href="/">Arbeidsplassen</a>
                        </div>
                        <div className="innlogging">
                            {erInnlogget ? (
                                <AuthButton label="Logg ut" onClick={this.onLogoutClick} />
                            ) : (
                                <div className="VelgRolle">
                                    <button
                                        onClick={this.onLoginClick}
                                        className="Header__Button Header__Button--mini typo-normal"
                                        aria-haspopup="true"
                                        aria-expanded={showPopover}
                                    >
                                        Logg inn
                                    </button>
                                    {showPopover && (
                                        <Popover onClose={this.onPopoverClose}>
                                            <div className="VelgRolle__row">
                                                <div>For personbrukere:</div>
                                                <AuthButton label="Logg inn" onClick={this.onLoginPersonbrukerClick} />
                                            </div>
                                            <div className="VelgRolle__row">
                                                <div>For arbeidsgivere:</div>
                                                <AuthButton label="Logg inn" onClick={this.onLoginArbeidsgiverClick} />
                                            </div>
                                        </Popover>
                                    )}
                                </div>
                            )}
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
                    {showMobileMenu && (
                        <div className="Mobilmeny" id="Mobilmeny">
                            {erInnlogget ? (
                                <div className="Mobilmeny--logout-wrapper">
                                    <AuthButton label="Logg ut" onClick={this.onLogoutClick} />
                                </div>
                            ) : (
                                <div className="Mobilmeny--login-wrapper">
                                    <div className="Mobilmeny--login-personbruker">
                                        <Normaltekst>For personbrukere:</Normaltekst>
                                        <AuthButton label="Logg inn" onClick={this.onLoginPersonbrukerClick} />
                                    </div>
                                    <div className="Mobilmeny--login-arbeidsgiver">
                                        <Normaltekst>For arbeidsgivere:</Normaltekst>
                                        <AuthButton label="Logg inn" onClick={this.onLoginArbeidsgiverClick} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
