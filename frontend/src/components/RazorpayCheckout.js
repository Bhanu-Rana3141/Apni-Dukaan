import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RazorpayCheckout({ amount, products, userId }) {
    const handlePayment = async () => {
        try {
            // Step 1: Create Razorpay order via backend
            const { data: order } = await axios.post('http://localhost:5000/api/payment/order', {
                amount, // Amount in rupees
            });

            // Step 2: Razorpay payment options
            const options = {
                key: "rzp_test_YNoAuwySxjSGV5", // Use your Razorpay test key
                amount: order.amount,
                currency: order.currency,
                name: "BPS Dukaan",
                description: "Transaction",
                order_id: order.id, // Order ID from backend
                handler: async (response) => {
                    // Step 3: Verify the payment
                    const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    if (verifyRes.status === 200) {
                        toast.success("Payment verified successfully!");
                        // Optionally, save the order in the database
                        await axios.post('http://localhost:5000/api/orders', {
                            userId,
                            products,
                            totalAmount: amount,
                            paymentStatus: "Paid",
                        });
                    } else {
                        toast.error("Payment verification failed.");
                    }
                },
                prefill: {
                    name: "John Doe", // Replace with dynamic user data
                    email: "johndoe@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "BPS Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            // Step 4: Open Razorpay checkout
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
            toast.error("Error during payment process.");
        }
    };

    return (
        <button onClick={handlePayment} style={{ padding: '10px 20px', backgroundColor: '#3399cc', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Pay ₹{amount}
        </button>
    );
}
