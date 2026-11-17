import { Injectable } from "@angular/core";

export interface StoredPayload<T> {
  version: number;
  data: T;
}

@Injectable({ providedIn: "root" })
export class StorageService {
  readonly version = 1;

  private getLocalStorage(): Storage | null {
    try {
      return typeof localStorage === "undefined" ? null : localStorage;
    } catch {
      return null;
    }
  }

  read<T>(key: string): T | undefined {
    const storage = this.getLocalStorage();
    if (!storage) return undefined;

    try {
      const raw = storage.getItem(key);
      if (raw === null) return undefined;

      const parsed = JSON.parse(raw) as StoredPayload<T> | T;
      if (this.isVersionedPayload(parsed)) {
        return parsed.data;
      }
      return parsed as T;
    } catch {
      this.remove(key);
      return undefined;
    }
  }

  write<T>(key: string, data: T): boolean {
    const storage = this.getLocalStorage();
    if (!storage) return false;

    try {
      const payload: StoredPayload<T> = { version: this.version, data };
      storage.setItem(key, JSON.stringify(payload));
      return true;
    } catch {
      return false;
    }
  }

  remove(key: string): void {
    try {
      this.getLocalStorage()?.removeItem(key);
    } catch {
      // localStorage may be blocked or unavailable.
    }
  }

  exists(key: string): boolean {
    try {
      return this.getLocalStorage()?.getItem(key) !== null;
    } catch {
      return false;
    }
  }

  private isVersionedPayload<T>(value: unknown): value is StoredPayload<T> {
    return typeof value === "object" && value !== null && "version" in value && "data" in value;
  }
}
