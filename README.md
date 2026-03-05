# tiny-async

[![npm version](https://img.shields.io/npm/v/tiny-async-kit.svg)](https://www.npmjs.com/package/tiny-async-kit)
[![npm downloads](https://img.shields.io/npm/dm/tiny-async-kit.svg)](https://www.npmjs.com/package/tiny-async-kit)
[![CI](https://github.com/ofershap/tiny-async/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/tiny-async/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

All tiny-\* async utilities in one package. Drop-in replacements for `p-limit`, `p-map`, `p-retry`, and `p-queue` that ship ESM + CJS.

```ts
import { pLimit, pMap, pRetry, PQueue } from "tiny-async-kit";
```

> One install. Four utilities. All dual-format, all typed, all zero-dep individually.

## Install

```bash
npm install tiny-async-kit
```

## What's included

| Export                 | Replaces | Docs                                                 |
| ---------------------- | -------- | ---------------------------------------------------- |
| `pLimit`               | p-limit  | [tiny-limit](https://github.com/ofershap/tiny-limit) |
| `pMap`, `pMapSkip`     | p-map    | [tiny-map](https://github.com/ofershap/tiny-map)     |
| `pRetry`, `AbortError` | p-retry  | [tiny-retry](https://github.com/ofershap/tiny-retry) |
| `PQueue`               | p-queue  | [tiny-queue](https://github.com/ofershap/tiny-queue) |

Each utility is also available as a standalone package if you only need one.

## Quick examples

### Limit concurrency

```ts
import { pLimit } from "tiny-async-kit";

const limit = pLimit(5);
const results = await Promise.all(urls.map((url) => limit(() => fetch(url))));
```

### Map with concurrency

```ts
import { pMap } from "tiny-async-kit";

const pages = await pMap(urls, (url) => fetch(url).then((r) => r.text()), {
  concurrency: 10,
});
```

### Retry with backoff

```ts
import { pRetry } from "tiny-async-kit";

const data = await pRetry(() => fetchFromUnreliableAPI(), { retries: 3 });
```

### Task queue with priority

```ts
import { PQueue } from "tiny-async-kit";

const queue = new PQueue({ concurrency: 2 });
await queue.add(() => processJob(1));
await queue.add(() => urgentJob(), { priority: 10 });
await queue.onIdle();
```

## Why not just install the originals?

`p-limit` v4+, `p-map` v6+, `p-retry` v6+, and `p-queue` v8+ are all ESM-only. CommonJS projects that `require()` them get `ERR_REQUIRE_ESM`.

The tiny-\* packages ship both ESM and CJS, include TypeScript types, and have zero dependencies. This meta-package re-exports everything from one import.

## The tiny-\* family

| Package                                                | Replaces             | What it does                   |
| ------------------------------------------------------ | -------------------- | ------------------------------ |
| [tiny-limit](https://github.com/ofershap/tiny-limit)   | p-limit              | Concurrency limiter            |
| [tiny-map](https://github.com/ofershap/tiny-map)       | p-map                | Concurrent map with order      |
| [tiny-retry](https://github.com/ofershap/tiny-retry)   | p-retry              | Retry with exponential backoff |
| [tiny-queue](https://github.com/ofershap/tiny-queue)   | p-queue              | Priority task queue            |
| [tiny-ms](https://github.com/ofershap/tiny-ms)         | ms                   | Parse/format durations         |
| [tiny-escape](https://github.com/ofershap/tiny-escape) | escape-string-regexp | Escape regex chars             |
| **tiny-async-kit**                                     | all of the above     | One import for all async utils |

## Author

[![Made by ofershap](https://gitshow.dev/api/card/ofershap)](https://gitshow.dev/ofershap)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/ofershap)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github&logoColor=white)](https://github.com/ofershap)

---

If this saved you from `ERR_REQUIRE_ESM`, [star the repo](https://github.com/ofershap/tiny-async) or [open an issue](https://github.com/ofershap/tiny-async/issues) if something breaks.

## License

[MIT](LICENSE) &copy; [Ofer Shapira](https://github.com/ofershap)
