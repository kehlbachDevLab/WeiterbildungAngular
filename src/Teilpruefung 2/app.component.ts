/**
 * Erstelle eine einfache Todo-App mit Angular Signals. Die App soll Todos anzeigen, filtern und im localStorage speichern. 
 * Nutze Writable Signals für die Todo-Liste und den aktiven Filter, Computed Signals für gefilterte Todos und Effects für die Persistierung im localStorage. 
 */


import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

type Todo = {
    id : string
    text: string
    done: boolean
};


export enum Filter{
    All = 'all',
    Active = 'active',
    Completed = 'completed'
}

const STORAGE_KEY = 'ng-signals-todos';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})

export class AppComponent{

    Filter = Filter;

    // writable signals
    todos : WritableSignal<Todo[]> = signal<Todo[]>(this.load());
    activeFilter: WritableSignal<Filter> = signal<Filter>(Filter.All)
    newText = signal<string>('');

    // computed signals
    filteredTodos = computed(() => {
        const list = this.todos();
        const f = this.activeFilter();
        if(f === Filter.Active) return list.filter(t => !t.done);
        if(f === Filter.Completed) return list.filter(t => t.done);
        return list;
    });

    stats = computed(() => {
        const list = this.todos();
        const completed = list.filter(t => t.done).length;
        return{
            total: list.length,
            completed,
            remaining: list.length - completed,
        };
    });

    // effects
    persistEffect = effect(() => {
        const data = JSON.stringify(this.todos());
        localStorage.setItem(STORAGE_KEY, data);
    })

    private load(): Todo[]{
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? (JSON.parse(raw) as Todo[]) : [];            
        } catch {
            return []
        }
    }

    add(){
        const text = this.newText().trim();
        if(!text) return;
        const todo: Todo= {id: crypto.randomUUID(), text, done:false};
        this.todos.update(list => [todo, ...list]);
        this.newText.set('')
    }

    toggle(id: string){
        this.todos.update(list => 
            list.map(t => (t.id === id ? {...t, done:!t.done} : t)),
        );
    }

    remove(id: string){this.todos.update(list => list.filter(t => t.id !== id))};

    clearCompleted() {this.todos.update(list => list.filter(t => !t.done));}

    trackById(_: number, t: Todo) {return t.id;}
}