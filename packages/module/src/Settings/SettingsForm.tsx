import React from 'react';

export interface SettingsFormProps {
  /** Class applied to form container */
  className?: string;
  /** Array of fields to display in the settings layout */
  fields?: { id: string; label: string; field: React.ReactElement }[];
}

export const SettingsForm: React.FunctionComponent<SettingsFormProps> = ({ className, fields = [], ...props }) => (
  <div className={`pf-chatbot__settings-form-container ${className}`} {...props}>
    <form className="pf-chatbot__settings-form">
      {fields.map((field) => (
        <div className="pf-chatbot__settings-form-row" key={field.label}>
          <label className="pf-chatbot__settings-label" htmlFor={field.id}>
            {field.label}
          </label>
          {field.field}
        </div>
      ))}
    </form>
  </div>
);

export default SettingsForm;
