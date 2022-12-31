import DayRepository from "../repository/DayRepository";

export default class GetNotes {
  constructor(private readonly dayRepository: DayRepository) {}

  execute(dayId: String): String[] {
    const day = this.dayRepository.findById(dayId);

    if (!day) {
      throw new Error("Day not found");
    }

    return day.notes;
  }
}
