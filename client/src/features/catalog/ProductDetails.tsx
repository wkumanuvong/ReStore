import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import LoadingComponent from '../../app/layout/LoadingComponent';
import NotFound from '../../app/errors/NotFound';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from '../basket/basketSlice';
import { fetchProductAsync, productSelectors } from './catalogSlice';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, +id!)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [dispatch, id, item, product]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.currentTarget.value) >= 0)
      setQuantity(parseInt(event.currentTarget.value));
  }

  function handleUpdateCart() {
    if (!product) return;
    if (!item || quantity > item?.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({ productId: product.id, quantity: updatedQuantity })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
          name: 'rem',
        })
      );
    }
  }

  if (productStatus.includes('pending'))
    return <LoadingComponent message='Loading product...' />;

  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>
          {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody sx={{ fontSize: '1.1em' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant={'outlined'}
              type={'number'}
              label={'Quantity in Cart'}
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity ||
                (!item && quantity === 0) ||
                quantity > product.quantityInStock!
              }
              loading={status.includes('pending')}
              onClick={handleUpdateCart}
              sx={{ height: '55px' }}
              color={'primary'}
              size={'large'}
              variant={'contained'}
              fullWidth
            >
              {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
