import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { marked } from 'marked';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  userPrompt: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  isLoading: boolean = false;
  isCollapsed: boolean = true;
  photo: string = localStorage.getItem('photo') || '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private aiService: ChatService) { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendPrompt() {
    if (!this.userPrompt.trim()) return;

    this.messages.push({ text: this.userPrompt, isUser: true });
    this.isLoading = true;
    const sanitizedPrompt = this.userPrompt.replace(/"/g, '\\"');
    this.userPrompt = '';

    this.aiService.generateAIResponseForProprietaire(sanitizedPrompt).subscribe({
      next: (response) => {
        let aiResponse = response.choices[0].message.content;
        const lastSentenceEnd = Math.max(
          aiResponse.lastIndexOf('.'),
          aiResponse.lastIndexOf('?'),
          aiResponse.lastIndexOf('!')
        );
        if (lastSentenceEnd !== -1) {
          aiResponse = aiResponse.substring(0, lastSentenceEnd + 1);
        }
        const markdownResponse = marked.parse(aiResponse);
        if (markdownResponse instanceof Promise) {
          markdownResponse.then(resolvedResponse => {
            this.messages.push({ text: resolvedResponse, isUser: false });
          });
        } else {
          this.messages.push({ text: markdownResponse, isUser: false });
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendPrompt();
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}