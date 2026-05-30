export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED'

export interface Order {
  id: string
  status: OrderStatus
  totalAmount: string
  createdAt: string
  stripePaymentIntentId?: string
  orderItems: OrderItem[]
}

export interface OrderItem {
  id: string
  bookId: string
  title: string
  price: string
  quantity: number
  createdAt: string
}
