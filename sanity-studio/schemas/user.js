export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string'
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'url'
      },
      {
        // this is only if you use credentials provider
        name: 'password',
        title: 'Password',
        type: 'string',
        hidden: true
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
    ]
  };