export default {
    name: 'cart',
    title: 'Cart',
    type: 'document',
    fields: [
        {
          name: 'cartItems',
          title: 'Cart Items',
          type: 'array',
          of: [
            {
                type: 'reference',
                to: [
                    {type: 'pet'}
                ]
            }
        ]
      },
      {
        name: 'totalQuantities',
        title: 'Total Quantities',
        type: 'number'
      },
      {
        name: 'totalPrice',
        title: 'Total Price',
        type: 'number'
      },
      {
        name: 'quantity',
        title: 'Quantity',
        type: 'number'
      },
    ]
  }