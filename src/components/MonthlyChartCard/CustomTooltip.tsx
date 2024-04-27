import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

// use recharts specific types for value and name
interface CustomTooltipProps<
  TValue extends ValueType = number,
  TName extends NameType = string
> {
  active?: boolean;
  payload?: Payload<TValue, TName>[];
  label?: string;
}

// use specific recharts constraints for TValue and TName
export const CustomTooltip = <
  TValue extends ValueType = number,
  TName extends NameType = string
>({
  active,
  payload,
  label,
}: CustomTooltipProps<TValue, TName>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-black p-2 rounded shadow-md">
        <p className="text-lg">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="ml-2">${entry.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};
