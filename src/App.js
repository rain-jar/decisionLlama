import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import backgroundAnimation from './lottie/Background.json';

import './App.css';

function Game() {
  //State Variables 
  const [choices, setChoices] = useState({ choice1: '', choice2: '' });
  const [gameStarted, setgameStarted] = useState(false);
  const [monsterX, setMonsterX] = useState(0);
  const [userMadeChoice, setUserMadeChoice] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [timer, setTimer] = useState(15);
  const [dogWins, setdogWins] = useState(null); //default null, true if dog wins, false if monster wins. 

  useEffect(() => {
    let countdown;
    if (gameStarted && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1500);
    }
    else if (timer === 0) {
      //if the timer runs out, Monster wins
      setdogWins(false);
      setgameStarted(false);
      setGameOver(true);
      //setIsReset(true);
    }
    return () => clearInterval(countdown);
  }, [gameStarted, timer]);

  //Handling the Start event
  const handleStart = () => {
    setgameStarted(true);
    setdogWins(null);  //Reset win/loss
    setTimer(15);  //Reset timer
    setGameOver(false);
  }

  //Handling Choice Selection 
  const handleChoiceClick = () => {
    setdogWins(true); // if a choice is made, dog wins. 
    setgameStarted(false); //end the game. 
    setMonsterX(0);
    setUserMadeChoice(true);
    setGameOver(true);
  }

  //Handling Restart Click
  const handleRestart = () => {
    setChoices({ choice1: '', choice2: '' });
    setgameStarted(false);
    setdogWins(null);
    setIsReset(true);
    setTimeout(() => setIsReset(false), 0);
    setMonsterX(0);
    setUserMadeChoice(false);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        position: 'relative', // Ensure that children use this as a reference point
        backgroundColor: '#000000',
        padding: '20px',
        // Mobile responsive design
        '@media (max-width: 600px)': {
          padding: '10px',  // Adjust padding for smaller screens
        },
      }}
    >
      {/* Header */}
      <Typography variant="h2" component="h1" gutterBottom sx={{
        fontFamily: "'Creepster', cursive",  // Spooky Halloween font
        color: '#ff7518',  // Halloween Orange
        fontSize: '48px',
        marginTop: '40px',
        // Adjust font size for mobile
        '@media (max-width: 600px)': {
          fontSize: '32px',
        },
      }}>
        Llama Dilemma
      </Typography>

      {/* Subtitle */}
      <Typography variant="h5" component="h2" gutterBottom sx={{
        fontFamily: "'Creepster', cursive",
        color: '#f8f8ff',  // Ghostly White
        fontSize: '24px',
        // Adjust font size for mobile
        '@media (max-width: 600px)': {
          fontSize: '18px',
        },
      }}>
        Make a choice to save the llama, before time runs out!!
      </Typography>
      <Typography variant="h6" sx={{
        '@media (max-width: 600px)': {
          fontSize: '18px',
        },
      }}>
        Enter two things you have recently struggled to choose between
      </Typography>

      {/* Animation Box */}
      <Box
        sx={{
          height: 800,
          width: 600,
          position: 'relative', // To layer animations on top of each other
          marginBottom: 0,
          borderRadius: '10px',
          overflow: 'hidden',
          // Make the game area responsive
          '@media (max-width: 600px)': {
            width: '100%',  // Take full width of the screen
            height: '400px',  // Adjust height for smaller devices
          },
        }}
      >
        {/* Background Animation */}
        {/* Carousel Background */}

        {/* First Background */}

        {/* Animated Backgrounds - Duplicate for Carousel Effect */}
        <motion.div
          animate={isReset ? { x: '0%' } : gameStarted ? { x: ['0%', '-100%'] } : { x: '0%' }} // Moves both backgrounds to the left
          transition={isReset ? { duration: 0 } : { duration: 20, ease: "linear", repeat: Infinity }} // Repeat infinitely for continuous effect
          style={{ height: '100%', width: '200%', display: 'flex', position: 'absolute', zIndex: 1, margin: 0, padding: 0, boxSizing: 'border-box' }}
        >
          {/* First Background */}
          <div style={{ position: 'absolute', top: 0, left: '0%', height: '100%', width: '50%', margin: 0, padding: 0, }}>
            <Player autoplay loop src={backgroundAnimation} style={{ height: '100%', width: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }} />
          </div>

          {/* Second Background - Duplicate */}
          <div style={{ position: 'absolute', top: 0, left: '44%', height: '100%', width: '50%', margin: 0, padding: 0, }}>
            <Player autoplay loop src={backgroundAnimation} style={{ height: '100%', width: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }} />
          </div>

          <div style={{ position: 'absolute', top: 0, left: '88%', height: '100%', width: '50%', margin: 0, padding: 0, }}>
            <Player autoplay loop src={backgroundAnimation} style={{ height: '100%', width: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }} />
          </div>

          <div style={{ position: 'absolute', top: 0, left: '132%', height: '100%', width: '50%', margin: 0, padding: 0, }}>
            <Player autoplay loop src={backgroundAnimation} style={{ height: '100%', width: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }} />
          </div>
        </motion.div>



        {/* Monster Animation */}
        <motion.div
          animate={isReset ? { x: '0%' } : gameOver ? { x: monsterX } : { x: [0, 400] }} // Monster chases
          transition={isReset ? { duration: 0 } : { duration: gameOver ? 0 : 28, ease: [0.5, 0.01, 0.5, 1], repeat: 0 }}
          style={{ height: '5%', width: '25%', position: 'absolute', left: '5%', zIndex: 2, top: '30%' }}
          onUpdate={(latest) => setMonsterX(latest.x)}
        >
          {userMadeChoice ? (
            <Player
              autoplay
              loop
              src="https://lottie.host/ea78b2ab-b886-4a4e-8d54-b4959c3a4cd1/DBakrXI9Bb.json" // Monster is defeated
            />
          ) : (
            <Player
              autoplay
              loop
              src="https://lottie.host/fb6d01b8-df2e-46de-8ea7-6226b3d67323/5Em6bEspoU.json" // Monster is alive
            />

          )}
        </motion.div>

        {/* Kitten Animation */}
        <motion.div
          animate={isReset ? { x: '0%' } : gameStarted ? { x: [0, 0] } : { x: 0 }} // Dog runs
          transition={isReset ? { duration: 0 } : { duration: 13, ease: [0.05, 0.1, 0.7, 4] }}
          style={{ height: '40%', width: '40%', position: 'absolute', right: '-5%', zIndex: 2, top: '40%' }}
        >
          {monsterX > 350 ? (
            <Player
              autoplay
              loop
              src="https://lottie.host/a9ccdc8d-9220-407f-acce-d40d607f31e4/EqswiraHCM.json" // Alive dog animation

            />
          ) : (
            <Player
              autoplay
              loop
              src="https://lottie.host/8e95aa50-4f86-40eb-9576-34de34d32018/8oKN7BhdyO.json" // Dead dog animation
            />
          )}
        </motion.div>
      </Box>

      {/* Display Result */}
      {dogWins === true && <Typography variant="h5" sx={{
        marginBottom: 3,
        '@media (max-width: 600px)': {
          fontSize: '18px',
        },
      }}>Great work! You saved the llama and solved your dilemma!</Typography>}
      {dogWins === false && <Typography variant="h5" sx={{
        marginBottom: 3,
        '@media (max-width: 600px)': {
          fontSize: '18px',
        },
      }}>Took too long. You might wanna try a therapist instead </Typography>}

      {/* Display timer */}
      {/*<Typography variant="h6">Time Remaining: {timer}s</Typography>*/}

      {/* Choices or Start Button */}
      {((dogWins == null) && !gameStarted) ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <TextField
              label="Enter Choice 1"
              variant="outlined"
              value={choices.choice1}
              onChange={(e) => setChoices({ ...choices, choice1: e.target.value })}
              sx={{
                marginRight: 2,
                width: '300px',
                input: {
                  fontFamily: "'Creepster', cursive",
                  color: '#f8f8ff',  // Ghostly white text
                  backgroundColor: '#1c1c1e',  // Dark background
                  padding: '10px',
                  borderRadius: '5px',
                },
                label: {
                  fontFamily: "'Creepster', cursive",
                  color: '#ff7518',  // Halloween orange label
                },
                fieldset: {
                  borderColor: '#ff7518',  // Halloween orange border
                },
                '&:hover fieldset': {
                  borderColor: '#ff4500',  // Darker orange on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff7518',  // Keep orange on focus
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ff4500',  // Hover color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff7518',  // Focus color
                  },
                },
                // Adjust width for mobile
                '@media (max-width: 600px)': {
                  width: '100%',  // Full width for mobile
                },
              }}
            />
            <TextField
              label="Enter Choice 2"
              variant="outlined"
              value={choices.choice2}
              onChange={(e) => setChoices({ ...choices, choice2: e.target.value })}
              sx={{
                width: '300px',
                input: {
                  fontFamily: "'Creepster', cursive",
                  color: '#f8f8ff',  // Ghostly white text
                  backgroundColor: '#1c1c1e',  // Dark background
                  padding: '10px',
                  borderRadius: '5px',
                },
                label: {
                  fontFamily: "'Creepster', cursive",
                  color: '#ff7518',  // Halloween orange label
                },
                fieldset: {
                  borderColor: '#ff7518',  // Halloween orange border
                },
                '&:hover fieldset': {
                  borderColor: '#ff4500',  // Darker orange on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff7518',  // Keep orange on focus
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ff4500',  // Hover color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff7518',  // Focus color
                  },
                },
                // Adjust width for mobile
                '@media (max-width: 600px)': {
                  width: '100%',  // Full width for mobile
                },
              }}
            />
          </Box>

          <Button variant="contained" color="primary" onClick={handleStart} sx={{
            fontFamily: "'Creepster', cursive",
            fontSize: '18px',
            backgroundColor: '#ff7518',  // Halloween Orange
            color: '#1c1c1e',  // Dark background for contrast
            '&:hover': {
              backgroundColor: '#ff4500',  // Hover effect: Darker orange
              transform: 'scale(1.05)',  // Slightly grow on hover
            },
            transition: 'all 0.2s ease',
            borderRadius: '5px',
            padding: '10px 20px',
            // Make button responsive
            '@media (max-width: 600px)': {
              width: '100%',
              fontSize: '16px',
            },
          }}>
            Start
          </Button>

        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }} >
            <Button variant="contained" onClick={handleChoiceClick} sx={{
              fontFamily: "'Creepster', cursive",
              fontSize: '18px',
              backgroundColor: '#8b008b',  // Halloween Purple
              color: '#f8f8ff',  // Ghostly white for contrast
              '&:hover': {
                backgroundColor: '#9400d3',  // Hover effect: Darker purple
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
              borderRadius: '5px',
              padding: '10px 20px',
              // Make button responsive
              '@media (max-width: 600px)': {
                width: '100%',
                fontSize: '16px',
              },
            }}>
              {choices.choice1}
            </Button>
            <Typography variant="body1" sx={{ margin: '0 10px' }}>
              OR
            </Typography>
            <Button variant="contained" onClick={handleChoiceClick} sx={{
              fontFamily: "'Creepster', cursive",
              fontSize: '18px',
              backgroundColor: '#8b008b',  // Halloween Purple
              color: '#f8f8ff',  // Ghostly white for contrast
              '&:hover': {
                backgroundColor: '#9400d3',  // Hover effect: Darker purple
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
              borderRadius: '5px',
              padding: '10px 20px',
              // Make button responsive
              '@media (max-width: 600px)': {
                width: '100%',
                fontSize: '16px',
              },
            }}>
              {choices.choice2}
            </Button>
          </Box>
        </>
      )}

      {/* Restart Button */}
      {(dogWins !== null || gameStarted) && (
        <Button variant="outlined" color="secondary" onClick={handleRestart} sx={{
          fontFamily: "'Creepster', cursive",
          fontSize: '18px',
          backgroundColor: '#8b008b',  // Halloween Purple
          color: '#f8f8ff',  // Ghostly white for contrast
          '&:hover': {
            backgroundColor: '#9400d3',  // Hover effect: Darker purple
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
          borderRadius: '5px',
          padding: '10px 20px',
          // Make button responsive
          '@media (max-width: 600px)': {
            width: '100%',
            fontSize: '16px',
          },
        }}>
          Try Again
        </Button>
      )}

    </Box>
  );
}

export default Game;

