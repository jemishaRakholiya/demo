import React, { useState, useEffect } from 'react';
import style from './Listdemo.module.css';

function Listdemo() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGitHubUsers = async () => {
            try {
                const response = await fetch('https://api.github.com/users?per_page=50');
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch GitHub users. Status: ${response.status}`);
                }
                
                const data = await response.json();

                if (data && Array.isArray(data)) {
                    setUsers(data);
                    setFilteredUsers(data);
                } else {
                    throw new Error('Invalid data received from GitHub API');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchGitHubUsers();
    }, []);

    const handleFilterChange = async (event) => {
        event.preventDefault();  // Prevents the default form submission behavior

        try {
            const filterValue = event.target.value.toLowerCase();
            const filtered = users.filter((user) => user.login.toLowerCase().includes(filterValue));
            setFilteredUsers(filtered);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className={style.main}>
                <label htmlFor="usernameFilter">Filter by Username:</label>
                <div className={style.input_main}>
                    <input
                        type="text"
                        id="usernameFilter"
                        placeholder="Type to filter users"
                        onChange={handleFilterChange}
                    />
                    <i className="fa-solid fa-magnifying-glass" />
                </div>
                <div className={style.box_main}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className={style.row}>
                        {filteredUsers.map((user) => (
                            <div className={style.w_20} key={user.id}>
                                <div className={style.box}>
                                    <div className={style.box_img}>
                                        <img src={user.avatar_url} alt={`${user.login} avatar`} />
                                    </div>
                                    <div className={style.box_content}>
                                        <div className={style.name}>
                                            <h3>{user.login}</h3>
                                        </div>
                                        <div className={style.type}>
                                            <p>{user.type}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Listdemo;
