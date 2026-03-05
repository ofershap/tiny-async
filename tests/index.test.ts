import { describe, it, expect } from "vitest";
import {
  pLimit,
  pMap,
  pMapSkip,
  pRetry,
  AbortError,
  PQueue,
} from "../src/index.js";

describe("tiny-async re-exports", () => {
  it("exports pLimit", () => {
    expect(typeof pLimit).toBe("function");
    const limit = pLimit(1);
    expect(limit.activeCount).toBe(0);
  });

  it("exports pMap", async () => {
    const result = await pMap([1, 2, 3], (x) => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it("exports pMapSkip", () => {
    expect(new pMapSkip()).toBeInstanceOf(pMapSkip);
  });

  it("exports pRetry", async () => {
    let calls = 0;
    const result = await pRetry(
      () => {
        calls++;
        if (calls < 2) throw new Error("retry");
        return "ok";
      },
      { retries: 3, minTimeout: 1, factor: 1 },
    );
    expect(result).toBe("ok");
  });

  it("exports AbortError", () => {
    const err = new AbortError("stop");
    expect(err.name).toBe("AbortError");
  });

  it("exports PQueue", async () => {
    const queue = new PQueue({ concurrency: 1 });
    const result = await queue.add(() => 42);
    expect(result).toBe(42);
  });
});
