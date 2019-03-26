import * as React from 'react';
import './Merkelapp.less';

interface MerkelappProps {
    canRemove?: boolean;
    children: React.ReactNode;
    onRemove: (...args: any[]) => void;
    value: string;
}

const Merkelapp = ({
    canRemove,
    children,
    onRemove,
    value
}: MerkelappProps) => {
    const onRemoveClick = () => {
        if (onRemove) {
            onRemove(value);
        }
    };

    return (
        <div className="Merkelapp">
            <span className="typo-normal">
                {children}
            </span>
            {(canRemove || canRemove === undefined) && (
                <button
                    aria-label="Slett"
                    className="Merkelapp__slett"
                    onClick={onRemoveClick}
                    type="button"
                >
                    <span className="Merkelapp__slett__inner" />
                </button>
            )}
        </div>
    );
};

export default Merkelapp;
