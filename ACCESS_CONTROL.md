# Access Control Implementation

## Overview
Role-based access control system with granular permissions for features across the application.

## Features

### 1. User Roles
- **Admin**: Full access to all features
- **Editor**: Can create/edit content but limited delete permissions
- **Student**: Limited access to view forms and submissions
- **Viewer**: Read-only access

### 2. Access Control Settings (Admin Only)
Located in: Settings > Access Control section

**Features with Permissions:**
- Projects: create, edit, delete
- Blogs: create, edit, delete
- News: create, edit, delete
- Alumni: create, edit, delete
- Pages: create, edit, delete
- Forms: create, edit, view
- Content: edit
- Settings: view, edit

### 3. Permission Management
- Toggle checkboxes for each role per feature
- Changes apply immediately across the application
- Admin role always has full access (cannot be restricted)

## Implementation

### Files Modified
1. **types.ts** - Added AccessControlConfig and FeaturePermissions interfaces
2. **constants.tsx** - Added default permissions configuration
3. **App.tsx** - Added Student user role
4. **pages/Admin.tsx** - Added Access Control UI and permission checks
5. **utils/permissions.ts** - Created hasPermission utility function

### Usage Example
```typescript
import { hasPermission } from '../utils/permissions';

const canEdit = hasPermission('projects.edit', userProfile.role, siteContent);
if (canEdit) {
  // Show edit button
}
```

## Default Permissions

| Feature | Admin | Editor | Student | Viewer |
|---------|-------|--------|---------|--------|
| Projects Create | ✓ | ✓ | ✗ | ✗ |
| Projects Edit | ✓ | ✓ | ✗ | ✗ |
| Projects Delete | ✓ | ✗ | ✗ | ✗ |
| Blogs Create | ✓ | ✓ | ✗ | ✗ |
| Blogs Edit | ✓ | ✓ | ✗ | ✗ |
| Blogs Delete | ✓ | ✗ | ✗ | ✗ |
| Forms View | ✓ | ✓ | ✓ | ✗ |
| Settings Edit | ✓ | ✗ | ✗ | ✗ |

## Test Accounts
- admin@aquaagri.com - Admin (full access)
- editor@aquaagri.com - Editor (create/edit)
- student@aquaagri.com - Student (limited)
- viewer@aquaagri.com - Viewer (read-only)

## Security Notes
- Admin role bypasses all permission checks
- Permissions stored in siteContent.accessControl
- UI elements hidden based on permissions
- Backend validation should also implement these checks
