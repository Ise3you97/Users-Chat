const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');

router.get('/', chatController.getMessages);
router.post('/', chatController.postMessage);
router.get('/events', chatController.sendEvents);

module.exports = router;
