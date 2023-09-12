import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendationComponent = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://localhost:4000/get_recommendations', {
          user_id: 'your_user_id_here', // Replace with the actual user ID
        });
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h1>Recommendations</h1>
      <ul>
        {recommendations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationComponent;
