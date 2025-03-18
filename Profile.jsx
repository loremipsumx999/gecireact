import {Card, Form, Button } from 'react-bootstrap';
import {useState} from 'react';

export default function Profile(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/updateUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, phone_number, address }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Frissitetted a profilodat');
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Hiba a profil frissítésénél');
        }
    };

    return(
        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <h2 className="text-center mb-4">Profil szerkesztése</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Felhasználónév" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="password" 
                            placeholder="Jelszó" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Telefonszám" 
                            value={phone_number} 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Cím" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="secondary"  type="submit" className="w-100">
                        Mentés
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
    )
}