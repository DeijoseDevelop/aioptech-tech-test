import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private apiUrl = `${environment.apiUrl}/gemini/generate`;

    constructor(private http: HttpClient) { }

    sendMessage(prompt: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': environment.apiKey,
        });

        const body = { prompt };

        return this.http.post(this.apiUrl, body, { headers });
    }
}