import React, { FunctionComponent, useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import CardList from '../CardList';
import CustomCard from '../CustomCard';
import { productsState } from '../../recoil/products';
import { formatMoney } from '../utils';
import { Product } from '../../types';
import ProductModal from '../ProductModal';

const ProductColumn: FunctionComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProduct, setProduct] = useState<Product>();

  const handleOpen = useCallback((product: Product) => {
    setProduct(product);
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setProduct(undefined);
    setModalOpen(false);
  }, []);

  return (
    <>
      <CardList title="Produtos" recoilSelector={productsState}>
        {(product) => (
          <CustomCard onClick={() => handleOpen(product)}>
            <Typography variant="h6">{`${product.name}`}</Typography>
            <Typography>{formatMoney(product.price)}</Typography>
          </CustomCard>
        )}
      </CardList>
      {currentProduct && (
      <ProductModal
        product={currentProduct}
        setProduct={setProduct}
        open={isModalOpen}
        onClose={handleClose}
      />
      )}
    </>
  );
};

export default React.memo(ProductColumn);
