import { FC } from 'react';
import { RecoilValue, useRecoilValue } from 'recoil';

export interface ColumnProps {
    shouldRenderSelector: RecoilValue<boolean>
}

const Column: FC = ({ shouldRenderSelector }) => {
  const shouldRender = useRecoilValue(shouldRenderSelector);
};
