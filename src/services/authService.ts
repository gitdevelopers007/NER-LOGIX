export interface GovernmentUser {
  id: string;
  name: string;
  officialId: string;
  department: string;
  role: string;
  region: string;
  lastLogin: string;
}

const STORAGE_KEY = 'ner_logix_auth_user';

export const authService = {
  // Mock login with realistic network latency
  loginGovernment: async (officialId: string, password: string): Promise<{ success: boolean; user?: GovernmentUser; error?: string }> => {
    // Artificial 600ms latency to demonstrate realistic enterprise authentication
    await new Promise((resolve) => setTimeout(resolve, 650));

    const trimmedId = officialId.trim();
    if (!trimmedId) {
      return { success: false, error: 'Government ID or Official Email is required.' };
    }
    if (!password) {
      return { success: false, error: 'Password is required.' };
    }
    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    const mockUser: GovernmentUser = {
      id: 'GOV-NE-8821',
      name: 'Dr. A. Sharma (IAS)',
      officialId: trimmedId,
      department: 'Ministry of Development of North Eastern Region (MDoNER)',
      role: 'Principal Logistics & Infrastructure Director',
      region: 'North Eastern Corridor (Assam, Meghalaya, Arunachal)',
      lastLogin: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  },

  // Mock password recovery
  recoverPassword: async (officialIdOrEmail: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const trimmed = officialIdOrEmail.trim();
    if (!trimmed) {
      return { success: false, message: 'Please enter your official government ID or email.' };
    }
    return {
      success: true,
      message: `Password reset verification link and emergency OTP have been dispatched to registered official credentials for "${trimmed}".`,
    };
  },

  getCurrentUser: (): GovernmentUser | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
