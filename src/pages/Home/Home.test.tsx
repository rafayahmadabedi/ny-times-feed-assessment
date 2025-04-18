import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from './index';
import useFetch from '../../hooks/useFetch';
import { FetchStatus } from '../../types/fetch-status.enum';

jest.mock('../../hooks/useFetch');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe('Home Page', () => {
  const mockArticles = {
    results: [
      { id: 1, title: 'Article 1', abstract: 'Abstract 1', published_date: '2023-01-01' },
      { id: 2, title: 'Article 2', abstract: 'Abstract 2', published_date: '2023-01-02' },
    ],
  };

  beforeEach(() => {
    mockUseFetch.mockReturnValue({
      data: mockArticles,
      status: FetchStatus.SUCCESS,
      error: null,
    });
  });

  it('should render loading state', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      status: FetchStatus.LOADING,
      error: null,
    });

    render(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render articles when loaded', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
      expect(screen.getByText('Article 2')).toBeInTheDocument();
    });
  });

  it('should change period when day buttons are clicked', async () => {
    render(<Home />);
    
    fireEvent.click(screen.getByText('1 Day'));
    expect(mockUseFetch).toHaveBeenCalledTimes(2);
    
    fireEvent.click(screen.getByText('30 Days'));
    expect(mockUseFetch).toHaveBeenCalledTimes(3);
  });

  it('should show error message when fetch fails', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      status: FetchStatus.ERROR,
      error: 'Failed to load',
    });

    render(<Home />);
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
});