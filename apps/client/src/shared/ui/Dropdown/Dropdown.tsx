import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

export type DropdownItem = {
    href?: string;
    content: ReactNode;
    action?: () => void;
    className?: string;
};

type DropdownProps = {
    trigger: ReactNode;
    items: DropdownItem[];
};
export const Dropdown = ({ trigger, items }: DropdownProps) => {
    return (
        <div className="ms-4 dropdown">
            <button
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {trigger}
            </button>
            <div
                className="dropdown-menu w-100"
                aria-labelledby="dropDownMenuButton"
            >
                {items.map((item) => {
                    if (item.href) {
                        return (
                            <NavLink className="dropdown-item" to={item.href}>
                                {item.content}
                            </NavLink>
                        );
                    }

                    return (
                        <button className="dropdown-item" onClick={item.action}>
                            {item.content}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
