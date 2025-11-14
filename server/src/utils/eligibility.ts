import { IUser } from '@models/User.model';

const MINIMUM_AGE = 18;
const MAXIMUM_AGE = 65;
const MINIMUM_WEIGHT_KG = 50;
const DONATION_INTERVAL_DAYS = 90; // 3 months

export interface EligibilityCheck {
  isEligible: boolean;
  reasons: string[];
  nextEligibleDate?: Date;
}

export const calculateEligibility = (user: IUser): EligibilityCheck => {
  const reasons: string[] = [];
  let isEligible = true;

  // Age check
  if (user.dob) {
    const age = Math.floor((Date.now() - user.dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < MINIMUM_AGE) {
      reasons.push(`Must be at least ${MINIMUM_AGE} years old`);
      isEligible = false;
    } else if (age > MAXIMUM_AGE) {
      reasons.push(`Must be under ${MAXIMUM_AGE} years old`);
      isEligible = false;
    }
  }

  // Last donation check
  let nextEligibleDate: Date | undefined;
  if (user.eligibility?.lastDonationAt) {
    const lastDonation = new Date(user.eligibility.lastDonationAt);
    const daysSinceLastDonation = Math.floor(
      (Date.now() - lastDonation.getTime()) / (24 * 60 * 60 * 1000)
    );

    if (daysSinceLastDonation < DONATION_INTERVAL_DAYS) {
      const remainingDays = DONATION_INTERVAL_DAYS - daysSinceLastDonation;
      reasons.push(
        `Must wait ${remainingDays} more days since last donation (${DONATION_INTERVAL_DAYS} days required)`
      );
      isEligible = false;

      nextEligibleDate = new Date(lastDonation);
      nextEligibleDate.setDate(nextEligibleDate.getDate() + DONATION_INTERVAL_DAYS);
    }
  }

  // Health flags check
  if (user.eligibility?.notes && user.eligibility.notes.includes('MEDICAL_HOLD')) {
    reasons.push('Medical hold active - contact support');
    isEligible = false;
  }

  if (isEligible) {
    reasons.push('You are eligible to donate blood!');
  }

  return {
    isEligible,
    reasons,
    nextEligibleDate,
  };
};

export const updateEligibilityAfterDonation = (user: IUser): void => {
  if (!user.eligibility) {
    user.eligibility = { isEligible: false };
  }

  user.eligibility.lastDonationAt = new Date();
  user.eligibility.isEligible = false;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + DONATION_INTERVAL_DAYS);
  user.eligibility.nextEligibleAt = nextDate;
};

export const checkEligibilityRequirements = (): {
  minimumAge: number;
  maximumAge: number;
  minimumWeight: number;
  donationInterval: number;
} => {
  return {
    minimumAge: MINIMUM_AGE,
    maximumAge: MAXIMUM_AGE,
    minimumWeight: MINIMUM_WEIGHT_KG,
    donationInterval: DONATION_INTERVAL_DAYS,
  };
};
