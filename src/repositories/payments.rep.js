import Stripe from "stripe";
import dao from "../data/index.factory.js";
import checkoutProduct from "../dto/checkout.dto.js";

const { orders } = dao;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutRepository = async (filter) => {
  try {
    let productsOnCart = orders.read(filter);
    productsOnCart = productsOnCart.map((each) => new checkoutProduct(each));
    const line_items = productsOnCart;
    const mode = "payment";
    const success_url = "http://localhost:8080/thanks.html";
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};

export default checkoutRepository;
