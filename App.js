import { useEffect, useState } from 'react';
import './App.css';
import Grid from './Grid';

function App() {
	const initialData = [
    { id: 1, isFilled: false, isBox: true },
    { id: 2, isFilled: false, isBox: true },
    { id: 3, isFilled: false, isBox: true },
    { id: 4, isFilled: false, isBox: true },
    { id: 5, isFilled: false, isBox: false },
    { id: 6, isFilled: false, isBox: false },
    { id: 7, isFilled: false, isBox: true },
    { id: 8, isFilled: false, isBox: true },
    { id: 9, isFilled: false, isBox: true },
];

const [data, setData] = useState(initialData);
	const [clickedOrder, setClickedOrder] = useState([]);
	const [resetting, setResetting] = useState(false);

	function handleclick(id) {
		setClickedOrder((prevOrder) => {
			const updatedOrder = [...prevOrder]
			if (!updatedOrder.includes(id)) {
				updatedOrder.push(id)
			}
			if (updatedOrder.length === data.filter((data) => data.isBox).length) {
				setResetting(true);
			}
			return updatedOrder;
		});

		setData((prevData) => {
			return prevData.map((item) => {
				if (!clickedOrder.includes(item.id)) {
					return item.id === id ? { ...item, isFilled: !item.isFilled } : item;  
				}else {
					return item;
				}
			});
		});
	};

  useEffect(() => {
    if (resetting) {
        const timer = setInterval(() => {
            const idToReset = clickedOrder.shift();
            if (idToReset) {
                setData(prevData => {
                    return prevData.map(item => {
                        return item.id === idToReset ? { ...item, isFilled: false } : item;
                    });
                });
            } else {
                clearInterval(timer);
                setResetting(false);
                setClickedOrder([]);
            }
        }, 1000);
        return () => clearInterval(timer);
    }
}, [resetting, clickedOrder]);

	

	return (
		<Grid data={data} handleclick={handleclick} />
	)
}

export default App;