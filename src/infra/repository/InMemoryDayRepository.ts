import Day from "../../core/entity/Day";
import DayRepository from "../../core/repository/DayRepository";

export default class InMemoryDayRepository implements DayRepository {
  private _days: Day[] = [
    new Day("1", new Date("2022-12-01")),
    new Day("2", new Date("2022-12-02")),
    new Day("3", new Date("2022-12-03")),
  ];

  constructor() {
    this._days[1].addNote("note 1");
    this._days[1].addNote("note 2");
    this._days[1].addNote("note 3");
  }

  findById(id: String): Day | undefined {
    return this._days.find((day) => day.id === id);
  }

  save(day: Day): void {
    const index = this._days.findIndex((d) => d.id === day.id);
    if (index === -1) {
      this._days.push(day);
    } else {
      this._days[index] = day;
    }
  }
}
