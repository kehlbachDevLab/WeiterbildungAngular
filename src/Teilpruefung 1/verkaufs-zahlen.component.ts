import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Verkauf {
  id: number;
  name: string;
  preis: number;
  datum: Date;
}

interface ZeilenItem {
  name: string;
  anzahl: number;
  umsatz: number;
  minDatum: Date;
  maxDatum: Date;
}

@Component({
  selector: 'app-verkaufs-zahlen',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, DatePipe],
  template: `
    <div class="filter">
      <label for="periode">Zeitraum wählen:</label>
      <select id="periode" [(ngModel)]="selectedPeriode">
        <option value="alle">Alle</option>
        <option value="monat">Aktueller Monat</option>
        <option value="quartal">Letztes Quartal</option>
      </select>
    </div>

    @if (gefilterteZeilen.length > 0) {
      <table class="sales-table">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Verkaufte Stückzahl</th>
            <th>Umsatz</th>
            <th>Zeitraum</th>
          </tr>
        </thead>
        <tbody>
          @for (row of gefilterteZeilen; track row.name) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.anzahl }}</td>
              <td>{{ row.umsatz | currency:'EUR':'symbol':'1.0-0' }}</td>
              <td>
                {{ row.minDatum | date:'dd.MM.yyyy' }}
                –
                {{ row.maxDatum | date:'dd.MM.yyyy' }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p>Keine Daten für diesen Zeitraum.</p>
    }
  `,
  styles: [`
    .filter { margin-bottom: 1rem; }
    .sales-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .sales-table th, .sales-table td { border: 1px solid #ccc; padding: 0.5rem 1rem; text-align: left; }
    .sales-table th { background: #f4f4f4; }
  `]
})
export class VerkaufsZahlenComponent {
  selectedPeriode: 'alle' | 'monat' | 'quartal' = 'alle';

verkaeufe: Verkauf[] = [
  // dieser Monat (September 2025)
  { id: 1, name: 'Produkt A', preis: 20, datum: new Date(2025, 8, 5) }, 
  { id: 2, name: 'Produkt B', preis: 30, datum: new Date(2025, 8, 10) },
  { id: 3, name: 'Produkt A', preis: 20, datum: new Date(2025, 8, 15) },
  { id: 4, name: 'Produkt C', preis: 25, datum: new Date(2025, 8, 20) },

  // im Quartal aber im anderen Monat (Juli-August 2025)
  { id: 5, name: 'Produkt D', preis: 40, datum: new Date(2025, 7, 25) }, 
  { id: 6, name: 'Produkt B', preis: 30, datum: new Date(2025, 6, 15) }, 

  // außerhalb des aktuellen Quartals
  { id: 7, name: 'Produkt A', preis: 20, datum: new Date(2025, 3, 12) },
  { id: 8, name: 'Produkt E', preis: 50, datum: new Date(2024, 11, 1) },
  { id: 9, name: 'Produkt C', preis: 25, datum: new Date(2024, 9, 3) },  
  { id: 10, name: 'Produkt A', preis: 20, datum: new Date(2024, 1, 20) }
];

  public get gefilterteVerkaeufe(): Verkauf[] {
    const now = new Date();
    if (this.selectedPeriode === 'alle') return this.verkaeufe;

    if (this.selectedPeriode === 'monat') {
      const m = now.getMonth();
      const y = now.getFullYear();
      return this.verkaeufe.filter(v => v.datum.getMonth() === m && v.datum.getFullYear() === y);
    }

    if (this.selectedPeriode === 'quartal') {
      const q = Math.floor(now.getMonth() / 3);
      const y = now.getFullYear();
      return this.verkaeufe.filter(v => {
        const qv = Math.floor(v.datum.getMonth() / 3);
        return qv === q && v.datum.getFullYear() === y;
      });
    }

    return this.verkaeufe;
  }

  get gefilterteZeilen(): ZeilenItem[] {
    const map = new Map<string, ZeilenItem>();
    for (const v of this.gefilterteVerkaeufe) {
      if (!map.has(v.name)) {
        map.set(v.name, { name: v.name, anzahl: 0, umsatz: 0, minDatum: v.datum, maxDatum: v.datum });
      }
      const row = map.get(v.name)!;
      row.anzahl += 1;
      row.umsatz += v.preis;

      if (v.datum < row.minDatum) row.minDatum = v.datum;
      if (v.datum > row.maxDatum) row.maxDatum = v.datum;
    }
    return Array.from(map.values());
  }
}
