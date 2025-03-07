import React from 'react';
import FileDetailsLabel from '@patternfly/chatbot/dist/dynamic/FileDetailsLabel';
import { Radio } from '@patternfly/react-core/dist/dynamic/Radio';
import { FormGroup } from '@patternfly/react-core/dist/dynamic/FormGroup';
import { Stack } from '@patternfly/react-core/dist/dynamic/Stack';

export const FileDetailsLabelExample: React.FunctionComponent = () => {
  const [variant, setVariant] = React.useState('plain');

  return (
    <Stack hasGutter>
      <FormGroup role="radiogroup" isInline fieldId="basic-form-radio-group" label="Variant">
        <Radio
          isChecked={variant === 'plain'}
          onChange={() => setVariant('plain')}
          name="basic-inline-radio"
          label="Plain"
          id="plain"
        />
        <Radio
          isChecked={variant === 'closeable'}
          onChange={() => setVariant('closeable')}
          name="basic-inline-radio"
          label="Closeable"
          id="closeable"
        />
        <Radio
          isChecked={variant === 'clickable'}
          onChange={() => setVariant('clickable')}
          name="basic-inline-radio"
          label="Clickable"
          id="clickable"
        />
        <Radio
          isChecked={variant === 'loading'}
          onChange={() => setVariant('loading')}
          name="basic-inline-radio"
          label="Loading"
          id="loading"
        />
      </FormGroup>
      <div className="pf-chatbot__file-details-example">
        <FileDetailsLabel
          fileName="auth-operator.yml"
          // eslint-disable-next-line no-console
          {...(variant === 'closeable' && { onClose: () => console.log('clicked close button!') })}
          // eslint-disable-next-line no-console
          {...(variant === 'clickable' && { onClick: () => console.log('clicked entire button!') })}
          {...(variant === 'loading' && { isLoading: true })}
        />
      </div>
    </Stack>
  );
};
