# Project 03 — Photo Booth

**Difficulty:** med · **Category:** Camera · **Core demo:** ~20 min

## What you're building
A browser-based photo booth: it shows your live webcam feed, lets you click "Snap" to freeze a photo, displays the still image, and lets you download it. It's cool because you'll access real hardware (the camera) straight from a webpage.

## The 20-minute core (MVP)
- On page load (or on a "start camera" button), the live webcam feed appears in a preview area
- A "Snap" button captures the current video frame as a still image
- The captured photo displays on screen (e.g. below or beside the live preview)
- A "Download" button/link saves the captured photo as an image file
- Show a message if camera access is denied or unavailable

## How it works (concept — no code)
- **Ask for and stream the camera** → the browser must request camera permission from the user, then hand back a live video stream you attach to a video element. Research: `navigator.mediaDevices.getUserMedia`, the `<video>` element and its `srcObject` property, `video.play()`.
- **Freeze a single frame from the live video** → a canvas can grab whatever the video is showing at this exact instant and draw it as a static image. Research: `<canvas>`, `canvas.getContext('2d')`, `drawImage()` (drawing a `<video>` element onto a canvas).
- **Turn the canvas into a real image file** → once the frame is drawn on canvas, you convert the canvas pixels into an image data URL that can be displayed or downloaded. Research: `canvas.toDataURL()`, setting an `<img>`'s `src` to that data URL.
- **Trigger a file download from the browser** → downloading isn't a special API call — it's a link with a special attribute that tells the browser to save instead of navigate. Research: the `<a>` element's `download` attribute, setting `href` to the data URL, and triggering a click programmatically (`.click()`).
- **Respond to button clicks** → "Snap" and "Download" are both just event-driven actions tied to buttons. Research: `click` events, `addEventListener`.

## What you'll use
- HTML/CSS: `<video>`, `<canvas>` (can stay hidden), buttons, image thumbnails
- JavaScript: functions, events (new), array to store a thumbnail strip of past captures
- Browser APIs: `navigator.mediaDevices.getUserMedia`, `<canvas>` `drawImage`, `canvas.toDataURL`, download via `<a download>`
- Public API: none
- **Note:** camera access requires a secure context (HTTPS or `localhost`) — it won't work opened directly from `file://`; use a local dev server (e.g. VS Code's Live Server extension)

## Design prompt (paste it → get a visual spec sheet → build from it)
Paste the prompt below into an AI/design tool that can output HTML (Claude, ChatGPT, v0, etc.). It returns a **single annotated design-spec sheet** — a picture of the screen with the exact pixel spacing, colors, and font sizes labeled on it, plus a per-component breakdown — so you can read every number and rebuild it yourself in plain HTML/CSS/JS. It's a spec to copy, **not** the finished app.

> Create a single self-contained HTML file that is an **annotated design-spec sheet** (like a Figma redline) for a webcam photo booth that shows a live camera preview, a shutter button, and a strip of captured photo thumbnails — NOT a working app. Include: (1) a clean static mockup of the main screen with realistic placeholder content (a live video preview panel, a circular shutter/snap button, a strip of captured photo thumbnails, and a download icon); (2) small labeled chips placed on the mockup marking the key spacing and sizes in pixels — padding, gaps, border-radius, main element sizes, and the biggest font size; (3) a **Colors** panel — each color as a swatch + hex code + what it is used for, and make sure body text stays at least 4.5:1 contrast against its background; (4) a **Typography** panel — each text element with its pixel font-size and weight; (5) a **Spacing & sizes** panel — max width, paddings, gaps, corner radii in px, plus one note on how the layout reflows on a narrow phone screen (a single breakpoint); (6) a **States** strip — small mini-mockups of the empty/first-load, loading, and error (or permission-denied) states, since the working app needs them; (7) a **Component-by-component breakdown** where each component shown in the mockup above gets its own small card listing all of its specs: width/height, padding, background hex, border and border-radius, and text color + font size + weight — so I can build one component at a time just by reading its card. Use the Manrope font for the mockup so it matches the style below, and keep the spec panels themselves in a clean readable sans-serif. Make it clean and beginner-friendly so someone who has coded for one month can read the numbers and implement it by looking. Style direction: dark charcoal studio feel, coral accent, soft rounded corners. Do NOT include any interactivity, JavaScript, or real data — it is a static spec sheet I will read and rebuild by hand.

## Resources
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download

## Stretch goals
- Add a 3-2-1 countdown before the photo is taken
- Add simple CSS filters (grayscale, sepia) applied to the preview and capture
- Let users delete individual photos from the thumbnail strip
- Add a flash animation effect on capture

## Skills it drills
- Functions, arrays, DOM manipulation (existing)
- Camera access, canvas image capture, file download via the DOM (new — the challenge)