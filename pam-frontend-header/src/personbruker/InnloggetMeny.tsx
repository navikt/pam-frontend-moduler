import * as React from 'react';
import { Knapp } from "nav-frontend-knapper";
import { Link, NavLink } from "react-router-dom";
import { Normaltekst } from "nav-frontend-typografi";
import NavFrontendChevron from "nav-frontend-chevron";

export enum PersonbrukerTabId {
    STILLINGSSOK = 'STILLINGSSOK',
    FAVORITTER = 'FAVORITTER',
    LAGREDESOK = 'LAGREDESOK'
}

interface PersonbrukerTab {
    id: PersonbrukerTabId;
    tittel: string;
    href: string;
}

const tabs : Array<PersonbrukerTab> = [
    {
        id: PersonbrukerTabId.STILLINGSSOK,
        tittel: 'Stillingssøk',
        href: '/'
    },
    {
        id: PersonbrukerTabId.FAVORITTER,
        tittel: 'Favoritter',
        href: '/pam-stillingsok/favoritter'
    },
    {
        id: PersonbrukerTabId.LAGREDESOK,
        tittel: 'Lagrede søk',
        href: '/pam-stillingsok/lagrede-sok'
    }
];

interface InnloggetToppProps {
    onLoggUt: () => void;
    personbruker: { navn: string }
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


    render() {
        const { personbruker, onLoggUt } = this.props;
        const { showMobileMenu } = this.state;
        return (
            <div>
                <div className="topp">
                    <div className="logo">
                        <a href="/">Arbeidsplassen</a>
                    </div>
                    <div className="innlogging">
                        <div>
                            {personbruker && personbruker.navn && (
                                <Link to="/pam-stillingsok/innstillinger" className="meny--navn lenke typo-normal">
                                    <span className="meny--navn__text">{personbruker.navn}</span>
                                    <div className="meny--tannhjul" />
                                </Link>
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
                        tab.href === "/" ? (
                            <div className="meny--lenke-wrapper" key={tab.id}>
                                <NavLink isActive={stillingssokTabActive} to={tab.href} activeClassName="meny--lenke-active" className="meny--lenke">
                                    <span className="meny--lenke-inner">{tab.tittel}<NavFrontendChevron className="meny--chevron" /></span>
                                </NavLink>
                            </div>
                        ) : (
                            <div className="meny--lenke-wrapper" key={tab.id}>
                                <NavLink to={tab.href} activeClassName="meny--lenke-active" className="meny--lenke">
                                    <span className="meny--lenke-inner">{tab.tittel}<NavFrontendChevron className="meny--chevron" /></span>
                                </NavLink>
                            </div>
                        )
                    ))}
                    <div className="meny--lenke-wrapper">
                        <NavLink to="/pam-stillingsok/innstillinger" activeClassName="meny--lenke-active" className="meny--lenke meny--lenke-innstillinger">
                            <Normaltekst className="meny--lenke-inner">Innstillinger<NavFrontendChevron className="meny--chevron" /></Normaltekst>
                        </NavLink>
                    </div>
                </div>
                {showMobileMenu && (
                    <div className="mobilmeny">
                        <div className="mobilmeny--separator" />
                        {tabs.map((tab) => (
                            tab.href === "/" ? (
                                <div className="mobilmeny--lenke-wrapper" key={tab.id}>
                                    <NavLink onClick={this.hideMenu} isActive={stillingssokTabActive} to={tab.href} activeClassName="mobilmeny--lenke-active" className="mobilmeny--lenke">
                                        <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="mobilmeny--lenke-wrapper" key={tab.id}>
                                    <NavLink onClick={this.hideMenu} to={tab.href} activeClassName="mobilmeny--lenke-active" className="mobilmeny--lenke">
                                        <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                    </NavLink>
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
