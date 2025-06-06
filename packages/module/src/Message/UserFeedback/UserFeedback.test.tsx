import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UserFeedback from './UserFeedback';

const MOCK_RESPONSES = [
  { id: '1', content: 'Helpful information', onClick: () => alert('Clicked helpful information') },
  { id: '2', content: 'Easy to understand', onClick: () => alert('Clicked easy to understand') },
  { id: '3', content: 'Resolved my issue', onClick: () => alert('Clicked resolved my issue') }
];

describe('UserFeedback', () => {
  it('should render correctly', () => {
    render(<UserFeedback onClose={jest.fn} onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timestamp="12/12/12" />);
    expect(screen.getByRole('heading', { name: /Why did you choose this rating?/i })).toBeTruthy();
    expect(screen.getByRole('list', { name: 'Quick feedback for message received at 12/12/12' })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Helpful information/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Easy to understand/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Resolved my issue/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Close feedback for message received at 12/12/12' })).toBeTruthy();
    expect(screen.queryByRole('textbox', { name: /Provide optional additional feedback/i })).toBeFalsy();
  });
  it('should render different title correctly', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        title="Thanks! Why?"
      />
    );
    expect(screen.getByText('Thanks! Why?')).toBeTruthy();
  });
  it('should render different submit button text correctly', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        submitWord="Give feedback"
      />
    );
    expect(screen.getByRole('button', { name: /Give feedback/i })).toBeTruthy();
  });
  it('should render text area correctly', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        hasTextArea
      />
    );
    expect(screen.getByRole('textbox', { name: /Provide optional additional feedback/i })).toBeTruthy();
  });
  it('should call onTextAreaChange correctly', async () => {
    const spy = jest.fn();
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        hasTextArea
        onTextAreaChange={spy}
      />
    );
    const textbox = screen.getByRole('textbox', { name: /Provide optional additional feedback/i });
    await userEvent.type(textbox, 'test');
    expect(spy).toHaveBeenCalledTimes(4);
  });
  it('should render different placeholder correctly', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        hasTextArea
        textAreaPlaceholder="Provide any other information"
      />
    );
    expect(screen.getByRole('textbox', { name: /Provide optional additional feedback/i })).toHaveAttribute(
      'placeholder',
      'Provide any other information'
    );
  });
  it('should render different text area label correctly', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        hasTextArea
        textAreaAriaLabel="Provide more details"
      />
    );
    expect(screen.getByRole('textbox', { name: /Provide more details/i })).toBeTruthy();
  });
  it('should handle onClose correctly when close button is clicked', async () => {
    const spy = jest.fn();
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} onClose={spy} timestamp="12/12/12" />);
    const closeButton = screen.getByRole('button', { name: 'Close feedback for message received at 12/12/12' });
    expect(closeButton).toBeTruthy();
    await userEvent.click(closeButton);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should be able to change close button aria label', () => {
    const spy = jest.fn();
    render(
      <UserFeedback
        timestamp="12/12/12"
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        onClose={spy}
        closeButtonAriaLabel="Ima button"
      />
    );
    expect(screen.getByRole('button', { name: /Ima button/i })).toBeTruthy();
  });
  it('should handle className', async () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        className="test"
        data-testid="card"
      />
    );
    expect(screen.getByTestId('card')).toHaveClass('test');
  });
  it('should apply id', async () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        id="test"
        data-testid="card"
      />
    );
    expect(screen.getByTestId('card').parentElement).toHaveAttribute('id', 'test');
  });
  it('should handle submit correctly when nothing is selected', async () => {
    const spy = jest.fn();
    render(<UserFeedback timestamp="12/12/12" onClose={jest.fn} onSubmit={spy} quickResponses={MOCK_RESPONSES} />);
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(undefined, '');
  });
  it('should handle submit correctly when item is selected', async () => {
    const spy = jest.fn();
    render(<UserFeedback timestamp="12/12/12" onClose={jest.fn} onSubmit={spy} quickResponses={MOCK_RESPONSES} />);
    await userEvent.click(screen.getByRole('button', { name: /Easy to understand/i }));
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('2', '');
  });
  it('should handle submit correctly when there is just text input', async () => {
    const spy = jest.fn();
    render(
      <UserFeedback timestamp="12/12/12" onClose={jest.fn} onSubmit={spy} quickResponses={MOCK_RESPONSES} hasTextArea />
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /Provide optional additional feedback/i }),
      'What a great experience!'
    );
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(undefined, 'What a great experience!');
  });
  it('should handle submit correctly when item is selected and there is text input', async () => {
    const spy = jest.fn();
    render(
      <UserFeedback timestamp="12/12/12" onClose={jest.fn} onSubmit={spy} quickResponses={MOCK_RESPONSES} hasTextArea />
    );
    await userEvent.click(screen.getByRole('button', { name: /Easy to understand/i }));
    await userEvent.type(
      screen.getByRole('textbox', { name: /Provide optional additional feedback/i }),
      'What a great experience!'
    );
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('2', 'What a great experience!');
  });
  it('should default title heading level to h1', () => {
    render(<UserFeedback timestamp="12/12/12" onClose={jest.fn} onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} />);
    expect(screen.getByRole('heading', { level: 1, name: /Why did you choose this rating?/i })).toBeTruthy();
  });
  it('should be able to change title heading level', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        headingLevel="h6"
      />
    );
    expect(screen.getByRole('heading', { level: 6, name: /Why did you choose this rating?/i })).toBeTruthy();
  });
  it('should focus on load by default', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        data-testid="card"
      />
    );
    expect(screen.getByTestId('card').parentElement).toHaveFocus();
  });
  it('should not focus on load if focusOnLoad = false', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        data-testid="card"
        focusOnLoad={false}
      />
    );
    expect(screen.getByTestId('card').parentElement).not.toHaveFocus();
  });
  it('should handle isCompact', () => {
    render(
      <UserFeedback
        timestamp="12/12/12"
        onClose={jest.fn}
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        data-testid="card"
        isCompact
      />
    );
    expect(screen.getByTestId('card')).toHaveClass('pf-m-compact');
  });
});
