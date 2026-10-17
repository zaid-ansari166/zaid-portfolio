"use client";
import { useState } from "react";
import Image from "next/image";
import { IconPlay } from "./Icons";

/** Click-to-play YouTube facade: renders the poster + play button; the iframe loads only after the user clicks. */
export default function LiteYouTube({ id, title, poster, posterAlt = "", sizes = "(min-width: 1024px) 60vw, 100vw", priority = false }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className="lite-yt" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
      <Image src={poster} alt={posterAlt} fill sizes={sizes} priority={priority} placeholder="blur" />
      <span className="lite-yt__btn" aria-hidden="true">
        <IconPlay size={28} />
      </span>
      <span className="lite-yt__label" aria-hidden="true">
        Play video
      </span>
    </button>
  );
}
