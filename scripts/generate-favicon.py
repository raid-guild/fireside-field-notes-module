#!/usr/bin/env python3
"""Extract the right-facing warrior frame into Next.js app icon assets."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'public' / 'sprites' / 'characters' / 'warrior.png'
APP = ROOT / 'src' / 'app'

FRAME_W = 54
FRAME_H = 68
RIGHT_FRAME = 3


def warrior_frame() -> Image.Image:
    sheet = Image.open(SRC).convert('RGBA')
    left = RIGHT_FRAME * FRAME_W
    return sheet.crop((left, 0, left + FRAME_W, FRAME_H))


def fit_square(frame: Image.Image, size: int) -> Image.Image:
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    scale = size / max(FRAME_W, FRAME_H)
    width = int(FRAME_W * scale)
    height = int(FRAME_H * scale)
    resized = frame.resize((width, height), Image.NEAREST)
    canvas.paste(resized, ((size - width) // 2, (size - height) // 2), resized)
    return canvas


def main() -> None:
    frame = warrior_frame()

    icon = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
    resized = frame.resize((26, 32), Image.NEAREST)
    icon.paste(resized, (3, 0), resized)
    icon.save(APP / 'icon.png')

    apple = Image.new('RGBA', (180, 180), (0, 0, 0, 0))
    resized = frame.resize((142, 180), Image.NEAREST)
    apple.paste(resized, (19, 0), resized)
    apple.save(APP / 'apple-icon.png')

    ico_frames = [fit_square(frame, size) for size in (16, 32, 48)]
    ico_frames[0].save(
        APP / 'favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=ico_frames[1:],
    )

    print(f'Wrote favicon assets in {APP} from {SRC.name}')


if __name__ == '__main__':
    main()