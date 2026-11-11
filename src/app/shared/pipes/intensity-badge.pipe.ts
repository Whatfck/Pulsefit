import { Pipe, PipeTransform } from '@angular/core';
import { WorkoutIntensity } from '../../core/models/workout.model';

@Pipe({
  name: 'intensityBadge',
  standalone: true
})
export class IntensityBadgePipe implements PipeTransform {
  transform(intensity: WorkoutIntensity): string {
    switch (intensity) {
      case 'Baja':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Media':
        return 'text-lime-400 bg-lime-500/10 border-lime-500/20';
      case 'Alta':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Extrema':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  }
}
