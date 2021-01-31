import { useCallback, useState } from 'react';
import { RecoilState, useSetRecoilState } from 'recoil';
import { BaseEntity } from '../types';

export interface UseModalHelperReturn<T> {
    isModalOpen: boolean,
    handleOpen: (value: T) => void,
    handleClose: () => void,
    handleEdit: (value: T) => void,
    value: T | undefined,
}

function useModalHelper<T extends BaseEntity>(selector: RecoilState<Array<T>>)
    :UseModalHelperReturn<T> {
  const [value, setValue] = useState<T>();
  const [isModalOpen, setModalOpen] = useState(false);

  const updateList = useSetRecoilState(selector);

  const handleOpen = useCallback((values: T) => {
    setValue(values);
    setModalOpen(true);
  }, [setValue]);

  const handleClose = useCallback(() => {
    setValue(undefined);
    setModalOpen(false);
  }, [setValue]);

  const handleEdit = useCallback((values: T) => {
    updateList((items) => {
      const index = items.findIndex((p) => p.id === values.id);
      return [...items.slice(0, index), values, ...items.slice(index + 1)];
    });
  }, [updateList]);

  return {
    value, isModalOpen, handleClose, handleOpen, handleEdit,
  };
}

export default useModalHelper;
