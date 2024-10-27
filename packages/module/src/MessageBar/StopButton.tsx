// ============================================================================
// Chatbot Footer - Message Bar - Send
// ============================================================================
import React from 'react';

// Import PatternFly components
import { Button, ButtonProps, Tooltip, TooltipProps, Icon } from '@patternfly/react-core';

export interface StopButtonProps extends ButtonProps {
  /** Callback for when button is clicked */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Class name for StopButton */
  className?: string;
  /** Props to control the PF Tooltip component */
  tooltipProps?: TooltipProps;
  /** English text "Stop" used in the tooltip */
  tooltipContent?: string;
}

export const StopButton: React.FunctionComponent<StopButtonProps> = ({
  className,
  onClick,
  tooltipProps,
  tooltipContent = 'Send',
  ...props
}: StopButtonProps) => (
  <Tooltip
    id="pf-chatbot__tooltip--send"
    content={tooltipContent}
    position={tooltipProps?.position || 'top'}
    entryDelay={tooltipProps?.entryDelay || 0}
    exitDelay={tooltipProps?.exitDelay || 0}
    distance={tooltipProps?.distance || 8}
    animationDuration={tooltipProps?.animationDuration || 0}
    {...tooltipProps}
  >
    <Button
      className={`pf-chatbot__button--stop ${className ?? ''}`}
      variant="link"
      aria-label={props['aria-label'] || 'Stop button'}
      onClick={onClick}
      icon={
        <Icon iconSize="xl" isInline>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.5 3C0.5 1.62109 1.62109 0.5 3 0.5H13C14.3789 0.5 15.5 1.62109 15.5 3V13C15.5 14.3789 14.3789 15.5 13 15.5H3C1.62109 15.5 0.5 14.3789 0.5 13V3Z"
              fill="currentColor"
            />
          </svg>
        </Icon>
      }
      {...props}
    />
  </Tooltip>
);

export default StopButton;
