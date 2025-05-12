import express from 'express';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/customers', auth, async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/orders', auth, async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    const customer = await Customer.findById(req.body.customerId);
    customer.totalSpend += req.body.amount;
    customer.visits += 1;
    customer.lastPurchase = req.body.date;
    await customer.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;