//CHECKSUM:7af3dd24937939beb80b56be93c0666ac43dde9971d538b99a9dbdc00baa3be9
"use strict";

const base = require('./_base');

function renderElement(data, channel) {
  // We don't render action button
  return [];
}

module.exports = {
  id: 'builtin_action-button',
  group: 'Built-in Messages',
  title: 'Action Button',
  jsonSchema: {
    description: 'A button that triggers an action, often used in cards',
    type: 'object',
    required: ['action', 'title'],
    properties: {
      title: {
        type: 'string',
        description: 'Title of the button'
      },
      action: {
        type: 'string',
        enum: ['Say something', 'Open URL'],
        default: 'Say something'
      }
    },
    dependencies: {
      action: {
        oneOf: [{
          properties: {
            action: {
              enum: ['Say something']
            }
          }
        }, {
          properties: {
            action: {
              enum: ['Open URL']
            },
            url: {
              type: 'string',
              title: 'Enter a valid URL'
            }
          },
          required: ['url']
        }]
      }
    }
  },
  uiSchema: {},
  computePreviewText: formData => `Action: ${formData.action}`,
  renderElement: renderElement
};