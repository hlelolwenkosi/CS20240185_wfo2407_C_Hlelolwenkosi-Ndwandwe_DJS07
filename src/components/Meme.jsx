import React from "react";

export default function Meme() {
  // State to store the current meme data: top text, bottom text, and the random image URL.
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg", // Default image.
  });

  // State to store all memes fetched from the API.
  const [allMemes, setAllMemes] = React.useState([]);

  // `useEffect` runs after the initial render to fetch meme data from the API.
  React.useEffect(() => {
    async function getMemes() {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes"); // Fetch memes from the API.
        const data = await res.json();
        setAllMemes(data.data.memes); // Save the array of memes in state.
      } catch (error) {
        console.error("Error fetching memes:", error); // Handle any errors that occur during fetch.
      }
    }
    getMemes();
  }, []); // Empty dependency array ensures this runs only once after the component mounts.

  // Function to get a random meme image when the button is clicked.
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length); // Generate a random index.
    const url = allMemes[randomNumber].url; // Get the URL of the random meme.
    setMeme((prevMeme) => ({
      ...prevMeme, // Keep the existing state for `topText` and `bottomText`.
      randomImage: url, // Update the randomImage with the new URL.
    }));
  }

  // Function to handle input changes for the top and bottom text fields.
  function handleChange(event) {
    const { name, value } = event.target; // Destructure name and value from the input event.
    setMeme((prevMeme) => ({
      ...prevMeme, // Keep the existing state.
      [name]: value, // Dynamically update either topText or bottomText based on the input's `name`.
    }));
  }

  /*
  The return method renders:
  - Input fields for top and bottom text.
  - A button to fetch a new meme image.
  - The meme image and the dynamic text overlaid on it.
  */
  return (
    <main>
      <div className="form">
        {/* Input for the top text */}
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText" // Matches the key in the `meme` state.
          value={meme.topText} // Controlled component bound to `meme.topText`.
          onChange={handleChange} // Calls handleChange to update the state.
        />
        {/* Input for the bottom text */}
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText" // Matches the key in the `meme` state.
          value={meme.bottomText} // Controlled component bound to `meme.bottomText`.
          onChange={handleChange} // Calls handleChange to update the state.
        />
        {/* Button to fetch a new random meme image */}
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      {/* Display the meme image and the overlay text */}
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt="Random Meme" />
        {/* Top text overlay */}
        <h2 className="meme--text top">{meme.topText}</h2>
        {/* Bottom text overlay */}
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
