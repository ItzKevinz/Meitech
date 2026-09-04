import { useEffect, useRef, useState } from "react";

import {
  Square,
  Grid3X3,
  Image,
  PlaySquare,
  Waves,
  Droplets,
  EyeOff,
  Plus,
  X,
  Pipette,
  ChevronDown,
} from "lucide-react";

import { createPortal } from "react-dom";

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const hexToRgb = (hex) => {
  let cleanHex = String(hex || "")
    .replace("#", "")
    .trim();

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return null;
  }

  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16),
  };
};

const rgbToHex = (r, g, b) => {
  return (
    "#" +
    [r, g, b]
      .map((value) =>
        clamp(Number(value) || 0, 0, 255)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
      .toUpperCase()
  );
};

const rgbToHsv = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;

  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }

    h *= 60;

    if (h < 0) {
      h += 360;
    }
  }

  const s = max === 0 ? 0 : diff / max;
  const v = max;

  return {
    h,
    s: s * 100,
    v: v * 100,
  };
};

const hsvToRgb = (h, s, v) => {
  s /= 100;
  v /= 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

const ColorPicker = ({
  value = "#FFFFFF",
  opacity = 100,
  onChange,
}) => {
  const pickerRef = useRef(null);
  const portalRef = useRef(null);

  const initialRgb = hexToRgb(value) || {
    r: 255,
    g: 255,
    b: 255,
  };

  const initialHsv = rgbToHsv(
    initialRgb.r,
    initialRgb.g,
    initialRgb.b
  );

  const [open, setOpen] = useState(false);

  const [pickerPosition, setPickerPosition] = useState({
    top: 0,
    left: 0,
  });

  const [format, setFormat] = useState("HEX");
  const [formatOpen, setFormatOpen] = useState(false);

  const [hue, setHue] = useState(initialHsv.h);
  const [saturation, setSaturation] = useState(initialHsv.s);
  const [brightness, setBrightness] = useState(initialHsv.v);

  const [alpha, setAlpha] = useState(opacity);

  const [hexValue, setHexValue] = useState(
    rgbToHex(
      initialRgb.r,
      initialRgb.g,
      initialRgb.b
    ).replace("#", "")
  );

  const [rgbValue, setRgbValue] = useState(initialRgb);

  /*
   * Sync kalau value dari parent berubah
   */
  useEffect(() => {
    const nextRgb = hexToRgb(value);

    if (!nextRgb) return;

    const nextHsv = rgbToHsv(
      nextRgb.r,
      nextRgb.g,
      nextRgb.b
    );

    setHue(nextHsv.h);
    setSaturation(nextHsv.s);
    setBrightness(nextHsv.v);

    setRgbValue(nextRgb);

    setHexValue(
      rgbToHex(
        nextRgb.r,
        nextRgb.g,
        nextRgb.b
      ).replace("#", "")
    );
  }, [value]);

  /*
   * Sync opacity dari parent
   */
  useEffect(() => {
    setAlpha(clamp(Number(opacity) || 0, 0, 100));
  }, [opacity]);

  /*
   * Klik di luar button / popup
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedButton =
        pickerRef.current?.contains(event.target);

      const clickedPicker =
        portalRef.current?.contains(event.target);

      if (!clickedButton && !clickedPicker) {
        setOpen(false);
        setFormatOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * Kirim warna ke parent
   */
  const emitColor = (rgb, nextAlpha = alpha) => {
    const hex = rgbToHex(
      rgb.r,
      rgb.g,
      rgb.b
    );

    setRgbValue(rgb);
    setHexValue(hex.replace("#", ""));
    setAlpha(nextAlpha);

    if (onChange) {
      onChange({
        hex,
        rgb,
        opacity: nextAlpha,
      });
    }
  };

  /*
   * AREA WARNA
   */
  const handleSquare = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x = clamp(
      (event.clientX - rect.left) / rect.width,
      0,
      1
    );

    const y = clamp(
      (event.clientY - rect.top) / rect.height,
      0,
      1
    );

    const nextSaturation = x * 100;
    const nextBrightness = (1 - y) * 100;

    setSaturation(nextSaturation);
    setBrightness(nextBrightness);

    const rgb = hsvToRgb(
      hue,
      nextSaturation,
      nextBrightness
    );

    emitColor(rgb);
  };

  /*
   * HUE
   */
  const handleHue = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x = clamp(
      (event.clientX - rect.left) / rect.width,
      0,
      1
    );

    const nextHue = x * 360;

    setHue(nextHue);

    const rgb = hsvToRgb(
      nextHue,
      saturation,
      brightness
    );

    emitColor(rgb);
  };

  /*
   * OPACITY
   */
  const handleAlpha = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x = clamp(
      (event.clientX - rect.left) / rect.width,
      0,
      1
    );

    const nextAlpha = Math.round(x * 100);

    setAlpha(nextAlpha);

    const rgb = hsvToRgb(
      hue,
      saturation,
      brightness
    );

    emitColor(rgb, nextAlpha);
  };

  /*
   * HEX INPUT
   */
  const handleHexChange = (event) => {
    let nextValue = event.target.value
      .replace("#", "")
      .replace(/[^0-9A-Fa-f]/g, "")
      .slice(0, 6);

    setHexValue(nextValue);

    if (nextValue.length === 6) {
      const rgb = hexToRgb(nextValue);

      if (rgb) {
        const hsv = rgbToHsv(
          rgb.r,
          rgb.g,
          rgb.b
        );

        setHue(hsv.h);
        setSaturation(hsv.s);
        setBrightness(hsv.v);

        emitColor(rgb);
      }
    }
  };

  /*
   * RGB INPUT
   */
  const handleRgbChange = (
    channel,
    value
  ) => {
    const numericValue = clamp(
      Number(
        String(value).replace(/\D/g, "")
      ) || 0,
      0,
      255
    );

    const nextRgb = {
      ...rgbValue,
      [channel]: numericValue,
    };

    const hsv = rgbToHsv(
      nextRgb.r,
      nextRgb.g,
      nextRgb.b
    );

    setHue(hsv.h);
    setSaturation(hsv.s);
    setBrightness(hsv.v);

    emitColor(nextRgb);
  };

  const hueColor = hsvToRgb(
    hue,
    100,
    100
  );

  const currentColor = rgbToHex(
    rgbValue.r,
    rgbValue.g,
    rgbValue.b
  );

  /*
   * BUKA PICKER
   */
  const handleOpenPicker = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

