import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { VehicleListComponent } from './app/components/vehicle-list/vehicle-list.component';
import { ChatComponent } from './app/components/chat/chat.component';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VehicleListComponent, ChatComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Sistema de Gestión de Vehículos</h1>
      </header>
      <main class="app-content">
        <app-vehicle-list></app-vehicle-list>
        <app-chat></app-chat>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(to right, #f8f9fa, #e9ecef);
    }
    .app-header {
      background-color: #ffffff;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .app-header h1 {
      margin: 0;
      text-align: center;
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 600;
    }
    .app-content {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      .app-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(MarkdownModule.forRoot())
  ]
});