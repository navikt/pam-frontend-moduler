import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { Personbruker } from './PropTypes';
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

const PersonbrukerActiveTab = (match : any , location : any) => {
    if (!match) {
        return false;
    }
    return location.pathname === "/" || location.pathname.match(/\/pam-stillingsok\/stilling*/);
};

export const PersonbrukerHeaderMeny = ({ onLoggUt, onLoggInn, isAuthenticated, personbruker } : PersonbrukerHeaderMenyProps ) => {
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
            </div>
            {isAuthenticated && (
                <div className="meny">
                    {tabs.map((tab) => (
                        tab.href === "/" ? (
                            <NavLink isActive={PersonbrukerActiveTab} to={tab.href} activeClassName="meny--lenke-active" className="meny--lenke" key={tab.id}>
                                <Normaltekst className="meny--lenke-inner">{tab.tittel}</Normaltekst>
                            </NavLink>
                          ) : (
                            <NavLink to={tab.href} activeClassName="meny--lenke-active" className="meny--lenke" key={tab.id}>
                                <Normaltekst className="meny--lenke-inner">{tab.tittel}</Normaltekst>
                            </NavLink>
                        )
                    ))}
              </div>
            )}
        </div>
    );
};
