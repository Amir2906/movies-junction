import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import video from '../assets/video.mp4'
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFromLikedMovies } from '../store';

export default React.memo(function Card({ index, movieData, isLiked = false }) {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate('/login');
    });

    const addToList = async () => {
        try {
            await axios.post("http://localhost:5000/api/user/add", { email, data: movieData })
        } catch (err) {
            console.log(err);
        }
    }

    // console.log(movieData);
    return (
        <Container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="movie"
            />

            {
                isHovered && (
                    <div className="hover">
                        <div className="image-video-container">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                                alt="movie"
                                onClick={() => navigate('/player')}
                            />
                            <video
                                src={video}
                                autoPlay
                                loop
                                muted
                                onClick={() => navigate('/player')}
                            />
                        </div>
                        <div className="info-container flex column">
                            <h3 className='name' onClick={() => navigate('/player')}>
                                {movieData.name}
                            </h3>
                            <div className="icons flex j-between">
                                <div className="controls flex">
                                    <Tooltip title='play'>
                                        <PlayArrowIcon
                                            onClick={() => navigate('/player')}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Like">
                                        <ThumbUpIcon />
                                    </Tooltip>
                                    <Tooltip title="Dislike">
                                        <ThumbDownIcon />
                                    </Tooltip>
                                    {
                                        isLiked ? (
                                            <Tooltip title='Remove From List'>
                                                <LibraryAddCheckIcon onClick={() => dispatch(removeFromLikedMovies({ movieId: movieData.id, email }))} />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title='Add to my list'>
                                                <LibraryAddIcon onClick={addToList} />
                                            </Tooltip>
                                        )
                                    }
                                </div>
                                <div className="info">
                                    <Tooltip title='More Info'>
                                        <ArrowDropDownIcon />
                                    </Tooltip>

                                </div>
                            </div>
                            <div className="genres flex">
                                <ul className='flex'>
                                    {
                                        movieData.genres.map((genre) =>
                                            <li key={genre}>{genre}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </Container>
    )
});

const Container = styled.div`
    max-width: 230px;
    width: 230px;
    height: 100%;
    cursor: pointer;
    position: relative;
    img {
        border-radius: 0.2rem;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .hover {
        z-index: 90;
        height: max-content;
        width: 20rem;
        position: absolute;
        top: -18vh;
        left: 0;
        border-radius: 0.3rem;
        box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
        background-color: #181818;
        transition: 0.3s ease-in-out;
        .image-video-container {
            position: relative;
            height: 140px;
            img {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 4;
                position: absolute;
            }
            video {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 5;
                position: absolute;
            }
        }
        .info-container {
            padding: 1rem;
            gap: 0.5rem;
        }
        .icons {
            .controls {
                display: flex;
                gap: 1rem;
            }
            svg {
                font-size: 2rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover {
                    color: #B8B8B8;
                }
            }
        }
        .genres {
            ul {
                gap: 1rem;
                li {
                    padding-right: 0.7rem;
                    &:first-of-type {
                        list-style-type: none;
                    }
                }
            }
        }
    }

`;
