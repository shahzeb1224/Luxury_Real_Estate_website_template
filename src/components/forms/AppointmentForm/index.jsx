import React, { useState, useCallback, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { isValidEmail, isValidPhone, isRequired } from '@/lib/validators';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const AppointmentForm = forwardRef(
  (
    {
      className = '',
      onSubmit,
      onSuccess,
      onError,
      loading = false,
      success = false,
      properties = [],
      initialValues = {
        fullName: '',
        phone: '',
        email: '',
        property: '',
        preferredDate: '',
        preferredTime: '',
        notes: '',
      },
      submitLabel = 'Book Appointment',
      successMessage = 'Your appointment has been scheduled! We will confirm the details within 24 hours.',
      ...props
    },
    ref
  ) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(success);

    // Get today's date for min date validation
    const today = new Date().toISOString().split('T')[0];

    const validateField = useCallback(
      (name, value) => {
        switch (name) {
          case 'fullName':
            if (!isRequired(value)) return 'Full name is required';
            if (value.length < 2) return 'Name must be at least 2 characters';
            if (value.length > 60) return 'Name must be less than 60 characters';
            return '';
          case 'phone':
            if (!isRequired(value)) return 'Phone number is required';
            if (!isValidPhone(value)) return 'Please enter a valid phone number';
            return '';
          case 'email':
            if (!isRequired(value)) return 'Email is required';
            if (!isValidEmail(value)) return 'Please enter a valid email address';
            return '';
          case 'property':
            if (!isRequired(value)) return 'Please select a property';
            return '';
          case 'preferredDate':
            if (!isRequired(value)) return 'Please select a preferred date';
            if (value < today) return 'Please select a future date';
            return '';
          case 'preferredTime':
            if (!isRequired(value)) return 'Please select a preferred time';
            return '';
          case 'notes':
            if (value && value.length > 1000) return 'Notes must be less than 1000 characters';
            return '';
          default:
            return '';
        }
      },
      [today]
    );

    const validateForm = useCallback(() => {
      const newErrors = {};
      const fields = ['fullName', 'phone', 'email', 'property', 'preferredDate', 'preferredTime'];

      fields.forEach((field) => {
        const error = validateField(field, values[field]);
        if (error) {
          newErrors[field] = error;
        }
      });

      // Validate notes separately (optional)
      const notesError = validateField('notes', values.notes);
      if (notesError) {
        newErrors.notes = notesError;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [values, validateField]);

    const handleChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
          setErrors((prev) => ({ ...prev, [name]: '' }));
        }
      },
      [errors]
    );

    const handleBlur = useCallback(
      (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));

        const error = validateField(name, value);
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }));
        }
      },
      [validateField]
    );

    const handleSubmit = useCallback(
      async (e) => {
        e.preventDefault();

        const allTouched = {};
        Object.keys(values).forEach((key) => {
          allTouched[key] = true;
        });
        setTouched(allTouched);

        if (!validateForm()) {
          return;
        }

        setIsSubmitting(true);

        try {
          if (onSubmit) {
            await onSubmit(values);
          }

          setSubmitSuccess(true);
          setValues(initialValues);

          if (onSuccess) {
            onSuccess(values);
          }

          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        } catch (error) {
          console.error('Appointment form submission error:', error);

          if (onError) {
            onError(error);
          }

          setErrors((prev) => ({
            ...prev,
            submit: error.message || 'Failed to book appointment. Please try again.',
          }));
        } finally {
          setIsSubmitting(false);
        }
      },
      [values, validateForm, onSubmit, onSuccess, onError, initialValues]
    );

    const isFormValid = useCallback(() => {
      return (
        isRequired(values.fullName) &&
        isValidPhone(values.phone) &&
        isValidEmail(values.email) &&
        isRequired(values.property) &&
        isRequired(values.preferredDate) &&
        isRequired(values.preferredTime)
      );
    }, [values]);

    const isDisabled = loading || isSubmitting || submitSuccess;

    // Time options
    const timeOptions = [
      { value: '', label: 'Select time' },
      { value: '09:00', label: '09:00 AM' },
      { value: '09:30', label: '09:30 AM' },
      { value: '10:00', label: '10:00 AM' },
      { value: '10:30', label: '10:30 AM' },
      { value: '11:00', label: '11:00 AM' },
      { value: '11:30', label: '11:30 AM' },
      { value: '12:00', label: '12:00 PM' },
      { value: '12:30', label: '12:30 PM' },
      { value: '13:00', label: '01:00 PM' },
      { value: '13:30', label: '01:30 PM' },
      { value: '14:00', label: '02:00 PM' },
      { value: '14:30', label: '02:30 PM' },
      { value: '15:00', label: '03:00 PM' },
      { value: '15:30', label: '03:30 PM' },
      { value: '16:00', label: '04:00 PM' },
      { value: '16:30', label: '04:30 PM' },
      { value: '17:00', label: '05:00 PM' },
    ];

    // Property options
    const propertyOptions = [
      { value: '', label: 'Select a property' },
      ...properties.map((prop) => ({
        value: prop.id,
        label: prop.title,
      })),
    ];

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn('space-y-4', className)}
        noValidate
        aria-label="Appointment booking form"
        {...props}
      >
        {/* Full Name */}
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
          error={touched.fullName && !!errors.fullName}
          errorText={errors.fullName}
          disabled={isDisabled}
          required
          autoComplete="name"
        />

        {/* Phone */}
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your phone number"
          error={touched.phone && !!errors.phone}
          errorText={errors.phone}
          disabled={isDisabled}
          required
          autoComplete="tel"
        />

        {/* Email */}
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email address"
          error={touched.email && !!errors.email}
          errorText={errors.email}
          disabled={isDisabled}
          required
          autoComplete="email"
        />

        {/* Property */}
        {properties.length > 0 ? (
          <Select
            label="Property"
            name="property"
            value={values.property}
            onChange={handleChange}
            onBlur={handleBlur}
            options={propertyOptions}
            error={touched.property && !!errors.property}
            errorText={errors.property}
            disabled={isDisabled}
            required
          />
        ) : (
          <Input
            label="Property Address"
            name="property"
            type="text"
            value={values.property}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter property address or ID"
            error={touched.property && !!errors.property}
            errorText={errors.property}
            disabled={isDisabled}
            required
          />
        )}

        {/* Preferred Date */}
        <Input
          label="Preferred Date"
          name="preferredDate"
          type="date"
          value={values.preferredDate}
          onChange={handleChange}
          onBlur={handleBlur}
          min={today}
          error={touched.preferredDate && !!errors.preferredDate}
          errorText={errors.preferredDate}
          disabled={isDisabled}
          required
        />

        {/* Preferred Time */}
        <Select
          label="Preferred Time"
          name="preferredTime"
          value={values.preferredTime}
          onChange={handleChange}
          onBlur={handleBlur}
          options={timeOptions}
          error={touched.preferredTime && !!errors.preferredTime}
          errorText={errors.preferredTime}
          disabled={isDisabled}
          required
        />

        {/* Notes */}
        <Textarea
          label="Notes (Optional)"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Any specific requirements or questions..."
          rows={4}
          error={touched.notes && !!errors.notes}
          errorText={errors.notes}
          disabled={isDisabled}
          maxLength={1000}
          showCharCount
        />

        {/* Submit Error */}
        {errors.submit && (
          <div
            className="p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-600 text-sm"
            role="alert"
          >
            {errors.submit}
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div
            className="p-4 bg-success-50 border border-success-200 rounded-lg text-success-700 text-sm"
            role="status"
          >
            <p className="font-semibold">✓ {successMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="luxury"
          size="lg"
          loading={isSubmitting}
          disabled={isDisabled || !isFormValid()}
          fullWidth
          className="mt-2"
        >
          {submitLabel}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-navy-400 text-center mt-3">
          By booking an appointment, you agree to our{' '}
          <a href="/privacy" className="text-gold-500 hover:underline">
            Privacy Policy
          </a>
          . Your information is secure and will not be shared.
        </p>
      </form>
    );
  }
);

AppointmentForm.displayName = 'AppointmentForm';

export default AppointmentForm;
