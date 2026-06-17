import { MousePointer2, MousePointerClick, MicVocal } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ActivationMode } from "../../types/electron";

interface ActivationModeSelectorProps {
  value: ActivationMode;
  onChange: (mode: ActivationMode) => void;
  disabled?: boolean;
}

const OPTIONS = [
  { mode: "tap", Icon: MousePointerClick, labelKey: "common.tap" },
  { mode: "push", Icon: MicVocal, labelKey: "common.hold" },
  { mode: "doubleTap", Icon: MousePointer2, labelKey: "common.doubleTap" },
] as const;

export function ActivationModeSelector({
  value,
  onChange,
  disabled = false,
}: ActivationModeSelectorProps) {
  const { t } = useTranslation();
  const activeIndex = Math.max(
    OPTIONS.findIndex((option) => option.mode === value),
    0
  );

  return (
    <div
      className={`
        relative flex rounded-md border p-0.5 transition-colors duration-200
        bg-surface-1 border-border-subtle
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {/* Sliding indicator */}
      <div
        className={`
          absolute top-0.5 bottom-0.5 rounded
          bg-surface-raised border border-border-subtle
          transition-transform duration-200 ease-out
        `}
        style={{
          width: `calc(${100 / OPTIONS.length}% - 2px)`,
          transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 4}px))`,
        }}
      />

      {OPTIONS.map(({ mode, Icon, labelKey }) => (
        <button
          key={mode}
          type="button"
          disabled={disabled}
          onClick={() => onChange(mode)}
          className={`
            relative z-10 flex-1 flex items-center justify-center gap-1 rounded px-2 py-1
            transition-colors duration-150
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            ${value === mode ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
          `}
        >
          <Icon className="w-3 h-3" />
          <span className="text-xs font-medium">{t(labelKey)}</span>
        </button>
      ))}
    </div>
  );
}
