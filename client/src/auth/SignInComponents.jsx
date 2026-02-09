import { forwardRef } from "react";

const InputField = forwardRef(
    ({ label, error, type = "text", ...inputProps }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <input
                    ref={ref}
                    type={type}
                    placeholder={label}
                    className={`pl-4 py-3 bg-gray-100 rounded-xl w-full outline-none ${error ? "border border-red-500" : ""
                        }`}
                    {...inputProps}
                />

                {error && (
                    <span className="text-red-500 text-xs">{error}</span>
                )}
            </div>
        );
    }
);

export default InputField;
