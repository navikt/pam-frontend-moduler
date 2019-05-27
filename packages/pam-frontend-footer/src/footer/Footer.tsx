/* eslint-disable jsx-a11y/href-no-hash */
import * as React from 'react';
import './Footer.less';

export const Footer = () => (
    <div className="Footer">
        <div className="Footer__inner">
            <p className="Footer__slogan">Alt av arbeid på én plass</p>
            <nav className="Footer__links">
                <a className="Footer__logo link" href="https://www.nav.no/Forsiden" title="Gå til nav.no">
                  <i className="Footer__logo__nav-icon">
                    <span className="Footer__logo__nav-icon__sr-only">NAV logo</span>
                  </i>
                </a>
                 <ul className="Footer__links__ul">
                    <li className="Footer__links__ul__li">
                      <a href="/om-arbeidsplassen" className="Footer__links__ul__li__link">
                        Om Arbeidsplassen
                      </a>
                    </li>
                    <li className="Footer__links__ul__li">
                      <a href="/sporsmal-og-svar" className="Footer__links__ul__li__link">
                        Spørsmål og svar
                      </a>
                    </li>
                    <li className="Footer__links__ul__li">
                      <a href="/kontakt" className="Footer__links__ul__li__link">
                        Kontakt oss
                      </a>
                    </li>
                    <li className="Footer__links__ul__li">
                      <a href="/tilgjengelighet" className="Footer__links__ul__li__link">
                        Tilgjengelighet
                      </a>
                    </li>
                    <li className="Footer__links__ul__li">
                      <a href="/personvern" className="Footer__links__ul__li__link">
                        Personvern
                      </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
);