import { Injectable, computed, signal } from '@angular/core';
import { Routine } from '../models/routine.model';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {
  private readonly _routines = signal<Routine[]>([
    {
      id: 1,
      title: 'Iniciación Full Body',
      category: 'principiante',
      tag: 'Principiante',
      tagColor: 'bg-emerald-500/10 text-emerald-400',
      description: 'Ideal para adaptarse a los movimientos básicos y ganar resistencia inicial.',
      exercises: [
        { name: 'Sentadilla Libre / Copa', sets: '3 series x 12 reps', rest: '60s' },
        { name: 'Press de Pecho en Banco', sets: '3 series x 10 reps', rest: '60s' },
        { name: 'Jalón al Pecho (Espalda)', sets: '3 series x 12 reps', rest: '60s' },
        { name: 'Plancha Abdominal', sets: '3 series x 30 seg', rest: '45s' }
      ]
    },
    {
      id: 2,
      title: 'Hipertrofia - Torso Élite',
      category: 'hipertrofia',
      tag: 'Músculo / Hipertrofia',
      tagColor: 'bg-lime-500/10 text-lime-400',
      description: 'Enfoque en desarrollo muscular de pecho, espalda y hombros.',
      exercises: [
        { name: 'Press Inclinado con Mancuernas', sets: '4 series x 8-10 reps', rest: '90s' },
        { name: 'Remo con Barra T', sets: '4 series x 10 reps', rest: '90s' },
        { name: 'Press Militar de Hombro', sets: '3 series x 10-12 reps', rest: '60s' },
        { name: 'Super-serie Biceps / Triceps', sets: '3 series x 12 reps', rest: '60s' }
      ]
    },
    {
      id: 3,
      title: 'Hipertrofia - Pierna & Glúteo',
      category: 'hipertrofia',
      tag: 'Músculo / Hipertrofia',
      tagColor: 'bg-lime-500/10 text-lime-400',
      description: 'Rutina intensiva para maximizar la masa muscular en tren inferior.',
      exercises: [
        { name: 'Sentadilla Trasera con Barra', sets: '4 series x 8 reps', rest: '120s' },
        { name: 'Prensa Inclinada de Piernas', sets: '4 series x 12 reps', rest: '90s' },
        { name: 'Peso Muerto Rumano', sets: '3 series x 10 reps', rest: '90s' },
        { name: 'Elevación de Gemelos', sets: '4 series x 15 reps', rest: '45s' }
      ]
    },
    {
      id: 4,
      title: 'Fuerza Máxima (5x5)',
      category: 'fuerza',
      tag: 'Fuerza',
      tagColor: 'bg-orange-500/10 text-orange-400',
      description: 'Diseñada para incrementar la fuerza máxima en los tres básicos.',
      exercises: [
        { name: 'Sentadilla Pesada', sets: '5 series x 5 reps', rest: '180s' },
        { name: 'Press Banca Plano', sets: '5 series x 5 reps', rest: '180s' },
        { name: 'Peso Muerto Convencional', sets: '5 series x 5 reps', rest: '180s' }
      ]
    }
  ]);

  private readonly _selectedCategory = signal<string>('all');

  readonly routines = this._routines.asReadonly();
  readonly selectedCategory = this._selectedCategory.asReadonly();

  readonly filteredRoutines = computed(() => {
    const category = this._selectedCategory();
    const list = this._routines();
    if (category === 'all') return list;
    return list.filter((r) => r.category === category);
  });

  setFilter(category: string): void {
    this._selectedCategory.set(category);
  }
}
