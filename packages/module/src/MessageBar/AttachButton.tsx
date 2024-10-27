// ============================================================================
// Chatbot Footer - Message Bar - Attach
// ============================================================================
import React from 'react';

// Import PatternFly components
import { Button, ButtonProps, DropEvent, Icon, Tooltip, TooltipProps } from '@patternfly/react-core';
import { useDropzone } from 'react-dropzone';
import { PaperclipIcon } from '@patternfly/react-icons/dist/esm/icons/paperclip-icon';

export interface AttachButtonProps extends ButtonProps {
  /** Callback for when button is clicked */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback function for AttachButton when an attachment is made */
  onAttachAccepted?: (data: File[], event: DropEvent) => void;
  /** Class name for AttachButton */
  className?: string;
  /** Props to control if the AttachButton should be disabled */
  isDisabled?: boolean;
  /** Props to control the PF Tooltip component */
  tooltipProps?: TooltipProps;
  /** Ref applied to AttachButton and used in tooltip */
  innerRef?: React.Ref<any>;
  /** English text "Attach" used in the tooltip */
  tooltipContent?: string;
}

const AttachButtonBase: React.FunctionComponent<AttachButtonProps> = ({
  onAttachAccepted,
  onClick,
  isDisabled,
  className,
  tooltipProps,
  innerRef,
  tooltipContent = 'Attach',
  ...props
}: AttachButtonProps) => {
  const { open, getInputProps } = useDropzone({
    multiple: true,
    onDropAccepted: onAttachAccepted
  });

  return (
    <>
      {/* this is required for react-dropzone to work in Safari and Firefox */}
      <input {...getInputProps()} />
      <Tooltip
        id="pf-chatbot__tooltip--attach"
        content={tooltipContent}
        position="top"
        entryDelay={tooltipProps?.entryDelay || 0}
        exitDelay={tooltipProps?.exitDelay || 0}
        distance={tooltipProps?.distance || 8}
        animationDuration={tooltipProps?.animationDuration || 0}
        {...tooltipProps}
      >
        <Button
          variant="plain"
          ref={innerRef}
          className={`pf-chatbot__button--attach ${className ?? ''}`}
          aria-label={props['aria-label'] || 'Attach button'}
          isDisabled={isDisabled}
          onClick={onClick ?? open}
          icon={
            <Icon iconSize="xl" isInline>
              <PaperclipIcon />
            </Icon>
          }
          {...props}
        />
      </Tooltip>
    </>
  );
};

export const AttachButton = React.forwardRef((props: AttachButtonProps, ref: React.Ref<any>) => (
  <AttachButtonBase innerRef={ref} {...props} />
));
