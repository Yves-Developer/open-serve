"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export interface Detail {
  label: string;
  value: string;
}
export function ComboboxBox({
  Details,
  type,
  setData,
}: {
  Details: Detail[];
  type: string;
  setData: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? Details.find((Detail) => Detail.value === value)?.label
            : `Select ${type}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No Detail found.</CommandEmpty>
            <CommandGroup>
              {Details.map((Detail) => (
                <CommandItem
                  key={Detail.value}
                  value={Detail.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setData(currentValue);
                    setOpen(false);
                  }}
                >
                  {Detail.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === Detail.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