const pickerWidth = 205;
const pickerHeight = 390;
    const gap = 10;
    const screenPadding = 8;

    /*
     * DEFAULT:
     * popup di sebelah KIRI tombol
     */
    let left =
      rect.left -
      pickerWidth -
      gap;

    /*
     * Kalau kiri tidak cukup,
     * pindah ke kanan tombol
     */
    if (
      left <
      screenPadding
    ) {
      left =
        rect.right +
        gap;
    }

    /*
     * Posisi vertikal
     */
    let top = rect.top;

    /*
     * Jangan keluar bawah layar
     */
    if (
      top +
        pickerHeight >
      window.innerHeight -
        screenPadding
    ) {
      top =
        window.innerHeight -
        pickerHeight -
        screenPadding;
    }

    /*
     * Jangan keluar atas layar
     */
    if (
      top <
      screenPadding
    ) {
      top = screenPadding;
    }

    /*
     * Jangan keluar kanan layar
     */
    if (
      left +
        pickerWidth >
      window.innerWidth -
        screenPadding
    ) {
      left =
        window.innerWidth -
        pickerWidth -
        screenPadding;
    }

    /*
     * Jangan keluar kiri layar
     */
    if (
      left <
      screenPadding
    ) {
      left = screenPadding;
    }

    setPickerPosition({
      top,
      left,
    });

    setOpen((prev) => !prev);
    setFormatOpen(false);
  };

  return (
  <div
    ref={pickerRef}
    className="relative z-[99999] inline-block"
  >
    {/* BUTTON */}
    <button
      type="button"
      onClick={handleOpenPicker}
      className="flex h-[30px] items-center gap-1 rounded-full bg-[#8CC9F5] px-3 text-[9px] font-bold text-[#1557B0] shadow-sm transition hover:brightness-95"
    >
      Warna font
      <ChevronDown size={11} />
    </button>

    {/* PICKER */}
    {open &&
      createPortal(
        <div
          ref={portalRef}
          className="fixed z-[9999999] w-[205px] overflow-hidden rounded-[13px] bg-[#292929] text-white shadow-2xl"
          style={{
            top: `${pickerPosition.top}px`,
            left: `${pickerPosition.left}px`,
          }}
        >
          {/* HEADER */}
          <div className="flex h-[34px] items-center justify-between border-b border-[#414141] px-2.5">
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold tracking-wide text-[#8F8F8F]">
                COLOR PICKER
              </span>

              <ChevronDown
                size={9}
                className="text-[#8F8F8F]"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setFormatOpen(false);
              }}
              className="text-[#AAAAAA] transition hover:text-white"
            >
              <X size={13} />
            </button>
          </div>

          {/* COLOR AREA */}
          <div className="px-2.5 pt-2.5">
            <div
              className="relative h-[128px] w-full cursor-crosshair overflow-hidden rounded-[3px]"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(
                  event.pointerId
                );

                handleSquare(event);
              }}
              onPointerMove={(event) => {
                if (
                  event.currentTarget.hasPointerCapture(
                    event.pointerId
                  )
                ) {
                  handleSquare(event);
                }
              }}
              onPointerUp={(event) => {
                if (
                  event.currentTarget.hasPointerCapture(
                    event.pointerId
                  )
                ) {
                  event.currentTarget.releasePointerCapture(
                    event.pointerId
                  );
                }
              }}
              style={{
                touchAction: "none",
                backgroundColor: `rgb(${hueColor.r}, ${hueColor.g}, ${hueColor.b})`,
                backgroundImage: `
                  linear-gradient(
                    to bottom,
                    transparent 0%,
                    #000000 100%
                  ),
                  linear-gradient(
                    to right,
                    #FFFFFF 0%,
                    transparent 100%
                  )
                `,
              }}
            >
              <div
                className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white shadow-[0_0_0_1px_rgba(0,0,0,.45)]"
                style={{
                  left: `${saturation}%`,
                  top: `${100 - brightness}%`,
                }}
              />
            </div>

            {/* HUE */}
            <div
              className="relative mt-2 h-[7px] cursor-pointer rounded-full"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(
                  event.pointerId
                );

                handleHue(event);
              }}
              onPointerMove={(event) => {
                if (
                  event.currentTarget.hasPointerCapture(
                    event.pointerId
                  )
                ) {
                  handleHue(event);
                }
              }}
              onPointerUp={(event) => {
                if (
                  event.currentTarget.hasPointerCapture(
                    event.pointerId
                  )
                ) {
                  event.currentTarget.releasePointerCapture(
                    event.pointerId
                  );
                }
              }}
              style={{
                touchAction: "none",
                background:
                  "linear-gradient(to right, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white shadow-[0_0_0_1px_rgba(0,0,0,.35)]"
                style={{
                  left: `${(hue / 360) * 100}%`,
                }}
              />
            </div>

            {/* ALPHA */}
            <div
              className="relative mt-2 h-[7px] cursor-pointer overflow-hidden rounded-full"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(
                  event.pointerId
                );

                handleAlpha(event);
              }}
              onPointerMove={(event) => {
                if (
                  event.currentTarget.hasPointerCapture(
                    event.pointerId
                  )
                ) {
                  handleAlpha(event);
                }
              }}
              onPointerUp={(event) => {
                if (
                  event.currentTarget.hasPointerCapture(
                    event.pointerId
                  )
                ) {
                  event.currentTarget.releasePointerCapture(
                    event.pointerId
                  );
                }
              }}
              style={{
                touchAction: "none",
                backgroundImage: `
                  linear-gradient(
                    45deg,
                    #D9D9D9 25%,
                    transparent 25%
                  ),
                  linear-gradient(
                    -45deg,
                    #D9D9D9 25%,
                    transparent 25%
                  ),
                  linear-gradient(
                    45deg,
                    transparent 75%,
                    #D9D9D9 75%
                  ),
                  linear-gradient(
                    -45deg,
                    transparent 75%,
                    #D9D9D9 75%
                  )
                `,
                backgroundSize: "8px 8px",
                backgroundPosition:
                  "0 0, 0 4px, 4px -4px, -4px 0px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, transparent, ${currentColor})`,
                }}
              />

              <div
                className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white shadow-[0_0_0_1px_rgba(0,0,0,.35)]"
                style={{
                  left: `${alpha}%`,
                }}
              />
            </div>

            {/* EYEDROPPER */}
            <div className="mt-2">
              <button
                type="button"
                className="text-[#BBBBBB] transition hover:text-white"
                title="Eyedropper"
              >
                <Pipette size={13} />
              </button>
            </div>

            {/* VALUES */}
            <div className="mt-2 flex items-start gap-1">
              {/* FORMAT */}
              <div className="relative w-[48px]">
                <button
                  type="button"
                  onClick={() =>
                    setFormatOpen(
                      (prev) => !prev
                    )
                  }
                  className="flex h-[25px] w-full items-center justify-center gap-1 rounded-[4px] bg-[#3A3A3A] text-[8px] font-medium text-white"
                >
                  {format}
                  <ChevronDown size={8} />
                </button>

                {formatOpen && (
                  <div className="absolute bottom-[28px] left-0 z-[100] w-[48px] overflow-hidden rounded-[4px] border border-[#555] bg-[#333] shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setFormat("HEX");
                        setFormatOpen(false);
                      }}
                      className="block w-full px-2 py-1.5 text-left text-[8px] hover:bg-[#444]"
                    >
                      HEX
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormat("RGB");
                        setFormatOpen(false);
                      }}
                      className="block w-full px-2 py-1.5 text-left text-[8px] hover:bg-[#444]"
                    >
                      RGB
                    </button>
                  </div>
                )}

                <div className="mt-1 text-center text-[7px] text-[#999]">
                  Hex
                </div>
              </div>

              {/* COLOR VALUE */}
              {format === "HEX" ? (
                <div className="flex-1">
                  <input
                    value={hexValue}
                    onChange={handleHexChange}
                    className="h-[25px] w-full rounded-[4px] bg-[#3A3A3A] px-2 text-[9px] font-medium text-white outline-none"
                  />

                  <div className="mt-1 text-center text-[7px] text-[#999]">
                    Hex
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 gap-1">
                  <div className="flex-1">
                    <input
                      value={rgbValue.r}
                      onChange={(e) =>
                        handleRgbChange(
                          "r",
                          e.target.value
                        )
                      }
                      className="h-[25px] w-full rounded-[4px] bg-[#3A3A3A] text-center text-[9px] text-white outline-none"
                    />

                    <div className="mt-1 text-center text-[7px] text-[#999]">
                      R
                    </div>
                  </div>

                  <div className="flex-1">
                    <input
                      value={rgbValue.g}
                      onChange={(e) =>
                        handleRgbChange(
                          "g",
                          e.target.value
                        )
                      }
                      className="h-[25px] w-full rounded-[4px] bg-[#3A3A3A] text-center text-[9px] text-white outline-none"
                    />

                    <div className="mt-1 text-center text-[7px] text-[#999]">
                      G
                    </div>
                  </div>

                  <div className="flex-1">
                    <input
                      value={rgbValue.b}
                      onChange={(e) =>
                        handleRgbChange(
                          "b",
                          e.target.value
                        )
                      }
                      className="h-[25px] w-full rounded-[4px] bg-[#3A3A3A] text-center text-[9px] text-white outline-none"
                    />

                    <div className="mt-1 text-center text-[7px] text-[#999]">
                      B
                    </div>
                  </div>
                </div>
              )}

              {/* ALPHA */}
              <div className="w-[39px]">
                <div className="flex h-[25px] items-center rounded-[4px] bg-[#3A3A3A] px-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={alpha}
                    onChange={(e) => {
                      const nextAlpha =
                        clamp(
                          Number(
                            e.target.value
                          ),
                          0,
                          100
                        );

                      setAlpha(nextAlpha);

                      const rgb =
                        hsvToRgb(
                          hue,
                          saturation,
                          brightness
                        );

                      emitColor(
                        rgb,
                        nextAlpha
                      );
                    }}
                    className="w-full bg-transparent text-center text-[8px] text-white outline-none"
                  />
                </div>

                <div className="mt-1 text-center text-[7px] text-[#999]">
                  Alpha
                </div>
              </div>
            </div>

            {/* CREATE VARIABLE */}
            <button
              type="button"
              className="mt-2 h-[23px] w-full rounded-[4px] bg-[#5A5A5A] text-[8px] font-semibold text-[#D0D0D0] transition hover:bg-[#666]"
            >
              Create Color Variable
            </button>

            {/* FROM THIS DOCUMENT */}
            <div className="mt-3 border-t border-[#414141] pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-semibold text-[#BDBDBD]">
                  FROM THIS DOCUMENT
                </span>

                <span className="text-[10px] text-[#777]">
                  ≡
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "#171717",
                  "#FFFFFF",
                  "#F8F4E9",
                  "#FDCB01",
                  "#6379E8",
                  "#8CC9F5",
                  "#7FC97F",
                  "#FF0000",
                  "#2C2C2C",
                  "#999999",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      const rgb =
                        hexToRgb(
                          color
                        );

                      if (!rgb) return;

                      const hsv =
                        rgbToHsv(
                          rgb.r,
                          rgb.g,
                          rgb.b
                        );

                      setHue(hsv.h);
                      setSaturation(
                        hsv.s
                      );
                      setBrightness(
                        hsv.v
                      );

                      emitColor(
                        rgb
                      );
                    }}
                    className="h-[14px] w-[14px] rounded-full border border-[#555] transition hover:scale-110"
                    style={{
                      backgroundColor:
                        color,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* MAIN COLOR */}
            <div className="pb-3 pt-2">
              <div className="text-[8px] font-semibold text-[#BDBDBD]">
                Main Color
              </div>

              <div className="mt-1.5 flex gap-2">
                {[
                  "#00D9FF",
                  "#00CFE8",
                  "#8657FF",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      const rgb =
                        hexToRgb(
                          color
                        );

                      if (!rgb) return;

                      const hsv =
                        rgbToHsv(
                          rgb.r,
                          rgb.g,
                          rgb.b
                        );

                      setHue(hsv.h);
                      setSaturation(
                        hsv.s
                      );
                      setBrightness(
                        hsv.v
                      );

                      emitColor(
                        rgb
                      );
                    }}
                    className="h-[15px] w-[15px] rounded-full border border-[#555] transition hover:scale-110"
                    style={{
                      backgroundColor:
                        color,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ColorPicker;