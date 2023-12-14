export interface DomainEvent {
  type: string;
  dateTimeOccurred: Date;
}

export interface IHandler<T, V> {
  handle(event: T): V;
}

type EventHandler<T extends DomainEvent> = (event: T) => void;

type EventHandlers<T extends DomainEvent = DomainEvent> = {
  [key: string]: EventHandler<T>[];
};

type Events = { [id: string]: DomainEvent[] };

export class DomainEvents {
  public static eventHandlers: EventHandlers = {};
  public static events: Events = {};

  constructor() {}

  public static subscribe<T extends DomainEvent>(
    eventType: string,
    listener: EventHandler<T>,
  ): void {
    if (!DomainEvents.eventHandlers[eventType]) {
      DomainEvents.eventHandlers[eventType] = [];
    }
    DomainEvents.eventHandlers[eventType].push(
      listener as EventHandler<DomainEvent>,
    );
  }

  public static registerEvent(entityId: string, event: DomainEvent): void {
    if (!DomainEvents.events[entityId]) {
      DomainEvents.events[entityId] = [];
    }
    DomainEvents.events[entityId].push(event);
  }

  public static dispatch(entityId: string): void {
    const eventsForEntity = DomainEvents.events[entityId];
    if (eventsForEntity && eventsForEntity.length > 0) {
      for (const event of eventsForEntity) {
        const listeners = DomainEvents.eventHandlers[event.type] || [];
        for (const listener of listeners) {
          listener(event);
        }
      }
      delete DomainEvents.events[entityId];
    }
  }
}
