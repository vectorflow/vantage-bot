//CHECKSUM:59f819088bca8b2c934359f9a316e854539b480098887d4b09eb3566cebaf52c
"use strict";

const base = require('./_base');

const path = require('path');

const url = require('url');

const {
  tail
} = _;

function render(data) {
  const events = [];

  if (data.typing) {
    events.push({
      type: 'typing',
      value: data.typing
    });
  }

  return [...events, {
    type: 'file',
    url: url.resolve(data.BOT_URL, data.image)
  }];
}

function renderElement(data, channel) {
  if (channel === 'web' || channel === 'api') {
    return render(data);
  }

  return []; // TODO Handle channel not supported
}

module.exports = {
  id: 'builtin_image',
  group: 'Built-in Messages',
  title: 'Image',
  jsonSchema: {
    description: 'A message showing an image with an optional title',
    type: 'object',
    required: ['image'],
    properties: {
      image: {
        type: 'string',
        $subtype: 'media',
        $filter: '.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*',
        title: 'Image'
      },
      title: {
        type: 'string',
        description: 'Some platforms require to name the images.',
        title: 'Title (optional)'
      },
      ...base.typingIndicators
    }
  },
  uiSchema: {},
  computePreviewText: formData => {
    let fileName = path.basename(formData.image);

    if (fileName.includes('-')) {
      fileName = tail(fileName.split('-')).join('-');
    }

    const title = formData.title ? ' | ' + formData.title : '';
    return `Image (${fileName})${title}`;
  },
  renderElement: renderElement
};