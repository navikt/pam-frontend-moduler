import * as React from 'react';
import { Select } from 'nav-frontend-skjema';
import { Arbeidsgiver } from './PropTypes';
import {ChangeEvent} from "react";

interface ArbeidsgiverSelectProps {
  onArbeidsgiverSelect: (orgNummer?: string) => void
  arbeidsgivere: Array<Arbeidsgiver>;
  valgtArbeidsgiverId?: string;
}

class ArbeidsgiverSelect extends React.Component<ArbeidsgiverSelectProps> {
    onArbeidsgiverChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== '0') {
            sessionStorage.setItem('orgnr', e.target.value);
            this.props.onArbeidsgiverSelect(e.target.value);
        } else {
            sessionStorage.removeItem('orgnr');
            this.props.onArbeidsgiverSelect();
        }
    };

    render() {
        const { arbeidsgivere, valgtArbeidsgiverId } = this.props;
        return (
            <Select
                className="topmeny-select topmeny-mr"
                label=""
                id="arbeidsgiver-select"
                onChange={this.onArbeidsgiverChange}
                value={valgtArbeidsgiverId}
                bredde="m"
                aria-label="Velg arbeidsgiver"
            >
                <option value="0">Velg arbeidsgiver</option>
                {arbeidsgivere && arbeidsgivere.map((arbeidsgiver) => (
                    <option key={arbeidsgiver.orgNummer} value={arbeidsgiver.orgNummer}>
                        {arbeidsgiver.navn}
                    </option>))
                };
            </Select>
        );
    }
}

export default ArbeidsgiverSelect;
