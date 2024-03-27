import mongoose, {Document} from "mongoose";

export type PaymentMethod = 'COD' | 'Card'
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered'

interface OrderProductInfo {
  name: string
  quantity: number
  image: string
  price: string
  product: mongoose.Schema.Types.ObjectId
}
export interface OrderModel extends Document {
  user: mongoose.Schema.Types.ObjectId
  shippingInfo: {
    country: string
    city: string
    address: string
    zipCode: string
    phoneNumber: string
  }
  orderItems: OrderProductInfo[]
  paymentMethod: PaymentMethod
  paymentInfo: {
    id: string
    status: string
  }
  itemsPrice: number
  taxAmount: number
  shippingAmount: number
  totalAmount: number
  orderStatus: OrderStatus
  deliveredAt: Date
  createdAt: mongoose.Schema.Types.Date
  updatedAt: mongoose.Schema.Types.Date
}
