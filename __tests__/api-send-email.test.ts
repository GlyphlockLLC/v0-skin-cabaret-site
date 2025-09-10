/**
 * @jest-environment node
 */

import { POST } from '@/app/api/send-email/route'
import { NextRequest } from 'next/server'

describe('/api/send-email', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const createMockRequest = (body: any, headers: Record<string, string> = {}, ip = '127.0.0.1') => {
    return {
      json: async () => body,
      ip,
      headers: {
        get: (name: string) => headers[name] || null,
      },
    } as NextRequest
  }

  describe('Rate Limiting', () => {
    it('allows requests within rate limit', async () => {
      const request = createMockRequest({
        type: 'Test Email',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john@example.com',
        message: 'Test message',
        website: '', // honeypot field
      })

      const response = await POST(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
    })

    it('blocks requests exceeding rate limit', async () => {
      const request = createMockRequest({
        type: 'Test Email',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john@example.com',
        message: 'Test message',
        website: '',
      })

      // Make multiple requests to exceed rate limit
      for (let i = 0; i < 6; i++) {
        await POST(request)
      }

      const response = await POST(request)
      expect(response.status).toBe(429)
      
      const data = await response.json()
      expect(data.error).toBe('Rate limit exceeded')
    })
  })

  describe('Input Validation', () => {
    it('rejects requests with missing required fields', async () => {
      const request = createMockRequest({
        type: 'Test Email',
        // Missing name and phone
        email: 'john@example.com',
        message: 'Test message',
      }, {}, '192.168.1.1')

      const response = await POST(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing required fields')
    })

    it('rejects requests with only type field', async () => {
      const request = createMockRequest({
        type: 'Test Email',
        // Missing name and phone
      }, {}, '192.168.1.2')

      const response = await POST(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing required fields')
    })

    it('accepts requests with all required fields', async () => {
      const request = createMockRequest({
        type: 'Test Email',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john@example.com',
        message: 'Test message',
        website: '',
      }, {}, '192.168.1.3')

      const response = await POST(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
    })
  })

  describe('Honeypot Protection', () => {
    it('rejects requests with honeypot field filled (silent success)', async () => {
      const request = createMockRequest({
        type: 'Test Email',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john@example.com',
        message: 'Test message',
        website: 'spam-value', // honeypot field filled by bot
      }, {}, '192.168.1.4')

      const response = await POST(request)
      
      // Honeypot protection returns 200 to fool bots
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
    })

    it('accepts requests with empty honeypot field', async () => {
      const request = createMockRequest({
        type: 'Test Email',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john@example.com',
        message: 'Test message',
        website: '', // honeypot field empty (human)
      }, {}, '192.168.1.5')

      const response = await POST(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
    })
  })

  describe('Different Request Types', () => {
    it('handles pickup service requests', async () => {
      const request = createMockRequest({
        type: 'Pickup Service Request',
        name: 'John Doe',
        phone: '(555) 123-4567',
        pickupLocation: 'Hotel Scottsdale',
        dropoffLocation: 'Skin Cabaret',
        desiredTime: '10:00 PM',
        message: 'VIP pickup please',
        website: '',
      }, {}, '192.168.1.6')

      const response = await POST(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
    })

    it('handles job applications', async () => {
      const request = createMockRequest({
        type: 'Job Application',
        name: 'Jane Smith',
        phone: '(555) 987-6543',
        email: 'jane@example.com',
        message: 'Position: Bartender Experience: 5 years Availability: Nights',
        website: '',
      }, {}, '192.168.1.7')

      const response = await POST(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('handles invalid JSON gracefully (still returns success)', async () => {
      const request = {
        json: async () => { throw new Error('Invalid JSON') },
        ip: '192.168.1.8',
        headers: {
          get: () => null,
        },
      } as NextRequest

      const response = await POST(request)
      
      // API returns success even on errors to not reveal implementation details
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.fallback).toBe(true)
    })

    it('handles missing request body (fallback success)', async () => {
      const request = createMockRequest(null, {}, '192.168.1.9')

      const response = await POST(request)
      
      // API returns success even with missing body to not reveal errors
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.fallback).toBe(true)
    })
  })
})