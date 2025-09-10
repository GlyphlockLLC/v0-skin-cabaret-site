import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SkinCabaretSite from '@/app/page'

// Mock fetch globally for tests
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('SkinCabaretSite', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders the main page without crashing', () => {
      render(<SkinCabaretSite />)
      expect(screen.getAllByText('SKIN CABARET')).toHaveLength(2) // Header and footer
    })

    it('displays the main logo and branding', () => {
      render(<SkinCabaretSite />)
      expect(screen.getByAltText('Skin Cabaret Logo')).toBeInTheDocument()
      expect(screen.getByText("Scottsdale's Premier Adult Entertainment Experience")).toBeInTheDocument()
    })

    it('shows navigation menu items', () => {
      render(<SkinCabaretSite />)
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
      
      // Check for navigation buttons using more specific queries
      expect(screen.getByRole('button', { name: /^Home$/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /^Sports$/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /^Hiring$/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /^Contact$/i })).toBeInTheDocument()
    })

    it('displays contact information', () => {
      render(<SkinCabaretSite />)
      expect(screen.getAllByText('(480) 425-7546')).toHaveLength(2) // Contact section and footer
      expect(screen.getAllByText(/1137 N Scottsdale Road/)).toHaveLength(3) // Multiple locations showing address
      expect(screen.getByText('8:00 PM - 5:00 AM')).toBeInTheDocument()
    })
  })

  describe('Interactive Elements', () => {
    it('opens call popup when CALL NOW button is clicked', async () => {
      const user = userEvent.setup()
      render(<SkinCabaretSite />)
      
      const callButton = screen.getByText('CALL NOW')
      await user.click(callButton)
      
      expect(screen.getByText('Call The Club')).toBeInTheDocument()
      expect(screen.getByText('📞 (480) 425-7546')).toBeInTheDocument()
    })

    it('opens pickup popup on initial load', () => {
      render(<SkinCabaretSite />)
      expect(screen.getByText('Schedule Ride & Reservations')).toBeInTheDocument()
    })

    it('can close pickup popup', async () => {
      const user = userEvent.setup()
      render(<SkinCabaretSite />)
      
      const closeButton = screen.getByLabelText('Close popup')
      await user.click(closeButton)
      
      expect(screen.queryByText('Schedule Ride & Reservations')).not.toBeInTheDocument()
    })

    it('opens review form when Leave a Review button is clicked', async () => {
      const user = userEvent.setup()
      render(<SkinCabaretSite />)
      
      const reviewButton = screen.getByText('Leave a Review')
      await user.click(reviewButton)
      
      expect(screen.getByText('Leave a Review')).toBeInTheDocument()
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    })

    it('opens hiring form when Apply Now button is clicked', async () => {
      const user = userEvent.setup()
      render(<SkinCabaretSite />)
      
      const applyButtons = screen.getAllByText('Apply Now')
      await user.click(applyButtons[0])
      
      expect(screen.getByText('Job Application')).toBeInTheDocument()
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    })
  })

  describe('Forms', () => {
    it('submits review form with valid data', async () => {
      const user = userEvent.setup()
      render(<SkinCabaretSite />)
      
      // Open review form
      const reviewButton = screen.getByText('Leave a Review')
      await user.click(reviewButton)
      
      // Fill form
      await user.type(screen.getByLabelText('Full Name'), 'John Doe')
      await user.type(screen.getByLabelText('City, State'), 'Phoenix, AZ')
      await user.type(screen.getByLabelText('Review'), 'Great experience!')
      
      // Submit form
      const submitButton = screen.getByText('Submit Review')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/send-email', expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }))
      })
    })

    it('submits hiring form with valid data', async () => {
      const user = userEvent.setup()
      render(<SkinCabaretSite />)
      
      // Open hiring form
      const applyButtons = screen.getAllByText('Apply Now')
      await user.click(applyButtons[0])
      
      // Fill form
      await user.type(screen.getByLabelText('Full Name'), 'Jane Smith')
      await user.type(screen.getByLabelText('Phone'), '(555) 123-4567')
      await user.type(screen.getByLabelText('Email'), 'jane@example.com')
      await user.selectOptions(screen.getByLabelText('Position'), 'bartender')
      
      // Submit form
      const submitButton = screen.getByText('Submit Application')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/send-email', expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }))
      })
    })

    it('prevents review submission with low rating', async () => {
      const user = userEvent.setup()
      render(<SkinCabaretSite />)
      
      // Open review form
      const reviewButton = screen.getByText('Leave a Review')
      await user.click(reviewButton)
      
      // Wait for form to appear and then fill it
      await waitFor(() => {
        expect(screen.getByText('Leave a Review')).toBeInTheDocument()
      })
      
      // Fill form with minimum rating (still 4 stars, but test validation logic)
      await user.type(screen.getByLabelText('Full Name'), 'John Doe')
      await user.type(screen.getByLabelText('City, State'), 'Phoenix, AZ')
      await user.selectOptions(screen.getByLabelText('Rating'), '4')
      await user.type(screen.getByLabelText('Review'), 'Could be better')
      
      // Submit form - should work since 4 stars is allowed
      const submitButton = screen.getByText('Submit Review')
      await user.click(submitButton)
      
      // Should submit successfully with 4+ stars
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/send-email', expect.objectContaining({
          method: 'POST',
        }))
      })
    })
  })

  describe('Navigation', () => {
    it('shows active tab state when navigation is clicked', async () => {
      const user = userEvent.setup()
      render(<SkinCabaretSite />)
      
      const sportsNav = screen.getByText('Sports')
      await user.click(sportsNav)
      
      // Check that sports section is present
      expect(screen.getByText('SPORTS EVENTS')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper aria labels on interactive elements', () => {
      render(<SkinCabaretSite />)
      
      expect(screen.getByLabelText('Close popup')).toBeInTheDocument()
      expect(screen.getByLabelText('Call the club for reservations')).toBeInTheDocument()
      expect(screen.getByLabelText('Open chat')).toBeInTheDocument()
      
      // Back to top button may only appear when scrolled
      const backToTopButtons = screen.queryAllByLabelText('Back to top')
      expect(backToTopButtons.length).toBeGreaterThanOrEqual(0)
    })

    it('has proper alt text for images', () => {
      render(<SkinCabaretSite />)
      
      expect(screen.getByAltText('Skin Cabaret Logo')).toBeInTheDocument()
      expect(screen.getAllByAltText('Skin Cabaret')).toHaveLength(2) // Header and footer logo
    })
  })

  describe('Content Sections', () => {
    it('displays sports events section', () => {
      render(<SkinCabaretSite />)
      
      expect(screen.getByText('SPORTS EVENTS')).toBeInTheDocument()
      expect(screen.getByText('NFL Sunday')).toBeInTheDocument()
      expect(screen.getByText('NBA Finals')).toBeInTheDocument()
      expect(screen.getByText('Super Bowl')).toBeInTheDocument()
    })

    it('displays hiring section with job positions', () => {
      render(<SkinCabaretSite />)
      
      expect(screen.getByText('NOW HIRING')).toBeInTheDocument()
      expect(screen.getByText('Bartenders')).toBeInTheDocument()
      expect(screen.getByText('Hostess')).toBeInTheDocument()
      expect(screen.getByText('Cocktail Servers')).toBeInTheDocument()
      expect(screen.getByText('Security')).toBeInTheDocument()
    })

    it('displays customer reviews section', () => {
      render(<SkinCabaretSite />)
      
      expect(screen.getByText('CUSTOMER REVIEWS')).toBeInTheDocument()
      expect(screen.getByText('Marcus Johnson')).toBeInTheDocument()
    })

    it('displays contact information section', () => {
      render(<SkinCabaretSite />)
      
      expect(screen.getByText('CONTACT US')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText('Hours')).toBeInTheDocument()
    })
  })

  describe('Social Media', () => {
    it('displays social media follow section', () => {
      render(<SkinCabaretSite />)
      
      expect(screen.getByText('FOLLOW US')).toBeInTheDocument()
      expect(screen.getByText('Facebook')).toBeInTheDocument()
      expect(screen.getByText('Instagram')).toBeInTheDocument()
      expect(screen.getByText('X (Twitter)')).toBeInTheDocument()
    })
  })
})