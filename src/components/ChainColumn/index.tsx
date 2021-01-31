import React, { FunctionComponent, useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Typography } from '@material-ui/core';
import CardList from '../CardList';
import { chainsState, currentChainId, currentChainState } from '../../recoil/chains';
import CustomCard from '../CustomCard';
import { Chain } from '../../types';
import ChainModal from '../ChainModal';
import useModalHelper from '../../hooks/useModalHelper';

const ChainColumn: FunctionComponent = () => {
  const chainId = useRecoilValue(currentChainId);
  const setChain = useSetRecoilState(currentChainState);

  const {
    value: editChain, isModalOpen, handleOpen, handleClose, handleEdit,
  } = useModalHelper(chainsState);

  return (
    <>
      <CardList title="Redes" recoilSelector={chainsState}>
        {(chain) => (
          <CustomCard
            onEdit={() => handleOpen(chain)}
            selected={chainId === chain.id}
            onClick={() => setChain(chain)}
          >
            <Typography variant="h6">{`${chain.name}`}</Typography>
            <Typography>{chain.identification}</Typography>
          </CustomCard>
        )}
      </CardList>
      {editChain && (
      <ChainModal
        chain={editChain}
        open={isModalOpen}
        onClose={handleClose}
        handleSubmit={handleEdit}
      />
      )}
    </>
  );
};

export default React.memo(ChainColumn);
