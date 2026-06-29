#!/usr/bin/env python3
"""Regenerate public/sprites/flair-items.png (192x48) to match items.png palette."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'sprites' / 'flair-items.png'

TRANSPARENT = (0, 0, 0, 0)
GOLD = (244, 194, 63, 255)
GOLD_DARK = (204, 131, 30, 255)
GOLD_LIGHT = (248, 232, 215, 255)
WOOD = (139, 58, 32, 255)
WOOD_LIGHT = (186, 77, 48, 255)
FLETCH = (172, 161, 157, 255)
FIRE_CORE = (248, 232, 215, 255)
FIRE_MID = (245, 132, 124, 255)
FIRE_OUT = (186, 77, 48, 255)
SPARK = (244, 194, 63, 255)
SPARK_LIGHT = (248, 232, 215, 255)


def blank() -> list[list[tuple[int, int, int, int]]]:
    return [[TRANSPARENT for _ in range(48)] for _ in range(48)]


def paint(grid, x: int, y: int, color) -> None:
    if 0 <= x < 48 and 0 <= y < 48:
        grid[y][x] = color


def fill_ellipse(grid, cx: int, cy: int, rx: int, ry: int, color) -> None:
    for y in range(48):
        for x in range(48):
            if ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1:
                grid[y][x] = color


def grid_to_image(grid) -> Image.Image:
    img = Image.new('RGBA', (48, 48), TRANSPARENT)
    px = img.load()
    for y in range(48):
        for x in range(48):
            px[x, y] = grid[y][x]
    return img


def coin_sprite() -> list:
    coin = blank()
    fill_ellipse(coin, 24, 26, 11, 9, GOLD_DARK)
    fill_ellipse(coin, 24, 25, 10, 8, GOLD)
    for y in range(18, 34):
        for x in range(14, 34):
            if coin[y][x] == GOLD and x < 20 and y < 24:
                coin[y][x] = GOLD_LIGHT
    paint(coin, 19, 20, GOLD_LIGHT)
    paint(coin, 20, 19, GOLD_LIGHT)
    paint(coin, 18, 21, GOLD_LIGHT)
    return coin


def sparkle_sprite() -> list:
    spark = blank()
    center = (24, 24)
    for i in range(-14, 15):
        paint(spark, center[0], center[1] + i, SPARK)
        paint(spark, center[0] + i, center[1], SPARK)
    for i in range(-6, 7):
        paint(spark, center[0] + i, center[1] + i, SPARK_LIGHT)
        paint(spark, center[0] + i, center[1] - i, SPARK_LIGHT)
    paint(spark, 24, 24, SPARK_LIGHT)
    for dx, dy in ((8, -10), (-9, 8), (10, 9), (-8, -9)):
        paint(spark, 24 + dx, 24 + dy, SPARK)
        paint(spark, 24 + dx + 1, 24 + dy, SPARK_LIGHT)
    return spark


def fireball_sprite() -> list:
    fire = blank()
    for x in range(6, 22):
        for y in range(21, 27):
            if (x + y) % 2 == 0:
                paint(fire, x, y, FIRE_OUT)
    for x in range(14, 26):
        for y in range(20, 28):
            if (x + y) % 2 == 0:
                paint(fire, x, y, FIRE_MID)
    fill_ellipse(fire, 30, 24, 8, 7, FIRE_MID)
    fill_ellipse(fire, 31, 24, 6, 5, FIRE_CORE)
    paint(fire, 29, 22, FIRE_CORE)
    paint(fire, 33, 23, GOLD)
    return fire


def arrow_sprite() -> list:
    arrow = blank()
    for x in range(10, 34):
        for y in range(22, 26):
            paint(arrow, x, y, WOOD)
    for i in range(6):
        paint(arrow, 34 + i, 22 - i, WOOD_LIGHT if i < 3 else WOOD)
        paint(arrow, 34 + i, 25 + i, WOOD_LIGHT if i < 3 else WOOD)
        paint(arrow, 34 + i, 24, WOOD_LIGHT)
    paint(arrow, 39, 24, GOLD_LIGHT)
    for i in range(5):
        paint(arrow, 9 - i, 20 + i, FLETCH)
        paint(arrow, 9 - i, 27 - i, FLETCH)
    paint(arrow, 8, 24, FLETCH)
    paint(arrow, 7, 23, FLETCH)
    paint(arrow, 7, 25, FLETCH)
    return arrow


def main() -> None:
    sheet = Image.new('RGBA', (192, 48), TRANSPARENT)
    for index, grid in enumerate((coin_sprite(), sparkle_sprite(), fireball_sprite(), arrow_sprite())):
        sheet.paste(grid_to_image(grid), (index * 48, 0))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(OUT)
    print(f'Wrote {OUT} ({sheet.size[0]}x{sheet.size[1]})')


if __name__ == '__main__':
    main()