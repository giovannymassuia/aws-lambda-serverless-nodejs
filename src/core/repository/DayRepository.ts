import Day from "../entity/Day";

export default interface DayRepository {
  findById(id: String): Day | undefined;
  save(day: Day): void;
}
