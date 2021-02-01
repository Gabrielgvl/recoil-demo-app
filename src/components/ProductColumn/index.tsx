import { FunctionComponent, memo } from 'react';
import { Typography } from '@material-ui/core';
import CardList from '../CardList';
import CustomCard from '../CustomCard';
import { productsState } from '../../recoil/products';
import { formatMoney } from '../utils';
import ProductModal from '../ProductModal';
import useModalHelper from '../../hooks/useModalHelper';

const ProductColumn: FunctionComponent = () => {
  const {
    value: currentProduct, isModalOpen, handleClose, handleOpen, handleEdit,
  } = useModalHelper(productsState);

  return (
    <>
      <CardList title="Produtos" recoilSelector={productsState}>
        {(product) => (
          <CustomCard onEdit={() => handleOpen(product)} onClick={() => handleOpen(product)}>
            <Typography variant="h6">{`${product.name}`}</Typography>
            <Typography>{formatMoney(product.price)}</Typography>
          </CustomCard>
        )}
      </CardList>
      {currentProduct && (
      <ProductModal
        product={currentProduct}
        open={isModalOpen}
        onClose={handleClose}
        handleSubmit={handleEdit}
      />
      )}
    </>
  );
};

export default memo(ProductColumn);
