import { generateHash } from '../utils/hash';

export const initializePayment = async (fundingData) => {
  try {
    const txnid = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const payuConfig = {
      key: 'g9ME9h',
      txnid: txnid,
      amount: parseFloat(fundingData.amount).toFixed(2),
      productinfo: 'Project_Donation',
      firstname: fundingData.name || '',
      email: fundingData.email || '',
      phone: fundingData.phone || '',
      surl: `${window.location.origin}/#/?status=success`,
      furl: `${window.location.origin}/#/?status=failure`,
      service_provider: 'payu_paisa',
      udf1: fundingData.projectId,
      udf2: fundingData.fundingId,
      udf3: '',
      udf4: '',
      udf5: '',
    };

    // Validate mandatory fields
    const mandatoryFields = ['key', 'txnid', 'amount', 'productinfo', 'firstname', 'email', 'phone', 'surl', 'furl'];
    const missingFields = mandatoryFields.filter(field => !payuConfig[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing mandatory fields: ${missingFields.join(', ')}`);
    }

    const salt = 'wbTIYJoTrxfDMMQDyByw3WPGmlckLwKw';
    
    // PayU hash string format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
    const hashSequence = [
      payuConfig.key,
      payuConfig.txnid,
      payuConfig.amount,
      payuConfig.productinfo,
      payuConfig.firstname,
      payuConfig.email,
      payuConfig.udf1 || '',
      payuConfig.udf2 || '',
      payuConfig.udf3 || '',
      payuConfig.udf4 || '',
      payuConfig.udf5 || '',
      '',  // Empty string
      '',  // Empty string
      '',  // Empty string
      '',  // Empty string
      '',  // Empty string
      salt
    ];

    // Ensure no undefined values in hash string
    const hashString = hashSequence.join('|');
    console.log('Hash String:', hashString);

    try {
      const hashResponse = await generateHash(hashString);
      if (!hashResponse) {
        throw new Error('Invalid hash response');
      }
      payuConfig.hash = hashResponse;
      console.log('Generated Hash:', hashResponse);
    } catch (hashError) {
      console.error('Hash generation failed:', hashError);
      throw hashError;
    }

    // Add success handler
    window.payuSuccess = () => {
      if (fundingData.onSuccess) {
        fundingData.onSuccess();
      }
    };

    // Add failure handler
    window.payuFailure = () => {
      if (fundingData.onFailure) {
        fundingData.onFailure();
      }
    };

    // Create and submit form
    const form = document.createElement('form');
    form.setAttribute('action', 'https://secure.payu.in/_payment');
    form.setAttribute('method', 'post');
    form.setAttribute('style', 'display: none');

    Object.entries(payuConfig).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', String(value || '')); // Convert null/undefined to empty string
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
};