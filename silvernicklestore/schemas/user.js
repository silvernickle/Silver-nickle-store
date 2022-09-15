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
      // {
      //   name: 'id',
      //   title: 'Id',
      //   type: 'string'
      // },
      {
        name: 'username',
        title: 'User name',
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