import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  /**
   * Shows toast message
   * @param textOrTpl text or tpl to show
   * @param [options] styles and duration
   */
  show(textOrTpl: string | TemplateRef<any>, options: any = {}): any {
    this.toasts.push({ textOrTpl, ...options });
  }

  /**
   * Removes toast message
   * @param toast toast object
   */
  remove(toast): any {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}

