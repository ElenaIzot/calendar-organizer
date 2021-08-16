export interface EventHoliday {
    name: string,
    budget: number | string,
}

export function isHoliday(obj: any): obj is EventHoliday {
    return obj.name && obj.budget;
}

export interface EventEvent {
    name: string,
    adress: string,
    time: number | string,
}

export function isEvent(obj: any): obj is EventEvent {
    return obj.name && obj.adress && obj.time;
}

export interface EventNote {
    name: string,
    text: string,
}

export function isNote(obj: any): obj is EventNote {
    return obj.name && obj.text;
}

export type CalendarEvent = EventEvent | EventHoliday | EventNote;

export function getEventsFronStorage(day: Date): CalendarEvent[] {
    const key = day.toLocaleDateString();
    return JSON.parse(localStorage.getItem(key) || '[]')
}

export function saveEventsToStorage(day: Date, events: CalendarEvent[]): void {
    const key = day.toLocaleDateString();
    localStorage.setItem(key,JSON.stringify(events));    
}
