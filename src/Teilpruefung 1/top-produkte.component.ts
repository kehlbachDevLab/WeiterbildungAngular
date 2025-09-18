import { Component, Input, computed, signal } from '@angular/core';
import type { Produkt } from './verkaufs-zahlen.component';

@Component({
  selector: 'app-top-produkte',
  standalone: true,
  template: `
    <section class="top-products">
      <h2>Meistverkaufte Produkte</h2>
      <ol>
        @for (p of top3(); track p.id) {
          <li>{{ p.name }} : {{ p.verkaufteStueckzahl }} Stück</li>
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

  private _items = signal<Produkt[]>([]);
  @Input() set produkte(v: Produkt[]) { this._items.set(v ?? []); }

  top3 = computed(() =>
    [...this._items()].sort((a, b) => b.verkaufteStueckzahl - a.verkaufteStueckzahl).slice(0, 3)
  );
}
