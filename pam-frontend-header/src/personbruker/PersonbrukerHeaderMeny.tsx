import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { Personbruker } from './PropTypes';
import NavFrontendChevron from 'nav-frontend-chevron';
import './PersonbrukerHeaderMeny.less';

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

interface PersonbrukerHeaderMenyProps {
  onLoggUt: () => void;
  onLoggInn: () => void;
  personbruker: Personbruker;
  isAuthenticated: boolean;
}

interface StateProps {
    showMobileMenu: boolean;
}

const StillingssokTabActive = (match : any , location : any) => {
    if (!match) {
        return false;
    }
    return location.pathname === "/" || location.pathname.match(/\/pam-stillingsok\/stilling*/);
};

export class PersonbrukerHeaderMeny extends React.Component<PersonbrukerHeaderMenyProps, StateProps> {
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

    render() {
        const { onLoggUt, onLoggInn, isAuthenticated, personbruker } = this.props;
        const { showMobileMenu } = this.state;
        return (
            <div className="HeaderMeny">
                <div className="topp">
                    <div className="logo">
                        <a href="/">Arbeidsplassen</a>
                    </div>
                    <div className="innlogging">
                        {isAuthenticated && (
                            <div>
                                {personbruker && personbruker.navn && (
                                    <Link to="/pam-stillingsok/innstillinger" className="meny--navn lenke typo-normal">
                                        <span className="meny--navn__text">{personbruker.navn}</span>
                                        <div className="meny--tannhjul" />
                                    </Link>
                                )}
                            </div>
                        )}
                        <div>
                            {!isAuthenticated ? (
                                <Knapp onClick={onLoggInn} id="logg-inn" className="knapp knapp--mini">
                                    Logg inn
                                </Knapp>
                            ) : (
                                <Knapp onClick={onLoggUt} id="logg-ut" className="knapp knapp--mini">
                                    Logg ut
                                </Knapp>
                            )}
                        </div>
                    </div>
                    <div className="mobilinnlogging">
                        {!isAuthenticated && (
                            <Knapp onClick={onLoggInn} id="logg-inn" className="knapp knapp--mini">
                                Logg inn
                            </Knapp>
                        )}
                        {isAuthenticated && (
                            showMobileMenu ? (
                                <div role="button" onClick={this.onToggleMenu} id="logg-ut" className="mobilmeny--toggle">
                                    <span className="mobilmeny--toggle-text">Lukk</span>
                                    <div className="mobilmeny--lukk" />
                                </div>
                            ) : (
                                <div role="button" onClick={this.onToggleMenu} id="logg-ut" className="mobilmeny--toggle">
                                    <span className="mobilmeny--toggle-text">Meny</span>
                                    <div className="mobilmeny--apne" />
                                </div>
                            )
                        )}
                    </div>
                </div>
                {isAuthenticated && (
                    <div className="meny">
                        {tabs.map((tab) => (
                            tab.href === "/" ? (
                                <div className="meny--lenke-wrapper" key={tab.id}>
                                    <NavLink isActive={StillingssokTabActive} to={tab.href} activeClassName="meny--lenke-active" className="meny--lenke">
                                        <Normaltekst className="meny--lenke-inner">{tab.tittel}<NavFrontendChevron className="meny--chevron" /></Normaltekst>
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="meny--lenke-wrapper" key={tab.id}>
                                    <NavLink to={tab.href} activeClassName="meny--lenke-active" className="meny--lenke">
                                        <Normaltekst className="meny--lenke-inner">{tab.tittel}<NavFrontendChevron className="meny--chevron" /></Normaltekst>
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
                )}
                {isAuthenticated && showMobileMenu && (
                    <div className="mobilmeny">
                        {tabs.map((tab) => (
                            tab.href === "/" ? (
                                <div className="mobilmeny--lenke-wrapper" key={tab.id}>
                                    <NavLink isActive={StillingssokTabActive} to={tab.href} activeClassName="mobilmeny--lenke-active" className="mobilmeny--lenke">
                                        <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="mobilmeny--lenke-wrapper" key={tab.id}>
                                    <NavLink to={tab.href} activeClassName="mobilmeny--lenke-active" className="mobilmeny--lenke">
                                        <Normaltekst className="mobilmeny--lenke-inner">{tab.tittel}<NavFrontendChevron className="mobilmeny--chevron" /></Normaltekst>
                                    </NavLink>
                                </div>
                            )
                        ))}
                        <div className="mobilmeny--lenke-wrapper">
                            <NavLink to="/pam-stillingsok/innstillinger" activeClassName="mobilmeny--lenke-active" className="mobilmeny--lenke">
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
