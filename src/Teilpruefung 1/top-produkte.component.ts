
import { Component, Input, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import type { Verkauf } from './verkaufs-zahlen.component';

interface TopRow {
  name: string;
  anzahl: number;
  umsatz: number;
}

@Component({
  selector: 'app-top-produkte',
  standalone: true,
  imports: [CurrencyPipe],  
  template: `
    <section class="top-products">
      <h2>Top 3 Produkte</h2>
      <ol>
        @for (row of top3(); track row.name) {
          <li>
            {{ row.name }} • {{ row.anzahl }} Stück •
            {{ row.umsatz | currency:'EUR':'symbol':'1.0-0' }}
          </li>
        }
      </ol>
    </section>
  `,
  styles: [`
    .top-products { border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
    h2 { margin-top: 0; }
    ol { margin: 0; padding-left: 1.2rem; }
  `]
})
export class TopProdukteComponent {
  private _verkaeufe = signal<Verkauf[]>([]);
  @Input() set verkaeufe(v: Verkauf[]) { this._verkaeufe.set(v ?? []); }

  top3 = computed(() => {
    const map = new Map<string, TopRow>();
    for (const v of this._verkaeufe()) {
      if (!map.has(v.name)) {
        map.set(v.name, { name: v.name, anzahl: 0, umsatz: 0 });
      }
      const row = map.get(v.name)!;
      row.anzahl += 1;
      row.umsatz += v.preis;
    }
    return Array.from(map.values())
      .sort((a, b) => b.anzahl - a.anzahl)
      .slice(0, 3);
  });
}
