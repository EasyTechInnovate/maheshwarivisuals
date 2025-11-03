import toast from 'react-hot-toast';

/**
 * Toast utility functions for consistent toast notifications
 */

export const showToast = {
  /**
   * Show success toast
   * @param {string} message - Success message to display
   */
  success: (message) => {
    toast.success(message);
  },

  /**
   * Show error toast
   * @param {string} message - Error message to display
   */
  error: (message) => {
    toast.error(message);
  },

  /**
   * Show loading toast
   * @param {string} message - Loading message to display
   * @returns {string} Toast ID for updating or dismissing
   */
  loading: (message) => {
    return toast.loading(message);
  },

  /**
   * Show info/default toast
   * @param {string} message - Info message to display
   */
  info: (message) => {
    toast(message);
  },

  /**
   * Dismiss a specific toast or all toasts
   * @param {string} toastId - Optional toast ID to dismiss specific toast
   */
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  /**
   * Update an existing toast (useful for loading states)
   * @param {string} toastId - Toast ID to update
   * @param {object} options - Toast options (message, type, etc.)
   */
  update: (toastId, options) => {
    toast.dismiss(toastId);
    if (options.type === 'success') {
      toast.success(options.message);
    } else if (options.type === 'error') {
      toast.error(options.message);
    } else {
      toast(options.message);
    }
  },

  /**
   * Promise-based toast (shows loading, then success or error)
   * @param {Promise} promise - Promise to track
   * @param {object} messages - Messages for loading, success, and error states
   */
  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong!',
    });
  },
};
