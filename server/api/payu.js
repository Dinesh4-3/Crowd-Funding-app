const crypto = require('crypto');

exports.generateHash = (req, res) => {
  try {
    const { string } = req.body;
    
    if (!string) {
      return res.status(400).json({ error: 'Hash string is required' });
    }

    // Generate SHA512 hash
    const hash = crypto
      .createHash('sha512')
      .update(string)
      .digest('hex');
    
    // Debug logs
    console.log('Received string:', string);
    console.log('Generated hash:', hash);
    
    // Send response with proper headers
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ hash });
  } catch (error) {
    console.error('Server hash generation error:', error);
    res.status(500).json({ error: 'Failed to generate hash' });
  }
};