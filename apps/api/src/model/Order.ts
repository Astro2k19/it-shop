import mongoose from "mongoose";
import {OrderModel} from "@it-shop/types";

const Order = new mongoose.Schema<OrderModel>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  shippingInfo: {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
    }
  ],
  paymentMethod: {
    type: String,
    required: [true, 'Please select payment method'],
    enum: {
      values: ['COD', 'Card'],
      message: 'Please select: COD or Card '
    }
  },
  paymentInfo: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  itemsPrice: {
    type: Number,
    required: true
  },
  taxAmount: {
    type: Number,
    required: true
  },
  shippingAmount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: {
      values: ['Processing' , 'Shipped' , 'Delivered'],
      message: 'Please select correct order status'
    },
    default: 'Processing'
  },
  deliveredAt: {
    type: Date,
    required: true
  }
}, {timestamps: true})

export default mongoose.model('order', Order)
