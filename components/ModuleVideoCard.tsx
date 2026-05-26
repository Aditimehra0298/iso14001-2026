"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, UserPlus } from "lucide-react";
import type { CurriculumModule } from "@/lib/data";
import { MODULE_PREVIEW_MS } from "@/lib/constants";
import { moduleVideoUrl } from "@/lib/module-videos";
import { FormCta } from "./FormCta";
import { REGISTER_MODULE_CTA, REGISTER_PRIMARY } from "@/lib/marketing";
import { useCurriculumPlay } from "./CurriculumPlayContext";

type Props = {
  module: CurriculumModule;
};

export function ModuleVideoCard({ module: mod }: Props) {
  const videoSrc = moduleVideoUrl(mod.videoPath);
  const { playToken } = useCurriculumPlay();
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [locked, setLocked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPlayToken = useRef(0);

  const stopProgress = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = null;
  }, []);

  const clearLockTimer = useCallback(() => {
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = null;
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
  }, [stopProgress]);

  const startPreview = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    clearLockTimer();
    setLocked(false);
    setVideoError(false);
    v.muted = true;
    v.onerror = () => setVideoError(true);
    v.onloadeddata = () => {
      setVideoError(false);
      v.muted = true;
      v.play().catch(() => setVideoError(true));
    };

    v.src = videoSrc;
    v.currentTime = 0;
    v.load();
    setPlaying(true);
    startProgress();

    lockTimerRef.current = setTimeout(lockPreview, MODULE_PREVIEW_MS);
  }, [videoSrc, startProgress, lockPreview, clearLockTimer]);

  useEffect(() => {
    if (playToken === 0 || playToken === lastPlayToken.current) return;
    lastPlayToken.current = playToken;
    startPreview();
  }, [playToken, startPreview]);

  useEffect(
    () => () => {
      stopProgress();
      clearLockTimer();
    },
    [stopProgress, clearLockTimer]
  );

  return (
    <article className="module-grid-card flex flex-col overflow-hidden rounded-2xl border border-mauve/15 bg-white shadow-md ring-1 ring-mauve/10 transition hover:shadow-lg">
      <div className="relative aspect-video w-full bg-[#071a20]">
        <div
          className="module-progress-bar absolute inset-x-0 top-0 z-20 h-1 bg-mauve/20"
          aria-hidden
        >
          <div
            className="module-progress-fill h-full bg-rose transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={`module-video-wrap h-full w-full ${locked ? "is-locked" : ""}`}>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            aria-label={mod.title}
          />

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
            <div className="module-video-error px-3 text-center">
              <p className="text-xs font-bold">Video unavailable</p>
              <p className="mt-1 text-[10px] font-semibold opacity-90">
                Add MP4s to public/videos/, set URLs in lib/module-videos.manifest.json, or set
                NEXT_PUBLIC_MODULE_VIDEOS_CDN_URL in Vercel.
              </p>
            </div>
          )}
        </div>

        <span className="absolute left-3 top-4 z-20 rounded-full bg-burgundy px-2.5 py-1 text-xs font-black text-white shadow-sm">
          Module {mod.n}
        </span>

        {playing && !locked && (
          <span className="absolute bottom-3 right-3 z-20 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-burgundy shadow-sm">
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
