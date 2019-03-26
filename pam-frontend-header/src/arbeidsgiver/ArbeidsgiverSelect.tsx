import * as React from 'react';
import { Select } from 'nav-frontend-skjema';
import { Arbeidsgiver } from './PropTypes';
import { ChangeEvent } from "react";
import { Normaltekst } from 'nav-frontend-typografi';
import './ArbeidsgiverSelect.less'

interface ArbeidsgiverSelectProps {
  onArbeidsgiverSelect: (orgNummer?: string) => void
  arbeidsgivere: Array<Arbeidsgiver>;
  valgtArbeidsgiverId?: string;
}

class ArbeidsgiverSelect extends React.Component<ArbeidsgiverSelectProps> {
    onArbeidsgiverChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== '0') {
            this.props.onArbeidsgiverSelect(e.target.value);
        } else {
            this.props.onArbeidsgiverSelect();
        }
    };

    render() {
        const { arbeidsgivere, valgtArbeidsgiverId } = this.props;
        return (
            <div>
                {arbeidsgivere.length === 1 ? (
                    <Normaltekst className="ArbeidsgiverSelect__navn">
                        {arbeidsgivere[0].navn}
                    </Normaltekst>
                ) : (arbeidsgivere.length > 1 && (
                    <Select
                        className="ArbeidsgiverSelect"
                        label=""
                        id="arbeidsgiver-select"
                        onChange={this.onArbeidsgiverChange}
                        value={valgtArbeidsgiverId}
                        aria-label="Velg arbeidsgiver"
                    >
                        <option value="0">Velg arbeidsgiver</option>
                        {arbeidsgivere && arbeidsgivere.map((arbeidsgiver) => (
                            <option key={arbeidsgiver.orgNummer} value={arbeidsgiver.orgNummer}>
                                {arbeidsgiver.navn}
                            </option>))
                        };
                    </Select>
                ))}

            </div>
        );
    }
}

export default ArbeidsgiverSelect;
