export default {
    name: 'breed',
    title: 'Breed',
    type: 'document',
    fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
              hotspot: 'true' //enables cropping of images
          }
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text'
      },
    //   {
    //     name: 'parents',
    //     title: 'Parent breed',
    //     type: 'array',
    //     of: [
    //       {
    //         type: 'reference',
    //         to: [{type: 'breed'}]
    //       }
    //     ]
    //   }
    ]
  }