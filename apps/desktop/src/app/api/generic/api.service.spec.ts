import { TestBed } from '@angular/core/testing';
// Importación añadida para proveer el servicio HttpClient
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ApiService, RequestOptions } from './api.service';
import { API_BASE_URL } from './api-base-url.token';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const mockBaseUrl = 'https://api.example.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // <-- LÍNEA AÑADIDA: Provee el HttpClient real
        provideHttpClientTesting(), // Esto intercepta las llamadas para los tests
        ApiService,
        { provide: API_BASE_URL, useValue: mockBaseUrl }
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no hay solicitudes HTTP pendientes
    httpMock.verify();
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should inject the base URL correctly', () => {
      // Verifica indirectamente que el baseUrl se inyectó correctamente
      service.get('/test').subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test`);
      expect(req.request.url).toBe(`${mockBaseUrl}/test`);

      req.flush({});
    });
  });

  describe('GET Method', () => {
    it('should make a GET request with default headers', () => {
      const mockResponse = { data: 'test' };

      service.get<typeof mockResponse>('/test').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/test`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');

      req.flush(mockResponse);
    });

    it('should make a GET request with custom headers', () => {
      const customHeaders = new HttpHeaders({ 'Authorization': 'Bearer token' });
      const options: RequestOptions = { headers: customHeaders };

      service.get('/test', options).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer token');

      req.flush({});
    });

    it('should make a GET request with query parameters as HttpParams', () => {
      const params = new HttpParams().set('page', '1').set('limit', '10');
      const options: RequestOptions = { params };

      service.get('/test', options).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test?page=1&limit=10`);
      expect(req.request.method).toBe('GET');

      req.flush({});
    });

    it('should make a GET request with query parameters as object', () => {
      const params = { page: 1, limit: 10, active: true };
      const options: RequestOptions = { params };

      service.get('/test', options).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test?page=1&limit=10&active=true`);

      req.flush({});
    });

    it('should handle GET request error', () => {
      const errorMessage = 'Not Found';

      service.get('/test').subscribe({
        next: () => fail('Should have failed'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/test`);
      req.flush('Not Found', { status: 404, statusText: errorMessage });
    });
  });

  describe('POST Method', () => {
    it('should make a POST request with body and default headers', () => {
      const mockBody = { name: 'test' };
      const mockResponse = { id: 1, ...mockBody };

      service.post<typeof mockResponse, typeof mockBody>('/test', mockBody).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/test`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockBody);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');

      req.flush(mockResponse);
    });

    it('should make a POST request with custom headers and params', () => {
      const customHeaders = new HttpHeaders({ 'X-Custom-Header': 'custom-value' });
      const params = { version: '1.0' };
      const options: RequestOptions = { headers: customHeaders, params };
      const mockBody = { data: 'test' };

      service.post('/test', mockBody, options).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test?version=1.0`);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('X-Custom-Header')).toBe('custom-value');
      expect(req.request.body).toEqual(mockBody);

      req.flush({});
    });

    it('should handle POST request error', () => {
      const mockBody = { data: 'test' };

      service.post('/test', mockBody).subscribe({
        next: () => fail('Should have failed'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
        }
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/test`);
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('PUT Method', () => {
    it('should make a PUT request with body and default headers', () => {
      const mockBody = { id: 1, name: 'updated' };
      const mockResponse = { ...mockBody, updatedAt: '2023-01-01' };

      service.put<typeof mockResponse, typeof mockBody>('/test/1', mockBody).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/test/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockBody);

      req.flush(mockResponse);
    });

    it('should make a PUT request with all options', () => {
      const customHeaders = new HttpHeaders({ 'If-Match': 'etag-value' });
      const params = { force: true };
      const options: RequestOptions = { headers: customHeaders, params };
      const mockBody = { name: 'updated' };

      service.put('/test/1', mockBody, options).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test/1?force=true`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('If-Match')).toBe('etag-value');

      req.flush({});
    });

    it('should handle PUT request error', () => {
      const mockBody = { name: 'test' };

      service.put('/test/1', mockBody).subscribe({
        next: () => fail('Should have failed'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(409);
        }
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/test/1`);
      req.flush('Conflict', { status: 409, statusText: 'Conflict' });
    });
  });

  describe('DELETE Method', () => {
    it('should make a DELETE request with default headers', () => {
      service.delete('/test/1').subscribe(response => {
        expect(response).toEqual({});
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/test/1`);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');

      req.flush({});
    });

    it('should make a DELETE request with options', () => {
      const customHeaders = new HttpHeaders({ 'X-Reason': 'cleanup' });
      const params = { cascade: true };
      const options: RequestOptions = { headers: customHeaders, params };

      service.delete('/test/1', options).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test/1?cascade=true`);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('X-Reason')).toBe('cleanup');

      req.flush({});
    });

    it('should handle DELETE request error', () => {
      service.delete('/test/1').subscribe({
        next: () => fail('Should have failed'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(403);
        }
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/test/1`);
      req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });
    });
  });

  describe('URL Resolution (private full method)', () => {
    it('should handle empty endpoint', () => {
      service.get('').subscribe();

      const req = httpMock.expectOne(mockBaseUrl);
      expect(req.request.url).toBe(mockBaseUrl);

      req.flush({});
    });

    it('should handle relative endpoint', () => {
      service.get('/users').subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/users`);
      expect(req.request.url).toBe(`${mockBaseUrl}/users`);

      req.flush({});
    });

    it('should handle absolute URL (starts with http)', () => {
      const absoluteUrl = 'https://external-api.com/data';

      service.get(absoluteUrl).subscribe();

      const req = httpMock.expectOne(absoluteUrl);
      expect(req.request.url).toBe(absoluteUrl);

      req.flush({});
    });

    it('should handle absolute URL (starts with https)', () => {
      const absoluteUrl = 'https://secure-api.com/data';

      service.get(absoluteUrl).subscribe();

      const req = httpMock.expectOne(absoluteUrl);
      expect(req.request.url).toBe(absoluteUrl);

      req.flush({});
    });
  });

  describe('Parameter Building (private buildParams method)', () => {
    it('should handle undefined params', () => {
      service.get('/test', { params: undefined }).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test`);
      expect(req.request.url).toBe(`${mockBaseUrl}/test`);

      req.flush({});
    });

    it('should handle HttpParams instance', () => {
      const params = new HttpParams().set('key', 'value');

      service.get('/test', { params }).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test?key=value`);

      req.flush({});
    });

    it('should handle object params with null values (should be ignored)', () => {
      const params = {
        valid: 'value',
        nullValue: null,
        undefinedValue: undefined,
        emptyString: ''
      };

      service.get('/test', { params }).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test?valid=value&emptyString=`);

      req.flush({});
    });

    it('should handle array values in params', () => {
      const params = {
        tags: ['tag1', 'tag2', 'tag3'],
        categories: [1, 2, 3]
      };

      service.get('/test', { params }).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test?tags=tag1&tags=tag2&tags=tag3&categories=1&categories=2&categories=3`);

      req.flush({});
    });

    it('should handle object values in params (JSON stringify)', () => {
      const complexObject = { nested: { key: 'value' }, array: [1, 2, 3] };
      const params = {
        filter: complexObject,
        simple: 'value'
      };

      service.get('/test', { params }).subscribe();

      const expectedJsonString = JSON.stringify(complexObject);
      const req = httpMock.expectOne((req) => req.url.includes(`filter=${encodeURIComponent(expectedJsonString)}`) && req.url.includes('simple=value'));

      req.flush({});
    });

    it('should handle mixed param types', () => {
      const params = {
        string: 'text',
        number: 42,
        boolean: true,
        array: ['a', 'b'],
        object: { key: 'value' },
        nullValue: null
      };

      service.get('/test', { params }).subscribe();

      const req = httpMock.expectOne((req) => {
        return req.url.includes('string=text') &&
          req.url.includes('number=42') &&
          req.url.includes('boolean=true') &&
          req.url.includes('array=a') &&
          req.url.includes('array=b') &&
          req.url.includes('object=') &&
          !req.url.includes('nullValue');
      });

      req.flush({});
    });

    it('should handle empty array in params', () => {
      const params = {
        emptyArray: [],
        normalValue: 'test'
      };

      service.get('/test', { params }).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test?normalValue=test`);

      req.flush({});
    });
  });

  describe('Error Handling (private handleError method)', () => {
    it('should rethrow HttpErrorResponse as-is', () => {
      let capturedError: HttpErrorResponse | undefined;

      service.get('/error-endpoint').subscribe({
        next: () => fail('Should have failed'),
        error: (error: HttpErrorResponse) => {
          capturedError = error;
        }
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/error-endpoint`);

      req.error(new ProgressEvent('error'), {
        status: 500,
        statusText: 'Internal Server Error'
      });

      expect(capturedError).toBeDefined();
      expect(capturedError?.status).toBe(500);
    });

    it('should handle network error', () => {
      let capturedError: HttpErrorResponse | undefined;

      service.get('/network-error').subscribe({
        next: () => fail('Should have failed'),
        error: (error: HttpErrorResponse) => {
          capturedError = error;
        }
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/network-error`);
      req.error(new ProgressEvent('network error'));

      expect(capturedError).toBeDefined();
      expect(capturedError?.status).toBe(0);
    });

    it('should handle timeout error', () => {
      let capturedError: HttpErrorResponse | undefined;

      service.get('/timeout').subscribe({
        next: () => fail('Should have failed'),
        error: (error: HttpErrorResponse) => {
          capturedError = error;
        }
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/timeout`);
      req.error(new ProgressEvent('timeout'), {
        status: 0,
        statusText: 'Unknown Error'
      });

      expect(capturedError).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete workflow with all features', () => {
      const customHeaders = new HttpHeaders({
        'Authorization': 'Bearer token',
        'X-Client-Version': '1.0.0'
      });

      const params = {
        page: 1,
        filters: { status: 'active', type: ['user', 'admin'] },
        expand: ['profile', 'permissions']
      };

      const mockResponse = {
        data: [{ id: 1, name: 'User 1' }],
        pagination: { page: 1, total: 100 }
      };

      service.get('/users', { headers: customHeaders, params }).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne((req) => {
        return req.url.includes('/users') &&
          req.url.includes('page=1') &&
          req.url.includes('expand=profile') &&
          req.url.includes('expand=permissions');
      });

      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer token');
      expect(req.request.headers.get('X-Client-Version')).toBe('1.0.0');

      req.flush(mockResponse);
    });

    it('should chain multiple requests correctly', () => {
      // Primera petición
      service.get<{ userId: number }>('/auth/me').subscribe(user => {
        // Segunda petición basada en la primera
        service.get(`/users/${user.userId}/profile`).subscribe();
      });

      // Verificar primera petición
      const firstReq = httpMock.expectOne(`${mockBaseUrl}/auth/me`);
      firstReq.flush({ userId: 123 });

      // Verificar segunda petición
      const secondReq = httpMock.expectOne(`${mockBaseUrl}/users/123/profile`);
      secondReq.flush({ name: 'John Doe' });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty object params', () => {
      service.get('/test', { params: {} }).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/test`);
      expect(req.request.url).toBe(`${mockBaseUrl}/test`);

      req.flush({});
    });

    it('should handle params with special characters', () => {
      const params = {
        query: 'hello world & more',
        filter: 'key=value&other=test'
      };

      service.get('/search', { params }).subscribe();

      const req = httpMock.expectOne((req) => {
        return req.url.includes('/search') &&
          req.url.includes('query=') &&
          req.url.includes('filter=');
      });

      req.flush({});
    });

    it('should handle very large request body', () => {
      const largeBody = {
        data: new Array(1000).fill(0).map((_, i) => ({
          id: i,
          name: `Item ${i}`,
          description: 'A'.repeat(100)
        }))
      };

      service.post('/bulk-create', largeBody).subscribe();

      const req = httpMock.expectOne(`${mockBaseUrl}/bulk-create`);
      expect(req.request.body).toEqual(largeBody);

      req.flush({ created: 1000 });
    });
  });
});
