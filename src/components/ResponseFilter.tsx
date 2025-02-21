import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const options = [
  { label: "Alphabets", value: "alphabets" },
  { label: "Numbers", value: "numbers" },
  { label: "Highest Alphabet", value: "highest" },
];

interface ResponseFilterProps {
  selected: string[];
  onChange: (value: string[]) => void;
}

export function ResponseFilter({ selected, onChange }: ResponseFilterProps) {
  const [open, setOpen] = React.useState(false);

  // Toggles an option on/off in the selected list
  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  // Removes a specific option
  const removeOption = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">Multi Filter</label>

      {/* Display selected filters as chips */}
      <div className="flex flex-wrap items-center gap-2">
        {selected.map((filter) => (
          <div
            key={filter}
            className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
          >
            {filter}
            <button
              onClick={() => removeOption(filter)}
              className="hover:text-blue-900"
            >
              x
            </button>
          </div>
        ))}

        {/* + Add Filter button with a simple popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 hover:bg-gray-50",
              )}
            >
              + Add Filter
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-44 p-2" align="start">
            <div className="flex flex-col space-y-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    toggleOption(option.value);
                    setOpen(false); // Close popover after selection
                  }}
                  className="flex w-full items-center justify-between rounded px-2 py-1 text-sm hover:bg-gray-100"
                >
                  <span>{option.label}</span>
                  {selected.includes(option.value) && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
