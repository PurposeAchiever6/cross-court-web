import userGroup from 'shared/constants/userGroup'
import ampli from '~/src/ampli';

const isWithinThreeMonths = (createdTime) => {
  const now = new Date();
  const creationDate = new Date(createdTime);
  const threeMonthsInMilliseconds = 3 * 30 * 24 * 60 * 60 * 1000;
  return (now - creationDate) <= threeMonthsInMilliseconds;
};
  
const getAgeRange = (age) => {
  if (age >= 13 && age <= 19) {
    return 0;
  } else if (age >= 20 && age <= 35) {
    return 1;
  } else if (age >= 36 && age <= 55) {
    return 2;
  } else if (age >= 56) {
    return 3;
  }
};
  
const userActivityLevel = (updatedTime) => {
  const daysSinceLastJoin = Math.floor((Date.now() - Date.parse(updatedTime)) / (1000 * 60 * 60 * 24));
  if (daysSinceLastJoin <= 7) {
    return 0;
  } else if (daysSinceLastJoin <= 30) {
    return 1;
  } else {
    return 2;
  }
};
  
const getUserExpertiseLevel = (skillRating) => {
  if (skillRating === 1) {
    return 0;
  } else if (skillRating >= 2 && skillRating <= 3) {
    return 1;
  } else if (skillRating === 4) {
    return 2;
  } else if (skillRating === 5) {
    return 3;
  }
};

const ampliUserGroup = (currentUser) => {
  ampli.identify(currentUser.email, currentUser);
  // 1.	Employment Status: (Using Occupation & Work details)
  ampli.client.setGroup(userGroup.EMPLOYMENT_STATUS.type, currentUser.employee ? userGroup.EMPLOYMENT_STATUS.name[0] : userGroup.EMPLOYMENT_STATUS.name[1]);
  // 2. Membership Duration: (Assuming creation date helps determine this)
  const isNewMember = isWithinThreeMonths(currentUser.createdAt);
  const membershipStatus = isNewMember ? userGroup.MEMBERSHIP_DURATION.name[0] : userGroup.MEMBERSHIP_DURATION.name[1];
  ampli.client.setGroup(userGroup.MEMBERSHIP_DURATION.type, membershipStatus);
  // 3. Age Range: (Derived from the Birthday property)
  ampli.client.setGroup(userGroup.AGE_RANGE.type, userGroup.AGE_RANGE.name[getAgeRange(currentUser.age)]);
  // 4. Location: (Using the ZIPCODE property; exact regions need a mapping of ZIP codes)
  // 5. User Interests: (This would require more data on users' preferences and activities)
  // 6. User Activity Level: (Possibly determined by User Sessions & Recent Activities)
  ampli.client.setGroup(userGroup.USER_ACTIVITY_LEVEL.type, userGroup.USER_ACTIVITY_LEVEL.name[userActivityLevel(currentUser.updatedAt)]);
  // 7.	UserRole: (Requires specific data on user roles)
  // 8.   Subscription Type: (Using the Membership Status and other related properties)
  // 9.   Customer Type: (Determined by frequency of transactions & membership tenure)
  // 10. Expertise Level: (Using Skill Rating)
  ampli.client.setGroup(userGroup.EXPERTISE_LEVEL.type, userGroup.EXPERTISE_LEVEL.name[getUserExpertiseLevel(currentUser.skillRating)]);
};

export default {
  ampliUserGroup,
};
