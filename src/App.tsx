import { useState } from 'react';
import CreditCardForm from './credit-card-form/CreditCardForm';
import { CreditCardInfo } from './credit-card-form/types';

function App() {
  const [submissionError, setSubmissionError] = useState('');

  async function submitCreditCardInfo(
    creditCardInfo: CreditCardInfo,
  ): Promise<Response> {
    return fetch('/api/payments', {
      method: 'POST',
      body: JSON.stringify(creditCardInfo),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return (
    <div className='App'>
      <div>
        <CreditCardForm
          onSubmit={async (form) => {
            const response = await submitCreditCardInfo(form);
            if (!response.ok) {
              setSubmissionError(
                `Something went wrong. Error: ${response.statusText}`,
              );
            } else {
              // TODO: Handle success case
            }
          }}
        />
        {submissionError.length ? <p>{submissionError}</p> : null}
      </div>
    </div>
  );
}

export default App;
