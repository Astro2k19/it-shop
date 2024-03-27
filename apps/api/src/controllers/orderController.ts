import catchAsyncErrors from "../shared/middlewares/catchAsyncErrors";
import Order from "../model/Order";

export const newOrder = catchAsyncErrors(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    orderStatus,
    deliveredAt,
  } = req.body

  const order = await Order.create({
    user: req.user._id,
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    orderStatus,
    deliveredAt
  })

  res.json(order)
})
