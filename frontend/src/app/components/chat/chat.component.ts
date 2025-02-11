import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown'; // Importa MarkdownModule
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { parseChatResponse } from '../../../utils/parseChatResponse';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: ChatMessage[] = [];
  currentMessage = '';

  constructor(private chatService: ChatService) {
    this.messages.push({
      text: '¡Hola! Puedo ayudarte con información sobre los vehículos. Por favor, hazme una pregunta.',
      isUser: false,
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage() {
    if (!this.currentMessage.trim()) return;

    this.messages.push({
      text: this.currentMessage,
      isUser: true,
    });

    this.chatService.sendMessage(this.currentMessage).subscribe({
      next: (response) => {
        const botResponse = response.text || 'No pude entender tu pregunta. ¿Podrías intentarlo de nuevo?';
        this.messages.push({
          text: parseChatResponse(botResponse),
          isUser: false,
        });
      },
      error: (err) => {
        console.error('Error al comunicarse con la API de chat:', err);
        this.messages.push({
          text: 'Lo siento, ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.',
          isUser: false,
        });
      },
    });

    this.currentMessage = '';
  }
}
