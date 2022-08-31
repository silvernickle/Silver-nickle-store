export default {
    name: 'userAuth',
    title: 'User Auth',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
      },
    //   {
    //     name: 'image',
    //     title: 'Image',
    //     type: 'string',
    //   },
    //   {
    //     name: 'id',
    //     title: 'Id',
    //     type: 'string'
    //   },
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