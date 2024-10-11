<Box
sx={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center'
}}
>
{/* Header */}
<Typography variant="h2" component="h1" gutterBottom>
  Kitty Conundrum
</Typography>

{/* Subtitle */}
<Typography variant="h5" component="h2" gutterBottom>
  Make a choice to save the cat
</Typography>

{/* Animation Box */}
<Box
  sx={{
    height: 300,
    width: 300,
    bgcolor: 'lightgray',  // Placeholder background for now
    marginBottom: 3
  }}
>
  {/* Monster Animation - Lurking */}
  <Player
    autoplay
    loop
    src={monsterAnimation} // Placeholder Lottie animation for monster
    style={{ height: '100%', width: '50%', position: 'absolute', left: 0 }}
  />

  {/* Kitten Animation - Idle */}
</Box>

{/* Textboxes with OR separator */}
<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: 3
  }}
>
  <TextField label="Enter Choice 1" variant="outlined" sx={{ marginRight: 2 }} />
  <Typography variant="body1">OR</Typography>
  <TextField label="Enter Choice 2" variant="outlined" sx={{ marginLeft: 2 }} />
</Box>

{/* Start Button */}
<Button variant="contained" color="primary" size="large">
  Start
</Button>
</Box>