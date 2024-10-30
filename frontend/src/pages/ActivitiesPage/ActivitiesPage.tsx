import React, { useEffect, FormEvent, useState } from 'react';
import './ActivitiesPage.css';
import { ActivitiesMocks } from '../../modules/mocks'; // Импортируйте моковые данные
import { Link } from 'react-router-dom'; 
import { T_Activity } from '../../modules/types';
import ActivityCard from '../../components/ActivityCard/ActivityCard';

const ActivitiesPage = () => {
    const [activities, setActivities] = useState<T_Activity[]>([]); // Инициализация состояния как пустой массив
    const [isMock, setIsMock] = useState(false);
    const [title, setTitle] = useState('');

    const fetchData = async () => {
        try {
            // Запрос к /api/activities/
            const response = await fetch(`/api/activities/?title=${title.toLowerCase()}`, { signal: AbortSignal.timeout(1000) });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
    
            setActivities(data.activities); // Устанавливаем полученные активности
            setIsMock(false); // Успешный запрос, не используем моки
    
        } catch (error) {
            createMocks(); // В случае ошибки, создаем моки
        }
    };
    
    

    const createMocks = () => {
        setIsMock(true);
        setActivities(ActivitiesMocks.filter(activity => activity.title.toLowerCase().includes(title.toLowerCase())));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await fetchData(); // Вызываем fetchData при отправке формы
    }

    useEffect(() => {
        fetchData(); // Получаем данные при первом рендере
    }, []);

    return (
        <main id="main" className="page">
            <div className="page__services _container">
                <div className="services__content">
                    <div className="services__search">
                        <form onSubmit={handleSubmit}>
                            <div className="search-container">
                                <input
                                    type="text"
                                    name="activity"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} // Обновляем состояние при изменении
                                    placeholder="Поиск"
                                    className="search-input"
                                />
                                <button type="submit" className="search-button">
                                    <img src="http://127.0.0.1:9000/flexwork/Group.svg" alt="Search" />
                                </button>
                            </div>
                        </form>
                        <div className="basket-container">
                            <img
                                className="basket__img"
                                src="http://127.0.0.1:9000/flexwork/basket.svg"
                                alt="basket"
                            />
                        </div>
                    </div>

                    <div className="services__cards">
                        {activities.map((activity) => (
                            <ActivityCard  key={activity.id} activity={activity}/>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ActivitiesPage;
