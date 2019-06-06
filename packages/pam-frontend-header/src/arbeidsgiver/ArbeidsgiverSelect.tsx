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
  label?: string;
  showLabelInline?: boolean;
}

const ArbeidsgiverSelect = ({
    arbeidsgivere,
    onArbeidsgiverSelect,
    valgtArbeidsgiverId,
    label,
    showLabelInline
}: ArbeidsgiverSelectProps) => {
    const onArbeidsgiverChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== '0') {
            onArbeidsgiverSelect(e.target.value);
        } else {
            onArbeidsgiverSelect();
        }
    };

    return (
        <React.Fragment>
            {arbeidsgivere.length === 1 ? (
                <Normaltekst className="ArbeidsgiverSelect__navn">
                    {arbeidsgivere[0].navn}
                </Normaltekst>
            ) : (arbeidsgivere.length > 1 && (
                <Select
                    className={`ArbeidsgiverSelect${showLabelInline ? ' ArbeidsgiverSelect__inline' : ''}`}
                    label={label}
                    id="arbeidsgiver-select"
                    onChange={onArbeidsgiverChange}
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
        </React.Fragment>
    );
};

export default ArbeidsgiverSelect;
