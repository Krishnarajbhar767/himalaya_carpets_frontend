import React, { useEffect, useRef, useState } from "react";

const SelectField = ({
    label,
    name,
    register,
    errors,
    rules = {},
    value = "",
    options = [],
    readOnly = false,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const selectRef = useRef(null);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== "");
        if (rules.onBlur) rules.onBlur(e); // Preserve rule handler
    };

    useEffect(() => {
        // Delay to let react-hook-form populate value
        const timeout = setTimeout(() => {
            if (selectRef.current && selectRef.current.value !== "") {
                setHasValue(true);
            }
        }, 50);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="relative mb-6">
            <select
                {...register(name, {
                    ...rules,
                    onBlur: handleBlur,
                })}
                ref={(e) => {
                    register(name, rules).ref(e);
                    selectRef.current = e;
                }}
                id={name}
                name={name}
                onFocus={handleFocus}
                className="w-full p-3 py-4 border-[2px] border-foreground/50 focus:outline-none focus:border-foreground text-foreground bg-white appearance-none transition-all duration-100 ease-linear capitalize"
                defaultValue={value}
                disabled={readOnly}
            >
                <option value="" disabled hidden></option>
                {options.map((opt) => {
                    if (opt?.label?.toLowerCase() === "all") return null;
                    return (
                        <option
                            key={opt.value}
                            value={opt.value}
                            className="capitalize text-foreground"
                        >
                            {opt.label}
                        </option>
                    );
                })}
            </select>
            <label
                htmlFor={name}
                className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${
                    isFocused || hasValue
                        ? "top-0 text-xs text-black"
                        : "top-1/2 text-base text-gray-600"
                } transform -translate-y-1/2`}
            >
                {label}
            </label>
            {errors?.[name] && (
                <p className="text-red-500 text-xs mt-1 absolute">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};

export default SelectField;
