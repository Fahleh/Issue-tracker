import axios from 'axios';

export function parseError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response)
      return error.response.data.error || 'An error occurred.';

    return 'No response from server. Please try again';
  }

  return 'An unexpected error occurred.';
}
