import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../authenticateToken.js';
import mongoose from 'mongoose';

const orderRouter = express.Router();
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({ ...x, course: x._id })),
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            user: (req.user.uid)
        });

        const order = await newOrder.save();
        res.status(201).send({ message: 'New Order Created', order });
    })
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);
export default orderRouter;