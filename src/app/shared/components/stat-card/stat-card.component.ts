import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl flex items-center space-x-4 shadow-md hover:border-lime-500/40 transition-all">
      <div [class]="'p-3 rounded-xl text-2xl ' + iconColorClass">
        <i [class]="'fa-solid ' + icon"></i>
      </div>
      <div>
        <span class="text-xs text-slate-400 font-semibold block uppercase">{{ title }}</span>
        <span [class]="'text-2xl font-black ' + (valueColorClass || 'text-white')">{{ value }}</span>
        <span class="text-xs block font-medium text-slate-400">{{ subtitle }}</span>
      </div>
    </div>
  `
})
export class StatCardComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) iconColorClass!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) subtitle!: string;
  @Input() valueColorClass?: string;
}
