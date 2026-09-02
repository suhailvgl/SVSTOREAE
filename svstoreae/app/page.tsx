"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Premium Face Cream",
    description: "Luxury daily face cream",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
  },
  {
    id: 2,
    name: "Beauty Lipstick",
    description: "Smooth and long-lasting lipstick",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800",
  },
  {
    id: 3,
    name: "Skin Care Serum",
    description: "Premium skin care serum",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
  },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    contact: "",
    location: "",
    note: "",
  });

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeWhatsAppOrder = () => {
    if (!customer.name || !customer.contact || !customer.location) {
      alert("Please enter your name, contact number and location.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderDetails = cart
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} — AED ${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const message = `🛍️ *SVSTOREAE - New Order*

👤 *Customer Details*
Name: ${customer.name}
Contact: ${customer.contact}
Location: ${customer.location}
Extra Note: ${customer.note || "None"}

🛒 *Order Details*
${orderDetails}

💰 *Total: AED ${total}*

Thank you!`;

    const whatsappNumber = "971588069218";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <h1 className="text-2xl font-bold">SVSTOREAE</h1>
            <p className="text-xs text-gray-500">
              Beauty & Cosmetics | UAE
            </p>
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
          >
            🛒 Cart ({cartCount})
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-black px-5 py-16 text-center text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
          SVSTOREAE
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl">
          Online Shopping in UAE
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-300">
          Shop beauty, cosmetics and quality products online in the UAE.
          Discover premium products at great prices with easy WhatsApp
          ordering.
        </p>

        <button
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-7 rounded-xl bg-white px-6 py-3 font-semibold text-black"
        >
          Shop Now
        </button>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-6xl px-5 py-10 text-center">
        <h2 className="text-2xl font-bold">
          Beauty & Cosmetics Online Store in UAE
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-gray-600">
          SVSTOREAE is an online shopping store in the UAE offering beauty,
          cosmetics and skincare products. Explore our collection and order
          your favorite products easily through WhatsApp.
        </p>
      </section>

      {/* Products */}
      <section
        id="products"
        className="mx-auto max-w-6xl px-5 py-10"
      >
        <h2 className="mb-2 text-2xl font-bold">Our Products</h2>

        <p className="mb-6 text-sm text-gray-500">
          Shop our beauty and cosmetic collection.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200"
            >
              <img
                src={product.image}
                alt={`${product.name} - SVSTOREAE UAE`}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-bold">{product.name}</h3>

                <p className="mt-2 text-sm text-gray-500">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-bold">
                    AED {product.price}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why SVSTOREAE */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-gray-200">
          <h2 className="text-2xl font-bold">
            Why Shop With SVSTOREAE?
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div>
              <div className="text-3xl">✨</div>
              <h3 className="mt-2 font-bold">Quality Products</h3>
              <p className="mt-1 text-sm text-gray-500">
                Carefully selected beauty and cosmetic products.
              </p>
            </div>

            <div>
              <div className="text-3xl">🛍️</div>
              <h3 className="mt-2 font-bold">Easy Shopping</h3>
              <p className="mt-1 text-sm text-gray-500">
                Browse products and add them to your cart easily.
              </p>
            </div>

            <div>
              <div className="text-3xl">📱</div>
              <h3 className="mt-2 font-bold">WhatsApp Ordering</h3>
              <p className="mt-1 text-sm text-gray-500">
                Place your order quickly through WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Cart</h2>

              <button
                onClick={() => setShowCart(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="mt-10 text-center text-gray-500">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="mt-6 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border p-4"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            AED {item.price} × {item.quantity}
                          </p>
                        </div>

                        <strong>
                          AED {item.price * item.quantity}
                        </strong>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-lg border px-3 py-1"
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => addToCart(item)}
                          className="rounded-lg border px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-5">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>AED {total}</span>
                  </div>

                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="mt-5 w-full rounded-xl bg-black py-3 font-semibold text-white"
                  >
                    Continue to Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-5">
          <div className="mx-auto mt-10 max-w-lg rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Customer Details
              </h2>

              <button
                onClick={() => setShowCheckout(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Enter your details before placing the order.
            </p>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />

              <input
                type="tel"
                placeholder="Contact Number *"
                value={customer.contact}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    contact: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />

              <textarea
                placeholder="Location / Address *"
                value={customer.location}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    location: e.target.value,
                  })
                }
                rows={3}
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />

              <textarea
                placeholder="Extra details / Note (optional)"
                value={customer.note}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    note: e.target.value,
                  })
                }
                rows={3}
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex justify-between font-bold">
                <span>Order Total</span>
                <span>AED {total}</span>
              </div>
            </div>

            <button
              onClick={placeWhatsAppOrder}
              className="mt-5 w-full rounded-xl bg-green-600 py-3.5 font-bold text-white"
            >
              📱 Order via WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 bg-black px-5 py-8 text-center text-white">
        <h2 className="text-xl font-bold">SVSTOREAE</h2>

        <p className="mt-2 text-sm text-gray-400">
          Beauty & Cosmetics Online Store in UAE
        </p>

        <p className="mt-4 text-xs text-gray-500">
          © 2026 SVSTOREAE. All rights reserved.
        </p>
      </footer>
    </main>
  );
}