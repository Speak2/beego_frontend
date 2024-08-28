import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VotingPage.css';

function VotingPage() {
    const [catImage, setCatImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Voting');

    useEffect(() => {
        fetchCatImage();
    }, []);

    const fetchCatImage = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/random-cat');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCatImage(data['url']);
        } catch (error) {
            console.error('Error fetching cat image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavorite = async () => {
        if (!catImage) return;

        try {
            await axios.post('http://localhost:8080/api/favorites', {
                image_id: catImage,
                sub_id: 'user-123', // Replace with actual user ID if available
            });
        } catch (error) {
            console.error('Error adding favorite:', error);
        } finally {
            fetchCatImage();
        }
    };

    const handleVote = async (value) => {
        if (!catImage) return;

        try {
            await axios.post('http://localhost:8080/api/votes', {
                image_id: catImage,
                sub_id: 'user-123', // Replace with actual user ID if available
                value: value,
            });
        } catch (error) {
            console.error('Error submitting vote:', error);
        } finally {
            fetchCatImage();
        }
    };

    return (
        <div className="voting-page">
            <div className="divider">
                <div className="image-container">
                    {loading ? (
                        <div className="loading-screen">
                            <img src="https://thecatapi.com/_app/immutable/assets/thecatapi-cat.74a07522.svg" alt="cat logo" className="loading_cat"/>
                        </div>
                    ) : (
                        <img src={catImage} alt="Cat" className="cat-image" />
                    )}
                </div>

                <div className="action-buttons">
                    <button onClick={handleFavorite} className="action-button favorite">
                        <svg
                            className="w-6 h-6 hover:stroke-primary hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            stroke="currentColor"
                            fill="none"
                        >
                            <path
                                fill="#231F20"
                                d="M48,6c-4.4,0-8.4,1.8-11.3,4.7l-4,4c-0.4,0.4-1,0.4-1.4,0l-4-4C24.4,7.8,20.4,6,16,6C7.2,6,0,13.2,0,22c0,3.3,1,6.4,2.8,9c0,0,0.7,1.2,1.6,2L29.2,57.8C29.9,58.6,30.9,59,32,59s2.1-0.4,2.8-1.2L59.6,33c0.9-0.9,1.6-1.9,1.6-1.9C63,28.4,64,25.3,64,22C64,13.2,56.8,6,48,6z M58.7,31c0,0-0.6,0.8-1.8,2L33.4,56.4C33,56.8,32.5,57,32,57s-1-0.2-1.4-0.6L7.1,32.6c-1.2-1.2-1.8-2-1.8-2C3.2,28.5,2,25.4,2,22C2,14.3,8.3,8,16,8c3.9,0,7.4,1.6,9.9,4.1l4.7,4.7c0.8,0.8,2.1,0.8,2.8,0l4.7-4.7C40.6,9.6,44.1,8,48,8c7.7,0,14,6.3,14,14C62,25.4,60.8,28.5,58.7,31z"
                            />
                            <path
                                fill="#231F20"
                                d="M48,12c-0.6,0-1,0.4-1,1s0.4,1,1,1c4.4,0,8,3.6,8,8c0,0.6,0.4,1,1,1s1-0.4,1-1C58,16.5,53.5,12,48,12z"
                            />
                        </svg>
                    </button>
                    <div className="vote-buttons">
                        <button onClick={() => handleVote(1)} className="action-button vote-up">
                            <svg
                                className="w-6 h-6 hover:stroke-primary hover:fill-primary"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                stroke="currentColor"
                                fill="none"
                            >
                                <path
                                    fill="#231F20"
                                    d="M64,28c0-3.3-2.7-6-6-6H41h-0.016H41l2-18c0.2-2.2-1.3-4-3.5-4h-4C33,0,32,1.8,31,4l-8,18c-2.2,5.2-5,6-7,6-1,0-2,0-2,0v-2c0-2.2-1.8-4-4-4H4c-2.2,0-4,1.8-4,4v34c0,2.2,1.8,4,4,4h6c2.2,0,4-1.8,4-4v-2c1,0,3.6,0.1,6.2,2.7C23.3,63.9,27,64,29,64h23c3.3,0,6-2.7,6-6,0-1.7-0.7-3.3-1.9-4.4C58.4,52.8,60,50.6,60,48c0-1.7-0.7-3.3-1.9-4.4C60.4,42.8,62,40.6,62,38c0-1.7-0.7-3.3-1.9-4.4C62.4,32.8,64,30.6,64,28z M12,60c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V26c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2V60z M58,32H48c-0.6,0-1,0.4-1,1,0,0.6,0.4,1,1,1h8c2.2,0,4,1.8,4,4,0,2.2-1.8,4-4,4H46c-0.6,0-1,0.4-1,1,0,0.6,0.4,1,1,1h8c2.2,0,4,1.8,4,4,0,2.2-1.8,4-4,4H44c-0.6,0-1,0.4-1,1,0,0.6,0.4,1,1,1h8c2.2,0,4,1.8,4,4,0,2.2-1.8,4-4,4H29c-1,0-4.7,0-7.4-2.7C18.5,56.1,16.1,56,14,56V30h2c4,0,6.6-1.6,9.3-8L33,4c0.5-1.1,1.1-2,2.3-2H39c1.1,0,2.1,0.8,2,2l-2,18c-0.1,1.7,0.9,2,2,2h17c2.2,0,4,1.8,4,4C62,30.2,60.2,32,58,32z"
                                />
                                <path
                                    fill="#231F20"
                                    d="M7,54c-1.7,0-3,1.3-3,3,0,1.7,1.3,3,3,3s3-1.3,3-3C10,55.3,8.7,54,7,54z M7,58c-0.6,0-1-0.4-1-1,0-0.6,0.4-1,1-1s1,0.4,1,1C8,57.6,7.6,58,7,58z"
                                />
                            </svg>
                        </button>
                        <button onClick={() => handleVote(-1)} className="action-button vote-down">
                            <svg
                                className="w-6 h-6 hover:stroke-primary hover:fill-primary"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                stroke="currentColor"
                            >
                                <path
                                    d="M64,36c0,3.3-2.7,6-6,6H41v-0.002L40.984,42H41l2,18c0.2,2.2-1.3,4-3.5,4h-4C33,64,32,62.2,31,60l-8-18c-2.2-5.2-5-6-7-6-1,0-2,0-2,0v2c0,2.2-1.8,4-4,4H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h6c2.2,0,4,1.8,4,4v2c1,0,3.6-0.1,6.2-2.7C23.3,0.1,27,0,29,0h23c3.3,0,6,2.7,6,6,0,1.7-0.7,3.3-1.9,4.4C58.4,11.2,60,13.4,60,16c0,1.7-0.7,3.3-1.9,4.4C60.4,21.2,62,23.4,62,26c0,1.7-0.7,3.3-1.9,4.4C62.4,31.2,64,33.4,64,36z M12,4c0-1.1-0.9-2-2-2H4C2.9,2,2,2.9,2,4v34c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V4z M58,32H48c-0.6,0-1-0.4-1-1,0-0.6,0.4-1,1-1h8c2.2,0,4-1.8,4-4,0-2.2-1.8-4-4-4H46c-0.6,0-1-0.4-1-1,0-0.6,0.4-1,1-1h8c2.2,0,4-1.8,4-4,0-2.2-1.8-4-4-4H44c-0.6,0-1-0.4-1-1,0-0.6,0.4-1,1-1h8c2.2,0,4-1.8,4-4,0-2.2-1.8-4-4-4H29c-1,0-4.7,0-7.4,2.7C18.5,7.9,16.1,8,14,8v26h2c4,0,6.6,1.6,9.3,8L33,60c0.5,1.1,1.1,2,2.3,2H39c1.1,0,2.1-0.8,2-2l-2-18c-0.1-1.7,0.9-2,2-2h17c2.2,0,4-1.8,4-4C62,33.8,60.2,32,58,32z"
                                />
                                <path
                                    d="M7,38c-1.7,0-3-1.3-3-3,0-1.7,1.3-3,3-3s3,1.3,3,3C10,36.7,8.7,38,7,38z M7,34c-0.6,0-1,0.4-1,1,0,0.6,0.4,1,1,1s1-0.4,1-1C8,34.4,7.6,34,7,34z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VotingPage;