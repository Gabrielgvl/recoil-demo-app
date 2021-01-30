import { FC, ReactNode } from 'react';
import { RecoilValue, useRecoilValue } from 'recoil';

export interface ColumnProps {
    shouldRenderSelector: RecoilValue<boolean>
    children: ReactNode
}

const Column: FC<ColumnProps> = ({
  shouldRenderSelector,
  children,
}) => {
  const shouldRender = useRecoilValue(shouldRenderSelector);
  if (!shouldRender) return null;
  return <>{children}</>;
};

export default Column;
