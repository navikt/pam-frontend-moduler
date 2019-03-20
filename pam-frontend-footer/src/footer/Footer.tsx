/* eslint-disable jsx-a11y/href-no-hash */
import * as React from 'react';
import { Link } from 'react-router-dom';
import './Footer.less';

interface InternalOrExternalLinkProps {
    href: string;
    isInternalLink: boolean;
    children: string;
};

const InternalOrExternalLink = ({ href, isInternalLink, children }: InternalOrExternalLinkProps) => {
    if (isInternalLink) {
        return (
            <Link to={href} className="Footer__links__ul__li__link">
                {children}
            </Link>
        );
    }
    return (
        <a href={href} className="Footer__links__ul__li__link">
            {children}
        </a>
    );
};

interface FooterProps {
  useInternalLinks?: boolean;
}

export const Footer = ({ useInternalLinks = false }: FooterProps) => (
    <div className="Footer">
        <div className="Footer__inner">
            <p className="Footer__slogan">Arbeidsmarkedet på ett sted</p>
            <nav className="Footer__links">
                <a className="Footer__logo link" href="https://www.nav.no/Forsiden" title="Gå til nav.no">
                    <i className="Footer__logo__nav-icon" aria-label="NAV logo" />
                </a>
                 <ul className="Footer__links__ul">
                    <li className="Footer__links__ul__li">
                      <InternalOrExternalLink isInternalLink={useInternalLinks} href="/om-arbeidsplassen">
                        Om arbeidsplassen
                      </InternalOrExternalLink>
                    </li>
                    <li className="Footer__links__ul__li">
                      <InternalOrExternalLink isInternalLink={useInternalLinks} href="/kontaktinfo">
                        Kontaktinfo
                      </InternalOrExternalLink>
                    </li>
                    <li className="Footer__links__ul__li">
                      <InternalOrExternalLink isInternalLink={useInternalLinks} href="/tilgjengelighet">
                        Tilgjengelighet
                      </InternalOrExternalLink>
                    </li>
                    <li className="Footer__links__ul__li">
                      <InternalOrExternalLink isInternalLink={useInternalLinks} href="/personvern">
                        Personvern
                      </InternalOrExternalLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
);