import { TestBed } from "@angular/core/testing";
import { RoutinesService } from "./routines.service";
import { StorageService } from "./storage.service";

describe("RoutinesService", () => {
  let service: RoutinesService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutinesService);
  });

  it("filters routines by category", () => {
    expect(service.filter("principiante").every((routine) => routine.category === "principiante")).toBe(true);
    expect(service.filter("hipertrofia")).toHaveLength(1);
  });

  it("selects a category and persists it", () => {
    service.selectCategory("fuerza");
    expect(service.selectedCategory()).toBe("fuerza");
    expect(TestBed.inject(StorageService).read("pulsefit.selectedRoutineCategory")).toBe("fuerza");
  });

  it("returns every routine for todos", () => {
    expect(service.filter("todos")).toHaveLength(service.routines.length);
  });
});
