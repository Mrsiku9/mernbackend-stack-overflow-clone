import Stripe from "stripe";
const url = process.env.SUCCESS_URL
const stripe = new Stripe(
  "sk_test_51OiEISSHQWXZEyUGyaeE0H4fyiEwL9fDHEbbUMFf3SajvaHgQ03hUDca8hmlgDYzYrhpy3JhchzcHwI9GU6Ky8xT00lKtSZz4t"
);

const paymentInitiate = async (req, res) => {
  try {
    const { userData } = req.body;
    

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: userData?.plan,
          },
          unit_amount: userData?.price * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: userData?.email,

      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"],
      },
      success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/cancel`,
      metadata: {
        date: new Date().toISOString().slice(0, 10),
      },
    });

   
    res.json({ id: session.id, session });
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    res.status(500).json({ error: "Error creating Stripe session" });
  }
};

export default paymentInitiate;

export const getPaymentStatus = async (req, res) => {
  try {
    const checkoutSessionId = req.query.checkout_session_id;

    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

    res.json({ status: session });
  } catch (error) {
    console.error("Error retrieving checkout session:", error.message);
    res.status(500).json({ error: "Error retrieving checkout session" });
  }
};
