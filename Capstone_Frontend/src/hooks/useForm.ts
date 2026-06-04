// Import necessary hooks and utilities from React
import { useState } from "react";

// Custom hook to manage form state and handle input changes for forms in the admin dashboard
export const useForm = <T extends Record<string, unknown>>(
  initialValues: T
) => {
    // State variable to hold the current values of the form fields, initialized with the provided initial values
  const [formData, setFormData] = useState<T>(initialValues);

  // Function to handle changes in the form input fields. It updates the formData state with the current values entered by the user in the input fields.
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    //
    const { name, value } = event.target;

    //
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //
  const resetForm = () => {
    setFormData(initialValues);
  };

  // Return the form data, a function to update the form data, a function to handle input changes, and a function to reset the form to its initial values. This allows components that use this hook to easily manage form state and handle user input in a consistent way across different forms in the admin dashboard.
  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
};