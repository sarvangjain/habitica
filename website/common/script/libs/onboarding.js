import moment from 'moment';

const BEGIN_DATE = moment('2019-12-10');

// Only users that signed up after the BEGIN DATE should see the onboarding
export function hasActiveOnboarding (user) {
  return BEGIN_DATE.isBefore(user.auth.timestamps.created);
}

export function hasCompletedOnboarding (user) {
  return (
    user.achievements.createdTask === true
    && user.achievements.completedTask === true
    && user.achievements.hatchedPet === true
    && user.achievements.fedPet === true
    && user.achievements.purchasedEquipment === true
  );
}

export function onOnboardingComplete (user) {
  // Award gold
  user.stats.gp += 100;
}

// Add notification and awards (server)
export function checkOnboardingStatus (user) {
  if (hasActiveOnboarding(user) && hasCompletedOnboarding(user) && user.addNotification) {
    user.addNotification('ONBOARDING_COMPLETE');
    onOnboardingComplete(user);
  }
}
