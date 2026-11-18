import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { ProfileService } from "../../../core/services/profile.service";
import { NutritionPageComponent } from "./nutrition-page.component";

describe("NutritionPageComponent", () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [NutritionPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it("renders empty state when profile is missing", () => {
    const fixture = TestBed.createComponent(NutritionPageComponent);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain("Aún no hay un perfil calculado");
  });

  it("switches between deficit, maintenance, and volume when profile exists", () => {
    const profileService = TestBed.inject(ProfileService);
    profileService.save({ name: "Julián", age: 25, weightKg: 72, heightCm: 176 });

    const fixture = TestBed.createComponent(NutritionPageComponent);
    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll(".goal-selector button"),
    ) as HTMLButtonElement[];

    buttons[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Déficit moderado");

    buttons[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Mantenimiento");

    buttons[2].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Volumen");
  });
});
