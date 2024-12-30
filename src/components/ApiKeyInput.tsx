import React, { useState } from 'react';
import { Check, X, Loader2 } from 'lucide-react';

interface ApiKeyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onValidate: (key: string) => Promise<boolean>;
}

export default function ApiKeyInput({ label, value, onChange, onValidate }: ApiKeyInputProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsValid(null);
  };

  const handleBlur = async () => {
    if (!value) return;
    setIsValidating(true);
    const valid = await onValidate(value);
    setIsValid(valid);
    setIsValidating(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="absolute right-3 top-2.5">
          {isValidating && <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />}
          {!isValidating && isValid === true && <Check className="h-5 w-5 text-green-500" />}
          {!isValidating && isValid === false && <X className="h-5 w-5 text-red-500" />}
        </div>
      </div>
    </div>
  );
}