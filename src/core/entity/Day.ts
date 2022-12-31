export default class Day {
  private _notes: String[] = [];

  constructor(public readonly id: String, public readonly date: Date) {}

  addNote(note: String) {
    this._notes.push(note);
  }

  get notes() {
    return this._notes;
  }
}
