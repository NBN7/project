"use client";

import { useState, useEffect } from "react";

import { twMerge } from "tailwind-merge";

interface CircleProgressProps {
  value: number;
  outerCircle?: string;
  innerCircle?: string;
  size?: number;
}

export const CircleProgress = ({
  value = 0,
  outerCircle,
  innerCircle,
  size = 100,
}: CircleProgressProps) => {
  const [defaultValue, setDefaultValue] = useState(0);

  const strokeWidth = 10; // Stroke width for the progress circle
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const interval = setInterval(() => {
      if (defaultValue >= value) {
        clearInterval(interval);
        return;
      }
      setDefaultValue((prev) => prev + 1);
    }, 10);

    return () => clearInterval(interval);
  }, [defaultValue, value]);

  const strokeDashoffset = circumference - (defaultValue / 100) * circumference;

  return (
    <div
      className={twMerge(
        "cursor-default relative h-[100px] w-[100px] rounded-full grid place-items-center",
        outerCircle
      )}
    >
      <svg
        className="absolute top-0 left-0 right-0 bottom-0 m-auto"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#80bbff"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0077ff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
        />
      </svg>

      <div
        className={twMerge(
          "z-10 relative text-center text-lg font-semibold dark:text-white text-black",
          innerCircle
        )}
      >
        {defaultValue}%
      </div>
    </div>
  );
};