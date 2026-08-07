# ملفات الموجز الصوتي

Drop the daily TTS render here as `brief-YYYY-MM-DD.mp3` and point the section at it:

    <section data-sx-brief data-edition="2026-08-07" ...>
      <audio data-sx-brief-audio preload="none" src="assets/audio/brief-2026-08-07.mp3"></audio>

If the file is missing or fails to load, brief.js switches the section to its
silent state: the listen box is replaced by a short notice and the written
brief stays exactly as published. Nothing else changes.
