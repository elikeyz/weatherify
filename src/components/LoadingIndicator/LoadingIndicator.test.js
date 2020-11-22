import { render, screen } from '@testing-library/react';
import LoadingIndicator from './index';

describe('LoadingIndicator', () => {
    test('renders header', () => {
        render(<LoadingIndicator />);
        const label = screen.getByText(/LOADING.../i);
        expect(label).toBeInTheDocument();
    });
});