export default function CartView({ cartOpen, setCartOpen }: any) {
  const product = [
    {
      name: "Gaming Mouse",
      price: 49.99,
      quantity: 1,
      image: "/images/gaming-mouse.jpg",
    },
    {
      name: "Mechanical Keyboard",
      price: 89.99,
      quantity: 2,
      image: "/images/mechanical-keyboard.jpg",
    },
  ];

  return (
    <>
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setCartOpen(false)}
        ></div>
      )}
      <div
        className={`
          fixed
          top-0
          right-0
          h-full
          w-96
          bg-white
          shadow-2xl
          z-50
          transform
          transition-transform
          duration-300
          ease-in-out
          ${cartOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="max-w-4xl mx-auto p-6 text-black">
          {/* Header */}
          <div className="flex justify-between">
            <div className=" items-center justify-between mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Shopping Cart
              </h1>

              <span className="text-sm text-gray-500">
                {product.length} Items
              </span>
            </div>

            <div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-sm text-gray-500 hover:text-black"
              >
                X
              </button>
            </div>
          </div>

          {/* Empty State */}
          {!product || product.length === 0 ? (
            <div
              className="
        flex flex-col items-center justify-center
        py-24 rounded-3xl
        bg-white shadow-sm border
      "
            >
              <p className="text-xl font-semibold mb-2">Your cart is empty</p>

              <p className="text-gray-500">Add something you’d love to buy.</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6">
                {product.map((item) => (
                  <div
                    key={item.name}
                    className="
              flex items-center justify-between
              bg-white rounded-3xl
              p-1 shadow-sm
              hover:shadow-md
              transition-shadow duration-300
            "
                  >
                    {/* Left Side */}
                    <div className="flex items-center gap-5">
                      <div
                        className="
                  w-24 h-24
                  rounded-2xl
                  bg-gray-100
                  flex items-center justify-center
                  overflow-hidden
                "
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-3"
                        />
                      </div>

                      <div>
                        <h2 className="text-xl">{item.name}</h2>

                        <p className="text-md text-blue-900 mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center p-2">
                          <div
                            className="
                  flex items-center
                  bg-gray-100 rounded-full
                "
                          >
                            <button
                              className="
                    w-9 h-9
                    rounded-full
                    hover:bg-gray-200
                    transition-colors
                  "
                            >
                              -
                            </button>

                            <span className="w-2 text-center font-medium">
                              {item.quantity}
                            </span>

                            <button
                              className="
                    w-9 h-9
                    rounded-full
                    hover:bg-gray-200
                    transition-colors
                  "
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="
          mt-10
          bg-white rounded-3xl
          p-6 shadow-sm
          flex items-center justify-between
        "
              >
                <div>
                  <p className="text-gray-500 text-sm">Total</p>

                  <h2 className="text-2xl font-bold">
                    $
                    {product
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </h2>
                </div>

                <button
                  className="
            bg-black text-white
            px-8 py-4
            rounded-2xl
            hover:bg-gray-800
            transition-colors
            font-medium
          "
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
