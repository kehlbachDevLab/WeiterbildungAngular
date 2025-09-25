// src/app/verkaufs-dashboard.component.ts
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { VerkaufsZahlenComponent, Verkauf } from './verkaufs-zahlen.component';
import { TopProdukteComponent } from './top-produkte.component';

@Component({
  selector: 'app-verkaufs-dashboard',
  standalone: true,
  imports: [VerkaufsZahlenComponent, TopProdukteComponent],
  template: `
    <div class="dashboard">
      <h1>Verkaufsdashboard</h1>

      <div class="grid">
        <!-- таблица с фильтром -->
        <app-verkaufs-zahlen #zahlen></app-verkaufs-zahlen>

        <!-- топ-3 продуктов по уже отфильтрованным продажам -->
        <app-top-produkte [verkaeufe]="gefilterteVerkaeufe"></app-top-produkte>
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

  gefilterteVerkaeufe: Verkauf[] = [];

  ngAfterViewInit() {
    this.gefilterteVerkaeufe = this.zahlenCmp?.gefilterteVerkaeufe ?? [];
  }
}
