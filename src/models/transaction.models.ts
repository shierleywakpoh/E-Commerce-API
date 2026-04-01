export interface cartItems {
  user_id: string;
  id: number;
  name: string;
  price: number;
  quantity: string;
}
export interface transaction{
  status:string;
  cartitems:cartItems[];
  price:number
}
