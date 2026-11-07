'use client';

import { useEffect } from 'react';

export default function ImageProtection() {
  useEffect(() => {
    const isProtectedMedia = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(target.closest('img, picture, canvas, video'));

    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const preventMediaAction = (event: Event) => {
      if (isProtectedMedia(event.target)) {
        event.preventDefault();
      }
    };

    const preventSaveShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && ['s', 'u'].includes(event.key.toLowerCase())) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventMediaAction);
    document.addEventListener('selectstart', preventMediaAction);
    document.addEventListener('keydown', preventSaveShortcut);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventMediaAction);
      document.removeEventListener('selectstart', preventMediaAction);
      document.removeEventListener('keydown', preventSaveShortcut);
    };
  }, []);

  return null;
}
