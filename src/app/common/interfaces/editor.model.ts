export interface IEditor<T>{
  isEditing:boolean;
  save(item: T): void;
  onCreate(item: T): void;
  onUpdate(item: T): void;
}

export class ComponentEditor<T> implements IEditor<T>{
    isEditing: boolean = false;

    save(item: T): void {
        this.isEditing ? this.onUpdate(item) : this.onCreate(item);
    }
    onCreate(item: T): void {
    }
    onUpdate(item: T): void {
    }
}