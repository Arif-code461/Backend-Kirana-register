import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
app.post('/transactions', async (req, res) => {
  const { date, type, amount, description } = req.body;
  const transaction = new Transaction({ date, type, amount, description });
  try {
    await transaction.save();
    res.status(201).send({ message: 'Transaction created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating transaction' });
  }
});
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().exec();
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching transactions' });
  }
});

// Get a specific transaction
app.get('/transactions/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await Transaction.findById(id).exec();
    if (!transaction) {
      res.status(404).send({ message: 'Transaction not found' });
    } else {
      res.status(200).send(transaction);
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching transaction' });
  }
});

// Update a transaction
app.put('/transactions/:id', async (req, res) => {
  const id = req.params.id;
  const { date, type, amount, description } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, { date, type, amount, description }, { new: true }).exec();
    res.status(200).send(transaction);
  } catch (error) {
    res.status(500).send({ message: 'Error updating transaction' });
  }
});

// Delete a transaction
app.delete('/transactions/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Transaction.findByIdAndRemove(id).exec();
    res.status(200).send({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting transaction' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
  
});