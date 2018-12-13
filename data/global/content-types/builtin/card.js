//CHECKSUM:80769d5c98ae916f482cc07f81836554eb1b944103b94d827bf1f206410e70b6
"use strict";

const ActionButton = require('./action_button');

const Carousel = require('./carousel');

module.exports = {
  id: 'builtin_card',
  group: 'Built-in Messages',
  title: 'Card',
  jsonSchema: {
    description: 'A card message with a title with optional subtitle, image and action buttons.',
    type: 'object',
    required: ['title'],
    properties: {
      title: {
        type: 'string',
        title: 'Title'
      },
      subtitle: {
        type: 'string',
        title: 'Subtitle'
      },
      image: {
        type: 'string',
        $subtype: 'media',
        $filter: '.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*',
        title: 'Image'
      },
      actions: {
        type: 'array',
        title: 'Action Buttons',
        items: ActionButton.jsonSchema
      }
    }
  },
  uiSchema: {
    title: {
      'ui:widget': 'textarea'
    },
    subtitle: {
      'ui:widget': 'textarea'
    }
  },
  computePreviewText: formData => `Card: ${formData.title}`,
  renderElement: (data, channel) => Carousel.renderElement({
    items: [data],
    ...data
  }, channel)
};