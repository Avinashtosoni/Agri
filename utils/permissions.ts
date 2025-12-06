import { UserRole, SiteContent } from '../types';

export const hasPermission = (
  feature: string,
  userRole: UserRole,
  siteContent: SiteContent
): boolean => {
  if (userRole === 'Admin') return true;
  const permissions = siteContent.accessControl?.permissions[feature] || [];
  return permissions.includes(userRole);
};
