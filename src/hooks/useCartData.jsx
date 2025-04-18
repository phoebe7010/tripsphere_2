import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addCartItem,
  delCartItem,
  getCartItems,
} from '../services/cartService';

// 장바구니 추가 훅
export const useAddCarts = (userId, showToast) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItem) => addCartItem(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', userId]);
      showToast('success', '장바구니에 해당 항목을 추가했습니다.');
    },
    onError: () => {
      showToast('error', '장바구니에 항목 추가가 실패했습니다.');
    },
  });
};

// 장바구니 삭제 훅
export const useDelCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: delCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['carts']);
    },
    onError: () => {
      console.error('장바구니 항목 삭제 실패');
    },
  });
};

// 장바구니 데이터 조회
export const useCartItems = (userId) => {
  return useQuery({
    queryKey: ['carts', userId],
    queryFn: () => getCartItems(userId),
    enabled: !!userId,
  });
};
