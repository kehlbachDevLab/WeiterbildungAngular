import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { VerkaufsZahlenComponent, Produkt } from './verkaufs-zahlen.component';
import { TopProdukteComponent } from './top-produkte.component';

@Component({
  selector: 'app-verkaufs-dashboard',
  standalone: true,
  imports: [VerkaufsZahlenComponent, TopProdukteComponent],
  template: `
    <div class="dashboard">
      <h1>Verkaufsdashboard</h1>

      <div class="grid">
        <app-verkaufs-zahlen #zahlen></app-verkaufs-zahlen>

        <!-- передаем данные из verkaufs-zahlen в top-produkte -->
        <app-top-produkte [produkte]="produkteAusZahlen"></app-top-produkte>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 2rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
      align-items: start;
    }
  `]
})
export class VerkaufsDashboard implements AfterViewInit {
  @ViewChild('zahlen', { static: false }) zahlenCmp?: VerkaufsZahlenComponent;

  produkteAusZahlen: Produkt[] = [];

  ngAfterViewInit() {
    // читаем данные прямо из verkaufs-zahlen.component
    this.produkteAusZahlen = this.zahlenCmp?.produkte ?? [];
    // если обновишь массив в дочке динамически, лучше добавить Output или сигнал
  }
}
