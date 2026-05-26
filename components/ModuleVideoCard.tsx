"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, UserPlus } from "lucide-react";
import type { CurriculumModule } from "@/lib/data";
import { MODULE_PREVIEW_MS } from "@/lib/constants";
import { acquireModuleVideoSlot, releaseModuleVideoSlot } from "@/lib/module-video-queue";
import { moduleVideoUrl } from "@/lib/module-videos";
import { FormCta } from "./FormCta";
import { REGISTER_MODULE_CTA, REGISTER_PRIMARY } from "@/lib/marketing";
import { useCurriculumPlay } from "./CurriculumPlayContext";

type Props = {
  module: CurriculumModule;
};

const MAX_RETRIES = 4;

export function ModuleVideoCard({ module: mod }: Props) {
  const videoSrc = moduleVideoUrl(mod.videoPath);
  const { playToken } = useCurriculumPlay();
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [locked, setLocked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [loading, setLoading] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPlayToken = useRef(0);
  const retryCountRef = useRef(0);
  const hasSlotRef = useRef(false);
  const previewStartedRef = useRef(false);
  const isVisibleRef = useRef(false);

  const stopProgress = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = null;
  }, []);

  const clearLockTimer = useCallback(() => {
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = null;
  }, []);

  const releaseSlot = useCallback(() => {
    if (hasSlotRef.current) {
      hasSlotRef.current = false;
      releaseModuleVideoSlot();
    }
  }, []);

  const startProgress = useCallback(() => {
    stopProgress();
    setProgress(0);
    const step = 50;
    const inc = 100 / (MODULE_PREVIEW_MS / step);
    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + inc)));
    }, step);
  }, [stopProgress]);

  const lockPreview = useCallback(() => {
    const v = videoRef.current;
    v?.pause();
    stopProgress();
    setProgress(100);
    setPlaying(false);
    setLocked(true);
    setLoading(false);
    releaseSlot();
  }, [stopProgress, releaseSlot]);

  const startPreview = useCallback(async () => {
    if (previewStartedRef.current) return;
    previewStartedRef.current = true;

    const v = videoRef.current;
    if (!v) {
      previewStartedRef.current = false;
      return;
    }

    setLoading(true);
    await acquireModuleVideoSlot(mod.n === 9 ? 0 : mod.n);
    hasSlotRef.current = true;

    clearLockTimer();
    stopProgress();
    retryCountRef.current = 0;
    setLocked(false);
    setVideoError(false);
    setPlaying(false);
    setProgress(0);
    v.muted = true;

    const scheduleLockAfterPlay = () => {
      clearLockTimer();
      lockTimerRef.current = setTimeout(lockPreview, MODULE_PREVIEW_MS);
    };

    const fail = () => {
      setVideoError(true);
      setLoading(false);
      releaseSlot();
    };

    const tryPlay = () => {
      v.muted = true;
      v.play().catch(() => {
        if (retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1;
          setTimeout(() => v.load(), 1000);
        } else {
          fail();
        }
      });
    };

    v.onerror = null;
    v.onplaying = null;
    v.oncanplay = null;

    v.onerror = () => {
      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current += 1;
        setTimeout(() => v.load(), 1000);
      } else {
        fail();
      }
    };

    v.oncanplay = () => tryPlay();

    v.onplaying = () => {
      setVideoError(false);
      setPlaying(true);
      setLoading(false);
      startProgress();
      scheduleLockAfterPlay();
    };

    v.src = videoSrc;
    v.currentTime = 0;
    v.load();
  }, [videoSrc, mod.n, startProgress, lockPreview, clearLockTimer, stopProgress, releaseSlot]);

  const maybeStartPreview = useCallback(() => {
    if (playToken === 0) return;
    if (!isVisibleRef.current) return;
    if (previewStartedRef.current) return;
    void startPreview();
  }, [playToken, startPreview]);

  useEffect(() => {
    if (playToken === 0 || playToken === lastPlayToken.current) return;
    lastPlayToken.current = playToken;
    previewStartedRef.current = false;
    setLocked(false);
    setVideoError(false);
    setPlaying(false);
    setLoading(false);
    setProgress(0);
    const v = videoRef.current;
    if (v) {
      v.removeAttribute("src");
      v.load();
    }
    maybeStartPreview();
  }, [playToken, maybeStartPreview]);

  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) maybeStartPreview();
      },
      { threshold: 0.08, rootMargin: "120px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [maybeStartPreview]);

  useEffect(
    () => () => {
      stopProgress();
      clearLockTimer();
      releaseSlot();
    },
    [stopProgress, clearLockTimer, releaseSlot]
  );

  return (
    <article
      ref={articleRef}
      className="module-grid-card flex flex-col overflow-hidden rounded-2xl border border-mauve/15 bg-white shadow-md ring-1 ring-mauve/10 transition hover:shadow-lg"
    >
      <div className="relative aspect-video w-full bg-[#071a20]">
        <div
          className="module-progress-bar pointer-events-none absolute inset-x-0 top-0 z-30 h-1 bg-mauve/20"
          aria-hidden
        >
          <div
            className="module-progress-fill h-full bg-rose transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-4 z-40 rounded-full bg-burgundy px-2.5 py-1 text-xs font-black text-white shadow-sm">
          Module {mod.n}
        </span>

        <div className={`module-video-wrap h-full w-full ${locked ? "is-locked" : ""}`}>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover"
            aria-label={mod.title}
          />

          {loading && !playing && !videoError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#071a20]/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                Loading preview…
              </span>
            </div>
          )}

          {locked && !videoError && (
            <div className="module-register-overlay">
              <span className="module-muted-badge">10 sec preview ended</span>
              <p className="module-register-overlay-title">Register & enroll to unlock this module</p>
              <p className="module-register-overlay-sub">
                Full tutor-led video, audio, and tools after paid enrollment
              </p>
              <FormCta variant="register" className="module-register-overlay-btn">
                <UserPlus className="h-4 w-4 shrink-0" />
                {REGISTER_PRIMARY}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </FormCta>
            </div>
          )}

          {videoError && (
            <div className="module-video-error z-20 px-3 text-center">
              <p className="text-xs font-bold">Video unavailable</p>
              <button
                type="button"
                className="mt-2 text-[10px] font-bold text-white underline"
                onClick={() => {
                  previewStartedRef.current = false;
                  releaseSlot();
                  setVideoError(false);
                  void startPreview();
                }}
              >
                Tap to retry
              </button>
            </div>
          )}
        </div>

        {playing && !locked && (
          <span className="pointer-events-none absolute bottom-3 right-3 z-40 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-burgundy shadow-sm">
            Preview · 10 sec
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-burgundy">{mod.short}</p>
        <h3 className="font-display mt-1 text-lg font-extrabold leading-snug text-ink">
          {mod.title.replace(/^Module \d+ — /, "")}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{mod.desc}</p>
        {mod.videoPart2Path && (
          <p className="mt-2 text-xs font-semibold text-burgundy">+ Part 2 after enrollment</p>
        )}
        <FormCta
          variant="register"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-rose/40 bg-rose/10 px-4 py-2 text-xs font-extrabold text-burgundy hover:bg-cream"
        >
          <UserPlus className="h-3.5 w-3.5" />
          {REGISTER_MODULE_CTA}
        </FormCta>
      </div>
    </article>
  );
}
