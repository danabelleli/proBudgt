import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Select({ size, options, onChange, inputValue }) {
  return (
    <Listbox value={inputValue} onChange={onChange}>
      <div className="relative">
        <ListboxButton
          className={`grid ${
            size ? size : "w-full"
          } cursor-default grid-cols-1 rounded-[1rem] bg-white py-[0.7rem] pl-[1rem] pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-[--color-gray-900] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[--color-primary-900] text-[1.6rem]`}
        >
          <span className="col-start-1 row-start-1 truncate pr-6">
            {inputValue?.label || "Select..."}
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-6 self-center justify-self-end text-[--color-gray-900]"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[1rem] bg-white py-1 text-[1.5rem] shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-[--color-gray-900] data-[focus]:bg-[--color-primary-900] data-[focus]:text-white data-[focus]:outline-none"
            >
              <span className="block truncate font-regular group-data-[selected]:font-medium">
                {option.label}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[--color-primary-900] group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-6" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
