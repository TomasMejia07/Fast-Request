
import React from 'react';

export const PasswordInput = ({ id, name, label, placeholder, value, onChange, toggleVisibility, visible, err }) => (

    <div className="input-group password-group">
        <label htmlFor={id} className="input-label">
            {label}
        </label>

        <div className="password-wrapper">
            <input
                type={visible ? "text" : "password"}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onCopy={(e) => e.preventDefault()}
                className={`password-input`}
            />

            <span
                className="toggle-visibility"
                onClick={() => toggleVisibility(id)}
            >
                <ion-icon name={visible ? "eye-off-outline" : "eye-outline"}></ion-icon>
            </span>
        </div>

        {err && (
            <span style={{ color: 'red'}}>
                {err}
            </span>
        )}
    </div>
);