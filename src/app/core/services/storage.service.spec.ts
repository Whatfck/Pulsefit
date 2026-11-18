import { TestBed } from "@angular/core/testing";
import { StorageService } from "./storage.service";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it("writes and reads versioned data", () => {
    expect(service.write("test", { value: 42 })).toBe(true);
    expect(service.read<{ value: number }>("test")).toEqual({ value: 42 });
  });

  it("reads legacy unversioned data", () => {
    localStorage.setItem("test", JSON.stringify({ value: 7 }));
    expect(service.read<{ value: number }>("test")).toEqual({ value: 7 });
  });

  it("removes corrupt JSON", () => {
    localStorage.setItem("test", "{corrupt");
    expect(service.read("test")).toBeUndefined();
    expect(localStorage.getItem("test")).toBeNull();
  });

  it("handles unavailable storage safely", () => {
    const original = globalThis.localStorage;
    Object.defineProperty(globalThis, "localStorage", { configurable: true, get: () => { throw new Error("blocked"); } });
    expect(service.read("test")).toBeUndefined();
    expect(service.write("test", 1)).toBe(false);
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: original });
  });
});
