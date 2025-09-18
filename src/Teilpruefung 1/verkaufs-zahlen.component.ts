import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Produkt {
  id: number;
  name: string;
  verkaufteStueckzahl: number;
  umsatz: number;
}

@Component({
  selector: 'app-verkaufs-zahlen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="sales-table">
      <thead>
        <tr>
          <th>Produkt</th>
          <th>Verkaufte Stückzahl</th>
          <th>Umsatz (€)</th>
        </tr>
      </thead>
      <tbody>
        @for (p of produkte; track p.id) {
          <tr>
            <td>{{ p.name }}</td>
            <td>{{ p.verkaufteStueckzahl }}</td>
            <td>{{ p.umsatz | number:'1.0-0' }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: [`
    .sales-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .sales-table th, .sales-table td { border: 1px solid #ccc; padding: 0.5rem 1rem; text-align: left; }
    .sales-table th { background: #f4f4f4; }
  `]
})
export class VerkaufsZahlenComponent {
  produkte: Produkt[] = [
    { id: 1, name: 'Produkt A', verkaufteStueckzahl: 120, umsatz: 2400 },
    { id: 2, name: 'Produkt B', verkaufteStueckzahl: 85,  umsatz: 1700 },
    { id: 3, name: 'Produkt C', verkaufteStueckzahl: 50,  umsatz: 1250 },
    { id: 4, name: 'Produkt D', verkaufteStueckzahl: 30,  umsatz: 900  },
    { id: 5, name: 'Produkt E', verkaufteStueckzahl: 140, umsatz: 3500 },
  ];
}
