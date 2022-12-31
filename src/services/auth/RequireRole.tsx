import React, { FC } from 'react';

import useHeaderJwt from '@/services/hooks/useHeaderJwt';
import Forbidden from '../../pages/error/Forbidden';

interface IRequireRole {
  roles?: string[];
  customForbidden?: React.ReactNode;
  children: React.ReactNode;
}

const RequireRole: FC<IRequireRole> = ({ children, roles, customForbidden }) => {
  const { jwtHeader } = useHeaderJwt();
  const { role: currentRole } = jwtHeader || {};

  const permissionGranted = roles?.some((role) => currentRole?.includes(role));

  if (permissionGranted || roles === undefined) {
    return <>{children}</>;
  }

  return customForbidden ? <>{customForbidden}</> : <Forbidden />;
};

export default RequireRole;
