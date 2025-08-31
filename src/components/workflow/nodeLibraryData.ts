export const builtInNodes = [
  {
    nodeId: 'http_request',
    nodeName: 'HTTP Request',
    nodeDescription: 'Make HTTP API calls',
    category: 'actions',
    icon: 'Globe',
    color: 'bg-purple-500',
    sampleInputJson: '{"url": "https://api.example.com", "method": "GET", "headers": {}}',
    sampleOutputJson: '{"status": 200, "data": {}, "headers": {}}',
    codeFile: 'http_request.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['http', 'api', 'request'],
    isCustom: false,
    configSchema: [
      { key: 'url', type: 'string', label: 'URL', required: true, placeholder: 'https://api.example.com' },
      { key: 'method', type: 'select', label: 'Method', options: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET' },
      { key: 'headers', type: 'object', label: 'Headers', placeholder: '{"Content-Type": "application/json"}' },
      { key: 'body', type: 'text', label: 'Body', placeholder: '{}' }
    ]
  },
  {
    nodeId: 'email_sender',
    nodeName: 'Email Sender',
    nodeDescription: 'Send email notifications',
    category: 'actions',
    icon: 'Mail',
    color: 'bg-pink-500',
    sampleInputJson: '{"to": "user@example.com", "subject": "Test", "body": "Hello"}',
    sampleOutputJson: '{"sent": true, "messageId": "123", "timestamp": "2024-01-01T00:00:00Z"}',
    codeFile: 'email_sender.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['email', 'notification', 'smtp'],
    isCustom: false,
    configSchema: [
      { key: 'to', type: 'string', label: 'To', required: true, placeholder: 'recipient@example.com' },
      { key: 'subject', type: 'string', label: 'Subject', required: true },
      { key: 'body', type: 'text', label: 'Body', required: true },
      { key: 'template', type: 'string', label: 'Template', required: false }
    ]
  },
  {
    nodeId: 'manual_trigger',
    nodeName: 'Manual Trigger',
    nodeDescription: 'Manually trigger workflows from the editor.',
    category: 'triggers',
    icon: 'Play',
    color: 'bg-green-500',
    sampleInputJson: '{}',
    sampleOutputJson: '{}',
    codeFile: 'manual_trigger.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['trigger', 'manual'],
    isCustom: false,
    configSchema: [
      { key: 'label', type: 'string', label: 'Label', required: false },
      { key: 'interval', type: 'string', label: 'Interval', placeholder: '5m' },
      { key: 'cron', type: 'string', label: 'Cron', placeholder: '*/5 * * * *' }
    ]
  },
  {
    nodeId: 'webhook',
    nodeName: 'Webhook',
    nodeDescription: 'Starts a workflow upon receiving an HTTP request.',
    category: 'triggers',
    icon: 'Webhook',
    color: 'bg-blue-500',
    sampleInputJson: '{"webhookUrl": "https://yourdomain.com/webhook"}',
    sampleOutputJson: '{"received": true}',
    codeFile: 'webhook.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['trigger', 'webhook'],
    isCustom: false,
    configSchema: [
      { key: 'webhookUrl', type: 'string', label: 'Webhook URL', required: true, placeholder: 'https://yourdomain.com/webhook' },
      { key: 'secret', type: 'string', label: 'Secret', required: false }
    ]
  },
  {
    nodeId: 'condition',
    nodeName: 'Condition',
    nodeDescription: 'Conditional branching',
    category: 'logic',
    icon: 'GitBranch',
    color: 'bg-yellow-500',
    sampleInputJson: '{"condition": "data.value > 10"}',
    sampleOutputJson: '{"result": true}',
    codeFile: 'condition.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['logic', 'condition'],
    isCustom: false,
    configSchema: [
      { key: 'condition', type: 'string', label: 'Condition', required: true, placeholder: 'data.value > 10' }
    ]
  },
  {
    nodeId: 'loop',
    nodeName: 'Loop',
    nodeDescription: 'Iterate over data',
    category: 'logic',
    icon: 'Repeat',
    color: 'bg-indigo-500',
    sampleInputJson: '{"iterations": 5}',
    sampleOutputJson: '{"iteration": 1}',
    codeFile: 'loop.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['logic', 'loop'],
    isCustom: false,
    configSchema: [
      { key: 'iterations', type: 'number', label: 'Iterations', required: true, default: 1, min: 1, placeholder: 'Number of times to loop' },
      { key: 'breakCondition', type: 'string', label: 'Break Condition', required: false, placeholder: 'e.g. data.value > 10' }
    ]
  },
  {
    nodeId: 'delay',
    nodeName: 'Delay',
    nodeDescription: 'Wait for specified time',
    category: 'logic',
    icon: 'Clock',
    color: 'bg-red-500',
    sampleInputJson: '{"delay": 1000, "unit": "ms"}',
    sampleOutputJson: '{"delayed": true}',
    codeFile: 'delay.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['logic', 'delay'],
    isCustom: false,
    configSchema: [
      { key: 'delay', type: 'number', label: 'Delay', required: true, default: 1000, min: 0, placeholder: 'Delay in ms' },
      { key: 'unit', type: 'select', label: 'Unit', options: ['ms', 's', 'm', 'h'], default: 'ms' }
    ]
  },
  {
    nodeId: 'merge',
    nodeName: 'Merge',
    nodeDescription: 'Combine data from multiple inputs into a single stream.',
    category: 'logic',
    icon: 'GitBranch',
    color: 'bg-yellow-600',
    sampleInputJson: '{"inputs": [1,2]}',
    sampleOutputJson: '{"merged": true}',
    codeFile: 'merge.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['logic', 'merge'],
    isCustom: false,
    configSchema: [
      { key: 'inputs', type: 'array', label: 'Inputs', required: true, placeholder: '[1,2]' }
    ]
  },
  {
    nodeId: 'set',
    nodeName: 'Set',
    nodeDescription: 'Sets static values to items in the workflow.',
    category: 'actions',
    icon: 'Settings',
    color: 'bg-blue-300',
    sampleInputJson: '{"key": "value"}',
    sampleOutputJson: '{"result": "success"}',
    codeFile: 'set.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['actions', 'set'],
    isCustom: false,
    configSchema: [
      { key: 'key', type: 'string', label: 'Key', required: true },
      { key: 'value', type: 'string', label: 'Value', required: true }
    ]
  },
  {
    nodeId: 'noop',
    nodeName: 'NoOp',
    nodeDescription: 'A placeholder node that performs no operation.',
    category: 'utility',
    icon: 'Circle',
    color: 'bg-gray-300',
    sampleInputJson: '{}',
    sampleOutputJson: '{}',
    codeFile: 'noop.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['utility', 'noop'],
    isCustom: false,
    configSchema: []
  },
  {
    nodeId: 'split_in_batches',
    nodeName: 'Split In Batches',
    nodeDescription: 'Divide data into smaller batches for processing.',
    category: 'logic',
    icon: 'BarChart3',
    color: 'bg-orange-300',
    sampleInputJson: '{"batchSize": 10}',
    sampleOutputJson: '{"batch": [1,2,3]}',
    codeFile: 'split_in_batches.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['logic', 'batch'],
    isCustom: false,
    configSchema: [
      { key: 'batchSize', type: 'number', label: 'Batch Size', required: true, default: 10, min: 1, placeholder: 'Number of items per batch' }
    ]
  },
  {
    nodeId: 'switch',
    nodeName: 'Switch',
    nodeDescription: 'Routes items based on conditional logic.',
    category: 'logic',
    icon: 'Shuffle',
    color: 'bg-yellow-400',
    sampleInputJson: '{"cases": ["A", "B"]}',
    sampleOutputJson: '{"route": "A"}',
    codeFile: 'switch.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['logic', 'switch'],
    isCustom: false,
    configSchema: [
      { key: 'cases', type: 'array', label: 'Cases', required: true, placeholder: '["A", "B"]' }
    ]
  },
  {
    nodeId: 'wait',
    nodeName: 'Wait',
    nodeDescription: 'Pause workflow execution for a specified duration.',
    category: 'logic',
    icon: 'Clock',
    color: 'bg-gray-600',
    sampleInputJson: '{"wait": 5000}',
    sampleOutputJson: '{"waited": true}',
    codeFile: 'wait.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['logic', 'wait'],
    isCustom: false,
    configSchema: [
      { key: 'wait', type: 'number', label: 'Wait', required: true, default: 5000, min: 0, placeholder: 'Wait in ms' }
    ]
  },
  {
    nodeId: 'text_manipulation',
    nodeName: 'Text Manipulation',
    nodeDescription: 'Performs various text transformations.',
    category: 'actions',
    icon: 'FileText',
    color: 'bg-pink-400',
    sampleInputJson: '{"text": "hello"}',
    sampleOutputJson: '{"result": "HELLO"}',
    codeFile: 'text_manipulation.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['actions', 'text'],
    isCustom: false,
    configSchema: [
      { key: 'text', type: 'string', label: 'Text', required: true, placeholder: 'hello' },
      { key: 'transform', type: 'select', label: 'Transform', options: ['uppercase', 'lowercase', 'capitalize', 'reverse'], default: 'uppercase' }
    ]
  },
  {
    nodeId: 'data_validation',
    nodeName: 'Data Validation',
    nodeDescription: 'Validates data against JSON schemas.',
    category: 'actions',
    icon: 'Filter',
    color: 'bg-cyan-700',
    sampleInputJson: '{"data": {}}',
    sampleOutputJson: '{"valid": true}',
    codeFile: 'data_validation.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['actions', 'validation'],
    isCustom: false,
    configSchema: [
      { key: 'schema', type: 'text', label: 'JSON Schema', required: true, placeholder: '{}' }
    ]
  },
  {
    nodeId: 'sqlite3',
    nodeName: 'SQLite3',
    nodeDescription: 'Performs operations on SQLite3 databases.',
    category: 'integrations',
    icon: 'Database',
    color: 'bg-orange-700',
    sampleInputJson: '{"query": "SELECT * FROM table"}',
    sampleOutputJson: '{"rows": []}',
    codeFile: 'sqlite3.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'sqlite3'],
    isCustom: false,
    configSchema: [
      { key: 'dbPath', type: 'string', label: 'Database Path', required: true, placeholder: './data.db' },
      { key: 'query', type: 'text', label: 'SQL Query', required: true, placeholder: 'SELECT * FROM table' }
    ]
  },
  {
    nodeId: 'document_generator',
    nodeName: 'Document Generator',
    nodeDescription: 'Generates dynamic documents using templates.',
    category: 'actions',
    icon: 'FileText',
    color: 'bg-green-400',
    sampleInputJson: '{"template": "invoice", "data": {}}',
    sampleOutputJson: '{"document": "base64string"}',
    codeFile: 'document_generator.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['actions', 'document'],
    isCustom: false,
    configSchema: [
      { key: 'template', type: 'string', label: 'Template Name', required: true, placeholder: 'invoice' },
      { key: 'data', type: 'text', label: 'Data JSON', required: true, placeholder: '{}' }
    ]
  },
  {
    nodeId: 'pdfkit',
    nodeName: 'PDFKit',
    nodeDescription: 'Converts images to PDF documents.',
    category: 'actions',
    icon: 'FileText',
    color: 'bg-red-400',
    sampleInputJson: '{"images": ["img1.png"]}',
    sampleOutputJson: '{"pdf": "base64string"}',
    codeFile: 'pdfkit.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['actions', 'pdf'],
    isCustom: false,
    configSchema: [
      { key: 'images', type: 'array', label: 'Images', required: true, placeholder: '["img1.png"]' }
    ]
  },
  {
    nodeId: 'if',
    nodeName: 'IF',
    nodeDescription: 'Route data based on conditional logic.',
    category: 'logic',
    icon: 'GitBranch',
    color: 'bg-yellow-300',
    sampleInputJson: '{"condition": "data.flag == true"}',
    sampleOutputJson: '{"route": "true"}',
    codeFile: 'if.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['logic', 'if'],
    isCustom: false,
    configSchema: [
      { key: 'condition', type: 'string', label: 'Condition', required: true, placeholder: 'data.flag == true' }
    ]
  },
  {
    nodeId: 'function',
    nodeName: 'Function',
    nodeDescription: 'Executes custom JavaScript code.',
    category: 'actions',
    icon: 'Code',
    color: 'bg-indigo-700',
    sampleInputJson: '{"code": "return 1+1;"}',
    sampleOutputJson: '{"result": 2}',
    codeFile: 'function.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['actions', 'function'],
    isCustom: false,
    configSchema: [
      { key: 'code', type: 'text', label: 'JavaScript Code', required: true, placeholder: 'return 1+1;' }
    ]
  },
  {
    nodeId: 'code',
    nodeName: 'Code',
    nodeDescription: 'Execute custom JavaScript or Python code within your workflow.',
    category: 'actions',
    icon: 'Code',
    color: 'bg-indigo-600',
    sampleInputJson: '{"code": "print(\"Hello\")"}',
    sampleOutputJson: '{"output": "Hello"}',
    codeFile: 'code.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['actions', 'code'],
    isCustom: false,
    configSchema: [
      { key: 'code', type: 'text', label: 'Code', required: true, placeholder: 'print(\"Hello\")' }
    ]
  },
  {
    nodeId: 'deepseek_ai',
    nodeName: 'DeepSeek AI',
    nodeDescription: 'Integrates DeepSeek AI for advanced processing.',
    category: 'integrations',
    icon: 'Brain',
    color: 'bg-violet-700',
    sampleInputJson: '{"prompt": "Summarize this text"}',
    sampleOutputJson: '{"summary": "..."}',
    codeFile: 'deepseek_ai.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'ai'],
    isCustom: false,
    configSchema: [
      { key: 'prompt', type: 'string', label: 'Prompt', required: true, placeholder: 'Summarize this text' }
    ]
  },
  {
    nodeId: 'aws_sdk_v3',
    nodeName: 'AWS SDK v3',
    nodeDescription: 'Interfaces with AWS services using the AWS SDK v3.',
    category: 'integrations',
    icon: 'Cloud',
    color: 'bg-yellow-700',
    sampleInputJson: '{"service": "S3", "action": "listBuckets"}',
    sampleOutputJson: '{"buckets": []}',
    codeFile: 'aws_sdk_v3.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'aws'],
    isCustom: false,
    configSchema: [
      { key: 'service', type: 'string', label: 'Service', required: true, placeholder: 'S3' },
      { key: 'action', type: 'string', label: 'Action', required: true, placeholder: 'listBuckets' }
    ]
  },
  {
    nodeId: 'github',
    nodeName: 'GitHub',
    nodeDescription: 'Interacts with GitHub repositories and issues.',
    category: 'integrations',
    icon: 'Code',
    color: 'bg-gray-800',
    sampleInputJson: '{"repo": "user/repo", "action": "listIssues"}',
    sampleOutputJson: '{"issues": []}',
    codeFile: 'github.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'github'],
    isCustom: false,
    configSchema: [
      { key: 'repo', type: 'string', label: 'Repository', required: true, placeholder: 'user/repo' },
      { key: 'action', type: 'string', label: 'Action', required: true, placeholder: 'listIssues' }
    ]
  },
  {
    nodeId: 'google_sheets',
    nodeName: 'Google Sheets',
    nodeDescription: 'Reads from and writes to Google Sheets.',
    category: 'integrations',
    icon: 'FileSpreadsheet',
    color: 'bg-green-700',
    sampleInputJson: '{"spreadsheetId": "...", "range": "A1:B2"}',
    sampleOutputJson: '{"values": [[1,2],[3,4]]}',
    codeFile: 'google_sheets.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'sheets'],
    isCustom: false,
    configSchema: [
      { key: 'spreadsheetId', type: 'string', label: 'Spreadsheet ID', required: true, placeholder: '1234567890abcdef1234567890abcdef1234567890abcdef' },
      { key: 'range', type: 'string', label: 'Range', required: true, placeholder: 'A1:B2' }
    ]
  },
  {
    nodeId: 'slack',
    nodeName: 'Slack',
    nodeDescription: 'Sends messages to Slack channels.',
    category: 'integrations',
    icon: 'MessageSquare',
    color: 'bg-green-600',
    sampleInputJson: '{"channel": "#general", "message": "Hello"}',
    sampleOutputJson: '{"sent": true}',
    codeFile: 'slack.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'slack'],
    isCustom: false,
    configSchema: [
      { key: 'channel', type: 'string', label: 'Channel', required: true, placeholder: '#general' },
      { key: 'message', type: 'string', label: 'Message', required: true, placeholder: 'Hello' }
    ]
  },
  {
    nodeId: 'trello',
    nodeName: 'Trello',
    nodeDescription: 'Manages Trello boards, lists, and cards.',
    category: 'integrations',
    icon: 'Shuffle',
    color: 'bg-blue-700',
    sampleInputJson: '{"boardId": "...", "action": "listCards"}',
    sampleOutputJson: '{"cards": []}',
    codeFile: 'trello.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'trello'],
    isCustom: false,
    configSchema: [
      { key: 'boardId', type: 'string', label: 'Board ID', required: true, placeholder: '1234567890abcdef1234567890abcdef1234567890abcdef' },
      { key: 'action', type: 'string', label: 'Action', required: true, placeholder: 'listCards' }
    ]
  },
  {
    nodeId: 'puppeteer',
    nodeName: 'Puppeteer',
    nodeDescription: 'Automates browser tasks using Puppeteer.',
    category: 'integrations',
    icon: 'Cpu',
    color: 'bg-gray-500',
    sampleInputJson: '{"url": "https://example.com"}',
    sampleOutputJson: '{"screenshot": "base64string"}',
    codeFile: 'puppeteer.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'puppeteer'],
    isCustom: false,
    configSchema: [
      { key: 'url', type: 'string', label: 'URL', required: true, placeholder: 'https://example.com' }
    ]
  },
  {
    nodeId: 'gmail_trigger',
    nodeName: 'Gmail Trigger',
    nodeDescription: 'Initiates workflow when a new email arrives in Gmail.',
    category: 'triggers',
    icon: 'Mail',
    color: 'bg-red-500',
    sampleInputJson: '{"label": "INBOX"}',
    sampleOutputJson: '{"email": {}}',
    codeFile: 'gmail_trigger.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['trigger', 'gmail'],
    isCustom: false,
    configSchema: [
      { key: 'label', type: 'string', label: 'Label', required: true, placeholder: 'INBOX' }
    ]
  },
  {
    nodeId: 'rettwit_trigger',
    nodeName: 'Rettiwt Trigger',
    nodeDescription: 'Interacts with the Rettiwt API for Twitter operations.',
    category: 'triggers',
    icon: 'MessageSquare',
    color: 'bg-blue-400',
    sampleInputJson: '{"action": "newTweet"}',
    sampleOutputJson: '{"tweet": {}}',
    codeFile: 'rettwit_trigger.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['trigger', 'twitter'],
    isCustom: false,
    configSchema: [
      { key: 'action', type: 'string', label: 'Action', required: true, placeholder: 'newTweet' }
    ]
  },
  {
    nodeId: 'websockets_lite_trigger',
    nodeName: 'WebSockets Lite Trigger',
    nodeDescription: 'Triggers workflows via WebSocket events.',
    category: 'triggers',
    icon: 'Cloud',
    color: 'bg-cyan-500',
    sampleInputJson: '{"event": "message"}',
    sampleOutputJson: '{"data": {}}',
    codeFile: 'websockets_lite_trigger.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['trigger', 'websocket'],
    isCustom: false,
    configSchema: [
      { key: 'event', type: 'string', label: 'Event', required: true, placeholder: 'message' }
    ]
  },
  {
    nodeId: 'cron',
    nodeName: 'Cron',
    nodeDescription: 'Schedule workflows to run at specific times or intervals.',
    category: 'triggers',
    icon: 'Clock',
    color: 'bg-purple-500',
    sampleInputJson: '{"cron": "0 0 * * *"}',
    sampleOutputJson: '{"triggered": true}',
    codeFile: 'cron.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['trigger', 'cron'],
    isCustom: false,
    configSchema: [
      { key: 'cron', type: 'string', label: 'Cron Expression', required: true, placeholder: '0 0 * * *' }
    ]
  },
  {
    nodeId: 'zapier',
    nodeName: 'Zapier',
    nodeDescription: 'Integrates with Zapier for workflow automation.',
    category: 'integrations',
    icon: 'Zap',
    color: 'bg-orange-500',
    sampleInputJson: '{"zapHookUrl": "https://hooks.zapier.com/..."}',
    sampleOutputJson: '{"success": true}',
    codeFile: 'zapier.py',
    pythonCode: '',
    version: '1.0.0',
    author: 'System',
    tags: ['integrations', 'zapier'],
    isCustom: false,
    configSchema: [
      { key: 'zapHookUrl', type: 'string', label: 'Zapier Hook URL', required: true, placeholder: 'https://hooks.zapier.com/...' }
    ]
  }
]; 