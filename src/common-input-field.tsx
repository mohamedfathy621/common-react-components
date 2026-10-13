import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Dispatch, SetStateAction } from "react";

interface BaseCommonInputFieldProps {
  label: string;
  placeHolder?: string;
  id: string;
  icon?: string;
  loading?: boolean;
  locked?: boolean;
  unlock?: () => void;
}

type CommonInputFieldProps = BaseCommonInputFieldProps &
  (
    | {
        type: "text" | "text-box";
        value: string;
        setValue: Dispatch<SetStateAction<string>>;
      }
    | {
        type: "number";
        value: number;
        setValue: Dispatch<SetStateAction<number>>;
      }
    | {
        type: "date";
        value: Date | null;
        setValue: Dispatch<SetStateAction<Date | null>>;
      }
    | {
        type: "check";
        value: boolean;
        setValue: Dispatch<SetStateAction<boolean>>;
      }
  );
function CommonInputField({
  value,
  setValue,
  type,
  label,
  placeHolder,
  id,
  icon,
  loading,
  locked,
  unlock,
}: CommonInputFieldProps) {
  const inputLabel = <label htmlFor={id}>{label}</label>;

  const datePicker = (
    <DatePicker
      id={id}
      selected={value as Date | null}
      onChange={(date: Date | null) =>
        (setValue as (value: React.SetStateAction<Date | null>) => void)(date)
      }
      placeholderText={placeHolder}
      dateFormat="dd/MM/yyyy"
      className="w-full rounded-xl border-2 border-gray-300 bg-white p-2 outline-none focus:border-[#1E104E]"
      isClearable
    />
  );

  const checkBox = (
    <label className="flex items-center gap-3 cursor-pointer w-fit">
      <input
        type="checkbox"
        checked={value as boolean}
        onChange={(e) =>
          (setValue as (value: React.SetStateAction<boolean>) => void)(
            e.target.checked,
          )
        }
        className="peer sr-only"
      />

      <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#1E104E] bg-white transition-colors peer-checked:bg-[#1E104E]">
        {value && (
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path
              d="M5 12.5L10 17L19 7"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <span className="text-sm">Remember me</span>
    </label>
  );

  const textBox = (
    <textarea
      id={id}
      placeholder={placeHolder}
      value={value as string}
      onChange={(e) =>
        (setValue as (value: React.SetStateAction<string>) => void)(
          e.target.value,
        )
      }
      rows={4}
      className="w-full resize-y rounded-xl border-2 border-gray-300 bg-white p-3 outline-none transition-colors focus:border-[#1E104E]"
    />
  );

  const plainInput = (
    <input
      id={id}
      type={type as "text" | "number"}
      placeholder={placeHolder}
      value={value as string | number}
      disabled={locked}
      onChange={(e) =>
        (setValue as (value: React.SetStateAction<string | number>) => void)(
          e.target.value,
        )
      }
      className={`w-full ${locked ? "bg-black/30 border-0" : "bg-white border-2"} p-2 rounded-xl  border-gray-300  outline-none focus-within:border-[#1E104E] transition-colors`}
    ></input>
  );

  if (type === "check") {
    return checkBox;
  } else {
    return (
      <div className="flex flex-col gap-4">
        {inputLabel}
        <div className="relative inline-block w-full">
          {type === "date"
            ? datePicker
            : type === "text-box"
              ? textBox
              : plainInput}

          {loading && (
            <div className="w-4 h-4 border-4 border-gray-300 border-t-[#1E104E] rounded-full animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          )}
          {icon && !loading && !locked && (
            <i
              className={`${icon} absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none`}
            />
          )}
          {locked && (
            <i
              onClick={unlock}
              className={`bx bx-x absolute text-2xl font-bold right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer`}
            />
          )}
        </div>
      </div>
    );
  }
}
export default CommonInputField;
