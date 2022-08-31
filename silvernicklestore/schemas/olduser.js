export default {
    name: 'olduser',
    title: 'Old User',
    type: 'document',
    fields: [
      {
        name: 'userName',
        title: 'UserName',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'string',
      },
      {
        name: 'id',
        title: 'Id',
        type: 'string'
      },
      {
        name: 'cartItems',
        title: 'Cart Items',
        type: 'array',
        of: [
          {
              type: 'reference',
              to: [
                  {type: 'cart'}
              ]
          }
      ]
      },
    ],
  };