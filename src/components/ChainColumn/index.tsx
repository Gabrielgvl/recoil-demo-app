import React, { FunctionComponent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Typography } from '@material-ui/core';
import CardList from '../CardList';
import { chainsState, currentChainId, currentChainState } from '../../recoil/chains';
import CustomCard from '../CustomCard';

const ChainColumn: FunctionComponent = () => {
  const chainId = useRecoilValue(currentChainId);
  const setChain = useSetRecoilState(currentChainState);
  return (
    <CardList title="Redes" recoilSelector={chainsState}>
      {(chain) => (
        <CustomCard selected={chainId === chain.id} onClick={() => setChain(chain)}>
          <Typography variant="h6">{`${chain.name}`}</Typography>
          <Typography>{chain.identification}</Typography>
        </CustomCard>
      )}
    </CardList>
  );
};

export default React.memo(ChainColumn);
