//CHECKSUM:34b42826781f8ea5c07fcf46ca2e5663e856219403cee4b1c4c13aff7d4e9f96
"use strict";

const base = require('./_base');

const Card = require('./card');

const url = require('url');

function render(data) {
  const events = [];

  if (data.typing) {
    events.push({
      type: 'typing',
      value: data.typing
    });
  }

  return [...events, {
    text: ' ',
    type: 'carousel',
    elements: data.items.map(card => ({
      title: card.title,
      picture: card.image ? url.resolve(data.BOT_URL, card.image) : null,
      subtitle: card.subtitle,
      buttons: (card.actions || []).map(a => {
        if (a.action === 'Say something') {
          throw new Error('Webchat carousel does not support "Say something" action-buttons at the moment');
        } else if (a.action === 'Open URL') {
          return {
            title: a.title,
            url: a.url
          };
        } else {
          throw new Error(`Webchat carousel does not support "${a.action}" action-buttons at the moment`);
        }
      })
    }))
  }];
}

function renderElement(data, channel) {
  if (channel === 'web' || channel === 'api') {
    return render(data);
  }

  return []; // TODO Handle channel not supported
}

module.exports = {
  id: 'builtin_carousel',
  group: 'Built-in Messages',
  title: 'Carousel',
  jsonSchema: {
    description: 'A carousel is an array of cards',
    type: 'object',
    required: ['items'],
    properties: {
      items: {
        type: 'array',
        title: 'Carousel Cards',
        items: Card.jsonSchema
      },
      ...base.typingIndicators
    }
  },
  computePreviewText: formData => `Carousel: ${formData.length}`,
  renderElement: renderElement
};