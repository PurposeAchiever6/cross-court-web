import userGroup from 'shared/constants/userGroup';
import ampli from '~/src/ampli';

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

const ampliUserGroup = (isAuthenticated, currentUser) => {
  if(isAuthenticated){
    ampli.identify(currentUser.email, currentUser);
    // 1.	Employment Status: (Using Occupation & Work details)
    ampli.client.setGroup(userGroup.EMPLOYMENT_STATUS.type, currentUser.employee ? userGroup.EMPLOYMENT_STATUS.name[0] : userGroup.EMPLOYMENT_STATUS.name[1]);
    // 2. Membership Duration: (Assuming creation date helps determine this)
    const membershipStatus = currentUser.newMember ? userGroup.MEMBERSHIP_DURATION.name[0] : userGroup.MEMBERSHIP_DURATION.name[1];
    ampli.client.setGroup(userGroup.MEMBERSHIP_DURATION.type, membershipStatus);
    // 3. Age Range: (Derived from the Birthday property)
    ampli.client.setGroup(userGroup.AGE_RANGE.type, userGroup.AGE_RANGE.name[getAgeRange(currentUser.age)]);
    // 10. Expertise Level: (Using Skill Rating)
    ampli.client.setGroup(userGroup.EXPERTISE_LEVEL.type, userGroup.EXPERTISE_LEVEL.name[getUserExpertiseLevel(currentUser.skillRating)]);
  }
};

const ampliUserActivityLevelGroup = (isAuthenticated, lastSessionDate) => {
  if(isAuthenticated){
    // 6. User Activity Level: (Possibly determined by User Sessions & Recent Activities)
    ampli.client.setGroup(userGroup.USER_ACTIVITY_LEVEL.type, userGroup.USER_ACTIVITY_LEVEL.name[userActivityLevel(lastSessionDate)]);
  }
};

export default {
  ampliUserGroup,
  ampliUserActivityLevelGroup,
};
