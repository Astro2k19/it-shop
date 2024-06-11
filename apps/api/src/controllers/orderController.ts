import catchAsyncErrors from '../shared/middlewares/catchAsyncErrors';
import OrderModel from '../model/Order';
import { Order } from '@it-shop/types';
import Product from '../model/Product';
import { NewOrderSchemaType, OrderUpdateSchema } from '@it-shop/schemas';
import { ApiError } from '@it-shop/schemas';

// POST => /api/v1/admin/orders/new
export const newOrder = catchAsyncErrors<NewOrderSchemaType, Order>(
    async (req, res) => {
        const {
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxAmount,
            shippingAmount,
            totalAmount,
            paymentInfo,
        } = req.body;

        const order = await OrderModel.create({
            user: req.user._id,
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxAmount,
            shippingAmount,
            totalAmount,
            paymentInfo,
        });

        res.json(order);
    }
);

// GET => /api/v1/orders/my
export const getMyOrders = catchAsyncErrors<undefined, Order[]>(
    async (req, res) => {
        const orders = await OrderModel.find({ user: req.user._id });
        res.json(orders);
    }
);

// GET => /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors<undefined, Order>(
    async (req, res, next) => {
        const order = await OrderModel.findById(req.params.id).populate(
            'user',
            'name email'
        );

        if (!order) {
            return next(
                new ApiError(`Order not found with ${req.params.id} id`, 404)
            );
        }

        res.json(order);
    }
);

// GET => /api/v1/admin/orders/
export const getAllOrders = catchAsyncErrors<undefined, Order[]>(
    async (req, res) => {
        const orders = await OrderModel.find();
        res.json(orders);
    }
);

// PUT => /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors<OrderUpdateSchema>(
    async (req, res, next) => {
        const order = await OrderModel.findById(req.params.id);

        if (!order) {
            return next(
                new ApiError(`Order not found with ${req.params.id} id`, 404)
            );
        }

        if (order.orderStatus === 'Delivered') {
            return next(new ApiError(`Order has already been delivered`, 403));
        }

        for (const item of order.orderItems) {
            const product = await Product.findById(item.product);

            if (!product) {
                return next(
                    new ApiError(
                        `Product not found with ${item.product} id`,
                        404
                    )
                );
            }

            // TODO: fix problem with stock
            product.stock = product.stock - item.quantity;
            await product.save();
        }

        order.deliveredAt = Date.now();
        order.orderStatus = req.body.orderStatus;
        await order.save();

        res.json({
            success: true,
        });
    }
);

// DELETE => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
        return next(
            new ApiError(`Order not found with ${req.params.id} id`, 404)
        );
    }

    await order.deleteOne();

    res.json({
        success: true,
    });
});
