import React, { useEffect, useRef, useState } from "react";

const InputField = ({
    label,
    name,
    register,
    errors,
    rules = {},
    value = "",
    type = "text",
    readOnly = false,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const inputRef = useRef(null);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== "");
        if (rules.onBlur) rules.onBlur(e); // Preserve any rule onBlur
    };

    useEffect(() => {
        // Delay reading input value to let react-hook-form set it
        const timeout = setTimeout(() => {
            if (inputRef.current && inputRef.current.value !== "") {
                setHasValue(true);
            }
        }, 50);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="relative mb-6">
            <input
                {...register(name, { ...rules, onBlur: handleBlur })}
                ref={(e) => {
                    register(name, rules).ref(e);
                    inputRef.current = e;
                }}
                id={name}
                name={name}
                type={type}
                className="w-full p-3 py-4 border-[2px] border-foreground/60 focus:outline-none focus:border-foreground text-foreground transition-all duration-100 ease-linear uppercase"
                placeholder=" "
                onFocus={handleFocus}
                readOnly={readOnly}
                defaultValue={value}
            />
            <label
                htmlFor={name}
                className={`absolute capitalize px-2 z-10 bg-white left-3 transition-all duration-200 ${
                    isFocused || hasValue
                        ? "top-0 text-xs text-foreground"
                        : "top-1/2 text-base text-foreground/80"
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

export default InputField;
