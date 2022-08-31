export default {
    name: 'pet',
    title: 'Pet',
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
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'breed',
            title: 'Breed',
            type: 'array',
                of: [
                    {
                        type: 'reference',
                        to: [
                            {type: 'breed'}
                        ]
                    }
                ]
        },
        {
            name: 'slug', //a slug is a unique string that can act as a url
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name', //generates a unique slug based on the name property
                maxLength: 90
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'number'
        },
        {
            name: 'sex',
            title: 'Sex',
            type: 'string'
        },
        {
            name: 'age',
            title: 'Age',
            type: 'string'
        }
    ]
}
