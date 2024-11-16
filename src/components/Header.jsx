export default function Header() {
    // Displays the title of the app, along with the image and subtitle for the header section
    return (
      <header className="header">
        <img src="src\images\troll-face.png" className="header--image" />
        <h2 className="header--title">Meme Generator</h2>
        <h4 className="header--project">React Course - Project 3</h4>
      </header>
    );
  }