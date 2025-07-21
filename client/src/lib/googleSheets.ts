export interface ContactFormData {
  fullName: string;
  email: string;
  currentRole: string;
  experience: string;
  currentSalary?: string;
  targetSalary?: string;
}

export async function submitToGoogleSheets(data: ContactFormData): Promise<boolean> {
  try {
    // First, submit to our backend
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    // TODO: Add Google Sheets integration here
    // This would typically involve using Google Sheets API
    // For now, we're storing in our backend
    
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
}
