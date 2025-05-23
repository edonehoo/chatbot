import { Button, Flex } from '@patternfly/react-core';
import type { FunctionComponent } from 'react';

interface QuickStartTileHeaderProps {
  /** Name for the header */
  name: string;
  /** Id for the QuickStart */
  quickStartId?: string;
  /** Callback for when the name of the QuickStart is clicked */
  onSelect: (e: React.FormEvent<HTMLInputElement> | React.MouseEvent<Element, MouseEvent>) => void;
}

const QuickStartTileHeader: FunctionComponent<QuickStartTileHeaderProps> = ({ name, quickStartId, onSelect }) => (
  <Flex flexWrap={{ default: 'nowrap' }}>
    <Button data-test="title" id={quickStartId} variant="link" isInline onClick={onSelect}>
      {name}
    </Button>
  </Flex>
);

export default QuickStartTileHeader;
