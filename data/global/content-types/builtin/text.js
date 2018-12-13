//CHECKSUM:4c954fc5c436d2e44f60a893cefda0f8efdf91726729dc89d3ba72a859fbd35c
"use strict";

const base = require('./_base');

function render(data) {
  const events = [];

  if (data.typing) {
    events.push({
      type: 'typing',
      value: data.typing
    });
  }

  return [...events, {
    type: 'text',
    markdown: true,
    text: data.text
  }];
}

function renderElement(data, channel) {
  if (channel === 'web' || channel === 'api') {
    return render(data);
  }

  return []; // TODO
}

module.exports = {
  id: 'builtin_text',
  group: 'Built-in Messages',
  title: 'Text',
  jsonSchema: {
    description: 'A regular text message with optional typing indicators and alternates',
    type: 'object',
    required: ['text'],
    properties: {
      text: {
        type: 'string',
        title: 'Message'
      },
      variations: {
        type: 'array',
        title: 'Alternates (optional)',
        items: {
          type: 'string',
          default: ''
        }
      },
      ...base.typingIndicators
    }
  },
  uiSchema: {
    text: {
      'ui:widget': 'textarea'
    },
    variations: {
      'ui:options': {
        orderable: false
      }
    }
  },
  computePreviewText: formData => 'Text: ' + formData.text,
  renderElement: renderElement
};