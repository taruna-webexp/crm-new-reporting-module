/**
 * useValidation Hook
 * Provides a reusable validation hook for form fields
 */

import { useState, useCallback } from 'react';

export interface ValidationState {
  error?: string;
  isValid: boolean;
}

export interface UseValidationOptions {
  validateOn?: 'change' | 'blur' | 'submit';
  debounceMs?: number;
}

/**
 * Hook for managing field validation
 */
export const useValidation = (
  validationSchema?: any,
  options: UseValidationOptions = {}
) => {
  const { validateOn = 'change', debounceMs = 0 } = options;
  const [validationState, setValidationState] = useState<ValidationState>({
    error: undefined,
    isValid: true,
  });

  const debounceTimer = useCallback(
    (fn: () => void, delay: number) => {
      if (delay === 0) {
        fn();
      } else {
        const timer = setTimeout(fn, delay);
        return () => clearTimeout(timer);
      }
    },
    []
  );

  const validate = useCallback(
    async (value: any): Promise<ValidationState> => {
      if (!validationSchema) {
        return { error: undefined, isValid: true };
      }

      try {
        await validationSchema.validate(value);
        setValidationState({ error: undefined, isValid: true });
        return { error: undefined, isValid: true };
      } catch (err: any) {
        const errorMessage = err?.message ?? 'Invalid value';
        setValidationState({ error: errorMessage, isValid: false });
        return { error: errorMessage, isValid: false };
      }
    },
    [validationSchema]
  );

  const validateWithDebounce = useCallback(
    (value: any) => {
      return debounceTimer(() => {
        validate(value);
      }, debounceMs);
    },
    [validate, debounceMs, debounceTimer]
  );

  const reset = useCallback(() => {
    setValidationState({ error: undefined, isValid: true });
  }, []);

  const touch = useCallback(() => {
    // Mark field as touched
    return true;
  }, []);

  return {
    ...validationState,
    validate,
    validateWithDebounce,
    reset,
    touch,
    setValidationState,
  };
};

/**
 * Hook for managing multiple field validation (form-level)
 */
export interface FormValidationState {
  [fieldName: string]: ValidationState;
}

export const useFormValidation = (validationSchemas: Record<string, any>) => {
  const [formState, setFormState] = useState<FormValidationState>({});

  const validateField = useCallback(
    async (fieldName: string, value: any): Promise<ValidationState> => {
      const schema = validationSchemas[fieldName];
      if (!schema) {
        return { error: undefined, isValid: true };
      }

      try {
        await schema.validate(value);
        setFormState((prev) => ({
          ...prev,
          [fieldName]: { error: undefined, isValid: true },
        }));
        return { error: undefined, isValid: true };
      } catch (err: any) {
        const errorMessage = err?.message ?? 'Invalid value';
        setFormState((prev) => ({
          ...prev,
          [fieldName]: { error: errorMessage, isValid: false },
        }));
        return { error: errorMessage, isValid: false };
      }
    },
    [validationSchemas]
  );

  const validateForm = useCallback(
    async (values: Record<string, any>): Promise<boolean> => {
      const newFormState: FormValidationState = {};
      let isFormValid = true;

      for (const [fieldName, schema] of Object.entries(validationSchemas)) {
        try {
          await schema.validate(values[fieldName]);
          newFormState[fieldName] = { error: undefined, isValid: true };
        } catch (err: any) {
          const errorMessage = err?.message ?? 'Invalid value';
          newFormState[fieldName] = { error: errorMessage, isValid: false };
          isFormValid = false;
        }
      }

      setFormState(newFormState);
      return isFormValid;
    },
    [validationSchemas]
  );

  const getFieldError = useCallback(
    (fieldName: string): string | undefined => {
      return formState[fieldName]?.error;
    },
    [formState]
  );

  const isFieldValid = useCallback(
    (fieldName: string): boolean => {
      return formState[fieldName]?.isValid ?? true;
    },
    [formState]
  );

  const isFormValid = useCallback(() => {
    return Object.values(formState).every((state) => state.isValid !== false);
  }, [formState]);

  const reset = useCallback(() => {
    setFormState({});
  }, []);

  return {
    formState,
    validateField,
    validateForm,
    getFieldError,
    isFieldValid,
    isFormValid,
    reset,
  };
};

/**
 * Async validator helper
 */
export const validateAsync = async (
  schema: any,
  value: any
): Promise<{ isValid: boolean; error?: string }> => {
  try {
    await schema.validate(value);
    return { isValid: true };
  } catch (err: any) {
    const errorMessage = err?.message ?? 'Validation failed';
    return { isValid: false, error: errorMessage };
  }
};

/**
 * Batch validator for multiple fields
 */
export const validateBatch = async (
  schemas: Record<string, any>,
  values: Record<string, any>
): Promise<Record<string, { isValid: boolean; error?: string }>> => {
  const results: Record<string, { isValid: boolean; error?: string }> = {};

  for (const [fieldName, schema] of Object.entries(schemas)) {
    try {
      await schema.validate(values[fieldName]);
      results[fieldName] = { isValid: true };
    } catch (err: any) {
      const errorMessage = err?.message ?? 'Validation failed';
      results[fieldName] = { isValid: false, error: errorMessage };
    }
  }

  return results;
};
