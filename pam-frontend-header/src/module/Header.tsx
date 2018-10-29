import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import './HeaderMeny.less';

interface HeaderProps {
  onLoggUt: () => void;
}

export const Header = ({ onLoggUt } : HeaderProps ) => (
  <div className="HeaderMeny">
    <div className="topp">
      <div className="logo">
        <a href="/">Arbeidsplassen</a>
      </div>
      <div>
        <Knapp onClick={onLoggUt} id="logg-ut" className="knapp knapp--mini knapp--loggut">
          Logg ut
        </Knapp>
      </div>
    </div>
  </div>
);
