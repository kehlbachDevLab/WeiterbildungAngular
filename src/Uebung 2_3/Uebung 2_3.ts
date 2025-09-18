/*
Entwickle eine Standalone-Komponente für ein Benutzerprofil, die folgende Anforderungen erfüllt: 

a) Die Komponente soll den Namen UserProfileComponent tragen und über den Selektor app-user-profile verfügen. 

b) Im Template der Komponente soll ein Bild des Benutzers, sein Name und eine kurze Beschreibung angezeigt werden. Verwende für das Bild eine Platzhalter-URL, für den Namen und die Beschreibung einfache Texte. 

c) Stelle sicher, dass die Komponente in einem anderen Modul oder einer anderen Komponente direkt, ohne die Notwendigkeit eines NgModules, importiert und verwendet werden kann. 

d) Erstelle eine weitere Standalone-Komponente MainPageComponent, die UserProfileComponent verwendet. MainPageComponent soll den Titel der Seite und die UserProfileComponent innerhalb eines <div>-Containers anzeigen. 

e) In MainPageComponent, verwende Binding, um den Namen und die Beschreibung des Benutzers dynamisch an UserProfileComponent zu übergeben. Nutze dafür einfache Beispieldaten.
*/


import { Component } from '@angular/core';
import { MainPageComponent } from '../Uebung 2_3/MainPageComponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [MainPageComponent],
  template: `
      <h1>App</h1>
    <app-main-page></app-main-page>
  `,
})
export class Uebung23{}
