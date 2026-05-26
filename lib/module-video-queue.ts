/** Limit concurrent module MP4 fetches (browsers choke on many large files at once). */
const MAX_CONCURRENT = 2;

type QueueItem = {
  priority: number;
  run: () => void;
};

let active = 0;
const waiters: QueueItem[] = [];

function drain() {
  if (active >= MAX_CONCURRENT || waiters.length === 0) return;
  waiters.sort((a, b) => a.priority - b.priority);
  const next = waiters.shift();
  if (!next) return;
  active += 1;
  next.run();
}

/** Lower priority number runs sooner (module 9 uses 0). */
export function acquireModuleVideoSlot(priority = 5): Promise<void> {
  if (active < MAX_CONCURRENT) {
    active += 1;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    waiters.push({
      priority,
      run: () => {
        active += 1;
        resolve();
      },
    });
    drain();
  });
}

export function releaseModuleVideoSlot(): void {
  active = Math.max(0, active - 1);
  drain();
}
