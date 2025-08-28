import { Inject, Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_BASE_URL } from './api-base-url.token';

export type QueryParams = HttpParams | Record<string, unknown> | undefined;

export interface RequestOptions {
  readonly headers?: HttpHeaders;
  readonly params?: QueryParams;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected http = inject(HttpClient);
  protected baseUrl = inject(API_BASE_URL);

  /** Default HTTP headers for JSON content */
  private readonly defaultHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  /** GET */
  public get<T>(url: string, options?: RequestOptions): Observable<T> {
    const finalUrl: string = this.full(url);
    const headers: HttpHeaders = options?.headers ?? this.defaultHeaders;
    const params: HttpParams | undefined = this.buildParams(options?.params);

    return this.http
      .get<T>(finalUrl, { headers, params })
      .pipe(catchError((e) => this.handleError(e)));
  }

  /** POST */
  public post<T, U>(
    url: string,
    body: U,
    options?: RequestOptions
  ): Observable<T> {
    const finalUrl: string = this.full(url);
    const headers: HttpHeaders = options?.headers ?? this.defaultHeaders;
    const params: HttpParams | undefined = this.buildParams(options?.params);

    return this.http
      .post<T>(finalUrl, body as unknown, { headers, params })
      .pipe(catchError((e) => this.handleError(e)));
  }

  /** PUT */
  public put<T, U>(
    url: string,
    body: U,
    options?: RequestOptions
  ): Observable<T> {
    const finalUrl: string = this.full(url);
    const headers: HttpHeaders = options?.headers ?? this.defaultHeaders;
    const params: HttpParams | undefined = this.buildParams(options?.params);

    return this.http
      .put<T>(finalUrl, body as unknown, { headers, params })
      .pipe(catchError((e) => this.handleError(e)));
  }

  /** DELETE */
  public delete<T>(url: string, options?: RequestOptions): Observable<T> {
    const finalUrl: string = this.full(url);
    const headers: HttpHeaders = options?.headers ?? this.defaultHeaders;
    const params: HttpParams | undefined = this.buildParams(options?.params);

    return this.http
      .delete<T>(finalUrl, { headers, params })
      .pipe(catchError((e) => this.handleError(e)));
  }

  // ===== Helpers (privados) =====

  /** Resuelve URL absoluta a partir del baseUrl */
  private full(endpoint: string): string {
    if (!endpoint) return this.baseUrl;
    return endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
  }

  /** Normaliza QueryParams a HttpParams */
  private buildParams(params?: QueryParams): HttpParams | undefined {
    if (!params) return undefined;
    if (params instanceof HttpParams) return params;

    let hp: HttpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]: [string, unknown]) => {
      if (value === null || value === undefined) return;

      if (Array.isArray(value)) {
        value.forEach((item: unknown) => {
          hp = hp.append(key, String(item));
        });
        return;
      }

      if (typeof value === 'object') {
        hp = hp.append(key, JSON.stringify(value));
        return;
      }

      hp = hp.append(key, String(value));
    });

    return hp;
  }

  /** Manejador de errores HTTP (sin lógica de negocio) */
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Aquí solo normalizamos y re-lanzamos; el dominio decide qué hacer.
    return throwError(() => error);
  }
}
