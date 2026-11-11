import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-to-r from-slate-800 to-slate-900 border border-lime-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div class="relative z-10">
        <span class="text-xs uppercase font-bold text-lime-400 tracking-wider">Motivación del Día</span>
        <blockquote class="text-lg font-semibold italic text-slate-200 mt-2">
          {{ quote }}
        </blockquote>
      </div>
      <i class="fa-solid fa-quote-right text-8xl text-slate-700/20 absolute -right-4 -bottom-4 z-0 pointer-events-none"></i>
    </div>
  `
})
export class QuoteCardComponent {
  @Input({ required: true }) quote!: string;
}
