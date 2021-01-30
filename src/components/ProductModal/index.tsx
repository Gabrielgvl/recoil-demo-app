import { ChangeEvent, FC, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@material-ui/core';
import { productsState } from '../../recoil/products';
import { Product } from '../../types';

export interface ProductModalProps {
    setProduct: (product: Product) => void
    product: Product,
    open: boolean,
    onClose: () => void,
}

const ProductModal: FC<ProductModalProps> = ({
  open, onClose, setProduct, product,
}) => {
  const titleRef = useRef(product.name);
  const updateProducts = useSetRecoilState(productsState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = () => {
    if (!product) return;
    updateProducts((products) => {
      const index = products.findIndex((p) => p.id === product.id);
      return [...products.slice(0, index), product, ...products.slice(index + 1)];
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {titleRef.current}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Nome do Produto"
          value={product.name}
          name="name"
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Preço do Produto"
          value={product.price}
          name="price"
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
