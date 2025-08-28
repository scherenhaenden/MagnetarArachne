import { TestBed } from '@angular/core/testing';
import { InjectionToken, Component } from '@angular/core';
import { API_BASE_URL } from './api-base-url.token';

describe('API_BASE_URL Token', () => {
  describe('Token Definition', () => {
    it('should be defined as InjectionToken', () => {
      expect(API_BASE_URL).toBeDefined();
      expect(API_BASE_URL instanceof InjectionToken).toBe(true);
    });

    it('should have correct token description', () => {
      expect(API_BASE_URL.toString()).toContain('API_BASE_URL');
    });
  });

  describe('Default Factory', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          // No custom value provided, using default factory
        ]
      });
    });

    it('should provide default value "/api" when no custom provider is given', () => {
      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe('/api');
    });

    it('should inject default value correctly in service', () => {
      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe('/api');
      expect(typeof baseUrl).toBe('string');
    });
  });

  describe('Custom Provider Override', () => {
    const customBaseUrl = 'https://custom-api.example.com';

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: API_BASE_URL, useValue: customBaseUrl }
        ]
      });
    });

    it('should allow custom value override', () => {
      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe(customBaseUrl);
    });

    it('should override default factory when custom provider is given', () => {
      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).not.toBe('/api');
      expect(baseUrl).toBe(customBaseUrl);
    });
  });

  describe('Factory Function Provider', () => {
    const dynamicBaseUrl = 'https://dynamic-api.com';

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: API_BASE_URL,
            useFactory: () => {
              // Simulate dynamic logic to get the URL
              const environment = 'production';
              return environment === 'production' ? dynamicBaseUrl : '/api';
            }
          }
        ]
      });
    });

    it('should work with factory provider', () => {
      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe(dynamicBaseUrl);
    });
  });

  describe('Multiple Test Scenarios', () => {
    it('should handle empty string override', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: API_BASE_URL, useValue: '' }
        ]
      });

      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe('');
      expect(typeof baseUrl).toBe('string');
    });

    it('should handle localhost override', () => {
      const localhostUrl = 'http://localhost:3000/api';

      TestBed.configureTestingModule({
        providers: [
          { provide: API_BASE_URL, useValue: localhostUrl }
        ]
      });

      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe(localhostUrl);
    });

    it('should handle relative path override', () => {
      const relativePath = '/v2/api';

      TestBed.configureTestingModule({
        providers: [
          { provide: API_BASE_URL, useValue: relativePath }
        ]
      });

      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe(relativePath);
    });

    it('should handle URL with port override', () => {
      const urlWithPort = 'https://api.example.com:8443/v1';

      TestBed.configureTestingModule({
        providers: [
          { provide: API_BASE_URL, useValue: urlWithPort }
        ]
      });

      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe(urlWithPort);
    });
  });

  describe('Token Properties', () => {
    it('should be properly typed as string', () => {
      TestBed.configureTestingModule({});

      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(typeof baseUrl).toBe('string');

      // TypeScript compile-time check
      const stringLength: number = baseUrl.length;
      expect(stringLength).toBeGreaterThanOrEqual(0);
    });

    it('should maintain immutability', () => {
      TestBed.configureTestingModule({});

      const baseUrl1 = TestBed.inject(API_BASE_URL);
      const baseUrl2 = TestBed.inject(API_BASE_URL);

      expect(baseUrl1).toBe(baseUrl2);
      expect(baseUrl1 === baseUrl2).toBe(true);
    });
  });

  describe('Integration with Dependency Injection', () => {
    it('should work with multiple injections', () => {
      const customUrl = 'https://multi-inject.test.com';

      TestBed.configureTestingModule({
        providers: [
          { provide: API_BASE_URL, useValue: customUrl }
        ]
      });

      // Inject multiple times
      const injection1 = TestBed.inject(API_BASE_URL);
      const injection2 = TestBed.inject(API_BASE_URL);
      const injection3 = TestBed.inject(API_BASE_URL);

      expect(injection1).toBe(customUrl);
      expect(injection2).toBe(customUrl);
      expect(injection3).toBe(customUrl);
      expect(injection1).toBe(injection2);
      expect(injection2).toBe(injection3);
    });

    it('should be available in child injectors', () => {
      const parentUrl = 'https://parent-injector.com';

      // Dummy component for the test
      @Component({ template: '' })
      class TestHostComponent {}

      // Configure the parent injector
      TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [{ provide: API_BASE_URL, useValue: parentUrl }],
      });

      // Create a component to get a child injector
      const fixture = TestBed.createComponent(TestHostComponent);
      const childInjector = fixture.debugElement.injector; // <-- FIX IS HERE

      const baseUrlFromParent = TestBed.inject(API_BASE_URL);
      const baseUrlFromChild = childInjector.get(API_BASE_URL);

      expect(baseUrlFromParent).toBe(parentUrl);
      expect(baseUrlFromChild).toBe(parentUrl);
      expect(baseUrlFromParent).toBe(baseUrlFromChild);
    });
  });

  describe('Error Scenarios', () => {
    it('should not throw when injected without explicit provider (uses default factory)', () => {
      TestBed.configureTestingModule({
        providers: [] // No explicit providers
      });

      expect(() => {
        const baseUrl = TestBed.inject(API_BASE_URL);
        expect(baseUrl).toBe('/api'); // Default factory
      }).not.toThrow();
    });
  });

  describe('Environment Simulation', () => {
    it('should simulate development environment', () => {
      const devUrl = 'http://localhost:4200/api';

      TestBed.configureTestingModule({
        providers: [
          {
            provide: API_BASE_URL,
            useFactory: () => {
              // Simulate environment.production = false
              return devUrl;
            }
          }
        ]
      });

      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe(devUrl);
    });

    it('should simulate production environment', () => {
      const prodUrl = 'https://api.production.com';

      TestBed.configureTestingModule({
        providers: [
          {
            provide: API_BASE_URL,
            useFactory: () => {
              // Simulate environment.production = true
              return prodUrl;
            }
          }
        ]
      });

      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe(prodUrl);
    });

    it('should simulate staging environment', () => {
      const stagingUrl = 'https://api.staging.com';

      TestBed.configureTestingModule({
        providers: [
          {
            provide: API_BASE_URL,
            useFactory: () => {
              // Simulate environment.staging = true
              return stagingUrl;
            }
          }
        ]
      });

      const baseUrl = TestBed.inject(API_BASE_URL);
      expect(baseUrl).toBe(stagingUrl);
    });
  });
});
