import DayRepository from "../repository/DayRepository";

export default class AddNote {
  constructor(private readonly dayRepository: DayRepository) {}

  execute(dayId: String, note: String) {
    const day = this.dayRepository.findById(dayId);

    if (!day) {
      throw new Error("Day not found");
    }

    day.addNote(note);
    this.dayRepository.save(day);
  }
}
