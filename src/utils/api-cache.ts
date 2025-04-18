interface CacheItem {
  data: unknown;
  timestamp: number;
}

const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000 * 1; // Cache is set to expire after 1 day

class ApiCache {
  private cache: Record<string, CacheItem> = {};

  get(key: string) {
    const item = this.cache[key];
    if (item && Date.now() - item.timestamp < CACHE_EXPIRY_MS) {
      return item.data;
    }
    return null;
  }

  set(key: string, data: unknown) {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  clear() {
    this.cache = {};
  }
}

export const apiCache = new ApiCache();
